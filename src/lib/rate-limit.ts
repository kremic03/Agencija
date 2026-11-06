/*
 * Ograničenje broja zahteva u memoriji servera.
 *
 * Svaka instanca servera broji za sebe i brojanje kreće iz početka posle
 * restarta. Na hostingu sa više instanci granica je zato približna: zaustavlja
 * rafale, ali nije tačan brojač. Za tačan brojač treba deljeno skladište.
 */

const MAX_TRACKED_KEYS = 10_000;

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const windows = new Map<string, { count: number; resetAt: number }>();

  /** Vraća true ako je zahtev dozvoljen i računa ga u prozor */
  return (key: string, now = Date.now()) => {
    if (windows.size >= MAX_TRACKED_KEYS) {
      // Memorija ne sme da raste bez granice, ni pod napadom sa mnogo adresa
      for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
      if (windows.size >= MAX_TRACKED_KEYS) windows.clear();
    }

    const current = windows.get(key);
    if (!current || current.resetAt <= now) {
      windows.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    if (current.count >= limit) return false;
    current.count += 1;
    return true;
  };
}
