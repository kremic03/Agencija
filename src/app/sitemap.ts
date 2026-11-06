import type { MetadataRoute } from "next";
import { projectHref, projects } from "@/content/portfolio";
import { serviceHref, services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/usluge",
    ...services.map((s) => serviceHref(s.slug)),
    "/portfolio",
    // Samo projekti sa pričom; ostali su noindex (projectMetadata u ProjectPage.tsx)
    ...projects.filter((p) => p.story?.length).map((p) => projectHref(p.id)),
    "/kontakt",
    "/o-nama",
    "/politika-privatnosti",
  ];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
