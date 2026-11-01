/*
 * Osnovni podaci o agenciji — jedino mesto za naziv, kontakt i adresu.
 *
 * PRIVREMENO: sve vrednosti u uglastim zagradama [...] i sve označene
 * komentarom PRIVREMENO moraju se zameniti pravim podacima pre objave.
 * Pretraga: `grep -rn "PRIVREMENO\|\[" src/content`
 */

export const site = {
  // PRIVREMENO: naziv iz dizajna, još nije konačan
  name: "Visina Studio",
  logoText: "visina",
  // PRIVREMENO: pravni podaci za footer
  legalName: "[Pravni naziv firme]",
  taxId: "[PIB]",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Dok nije "true", pretraživači ne indeksiraju sajt (noindex + robots.txt)
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",

  locale: "sr_RS",
  description:
    "Izrada veb sajtova, mobilnih i veb aplikacija i snimanje dronom za mala i srednja preduzeća.",
  // PRIVREMENO: grad
  tagline:
    "Digitalna agencija iz [grada]. Sajtovi, aplikacije i video iz vazduha za firme širom Srbije.",

  // PRIVREMENO: kontakt podaci (example.com je rezervisan domen za primere)
  email: "kontakt@example.com",
  phone: { display: "+381 00 000 0000", href: "tel:+381000000000" },
  address: { street: "[Ulica i broj]", city: "[Poštanski broj i grad]" },
  hours: "[Radno vreme, npr. pon–pet, 9–17h]",

  // Prikazuju se samo mreže sa unetom adresom
  social: [] as { label: string; href: string }[],
};

export const mainNav = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Proces rada", href: "/#proces" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];
