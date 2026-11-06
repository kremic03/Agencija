import { projects } from "@/content/portfolio";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { PortfolioGrid, type PortfolioCard } from "@/components/portfolio/PortfolioGrid";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Izabrani radovi: veb sajtovi i web shopovi, video i fotografije iz drona.",
  path: "/portfolio",
});

// Filter samo za usluge koje već imaju projekat
const filters = [
  { key: "all", label: "Svi" },
  ...services.filter((s) => projects.some((p) => p.service === s.slug)).map((s) => ({ key: s.slug, label: s.shortName })),
];

const cards: PortfolioCard[] = projects.map((p, i) => ({
  id: p.id,
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
      <div className="container-page flex flex-col gap-10">
        <div className="flex max-w-180 flex-col gap-5">
          <h1 id="portfolio-naslov" className="text-page-title">
            Portfolio
          </h1>
          <p className="text-lead">
            Sajtovi, web shopovi i snimci iz vazduha — od obale Save do kamenog utvrđenja.
          </p>
        </div>

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
