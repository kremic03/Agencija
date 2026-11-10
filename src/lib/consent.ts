/*
 * Pristanak posetioca za analitiku (Google Analytics).
 *
 * Izbor se čuva u localStorage-u, ne u kolačiću, i nikad ne napušta pregledač.
 * Dok posetilac ne izabere „Prihvatam”, Google skripta se ne učitava (član 12, stav 1,
 * tačka 1 ZZPL i Zakon o elektronskim komunikacijama: kolačić koji nije neophodan traži pristanak).
 *
 * Pri izmeni teksta banera ili svrhe obrade povećati VERSION: svi posetioci ponovo biraju.
 */

export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "webdron-kolacici";
const VERSION = 1;

const listeners = new Set<() => void>();
let settingsOpen = false;
// Poslednja pročitana vrednost, da useSyncExternalStore ne dobija novu vrednost pri svakom čitanju
let cached: { raw: string | null; choice: ConsentChoice | null } = { raw: null, choice: null };

const notify = () => listeners.forEach((listener) => listener());

function readRaw() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // Privatni prozor ili blokiran pristup skladištu: posetilac bira ponovo pri svakoj poseti
    return null;
  }
}

/** Sačuvan izbor posetioca; null dok ne izabere (ili ako je izbor iz starije verzije banera) */
export function getConsent(): ConsentChoice | null {
  const raw = readRaw();
  if (raw === cached.raw) return cached.choice;
  let choice: ConsentChoice | null = null;
  try {
    const saved = JSON.parse(raw ?? "null");
    if (saved?.v === VERSION && (saved.choice === "granted" || saved.choice === "denied")) choice = saved.choice;
  } catch {
    // Neispravan zapis: kao da izbora nema
  }
  cached = { raw, choice };
  return choice;
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: VERSION, choice, date: new Date().toISOString() }));
  } catch {
    // Izbor važi do zatvaranja stranice
    cached = { raw: null, choice };
  }
  settingsOpen = false;
  notify();
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  // Izbor napravljen u drugom tabu važi i ovde
  const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Link „Podešavanja kolačića” u footeru ponovo otvara baner */
export function openConsentSettings() {
  settingsOpen = true;
  notify();
}

export function closeConsentSettings() {
  settingsOpen = false;
  notify();
}

export const isConsentSettingsOpen = () => settingsOpen;
