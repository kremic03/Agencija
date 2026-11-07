"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Greška u samom root layoutu (header, footer). Zamenjuje ceo dokument, pa mora
 * da ima svoj <html> i <body> i ne sme da zavisi od komponenti koje su možda pale.
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="sr-Latn">
      <body className="flex min-h-dvh items-center bg-bg text-fg">
        <title>{`Greška | ${site.name}`}</title>
        <main className="container-page flex max-w-[calc(720px+2*clamp(20px,4vw,40px))] flex-col gap-8 py-16">
          <h1 className="text-page-title">Nešto nije u redu</h1>
          <p className="text-lead">Sajt trenutno ne možemo da prikažemo. Pokušajte ponovo za trenutak.</p>
          <p className="text-base leading-[1.7] text-muted">
            Ako se greška ponovi, pišite nam na{" "}
            <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4">
              {site.email}
            </a>{" "}
            ili pozovite{" "}
            <a href={site.phone.href} className="text-fg underline underline-offset-4">
              {site.phone.display}
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex h-12 cursor-pointer items-center justify-center rounded-lg bg-accent px-5 text-[15px] leading-none font-semibold text-on-accent hover:bg-accent-hover"
            >
              Pokušaj ponovo
            </button>
            {/* Običan link, ne <Link>: ceo dokument se učitava iznova, nezavisno od rutera koji je možda pao */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-line-strong px-5 text-[15px] leading-none font-semibold text-fg hover:bg-raised"
            >
              Na početnu
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
