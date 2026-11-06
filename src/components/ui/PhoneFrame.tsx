import type { ReactNode } from "react";

/** Okvir telefona, centriran u roditelju (roditelj mora imati position: relative) */
export function PhoneFrame({ children, screenClassName = "" }: { children: ReactNode; screenClassName?: string }) {
  return (
    <div className="absolute top-7 bottom-0 left-1/2 aspect-9/17 -translate-x-1/2 rounded-t-[30px] border border-b-0 border-line-strong bg-bg p-[7px] pb-0">
      <div className={`h-full overflow-hidden rounded-t-[23px] ${screenClassName}`}>{children}</div>
    </div>
  );
}
