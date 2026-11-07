"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/content/site";
import { createRateLimiter } from "@/lib/rate-limit";

export type QuoteResult = { ok: true } | { ok: false; message: string; fields?: { name?: boolean; email?: boolean } };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_SHORT = 200;
const MAX_LONG = 5000;
const SEND_TIMEOUT_MS = 10_000;

const unavailable = `Upit trenutno ne možemo da pošaljemo. Pišite nam direktno na ${site.email}.`;
const tooMany = `Poslali ste više upita za kratko vreme. Pokušajte ponovo malo kasnije ili nam pišite na ${site.email}.`;

const allowVisitor = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });
// Čuva mesečnu kvotu Resend-a i inbox i kada napad dolazi sa mnogo adresa
const allowOverall = createRateLimiter({ limit: 50, windowMs: 60 * 60_000 });

/** Javni endpoint: vrednost može biti bilo šta, pa se uvek svodi na tekst ograničene dužine */
function text(data: FormData, key: string, max: number) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Kratko polje je uvek jedan red, da unos ne može da podmetne lažan red u mejlu */
const line = (value: string) => value.replace(/\s+/g, " ");
const field = (data: FormData, key: string) => line(text(data, key, MAX_SHORT));

/** Hosting postavlja x-real-ip; bez njega se koristi prva adresa iz x-forwarded-for */
async function visitorKey() {
  const h = await headers();
  return h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "nepoznat";
}

/**
 * Šalje upit sa kontakt forme. Email je običan tekst (bez HTML-a), pa unos
 * korisnika ne može da promeni njegov izgled, a odgovor ide direktno pošiljaocu.
 */
export async function sendQuote(data: FormData): Promise<QuoteResult> {
  // Skriveno polje koje popunjavaju samo botovi: odgovor je isti kao za uspeh, da ne probaju ponovo
  if (field(data, "websiteConfirm")) {
    // Vidljivo u logu, za slučaj da polje popuni automatsko popunjavanje pregledača kod pravog posetioca
    console.warn("Kontakt forma: popunjeno polje za botove, upit nije poslat");
    return { ok: true };
  }

  const name = field(data, "name");
  const email = field(data, "email");
  const fields = { name: !name, email: !EMAIL_RE.test(email) };
  if (fields.name || fields.email) return { ok: false, message: "Proverite označena polja.", fields };

  const services = data
    .getAll("services")
    .filter((s): s is string => typeof s === "string")
    .map((s) => line(s.slice(0, MAX_SHORT)))
    .slice(0, 20);
  if (services.length === 0) return { ok: false, message: "Izaberite bar jednu uslugu." };

  const { RESEND_API_KEY: apiKey, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!apiKey || !to || !from) {
    console.error("Kontakt forma: nedostaju RESEND_API_KEY, CONTACT_TO_EMAIL ili CONTACT_FROM_EMAIL");
    return { ok: false, message: unavailable };
  }

  // Računaju se samo ispravni upiti, da greška u kucanju ne troši pokušaje
  if (!allowVisitor(await visitorKey())) return { ok: false, message: tooMany };
  if (!allowOverall("svi")) {
    console.error("Kontakt forma: dostignuta ukupna granica upita po satu");
    return { ok: false, message: unavailable };
  }

  const lines: [string, string][] = [
    ["Ime i prezime", name],
    ["Firma", field(data, "company")],
    ["Email", email],
    ["Telefon", field(data, "phone")],
    ["Način kontakta", field(data, "contactPreference")],
    ["Usluge", services.join(", ")],
    ["Postojeći materijal", field(data, "hasMaterial")],
    ["Sajt", field(data, "website")],
    ["Lokacija snimanja", field(data, "location")],
    ["Okvirni datum", field(data, "date")],
    ["Budžet", field(data, "budget")],
    ["Rok", field(data, "timeline")],
  ];
  const about = text(data, "about", MAX_LONG);
  const body = [
    ...lines.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    ...(about ? ["", "Šta želi da postigne:", about] : []),
  ].join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send(
      {
        from,
        to,
        replyTo: email,
        subject: `Novi upit sa sajta: ${name}`,
        text: body,
      },
      { signal: AbortSignal.timeout(SEND_TIMEOUT_MS) },
    );
    if (error) {
      console.error("Kontakt forma: Resend je odbio slanje:", error.name, error.message);
      return { ok: false, message: unavailable };
    }
  } catch (cause) {
    console.error("Kontakt forma: slanje nije uspelo:", cause);
    return { ok: false, message: unavailable };
  }

  return { ok: true };
}
