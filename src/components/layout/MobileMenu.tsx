"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, site } from "@/content/site";
import { serviceGroups, serviceHref, services, type ServiceGroup } from "@/content/services";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

type Props = { open: boolean; onClose: () => void };

/**
 * Mobilni meni kao nativni <dialog>: zadržava fokus unutar menija,
 * zatvara se tasterom Escape i čini ostatak stranice neaktivnim.
 */
export function MobileMenu({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [servicesOpen, setServicesOpen] = useState(true);
  const listId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const groups = Object.keys(serviceGroups) as ServiceGroup[];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label="Meni"
      className="m-0 h-dvh max-h-none w-full max-w-none flex-col bg-bg p-0 text-fg backdrop:bg-transparent open:flex"
    >
      <div className="flex h-16 flex-none items-center justify-between border-b border-line px-5">
        <Logo />
        <button
          type="button"
          aria-label="Zatvori meni"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-lg border border-line-strong bg-surface"
        >
          <CloseIcon />
        </button>
      </div>

      <nav aria-label="Mobilna navigacija" className="flex-1 overflow-y-auto px-5 pt-2 pb-6">
        <button
          type="button"
          aria-expanded={servicesOpen}
          aria-controls={listId}
          onClick={() => setServicesOpen((v) => !v)}
          className="flex min-h-15 w-full items-center justify-between border-b border-line text-left text-[22px] leading-none font-semibold tracking-[-0.01em]"
        >
          Usluge
          <span className="grid size-8 place-items-center rounded-md bg-raised">
            {servicesOpen ? <MinusIcon size={14} /> : <PlusIcon size={14} />}
          </span>
        </button>
        <div id={listId} hidden={!servicesOpen} className="border-b border-line pt-4 pb-3">
          {groups.map((group, gi) => (
            <div key={group}>
              <p
                className={`pb-2 font-mono text-[11.5px] leading-none tracking-[0.06em] text-subtle uppercase ${gi > 0 ? "pt-4" : "pt-1"}`}
              >
                {serviceGroups[group]}
              </p>
              <ul className="flex flex-col gap-1">
                {services
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={serviceHref(s.slug)}
                        onClick={onClose}
                        className="-mx-3 flex min-h-14 flex-col justify-center gap-[3px] rounded-md px-3 py-1.5 active:bg-raised"
                      >
                        <span className="text-base leading-[1.25] font-medium">{s.name}</span>
                        <span className="text-sm leading-[1.35] text-muted">{s.summary}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <ul>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex min-h-15 items-center border-b border-line text-[22px] leading-none font-semibold tracking-[-0.01em]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-none flex-col gap-3 border-t border-line bg-surface px-5 pt-4 pb-6">
        <Link
          href="/kontakt"
          onClick={onClose}
          className="flex h-13 items-center justify-center rounded-lg bg-accent text-base font-semibold text-on-accent active:bg-accent-active focus-visible:outline-fg"
        >
          Zatraži ponudu
        </Link>
        <a href={site.phone.href} className="flex min-h-11 items-center justify-center text-[15px] font-medium text-muted">
          ili pozovite {site.phone.display}
        </a>
      </div>
    </dialog>
  );
}
