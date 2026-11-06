import Link from "next/link";
import { cacheLife } from "next/cache";
import { mainNav, site } from "@/content/site";
import { serviceHref, services } from "@/content/services";
import { Logo } from "./Logo";

const linkClass = "flex min-h-9 items-center text-[15px] leading-[1.3] text-muted hover:text-fg";
const columnTitle = "pb-3 font-mono text-[11.5px] leading-none tracking-[0.06em] text-subtle uppercase";
// Prazna polja (adresa, radno vreme) se ne prikazuju
const officeLines = [site.address.street, site.address.city, site.hours].filter(Boolean);

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-page flex flex-col gap-14 pt-18 pb-8">
        <div className="flex flex-wrap gap-x-8 gap-y-12">
          <div className="flex max-w-95 flex-[2_1_300px] flex-col gap-5">
            <Logo />
            <p className="text-[15px] leading-[1.6] text-pretty text-muted">{site.tagline}</p>
            <div className="flex flex-col gap-1">
              <a href={`mailto:${site.email}`} className="flex min-h-9 items-center text-[15px] font-medium hover:text-accent-text">
                {site.email}
              </a>
              <a href={site.phone.href} className="flex min-h-9 items-center text-[15px] font-medium hover:text-accent-text">
                {site.phone.display}
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-usluge" className="flex flex-[1_1_160px] flex-col gap-1">
            <p id="footer-usluge" className={columnTitle}>
              <Link href="/usluge" className="hover:text-fg">
                Usluge
              </Link>
            </p>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)} className={linkClass}>
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-agencija" className="flex flex-[1_1_160px] flex-col gap-1">
            <p id="footer-agencija" className={columnTitle}>
              Agencija
            </p>
            <ul>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {officeLines.length > 0 && (
            <div className="flex flex-[1_1_200px] flex-col gap-1">
              <p className={columnTitle}>Lokacija</p>
              <address className="flex flex-col text-[15px] leading-[1.6] text-muted not-italic">
                {officeLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-line pt-6 text-[13.5px] leading-normal text-subtle">
          <p>
            © <CopyrightYear /> {site.legalName || site.name}
            {site.taxId && ` · PIB ${site.taxId}`}
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/politika-privatnosti" className="hover:text-fg">
                Politika privatnosti
              </Link>
            </li>
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="hover:text-fg" rel="noopener noreferrer" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
