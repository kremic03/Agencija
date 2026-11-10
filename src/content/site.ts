/*
 * Osnovni podaci o agenciji — jedino mesto za naziv, kontakt i adresu.
 *
 * PRIVREMENO: vrednosti označene komentarom PRIVREMENO moraju se zameniti
 * pravim podacima pre objave. Prazna polja se na sajtu ne prikazuju.
 * Pretraga: `grep -rn "PRIVREMENO" src`
 */

export const site = {
  // Vizuelni identitet: design_handoff_webdron_identitet/README.md
  name: "WebDron agencija",
  shortName: "WebDron",
  // PRIVREMENO: pravni podaci za footer i politiku privatnosti (prazno = ne prikazuje se).
  // Obavezni pre objave (Zakon o privrednim društvima, Zakon o elektronskoj trgovini):
  // poslovno ime iz APR-a (npr. „WebDron Nikola Kremić PR Beograd”), matični broj, PIB i sedište.
  legalName: "",
  registryNumber: "",
  taxId: "",
  // Sedište iz APR-a (ulica i broj, mesto); može se razlikovati od adrese kancelarije
  registeredAddress: "",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Dok nije "true", pretraživači ne indeksiraju sajt (noindex + robots.txt)
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",

  // Google Analytics 4 (ID toka „WebDron sajt”); prazno = bez analitike, banera i linka u footeru
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID ?? "",

  locale: "sr_RS",
  description:
    "Agencija iz Beograda: izrada veb sajtova, mobilnih i veb aplikacija i snimanje dronom za mala i srednja preduzeća.",
  tagline: "Digitalna agencija iz Beograda za sajtove, aplikacije i video iz vazduha. Radimo sa firmama širom Srbije.",

  email: "nikolakremic15@gmail.com",
  phone: { display: "+381 60 422 4990", href: "tel:+381604224990" },
  // Ulica i radno vreme nisu uneti (prazno = ne prikazuje se)
  address: { street: "", city: "Beograd" },
  hours: "",

  // Ikonice u footeru (Footer.tsx) i sameAs u strukturiranim podacima
  social: [{ label: "Instagram", href: "https://www.instagram.com/izradisajt/", icon: "instagram" }] as {
    label: string;
    href: string;
    icon: "instagram";
  }[],
};

export const mainNav = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Proces rada", href: "/#proces" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];
