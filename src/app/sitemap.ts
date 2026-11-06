import type { MetadataRoute } from "next";
import { serviceHref, services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...services.map((s) => serviceHref(s.slug)),
    "/portfolio",
    "/kontakt",
    "/o-nama",
    "/politika-privatnosti",
  ];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
