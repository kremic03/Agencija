"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { mainNav, site } from "@/content/site";
import { ArrowRightIcon, ChevronDownIcon, MenuIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const MEGA_ID = "mega-meni-usluge";

const navItem =
  "relative flex h-9 items-center gap-1.5 rounded-md px-3 text-[14.5px] leading-none font-medium transition-colors";

function ActiveBar({ narrow }: { narrow?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-px left-3 h-0.5 rounded-xs bg-accent ${narrow ? "right-6" : "right-3"}`}
    />
  );
}

type Props = {
  /** Sadržaj mega menija, renderovan na serveru (MegaMenu) */
  megaMenu: ReactNode;
  /** Usluge u mobilnom meniju, renderovane na serveru (MobileServiceLinks) */
  mobileServices: ReactNode;
};

export function Header({ megaMenu, mobileServices }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMega = () => setMegaOpen(false);
  const closeMegaOnLink = (e: MouseEvent) => {
    if ((e.target as Element).closest("a")) closeMega();
  };

  // Na početnoj header je providan preko uvodnog videa dok se ne skroluje
  const overlay = isHome && !scrolled && !megaOpen;
  const isCurrent = (href: string) => !href.includes("#") && pathname === href;
  const servicesCurrent = pathname.startsWith("/usluge");

  return (
    <header
      onKeyDown={(e) => {
        if (e.key === "Escape" && megaOpen) {
          closeMega();
          megaButton.current?.focus();
        }
      }}
      // Fokus tastature izašao iz headera (npr. Tab posle poslednjeg linka) zatvara meni
      onBlur={(e) => {
        if (megaOpen && !e.currentTarget.contains(e.relatedTarget)) closeMega();
      }}
      onMouseLeave={closeMega}
      className={`sticky top-0 z-50 border-b transition-colors ${
        overlay
          ? "border-transparent"
          : isHome
            ? "border-line bg-bg/72 backdrop-blur-[14px] backdrop-saturate-140"
            : "border-line bg-bg"
      }`}
    >
      {/* Desktop */}
      <div className="container-page hidden h-18 grid-cols-[1fr_auto_1fr] items-center nav:grid">
        <Link href="/" aria-label={`${site.name} – početna`} className="justify-self-start rounded-md focus-visible:outline-offset-4">
          <Logo />
        </Link>

        <nav aria-label="Glavna navigacija">
          <ul className="flex items-center gap-1">
            <li>
              <button
                ref={megaButton}
                type="button"
                aria-expanded={megaOpen}
                aria-controls={megaOpen ? MEGA_ID : undefined}
                onClick={() => setMegaOpen((v) => !v)}
                onMouseEnter={() => setMegaOpen(true)}
                className={`${navItem} ${megaOpen ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg"} ${servicesCurrent ? "text-fg" : ""} cursor-pointer active:bg-pressed`}
              >
                Usluge
                <ChevronDownIcon className={megaOpen ? "rotate-180" : ""} />
                {servicesCurrent && !megaOpen && <ActiveBar narrow />}
              </button>
            </li>
            {mainNav.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onMouseEnter={closeMega}
                    className={`${navItem} ${current ? "text-fg" : "text-muted hover:text-fg"} hover:bg-raised active:bg-pressed`}
                  >
                    {item.label}
                    {current && <ActiveBar />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/kontakt"
          className="flex h-10 items-center gap-2 justify-self-end rounded-md bg-accent px-4 text-[14.5px] font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-active focus-visible:outline-fg"
        >
          Zatraži ponudu
          <ArrowRightIcon />
        </Link>
      </div>

      {megaOpen && (
        <div id={MEGA_ID} onClick={closeMegaOnLink} className="absolute inset-x-0 top-[68px]">
          {megaMenu}
        </div>
      )}

      {/* Mobilni */}
      <div className="flex h-16 items-center justify-between px-5 nav:hidden">
        <Link href="/" aria-label={`${site.name} – početna`} className="flex min-h-11 items-center">
          <Logo />
        </Link>
        <button
          type="button"
          aria-label="Otvori meni"
          aria-expanded={mobileOpen}
          aria-haspopup="dialog"
          onClick={() => setMobileOpen(true)}
          className="grid size-11 place-items-center rounded-lg border border-line-strong bg-surface active:bg-pressed"
        >
          <MenuIcon />
        </button>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} services={mobileServices} />
    </header>
  );
}
