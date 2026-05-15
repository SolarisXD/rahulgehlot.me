import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeader({
  label,
  heading,
  subheading,
  accent,
  icon,
  rightContent,
}: {
  label: string;
  heading: string;
  subheading?: string;
  accent?: boolean;
  icon?: ReactNode;
  rightContent?: ReactNode;
}) {
  return (
    <div className="mb-12">
      {icon ? (
        <div className="flex items-center gap-4 mb-4">
          <div className="h-11 w-11 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground capitalize">
              {label}
            </h2>
            <p className="text-sm text-slate-500 dark:text-foreground/50">
              {heading}
            </p>
          </div>
          {rightContent && <div className="flex items-center ml-auto shrink-0">{rightContent}</div>}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            {rightContent && <div className="flex items-center">{rightContent}</div>}
          </div>
          <h2
            className={cn(
              "text-2xl md:text-3xl font-semibold tracking-tight capitalize",
              accent ? "text-amber-500" : "text-foreground"
            )}
          >
            {label}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-foreground/50 max-w-xl">{heading}</p>
          {subheading && (
            <p className="mt-2 text-sm text-slate-500 dark:text-foreground/50 max-w-xl">{subheading}</p>
          )}
        </>
      )}
    </div>
  );
}
