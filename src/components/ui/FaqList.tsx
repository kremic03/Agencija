import type { Faq } from "@/content/services";
import { MinusIcon, PlusIcon } from "./icons";

/**
 * Česta pitanja kao <details>: radi bez JavaScript-a, dostupno sa tastature,
 * a odgovori su u HTML-u i za pretraživače.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="min-w-0 flex-[2_1_480px] border-t border-line">
      {items.map((item, i) => (
        <details key={item.question} open={i === 0} className="group border-b border-line">
          <summary className="flex min-h-17 cursor-pointer list-none items-center justify-between gap-6 py-3 text-[17px] leading-[1.4] font-medium transition-colors hover:text-accent-text [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="grid size-8 flex-none place-items-center rounded-md border border-line-strong text-fg">
              <PlusIcon className="group-open:hidden" />
              <MinusIcon className="hidden group-open:block" />
            </span>
          </summary>
          <p className="pr-14 pb-6 text-base leading-[1.6] text-pretty text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
