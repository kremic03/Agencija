import Link from "next/link";
import { getProject, projectHref, projects } from "@/content/portfolio";
import { getService, serviceHref } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ExternalIcon } from "@/components/ui/icons";

export function projectMetadata(id: string) {
  const project = getProject(id);
  return pageMetadata({
    title: project.title,
    description: `${project.image.alt}. Primer našeg rada: ${getService(project.service).name.toLowerCase()}.`,
    path: projectHref(id),
    noindex: !project.story?.length,
  });
}

export function ProjectPage({ id }: { id: string }) {
  const project = getProject(id);
  const service = getService(project.service);
  const related = projects.filter((p) => p.service === project.service && p.id !== id).slice(0, 3);

  return (
    <article aria-labelledby="projekat-naslov" className="pt-[clamp(48px,6vw,96px)] pb-[clamp(88px,9.5vw,144px)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: projectHref(id) },
        ])}
      />
      <div className="container-page flex flex-col gap-10">
        <div className="flex max-w-180 flex-col gap-5">
          <nav aria-label="Putanja">
            <ol className="flex items-center gap-2 text-[13.5px] leading-none font-medium text-subtle">
              <li>
                <Link href="/portfolio" className="text-muted hover:text-fg">
                  Portfolio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span aria-current="page" className="text-fg">
                  {project.title}
                </span>
              </li>
            </ol>
          </nav>
          <h1 id="projekat-naslov" className="text-page-title">
            {project.title}
          </h1>
          {project.description && <p className="text-lead">{project.description}</p>}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center gap-2.5 self-start rounded-lg bg-accent px-5 text-[15px] leading-none font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-active focus-visible:outline-fg focus-visible:outline-offset-3"
            >
              Pogledajte sajt uživo
              <ExternalIcon size={15} />
              <span className="sr-only"> (otvara se u novom prozoru)</span>
            </a>
          )}
        </div>

        <figure className="flex flex-col gap-3">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-surface">
            <ProjectMedia project={project} highPriority sizes="(min-width: 1280px) 1200px, 100vw" />
          </div>
          <figcaption className="text-sm leading-normal text-subtle">{project.image.alt}</figcaption>
        </figure>

        {project.story?.length ? (
          <div className="flex max-w-180 flex-col gap-4 text-base leading-[1.7] text-muted">
            {project.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line pt-8">
          <p className="max-w-140 text-[clamp(20px,1.8vw,24px)] leading-[1.35] font-medium tracking-[-0.015em]">
            Treba vam nešto slično?{" "}
            <Link href={serviceHref(service.slug)} className="text-muted underline underline-offset-4 hover:text-fg">
              Pogledajte uslugu: {service.name.toLowerCase()}
            </Link>
            .
          </p>
          <ButtonLink href="/kontakt" arrow>
            Zatraži ponudu
          </ButtonLink>
        </div>

        {related.length > 0 && (
          <nav aria-labelledby="slicni-projekti" className="flex flex-col gap-4">
            <h2 id="slicni-projekti" className="text-card-title">
              Slični projekti
            </h2>
            <ul className="flex flex-col border-t border-line">
              {related.map((p) => (
                <li key={p.id} className="border-b border-line">
                  <Link href={projectHref(p.id)} className="flex min-h-14 items-center justify-between gap-4 py-3 font-medium hover:text-accent-text">
                    {p.title}
                    <span className="flex-none text-sm font-normal text-muted">{p.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
