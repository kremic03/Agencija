import { servicesByGroup } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { QuoteForm } from "@/components/contact/QuoteForm";

export const metadata = pageMetadata({
  title: "Zatraži ponudu",
  description:
    "Opišite šta vam treba u četiri kratka koraka — sajt, aplikacija ili snimanje dronom. Pisanu ponudu sa fiksnom cenom šaljemo brzo i bez obaveze.",
  path: "/kontakt",
});

// Formi se šalju samo polja koja prikazuje, ne ceo sadržaj stranica usluga
const serviceOptions = servicesByGroup().map(({ group, label, items }) => ({
  group,
  label,
  items: items.map(({ slug, name, shortName, summary }) => ({ slug, name, shortName, summary })),
}));

const nextSteps = [
  "Pregledamo upit i javljamo se u roku od 24 sata.",
  "Kratak poziv da razjasnimo detalje — besplatno.",
  "Dobijate pisanu ponudu sa fiksnom cenom i rokom.",
];

function DirectContact({ className = "" }: { className?: string }) {
  const address = [site.address.street, site.address.city].filter(Boolean).join(", ");
  const details = [site.hours, address].filter(Boolean).join(" · ");
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <h2 className="eyebrow pb-2.5">Radije biste razgovarali?</h2>
      <a href={site.phone.href} className="flex min-h-11 items-center text-lg font-semibold hover:text-accent-text">
        {site.phone.display}
      </a>
      <a href={`mailto:${site.email}`} className="flex min-h-11 items-center text-lg font-semibold hover:text-accent-text">
        {site.email}
      </a>
      {details && <p className="pt-1.5 text-sm leading-normal text-subtle">{details}</p>}
    </div>
  );
}

export default function ContactPage() {
  return (
    <section aria-labelledby="kontakt-naslov" className="pt-clamp(40px,6vw,96px) pb-clamp(88px,9.5vw,144px)">
      <div className="container-page flex flex-wrap items-start gap-x-18 gap-y-10">
        <div className="flex max-w-100 flex-1_1_300px flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 id="kontakt-naslov" className="text-clamp(36px,4vw,56px) leading-1.05 font-semibold tracking--0.035em">
              Zatraži ponudu
            </h1>
            <p className="text-clamp(16px,1.3vw,17px) leading-1.6 text-pretty text-muted">
              Četiri kratka koraka, oko 3 minuta. Ne morate znati tehničke detalje — opišite šta želite svojim rečima.
            </p>
          </div>
          <div className="hidden flex-col gap-8 min-700px:flex">
            <ol className="flex flex-col gap-4 border-t border-line pt-6">
              {nextSteps.map((text, i) => (
                <li key={text} className="flex gap-3.5 text-15px leading-normal text-muted">
                  <span className="font-mono text-13px leading-1.6 font-medium text-accent-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {text}
                </li>
              ))}
            </ol>
            <DirectContact className="border-t border-line pt-6" />
          </div>
        </div>

        <QuoteForm serviceOptions={serviceOptions} />

        <DirectContact className="w-full min-700px:hidden" />
      </div>
    </section>
  );
}
