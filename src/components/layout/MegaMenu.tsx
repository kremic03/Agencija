import Image from "next/image";
import Link from "next/link";
import { media } from "@/content/media";
import { serviceGroups, serviceHref, services, type ServiceGroup } from "@/content/services";
import { ArrowRightIcon, ServiceIcon } from "@/components/ui/icons";

type Props = { id: string; onNavigate: () => void };

export function MegaMenu({ id, onNavigate }: Props) {
  const groups = Object.keys(serviceGroups) as ServiceGroup[];

  return (
    <div id={id} className="absolute inset-x-0 top-[68px]">
      <div className="container-page">
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_48px_-16px_rgb(0_0_0/0.5)]">
          <div className="grid grid-cols-[1fr_1fr_296px] gap-2 p-5">
            {groups.map((group, gi) => (
              <div key={group} className={`flex flex-col gap-0.5 ${gi > 0 ? "border-l border-line pl-2" : ""}`}>
                <p className="px-3 pt-2 pb-3 font-mono text-[11.5px] leading-none tracking-[0.06em] text-subtle uppercase">
                  {serviceGroups[group]}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {services
                    .filter((s) => s.group === group)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={serviceHref(s.slug)}
                          onClick={onNavigate}
                          className="grid grid-cols-[40px_1fr] items-center gap-3.5 rounded-lg p-3 hover:bg-raised focus-visible:-outline-offset-2"
                        >
                          <span className="grid size-10 place-items-center rounded-[9px] border border-line-strong bg-raised">
                            <ServiceIcon name={s.icon} />
                          </span>
                          <span className="flex min-w-0 flex-col gap-1">
                            <span className="text-[15px] leading-[1.2] font-semibold">{s.name}</span>
                            <span className="text-[13.5px] leading-[1.35] text-muted">{s.summary}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <Link
              href="/portfolio"
              onClick={onNavigate}
              className="flex flex-col gap-3 rounded-lg p-2 hover:bg-raised focus-visible:-outline-offset-2"
            >
              <div className="relative h-38 overflow-hidden rounded-md border border-line">
                <Image src={media.droneAbove.src} alt="" fill sizes="280px" placeholder="blur" className="object-cover" />
              </div>
              <span className="flex flex-col gap-1 px-1 pb-1">
                <span className="font-mono text-[11.5px] leading-none tracking-[0.06em] text-accent-text uppercase">
                  Novo u portfoliju
                </span>
                {/* PRIVREMENO: najnoviji projekat */}
                <span className="text-[14.5px] leading-[1.35] font-semibold">[Naziv projekta — kratak rezultat]</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-line bg-raised px-8 py-4">
            <p className="text-[14.5px] leading-[1.4] text-muted">
              <span className="font-medium text-fg">Niste sigurni šta vam treba?</span> Razgovor od [30] minuta, bez
              obaveze.
            </p>
            <Link
              href="/kontakt"
              onClick={onNavigate}
              className="flex min-h-11 items-center gap-2 rounded-sm px-1 text-[14.5px] font-semibold text-accent-text hover:text-fg"
            >
              Zakažite besplatne konsultacije
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
