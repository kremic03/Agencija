# Agencija

Prezentacioni veb sajt digitalne agencije iz Beograda koja radi veb sajtove i web shopove, mobilne i veb aplikacije i snimanje dronom za mala i srednja preduzeća širom Srbije.

> **Status:** u razvoju. Dizajn je implementiran; privremeni sadržaj je označen komentarom `PRIVREMENO` u kodu. Kontakt forma šalje upite preko Resend-a; bez verifikovanog domena oni stižu samo na adresu Resend naloga.

---

## O projektu

Ovaj repozitorijum sadrži izvorni kod sajta agencije. Sajt ima tri cilja:

- **Predstavi agenciju** i usluge koje nudi na jasan i pregledan način.
- **Pokaže kvalitet rada** kroz primere projekata, fotografije i video snimke.
- **Omogući lak kontakt.** Posetilac popuni formu, a upit stiže direktno na e-mail agencije.

Sajt je namenjen malim i srednjim preduzećima kojima treba sajt, aplikacija ili snimak iz vazduha.

## Usluge koje sajt predstavlja

| Usluga | Opis |
|---|---|
| 🌐 **Izrada veb sajtova** | Prezentacioni sajtovi i web shopovi koji se brzo učitavaju, pripremljeni su za pretraživače i koje klijent sam menja. |
| 📱 **Mobilne aplikacije** | Aplikacije za iOS i Android, od ideje i dizajna do objave u prodavnicama aplikacija. |
| 🖥️ **Veb aplikacije** | Softver po meri, dashboardi i SaaS proizvodi koji zamenjuju Excel tabele i ručni rad. |
| 🚁 **Snimanje dronom** | Video i fotografije iz vazduha za nekretnine, evente, turizam i industriju, kao i za emisije i produkcije. |

Tekstovi usluga su u `src/content/services.ts`.

## Sadržaj sajta

- **Početna strana** sa predstavljanjem agencije i pregledom usluga
- **Usluge**: pregled i posebna stranica za svaku uslugu
- **Portfolio**: primeri radova i stranica za svaki projekat
- **O nama**
- **Kontakt** sa formom za slanje upita
- **Politika privatnosti**

## Tehnologije

| Tehnologija | Namena |
|---|---|
| [Next.js](https://nextjs.org/) | React framework za izradu brzog sajta prilagođenog pretraživačima (SEO) |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript sa tipovima, za pouzdaniji kod sa manje grešaka |
| [Tailwind CSS](https://tailwindcss.com/) | Stilizovanje i responzivni dizajn |
| [Resend](https://resend.com/) | Slanje upita sa kontakt forme na e-mail |
| [Playwright](https://playwright.dev/) | Automatski testovi u pregledaču |

## Pokretanje projekta lokalno

**Preduslovi:** [Node.js](https://nodejs.org/) 20.9 ili noviji i npm.

```bash
# 1. Kloniranje repozitorijuma
git clone https://github.com/kremic03/Agencija.git
cd Agencija

# 2. Instalacija zavisnosti
npm install

# 3. Podešavanje promenljivih okruženja
cp .env.example .env.local
# zatim u .env.local upisati svoj RESEND_API_KEY

# 4. Pokretanje razvojnog servera
npm run dev
```

Sajt je zatim dostupan na adresi [http://localhost:3000](http://localhost:3000).

Provere pre objave:

```bash
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript
npm run build       # produkcijski build
npm test            # automatski testovi (oko 2 minuta)
```

`npm test` sam pravi produkcijski build i pokreće ga na portu 3457, pa taj port mora da bude slobodan. Testovi koriste Google Chrome instaliran na računaru i lažni Resend, tako da nijedan test ne šalje pravi mejl. Testovi su u folderu `tests/`.

## Napomene za održavanje

- **Video** je u `public/video/` i kešira se godinu dana (`next.config.ts`). Svaki snimak ima četiri verzije: 720p i 1080p, u HEVC-u (manji fajl) i H.264 (za browsere bez HEVC-a); spisak i bitrate-ovi su u `src/content/media.ts`. Pri izmeni snimka povećati verziju u imenu fajla (npr. `.v2` → `.v3`).
- **Fotografije** su u `src/assets/images/` (obrađene, bez metapodataka); originali ostaju van Git-a u `materijali/`.
- **Keš build-a:** Turbopack keš za `next build` je isključen u `next.config.ts`, jer sa uključenim kešom nove Tailwind klase ne ulaze u produkcijski CSS.

> ⚠️ Fajl `.env.local` sadrži tajne ključeve i **nikada se ne postavlja na GitHub**.

## Licenca

Projekat je objavljen pod [MIT licencom](LICENSE).
