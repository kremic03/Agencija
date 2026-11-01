import { site } from "@/content/site";

/** Znak + tekstualni logo. Zameniti SVG logom kada bude spreman. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="relative size-[22px] rounded-sm border-[1.5px] border-fg">
        <span className="absolute right-[3px] bottom-[5px] left-[3px] h-[1.5px] bg-fg" />
        <span className="absolute top-[3px] right-[3px] size-[5px] rounded-full bg-accent" />
      </span>
      <span className="text-lg leading-none font-semibold tracking-[-0.02em]">{site.logoText}</span>
    </span>
  );
}
