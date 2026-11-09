import type { ReactNode } from "react";

/** Okvir browser prozora za screenshotove sajtova i aplikacija */
export function BrowserFrame({ url, children, className = "" }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-t-md border border-b-0 border-line-strong bg-surface ${className}`}>
      <div aria-hidden="true" className="flex h-7.5 flex-none items-center gap-1.5 border-b border-line px-3">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        {url && (
          <span className="ml-3 truncate font-mono text-[11.5px] leading-none text-subtle">
            {url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
