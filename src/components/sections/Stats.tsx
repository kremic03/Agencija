import { stats } from "@/content/home";

export function Stats() {
  return (
    <section aria-labelledby="rezultati-naslov" className="section-y">
      <div className="container-page">
        <h2 id="rezultati-naslov" className="sr-only">
          Rezultati u brojkama
        </h2>
        <dl className="flex flex-wrap border-y border-line">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="-mb-px mr-6 flex flex-[1_1_220px] flex-col-reverse justify-end gap-3 border-b border-line py-10 pr-6"
            >
              <dt className="max-w-55 text-[15px] leading-[1.45] text-muted">{stat.label}</dt>
              <dd className="text-[clamp(44px,4vw,56px)] leading-none font-semibold tracking-[-0.04em]">
                {stat.value}
                <span className="text-accent-text">{stat.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
