/*
 * Portfolio projekti.
 *
 * Svaki projekat ima pravu fotografiju, video ili screenshot iz media.ts.
 * Mobilne i veb aplikacije još nemaju materijal, pa se njihovi filteri
 * i primeri ne prikazuju dok se ne doda bar jedan projekat.
 * Nazive klijenata i rezultate unositi samo uz dozvolu klijenta.
 */
import { belgradeVideo, droneVideo, media } from "./media";
import type { Example } from "./services";

/** Kako se medij prikazuje: video sa posterom, screenshot u okviru browsera ili telefona, fotografija */
export type ProjectMedia = "video" | "site" | "phone" | "photo";

export type Project = Example & {
  id: string;
  /** Slug usluge iz services.ts — koristi se za filtere */
  service: string;
  media: ProjectMedia;
  description?: string;
  /**
   * Priča o projektu (pasusi): zadatak, rešenje, rezultat. Stranica projekta se
   * indeksira i ulazi u sitemap tek kada ovo postoji, da pretraživači ne vide tanke stranice.
   */
  story?: string[];
  url?: string;
  /** Raspored na desktopu: širina u kolonama (od 12) i visina u redovima */
  cols: number;
  rows: number;
};

// Redosled prati raspored na desktopu: veliki video levo, dve kartice desno, pa parovi 7 + 5 kolona
export const projects: Project[] = [
  {
    id: "beograd-video",
    service: "snimanje-dronom",
    media: "video",
    cols: 8,
    rows: 2,
    title: "Beograd na vodi i Kula Beograd",
    description: "Video iz drona niz Savu",
    tag: "Dron · Video",
    image: media.belgradeSava,
    video: { sources: belgradeVideo.sources, duration: "0:15" },
  },
  {
    id: "web-shop-prijava",
    service: "izrada-sajtova",
    media: "site",
    cols: 4,
    rows: 1,
    title: "Prijava kupaca",
    description: "Nalozi kupaca u modnom web shopu",
    tag: "Web shop",
    image: media.webShopLogin,
  },
  {
    id: "beograd-kula",
    service: "snimanje-dronom",
    media: "photo",
    cols: 4,
    rows: 1,
    title: "Kula Beograd i obala Save",
    description: "Fotografija iz drona",
    tag: "Dron · Foto",
    image: media.belgradeTower,
  },
  {
    id: "web-shop-pocetna",
    service: "izrada-sajtova",
    media: "site",
    cols: 7,
    rows: 1,
    title: "Web shop modne kolekcije",
    description: "Početna strana sa novom kolekcijom",
    tag: "Web shop",
    image: media.webShopHome,
  },
  {
    id: "beograd-mostovi",
    service: "snimanje-dronom",
    media: "photo",
    cols: 5,
    rows: 1,
    title: "Mostovi na Savi i Beogradski sajam",
    description: "Fotografija iz drona",
    tag: "Dron · Foto",
    image: media.belgradeBridges,
  },
  {
    id: "utvrdjenje-horizont",
    service: "snimanje-dronom",
    media: "photo",
    cols: 5,
    rows: 1,
    title: "Utvrđenje i šumovita brda",
    description: "Fotografija iz drona",
    tag: "Dron · Foto",
    image: media.droneHorizon,
  },
  {
    id: "utvrdjenje-video",
    service: "snimanje-dronom",
    media: "video",
    cols: 7,
    rows: 1,
    title: "Kameno utvrđenje",
    description: "Arheološki lokalitet iz vazduha",
    tag: "Dron · Turizam",
    image: droneVideo.poster,
    video: { sources: droneVideo.sources, duration: "0:15" },
  },
];

export function getProject(id: string): Project {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Nepoznat projekat: ${id}`);
  return project;
}

/** Svaki projekat ima svoju stranicu u app/portfolio/<id>/page.tsx, kao i usluge */
export const projectHref = (id: string) => `/portfolio/${id}`;
