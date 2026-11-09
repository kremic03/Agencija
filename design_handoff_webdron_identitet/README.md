# Handoff: WebDron agencija — vizuelni identitet (webdron.rs)

## Overview
Minimalni vizuelni identitet za agenciju koja radi sajtove i snimke dronom. Paket sadrži finalni logo (sve varijante), favicon set i bannere, plus specifikaciju. Zadatak za developera: ugraditi ove asset-e u sajt webdron.rs (favicon/meta tagovi, header logo, OG slika, hero cover) i animirati REC tačku.

## About the Design Files
`WebDron Tabla.dc.html` je **prezentaciona tabla napravljena u HTML-u** — referenca, ne produkcioni kod. SVG/PNG fajlovi u `logo/`, `favicon/`, `banner/` SU finalni produkcioni asset-i i koriste se direktno. Sav tekst u SVG-ovima je pretvoren u krive (ne zavise od fonta).

## Fidelity
High-fidelity. Boje, proporcije i fajlovi su finalni.

## Koncept logotipa (pravac „Nadir“)
- Wordmark `webdron`, malim slovima, Geist SemiBold 600, letter-spacing −0,02em.
- Slovo „o“ je zamenjeno zaobljenim kvadratom (obris iste debljine kao potezi slova, visine = x-visina) sa punom tačkom u centru: ekran gledan tačno odozgo (nadir).
- Tačka je zaseban element `<circle id="dot">` u svakom SVG-u — za animaciju.
- Oznaka „AGENCIJA“: Geist Mono 500, velika slova, letter-spacing +0,2em, desno od reči, poravnata na baseline. Boja #A1A1AA na tamnoj, #0A0A0B na svetloj.
- Samostalni znak: viewBox 24, kvadrat x/y 1.75, 20.5×20.5, rx 5.25, stroke 1.5; tačka r 2.75 u centru.
- Favicon (v2): viewBox 32, pozadina #0A0A0B rx 7; kvadrat x/y 8.2, 15.6×15.6, rx 3.2, stroke 4.4 (#F4F4F5); tačka r 2.9 (#FF6B2C). Debelo „o“ iz reči.

## Pravila korišćenja
- Narandžasta #FF6B2C SAMO kao tačka. Nikad kao pozadina, tekst ili veća površina.
- Bez gradijenata, senki, glow-a, 3D-a.
- Minimalna visina wordmarka: 16 px. Znak: 16 px.
- Jednobojne verzije (mono-white / mono-black): tačka u boji logotipa — za vez, gravuru, pečat.

## Implementacija na sajtu

### `<head>`
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-48.png" sizes="48x48" type="image/png">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0A0A0B">
<meta property="og:image" content="https://webdron.rs/og-1200x630.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```
`site.webmanifest`: icons android-chrome-192.png i android-chrome-512.png, `background_color` i `theme_color` #0A0A0B, name „WebDron agencija“, short_name „WebDron“.
Napomena: 48×48 (umnožak od 48) je obavezan zbog Google rezultata pretrage.

### Header logo + REC animacija
Logo SVG ubaciti **inline** (ne kao `<img>`) da bi `#dot` bio dostupan CSS-u:
```css
@keyframes rec { 0%,55% { opacity: 1 } 60%,95% { opacity: .15 } 100% { opacity: 1 } }
.logo #dot { animation: rec 1.6s steps(1,end) infinite; }
@media (prefers-reduced-motion: reduce) { .logo #dot { animation: none; } }
```
Ako se SVG ubacuje više puta na istoj stranici, zameniti `id="dot"` klasom ili prefiksom da ID ne bi bio dupliran.

### Bannere
- `banner/og-1200x630.png` → OG/Twitter slika. „o“-kvadrat = 56 px, poravnato levo (x 96), „WEBDRON.RS“ dole levo.
- `banner/cover-1920x600.svg` → hero/cover. Wordmark levo (x 160), horizontalna linija 1 px #26262B na y 400, ispod „WEB / VIDEO“ levo i „WEBDRON.RS“ desno (Geist Mono 15 px, +0,2em, #A1A1AA).

## Design Tokens
| Token | Hex | Upotreba |
|---|---|---|
| bg | #0A0A0B | tamna pozadina, tamni logo na svetlom |
| light | #F4F4F5 | svetla, logo na tamnom |
| line | #26262B | tanke linije, ivice (1 px) |
| text-secondary | #A1A1AA | sekundarni tekst, oznake |
| accent | #FF6B2C | samo tačka |

Tipografija (podržava č ć š ž đ — učitati latin-ext subset):
- Geist 600, −0,02em — logotip, naslovi.
- Geist Mono 500, UPPERCASE, +0,2em — oznake, metapodaci, URL.

Zaobljenja: kartice 12 px, manji elementi 8 px, favicon 7/32.

## Assets
- `logo/webdron-{dark,light,mono-white,mono-black}.svg` — wordmark bez oznake
- `logo/webdron-agencija-{dark,light,mono-white,mono-black}.svg` — sa oznakom
- `logo/znak-{dark,light,mono-white,mono-black}.svg` — samostalni znak
- `favicon/favicon.svg`, `favicon-16/32/48/96.png`, `apple-touch-icon.png` (180, bez zaobljenja — iOS sam zaobljava), `android-chrome-192/512.png`
- `favicon/v1/favicon.svg` — prethodna verzija (tanak obris), samo za referencu
- `banner/og-1200x630.{svg,png}`, `banner/cover-1920x600.{svg,png}`
- „dark“ = za tamnu pozadinu (svetao logo); „light“ = za svetlu pozadinu (taman logo).

## Files
- `WebDron Tabla.dc.html` — prezentaciona tabla sa svim varijantama, mock tabom pregledača, Google rezultatom i specifikacijom (otvoriti u pregledaču).
