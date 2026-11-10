import { test as base, expect } from "@playwright/test";

type Options = {
  /** Testovi koji namerno izazivaju grešku u pregledaču ovo isključuju */
  failOnConsoleError: boolean;
  /**
   * Izbor za kolačiće koji posetilac „već ima” pri prvom otvaranju stranice, da baner ne
   * prekriva sadržaj u testovima koji se njime ne bave. null = prva poseta, baner se vidi.
   */
  consent: "granted" | "denied" | null;
};

/** Ista vrednost kao u src/lib/consent.ts */
export const CONSENT_KEY = "webdron-kolacici";

/** Svaki test pada ako se u pregledaču pojavi greška */
export const test = base.extend<Options>({
  failOnConsoleError: [true, { option: true }],
  consent: ["denied", { option: true }],
  page: async ({ page, failOnConsoleError, consent }, runTest) => {
    // Nijedan test ne šalje ništa pravom Google-u; gtag.js se zamenjuje praznom skriptom
    await page.route(/googletagmanager\.com|google-analytics\.com/, (route) =>
      route.fulfill({ status: 200, contentType: "text/javascript", body: "" }),
    );
    if (consent) {
      await page.addInitScript(
        ([key, choice]) => {
          if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ v: 1, choice, date: "test" }));
        },
        [CONSENT_KEY, consent],
      );
    }

    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await runTest(page);
    if (failOnConsoleError) expect(errors, "greške u konzoli pregledača").toEqual([]);
  },
});

export { expect };
