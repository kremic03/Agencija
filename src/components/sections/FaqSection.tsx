import type { ReactNode } from "react";
import type { Faq } from "@/content/services";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = { eyebrow: string; title: string; items: Faq[]; children?: ReactNode };

export function FaqSection({ eyebrow, title, items, children }: Props) {
  return (
    <section aria-labelledby="faq-naslov" className="section-y">
      <div className="container-page flex flex-wrap gap-x-16 gap-y-10">
        <SectionHeading id="faq-naslov" eyebrow={eyebrow} title={title} className="max-w-100 flex-[1_1_300px]">
          {children}
        </SectionHeading>
        <FaqList items={items} />
      </div>
    </section>
  );
}
