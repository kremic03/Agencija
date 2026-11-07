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

/*
 * Sadržaj prati obaveze iz člana 23 Zakona o zaštiti podataka o ličnosti („Sl. glasnik RS”, br. 87/2018).
 * PRIVREMENO: pre objave
 *  - upisati poslovno ime, sedište, matični broj i PIB u src/content/site.ts (prikazuju se ovde i u footeru);
 *  - upisati stvarnog pružaoca hostinga (hostingProvider) kada bude izabran;
 *  - ažurirati datum izmene pri svakoj promeni;
 *  - dati pravniku da pregleda tekst.
 */
const hostingProvider = ""; // PRIVREMENO: npr. „Vercel Inc., SAD” — prazno = opšti opis
const lastUpdated = "7. novembra 2026.";

export default function PrivacyPage() {
  const mail = (
    <a href={`mailto:${site.email}`} className={textLink}>
      {site.email}
    </a>
  );
  const controllerDetails = [
    site.registeredAddress,
    site.registryNumber && `matični broj ${site.registryNumber}`,
    site.taxId && `PIB ${site.taxId}`,
  ].filter(Boolean);

  return (
    <SimplePage title="Politika privatnosti" intro="Koje podatke prikupljamo, zašto, koliko ih čuvamo i koja su vaša prava.">
      <p className="text-sm text-subtle">Poslednja izmena: {lastUpdated}</p>

      <h2 className={heading}>Ko obrađuje podatke</h2>
      <p>
        Rukovalac podacima je {site.legalName || site.name}
        {controllerDetails.length > 0 && `, ${controllerDetails.join(", ")}`}. Za sva pitanja o podacima o ličnosti
        pišite na {mail} ili pozovite{" "}
        <a href={site.phone.href} className={textLink}>
          {site.phone.display}
        </a>
        .
      </p>

      <h2 className={heading}>Koje podatke prikupljamo</h2>
      <p>
        <strong className="text-fg">Podaci iz kontakt forme.</strong> Samo ono što unesete u{" "}
        <Link href="/kontakt" className={textLink}>
          kontakt formu
        </Link>
        : ime i prezime, naziv firme, email, telefon, željeni način kontakta, izabrane usluge, opis projekta, link do
        sajta, budžet i rok, a za snimanje dronom i lokaciju i okvirni datum. Obavezni su samo ime i email; bez njih ne
        možemo da odgovorimo na upit. Isto važi i za podatke iz poruka koje nam pošaljete mejlom ili telefonom.
      </p>
      <p>
        <strong className="text-fg">Tehnički podaci.</strong> Kada pošaljete upit, vaša IP adresa se kratko (najviše
        sat vremena, samo u radnoj memoriji servera) koristi da se ograniči broj upita i spreči zloupotreba forme. Server
        na kome je sajt, kao i svaki veb server, beleži osnovne podatke o pristupu (IP adresa, vreme, tražena stranica,
        vrsta pregledača) radi bezbednosti i otklanjanja grešaka.
      </p>

      <h2 className={heading}>Zašto ih koristimo i na osnovu čega</h2>
      <ul className="flex list-disc flex-col gap-2 pl-5">
        <li>
          Da odgovorimo na upit, razgovaramo o projektu i pošaljemo ponudu. Osnov je preduzimanje radnji na vaš zahtev
          pre zaključenja ugovora (član 12, stav 1, tačka 2 ZZPL).
        </li>
        <li>
          Da zaštitimo sajt i formu od zloupotrebe. Osnov je naš legitimni interes (član 12, stav 1, tačka 6 ZZPL).
        </li>
        <li>Ako sarađujemo, podatke čuvamo i koliko to traže propisi o računovodstvu i porezima (pravna obaveza).</li>
      </ul>
      <p>
        Podatke ne koristimo za oglašavanje, ne šaljemo vam reklamne poruke bez vašeg pristanka, ne prodajemo ih i ne
        donosimo automatizovane odluke niti pravimo profile.
      </p>

      <h2 className={heading}>Ko još ima pristup</h2>
      <p>
        Podatke vide samo osobe iz našeg tima koje rade na vašem upitu. Koristimo i pružaoce usluga koji podatke
        obrađuju samo po našem nalogu i samo da bi pružili svoju uslugu:
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-5">
        <li>Resend, Inc. (SAD) — šalje nam upit sa forme mejlom;</li>
        <li>Google LLC (SAD) — Gmail, gde primamo i čuvamo mejlove;</li>
        <li>
          {hostingProvider || "pružalac hostinga"} — server na kome se nalazi sajt i koji beleži tehničke podatke o
          pristupu.
        </li>
      </ul>
      <p>
        Zbog toga se podaci prenose i van Srbije, uključujući SAD. Prenos se zasniva na ugovorima o obradi podataka sa
        ovim pružaocima, koji sadrže standardne ugovorne klauzule i mere zaštite podataka. Podatke ne dajemo nikome
        drugom, osim kada to zakonom traži nadležni organ.
      </p>

      <h2 className={heading}>Koliko ih čuvamo</h2>
      <p>
        Upit i prepisku čuvamo dok traje razgovor o njemu, a najduže 12 meseci od poslednjeg kontakta, pa ih brišemo.
        Ako zaključimo ugovor, podatke potrebne za ugovor i račune čuvamo onoliko koliko propisuju zakoni o
        računovodstvu i porezima. IP adresu za zaštitu forme brišemo najkasnije posle sat vremena, a tehnički zapisi
        servera se brišu automatski, u roku koji određuje pružalac hostinga.
      </p>

      <h2 className={heading}>Vaša prava</h2>
      <p>U svakom trenutku možete da zatražite:</p>
      <ul className="flex list-disc flex-col gap-2 pl-5">
        <li>pristup podacima koje imamo o vama i kopiju tih podataka;</li>
        <li>ispravku netačnih ili dopunu nepotpunih podataka;</li>
        <li>brisanje podataka;</li>
        <li>ograničenje obrade;</li>
        <li>prenos podataka drugom rukovaocu;</li>
        <li>prigovor na obradu zasnovanu na legitimnom interesu.</li>
      </ul>
      <p>
        Zahtev pošaljite na {mail}. Odgovaramo bez odlaganja, a najkasnije u roku od 30 dana. Ako smatrate da
        podatke obrađujemo suprotno zakonu, možete podneti pritužbu Povereniku za informacije od javnog značaja i
        zaštitu podataka o ličnosti (Bulevar kralja Aleksandra 15, Beograd,{" "}
        <a href="https://www.poverenik.rs" className={textLink} rel="noopener noreferrer" target="_blank">
          poverenik.rs
        </a>
        ).
      </p>

      <h2 className={heading}>Kolačići i praćenje</h2>
      <p>
        Sajt ne postavlja kolačiće i ne koristi alate za analitiku, praćenje ni oglašavanje. Fontovi, slike i video se
        učitavaju sa našeg servera, pa vaš pregledač ne šalje podatke trećim stranama dok razgledate sajt. Ako to
        promenimo, prvo ćemo dopuniti ovu politiku i, gde je potrebno, tražiti vaš pristanak.
      </p>

      <h2 className={heading}>Bezbednost</h2>
      <p>
        Sajt radi preko šifrovane veze (HTTPS), a pristup mejlovima i nalozima kod pružalaca usluga je zaštićen i
        ograničen na naš tim.
      </p>

      <h2 className={heading}>Izmene</h2>
      <p>
        Politiku možemo da menjamo, na primer kada uvedemo novu uslugu ili pružaoca. Važeća verzija je uvek na ovoj
        stranici, sa datumom poslednje izmene na vrhu.
      </p>
    </SimplePage>
  );
}
