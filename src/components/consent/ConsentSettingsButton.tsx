"use client";

import { openConsentSettings } from "@/lib/consent";

/** Link u footeru: posetilac u svakom trenutku može da promeni ili povuče pristanak */
export function ConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={`cursor-pointer ${className ?? ""}`}>
      Podešavanja kolačića
    </button>
  );
}
