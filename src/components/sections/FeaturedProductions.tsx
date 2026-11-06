import { productions } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Izdvojene produkcije; kada stignu kadrovi iz njih, dodati ih i u portfolio */
export function FeaturedProductions({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="produkcije-naslov" className={`flex flex-col gap-10 ${className}`}>
      <SectionHeading id="produkcije-naslov" eyebrow="Izdvojeni radovi" title="Više od 15 godina snimanja dronom, i za domaće produkcije." />
      <ul className="grid gap-4 md:grid-cols-2">
        {productions.map((p) => (
          <li key={p.name} className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-7">
            <p className="font-mono text-xs leading-none tracking-[0.06em] text-subtle uppercase">{p.kind}</p>
            <h3 className="text-card-title">{p.name}</h3>
            <p className="text-base leading-[1.55] text-muted">{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
