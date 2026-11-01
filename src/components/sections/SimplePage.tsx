import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

type Props = { title: string; intro: string; children?: ReactNode };

/** Jednostavna tekstualna stranica (O nama, politika privatnosti, 404) */
export function SimplePage({ title, intro, children }: Props) {
  return (
    <section aria-labelledby="stranica-naslov" className="pt-[clamp(48px,6vw,96px)] pb-[clamp(88px,9.5vw,144px)]">
      <div className="container-page flex max-w-[calc(720px+2*clamp(20px,4vw,40px))] flex-col gap-8">
        <h1 id="stranica-naslov" className="text-page-title">
          {title}
        </h1>
        <p className="text-lead">{intro}</p>
        {children && <div className="flex flex-col gap-4 text-base leading-[1.7] text-muted">{children}</div>}
        <div className="pt-4">
          <ButtonLink href="/kontakt" arrow>
            Zatraži ponudu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
