import type { Metadata } from "next";
import { site } from "@/content/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Naslov bez „| Naziv” sufiksa (za početnu) */
  absoluteTitle?: boolean;
};

// Slika iz app/opengraph-image.tsx; podstranice je ne nasleđuju same
const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — sajtovi, aplikacije i snimanje dronom` };

/**
 * Metapodaci jedne stranice: naslov, opis, kanonski URL i podaci za deljenje.
 * Open Graph objekat stranice zamenjuje roditeljski, pa se ovde ponavljaju
 * siteName i locale.
 */
export function pageMetadata({ title, description, path, absoluteTitle }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage.url] },
  };
}
