import type { NextConfig } from "next";

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
