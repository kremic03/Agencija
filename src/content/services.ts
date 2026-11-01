/*
 * Usluge — nazivi, opisi, SEO tekstovi i sadržaj stranica usluga.
 * Meni, početna, footer, forma, sitemap i stranice usluga čitaju odavde.
 *
 * PRIVREMENO: cene, rokovi i tvrdnje u uglastim zagradama [...] su
 * primeri iz dizajna i moraju se potvrditi pre objave.
 */

import { belgradeVideo, droneVideo, media, type Media } from "./media";

export type ServiceGroup = "digital" | "video";

export const serviceGroups: Record<ServiceGroup, string> = {
  digital: "Digitalni proizvodi",
  video: "Video produkcija",
};

export type ServiceIconName = "web" | "mobile" | "webapp" | "drone";

export type Step = { title: string; description: string; time: string };
export type Faq = { question: string; answer: string };
export type Package = {
  name: string;
  audience: string;
  price: string;
  items: string[];
  highlighted?: boolean;
};

/** Primer rada sa pravom fotografijom ili videom */
export type Example = {
  title: string;
  tag: string;
  image: Media;
  video?: { sources: { src: string; media?: string }[]; duration: string };
};

/** Medij u uvodu stranice usluge */
export type HeroMedia =
  | { kind: "browser"; image: Media; fit: "natural" | "cover" }
  | { kind: "phone"; image: Media }
  | { kind: "video" };

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  group: ServiceGroup;
  icon: ServiceIconName;
  /** Kratak opis za meni i formu */
  summary: string;
  /** Opis na kartici na početnoj */
  cardText: string;
  priceFrom: string;
  seo: { title: string; description: string };
  page: {
    title: string;
    intro: string;
    heroImage: string;
    heroMedia?: HeroMedia;
    heroOverlay?: { left: string; right: string };
    included: { title: string; items: { title: string; description: string }[] };
    examplesTitle: string;
    /** Pravi primeri; bez njih se prikazuju projekti iz portfolija */
    examples?: Example[];
    packages: { title: string; note?: string; items: Package[] };
    process: { title: string; steps: Step[] };
    faqTitle: string;
    faq: Faq[];
    cta: { title: string; text: string };
  };
};

// PRIVREMENO: rokovi u koracima
export const defaultProcess: Step[] = [
  {
    title: "Razgovor",
    description:
      "Besplatne konsultacije od [30] minuta. Slušamo šta vam treba i predlažemo rešenje — ponekad i jeftinije od planiranog.",
    time: "[1 dan]",
  },
  {
    title: "Ponuda i plan",
    description: "Pisana ponuda sa fiksnom cenom, rokovima i spiskom svega što je uključeno.",
    time: "[2–3 dana]",
  },
  {
    title: "Izrada",
    description: "Radimo u kratkim ciklusima. Svake nedelje vidite napredak i šaljete komentare.",
    time: "[2–8 nedelja]",
  },
  {
    title: "Lansiranje i podrška",
    description:
      "Puštamo projekat u rad, obučavamo vaš tim i ostajemo dostupni [tri meseca] bez doplate.",
    time: "[3 meseca podrške]",
  },
];

const defaultCta = {
  title: "Recite nam šta vam treba. Ponudu dobijate za [24 sata].",
  text: "Upitnik traje oko 3 minuta. Bez obaveze i bez tehničkog žargona.",
};

export const services: Service[] = [
  {
    slug: "izrada-sajtova",
    name: "Izrada veb sajtova",
    shortName: "Veb sajtovi",
    group: "digital",
    icon: "web",
    summary: "Prezentacioni sajtovi i web shopovi",
    cardText:
      "Prezentacioni sajtovi i web shopovi koji se brzo učitavaju, pripremljeni su za pretraživače i koje sami menjate.",
    priceFrom: "[450] €",
    seo: {
      title: "Izrada veb sajtova",
      description:
        "Izrada prezentacionih sajtova i web shopova za mala i srednja preduzeća: brzo učitavanje, prilagođeno telefonu i jednostavno uređivanje sadržaja.",
    },
    page: {
      title: "Sajtovi koji se brzo učitavaju i koje sami menjate.",
      intro:
        "Prezentacioni sajtovi i web shopovi za mala i srednja preduzeća. Tekstove, slike i cene menjate sami, bez programera.",
      heroImage: "Screenshot: sajt klijenta (1440×900)",
      heroMedia: { kind: "browser", image: media.webShopHome, fit: "natural" },
      included: {
        title: "Sve što sajtu treba za početak rada.",
        items: [
          { title: "Dizajn po meri", description: "Izgled usklađen sa vašim brendom, bez generičkih šablona." },
          { title: "Prilagođen telefonu", description: "Sajt se jednako dobro koristi na telefonu, tabletu i računaru." },
          { title: "Tehnička SEO osnova", description: "Naslovi, opisi, sitemap i brzina pripremljeni za pretraživače." },
          { title: "Jednostavno uređivanje", description: "Sami menjate tekstove, slike i cene kroz pregledan panel." },
          { title: "Kontakt forma", description: "Upiti sa sajta stižu direktno na vaš e-mail." },
          { title: "Obuka i podrška", description: "Obuka za vaš tim i [tri meseca] podrške posle lansiranja." },
        ],
      },
      examplesTitle: "Sajtovi koje smo napravili.",
      packages: {
        title: "Jasne cene. Konačan iznos dobijate pre početka.",
        note: "Cene su bez PDV-a.",
        items: [
          {
            name: "Prezentacioni sajt",
            audience: "Za firme kojima treba predstavljanje i upiti.",
            price: "[450]",
            items: ["Do [5] stranica", "Kontakt forma", "Osnovna SEO podešavanja", "Obuka za uređivanje"],
          },
          {
            name: "Web shop",
            audience: "Za prodaju proizvoda preko interneta.",
            price: "[1.200]",
            highlighted: true,
            items: ["Katalog proizvoda i korpa", "Plaćanje karticom ili pouzećem", "Pregled porudžbina", "Obuka za vaš tim"],
          },
          {
            name: "Po meri",
            audience: "Za složenije sajtove sa posebnim funkcijama.",
            price: "[cena na upit]",
            items: ["Analiza potreba", "Integracije sa vašim sistemima", "Višejezični sadržaj", "Prioritetna podrška"],
          },
        ],
      },
      process: { title: "Četiri koraka. Bez iznenađenja.", steps: defaultProcess },
      faqTitle: "Pitanja o izradi sajtova.",
      faq: [
        {
          question: "Koliko traje izrada sajta?",
          answer: "Prezentacioni sajt [2–4 nedelje], web shop [4–8 nedelja]. Tačan rok dobijate u pisanoj ponudi.",
        },
        {
          question: "Da li mogu sam da menjam sadržaj?",
          answer: "Da. Na kraju vas obučimo da sami menjate tekstove, slike i cene.",
        },
        {
          question: "Da li radite i redizajn postojećeg sajta?",
          answer: "Da. Preuzimamo postojeći sadržaj, a adrese stranica čuvamo ili preusmeravamo da posetioci i pretraživači ne izgube put.",
        },
      ],
      cta: defaultCta,
    },
  },
  {
    slug: "mobilne-aplikacije",
    name: "Mobilne aplikacije",
    shortName: "Mobilne aplikacije",
    group: "digital",
    icon: "mobile",
    summary: "Nativne iOS i Android aplikacije",
    cardText: "Aplikacije za iOS i Android — za rezervacije, loyalty programe ili interne procese.",
    priceFrom: "[3.500] €",
    seo: {
      title: "Izrada mobilnih aplikacija",
      description:
        "Izrada mobilnih aplikacija za iOS i Android: rezervacije, loyalty programi i interni alati, od ideje i dizajna do objave u prodavnicama aplikacija.",
    },
    page: {
      title: "Aplikacije koje vaši klijenti zaista koriste.",
      intro:
        "Aplikacije za iOS i Android za rezervacije, loyalty programe ili interne procese — od ideje i dizajna do objave u App Store-u i Google Play-u.",
      heroImage: "Ekran aplikacije (9:19.5)",
      heroMedia: { kind: "phone", image: media.webShopLogin },
      included: {
        title: "Od ideje do objave u prodavnici.",
        items: [
          { title: "UX i dizajn ekrana", description: "Prototip koji probate na telefonu pre početka programiranja." },
          { title: "iOS i Android", description: "Jedna aplikacija za obe platforme, sa izvornim ponašanjem." },
          { title: "Admin panel", description: "Sadržaj, korisnike i porudžbine vodite iz pregledača." },
          { title: "Push notifikacije", description: "Obaveštenja o akcijama, terminima i novostima." },
          { title: "Objava u prodavnicama", description: "Pripremamo i predajemo aplikaciju na App Store i Google Play." },
          { title: "Održavanje", description: "Ažuriranja za nove verzije iOS-a i Android-a." },
        ],
      },
      examplesTitle: "Aplikacije koje smo napravili.",
      packages: {
        title: "Cena zavisi od obima. Okvir znate unapred.",
        note: "Cene su bez PDV-a.",
        items: [
          {
            name: "MVP",
            audience: "Za proveru ideje sa prvim korisnicima.",
            price: "[3.500]",
            items: ["Do [8] ekrana", "Jedna osnovna funkcija", "Objava u prodavnicama"],
          },
          {
            name: "Standard",
            audience: "Za rezervacije, loyalty i porudžbine.",
            price: "[7.500]",
            highlighted: true,
            items: ["Korisnički nalozi", "Admin panel", "Push notifikacije", "Analitika korišćenja"],
          },
          {
            name: "Po meri",
            audience: "Za složene i interne sisteme.",
            price: "[cena na upit]",
            items: ["Integracije sa postojećim sistemima", "Offline rad", "Napredne uloge i dozvole"],
          },
        ],
      },
      process: { title: "Četiri koraka. Bez iznenađenja.", steps: defaultProcess },
      faqTitle: "Pitanja o mobilnim aplikacijama.",
      faq: [
        {
          question: "Koliko traje izrada aplikacije?",
          answer: "Obično [2–4 meseca], u zavisnosti od broja ekrana i funkcija.",
        },
        {
          question: "Da li aplikacija radi i na iOS-u i na Android-u?",
          answer: "Da. Pravimo jednu aplikaciju koja radi na obe platforme.",
        },
        {
          question: "Ko održava aplikaciju posle objave?",
          answer: "Možemo mi, kroz mesečno održavanje, ili vaš tim — predajemo kompletan izvorni kod.",
        },
      ],
      cta: defaultCta,
    },
  },
  {
    slug: "veb-aplikacije",
    name: "Veb aplikacije",
    shortName: "Veb aplikacije",
    group: "digital",
    icon: "webapp",
    summary: "Custom softver, dashboardi i SaaS",
    cardText:
      "Custom softver, dashboardi i SaaS. Zamenite Excel tabele alatom napravljenim baš za vaš posao.",
    priceFrom: "[2.900] €",
    seo: {
      title: "Izrada veb aplikacija",
      description:
        "Izrada veb aplikacija po meri: interni alati, dashboardi i SaaS proizvodi koji zamenjuju Excel tabele i ručni rad.",
    },
    page: {
      title: "Softver napravljen baš za vaš način rada.",
      intro:
        "Interni alati, dashboardi i SaaS proizvodi. Zamenite Excel tabele i ručni rad aplikacijom koja radi u pregledaču, na svakom uređaju.",
      heroImage: "Screenshot: dashboard",
      heroMedia: { kind: "browser", image: media.webShopLogin, fit: "cover" },
      included: {
        title: "Alat koji vaš tim koristi svaki dan.",
        items: [
          { title: "Analiza procesa", description: "Mapiramo kako radite danas i gde gubite vreme." },
          { title: "Korisničke uloge", description: "Svako vidi i menja samo ono što mu je potrebno." },
          { title: "Izveštaji i dashboardi", description: "Ključni brojevi na jednom ekranu, uz izvoz u Excel i PDF." },
          { title: "Integracije", description: "Povezivanje sa knjigovodstvom, e-mailom i drugim alatima." },
          { title: "Bezbednost", description: "Šifrovane veze, rezervne kopije i evidencija promena." },
          { title: "Hosting i održavanje", description: "Brinemo o serveru, ažuriranjima i dostupnosti." },
        ],
      },
      examplesTitle: "Aplikacije koje rade za naše klijente.",
      packages: {
        title: "Počinjemo malim korakom, rastemo sa vama.",
        note: "Cene su bez PDV-a.",
        items: [
          {
            name: "Interni alat",
            audience: "Za jedan proces koji danas radite ručno.",
            price: "[2.900]",
            items: ["Analiza procesa", "Do [3] korisničke uloge", "Izvoz podataka"],
          },
          {
            name: "Poslovna aplikacija",
            audience: "Za više timova i povezane procese.",
            price: "[6.500]",
            highlighted: true,
            items: ["Dashboard i izveštaji", "Integracije sa postojećim alatima", "Napredne dozvole", "Obuka za tim"],
          },
          {
            name: "SaaS",
            audience: "Za softver koji prodajete drugim firmama.",
            price: "[cena na upit]",
            items: ["Pretplate i naplata", "Više klijenata u jednom sistemu", "Skaliranje infrastrukture"],
          },
        ],
      },
      process: { title: "Četiri koraka. Bez iznenađenja.", steps: defaultProcess },
      faqTitle: "Pitanja o veb aplikacijama.",
      faq: [
        {
          question: "Koja je razlika između sajta i veb aplikacije?",
          answer: "Sajt predstavlja firmu posetiocima. Veb aplikacija je alat za rad — korisnici se prijavljuju, unose i obrađuju podatke.",
        },
        {
          question: "Gde se čuvaju podaci?",
          answer: "Na serveru u [EU / Srbiji], uz redovne rezervne kopije. Podaci pripadaju vama.",
        },
        {
          question: "Možemo li da krenemo sa manjom verzijom?",
          answer: "Da, i to preporučujemo. Prvo rešavamo najveći problem, pa dodajemo funkcije prema stvarnom korišćenju.",
        },
      ],
      cta: defaultCta,
    },
  },
  {
    slug: "snimanje-dronom",
    name: "Snimanje dronom",
    shortName: "Snimanje dronom",
    group: "video",
    icon: "drone",
    summary: "Nekretnine, eventi, turizam, industrija",
    cardText:
      "Nekretnine, eventi, turizam i industrija — u 4K, sa licenciranim pilotima i svim dozvolama.",
    priceFrom: "[180] €",
    seo: {
      title: "Snimanje dronom",
      description:
        "Snimanje dronom u 4K za nekretnine, evente, turizam i industriju: plan kadrova, dozvole za letenje, montaža i verzije za društvene mreže.",
    },
    page: {
      title: "Snimci iz vazduha koji prodaju prostor, mesto i doživljaj.",
      intro:
        "Za agente za nekretnine, hotele, organizatore događaja i industriju. Licencirani piloti, sve dozvole i gotov materijal za [5] radnih dana.",
      heroImage: "Foto iz drona: vila sa bazenom, zlatni sat",
      heroMedia: { kind: "video" },
      heroOverlay: { left: "REC 00:00:14", right: "ALT 85 M · 4K/60" },
      included: {
        title: "Vi birate lokaciju. Sve ostalo je na nama.",
        items: [
          { title: "Licencirani pilot", description: "[Potvrditi] Registrovan kod DCV, sa polisom osiguranja od odgovornosti." },
          { title: "Sve dozvole", description: "Za kontrolisane i zaštićene zone podnosimo zahteve u vaše ime." },
          { title: "4K video i RAW foto", description: "[Potvrditi opremu] Kamera sa 1\" senzorom, 10-bit snimak za kvalitetan color grading." },
          { title: "Montaža i color grading", description: "Gotov video sa licenciranom muzikom, spreman za objavu." },
          { title: "Verzije za mreže", description: "Isti materijal isečen u 9:16 za Instagram, TikTok i Reels." },
          { title: "Isporuka za [5] dana", description: "Link za preuzimanje, materijal čuvamo [12] meseci." },
        ],
      },
      examplesTitle: "Četiri oblasti, isti standard.",
      examples: [
        {
          title: "Beograd na vodi i Kula Beograd",
          tag: "Grad · Nekretnine",
          image: media.belgradeSava,
          video: { sources: belgradeVideo.sources, duration: "0:15" },
        },
        { title: "Kula Beograd i obala Save", tag: "Nekretnine", image: media.belgradeTower },
        { title: "Mostovi na Savi i Beogradski sajam", tag: "Grad · Infrastruktura", image: media.belgradeBridges },
        {
          title: "[Naziv lokaliteta] — kameno utvrđenje",
          tag: "Turizam · Kulturna baština",
          image: media.droneOverview,
          video: { sources: droneVideo.sources, duration: "0:15" },
        },
      ],
      packages: {
        title: "Jasne cene. Konačan iznos dobijate pre snimanja.",
        note: "Cene su bez PDV-a. Putni troškovi van [grada]: [0,40] € po km.",
        items: [
          {
            name: "Foto",
            audience: "Za oglase nekretnina i sajtove hotela.",
            price: "[180]",
            items: ["Do [1] sat leta na jednoj lokaciji", "[25] obrađenih fotografija", "Isporuka za [3] radna dana"],
          },
          {
            name: "Video",
            audience: "Za prodaju nekretnina, promociju objekta i mreže.",
            price: "[390]",
            highlighted: true,
            items: ["Do [2] sata na lokaciji", "Montiran video [60–90] s u 4K", "Verzija 9:16 za Reels i TikTok", "[15] obrađenih fotografija"],
          },
          {
            name: "Kampanja",
            audience: "Za evente, turizam i industrijske objekte.",
            price: "[890]",
            items: ["Ceo dan snimanja, više lokacija", "Promo spot + [5] kratkih videa", "Snimatelj sa zemlje uključen", "Dozvole za kontrolisane zone"],
          },
        ],
      },
      process: {
        title: "Od poziva do gotovog snimka za [5] dana.",
        steps: [
          { title: "Poziv i plan kadrova", description: "Dogovaramo šta želite da pokažete i u koje doba dana je svetlo najbolje.", time: "[isti dan]" },
          { title: "Dozvole i izviđanje", description: "Proveravamo zonu leta, pribavljamo dozvole i pratimo prognozu.", time: "[1–2 dana]" },
          { title: "Snimanje", description: "Dolazimo na lokaciju. Vi ne morate da budete prisutni.", time: "[1–3 sata]" },
          { title: "Montaža i isporuka", description: "Montiramo, radimo color grading i šaljemo link. Jedna runda izmena je uključena.", time: "[2–3 dana]" },
        ],
      },
      faqTitle: "Pitanja o snimanju dronom.",
      faq: [
        {
          question: "Da li vam trebaju dozvole za letenje?",
          answer: "Da, i sve ih pribavljamo mi. Za kontrolisane zone (aerodromi, centri gradova) zahtev podnosimo Direktoratu civilnog vazduhoplovstva najmanje [7] dana unapred.",
        },
        {
          question: "Šta ako pada kiša ili duva jak vetar?",
          answer: "Termin pomeramo bez doplate. Vremensku prognozu proveravamo dan ranije i javljamo vam se do [18h].",
        },
        {
          question: "Koliko dugo traje snimanje?",
          answer: "Za nekretninu obično [1–2 sata] na lokaciji. Eventi i industrijski objekti zavise od obima — plan kadrova dogovaramo unapred.",
        },
        {
          question: "U kom formatu dobijam materijal?",
          answer: "Montiran video u 4K i verziji za društvene mreže (9:16), fotografije u JPG i RAW formatu. Sve preko linka za preuzimanje.",
        },
        {
          question: "Da li je oprema osigurana?",
          answer: "[Potvrditi] Da. Imamo polisu odgovornosti prema trećim licima do [500.000] €, što mnogi objekti i organizatori traže.",
        },
      ],
      cta: {
        title: "Pošaljite lokaciju i datum — proverićemo dozvole besplatno.",
        text: "Odgovor sa terminom i tačnom cenom stiže u roku od [24 sata].",
      },
    },
  },
];

export function getService(slug: string): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Nepoznata usluga: ${slug}`);
  return service;
}

export const serviceHref = (slug: string) => `/usluge/${slug}`;
