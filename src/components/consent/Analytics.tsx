"use client";

import Script from "next/script";
import { useEffect } from "react";
import { initGtag, trackEvent } from "@/lib/analytics";
import { useConsent } from "./useConsent";

/**
 * Google Analytics 4, samo uz pristanak posetioca. Prelaske između stranica GA beleži sam
 * („Page changes based on browser history events” u Enhanced measurement podešavanjima toka).
 */
export function Analytics({ measurementId }: { measurementId: string }) {
  const granted = useConsent() === "granted";

  useEffect(() => {
    if (granted) initGtag(measurementId);
  }, [granted, measurementId]);

  // Klik na telefon ili mejl je takođe upit; GA ih ne beleži sam (nisu odlazni linkovi ka sajtu)
  useEffect(() => {
    if (!granted) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.("a[href^='tel:'], a[href^='mailto:']");
      if (link instanceof HTMLAnchorElement) trackEvent(link.protocol === "tel:" ? "phone_click" : "email_click");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [granted]);

  if (!granted) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />;
}
