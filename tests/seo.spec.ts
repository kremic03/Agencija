import { expect, test } from "./support/fixtures";

const pages = [
  "/",
  "/usluge",
  "/usluge/izrada-sajtova",
  "/usluge/mobilne-aplikacije",
  "/usluge/veb-aplikacije",
  "/usluge/snimanje-dronom",
  "/usluge/snimanje-nekretnina-dronom",
  "/usluge/snimanje-dronom-za-tv-emisije",
  "/usluge/snimanje-prirode-dronom",
  "/portfolio",
  "/portfolio/beograd-video",
  "/portfolio/web-shop-pocetna",
  "/kontakt",
  "/o-nama",
  "/politika-privatnosti",
];

const match = (html: string, re: RegExp) => html.match(re)?.[1];
const jsonLd = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

for (const path of pages) {
  test(`SEO osnova: ${path}`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();

    expect(html.match(/<h1/g), "tačno jedan h1").toHaveLength(1);
    expect(match(html, /<title>(.*?)<\/title>/)?.length, "dužina naslova").toBeLessThanOrEqual(70);
    const description = match(html, /name="description" content="(.*?)"/) ?? "";
    expect(description.length, "dužina opisa").toBeGreaterThanOrEqual(100);
    expect(description.length, "dužina opisa").toBeLessThanOrEqual(160);

    const schemas = jsonLd(html);
    expect(schemas.map((s) => s["@type"])).toContain("Organization");
    expect(JSON.stringify(schemas), "bez privremenih podataka").not.toMatch(/example\.com|\+381 00/);
  });
}

const serviceHeadings: [string, string][] = [
  ["/usluge/izrada-sajtova", "Izrada veb sajtova"],
  ["/usluge/mobilne-aplikacije", "Izrada mobilnih aplikacija"],
  ["/usluge/veb-aplikacije", "Veb aplikacije po meri"],
  ["/usluge/snimanje-dronom", "Snimanje dronom"],
  ["/usluge/snimanje-nekretnina-dronom", "Snimanje nekretnina dronom"],
  ["/usluge/snimanje-dronom-za-tv-emisije", "Snimanje dronom za TV emisije"],
  ["/usluge/snimanje-prirode-dronom", "Snimanje prirode dronom"],
];

test("snimanje dronom vodi na podstranice, a one nazad na njega", async ({ request }) => {
  const specialties = ["snimanje-nekretnina-dronom", "snimanje-dronom-za-tv-emisije", "snimanje-prirode-dronom"];
  const hub = await (await request.get("/usluge/snimanje-dronom")).text();
  for (const slug of specialties) expect(hub, slug).toContain(`href="/usluge/${slug}"`);
  for (const slug of specialties) {
    const html = await (await request.get(`/usluge/${slug}`)).text();
    expect(html, slug).toContain('href="/usluge/snimanje-dronom"');
    const crumbs = jsonLd(html).find((s) => s["@type"] === "BreadcrumbList");
    expect(crumbs.itemListElement.map((i: { name: string }) => i.name)).toEqual([
      "Početna",
      "Usluge",
      "Snimanje dronom",
      expect.stringContaining("dronom"),
    ]);
  }
});

for (const [path, keyword] of serviceHeadings) {
  test(`H1 kaže koja je usluga: ${path}`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(match(html, /<h1[^>]*>(.*?)<\/h1>/)).toContain(keyword);
  });
}

test("svaki URL iz sitemapa radi i sme da se indeksira", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(urls.length).toBeGreaterThan(0);
  for (const path of urls) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    // Stranice koje su trajno noindex imaju „noindex, follow”; ceo sajt pre objave ima „noindex, nofollow”
    expect(await response.text(), path).not.toMatch(/name="robots" content="noindex, follow"/);
  }
});

for (const path of ["/usluge", "/portfolio", "/usluge/izrada-sajtova", "/portfolio/beograd-video"]) {
  test(`putanja za pretraživače kreće od početne: ${path}`, async ({ request }) => {
    const schemas = jsonLd(await (await request.get(path)).text());
    const items = schemas.find((s) => s["@type"] === "BreadcrumbList").itemListElement;
    expect(items.length).toBeGreaterThanOrEqual(2);
    expect(items[0].name).toBe("Početna");
    expect(new URL(items.at(-1).item).pathname).toBe(path);
  });
}

test("logo firme iz strukturiranih podataka postoji", async ({ request }) => {
  const organization = jsonLd(await (await request.get("/")).text()).find((s) => s["@type"] === "Organization");
  expect((await request.get(new URL(organization.logo).pathname)).status()).toBe(200);
});

test("portfolio i početna linkuju ka uslugama iz teksta", async ({ request }) => {
  const portfolio = await (await request.get("/portfolio")).text();
  expect(portfolio).toMatch(/href="\/usluge\/izrada-sajtova"[^>]*>Sajtovi i web shopovi/);
  expect(portfolio).toMatch(/href="\/usluge\/snimanje-dronom"[^>]*>snimanje dronom/);
  const home = await (await request.get("/")).text();
  expect(home).toMatch(/href="\/usluge\/snimanje-dronom"[^>]*>Više o snimanju dronom/);
});

test("naslovi i opisi su jedinstveni", async ({ request }) => {
  const htmls = await Promise.all(pages.map(async (path) => (await request.get(path)).text()));
  expect(new Set(htmls.map((h) => match(h, /<title>(.*?)<\/title>/))).size).toBe(pages.length);
  expect(new Set(htmls.map((h) => match(h, /name="description" content="(.*?)"/))).size).toBe(pages.length);
});

test("podaci o firmi: kontakt i Beograd, bez izmišljenih ocena", async ({ request }) => {
  const organization = jsonLd(await (await request.get("/")).text()).find((s) => s["@type"] === "Organization");
  expect(organization.telephone).toBe("+381604224990");
  expect(organization.email).toBe("nikolakremic15@gmail.com");
  expect(organization.address.addressLocality).toBe("Beograd");
  expect(organization.aggregateRating).toBeUndefined();
});

test("nepoznat projekat i stranica vraćaju 404", async ({ request }) => {
  expect((await request.get("/portfolio/nepostoji")).status()).toBe(404);
  expect((await request.get("/nepostoji")).status()).toBe(404);
});

test("projekat bez priče je noindex, sa ispravnim canonical", async ({ request }) => {
  const html = await (await request.get("/portfolio/beograd-video")).text();
  expect(html).toMatch(/name="robots" content="noindex/);
  expect(html).toMatch(/rel="canonical" href="[^"]*\/portfolio\/beograd-video"/);
});

test("sitemap sadrži /usluge, a ne projekte bez priče", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/usluge</loc>");
  expect(sitemap).not.toContain("/portfolio/");
});

test("sve slike imaju alt, a fotografije iz drona i opis", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const images = html.match(/<img[^>]*>/g) ?? [];
  expect(images.length).toBeGreaterThan(0);
  for (const image of images) expect(image).toMatch(/alt="/);
  expect(images.filter((image) => !image.includes('alt=""')).length).toBeGreaterThan(0);
});

test("portfolio vodi na svih sedam projekata: objavljene sajtove u novom prozoru, ostale na njihove stranice", async ({
  request,
}) => {
  const html = await (await request.get("/portfolio")).text();
  const pages = new Set(html.match(/href="\/portfolio\/[a-z-]+"/g));
  const live = new Set(html.match(/<a href="https:\/\/web-shop-iota-seven\.vercel\.app\/[a-z]+" target="_blank" rel="noopener"/g));
  expect(pages.size).toBe(5);
  expect(live.size).toBe(2);
});

test("putanja na stranici usluge vodi na /usluge", async ({ request }) => {
  const html = await (await request.get("/usluge/izrada-sajtova")).text();
  expect(html).toMatch(/href="\/usluge"[^>]*>Usluge/);
});

test("politika privatnosti navodi Resend", async ({ request }) => {
  expect(await (await request.get("/politika-privatnosti")).text()).toContain("Resend");
});

test("tvrdnje koje su namerno uklonjene se ne vraćaju", async ({ request }) => {
  const removed = ["Do 5 stranica", "Do 8 ekrana", "25 obrađenih", "15 obrađenih", "tri meseca", "rundi izmena", "runde izmena"];
  for (const path of pages) {
    const html = await (await request.get(path)).text();
    for (const claim of removed) expect(html, `${path}: ${claim}`).not.toContain(claim);
  }
});
