import Link from "next/link";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/sections/SimplePage";

export const metadata = pageMetadata({
  title: "Politika privatnosti",
  description: `Kako ${site.name} prikuplja, koristi i čuva lične podatke poslate preko kontakt forme, ko im ima pristup i koja su vaša prava.`,
  path: "/politika-privatnosti",
});

const heading = "pt-4 text-card-title text-fg";
const textLink = "text-fg underline underline-offset-4 hover:text-accent-text";

// PRIVREMENO: nacrt, pre objave ga mora proveriti pravnik. Dopuniti rukovaoca (naziv firme, PIB, adresa) i potvrditi rok čuvanja.
export default function PrivacyPage() {
  const mail = (
    <a href={`mailto:${site.email}`} className={textLink}>
      {site.email}
    </a>
  );

  return (
    <SimplePage title="Politika privatnosti" intro="Koje podatke prikupljamo preko kontakt forme, kako ih koristimo i koja su vaša prava.">
      <h2 className={heading}>Ko obrađuje podatke</h2>
      <p>
        Rukovalac podacima je {site.legalName || site.name}. Za sva pitanja o podacima pišite na {mail}.
      </p>

      <h2 className={heading}>Koje podatke prikupljamo</h2>
      <p>
        Prikupljamo samo ono što unesete u <Link href="/kontakt" className={textLink}>kontakt formu</Link>: ime i
        prezime, naziv firme, email, telefon, opis projekta, budžet i rok, a za snimanje dronom i lokaciju i okvirni
        datum. Obavezni su samo ime i email.
      </p>

      <h2 className={heading}>Zašto ih koristimo</h2>
      <p>
        Podatke koristimo isključivo da odgovorimo na vaš upit i pripremimo ponudu. Osnov obrade je radnja preduzeta
        na vaš zahtev pre eventualnog zaključenja ugovora. Ne koristimo ih za oglašavanje i ne prodajemo ih.
      </p>

      <h2 className={heading}>Ko još ima pristup</h2>
      <p>
        Upit nam stiže emailom. Za slanje koristimo uslugu Resend (Resend, Inc., SAD), a poruke se čuvaju kod našeg
        pružaoca email usluge. Podaci se zbog toga mogu prenositi i van Srbije. Ovi pružaoci podatke obrađuju samo da bi
        pružili tu uslugu.
      </p>

      <h2 className={heading}>Koliko ih čuvamo</h2>
      <p>
        Podatke čuvamo dok traje komunikacija o upitu, a najduže 12 meseci od poslednjeg kontakta, osim ako saradnja ili
        zakon ne zahtevaju duži rok.
      </p>

      <h2 className={heading}>Vaša prava</h2>
      <p>
        Možete da zatražite uvid, ispravku ili brisanje svojih podataka, ograničenje obrade ili prenos podataka, i da
        uložite prigovor na obradu. Zahtev pošaljite na {mail}. Pritužbu možete podneti i Povereniku za informacije od
        javnog značaja i zaštitu podataka o ličnosti.
      </p>

      <h2 className={heading}>Kolačići</h2>
      <p>Sajt ne koristi kolačiće za praćenje ni analitiku.</p>
    </SimplePage>
  );
}
