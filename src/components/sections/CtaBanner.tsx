import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import { media } from "@/content/media";

type Props = { title: string; text: string };

/** Završni poziv na početnoj: tekst levo, fotografija iz drona desno */
export function CtaBanner({ title, text }: Props) {
  return (
    <section aria-labelledby="cta-naslov" className="section-y pb-[clamp(88px,9.5vw,144px)]">
      <div className="container-page">
        <div className="relative flex min-h-105 items-center overflow-hidden rounded-xl border border-line bg-surface">
          <div className="absolute inset-y-0 right-0 w-[58%]">
            <Image src={media.droneHorizon.src} alt="" fill sizes="(min-width: 1100px) 740px, 60vw" placeholder="blur" className="object-cover" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-surface)_42%,color-mix(in_srgb,var(--color-surface)_40%,transparent)_70%,transparent_100%)]"
          />
          <div className="relative flex max-w-155 flex-col gap-5 p-[clamp(32px,5vw,72px)]">
            <h2 id="cta-naslov" className="text-[clamp(32px,3.4vw,48px)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
              {title}
            </h2>
            <p className="text-[17px] leading-[1.6] text-muted">{text}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <ButtonLink href="/kontakt" arrow>
                Zatraži ponudu
              </ButtonLink>
              <a href={site.phone.href} className="flex min-h-11 items-center text-[15px] font-medium text-muted hover:text-fg">
                ili pozovite {site.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
