/*
 * Sadržaj početne strane.
 *
 * PRIVREMENO: utisci klijenata su mesta za prave podatke. Utiske objavljivati
 * samo uz pisanu dozvolu klijenta.
 */
import type { Faq } from "./services";

export const hero = {
  title: "Sajtovi, aplikacije i snimci iz vazduha koji vašoj firmi donose nove klijente.",
  text: "Jedan tim za ceo digitalni nastup malih i srednjih preduzeća — od ideje do lansiranja, uz fiksnu cenu koju znate pre početka.",
  checks: ["Ponuda za 24 sata", "Fiksna cena pre početka", "Piloti licencirani kod DCV"],
  overlay: "BEOGRAD · SAVA",
};

export const stats = [
  { value: "15", unit: "+ god.", label: "iskustva u snimanju dronom" },
  { value: "~10", unit: "", label: "projekata veb aplikacija" },
  { value: "24", unit: "h", label: "od upita do pisane ponude" },
];

export const productions = [
  {
    name: "Žigosani u reketu",
    kind: "Produkcija",
    text: "Snimanje dronom na setu, u saradnji sa ekipom produkcije.",
  },
  {
    name: "Lepi Brka",
    kind: "Emisija",
    text: "Obilazak mesta širom Srbije sa profesionalnom ekipom snimatelja i kadrovi iz vazduha za emisiju.",
  },
];

export const testimonials = [
  // PRIVREMENO: predlog teksta — pre objave Marko Savić treba da odobri tačne reči i objavu
  {
    quote: "Snimanje sa Dejanom na setu bilo je pravo zadovoljstvo — opušteno i profesionalno. Kadrovi su vrhunski.",
    name: "Marko Savić",
  },
  // PRIVREMENO: predlog teksta — pre objave Sanja treba da odobri tačne reči i objavu
  {
    quote: "Kadrovi iz drona sa naše proslave su vrhunskog kvaliteta, a sve je odrađeno potpuno profesionalno.",
    name: "Sanja",
  },
];

export const homeFaq: Faq[] = [
  {
    question: "Koliko košta izrada sajta?",
    answer: "Zavisi od obima projekta. Tačnu cenu dobijate u pisanoj ponudi posle besplatnih konsultacija — i ona se ne menja tokom rada.",
  },
  {
    question: "Koliko traje izrada?",
    answer: "Zavisi od obima projekta. Tačan rok dobijate u pisanoj ponudi.",
  },
  {
    question: "Da li moram da znam nešto tehnički?",
    answer: "Ne. Sve objašnjavamo jednostavnim jezikom, a na kraju vas obučimo da sami menjate tekstove, slike i cene.",
  },
  {
    question: "Da li su vaši piloti licencirani?",
    answer: "Da. Naši piloti su licencirani i registrovani kod Direktorata civilnog vazduhoplovstva (DCV).",
  },
  {
    question: "Šta ako mi se nešto ne dopadne?",
    answer: "Ne idemo dalje dok ne odobrite prethodni korak, pa svaku primedbu rešavamo na vreme.",
  },
  {
    question: "Da li radite sa klijentima iz drugih gradova?",
    answer: "Da. Nalazimo se u Beogradu, a radimo sa klijentima iz cele Srbije. Sastanci su uživo ili online, a za snimanje dronom dolazimo na lokaciju.",
  },
];
