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

/*
 * Video fajlovi se keširaju godinu dana (next.config.ts), pa pri svakoj
 * izmeni snimka treba povećati verziju u imenu fajla (.v2 → .v3).
 */

export type VideoSource = { src: string; media?: string; type?: string };

const MOBILE = "(max-width: 767px)";
const HEVC_720 = 'video/mp4; codecs="hvc1.1.6.L93.B0"';
const HEVC_1080 = 'video/mp4; codecs="hvc1.1.6.L120.B0"';
const H264_720 = 'video/mp4; codecs="avc1.64001F"';
const H264_1080 = 'video/mp4; codecs="avc1.640028"';

/**
 * Browser uzima prvi izvor koji odgovara ekranu i koji ume da pusti:
 * HEVC (~40% manji, Safari i Chrome sa hardverskim dekoderom), pa H.264 za ostale.
 * 720p: HEVC 1 Mbps / H.264 1,35 Mbps; 1080p: HEVC 2 Mbps / H.264 2,6 Mbps.
 */
function videoSources(name: string): VideoSource[] {
  return [
    { src: `/video/${name}-720-hevc.v2.mp4`, media: MOBILE, type: HEVC_720 },
    { src: `/video/${name}-720.v2.mp4`, media: MOBILE, type: H264_720 },
    { src: `/video/${name}-1080-hevc.v2.mp4`, type: HEVC_1080 },
    { src: `/video/${name}-1080.v2.mp4`, type: H264_1080 },
  ];
}

/** Snimak dronom iznad Beograda: 15 s, 25 fps, bez zvuka */
export const belgradeVideo = {
  sources: videoSources("beograd"),
  poster: media.belgradeSava,
};

/** Snimak utvrđenja: 15 s, 25 fps, bez zvuka */
export const droneVideo = {
  sources: videoSources("dron"),
  poster: media.droneAbove,
};
