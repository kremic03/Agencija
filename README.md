# Agencija

Prezentacioni veb sajt digitalne agencije koja se bavi izradom veb sajtova i mobilnih aplikacija, održavanjem sajtova i snimanjem svadbi i proslava iz vazduha DJI dronom.

> **Status:** u ranoj fazi razvoja. Trenutno se postavlja razvojno okruženje i početna struktura projekta.

---

## O projektu

Ovaj repozitorijum sadrži izvorni kod sajta agencije. Sajt ima tri cilja:

- **Predstavi agenciju** i usluge koje nudi na jasan i pregledan način.
- **Pokaže kvalitet rada** kroz primere projekata, fotografije i video snimke.
- **Omogući lak kontakt.** Posetilac popuni formu, a upit stiže direktno na e-mail agencije.

Sajt je namenjen pojedincima, preduzetnicima i firmama kojima treba prisustvo na internetu ili aplikacija, kao i mladencima i organizatorima proslava koji žele upečatljive snimke iz vazduha.

## Usluge koje sajt predstavlja

| Usluga | Opis |
|---|---|
| 🌐 **Izrada veb sajtova** | Moderni, brzi i responzivni sajtovi: prezentacioni sajtovi, landing stranice i veb prodavnice, prilagođeni telefonu, tabletu i računaru. |
| 📱 **Izrada mobilnih aplikacija** | Aplikacije za Android i iOS, od ideje i dizajna do objave na prodavnicama aplikacija. |
| 🛠️ **Održavanje veb sajtova** | Redovna ažuriranja, bezbednosne provere, rezervne kopije, izmene sadržaja i tehnička podrška za postojeće sajtove. |
| 🚁 **Snimanje dronom** | Snimanje svadbi, rođendana i drugih proslava DJI dronom: kadrovi iz vazduha u visokoj rezoluciji koji daju filmski utisak. |

## Planirani sadržaj sajta

- **Početna strana** sa kratkim predstavljanjem agencije i pregledom usluga
- **Posebne stranice** za svaku uslugu, sa detaljnim opisom
- **Portfolio**: primeri sajtova, aplikacija i snimaka dronom
- **O nama**
- **Kontakt** sa formom za slanje upita

## Tehnologije

| Tehnologija | Namena |
|---|---|
| [Next.js](https://nextjs.org/) | React framework za izradu brzog sajta prilagođenog pretraživačima (SEO) |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript sa tipovima, za pouzdaniji kod sa manje grešaka |
| [Tailwind CSS](https://tailwindcss.com/) | Stilizovanje i responzivni dizajn |
| [Resend](https://resend.com/) | Slanje upita sa kontakt forme na e-mail |

## Pokretanje projekta lokalno

> Uputstvo će biti dopunjeno kada se postavi početni projekat.

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

> ⚠️ Fajl `.env.local` sadrži tajne ključeve i **nikada se ne postavlja na GitHub**.

## Licenca

Projekat je objavljen pod [MIT licencom](LICENSE).
