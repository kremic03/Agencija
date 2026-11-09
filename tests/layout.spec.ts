import type { Page } from "@playwright/test";
import { expect, test } from "./support/fixtures";

const pages = [
  "/",
  "/usluge",
  "/usluge/snimanje-dronom",
  "/usluge/snimanje-nekretnina-dronom",
  "/usluge/snimanje-dronom-za-tv-emisije",
  "/usluge/snimanje-prirode-dronom",
  "/portfolio",
  "/portfolio/beograd-video",
  "/portfolio/web-shop-pocetna",
  "/portfolio/web-shop-prijava",
  "/o-nama",
  "/politika-privatnosti",
  "/kontakt",
];

const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

async function expectIntactLayout(page: Page, path: string) {
  await page.goto(path, { waitUntil: "load" });
  await expect(page.locator("h1:visible")).toHaveCount(1);
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - innerWidth,
    brokenImages: [...document.querySelectorAll("main img")].filter((node) => {
      const image = node as HTMLImageElement;
      return image.complete && !image.naturalWidth && image.loading !== "lazy";
    }).length,
  }));
  expect(result.overflow, "vodoravno pomeranje").toBeLessThanOrEqual(0);
  expect(result.brokenImages, "neispravne slike").toBe(0);
}

/** Podaci za proveru rasporeda stranice /kontakt */
const contactLayout = (page: Page) =>
  page.evaluate(() => {
    const visible = (el: Element | null) => !!(el as HTMLElement | null)?.offsetParent;
    const section = document.querySelector("section[aria-labelledby=kontakt-naslov]")!;
    return {
      titleSize: parseFloat(getComputedStyle(document.querySelector("h1")!).fontSize),
      paddingTop: parseFloat(getComputedStyle(section).paddingTop),
      nextSteps: visible(document.querySelector("section ol.border-t")),
      directContact: [...document.querySelectorAll("h2")].filter((h) => h.textContent?.includes("Radije") && visible(h)).length,
    };
  });

test.describe("računar", () => {
  for (const path of pages) {
    test(`raspored: ${path}`, async ({ page }) => expectIntactLayout(page, path));
  }

  test("/kontakt: veliki naslov, koraci i direktan kontakt", async ({ page }) => {
    await page.goto("/kontakt");
    const layout = await contactLayout(page);
    expect(layout.titleSize).toBeGreaterThanOrEqual(50);
    expect(layout.paddingTop).toBeGreaterThanOrEqual(80);
    expect(layout.nextSteps).toBe(true);
    expect(layout.directContact).toBe(1);
  });

  test("footer prikazuje lokaciju Beograd", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("Lokacija")).toBeVisible();
    await expect(footer.locator("address")).toHaveText("Beograd");
  });

  test("mega meni nema privremene tekstove", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator("header button:visible", { hasText: "Usluge" }).hover();
    const menu = page.locator("#mega-meni-usluge");
    await expect(menu).toContainText("Kameno utvrđenje");
    await expect(menu).toContainText("Kratak razgovor");
    await expect(menu).not.toContainText("[");
  });

  test("mega meni, miš: prelaz otvara, prvi klik ga ne zatvara, drugi zatvara", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const button = page.locator("header button:visible", { hasText: "Usluge" });
    const menu = page.locator("#mega-meni-usluge");

    await button.hover();
    await expect(menu).toBeVisible();
    await button.click();
    await expect(menu).toBeVisible();
    await button.click();
    await expect(menu).toHaveCount(0);
  });

  test("mega meni, tastatura: Enter otvara i zatvara, i posle prelaza mišem", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const button = page.locator("header button:visible", { hasText: "Usluge" });
    const menu = page.locator("#mega-meni-usluge");

    // Prelaz i odlazak mišem ne smeju da ostave trag koji bi pojeo sledeći pritisak tastera
    await button.hover();
    await expect(menu).toBeVisible();
    await page.mouse.move(700, 800);
    await expect(menu).toHaveCount(0);

    await button.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveCount(0);
  });
});

test.describe("tablet", () => {
  test.use({ hasTouch: true });

  test("mega meni, dodir: prvi dodir otvara, drugi zatvara", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const button = page.locator("header button:visible", { hasText: "Usluge" });
    const menu = page.locator("#mega-meni-usluge");

    await button.tap();
    await expect(menu).toBeVisible();
    await button.tap();
    await expect(menu).toHaveCount(0);
  });
});

test.describe("telefon", () => {
  test.use(phone);

  for (const path of pages) {
    test(`raspored: ${path}`, async ({ page }) => expectIntactLayout(page, path));
  }

  test("/kontakt: manji naslov, koraci skriveni, direktan kontakt ostaje", async ({ page }) => {
    await page.goto("/kontakt");
    const layout = await contactLayout(page);
    expect(layout.titleSize).toBe(36);
    expect(layout.nextSteps).toBe(false);
    expect(layout.directContact).toBe(1);
  });
});
