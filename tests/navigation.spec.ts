import type { Page } from "@playwright/test";
import { expect, test } from "./support/fixtures";

const HEADER_OFFSET = 88;

/** Klikne link i prati koliko je traka napretka bila vidljiva tokom prelaza */
const navigateAndSampleBar = (page: Page, href: string) =>
  page.evaluate(async (target) => {
    const bar = document.querySelector<HTMLElement>(".nav-progress")!;
    const link = [...document.querySelectorAll<HTMLAnchorElement>(`a[href="${target}"]`)].find((a) => a.offsetParent)!;
    let maxOpacity = 0;
    let sampling = true;
    const sample = () => {
      maxOpacity = Math.max(maxOpacity, +getComputedStyle(bar).opacity);
      if (sampling) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);

    const start = performance.now();
    link.click();
    while (location.pathname !== target && performance.now() < start + 15_000) {
      await new Promise((resolve) => setTimeout(resolve, 8));
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    sampling = false;
    return {
      pathname: location.pathname,
      maxOpacity,
      activeAfter: bar.classList.contains("is-active"),
      opacityAfter: +getComputedStyle(bar).opacity,
    };
  }, href);

test("traka napretka se ne vidi na brzom prelazu", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const result = await navigateAndSampleBar(page, "/portfolio");
  expect(result.pathname).toBe("/portfolio");
  expect(result.maxOpacity).toBeLessThan(0.05);
  expect(result.activeAfter).toBe(false);
});

test("traka napretka se vidi na sporom prelazu i posle nestaje", async ({ page }) => {
  test.setTimeout(60_000);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 400,
    downloadThroughput: 1.6e6 / 8,
    uploadThroughput: 750e3 / 8,
  });
  await page.goto("/", { waitUntil: "load" });
  await page.waitForTimeout(5000);

  const result = await navigateAndSampleBar(page, "/usluge/veb-aplikacije");
  expect(result.pathname).toBe("/usluge/veb-aplikacije");
  expect(result.maxOpacity).toBeGreaterThan(0.2);
  expect(result.activeAfter).toBe(false);
  expect(result.opacityAfter).toBe(0);
});

test("mailto link ne pali traku napretka", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const active = await page.evaluate(() => {
    const link = document.querySelector<HTMLElement>('a[href^="mailto:"]')!;
    link.addEventListener("click", (e) => e.preventDefault(), { once: true });
    link.click();
    return document.querySelector(".nav-progress")!.classList.contains("is-active");
  });
  expect(active).toBe(false);
});

test("sekcija na istoj stranici: bez trake, klizanje je animirano", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const result = await page.evaluate(async () => {
    const link = [...document.querySelectorAll<HTMLAnchorElement>('a[href="/#proces"]')].find((a) => a.offsetParent)!;
    link.click();
    const active = document.querySelector(".nav-progress")!.classList.contains("is-active");
    const positions: number[] = [];
    for (let i = 0; i < 30; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      positions.push(Math.round(scrollY));
    }
    return {
      active,
      distinctPositions: new Set(positions).size,
      top: Math.round(document.getElementById("proces")!.getBoundingClientRect().top),
    };
  });
  expect(result.active).toBe(false);
  expect(result.distinctPositions).toBeGreaterThan(5);
  expect(Math.abs(result.top - HEADER_OFFSET)).toBeLessThanOrEqual(2);
});

test("sekcija sa druge stranice: odmah na mestu, bez klizanja", async ({ page }) => {
  await page.goto("/portfolio", { waitUntil: "networkidle" });
  const result = await page.evaluate(async () => {
    const link = [...document.querySelectorAll<HTMLAnchorElement>('a[href="/#proces"]')].find((a) => a.offsetParent)!;
    const seen: number[] = [];
    let sampling = true;
    const sample = () => {
      if (location.pathname === "/") seen.push(Math.round(scrollY));
      if (sampling) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
    const start = performance.now();
    link.click();
    while (location.hash !== "#proces" && performance.now() < start + 6000) {
      await new Promise((resolve) => setTimeout(resolve, 4));
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
    sampling = false;
    const section = document.getElementById("proces")!;
    return {
      url: location.pathname + location.hash,
      distinctPositions: new Set(seen).size,
      top: Math.round(section.getBoundingClientRect().top),
      focused: document.activeElement === section,
    };
  });
  expect(result.url).toBe("/#proces");
  expect(Math.abs(result.top - HEADER_OFFSET)).toBeLessThanOrEqual(2);
  expect(result.focused).toBe(true);
  expect(result.distinctPositions).toBeLessThanOrEqual(2);
});

test("portfolio, pa projekat, pa usluga", async ({ page }) => {
  await page.goto("/portfolio", { waitUntil: "networkidle" });
  await page.locator('a[href="/portfolio/beograd-kula"]:visible').first().click();
  await expect(page).toHaveURL(/\/portfolio\/beograd-kula$/);
  await page.locator('main a[href="/usluge/snimanje-dronom"]:visible').first().click();
  await expect(page).toHaveURL(/\/usluge\/snimanje-dronom$/);
});
