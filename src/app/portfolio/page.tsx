import { projects } from "@/content/portfolio";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Izabrani projekti: veb sajtovi, mobilne i veb aplikacije i snimanje dronom — uz konkretan rezultat za svakog klijenta.",
  path: "/portfolio",
});

const filters = [{ key: "all", label: "Svi" }, ...services.map((s) => ({ key: s.slug, label: s.shortName }))];

export default function PortfolioPage() {
  return (
    <section aria-labelledby="portfolio-naslov" className="pt-[clamp(48px,6vw,96px)] pb-[clamp(88px,9.5vw,144px)]">
      <div className="container-page flex flex-col gap-10">
        <div className="flex max-w-180 flex-col gap-5">
          <h1 id="portfolio-naslov" className="text-page-title">
            Portfolio
          </h1>
          <p className="text-lead">
            Sajtovi, aplikacije i video za firme iz cele Srbije. Uz svaki projekat piše šta je klijentu konkretno doneo.
          </p>
        </div>

        <PortfolioGrid projects={projects} filters={filters} />

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line pt-8">
          <p className="max-w-140 text-[clamp(20px,1.8vw,24px)] leading-[1.35] font-medium tracking-[-0.015em]">
            Vaš projekat može biti sledeći. <span className="text-muted">Ponudu šaljemo u roku od [24 sata].</span>
          </p>
          <ButtonLink href="/kontakt" arrow>
            Zatraži ponudu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
