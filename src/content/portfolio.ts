/*
 * Portfolio projekti.
 *
 * PRIVREMENO: svi projekti su mesta za prave radove. Nazive klijenata,
 * rezultate i slike unositi samo uz dozvolu klijenta.
 */

export type ProjectMedia = "video" | "site" | "phone";

export type Project = {
  id: string;
  /** Slug usluge iz services.ts — koristi se za filtere */
  service: string;
  media: ProjectMedia;
  title: string;
  result: string;
  tag: string;
  /** Opis slike koja ide na ovo mesto */
  image: string;
  duration?: string;
  url?: string;
  /** Raspored na desktopu: širina u kolonama (od 12) i visina u redovima */
  cols: number;
  rows: number;
};

export const projects: Project[] = [
  { id: "p1", service: "snimanje-dronom", media: "video", cols: 8, rows: 2, title: "[Projekat — nekretnina]", result: "[Konkretan rezultat]", tag: "Dron", duration: "[1:12]", image: "Video thumbnail: vila iz vazduha" },
  { id: "p2", service: "mobilne-aplikacije", media: "phone", cols: 4, rows: 1, title: "[Projekat — aplikacija]", result: "[Konkretan rezultat]", tag: "Mobilna app", image: "Ekran aplikacije" },
  { id: "p3", service: "izrada-sajtova", media: "site", cols: 4, rows: 1, title: "[Projekat — web shop]", result: "[Konkretan rezultat]", tag: "Web shop", url: "[domen-klijenta.rs]", image: "Screenshot: web shop" },
  { id: "p4", service: "veb-aplikacije", media: "site", cols: 7, rows: 1, title: "[Projekat — interni alat]", result: "[Konkretan rezultat]", tag: "Veb aplikacija", url: "[app.domen-klijenta.rs]", image: "Screenshot: dashboard" },
  { id: "p5", service: "mobilne-aplikacije", media: "phone", cols: 5, rows: 1, title: "[Projekat — aplikacija]", result: "[Konkretan rezultat]", tag: "Mobilna app", image: "Ekran aplikacije" },
  { id: "p7", service: "izrada-sajtova", media: "site", cols: 7, rows: 1, title: "[Projekat — veb sajt]", result: "[Konkretan rezultat]", tag: "Veb sajt", url: "[domen-klijenta.rs]", image: "Screenshot: sajt klijenta" },
  { id: "p9", service: "veb-aplikacije", media: "site", cols: 5, rows: 1, title: "[Projekat — SaaS]", result: "[Konkretan rezultat]", tag: "SaaS", url: "[domen-klijenta.rs]", image: "Screenshot: kalendar rezervacija" },
  { id: "p10", service: "snimanje-dronom", media: "video", cols: 4, rows: 1, title: "[Projekat — event]", result: "[Konkretan rezultat]", tag: "Dron + montaža", duration: "[2:40]", image: "Video thumbnail: event iz vazduha" },
  { id: "p11", service: "snimanje-dronom", media: "video", cols: 4, rows: 1, title: "[Projekat — industrija]", result: "[Konkretan rezultat]", tag: "Dron · Industrija", duration: "[1:05]", image: "Video thumbnail: polja iz vazduha" },
  { id: "p12", service: "izrada-sajtova", media: "site", cols: 4, rows: 1, title: "[Projekat — veb sajt]", result: "[Konkretan rezultat]", tag: "Veb sajt", url: "[domen-klijenta.rs]", image: "Screenshot: sajt kancelarije" },
];
