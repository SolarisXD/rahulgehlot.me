import { cn } from "@/lib/utils";

export function SectionHeader({
  label,
  heading,
  subheading,
  accent,
  rightContent,
}: {
  label: string;
  heading: string;
  subheading?: string;
  accent?: boolean;
  rightContent?: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-2">
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-widest m-0",
            accent ? "text-amber-500" : "text-muted-foreground"
          )}
        >
          {label}
        </p>
        {rightContent && <div className="flex items-center">{rightContent}</div>}
      </div>
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight pb-3",
          accent && "border-b border-b-[rgba(246,186,4,0.3)]"
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p className="mt-2 text-muted max-w-xl">{subheading}</p>
      )}
    </div>
  );
}
