"use client";

import Link from "next/link";
import { closeConsentSettings, setConsent, type ConsentChoice } from "@/lib/consent";
import { revokeAnalytics } from "@/lib/analytics";
import { CloseIcon } from "@/components/ui/icons";
import { useConsent, useConsentSettingsOpen } from "./useConsent";

// Oba dugmeta jednako uočljiva: odbijanje ne sme biti teže od prihvatanja
const choiceButton =
  "flex h-11 flex-1 cursor-pointer items-center justify-center rounded-lg border border-line-strong px-4 text-[15px] font-semibold text-fg hover:border-subtle hover:bg-raised active:bg-pressed";

const focusOnMount = (el: HTMLElement | null) => el?.focus();

/**
 * Pitanje za analitiku. Ne blokira sajt: dok posetilac ne izabere, analitika je isključena.
 * Ponovo se otvara linkom „Podešavanja kolačića” u footeru.
 */
export function ConsentBanner() {
  const consent = useConsent();
  const settingsOpen = useConsentSettingsOpen();
  // undefined: pre hidracije se ne zna da li je posetilac već birao
  if (consent === undefined || (consent !== null && !settingsOpen)) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    if (consent === "granted" && choice === "denied") {
      // Već učitan gtag.js ne može da se ukloni, pa ga tek novo učitavanje stranice gasi
      revokeAnalytics();
      location.reload();
    }
  };

  return (
    <section
      aria-labelledby="kolacici-naslov"
      className="fixed inset-x-4 bottom-4 z-60 flex flex-col gap-4 rounded-xl border border-line-strong bg-surface p-5 shadow-[0_12px_40px_rgb(0_0_0/0.5)] sm:left-auto sm:w-[420px]"
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id="kolacici-naslov"
          // Posle klika na „Podešavanja kolačića” fokus prelazi ovde, da tastatura nastavi u baneru
          ref={settingsOpen ? focusOnMount : undefined}
          tabIndex={-1}
          className="text-[16.5px] leading-[1.3] font-semibold outline-none"
        >
          Kolačići za analitiku
        </h2>
        {settingsOpen && (
          <button
            type="button"
            onClick={closeConsentSettings}
            aria-label="Zatvori"
            className="-mt-1.5 -mr-1.5 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted hover:bg-raised hover:text-fg"
          >
            <CloseIcon size={18} />
          </button>
        )}
      </div>
      <p className="text-[14.5px] leading-[1.55] text-pretty text-muted">
        Uz vaš pristanak koristimo Google Analytics da vidimo koliko ljudi poseti sajt i koje stranice čitaju. Bez
        pristanka se ništa ne prati.{" "}
        <Link href="/politika-privatnosti#kolacici" className="text-fg underline underline-offset-4 hover:text-accent-text">
          Više o tome
        </Link>
        {consent && (
          <span className="mt-2 block text-subtle">
            Trenutno: analitika je {consent === "granted" ? "uključena" : "isključena"}.
          </span>
        )}
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={() => choose("denied")} className={choiceButton}>
          Odbijam
        </button>
        <button type="button" onClick={() => choose("granted")} className={choiceButton}>
          Prihvatam
        </button>
      </div>
    </section>
  );
}
