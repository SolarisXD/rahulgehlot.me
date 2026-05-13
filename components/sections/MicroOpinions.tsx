import { SectionHeader } from "@/components/ui/SectionHeader";
import { microOpinions } from "@/content/micro-opinions";

export default function MicroOpinions() {
  return (
    <div>
      <SectionHeader label="Thinking" heading="Takes" />
      <div className="flex flex-wrap gap-3">
        {microOpinions.map((opinion, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-4 border-l-accent border-l-2 max-w-sm"
          >
            <p className="text-sm text-foreground/80 leading-relaxed">
              &ldquo;{opinion}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
