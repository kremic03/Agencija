import Link from "next/link";
import { serviceHref, servicesByGroup } from "@/content/services";

/** Usluge u mobilnom meniju. Renderuje se na serveru i prosleđuje MobileMenu-u. */
export function MobileServiceLinks() {
  return servicesByGroup().map(({ group, label, items }, gi) => (
    <div key={group}>
      <p className={`pb-2 font-mono text-[11.5px] leading-none tracking-[0.06em] text-subtle uppercase ${gi > 0 ? "pt-4" : "pt-1"}`}>
        {label}
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((s) => (
          <li key={s.slug}>
            <Link
              href={serviceHref(s.slug)}
              className="-mx-3 flex min-h-14 flex-col justify-center gap-[3px] rounded-md px-3 py-1.5 active:bg-raised"
            >
              <span className="text-base leading-[1.25] font-medium">{s.name}</span>
              <span className="text-sm leading-[1.35] text-muted">{s.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
}
