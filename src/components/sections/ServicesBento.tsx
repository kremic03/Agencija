import Image from "next/image";
import Link from "next/link";
import { media } from "@/content/media";
import { getService, serviceGroups, serviceHref, type Service } from "@/content/services";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Od ~880 px kartice stoje po dve u redu (7/5 i 5/7 kolona); ispod toga svaka je pune širine
const card =
  "flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong";

function CardText({ service, className = "" }: { service: Service; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="flex justify-between gap-3 font-mono text-xs leading-none tracking-[0.06em] text-subtle uppercase">
        <span>{serviceGroups[service.group]}</span>
        <span className="text-muted">od {service.priceFrom}</span>
      </p>
      <h3 className="text-card-title">{service.name}</h3>
      <p className="max-w-115 text-base leading-[1.55] text-muted">{service.cardText}</p>
    </div>
  );
}

/** Bento raspored 7/5 i 5/7 kolona — svaka kartica ima drugačiji medij */
export function ServicesBento() {
  const web = getService("izrada-sajtova");
  const mobile = getService("mobilne-aplikacije");
  const webapp = getService("veb-aplikacije");
  const drone = getService("snimanje-dronom");

  return (
    <section id="usluge" aria-labelledby="usluge-naslov" className="section-y">
      <div className="container-page flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <SectionHeading
            id="usluge-naslov"
            eyebrow="(01) Usluge"
            title="Četiri usluge, jedan tim. Od prvog piksela do poslednjeg kadra."
            className="max-w-180 flex-[1_1_520px]"
          />
          <p className="flex-[0_1_360px] text-base leading-[1.6] text-pretty text-muted">
            Ne morate da znate šta je „responsive“ ili „color grading“. Recite nam cilj — mi predlažemo rešenje i cenu.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <Link href={serviceHref(web.slug)} className={`${card} flex-[7_1_460px]`}>
              <CardText service={web} className="p-7" />
              <div className="mt-auto h-60 px-7">
                <div className="relative h-full overflow-hidden rounded-t-md border border-b-0 border-line-strong">
                  <Image
                    src={media.webShopHome.src}
                    alt=""
                    fill
                    sizes="(min-width: 1100px) 680px, (min-width: 880px) 50vw, 100vw"
                    placeholder="blur"
                    className="object-cover object-left-top"
                  />
                </div>
              </div>
            </Link>
            <Link href={serviceHref(mobile.slug)} className={`${card} flex-[5_1_320px]`}>
              <CardText service={mobile} className="p-7" />
              <div className="mt-auto flex h-60 justify-center px-7">
                <div className="h-full w-50 rounded-t-[28px] border border-b-0 border-line-strong bg-raised px-2 pt-2">
                  <div className="relative h-full overflow-hidden rounded-t-[20px]">
                    <Image src={media.webShopLogin.src} alt="" fill sizes="200px" placeholder="blur" className="object-cover object-top" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={serviceHref(webapp.slug)} className={`${card} flex-[5_1_320px]`}>
              <CardText service={webapp} className="p-7" />
              <div className="mt-auto h-60 pl-7">
                <div className="relative h-full overflow-hidden rounded-tl-md border-t border-l border-line-strong">
                  <Image
                    src={media.webShopLogin.src}
                    alt=""
                    fill
                    sizes="(min-width: 1100px) 500px, (min-width: 880px) 36vw, 100vw"
                    placeholder="blur"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={serviceHref(drone.slug)}
              className={`${card} relative min-h-105 flex-[7_1_460px] justify-end bg-transparent`}
            >
              <Image
                src={media.droneOverview.src}
                alt=""
                fill
                sizes="(min-width: 1100px) 700px, (min-width: 880px) 54vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_85%,transparent)_32%,transparent_70%)]"
              />
              <div className="relative flex flex-col gap-3 p-7">
                <CardText service={drone} />
                <span className="flex items-center gap-2 pt-1 text-[15px] font-semibold text-accent-text">
                  Pogledaj pakete
                  <ArrowRightIcon />
                </span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
