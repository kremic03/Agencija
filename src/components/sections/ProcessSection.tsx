import type { Step } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  id?: string;
  title: string;
  text?: string;
  steps: Step[];
  /** "home": broj + linija; "service": linija iznad, pa broj */
  variant?: "home" | "service";
};

const num = (i: number) => String(i + 1).padStart(2, "0");

export function ProcessSection({ id, title, text, steps, variant = "home" }: Props) {
  const headingId = `${id ?? "proces"}-naslov`;

  return (
    <section id={id} aria-labelledby={headingId} className="section-y">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading id={headingId} title={title} className="max-w-160">
          {text && <p className="text-[17px] leading-[1.6] text-muted">{text}</p>}
        </SectionHeading>

        <ol className="flex flex-wrap gap-x-6 gap-y-10">
          {steps.map((step, i) =>
            variant === "home" ? (
              <li key={step.title} className="flex flex-[1_1_240px] flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] leading-none font-medium text-accent-text">{num(i)}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
                </div>
                <h3 className="mt-2 text-xl leading-[1.3] font-semibold tracking-[-0.015em]">{step.title}</h3>
                <p className="text-base leading-[1.55] text-pretty text-muted">{step.description}</p>
              </li>
            ) : (
              <li key={step.title} className="flex flex-[1_1_220px] flex-col gap-3 border-t border-line-strong pt-5">
                <p className="font-mono text-[13px] leading-none font-medium text-accent-text">{num(i)}</p>
                <h3 className="mt-1 text-xl leading-[1.3] font-semibold tracking-[-0.015em]">{step.title}</h3>
                <p className="text-[15.5px] leading-[1.55] text-muted">{step.description}</p>
              </li>
            ),
          )}
        </ol>
      </div>
    </section>
  );
}
