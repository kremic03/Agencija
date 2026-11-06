import { site } from "@/content/site";
import type { Service } from "@/content/services";

const absoluteUrl = (path: string) => new URL(path, site.url).toString();
const organizationId = absoluteUrl("/#organizacija");
const serbia = { "@type": "Country", name: "Srbija" };

// Privremeni kontakt podaci (site.ts) ne smeju u podatke za pretraživače
const realEmail = site.email.endsWith("@example.com") ? undefined : site.email;
const realPhone = site.phone.href.includes("+38100") ? undefined : site.phone.display;

/**
 * Podaci o firmi. Namerno bez ocena i brojki sa početne: dok nisu potvrđene,
 * ne smeju da se predstavljaju pretraživačima kao činjenice.
 */
export function organizationSchema() {
  const hasAddress = site.address.street || site.address.city;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    areaServed: serbia,
    ...(site.legalName && { legalName: site.legalName }),
    ...(site.taxId && { taxID: site.taxId }),
    ...(realEmail && { email: realEmail }),
    ...(realPhone && { telephone: realPhone }),
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        addressCountry: "RS",
        ...(site.address.street && { streetAddress: site.address.street }),
        ...(site.address.city && { addressLocality: site.address.city }),
      },
    }),
    ...(site.social.length > 0 && { sameAs: site.social.map((s) => s.href) }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    inLanguage: "sr-Latn",
    publisher: { "@id": organizationId },
  };
}

export function serviceSchema(service: Service, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seo.description,
    url: absoluteUrl(path),
    areaServed: serbia,
    provider: { "@id": organizationId },
  };
}

/** Putanja do stranice; poslednja stavka je sama stranica */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
