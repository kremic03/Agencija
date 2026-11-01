/*
 * Sadržaj početne strane.
 *
 * PRIVREMENO: brojke, utisci klijenata i izdvojeni projekti su mesta
 * za prave podatke. Utiske objavljivati samo uz pisanu dozvolu klijenta.
 */
import type { Faq } from "./services";

export const hero = {
  badge: "Primamo nove projekte za [mesec]",
  title: "Sajtovi, aplikacije i snimci iz vazduha koji vašoj firmi donose nove klijente.",
  text: "Jedan tim za ceo digitalni nastup malih i srednjih preduzeća — od ideje do lansiranja, uz fiksnu cenu koju znate pre početka.",
  checks: ["Ponuda za [24 sata]", "Fiksna cena pre početka", "[Potvrditi] Piloti licencirani kod DCV"],
  overlay: "BEOGRAD · SAVA",
};

export const stats = [
  { value: "[140]", unit: "+", label: "završenih projekata" },
  { value: "[9]", unit: " god.", label: "na tržištu" },
  { value: "[4,9]", unit: "/5", label: "prosečna ocena na Google-u" },
  { value: "[24]", unit: "h", label: "od upita do pisane ponude" },
];

export const testimonials = [
  // PRIVREMENO: predlog teksta — pre objave Marko Savić treba da odobri tačne reči i objavu
  {
    quote: "Snimanje sa Dejanom na setu bilo je pravo zadovoljstvo — opušteno i profesionalno. Kadrovi su vrhunski.",
    name: "Marko Savić",
    role: "Direktor režije, „Žigosani u reketu”",
  },
  // PRIVREMENO: predlog teksta — pre objave Sanja treba da odobri tačne reči i objavu
  {
    quote: "Kadrovi iz drona sa naše proslave su vrhunskog kvaliteta, a sve je odrađeno potpuno profesionalno.",
    name: "Sanja [Prezime]",
    role: "Snimanje dronom · [vrsta proslave]",
  },
];

export const homeFaq: Faq[] = [
  {
    question: "Koliko košta izrada sajta?",
    answer: "Prezentacioni sajt kreće od [450] €, web shop od [1.200] €. Tačnu cenu dobijate u pisanoj ponudi posle besplatnih konsultacija — i ona se ne menja tokom rada.",
  },
  {
    question: "Koliko traje izrada?",
    answer: "Prezentacioni sajt [2–4 nedelje], web shop [4–8 nedelja], mobilna aplikacija [2–4 meseca]. Snimanje dronom zakazujemo obično u roku od [5] radnih dana.",
  },
  {
    question: "Da li moram da znam nešto tehnički?",
    answer: "Ne. Sve objašnjavamo jednostavnim jezikom, a na kraju vas obučimo da sami menjate tekstove, slike i cene.",
  },
  {
    question: "Da li imate dozvole za letenje dronom?",
    answer: "[Potvrditi] Da. Naši piloti su registrovani kod Direktorata civilnog vazduhoplovstva, a oprema je osigurana. Dozvole za posebne zone pribavljamo mi.",
  },
  {
    question: "Šta ako mi se nešto ne dopadne?",
    answer: "Svaka faza uključuje [dve] runde izmena. Ne idemo dalje dok ne odobrite prethodni korak.",
  },
  {
    question: "Da li radite van [grada]?",
    answer: "Radimo sa klijentima iz cele Srbije. Sastanci su uživo ili online, a za snimanje dronom dolazimo na lokaciju.",
  },
];
