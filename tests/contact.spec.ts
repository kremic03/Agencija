import type { APIRequestContext, Page } from "@playwright/test";
import { expect, test } from "./support/fixtures";
import { MOCK_RESEND_PORT } from "./support/constants";

type Mail = { subject: string; text: string; to: string; reply_to: string };

// Ograničenje slanja važi po IP adresi, pa svaki test nastupa kao drugi posetilac
test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-real-ip": `test-${crypto.randomUUID()}` });
});

const uniqueName = (label: string) => `${label} ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const form = (page: Page) => page.getByRole("form", { name: "Zahtev za ponudu" });
const submit = (page: Page) => form(page).locator("button[type=submit]");
const stepLabel = (page: Page, step: number) => form(page).getByText(`KORAK ${step} OD 4`);
const firstService = (page: Page) => page.locator("input[name=services]").first();
const thanks = (page: Page) => page.getByRole("heading", { name: "Hvala, upit je poslat." });

async function mailsTo(request: APIRequestContext, name: string) {
  const response = await request.get(`http://127.0.0.1:${MOCK_RESEND_PORT}/`);
  const mails: Mail[] = await response.json();
  return mails.filter((mail) => mail.subject.includes(name));
}

/** Prolazi prva tri koraka forme, kao što bi to uradio posetilac */
async function fillSteps(page: Page) {
  await form(page).locator("label", { hasText: "Veb sajtovi" }).click();
  await submit(page).click();
  await expect(stepLabel(page, 2)).toBeVisible();
  await form(page).locator("textarea[name=about]").fill("Treba nam sajt za ordinaciju.\ndrugi red");
  await submit(page).click();
  await expect(stepLabel(page, 3)).toBeVisible();
  await submit(page).click();
  await expect(stepLabel(page, 4)).toBeVisible();
}

async function goToContactStep(page: Page) {
  await page.goto("/kontakt");
  await fillSteps(page);
}

async function fillContact(page: Page, name: string, email = "klijent@test.local") {
  await page.locator("input[name=name]").fill(name);
  await page.locator("input[name=email]").fill(email);
}

/** Otvara formu tako da se JavaScript učitava sporo: stranica se vidi, a još nije oživela */
async function openBeforeHydration(page: Page) {
  await page.route("**/_next/static/**/*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    await route.continue();
  });
  await page.goto("/kontakt", { waitUntil: "domcontentloaded" });
}

const clickInPage = (page: Page, selector: string) =>
  page.evaluate((s) => document.querySelector<HTMLElement>(s)?.click(), selector);

test("upit stiže jednom, uz zahvalnicu i fokus na njoj", async ({ page, request }) => {
  const name = uniqueName("Pera Perić");
  await goToContactStep(page);
  await fillContact(page, name);
  await page.locator("input[name=phone]").fill("060 111 222");
  await submit(page).click();

  await expect(thanks(page)).toBeVisible();
  await expect(thanks(page)).toBeFocused();

  const mails = await mailsTo(request, name);
  expect(mails).toHaveLength(1);
  expect(mails[0].to).toBe("primalac@test.local");
  expect(mails[0].reply_to).toBe("klijent@test.local");
  expect(mails[0].text).toContain("Usluge: Izrada veb sajtova");
  expect(mails[0].text).toContain("Telefon: 060 111 222");
  // Pregledač šalje novi red u polju za tekst kao \r\n
  expect(mails[0].text).toMatch(/Treba nam sajt za ordinaciju\.\r?\ndrugi red/);
});

test("„Pošalji novi upit” vraća praznu formu na prvi korak", async ({ page }) => {
  await goToContactStep(page);
  await fillContact(page, uniqueName("Novi upit"));
  await submit(page).click();
  await page.getByRole("button", { name: "Pošalji novi upit" }).click();

  await expect(stepLabel(page, 1)).toBeVisible();
  await expect(page.locator("input[name=services]:checked")).toHaveCount(0);
  await expect(page.locator("input[name=name]")).toHaveValue("");
});

test("prazna obavezna polja: greške, fokus na imenu, ništa se ne šalje", async ({ page, request }) => {
  await goToContactStep(page);
  const before = (await mailsTo(request, "")).length;
  await submit(page).click();

  await expect(page.locator("#greska-ime")).toBeVisible();
  await expect(page.locator("#greska-email")).toBeVisible();
  await expect(page.locator("input[name=name]")).toBeFocused();
  expect(await mailsTo(request, "")).toHaveLength(before);
});

test("Resend odbije slanje: poruka sa adresom, unos ostaje", async ({ page, request }) => {
  const name = uniqueName("ODBIJ");
  await goToContactStep(page);
  await fillContact(page, name);
  await submit(page).click();

  await expect(form(page).getByRole("alert")).toContainText("Pišite nam direktno");
  await expect(thanks(page)).toHaveCount(0);
  await expect(page.locator("input[name=name]")).toHaveValue(name);
  expect(await mailsTo(request, name)).toHaveLength(0);
});

test("zamka za botove: bot vidi uspeh, mejl se ne šalje", async ({ page, request }) => {
  const name = uniqueName("Bot");
  await goToContactStep(page);
  await fillContact(page, name);
  await page.locator("input[name=websiteConfirm]").evaluate((el: HTMLInputElement) => {
    el.value = "spam";
  });
  await submit(page).click();

  await expect(thanks(page)).toBeVisible();
  expect(await mailsTo(request, name)).toHaveLength(0);
});

test("klik pre učitavanja JavaScript-a ne resetuje stranicu", async ({ page }) => {
  await openBeforeHydration(page);
  await clickInPage(page, "form label:has(input[name=services])");
  await clickInPage(page, "form button[type=submit]");
  await page.waitForTimeout(500);
  expect(page.url()).not.toContain("?");

  await expect(firstService(page)).toBeEnabled({ timeout: 15_000 });
  expect(page.url()).not.toContain("?");
});

test("usluga izabrana pre učitavanja JavaScript-a ne zaglavi formu", async ({ page }) => {
  await openBeforeHydration(page);
  await clickInPage(page, "form label:has(input[name=services])");
  await expect(firstService(page)).toBeEnabled({ timeout: 15_000 });

  // Na ekranu ne sme da ostane označena usluga za koju forma ne zna
  await expect(page.locator("input[name=services]:checked")).toHaveCount(0);
  await form(page).locator("label", { hasText: "Veb sajtovi" }).click();
  await submit(page).click();
  await expect(stepLabel(page, 2)).toBeVisible();
});

test("Resend ne odgovara: posetilac dobija poruku umesto beskonačnog čekanja", async ({ page }) => {
  await goToContactStep(page);
  await fillContact(page, uniqueName("SPORO"));
  await submit(page).click();

  await expect(form(page).getByRole("alert")).toContainText("Pišite nam direktno", { timeout: 15_000 });
  await expect(submit(page)).toContainText("Pošalji upit");
});

test("veza sa serverom visi: posetilac dobija poruku, unos ostaje", async ({ page }) => {
  test.setTimeout(45_000);
  const name = uniqueName("Veza");
  await goToContactStep(page);
  await fillContact(page, name);
  await page.route("**/kontakt", (route) => {
    // POST namerno ostaje bez odgovora
    if (route.request().method() !== "POST") return route.continue();
  });
  await submit(page).click();

  await expect(form(page).getByRole("alert")).toContainText("nije uspelo", { timeout: 25_000 });
  await expect(page.locator("input[name=name]")).toHaveValue(name);
});

test.describe("stara verzija stranice posle nove objave", () => {
  test.use({ failOnConsoleError: false });

  test("posetilac dobija uputstvo da osveži stranicu", async ({ page }) => {
    await goToContactStep(page);
    await fillContact(page, uniqueName("Stara verzija"));
    await page.route("**/kontakt", (route) => {
      const request = route.request();
      if (request.method() !== "POST") return route.continue();
      // Ispravan oblik, ali ID koji ovaj build ne poznaje, kao posle nove objave
      const id = request.headers()["next-action"];
      const staleId = id.slice(0, -1) + (id.endsWith("0") ? "1" : "0");
      return route.continue({ headers: { ...request.headers(), "next-action": staleId } });
    });
    await submit(page).click();

    await expect(form(page).getByRole("alert")).toContainText("osvežite stranicu");
  });
});

test("previše upita sa iste adrese: poruka, mejl se ne šalje", async ({ page, request }) => {
  await goToContactStep(page);
  for (let i = 1; i <= 5; i += 1) {
    await fillContact(page, uniqueName(`Limit ${i}`));
    await submit(page).click();
    await expect(thanks(page)).toBeVisible();
    await page.getByRole("button", { name: "Pošalji novi upit" }).click();
    await fillSteps(page);
  }

  const name = uniqueName("Limit 6");
  await fillContact(page, name);
  await submit(page).click();

  await expect(form(page).getByRole("alert")).toContainText("Pokušajte ponovo malo kasnije");
  await expect(page.locator("input[name=name]")).toHaveValue(name);
  expect(await mailsTo(request, name)).toHaveLength(0);
});

test("novi red u kratkom polju ne može da podmetne lažan red u mejlu", async ({ page, request }) => {
  const name = uniqueName("Pera");
  await goToContactStep(page);
  await fillContact(page, name);
  // Običan <input> ne prima novi red, ali zahtev poslat mimo forme može da ga sadrži
  await page.locator("input[name=phone]").evaluate((el: HTMLInputElement) => {
    el.type = "hidden";
    el.value = "060\nEmail: lazni@test.local";
  });
  await submit(page).click();
  await expect(thanks(page)).toBeVisible();

  const [mail] = await mailsTo(request, name);
  expect(mail.text).toContain("Telefon: 060 Email: lazni@test.local");
  expect(mail.text).not.toMatch(/^Email: lazni/m);
});
