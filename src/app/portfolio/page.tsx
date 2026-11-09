import Link from "next/link";
import { projectHref, projects } from "@/content/portfolio";
import { serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { PortfolioGrid, type PortfolioCard } from "@/components/portfolio/PortfolioGrid";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import { FeaturedProductions } from "@/components/sections/FeaturedProductions";

export const metadata = pageMetadata({
  title: "Portfolio: sajtovi, web shopovi i snimci dronom",
  description:
    "Izabrani radovi našeg tima: veb sajtovi i web shopovi, video i fotografije iz drona snimljene u Beogradu i na kulturnoj baštini.",
  path: "/portfolio",
});

const inlineLink = "text-fg underline underline-offset-4 hover:text-accent-text";

// Filter samo za usluge koje već imaju projekat
const filters = [
  { key: "all", label: "Svi" },
  ...services.filter((s) => projects.some((p) => p.service === s.slug)).map((s) => ({ key: s.slug, label: s.shortName })),
];

const cards: PortfolioCard[] = projects.map((p, i) => ({
  id: p.id,
  href: p.url ?? projectHref(p.id),
  external: Boolean(p.url),
  service: p.service,
  title: p.title,
  description: p.description,
  duration: p.video?.duration,
  tag: p.tag,
  cols: p.cols,
  rows: p.rows,
  phone: p.media === "phone",
  media: <ProjectMedia project={p} highPriority={i === 0} />,
}));

export default function PortfolioPage() {
  return (
    <section aria-labelledby="portfolio-naslov" className="pt-[clamp(48px,6vw,96px)] pb-[clamp(88px,9.5vw,144px)]">
      <JsonLd data={breadcrumbSchema([{ name: "Portfolio", path: "/portfolio" }])} />
      <div className="container-page flex flex-col gap-10">
        <div className="flex max-w-180 flex-col gap-5">
          <h1 id="portfolio-naslov" className="text-page-title">
            Portfolio
          </h1>
          <p className="text-lead">
            <Link href={serviceHref("izrada-sajtova")} className={inlineLink}>
              Sajtovi i web shopovi
            </Link>{" "}
            i{" "}
            <Link href={serviceHref("snimanje-dronom")} className={inlineLink}>
              snimanje dronom
            </Link>{" "}
            — od obale Save do kamenog utvrđenja.
          </p>
        </div>

        <FeaturedProductions />

        <PortfolioGrid projects={cards} filters={filters} />

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line pt-8">
          <p className="max-w-140 text-[clamp(20px,1.8vw,24px)] leading-[1.35] font-medium tracking-[-0.015em]">
            Vaš projekat može biti sledeći. <span className="text-muted">Ponudu šaljemo u roku od 24 sata.</span>
          </p>
          <ButtonLink href="/kontakt" arrow>
            Zatraži ponudu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
