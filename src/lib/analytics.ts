/*
 * Slanje događaja u Google Analytics. Bez pristanka posetioca gtag ne postoji,
 * pa se događaj tiho preskače: nijedan poziv ne može da pošalje podatke pre pristanka.
 */

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** Poziva se samo posle pristanka (Analytics.tsx) */
export function initGtag(measurementId: string) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  // gtag.js očekuje baš `arguments` objekat, ne niz
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    // Sajt ne služi za oglašavanje: oglasni kolačići i slanje podataka za reklame ostaju isključeni
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  window.gtag?.("event", name, params);
}

/** Povlačenje pristanka: Google prestaje da koristi kolačiće, a postojeći _ga kolačići se brišu */
export function revokeAnalytics() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = location.hostname;
  // gtag postavlja kolačić na najviši domen (.webdron.live), pa se briše i tamo i na tačnoj adresi
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
