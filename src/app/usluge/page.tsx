import Link from "next/link";
import { serviceHref, servicesByGroup } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata = pageMetadata({
  title: "Usluge: sajtovi, aplikacije i snimanje dronom",
  description:
    "Izrada veb sajtova i web shopova, mobilne i veb aplikacije po meri i snimanje dronom za mala i srednja preduzeća širom Srbije, uz fiksnu cenu.",
  path: "/usluge",
});

export default function ServicesPage() {
  return (
    <section aria-labelledby="usluge-strana-naslov" className="pt-[clamp(48px,6vw,96px)] pb-[clamp(88px,9.5vw,144px)]">
      <JsonLd data={breadcrumbSchema([{ name: "Usluge", path: "/usluge" }])} />
      <div className="container-page flex flex-col gap-12">
        <div className="flex max-w-180 flex-col gap-5">
          <h1 id="usluge-strana-naslov" className="text-page-title">
            Usluge
          </h1>
          <p className="text-lead">
            Sajt, aplikacija i snimak iz vazduha na jednom mestu. Recite nam cilj, a mi predlažemo rešenje i cenu koju
            znate pre početka.
          </p>
        </div>

        {servicesByGroup().map(({ group, label, items }) => (
          <section key={group} aria-labelledby={`grupa-${group}`} className="flex flex-col gap-5">
            <h2 id={`grupa-${group}`} className="eyebrow">
              {label}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {items.map((s) => (
                <li key={s.slug} className="flex">
                  <Link
                    href={serviceHref(s.slug)}
                    className="flex w-full flex-col gap-3 rounded-xl border border-line bg-surface p-7 transition-colors hover:border-line-strong"
                  >
                    <h3 className="text-card-title">{s.name}</h3>
                    <p className="flex-1 text-base leading-[1.55] text-muted">{s.cardText}</p>
                    <span className="flex items-center justify-between gap-3 pt-2 text-[15px] font-semibold">
                      <span className="font-normal text-muted">od {s.priceFrom}</span>
                      <span className="flex items-center gap-2 text-accent-text">
                        Pogledaj pakete
                        <ArrowRightIcon />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line pt-8">
          <p className="max-w-140 text-[clamp(20px,1.8vw,24px)] leading-[1.35] font-medium tracking-[-0.015em]">
            Niste sigurni šta vam treba? <span className="text-muted">Opišite cilj, a mi predlažemo rešenje.</span>
          </p>
          <ButtonLink href="/kontakt" arrow>
            Zatraži ponudu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
