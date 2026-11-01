/*
 * Fotografije i video na sajtu.
 *
 * Originali su u /materijali (van Git-a). Ovde su obrađene verzije:
 * isečene, smanjene i bez metapodataka (EXIF/GPS).
 */
import type { StaticImageData } from "next/image";
import webShopHome from "@/assets/images/web-shop-pocetna.png";
import webShopLogin from "@/assets/images/web-shop-prijava.png";
import droneAbove from "@/assets/images/dron-utvrdjenje-iznad.jpg";
import droneOverview from "@/assets/images/dron-utvrdjenje-pregled.jpg";
import droneHorizon from "@/assets/images/dron-utvrdjenje-horizont.jpg";
import belgradeTower from "@/assets/images/dron-beograd-kula.jpg";
import belgradeBridges from "@/assets/images/dron-beograd-mostovi.jpg";
import belgradeSava from "@/assets/images/dron-beograd-sava.jpg";

export type Media = { src: StaticImageData; alt: string };

export const media = {
  webShopHome: {
    src: webShopHome,
    alt: "Početna strana web shopa sa modnom kolekcijom: naslov „Tihi luksuz za nove dane” i fotografija modela",
  },
  webShopLogin: {
    src: webShopLogin,
    alt: "Ekran za prijavu u web shop sa poljima za email i lozinku",
  },
  // PRIVREMENO: dodati naziv lokaliteta u alt tekst kada bude poznat
  droneAbove: {
    src: droneAbove,
    alt: "Pogled iz drona odozgo na ostatke kamenog utvrđenja okruženog šumom",
  },
  droneOverview: {
    src: droneOverview,
    alt: "Arheološki lokalitet sa kamenim utvrđenjem, šumom i zemljanim putevima snimljen iz vazduha",
  },
  droneHorizon: {
    src: droneHorizon,
    alt: "Ostaci kamenog utvrđenja snimljeni dronom, sa šumovitim brdima u pozadini",
  },
  belgradeTower: {
    src: belgradeTower,
    alt: "Beograd iz vazduha: Kula Beograd i stambeni tornjevi na obali Save, sa starim gradom u pozadini",
  },
  belgradeBridges: {
    src: belgradeBridges,
    alt: "Mostovi preko Save i Beogradski sajam snimljeni dronom, sa šumovitim brdima u pozadini",
  },
  belgradeSava: {
    src: belgradeSava,
    alt: "Pogled iz drona niz Savu na Beograd i novi stambeni kompleks uz obalu",
  },
} satisfies Record<string, Media>;

/** Snimak dronom iznad Beograda: 15 s, H.264, bez zvuka */
export const belgradeVideo = {
  sources: [
    { src: "/video/beograd-720.mp4", media: "(max-width: 767px)" },
    { src: "/video/beograd-1080.mp4" },
  ],
  poster: media.belgradeSava,
};

/** Snimak utvrđenja: 15 s, H.264, bez zvuka */
export const droneVideo = {
  sources: [
    { src: "/video/dron-720.mp4", media: "(max-width: 767px)" },
    { src: "/video/dron-1080.mp4" },
  ],
  poster: media.droneAbove,
};
