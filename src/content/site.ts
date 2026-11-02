/*
 * Osnovni podaci o agenciji — jedino mesto za naziv, kontakt i adresu.
 *
 * PRIVREMENO: vrednosti označene komentarom PRIVREMENO moraju se zameniti
 * pravim podacima pre objave. Prazna polja se na sajtu ne prikazuju.
 * Pretraga: `grep -rn "PRIVREMENO" src`
 */

export const site = {
  // PRIVREMENO: naziv iz dizajna, još nije konačan
  name: "Visina Studio",
  logoText: "visina",
  // PRIVREMENO: pravni podaci za footer (prazno = ne prikazuje se)
  legalName: "",
  taxId: "",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Dok nije "true", pretraživači ne indeksiraju sajt (noindex + robots.txt)
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",

  locale: "sr_RS",
  description:
    "Izrada veb sajtova, mobilnih i veb aplikacija i snimanje dronom za mala i srednja preduzeća.",
  tagline: "Digitalna agencija za sajtove, aplikacije i video iz vazduha. Radimo sa firmama širom Srbije.",

  // PRIVREMENO: kontakt podaci (example.com je rezervisan domen za primere)
  email: "kontakt@example.com",
  phone: { display: "+381 00 000 0000", href: "tel:+381000000000" },
  // PRIVREMENO: adresa i radno vreme (prazno = ne prikazuje se)
  address: { street: "", city: "" },
  hours: "",

  // Prikazuju se samo mreže sa unetom adresom
  social: [] as { label: string; href: string }[],
};

export const mainNav = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Proces rada", href: "/#proces" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];
