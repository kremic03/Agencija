/**
 * Privremeno mesto za fotografiju ili video iz dizajna.
 * Kada stignu pravi materijali, zameniti sa next/image (uz alt tekst)
 * ili video elementom sa poster slikom.
 */
export function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-full w-full items-center justify-center bg-raised bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgb(255_255_255/0.025)_14px_15px)] p-4 ${className}`}
    >
      <span className="max-w-[28ch] text-center font-mono text-[11.5px] leading-snug tracking-wide text-subtle">
        {label}
      </span>
    </div>
  );
}
