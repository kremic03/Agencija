"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

/** Lepljivi podmeni stranice „O nama”; aktivna je sekcija najbliža vrhu ekrana */
export function AboutSubnav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const nodes = sections.map((s) => document.getElementById(s.id)).filter((n): n is HTMLElement => n !== null);
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        const [topmost] = [...visible.entries()].sort((a, b) => a[1] - b[1]);
        if (topmost) setActive(topmost[0]);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Sadržaj stranice"
      // Kad se header sakrije pri skrolu nadole, podmeni se penje do vrha ekrana istim tempom
      className="sticky top-[65px] z-40 border-b border-line bg-bg/88 backdrop-blur-md backdrop-saturate-140 transition-[top] duration-300 ease-out motion-reduce:transition-none nav:top-[73px] [html[data-header-hidden]_&]:top-0 [html[data-header-hidden]_&]:duration-200 [html[data-header-hidden]_&]:ease-in"
    >
      <div className="container-page flex gap-1 overflow-x-auto [scrollbar-width:none]">
        {sections.map((s) => {
          const current = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={current ? "location" : undefined}
              className={`relative flex h-13 flex-none items-center px-3.5 text-[14.5px] leading-none whitespace-nowrap transition-colors focus-visible:-outline-offset-2 ${
                current ? "font-semibold text-fg" : "font-medium text-muted hover:text-fg"
              }`}
            >
              {s.label}
              {current && <span aria-hidden="true" className="absolute right-3.5 -bottom-px left-3.5 h-0.5 rounded-xs bg-accent" />}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
