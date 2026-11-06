import { hero } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { belgradeVideo } from "@/content/media";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";

export function Hero() {
  return (
    // Negativna margina podvlači uvod ispod providnog headera (64/72 px + border)
    <section
      aria-labelledby="hero-naslov"
      className="relative -mt-[65px] flex min-h-[clamp(700px,58vw,820px)] flex-col justify-end nav:-mt-[73px]"
    >
      <div className="absolute inset-0">
        <AutoplayVideo
          sources={belgradeVideo.sources}
          poster={belgradeVideo.poster}
          alt={belgradeVideo.poster.alt}
          sizes="100vw"
          highPriority
          deferUntilLoad
          controlsClassName="right-[clamp(20px,4vw,40px)] bottom-[clamp(20px,3vw,40px)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_82%,transparent)_38%,color-mix(in_srgb,var(--color-bg)_20%,transparent)_75%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,var(--color-bg)_0%,transparent_35%,transparent_80%,color-mix(in_srgb,var(--color-bg)_70%,transparent)_100%)]"
      />

      <div className="container-page relative flex flex-col gap-7 pt-40 pb-[clamp(56px,6vw,96px)]">
        <p className="flex h-8 items-center gap-2.5 self-start rounded-full border border-line-strong bg-surface/70 px-3 text-[13px] leading-none font-medium text-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {hero.badge}
        </p>
        <h1 id="hero-naslov" className="text-display max-w-225">
          {hero.title}
        </h1>
        <p className="text-lead max-w-140">{hero.text}</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/kontakt" arrow>
            Zatraži ponudu
          </ButtonLink>
          <ButtonLink href="/portfolio" variant="secondary" className="bg-surface/75 backdrop-blur-sm">
            Pogledaj radove
          </ButtonLink>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[13.5px] leading-[1.4] font-medium text-muted">
          {hero.checks.map((check) => (
            <li key={check} className="flex items-center gap-2">
              <CheckIcon className="text-accent-text" />
              {check}
            </li>
          ))}
        </ul>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-26 right-[clamp(20px,4vw,40px)] flex items-center gap-2 font-mono text-[11.5px] leading-none tracking-[0.06em] text-muted"
      >
        <span className="size-[7px] rounded-full bg-rec" />
        {hero.overlay}
      </p>
    </section>
  );
}
