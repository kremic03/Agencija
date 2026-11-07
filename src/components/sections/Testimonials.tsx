import { testimonials } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

const box = "m-0 flex flex-col justify-between rounded-xl border border-line bg-surface";

export function Testimonials() {
  const [main, ...rest] = testimonials;
  if (!main) return null;

  return (
    <section aria-labelledby="utisci-naslov" className="section-y">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading id="utisci-naslov" title="Šta kažu ljudi s kojima radimo." />

        <div className="flex flex-wrap gap-4">
          <figure className={`${box} min-w-0 flex-[7_1_460px] gap-10 p-[clamp(28px,3.4vw,48px)]`}>
            <blockquote className="text-[clamp(21px,2vw,28px)] leading-[1.4] font-medium tracking-[-0.02em] text-pretty">
              „{main.quote}“
            </blockquote>
            <figcaption className="text-base leading-[1.2] font-semibold">{main.name}</figcaption>
          </figure>

          <div className="flex min-w-0 flex-[5_1_320px] flex-col gap-4">
            {rest.map((t, i) => (
              <figure key={i} className={`${box} flex-1 gap-6 p-7`}>
                <blockquote className="text-[17px] leading-[1.55] text-pretty">„{t.quote}“</blockquote>
                <figcaption className="text-[15px] leading-[1.2] font-semibold">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
