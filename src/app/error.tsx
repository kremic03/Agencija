"use client";

import { useEffect } from "react";
import { SimplePage } from "@/components/sections/SimplePage";
import { site } from "@/content/site";

/**
 * Neočekivana greška pri prikazu stranice. Header i footer ostaju, pa posetilac
 * može da ode dalje ili da nam piše. Detalji greške se ne prikazuju (u produkciji
 * ih Next ionako sakriva); `digest` povezuje grešku sa logom servera.
 */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SimplePage
      title="Nešto nije u redu"
      intro="Stranicu trenutno ne možemo da prikažemo. Pokušajte ponovo za trenutak."
    >
      <p>
        Ako se greška ponovi, pišite nam na{" "}
        <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4 hover:text-accent-text">
          {site.email}
        </a>
        .
      </p>
      <div>
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex h-12 cursor-pointer items-center justify-center rounded-lg border border-line-strong px-5 text-[15px] leading-none font-semibold text-fg transition-colors hover:border-subtle hover:bg-raised active:bg-pressed focus-visible:outline-offset-3"
        >
          Pokušaj ponovo
        </button>
      </div>
    </SimplePage>
  );
}
