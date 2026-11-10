import type { Page } from "@playwright/test";
import { CONSENT_KEY, expect, test } from "./support/fixtures";
import { GA_TEST_ID } from "./support/constants";

/*
 * Google Analytics sme da se učita samo posle „Prihvatam” (ZZPL, Zakon o elektronskim komunikacijama).
 * Pravi Google se nikad ne poziva: fixtures.ts zahteve zamenjuje praznom skriptom.
 */

test.use({ consent: null });

const banner = (page: Page) => page.getByRole("region", { name: "Kolačići za analitiku" });

/** Beleži svaki zahtev ka Google-u od trenutka poziva */
function googleRequests(page: Page) {
  const urls: string[] = [];
  page.on("request", (r) => {
    if (/googletagmanager\.com|google-analytics\.com/.test(r.url())) urls.push(r.url());
  });
  return urls;
}

/** Pozivi gtag-a kao nizovi, npr. ["event", "generate_lead", {...}] */
const gtagCalls = (page: Page) =>
  page.evaluate(() => (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>)));

const savedChoice = (page: Page) =>
  page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "null")?.choice ?? null, CONSENT_KEY);

test("prva poseta: baner se vidi, a Google se ne učitava dok posetilac ne izabere", async ({ page, context }) => {
  const requests = googleRequests(page);
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(banner(page)).toBeVisible();
  await expect(banner(page).getByRole("link", { name: "Više o tome" })).toHaveAttribute(
    "href",
    "/politika-privatnosti#kolacici",
  );
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => typeof window.gtag)).toBe("undefined");
  expect(await context.cookies()).toEqual([]);
});

test("„Odbijam”: baner nestaje, izbor se pamti i Google se ne učitava ni posle", async ({ page, context }) => {
  const requests = googleRequests(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Odbijam" }).click();
  await expect(banner(page)).toBeHidden();
  expect(await savedChoice(page)).toBe("denied");

  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Portfolio" }).first().click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await page.waitForLoadState("networkidle");
  await expect(banner(page)).toBeHidden();
  expect(requests).toEqual([]);
  expect(await context.cookies()).toEqual([]);
});

test("„Prihvatam”: učitava se GA sa ID-jem sajta, bez oglašavanja, i važi i posle osvežavanja", async ({ page }) => {
  const requests = googleRequests(page);
  await page.goto("/");
  expect(requests).toEqual([]);
  await banner(page).getByRole("button", { name: "Prihvatam" }).click();
  await expect(banner(page)).toBeHidden();
  await expect.poll(() => requests.length).toBeGreaterThan(0);
  expect(requests[0]).toContain(`gtag/js?id=${GA_TEST_ID}`);
  expect(await savedChoice(page)).toBe("granted");

  const calls = await gtagCalls(page);
  expect(calls).toContainEqual([
    "consent",
    "default",
    { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" },
  ]);
  expect(calls).toContainEqual([
    "config",
    GA_TEST_ID,
    { allow_google_signals: false, allow_ad_personalization_signals: false },
  ]);

  requests.length = 0;
  await page.reload();
  await expect.poll(() => requests.length).toBeGreaterThan(0);
  await expect(banner(page)).toBeHidden();
});

test("„Podešavanja kolačića” u footeru: povlačenje pristanka gasi GA i briše njegove kolačiće", async ({
  page,
  context,
  baseURL,
}) => {
  const requests = googleRequests(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Prihvatam" }).click();
  await expect.poll(() => requests.length).toBeGreaterThan(0);
  // Pravi gtag.js bi postavio ove kolačiće; ovde ih postavlja test
  const host = new URL(baseURL!).hostname;
  await context.addCookies(
    ["_ga", "_ga_TEST000000"].map((name) => ({ name, value: "GA1.1.1.1", domain: host, path: "/" })),
  );

  await page.getByRole("button", { name: "Podešavanja kolačića" }).click();
  await expect(banner(page)).toBeVisible();
  await expect(banner(page).getByRole("heading", { name: "Kolačići za analitiku" })).toBeFocused();
  await expect(banner(page)).toContainText("analitika je uključena");

  requests.length = 0;
  await Promise.all([page.waitForEvent("load"), banner(page).getByRole("button", { name: "Odbijam" }).click()]);
  await page.waitForLoadState("networkidle");
  expect(await savedChoice(page)).toBe("denied");
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => typeof window.gtag)).toBe("undefined");
  expect((await context.cookies()).filter((c) => c.name.startsWith("_ga"))).toEqual([]);
  await expect(banner(page)).toBeHidden();
});

test("„Zatvori” u podešavanjima ne menja izbor", async ({ page }) => {
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Odbijam" }).click();
  await page.getByRole("button", { name: "Podešavanja kolačića" }).click();
  await expect(banner(page)).toContainText("analitika je isključena");
  await banner(page).getByRole("button", { name: "Zatvori" }).click();
  await expect(banner(page)).toBeHidden();
  expect(await savedChoice(page)).toBe("denied");
});

test.describe("događaji", () => {
  test.beforeEach(async ({ page }) => {
    // Ograničenje slanja forme važi po IP adresi
    await page.setExtraHTTPHeaders({ "x-real-ip": `test-${crypto.randomUUID()}` });
  });

  async function sendQuote(page: Page) {
    const form = page.getByRole("form", { name: "Zahtev za ponudu" });
    const submit = form.locator("button[type=submit]");
    await form.locator("label", { hasText: "Veb sajtovi" }).click();
    for (const step of [2, 3, 4]) {
      await submit.click();
      await expect(form.getByText(`KORAK ${step} OD 4`)).toBeVisible();
    }
    await page.locator("input[name=name]").fill(`GA test ${Date.now()}`);
    await page.locator("input[name=email]").fill("klijent@test.local");
    await submit.click();
    await expect(page.getByRole("heading", { name: "Hvala, upit je poslat." })).toBeVisible();
  }

  test.describe("uz pristanak", () => {
    test.use({ consent: "granted" });

    test("poslat upit je ključni događaj generate_lead, bez ličnih podataka", async ({ page }) => {
      await page.goto("/kontakt");
      await sendQuote(page);
      const leads = (await gtagCalls(page)).filter((c) => c[0] === "event" && c[1] === "generate_lead");
      expect(leads).toEqual([["event", "generate_lead", { form: "kontakt" }]]);
    });

    test("klik na telefon i mejl se beleže", async ({ page }) => {
      await page.goto("/kontakt");
      // Pregledač u testu ne otvara aplikaciju za poziv ili mejl
      await page.evaluate(() => window.addEventListener("click", (e) => e.preventDefault()));
      await page.locator("footer a[href^='tel:']").click();
      await page.locator("footer a[href^='mailto:']").click();
      const events = (await gtagCalls(page)).filter((c) => c[0] === "event").map((c) => c[1]);
      expect(events).toEqual(expect.arrayContaining(["phone_click", "email_click"]));
    });
  });

  test.describe("bez pristanka", () => {
    test.use({ consent: "denied" });

    test("poslat upit ne šalje ništa Google-u", async ({ page }) => {
      const requests = googleRequests(page);
      await page.goto("/kontakt");
      await sendQuote(page);
      expect(await page.evaluate(() => window.dataLayer)).toBeUndefined();
      expect(requests).toEqual([]);
    });
  });
});

test("baner na telefonu ne pravi vodoravno pomeranje i dugmad su dovoljno velika", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(banner(page)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  for (const name of ["Odbijam", "Prihvatam"]) {
    const box = await banner(page).getByRole("button", { name }).boundingBox();
    expect(box!.height, name).toBeGreaterThanOrEqual(44);
  }
  await context.close();
});
