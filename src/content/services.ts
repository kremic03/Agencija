/*
 * Usluge — nazivi, opisi, SEO tekstovi i sadržaj stranica usluga.
 * Meni, početna, footer, forma, sitemap i stranice usluga čitaju odavde.
 */

import { belgradeVideo, droneVideo, liveSites, media, type Media, type VideoSource } from "./media";

export type ServiceGroup = "digital" | "video";

export const serviceGroups: Record<ServiceGroup, string> = {
  digital: "Digitalni proizvodi",
  video: "Video produkcija",
};

export type ServiceIconName = "web" | "mobile" | "webapp" | "drone";

export type Step = { title: string; description: string };
export type Faq = { question: string; answer: string };
export type Package = {
  name: string;
  audience: string;
  items: string[];
  highlighted?: boolean;
};

/** Primer rada sa pravom fotografijom ili videom */
export type Example = {
  title: string;
  tag: string;
  image: Media;
  video?: { sources: VideoSource[]; duration: string };
  /** Screenshot sajta: prikazuje se od gornjeg levog ugla, da naslov ne bude odsečen */
  screenshot?: boolean;
  /** Adresa objavljenog rada; klik na primer je otvara u novom prozoru */
  url?: string;
};

/** Medij u uvodu stranice usluge */
export type HeroMedia =
  | { kind: "browser"; image: Media; fit: "natural" | "cover" }
  | { kind: "phone"; image: Media }
  | { kind: "photo"; image: Media }
  /** Bez `clip` ide snimak utvrđenja (droneVideo) */
  | { kind: "video"; clip?: { sources: VideoSource[]; poster: Media } };

export type Service = {
  slug: string;
  /** Slug nadređene usluge: podstranica (npr. snimanje nekretnina) ne ide u meni ni u formu */
  parent?: string;
  name: string;
  shortName: string;
  group: ServiceGroup;
  icon: ServiceIconName;
  /** Kratak opis za meni i formu */
  summary: string;
  /** Opis na kartici na početnoj */
  cardText: string;
  seo: { title: string; description: string };
  page: {
    title: string;
    intro: string;
    heroMedia: HeroMedia;
    heroOverlay?: { left: string; right: string };
    included: { title: string; items: { title: string; description: string }[] };
    /** Duži tekst o usluzi: za koga je i kako radimo */
    about?: { title: string; paragraphs: string[] };
    /** Prikazuje izdvojene produkcije (home.ts) pre primera radova */
    showProductions?: boolean;
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

export const defaultProcess: Step[] = [
  {
    title: "Razgovor",
    description:
      "Besplatne konsultacije. Slušamo šta vam treba i predlažemo rešenje — ponekad i jeftinije od planiranog.",
  },
  {
    title: "Ponuda i plan",
    description: "Pisana ponuda sa fiksnom cenom i spiskom svega što je uključeno.",
  },
  {
    title: "Izrada",
    description: "Radimo u kratkim ciklusima. Svake nedelje vidite napredak i šaljete komentare.",
  },
  {
    title: "Lansiranje i podrška",
    description:
      "Puštamo projekat u rad, obučavamo vaš tim i ostajemo uz vas i posle objave.",
  },
];

const defaultCta = {
  title: "Recite nam šta vam treba. Ponudu dobijate za 24 sata.",
  text: "Upitnik traje oko 3 minuta. Bez obaveze i bez tehničkog žargona.",
};

// Zajedničko za snimanje dronom i njegove podstranice
const droneProcess: Step[] = [
  { title: "Poziv i plan kadrova", description: "Dogovaramo šta želite da pokažete i u koje doba dana je svetlo najbolje." },
  { title: "Izviđanje", description: "Proveravamo zonu leta i pratimo prognozu." },
  { title: "Snimanje", description: "Dolazimo na lokaciju. Vi ne morate da budete prisutni." },
  { title: "Montaža i isporuka", description: "Montiramo, radimo color grading i šaljemo link za preuzimanje." },
];

const droneFaq = {
  weather: {
    question: "Šta ako pada kiša ili duva jak vetar?",
    answer: "Termin pomeramo bez doplate. Vremensku prognozu proveravamo unapred i na vreme vam se javljamo.",
  },
  format: {
    question: "U kom formatu dobijam materijal?",
    answer: "Montiran video i verzija za društvene mreže (9:16), fotografije u JPG i RAW formatu. Sve preko linka za preuzimanje.",
  },
} satisfies Record<string, Faq>;

const droneIncluded = {
  pilot: { title: "Licencirani pilot", description: "Pilot je licenciran i registrovan kod DCV." },
  edit: { title: "Montaža i color grading", description: "Gotov video sa licenciranom muzikom, spreman za objavu." },
  social: { title: "Verzije za mreže", description: "Isti materijal isečen u 9:16 za Instagram, TikTok i Reels." },
  delivery: { title: "Isporuka preko linka", description: "Gotov materijal dobijate preko linka za preuzimanje." },
};

const droneCta = {
  title: "Pošaljite lokaciju i datum — javljamo se sa terminom i cenom.",
  text: "Odgovor stiže u roku od 24 sata.",
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
    seo: {
      title: "Izrada veb sajtova i web shopova u Beogradu",
      description:
        "Izrada prezentacionih sajtova i web shopova za firme iz Beograda i cele Srbije: brzo učitavanje, prilagođeno telefonu i uređivanje bez programera.",
    },
    page: {
      title: "Izrada veb sajtova koji se brzo učitavaju i koje sami menjate.",
      intro:
        "Prezentacioni sajtovi i web shopovi za mala i srednja preduzeća. Tekstove, slike i cene menjate sami, bez programera.",
      heroMedia: { kind: "browser", image: media.webShopHome, fit: "natural" },
      included: {
        title: "Sve što sajtu treba za početak rada.",
        items: [
          { title: "Dizajn po meri", description: "Izgled usklađen sa vašim brendom, bez generičkih šablona." },
          { title: "Prilagođen telefonu", description: "Sajt se jednako dobro koristi na telefonu, tabletu i računaru." },
          { title: "Tehnička SEO osnova", description: "Naslovi, opisi, sitemap i brzina pripremljeni za pretraživače." },
          { title: "Jednostavno uređivanje", description: "Sami menjate tekstove, slike i cene kroz pregledan panel." },
          { title: "Kontakt forma", description: "Upiti sa sajta stižu direktno na vaš e-mail." },
          { title: "Obuka i podrška", description: "Obučavamo vaš tim i ostajemo uz vas i posle objave." },
        ],
      },
      examplesTitle: "Sajtovi koje smo napravili.",
      examples: [
        {
          title: "Web shop modne kolekcije",
          tag: "Web shop",
          image: media.webShopHome,
          screenshot: true,
          url: liveSites.webShopHome,
        },
        {
          title: "Prijava kupaca",
          tag: "Web shop",
          image: media.webShopLogin,
          screenshot: true,
          url: liveSites.webShopLogin,
        },
      ],
      packages: {
        title: "Izaberite paket koji vam odgovara.",
        note: "Tačnu cenu dobijate u pisanoj ponudi.",
        items: [
          {
            name: "Prezentacioni sajt",
            audience: "Za firme kojima treba predstavljanje i upiti.",
            items: ["Predstavljanje firme i usluga", "Kontakt forma", "Osnovna SEO podešavanja", "Obuka za uređivanje"],
          },
          {
            name: "Web shop",
            audience: "Za prodaju proizvoda preko interneta.",
            highlighted: true,
            items: ["Katalog proizvoda i korpa", "Plaćanje karticom ili pouzećem", "Pregled porudžbina", "Obuka za vaš tim"],
          },
          {
            name: "Po meri",
            audience: "Za složenije sajtove sa posebnim funkcijama.",
            items: ["Analiza potreba", "Integracije sa vašim sistemima", "Višejezični sadržaj", "Podrška posle objave"],
          },
        ],
      },
      process: { title: "Četiri koraka. Bez iznenađenja.", steps: defaultProcess },
      faqTitle: "Pitanja o izradi sajtova.",
      faq: [
        {
          question: "Koliko traje izrada sajta?",
          answer: "Zavisi od obima projekta. Tačan rok dobijate u pisanoj ponudi.",
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
    seo: {
      title: "Izrada mobilnih aplikacija za iOS i Android",
      description:
        "Izrada mobilnih aplikacija za iOS i Android, agencija iz Beograda: rezervacije, loyalty programi i interni alati, od ideje do objave u prodavnicama.",
    },
    page: {
      title: "Izrada mobilnih aplikacija koje vaši klijenti zaista koriste.",
      intro:
        "Aplikacije za iOS i Android za rezervacije, loyalty programe ili interne procese — od ideje i dizajna do objave u App Store-u i Google Play-u.",
      heroMedia: { kind: "phone", image: media.webShopLogin },
      included: {
        title: "Od ideje do objave u prodavnici.",
        items: [
          { title: "UX i dizajn ekrana", description: "Prototip koji probate na telefonu pre početka programiranja." },
          { title: "iOS i Android", description: "Jedna aplikacija za obe platforme, sa izvornim ponašanjem." },
          { title: "Admin panel", description: "Sadržaj, korisnike i porudžbine vodite iz pregledača." },
          { title: "Push notifikacije", description: "Obaveštenja o akcijama, terminima i novostima." },
          { title: "Objava u prodavnicama", description: "Pripremamo i predajemo aplikaciju na App Store i Google Play." },
          { title: "Podrška posle objave", description: "Ostajemo uz vas i posle objave, uz ažuriranja za nove verzije iOS-a i Android-a." },
        ],
      },
      examplesTitle: "Aplikacije koje smo napravili.",
      packages: {
        title: "Cena zavisi od obima. Okvir znate unapred.",
        note: "Tačnu cenu dobijate u pisanoj ponudi.",
        items: [
          {
            name: "MVP",
            audience: "Za proveru ideje sa prvim korisnicima.",
            items: ["Dizajn ekrana", "Osnovna funkcija aplikacije", "Objava u prodavnicama"],
          },
          {
            name: "Standard",
            audience: "Za rezervacije, loyalty i porudžbine.",
            highlighted: true,
            items: ["Korisnički nalozi", "Admin panel", "Push notifikacije", "Analitika korišćenja"],
          },
          {
            name: "Po meri",
            audience: "Za složene i interne sisteme.",
            items: ["Integracije sa postojećim sistemima", "Offline rad", "Napredne uloge i dozvole"],
          },
        ],
      },
      process: { title: "Četiri koraka. Bez iznenađenja.", steps: defaultProcess },
      faqTitle: "Pitanja o mobilnim aplikacijama.",
      faq: [
        {
          question: "Koliko traje izrada aplikacije?",
          answer: "Zavisi od broja ekrana i funkcija. Tačan rok dobijate u pisanoj ponudi.",
        },
        {
          question: "Da li aplikacija radi i na iOS-u i na Android-u?",
          answer: "Da. Pravimo jednu aplikaciju koja radi na obe platforme.",
        },
        {
          question: "Šta je sa aplikacijom posle objave?",
          answer: "Ostajemo uz vas i posle objave: pratimo kako aplikacija radi i pomažemo kada zatreba.",
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
    seo: {
      title: "Izrada veb aplikacija po meri",
      description:
        "Izrada veb aplikacija po meri za firme iz Beograda i cele Srbije: interni alati, dashboardi i SaaS proizvodi koji zamenjuju Excel tabele i ručni rad.",
    },
    page: {
      title: "Veb aplikacije po meri, napravljene za vaš način rada.",
      intro:
        "Interni alati, dashboardi i SaaS proizvodi. Zamenite Excel tabele i ručni rad aplikacijom koja radi u pregledaču, na svakom uređaju.",
      heroMedia: { kind: "browser", image: media.webShopLogin, fit: "cover" },
      included: {
        title: "Alat koji vaš tim koristi svaki dan.",
        items: [
          { title: "Analiza procesa", description: "Mapiramo kako radite danas i gde gubite vreme." },
          { title: "Korisničke uloge", description: "Svako vidi i menja samo ono što mu je potrebno." },
          { title: "Izveštaji i dashboardi", description: "Ključni brojevi na jednom ekranu, uz izvoz u Excel i PDF." },
          { title: "Integracije", description: "Povezivanje sa knjigovodstvom, e-mailom i drugim alatima." },
          { title: "Bezbednost", description: "Šifrovane veze, rezervne kopije i evidencija promena." },
          { title: "Podrška posle objave", description: "Ostajemo uz vas i posle objave, da aplikacija nastavi da radi kako treba." },
        ],
      },
      examplesTitle: "Aplikacije koje rade za naše klijente.",
      packages: {
        title: "Počinjemo malim korakom, rastemo sa vama.",
        note: "Tačnu cenu dobijate u pisanoj ponudi.",
        items: [
          {
            name: "Interni alat",
            audience: "Za jedan proces koji danas radite ručno.",
            items: ["Analiza procesa", "Korisničke uloge", "Izvoz podataka"],
          },
          {
            name: "Poslovna aplikacija",
            audience: "Za više timova i povezane procese.",
            highlighted: true,
            items: ["Dashboard i izveštaji", "Integracije sa postojećim alatima", "Napredne dozvole", "Obuka za tim"],
          },
          {
            name: "SaaS",
            audience: "Za softver koji prodajete drugim firmama.",
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
    summary: "Nekretnine, emisije, priroda, događaji",
    cardText:
      "Nekretnine, eventi, turizam i industrija — sa pilotima licenciranim kod DCV.",
    seo: {
      title: "Snimanje dronom u Beogradu i širom Srbije",
      description:
        "Snimanje dronom u Beogradu i širom Srbije, sa 15+ godina iskustva: nekretnine, eventi, turizam, emisije i produkcije. Video, fotografije i montaža.",
    },
    page: {
      title: "Snimanje dronom koje prodaje prostor, mesto i doživljaj.",
      intro:
        "Za agente za nekretnine, produkcije, hotele i organizatore događaja. Piloti licencirani kod DCV i gotov materijal spreman za objavu.",
      heroMedia: { kind: "video" },
      heroOverlay: { left: "REC 00:00:14", right: "ALT 85 M" },
      included: {
        title: "Vi birate lokaciju. Sve ostalo je na nama.",
        items: [
          droneIncluded.pilot,
          { title: "Video i fotografije", description: "Snimci i fotografije iz vazduha, obrađeni i spremni za objavu." },
          droneIncluded.edit,
          droneIncluded.social,
          droneIncluded.delivery,
        ],
      },
      showProductions: true,
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
          title: "Kameno utvrđenje",
          tag: "Turizam · Kulturna baština",
          image: media.droneOverview,
          video: { sources: droneVideo.sources, duration: "0:15" },
        },
      ],
      packages: {
        title: "Izaberite paket koji vam odgovara.",
        note: "Tačnu cenu dobijate u pisanoj ponudi.",
        items: [
          {
            name: "Foto",
            audience: "Za oglase nekretnina i sajtove hotela.",
            items: ["Snimanje na lokaciji", "Obrađene fotografije", "Isporuka preko linka"],
          },
          {
            name: "Video",
            audience: "Za prodaju nekretnina, promociju objekta i mreže.",
            highlighted: true,
            items: ["Snimanje na lokaciji", "Montiran video", "Verzija 9:16 za Reels i TikTok", "Obrađene fotografije"],
          },
          {
            name: "Kampanja",
            audience: "Za događaje, turizam i poslovne komplekse.",
            items: ["Snimanje na više lokacija", "Promo spot i kratki videi", "Snimatelj sa zemlje"],
          },
        ],
      },
      process: { title: "Od poziva do gotovog snimka.", steps: droneProcess },
      faqTitle: "Pitanja o snimanju dronom.",
      faq: [
        droneFaq.weather,
        {
          question: "Koliko dugo traje snimanje?",
          answer: "Zavisi od lokacije i obima. Plan kadrova dogovaramo unapred.",
        },
        droneFaq.format,
      ],
      cta: droneCta,
    },
  },
];

/*
 * Podstranice usluga: jedna stranica za jednu vrstu posla, sa svojim tekstom,
 * primerima i paketima. Ne ulaze u meni, početnu ni formu; povezane su sa
 * nadređenom uslugom (sekcija „Šta snimamo”) i međusobno.
 *
 * PRIVREMENO: tvrdnje označene sa „PRIVREMENO” potvrditi pre objave.
 */
export const specialties: Service[] = [
  {
    slug: "snimanje-nekretnina-dronom",
    parent: "snimanje-dronom",
    name: "Snimanje nekretnina dronom",
    shortName: "Nekretnine",
    group: "video",
    icon: "drone",
    summary: "Stambeni objekti i poslovni kompleksi",
    cardText: "Video i fotografije iz vazduha za prodaju i zakup stanova, kuća i poslovnih kompleksa.",
    seo: {
      title: "Snimanje nekretnina dronom u Beogradu",
      description:
        "Snimanje nekretnina dronom u Beogradu i Srbiji: stambeni objekti i poslovni kompleksi iz vazduha, video i fotografije spremne za oglase.",
    },
    page: {
      title: "Snimanje nekretnina dronom koje pokazuje objekat i sve oko njega.",
      intro:
        "Za investitore, agencije za nekretnine i upravnike poslovnih kompleksa. Iz vazduha se vidi ono što fotografija sa ulice ne može: položaj, okolina i razmera objekta.",
      heroMedia: { kind: "photo", image: media.belgradeTower },
      included: {
        title: "Od stana u zgradi do celog kompleksa.",
        items: [
          { title: "Stambeni objekti", description: "Zgrade, kuće i placevi, zajedno sa okolinom i prilazom." },
          { title: "Poslovni kompleksi", description: "Poslovne zgrade, hale i kompleksi u punoj razmeri." },
          { title: "Fotografije za oglase", description: "Obrađene fotografije u JPG i RAW formatu, spremne za portale." },
          droneIncluded.edit,
          droneIncluded.social,
          droneIncluded.pilot,
        ],
      },
      about: {
        title: "Zašto snimak iz vazduha pomaže prodaji.",
        paragraphs: [
          "Kupac stana ili zakupac poslovnog prostora ne gleda samo kvadrate. Pita se koliko su daleko reka, park ili autoput, šta je u susedstvu i kako se do objekta stiže. Snimak iz drona odgovara na ta pitanja u nekoliko sekundi, pre prvog obilaska.",
          "Kod stambenih objekata zgradu pokazujemo u odnosu na okolinu: zelene površine, prilaz, obalu ili pogled koji se vidi sa viših spratova. Kod poslovnih kompleksa naglasak je na razmeri, pristupnim putevima, parkingu i vezi sa ostatkom grada.",
          "Isti materijal koristite na više mesta: u oglasima na portalima za nekretnine, na sajtu projekta, u prezentacijama za investitore i na društvenim mrežama, za koje dobijate i verzije u formatu 9:16.",
        ],
      },
      examplesTitle: "Stambeni tornjevi i obala Save iz vazduha.",
      examples: [
        {
          title: "Beograd na vodi i Kula Beograd",
          tag: "Stambeni kompleks · Video",
          image: media.belgradeSava,
          video: { sources: belgradeVideo.sources, duration: "0:15" },
        },
        { title: "Kula Beograd i obala Save", tag: "Stambeni objekti", image: media.belgradeTower },
      ],
      packages: {
        title: "Paket prema vrsti nekretnine.",
        note: "Tačnu cenu dobijate u pisanoj ponudi.",
        items: [
          {
            name: "Foto",
            audience: "Za oglase stanova, kuća i placeva.",
            items: ["Snimanje na lokaciji", "Obrađene fotografije (JPG i RAW)", "Isporuka preko linka"],
          },
          {
            name: "Video",
            audience: "Za prodaju stambenih projekata i zakup prostora.",
            highlighted: true,
            items: ["Snimanje na lokaciji", "Montiran video sa muzikom", "Verzija 9:16 za Reels i TikTok", "Obrađene fotografije"],
          },
          {
            name: "Kompleks",
            audience: "Za investitore i velike poslovne komplekse.",
            items: ["Snimanje celog kompleksa iz više uglova", "Promo video i kratki videi", "Snimatelj sa zemlje", "Obrađene fotografije"],
          },
        ],
      },
      process: { title: "Od adrese do gotovog snimka.", steps: droneProcess },
      faqTitle: "Pitanja o snimanju nekretnina.",
      faq: [
        {
          question: "Da li moram da budem prisutan tokom snimanja?",
          answer: "Ne morate. Pošaljite adresu i recite šta želite da istaknemo, a mi se javljamo sa terminom.",
        },
        {
          // PRIVREMENO: potvrditi da se klijentu javlja pre termina kada lokacija traži posebno odobrenje
          question: "Da li smete da letite iznad grada?",
          answer:
            "Za svaku lokaciju unapred proveravamo zonu leta i pravila koja za nju važe. Pilot je licenciran i registrovan kod DCV. Ako lokacija traži posebno odobrenje, javljamo vam pre dogovora o terminu.",
        },
        {
          question: "Kada je najbolje snimati?",
          answer:
            "Zavisi od položaja objekta. Najčešće biramo jutro ili kasno popodne, kada je svetlo meko, a senke ne skrivaju fasadu. Doba dana dogovaramo u planu kadrova.",
        },
        {
          question: "Mogu li snimke da koristim na portalima za nekretnine?",
          answer: "Da. Fotografije i video dobijate spremne za objavu na portalima, sajtu i društvenim mrežama.",
        },
        droneFaq.weather,
        droneFaq.format,
      ],
      cta: {
        title: "Pošaljite adresu objekta — javljamo se sa terminom i cenom.",
        text: "Odgovor stiže u roku od 24 sata.",
      },
    },
  },
  {
    slug: "snimanje-dronom-za-tv-emisije",
    parent: "snimanje-dronom",
    name: "Snimanje dronom za TV emisije",
    shortName: "TV emisije i produkcije",
    group: "video",
    icon: "drone",
    summary: "Emisije, serije i produkcije",
    cardText: "Kadrovi iz vazduha za emisije i produkcije, od ekipe sa iskustvom na setu.",
    seo: {
      title: "Snimanje dronom za TV emisije i produkcije",
      description:
        "Dron snimatelj za TV emisije i produkcije: iskustvo na emisiji „Lepi Brka” i produkciji „Žigosani u reketu”, licencirani pilot, 15+ godina snimanja.",
    },
    page: {
      title: "Snimanje dronom za TV emisije i produkcije, sa iskustvom na setu.",
      intro:
        "Radimo kao deo vaše ekipe: pratimo plan snimanja, režisera i ritam seta. Iza nas je više od 15 godina snimanja dronom i rad na domaćim emisijama i produkcijama.",
      heroMedia: { kind: "video" },
      heroOverlay: { left: "REC 00:00:14", right: "ALT 85 M" },
      included: {
        title: "Dron koji se uklapa u vašu ekipu.",
        items: [
          { title: "Iskustvo na setu", description: "Rad sa režiserom, snimateljima i producentom po planu snimanja." },
          droneIncluded.pilot,
          { title: "Provera lokacija", description: "Zone leta i prognozu proveravamo za svaku lokaciju unapred." },
          { title: "Snimanje širom Srbije", description: "Dolazimo na lokacije van Beograda, za jedan dan ili celu turu." },
          // PRIVREMENO: potvrditi da se predaje i sirov materijal
          { title: "Sirov ili obrađen materijal", description: "Sirov materijal za vašu montažu ili kadrovi sa color grading-om." },
          droneIncluded.delivery,
        ],
      },
      about: {
        title: "Kako radimo na emisiji ili produkciji.",
        paragraphs: [
          "Snimanje za emisiju nije isto što i snimanje za oglas. Kadar mora da se uklopi u montažu, ritam epizode i ostatak materijala, a vreme na setu je ograničeno i skupo.",
          "Zato pre snimanja prolazimo kroz plan sa režiserom ili producentom, proveravamo zone leta za sve lokacije i pratimo prognozu. Na setu se prilagođavamo ekipi i pazimo da dron ne ometa ostatak snimanja.",
          "Za emisiju „Lepi Brka” snimali smo kadrove iz vazduha tokom obilaska mesta širom Srbije, uz profesionalnu ekipu snimatelja. Na produkciji „Žigosani u reketu” radili smo na setu, u saradnji sa ekipom produkcije.",
        ],
      },
      showProductions: true,
      // Kadrovi iz emisija i produkcija se ne objavljuju; ovo su naši snimci
      examplesTitle: "Kvalitet kadra koji isporučujemo.",
      examples: [
        {
          title: "Beograd na vodi i Kula Beograd",
          tag: "Naš snimak · Video",
          image: media.belgradeSava,
          video: { sources: belgradeVideo.sources, duration: "0:15" },
        },
        { title: "Mostovi na Savi i Beogradski sajam", tag: "Naš snimak · Foto", image: media.belgradeBridges },
      ],
      packages: {
        title: "Angažman prema obimu snimanja.",
        note: "Tačnu cenu dobijate u pisanoj ponudi.",
        items: [
          {
            name: "Dan snimanja",
            audience: "Za snimanje na jednoj ili više lokacija u jednom danu.",
            items: ["Pilot i dron na setu", "Plan kadrova sa režiserom", "Provera zona leta", "Predaja materijala preko linka"],
          },
          {
            name: "Tura",
            audience: "Za emisije koje obilaze više mesta.",
            highlighted: true,
            items: ["Snimanje na više lokacija", "Usklađivanje sa planom ekipe", "Provera zona leta za svaku lokaciju", "Materijal spreman za montažu"],
          },
          {
            name: "Produkcija",
            audience: "Za serije, filmove i duže projekte.",
            items: ["Pregled lokacija i kadrova", "Više snimajućih dana", "Snimatelj sa zemlje", "Predaja materijala po dogovoru"],
          },
        ],
      },
      process: {
        title: "Od plana snimanja do predaje materijala.",
        steps: [
          { title: "Brifing", description: "Prolazimo kroz plan snimanja, lokacije i kadrove koji vam trebaju." },
          { title: "Provera lokacija", description: "Proveravamo zone leta i pravila za svaku lokaciju i pratimo prognozu." },
          { title: "Snimanje na setu", description: "Radimo po planu ekipe i prilagođavamo se režiseru na licu mesta." },
          { title: "Predaja materijala", description: "Materijal šaljemo preko linka, u dogovorenom formatu." },
        ],
      },
      faqTitle: "Pitanja o snimanju za emisije.",
      faq: [
        {
          // PRIVREMENO: potvrditi da se radi i samostalno, bez ekipe naručioca
          question: "Radite li sa našom ekipom ili samostalno?",
          answer: "Oba. Možemo da budemo deo vaše ekipe na setu ili da samostalno snimimo kadrove iz vazduha po vašem planu.",
        },
        {
          question: "Snimate li van Beograda?",
          answer: "Da. Za emisiju „Lepi Brka” snimali smo na lokacijama širom Srbije.",
        },
        {
          question: "Šta ako vreme pokvari plan snimanja?",
          answer:
            "Prognozu pratimo unapred i na vreme javljamo ako uslovi nisu bezbedni za let, da plan snimanja može da se prilagodi.",
        },
        {
          // PRIVREMENO: potvrditi formate koji se predaju produkciji
          question: "U kom formatu predajete materijal?",
          answer: "Format i rezoluciju dogovaramo sa vašom postprodukcijom pre snimanja. Materijal šaljemo preko linka za preuzimanje.",
        },
      ],
      cta: {
        title: "Pošaljite plan snimanja — javljamo se sa terminom i cenom.",
        text: "Odgovor stiže u roku od 24 sata.",
      },
    },
  },
  {
    slug: "snimanje-prirode-dronom",
    parent: "snimanje-dronom",
    name: "Snimanje prirode dronom",
    shortName: "Priroda i lokaliteti",
    group: "video",
    icon: "drone",
    summary: "Predeli, lokaliteti i turizam",
    cardText: "Planine, reke, šume i kulturna baština iz vazduha, za promociju mesta koje vredi posetiti.",
    seo: {
      title: "Snimanje prirode i lokaliteta dronom",
      description:
        "Snimanje prirode dronom: planine, reke, šume i arheološki lokaliteti iz vazduha, za turističke organizacije, opštine, hotele i promotivne kampanje.",
    },
    page: {
      title: "Snimanje prirode dronom, za mesta koja vredi posetiti.",
      intro:
        "Za turističke organizacije, opštine, hotele i organizatore putovanja. Planine, reke, šume i kulturna baština snimljeni tako da gledalac poželi da dođe.",
      heroMedia: { kind: "video" },
      heroOverlay: { left: "REC 00:00:14", right: "ALT 85 M" },
      included: {
        title: "Predeo u najboljem svetlu.",
        items: [
          { title: "Plan svetla", description: "Biramo doba dana i vremenske uslove u kojima predeo najbolje izgleda." },
          { title: "Video i fotografije", description: "Snimci i fotografije iz vazduha, obrađeni i spremni za objavu." },
          droneIncluded.edit,
          droneIncluded.social,
          droneIncluded.pilot,
          droneIncluded.delivery,
        ],
      },
      about: {
        title: "Mesto se najbolje predstavlja odozgo.",
        paragraphs: [
          "Predeo koji se sa zemlje vidi u delovima iz vazduha postaje celina: vidi se kako reka prolazi kroz dolinu, gde se šuma spaja sa brdima i kako je lokalitet smešten u prostoru.",
          "Kod kulturne baštine i arheoloških lokaliteta snimak iz drona pokazuje raspored zidina i ostataka koji se sa tla ne može sagledati. Kod prirodnih predela biramo svetlo i doba dana u kojima mesto izgleda najbolje.",
          "Materijal je namenjen promociji: turističkim spotovima, sajtovima, prezentacijama i društvenim mrežama, uz verzije u formatu 9:16.",
        ],
      },
      examplesTitle: "Kameno utvrđenje iz vazduha.",
      examples: [
        {
          title: "Kameno utvrđenje",
          tag: "Kulturna baština · Video",
          image: media.droneOverview,
          video: { sources: droneVideo.sources, duration: "0:15" },
        },
        { title: "Utvrđenje i šumovita brda", tag: "Priroda · Foto", image: media.droneHorizon },
      ],
      packages: {
        title: "Paket prema nameni snimka.",
        note: "Tačnu cenu dobijate u pisanoj ponudi.",
        items: [
          {
            name: "Foto",
            audience: "Za sajtove, brošure i prezentacije.",
            items: ["Snimanje na lokaciji", "Obrađene fotografije (JPG i RAW)", "Isporuka preko linka"],
          },
          {
            name: "Video",
            audience: "Za turističke spotove i društvene mreže.",
            highlighted: true,
            items: ["Snimanje na lokaciji", "Montiran video sa muzikom", "Verzija 9:16 za Reels i TikTok", "Obrađene fotografije"],
          },
          {
            name: "Kampanja",
            audience: "Za destinacije sa više lokacija.",
            items: ["Snimanje na više lokacija", "Promo spot i kratki videi", "Snimatelj sa zemlje"],
          },
        ],
      },
      process: { title: "Od lokacije do gotovog snimka.", steps: droneProcess },
      faqTitle: "Pitanja o snimanju prirode.",
      faq: [
        {
          // PRIVREMENO: potvrditi postupak za zaštićena područja
          question: "Smete li da letite u nacionalnim parkovima i zaštićenim područjima?",
          answer:
            "Pravila zavise od područja. Pre dogovora o terminu proveravamo zonu leta i uslove koji važe za lokaciju, a ako je potrebna saglasnost upravljača, javljamo vam šta treba.",
        },
        {
          question: "Kada je najbolje vreme za snimanje prirode?",
          answer:
            "Zavisi od mesta i godišnjeg doba. Najlepše svetlo je najčešće rano ujutru i pred zalazak sunca, pa termin biramo prema lokaciji i prognozi.",
        },
        {
          question: "Snimate li van Beograda?",
          answer: "Da, na lokacijama širom Srbije. Sve troškove vidite unapred, u pisanoj ponudi.",
        },
        droneFaq.weather,
        droneFaq.format,
      ],
      cta: {
        title: "Pošaljite lokaciju — javljamo se sa planom snimanja i cenom.",
        text: "Odgovor stiže u roku od 24 sata.",
      },
    },
  },
];

export function getService(slug: string): Service {
  const service = services.find((s) => s.slug === slug) ?? specialties.find((s) => s.slug === slug);
  if (!service) throw new Error(`Nepoznata usluga: ${slug}`);
  return service;
}

/** Podstranice jedne usluge */
export const specialtiesOf = (slug: string) => specialties.filter((s) => s.parent === slug);

export const serviceHref = (slug: string) => `/usluge/${slug}`;

/** Usluge grupisane za meni i formu, redom kao u serviceGroups */
export function servicesByGroup() {
  return (Object.keys(serviceGroups) as ServiceGroup[]).map((group) => ({
    group,
    label: serviceGroups[group],
    items: services.filter((s) => s.group === group),
  }));
}
