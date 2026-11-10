import type { SVGProps } from "react";
import type { ServiceIconName } from "@/content/services";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 14, viewBox = "0 0 14 14", children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
  </Svg>
);

/** Link se otvara u novom prozoru */
export const ExternalIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 3h6v6M11 3L3.5 10.5" />
  </Svg>
);

export const ArrowLeftIcon =(p: IconProps) => (
  <Svg {...p}>
    <path d="M11 7H3M6.5 3.5L3 7l3.5 3.5" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 7.5l3 3 6-7" />
  </Svg>
);

export const PlusIcon = (p: IconProps) => (
  <Svg viewBox="0 0 12 12" size={12} {...p}>
    <path d="M2.5 6h7M6 2.5v7" />
  </Svg>
);

export const MinusIcon = (p: IconProps) => (
  <Svg viewBox="0 0 12 12" size={12} {...p}>
    <path d="M2.5 6h7" />
  </Svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Svg viewBox="0 0 12 12" size={12} strokeWidth={1.5} {...p}>
    <path d="M3 4.5l3 3 3-3" />
  </Svg>
);

export const MenuIcon = (p: IconProps) => (
  <Svg viewBox="0 0 18 18" size={18} strokeLinecap="round" {...p}>
    <path d="M3 6h12M3 12h12" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg viewBox="0 0 18 18" size={18} strokeLinecap="round" {...p}>
    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
  </Svg>
);

export const InstagramIcon = (p: IconProps) => (
  <Svg viewBox="0 0 24 24" size={20} strokeWidth={1.8} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
  </Svg>
);

export const PlayIcon = (p: IconProps) => (
  <Svg fill="currentColor" stroke="none" {...p}>
    <path d="M4 2.5v9l7.5-4.5z" />
  </Svg>
);

export const PauseIcon = (p: IconProps) => (
  <Svg fill="currentColor" stroke="none" {...p}>
    <rect x="3.5" y="2.5" width="2.5" height="9" rx="0.5" />
    <rect x="8" y="2.5" width="2.5" height="9" rx="0.5" />
  </Svg>
);

export const AlertIcon = (p: IconProps) => (
  <Svg strokeWidth={1.5} {...p}>
    <circle cx="7" cy="7" r="5.5" />
    <path d="M7 4.2v3.3M7 9.6v.2" />
  </Svg>
);

const servicePaths: Record<ServiceIconName, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M6.5 6.5h.01M9 6.5h.01" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  webapp: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  drone: (
    <>
      <circle cx="5.5" cy="5.5" r="2.5" />
      <circle cx="18.5" cy="5.5" r="2.5" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
      <path d="M7.3 7.3L10 10M16.7 7.3L14 10M7.3 16.7L10 14M16.7 16.7L14 14" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
    </>
  ),
};

export function ServiceIcon({ name, ...p }: IconProps & { name: ServiceIconName }) {
  return (
    <Svg viewBox="0 0 24 24" size={20} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
      {servicePaths[name]}
    </Svg>
  );
}
