"use server";

import { Resend } from "resend";
import { site } from "@/content/site";

export type QuoteResult = { ok: true } | { ok: false; message: string; fields?: { name?: boolean; email?: boolean } };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_SHORT = 200;
const MAX_LONG = 5000;

const unavailable = `Upit trenutno ne možemo da pošaljemo. Pišite nam direktno na ${site.email}.`;

/** Javni endpoint: vrednost može biti bilo šta, pa se uvek svodi na tekst ograničene dužine */
function text(data: FormData, key: string, max = MAX_SHORT) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Šalje upit sa kontakt forme. Email je običan tekst (bez HTML-a), pa unos
 * korisnika ne može da promeni njegov izgled, a odgovor ide direktno pošiljaocu.
 */
export async function sendQuote(data: FormData): Promise<QuoteResult> {
  // Skriveno polje koje popunjavaju samo botovi: odgovor je isti kao za uspeh, da ne probaju ponovo
  if (text(data, "websiteConfirm")) return { ok: true };

  const name = text(data, "name");
  const email = text(data, "email");
  const fields = { name: !name, email: !EMAIL_RE.test(email) };
  if (fields.name || fields.email) return { ok: false, message: "Proverite označena polja.", fields };

  const services = data
    .getAll("services")
    .filter((s): s is string => typeof s === "string")
    .map((s) => s.slice(0, MAX_SHORT))
    .slice(0, 20);
  if (services.length === 0) return { ok: false, message: "Izaberite bar jednu uslugu." };

  const { RESEND_API_KEY: apiKey, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!apiKey || !to || !from) {
    console.error("Kontakt forma: nedostaju RESEND_API_KEY, CONTACT_TO_EMAIL ili CONTACT_FROM_EMAIL");
    return { ok: false, message: unavailable };
  }

  const lines: [string, string][] = [
    ["Ime i prezime", name],
    ["Firma", text(data, "company")],
    ["Email", email],
    ["Telefon", text(data, "phone")],
    ["Način kontakta", text(data, "contactPreference")],
    ["Usluge", services.join(", ")],
    ["Postojeći materijal", text(data, "hasMaterial")],
    ["Sajt", text(data, "website")],
    ["Lokacija snimanja", text(data, "location")],
    ["Okvirni datum", text(data, "date")],
    ["Budžet", text(data, "budget")],
    ["Rok", text(data, "timeline")],
    ["Saglasnost za kontakt", text(data, "consent") ? "da" : "ne"],
  ];
  const about = text(data, "about", MAX_LONG);
  const body = [
    ...lines.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    ...(about ? ["", "Šta želi da postigne:", about] : []),
  ].join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `Novi upit sa sajta: ${name}`,
      text: body,
    });
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
