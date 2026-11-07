import { expect, test } from "./support/fixtures";

/*
 * Pravne garancije koje politika privatnosti obećava posetiocu.
 * Ako neki od ovih testova padne, prvo dopuniti politiku privatnosti (i po potrebi uvesti pristanak za kolačiće).
 */

const pages = ["/", "/usluge/snimanje-dronom", "/portfolio", "/portfolio/beograd-video", "/kontakt", "/o-nama", "/politika-privatnosti"];

test("nema kolačića ni zahteva ka trećim stranama", async ({ page, context, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const thirdParty = new Set<string>();
  page.on("request", (r) => {
    const url = new URL(r.url());
    if (url.protocol.startsWith("http") && url.origin !== origin) thirdParty.add(url.host);
  });
  for (const path of pages) {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
  }
  expect([...thirdParty], "zahtevi ka drugim domenima").toEqual([]);
  expect(await context.cookies(), "kolačići").toEqual([]);
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length), "lokalno skladište").toBe(0);
});

test("bezbednosna zaglavlja su postavljena", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["x-powered-by"]).toBeUndefined();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["strict-transport-security"]).toContain("max-age=");
});

test("politika privatnosti sadrži obavezne informacije (čl. 23 ZZPL)", async ({ request }) => {
  const html = await (await request.get("/politika-privatnosti")).text();
  for (const required of [
    "Rukovalac podacima",
    "Resend",
    "Google",
    "hosting",
    "van Srbije",
    "član 12",
    "12 meseci",
    "30 dana",
    "Povereniku",
    "kolačiće",
    "Poslednja izmena",
  ]) {
    expect(html, required).toContain(required);
  }
});

test("forma pre slanja upućuje na politiku privatnosti", async ({ page }) => {
  await page.goto("/kontakt");
  await page.locator("label:has(input[name=services])").first().click();
  for (let i = 0; i < 3; i++) await page.getByRole("button", { name: "Dalje" }).click();
  await expect(page.getByRole("button", { name: "Pošalji upit" })).toBeVisible();
  await expect(page.getByRole("link", { name: "politici privatnosti" })).toHaveAttribute("href", "/politika-privatnosti");
});

test("footer na svakoj stranici vodi na politiku privatnosti", async ({ request }) => {
  for (const path of pages) {
    expect(await (await request.get(path)).text(), path).toContain('href="/politika-privatnosti"');
  }
});

test("utisci bez pisanog odobrenja se ne prikazuju", async ({ request }) => {
  const html = await (await request.get("/")).text();
  for (const name of ["Marko Savić", "Šta kažu ljudi s kojima radimo"]) expect(html, name).not.toContain(name);
});
