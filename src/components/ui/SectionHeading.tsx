import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  /** Nivo naslova; na stranicama sa h1 sekcije koriste h2 */
  as?: "h2" | "h3";
  children?: ReactNode;
  className?: string;
};

/** Naslov sekcije */
export function SectionHeading({ id, title, as: Tag = "h2", children, className = "" }: Props) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Tag id={id} className="text-section-title">
        {title}
      </Tag>
      {children}
    </div>
  );
}
