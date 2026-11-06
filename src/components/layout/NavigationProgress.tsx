"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ACTIVE = "is-active";
// Rezerva ako navigacija ne uspe, da traka ne ostane na ekranu
const GIVE_UP_MS = 10_000;

/**
 * Tanka traka na vrhu ekrana od klika na link do prikaza nove stranice.
 * Sluša klikove na nivou prozora, pa pokriva sve linkove, i one u mobilnom meniju
 * koji se zatvara na klik. Pojavljuje se tek posle 100 ms (globals.css), pa je na
 * brzim prelazima korisnik i ne vidi. Klasa se menja direktno na elementu da klik
 * ne pokreće dodatni React render.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let giveUp = 0;

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      clearTimeout(giveUp);
      bar.current?.classList.add(ACTIVE);
      giveUp = window.setTimeout(() => bar.current?.classList.remove(ACTIVE), GIVE_UP_MS);
    };

    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("click", onClick, true);
      clearTimeout(giveUp);
    };
  }, []);

  useEffect(() => {
    bar.current?.classList.remove(ACTIVE);
  }, [pathname]);

  return <div ref={bar} aria-hidden="true" className="nav-progress" />;
}
