import type { NextConfig } from "next";

/**
 * Build koji pretraživači smeju da indeksiraju mora imati pravu javnu adresu,
 * inače bi kanonski URL-ovi, sitemap i slike za deljenje pokazivali na localhost.
 * Lokalni build za testiranje (indeksiranje isključeno) i dalje prolazi.
 */
function assertPublicSiteUrl() {
  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SITE_INDEXABLE !== "true") return;
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  const isPublic = !!value && URL.canParse(value) && new URL(value).protocol === "https:" && !/localhost|127\.0\.0\.1/.test(value);
  if (!isPublic) {
    throw new Error(`NEXT_PUBLIC_SITE_URL mora biti javna https adresa kada je indeksiranje uključeno (trenutno: ${value ?? "nije postavljeno"})`);
  }
}

assertPublicSiteUrl();

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF je ~20–30% manji od WebP-a; browser bez podrške za AVIF dobija WebP
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Sa toplim kešom @tailwindcss/turbopack loader ne vidi nove Tailwind klase iz
    // komponenti, pa produkcijski CSS ostaje zastareo. Build bez keša traje par sekundi duže.
    turbopackFileSystemCacheForBuild: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  headers() {
    return [
      {
        // Imena video fajlova nose verziju (npr. beograd-720.v1.mp4), pa se mogu keširati trajno
        source: "/video/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
