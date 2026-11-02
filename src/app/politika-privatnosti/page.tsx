import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/sections/SimplePage";

export const metadata = pageMetadata({
  title: "Politika privatnosti",
  description: `Kako ${site.name} prikuplja, koristi i čuva lične podatke poslate preko kontakt forme.`,
  path: "/politika-privatnosti",
});

// PRIVREMENO: kratak opis umesto punog pravnog teksta; pre objave ga treba proveriti i dopuniti (rok čuvanja, rukovalac podacima)
export default function PrivacyPage() {
  return (
    <SimplePage
      title="Politika privatnosti"
      intro="Koje podatke prikupljamo preko kontakt forme i kako ih koristimo."
    >
      <p>
        Preko kontakt forme prikupljamo samo ono što unesete: ime i prezime, naziv firme, kontakt podatke i opis
        projekta. Te podatke koristimo isključivo da odgovorimo na vaš upit i pripremimo ponudu.
      </p>
      <p>
        Uvid, ispravku ili brisanje svojih podataka možete zatražiti na <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4 hover:text-accent-text">{site.email}</a>.
      </p>
    </SimplePage>
  );
}
