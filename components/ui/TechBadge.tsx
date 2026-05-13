export function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-card border border-border px-2.5 py-0.5 text-xs font-medium text-foreground/70">
      {label}
    </span>
  );
}
