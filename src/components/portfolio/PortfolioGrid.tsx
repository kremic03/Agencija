"use client";

import { useState, type CSSProperties } from "react";
import type { Project } from "@/content/portfolio";
import { PlayIcon } from "@/components/ui/icons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type Filter = { key: string; label: string };
type Props = { projects: Project[]; filters: Filter[] };

// Mreža: redovi od 24 px; kartica je visoka 11 redova (× rows na desktopu)
const ROWS = 11;

function countLabel(n: number) {
  if (n === 1) return "1 projekat";
  if (n > 1 && n < 5) return `${n} projekta`;
  return `${n} projekata`;
}

function Media({ project }: { project: Project }) {
  if (project.media === "video") {
    return (
      <>
        <div className="absolute inset-0">
          <ImagePlaceholder label={project.image} />
        </div>
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full border border-white/20 bg-bg/70 text-fg backdrop-blur-sm"
        >
          <PlayIcon size={16} />
        </span>
        {project.duration && (
          <span className="absolute right-3 bottom-3 flex h-6 items-center rounded-sm bg-bg/75 px-2 font-mono text-xs leading-none">
            <span className="sr-only">Trajanje: </span>
            {project.duration}
          </span>
        )}
      </>
    );
  }

  if (project.media === "site") {
    return (
      <div className="absolute inset-0 flex flex-col bg-raised px-6 pt-6">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-md border border-b-0 border-line-strong bg-surface">
          <div aria-hidden="true" className="flex h-7.5 flex-none items-center gap-1.5 border-b border-line px-3">
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="ml-3 font-mono text-[11.5px] leading-none text-subtle">{project.url}</span>
          </div>
          <div className="min-h-0 flex-1">
            <ImagePlaceholder label={project.image} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-raised">
      <div className="absolute top-7 bottom-0 left-1/2 aspect-9/17 -translate-x-1/2 rounded-t-[30px] border border-b-0 border-line-strong bg-bg p-[7px] pb-0">
        <div className="h-full overflow-hidden rounded-t-[23px]">
          <ImagePlaceholder label={project.image} />
        </div>
      </div>
    </div>
  );
}

export function PortfolioGrid({ projects, filters }: Props) {
  const [active, setActive] = useState("all");
  const list = projects.filter((p) => active === "all" || p.service === active);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div
          role="group"
          aria-label="Filtriraj po usluzi"
          className="-mx-[clamp(20px,4vw,40px)] flex gap-2 overflow-x-auto px-[clamp(20px,4vw,40px)] py-0.5 [scrollbar-width:none]"
        >
          {filters.map((f) => {
            const on = f.key === active;
            const n = f.key === "all" ? projects.length : projects.filter((p) => p.service === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f.key)}
                className={`flex h-11 flex-none cursor-pointer items-center gap-2 rounded-full border px-4 text-[14.5px] leading-none transition-colors ${
                  on
                    ? "border-fg bg-fg font-semibold text-bg"
                    : "border-line-strong font-medium text-muted hover:border-subtle hover:bg-surface hover:text-fg active:bg-raised"
                }`}
              >
                {f.label}
                <span className={`font-mono text-xs leading-none ${on ? "opacity-70" : "text-subtle"}`}>{n}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="font-mono text-[13px] leading-none text-subtle">
          {countLabel(list.length)}
        </p>
      </div>

      <ul className="grid auto-rows-[24px] grid-flow-dense grid-cols-1 gap-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-12">
        {list.map((p) => {
          const wideOnTablet = p.cols >= 7;
          const vars = {
            "--c": p.cols,
            "--rm": ROWS,
            "--rt": ROWS + (p.media === "phone" ? 3 : 0),
            "--rd": ROWS * p.rows,
          } as CSSProperties;
          return (
            <li
              key={p.id}
              style={vars}
              className={`col-span-full row-span-(--rm) min-[700px]:row-span-(--rt) min-[1100px]:col-span-(--c) min-[1100px]:row-span-(--rd) ${
                wideOnTablet ? "" : "min-[700px]:col-span-1"
              }`}
            >
              <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-surface">
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <Media project={p} />
                </div>
                <div className="flex flex-none items-center justify-between gap-4 border-t border-line px-5 py-4">
                  <div className="flex min-w-0 flex-col gap-[5px]">
                    <h2 className="text-base leading-[1.25] font-semibold">{p.title}</h2>
                    <p className="text-sm leading-[1.3] text-muted">{p.result}</p>
                  </div>
                  <span className="flex h-6.5 flex-none items-center rounded-sm border border-line-strong px-2.5 text-xs leading-none font-medium text-muted">
                    {p.tag}
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}
