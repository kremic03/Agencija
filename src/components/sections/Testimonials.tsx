import { testimonials } from "@/content/home";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";

const box = "m-0 flex flex-col justify-between rounded-xl border border-line bg-surface";

export function Testimonials() {
  const [main, ...rest] = testimonials;

  return (
    <section aria-labelledby="utisci-naslov" className="section-y">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading id="utisci-naslov" eyebrow="(03) Utisci klijenata" title="Šta kažu ljudi s kojima radimo." />

        <div className="flex flex-wrap gap-4">
          <figure className={`${box} min-w-0 flex-[7_1_460px] gap-10 p-[clamp(28px,3.4vw,48px)]`}>
            <blockquote className="text-[clamp(21px,2vw,28px)] leading-[1.4] font-medium tracking-[-0.02em] text-pretty">
              „{main.quote}“
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <div className="size-12 flex-none overflow-hidden rounded-full">
                <ImagePlaceholder label="" />
              </div>
              <span className="flex flex-col gap-1">
                <span className="text-base leading-[1.2] font-semibold">{main.name}</span>
                <span className="text-sm leading-[1.3] text-muted">{main.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="flex min-w-0 flex-[5_1_320px] flex-col gap-4">
            {rest.map((t, i) => (
              <figure key={i} className={`${box} flex-1 gap-6 p-7`}>
                <blockquote className="text-[17px] leading-[1.55] text-pretty">„{t.quote}“</blockquote>
                <figcaption className="flex flex-col gap-1">
                  <span className="text-[15px] leading-[1.2] font-semibold">{t.name}</span>
                  <span className="text-sm leading-[1.3] text-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
