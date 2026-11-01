import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "secondary" | "text";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 font-semibold leading-none no-underline transition-colors";

const variants: Record<Variant, string> = {
  primary:
    "rounded-lg bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active focus-visible:outline-fg focus-visible:outline-offset-3 aria-disabled:cursor-not-allowed aria-disabled:bg-pressed aria-disabled:text-subtle",
  secondary:
    "rounded-lg border border-line-strong text-fg hover:border-subtle hover:bg-raised active:bg-pressed focus-visible:outline-offset-3",
  text: "rounded-sm text-accent-text hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[14.5px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-13 px-[22px] text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "lg",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  const sizeClass = variant === "text" ? "min-h-11 text-[15px]" : sizes[size];
  return `${base} ${variants[variant]} ${sizeClass} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
};

export function ButtonLink({ variant, size, arrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow && <ArrowRightIcon size={size === "sm" ? 14 : 16} />}
    </Link>
  );
}
