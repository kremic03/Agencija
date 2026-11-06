import { homeFaq } from "@/content/home";
import { defaultProcess } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { websiteSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { FeaturedProductions } from "@/components/sections/FeaturedProductions";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = pageMetadata({
  title: `Izrada sajtova, aplikacija i snimanje dronom u Srbiji | ${site.name}`,
  description:
    "Izrada veb sajtova, mobilnih i veb aplikacija i snimanje dronom za mala i srednja preduzeća širom Srbije. Fiksna cena koju znate pre početka.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <Hero />
      <ServicesBento />
      <FeaturedProductions className="section-y container-page" />
      <ProcessSection
        id="proces"
        eyebrow="(02) Proces rada"
        title="Četiri koraka. Bez iznenađenja."
        text="Pre nego što krenemo znate cenu, rok i ko tačno radi na vašem projektu."
        steps={defaultProcess}
      />
      <Stats />
      <Testimonials />
      <FaqSection eyebrow="(04) Česta pitanja" title="Pitanja koja čujemo svake nedelje." items={homeFaq}>
        <p className="text-base leading-[1.6] text-muted">
          Niste našli odgovor? Pišite na{" "}
          <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-3 hover:text-accent-text">
            {site.email}
          </a>
          .
        </p>
      </FaqSection>
      <CtaBanner
        title="Recite nam šta vam treba. Ponudu dobijate za 24 sata."
        text="Upitnik traje oko 3 minuta. Bez obaveze i bez tehničkog žargona."
      />
    </>
  );
}
