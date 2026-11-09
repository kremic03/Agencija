import Link from "next/link";
import { productions, stats } from "@/content/home";
import { services, serviceHref } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { AboutSubnav } from "@/components/about/AboutSubnav";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata = pageMetadata({
  title: "O nama: agencija iz Beograda",
  description: `Ko stoji iza agencije ${site.name}: tim iz Beograda koji pravi sajtove, aplikacije i video iz vazduha za mala i srednja preduzeća širom Srbije.`,
  path: "/o-nama",
});

// Dizajn: Claude Design „O nama”. Sekcije za tim i istoriju po godinama čekaju prave podatke.
const sections = [
  { id: "prica", label: "Priča" },
  { id: "principi", label: "Kako radimo" },
  { id: "usluge", label: "Šta radimo" },
  { id: "kontakt-info", label: "Kontakt" },
];

const story = [
  { tag: "15+ god.", title: "Snimanje dronom", text: "Kadrovi iz vazduha za firme, produkcije i televizijske emisije." },
  ...productions.map((p) => ({ tag: p.kind, title: p.name, text: p.text })),
  { tag: "~10", title: "Veb aplikacije", text: "Desetak projekata veb aplikacija, od ideje do lansiranja." },
];

const principles = [
  {
    title: "Cena je poznata pre početka.",
    text: "Posle besplatnih konsultacija dobijate pisanu ponudu sa fiksnom cenom, rokovima i spiskom svega što je uključeno. Cena se ne menja tokom rada.",
  },
  {
    title: "Vidite napredak svake nedelje.",
    text: "Radimo u kratkim ciklusima i šaljemo vam ono što je gotovo. Ne idemo dalje dok ne odobrite prethodni korak.",
  },
  {
    title: "Govorimo jezikom koji razumete.",
    text: "Ne morate da znate tehničke izraze. Recite nam cilj, a mi predlažemo rešenje, objašnjavamo ga jednostavno i na kraju vas obučimo da sami menjate sadržaj.",
  },
  {
    title: "Ostajemo i posle lansiranja.",
    text: "Kada projekat ugleda svetlo dana, ne nestajemo. Tu smo i posle objave, da sve nastavi da radi kako treba.",
  },
];

// Razmak ispod headera i podmenija pri skoku na sekciju
const sectionClass = "section-y scroll-mt-13";
const split = "container-page flex flex-wrap gap-x-16 gap-y-10";
const splitHead = "flex max-w-100 flex-[1_1_300px] flex-col gap-4";
const dt = "font-mono text-xs leading-[1.9] font-medium tracking-[0.06em] text-subtle uppercase";

export default function AboutPage() {
  return (
    <>
      <AboutSubnav sections={sections} />

      <section aria-labelledby="o-nama-naslov" className="pt-[clamp(48px,6vw,96px)]">
        <div className="container-page flex flex-col gap-[clamp(40px,5vw,72px)]">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
            <h1 id="o-nama-naslov" className="text-display max-w-205 flex-[1_1_560px]">
              Mali tim koji vodi ceo vaš digitalni nastup.
            </h1>
            <p className="text-lead max-w-100 flex-[1_1_320px]">
              Sajtovi, aplikacije i snimanje dronom pod jednim krovom. Jedan kontakt i jedna ponuda, umesto tri
              različite firme.
            </p>
          </div>

          <dl className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t border-line">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end gap-2.5 border-b border-line pt-6 pr-6 pb-7">
                <dt className="text-[15px] leading-[1.45] text-muted">{s.label}</dt>
                <dd className="text-[clamp(36px,3.6vw,48px)] leading-none font-semibold tracking-[-0.04em]">
                  {s.value}
                  {s.unit && <span className="ml-1 text-xl font-medium tracking-normal text-accent-text">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="prica" aria-labelledby="prica-naslov" className={sectionClass}>
        <div className={split}>
          <div className={splitHead}>
            <h2 id="prica-naslov" className="text-section-title">
              Sajt, aplikacija i snimak iz vazduha od jednog tima.
            </h2>
            <p className="text-base leading-[1.6] text-pretty text-muted">
              Nalazimo se u Beogradu i radimo sa firmama iz cele Srbije. Sastanci su uživo ili online, a za snimanje
              dolazimo na lokaciju. Umesto da sajt, aplikaciju i video tražite na tri mesta, sve radi jedan tim.
            </p>
          </div>
          <ul className="flex-[2_1_520px] border-t border-line">
            {story.map((row) => (
              <li
                key={row.title}
                className="grid grid-cols-[clamp(80px,9vw,120px)_minmax(0,1fr)] gap-6 border-b border-line py-6"
              >
                <span className="font-mono text-sm leading-[1.6] font-medium text-subtle">{row.tag}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-[17px] leading-[1.35] font-semibold">{row.title}</span>
                  <span className="text-[15px] leading-[1.55] text-muted">{row.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="principi" aria-labelledby="principi-naslov" className={sectionClass}>
        <div className={split}>
          <div className={splitHead}>
            <h2 id="principi-naslov" className="text-section-title">
              Četiri pravila kojih se držimo na svakom projektu.
            </h2>
          </div>
          <ul className="grid flex-[2_1_520px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {principles.map((p) => (
              <li key={p.title} className="flex flex-col gap-3.5 rounded-xl border border-line bg-surface p-7">
                <h3 className="text-xl leading-[1.3] font-semibold tracking-[-0.015em]">{p.title}</h3>
                <p className="text-[15px] leading-[1.55] text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="usluge" aria-labelledby="usluge-naslov" className={sectionClass}>
        <div className="container-page flex flex-col gap-10">
          <h2 id="usluge-naslov" className="text-section-title max-w-160">
            Šta radimo.
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] overflow-hidden rounded-xl border border-line bg-surface">
            {services.map((s) => (
              <li key={s.slug} className="-mt-px -ml-px border-t border-l border-line">
                <Link
                  href={serviceHref(s.slug)}
                  className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-raised focus-visible:-outline-offset-2"
                >
                  <span className="flex items-center justify-between gap-4 text-lg leading-[1.3] font-semibold">
                    {s.name}
                    <ArrowRightIcon className="size-4 flex-none text-subtle transition-colors group-hover:text-accent-text" />
                  </span>
                  <span className="text-[15px] leading-[1.55] text-muted">{s.summary}.</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="kontakt-info"
        aria-labelledby="kontakt-info-naslov"
        className={`${sectionClass} pb-[clamp(88px,9.5vw,144px)]`}
      >
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8 rounded-xl border border-line bg-surface p-[clamp(28px,4vw,56px)]">
            <h2
              id="kontakt-info-naslov"
              className="max-w-140 flex-[1_1_420px] text-[clamp(28px,3vw,44px)] leading-[1.1] font-semibold tracking-[-0.035em] text-balance"
            >
              Razgovarajmo o vašem projektu pre nego što bilo šta potpišete.
            </h2>
            <div className="flex flex-[1_1_360px] flex-col gap-6">
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-[15px] leading-[1.5]">
                <dt className={dt}>Grad</dt>
                <dd>{site.address.city} · sastanci uživo ili online</dd>
                {site.hours && (
                  <>
                    <dt className={dt}>Radno vreme</dt>
                    <dd>{site.hours}</dd>
                  </>
                )}
                <dt className={dt}>Kontakt</dt>
                <dd className="-mt-2 flex flex-col">
                  <a href={site.phone.href} className="flex min-h-9 w-fit items-center transition-colors hover:text-accent-text">
                    {site.phone.display}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex min-h-9 w-fit items-center break-all transition-colors hover:text-accent-text"
                  >
                    {site.email}
                  </a>
                </dd>
              </dl>
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href="/kontakt" arrow>
                  Zatraži ponudu
                </ButtonLink>
                <ButtonLink href="/portfolio" variant="secondary">
                  Pogledaj radove
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
