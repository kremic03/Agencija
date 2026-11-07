import Image from "next/image";
import Link from "next/link";
import { droneVideo } from "@/content/media";
import { getService, serviceHref, services, type Service } from "@/content/services";
import { projects } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedProductions } from "@/components/sections/FeaturedProductions";
import { ExampleVideo } from "./ExampleVideo";

export function serviceMetadata(slug: string) {
  const { seo } = getService(slug);
  return pageMetadata({ ...seo, path: serviceHref(slug) });
}

// Raspored primera: 2/1 pa 1/2 kolone, visine 440 i 320 px (na telefonu jedna kolona).
// Od md (768 px) mreža ima 3 kolone: jedna je ~31vw, dve ~62vw.
const wideExample = "(min-width: 1100px) 800px, (min-width: 768px) 62vw, 100vw";
const narrowExample = "(min-width: 1100px) 400px, (min-width: 768px) 31vw, 100vw";
const exampleLayout = ["md:col-span-2 min-h-110", "min-h-110", "min-h-80", "md:col-span-2 min-h-80"];
const exampleSizes = [wideExample, narrowExample, narrowExample, wideExample];

const heroSizes = "(min-width: 1100px) 680px, 100vw";
const heroBox = "relative min-w-0 flex-[1.2_1_480px] overflow-hidden rounded-xl border border-line";

/**
 * Medij u uvodu: video (dron), screenshot u browser okviru ili ekran u okviru telefona.
 * Visok prioritet dobija samo medij koji je izmereni LCP element (video poster i
 * screenshot preko cele kutije); kod ostalih je LCP naslov, pa se slika samo ne odlaže.
 */
function HeroMediaBox({ service }: { service: Service }) {
  const { heroMedia, heroImage, heroOverlay } = service.page;

  if (heroMedia?.kind === "browser" && heroMedia.fit === "natural") {
    return (
      <div className={`${heroBox} bg-raised px-[clamp(16px,2.5vw,32px)] pt-[clamp(16px,2.5vw,32px)]`}>
        <BrowserFrame>
          <Image src={heroMedia.image.src} alt={heroMedia.image.alt} sizes={heroSizes} loading="eager" placeholder="blur" className="h-auto w-full" />
        </BrowserFrame>
      </div>
    );
  }

  return (
    <div className={`${heroBox} aspect-4/3 ${heroMedia && heroMedia.kind !== "video" ? "bg-raised" : ""}`}>
      {heroMedia?.kind === "video" && (
        <AutoplayVideo
          sources={droneVideo.sources}
          poster={droneVideo.poster}
          alt={droneVideo.poster.alt}
          sizes={heroSizes}
          highPriority
          deferUntilLoad
          controlsClassName="bottom-4 right-4"
        />
      )}
      {heroMedia?.kind === "browser" && (
        <BrowserFrame className="absolute inset-x-[clamp(16px,2.5vw,32px)] top-[clamp(16px,2.5vw,32px)] bottom-0">
          <Image
            src={heroMedia.image.src}
            alt={heroMedia.image.alt}
            fill
            sizes={heroSizes}
            fetchPriority="high"
            loading="eager"
            placeholder="blur"
            className="object-cover object-top"
          />
        </BrowserFrame>
      )}
      {heroMedia?.kind === "phone" && (
        // Pozadina u boji screenshot-a, da cela forma stane bez isecanja
        <PhoneFrame screenClassName="relative bg-[#e8e5de]">
          <Image src={heroMedia.image.src} alt={heroMedia.image.alt} fill sizes="260px" loading="eager" className="object-contain" />
        </PhoneFrame>
      )}
      {!heroMedia && <ImagePlaceholder label={heroImage} />}
      {heroOverlay && (
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 top-4 flex justify-between font-mono text-[11.5px] leading-none tracking-[0.06em] text-fg [text-shadow:0_1px_2px_rgb(0_0_0/0.6)]"
        >
          <span className="flex items-center gap-2">
            <span className="size-[7px] rounded-full bg-rec" />
            {heroOverlay.left}
          </span>
          <span>{heroOverlay.right}</span>
        </p>
      )}
    </div>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  const { page } = service;
  // Primeri sa stranice usluge, a ako ih nema, projekti te usluge iz portfolija
  const examples = (page.examples ?? projects.filter((p) => p.service === slug).slice(0, 4)).map((ex, i) => ({
    key: `${i}-${ex.title}`,
    title: ex.title,
    tag: ex.tag,
    duration: ex.video?.duration,
    media: ex.video ? (
      <ExampleVideo example={{ ...ex, video: ex.video }} sizes={exampleSizes[i % exampleSizes.length]} />
    ) : (
      <Image
        src={ex.image.src}
        alt={ex.image.alt}
        fill
        sizes={exampleSizes[i % exampleSizes.length]}
        placeholder="blur"
        className={ex.screenshot ? "object-cover object-left-top" : "object-cover"}
      />
    ),
  }));

  const path = serviceHref(slug);

  return (
    <>
      <JsonLd data={serviceSchema(service, path)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Usluge", path: "/usluge" },
          { name: service.name, path },
        ])}
      />
      {/* Uvod */}
      <section aria-labelledby="usluga-naslov" className="pt-[clamp(48px,5vw,80px)]">
        <div className="container-page flex flex-wrap items-center gap-x-16 gap-y-12">
          <div className="flex flex-[1_1_440px] flex-col gap-6">
            <nav aria-label="Putanja">
              <ol className="flex items-center gap-2 text-[13.5px] leading-none font-medium text-subtle">
                <li>
                  <Link href="/usluge" className="text-muted hover:text-fg">
                    Usluge
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span aria-current="page" className="text-fg">
                    {service.name}
                  </span>
                </li>
              </ol>
            </nav>
            <h1 id="usluga-naslov" className="text-page-title">
              {page.title}
            </h1>
            <p className="text-lead max-w-130">{page.intro}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/kontakt" arrow>
                Zatraži ponudu
              </ButtonLink>
              <ButtonLink href="#paketi" variant="secondary">
                Pogledaj pakete
              </ButtonLink>
            </div>
          </div>
          <HeroMediaBox service={service} />
        </div>
      </section>

      {/* Šta je uključeno */}
      <section aria-labelledby="ukljuceno-naslov" className="section-y">
        <div className="container-page flex flex-wrap gap-x-16 gap-y-10">
          <SectionHeading
            id="ukljuceno-naslov"
            title={page.included.title}
            className="max-w-90 flex-[1_1_280px]"
          />
          <ul className="grid flex-[2_1_520px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border-t border-line">
            {page.included.items.map((item) => (
              <li key={item.title} className="flex flex-col gap-2 border-b border-line pt-6 pr-6 pb-7">
                <h3 className="flex items-center gap-2.5 text-[17px] leading-[1.3] font-semibold">
                  <CheckIcon size={16} className="flex-none text-accent-text" />
                  {item.title}
                </h3>
                <p className="pl-6.5 text-[15px] leading-[1.55] text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {page.showProductions && <FeaturedProductions className="section-y container-page" />}

      {/* Primeri radova */}
      {examples.length > 0 && (
        <section aria-labelledby="primeri-naslov" className="section-y">
          <div className="container-page flex flex-col gap-10">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <SectionHeading id="primeri-naslov" title={page.examplesTitle} />
              <ButtonLink href="/portfolio" variant="secondary" size="sm" arrow className="h-11 rounded-md text-[15px]">
                Svi projekti
              </ButtonLink>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {examples.map((ex, i) => (
                <article
                  key={ex.key}
                  className={`relative flex min-w-0 flex-col justify-end overflow-hidden rounded-xl border border-line ${exampleLayout[i % exampleLayout.length]}`}
                >
                  <div className="absolute inset-0">{ex.media}</div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_60%,transparent)_35%,transparent_70%)]"
                  />
                  <div className="pointer-events-none relative flex flex-col gap-1.5 p-5">
                    <p className="font-mono text-xs leading-none tracking-[0.06em] text-muted uppercase">
                      {ex.tag}
                      {ex.duration && ` · ${ex.duration}`}
                    </p>
                    <h3 className="text-lg leading-[1.3] font-semibold">{ex.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Paketi */}
      <section id="paketi" aria-labelledby="paketi-naslov" className="section-y">
        <div className="container-page flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-4">
            <SectionHeading id="paketi-naslov" title={page.packages.title} className="max-w-160" />
            {page.packages.note && (
              <p className="flex-[0_1_340px] text-[14.5px] leading-[1.55] text-subtle">{page.packages.note}</p>
            )}
          </div>
          <ul className="flex flex-wrap items-stretch gap-4">
            {page.packages.items.map((pkg) => (
              <li
                key={pkg.name}
                className={`flex min-w-0 flex-[1_1_300px] flex-col gap-3 rounded-xl border p-7 ${
                  pkg.highlighted ? "border-accent bg-raised" : "border-line bg-surface"
                }`}
              >
                <div className="flex min-h-6.5 items-center justify-between gap-3">
                  <h3 className="text-xl leading-[1.2] font-semibold tracking-[-0.015em]">{pkg.name}</h3>
                  {pkg.highlighted && (
                    <span className="flex h-6.5 items-center rounded-sm bg-accent px-2.5 text-xs leading-none font-semibold text-on-accent">
                      Najčešći izbor
                    </span>
                  )}
                </div>
                <p className="min-h-[46px] text-[15px] leading-normal text-muted">{pkg.audience}</p>
                <ul className="flex flex-1 flex-col gap-3 border-t border-line pt-5">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15px] leading-[1.45]">
                      <CheckIcon size={16} className="mt-0.5 flex-none text-accent-text" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="/kontakt"
                  variant={pkg.highlighted ? "primary" : "secondary"}
                  size="md"
                  className="mt-2"
                  aria-label={`Izaberi paket ${pkg.name}`}
                >
                  Izaberi paket
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSection id="proces-usluge" title={page.process.title} steps={page.process.steps} variant="service" />

      <FaqSection title={page.faqTitle} items={page.faq} />

      {/* Ostale usluge */}
      <section aria-labelledby="druge-usluge-naslov" className="section-y">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading id="druge-usluge-naslov" title="Sve to radi isti tim." />
          <ul className="grid gap-4 md:grid-cols-3">
            {services
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <li key={s.slug} className="flex">
                  <Link
                    href={serviceHref(s.slug)}
                    className="flex w-full flex-col gap-2 rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                  >
                    <span className="text-lg leading-[1.3] font-semibold">{s.name}</span>
                    <span className="text-[15px] leading-[1.5] text-muted">{s.summary}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Poziv na akciju */}
      <section aria-labelledby="usluga-cta-naslov" className="section-y pb-[clamp(88px,9.5vw,144px)]">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-xl border border-line bg-surface p-[clamp(32px,4vw,56px)]">
            <div className="flex flex-[1_1_420px] flex-col gap-3">
              <h2 id="usluga-cta-naslov" className="text-[clamp(28px,2.6vw,36px)] leading-[1.15] font-semibold tracking-[-0.03em] text-balance">
                {page.cta.title}
              </h2>
              <p className="text-base leading-[1.6] text-muted">{page.cta.text}</p>
            </div>
            <ButtonLink href="/kontakt" arrow>
              Zatraži ponudu
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
