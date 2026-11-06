"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Ubrzava na početku, usporava pred sekcijom
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Skrol do elementa, animiran osim ako je `instant`; korisnikov točkić, dodir ili taster ga prekida */
function scrollToElement(target: HTMLElement, onDone: () => void, instant = false) {
  // Isti razmak ispod lepljivog headera kao scroll-padding-top u globals.css
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const startY = window.scrollY;
  const endY = Math.min(
    target.getBoundingClientRect().top + startY - offset,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const distance = endY - startY;

  if (instant || Math.abs(distance) < 2 || window.matchMedia(REDUCED_MOTION).matches) {
    window.scrollTo({ top: endY, behavior: "instant" });
    onDone();
    return;
  }

  const duration = Math.min(1200, 450 + Math.abs(distance) * 0.3);
  const start = performance.now();
  let frame = 0;
  const cancel = () => {
    cancelAnimationFrame(frame);
    stopListening();
  };
  const events = ["wheel", "touchstart", "keydown"] as const;
  const stopListening = () => events.forEach((e) => window.removeEventListener(e, cancel));
  events.forEach((e) => window.addEventListener(e, cancel, { passive: true, once: true }));

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: startY + distance * easeInOutCubic(t), behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
    else {
      stopListening();
      onDone();
    }
  };
  frame = requestAnimationFrame(step);
}

/** Fokus na sekciju posle skrola, da Tab nastavi odatle (kao kod običnog linka ka sekciji) */
function focusSection(target: HTMLElement) {
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

/**
 * Klik na link ka sekciji (npr. /#proces) glatko spušta stranicu do nje.
 * Sa druge stranice: nova stranica se otvara odmah na sekciji, bez klizanja.
 * Uz smanjeno kretanje skok je uvek trenutan.
 */
export function SmoothAnchorScroll() {
  const router = useRouter();

  useEffect(() => {
    let cancelWait = () => {};

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href);
      const id = decodeURIComponent(url.hash.slice(1));
      if (url.origin !== location.origin || !id) return;

      // Sprečava i skok browsera i navigaciju next/link (on preskače klik sa defaultPrevented)
      e.preventDefault();
      cancelWait();
      const samePage = url.pathname === location.pathname;
      // Hash u adresi posle skrola; Next prati i ručne pushState/replaceState pozive
      const finish = (target: HTMLElement) => () => {
        if (location.hash !== url.hash) history[samePage ? "pushState" : "replaceState"](null, "", url.hash);
        focusSection(target);
      };

      if (samePage) {
        const target = document.getElementById(id);
        if (target) requestAnimationFrame(() => scrollToElement(target, finish(target)));
        return;
      }

      router.push(url.pathname + url.search);
      // Čeka da nova stranica bude prikazana (skrivene rute u <Activity> nemaju offsetParent)
      let frame = 0;
      const deadline = performance.now() + 5000;
      const wait = () => {
        const target = document.getElementById(id);
        if (location.pathname === url.pathname && target?.offsetParent) {
          // U istom frejmu pre iscrtavanja, da se vrh stranice i ne vidi
          scrollToElement(target, finish(target), true);
        } else if (performance.now() < deadline) {
          frame = requestAnimationFrame(wait);
        }
      };
      frame = requestAnimationFrame(wait);
      cancelWait = () => cancelAnimationFrame(frame);
    };

    // Capture na window: stiže pre React-ovih slušalaca (i next/link) na document-u
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("click", onClick, true);
      cancelWait();
    };
  }, [router]);

  return null;
}
