import { SectionHeader } from "@/components/ui/SectionHeader";
import { copy } from "@/content/copy";

export default function Process() {
  return (
    <div>
      <SectionHeader label="Process" heading="How I work" />
      <div className="grid gap-4 sm:grid-cols-4">
        {copy.process.map((step) => (
          <div
            key={step.number}
            className="rounded-lg border border-border bg-card p-5"
          >
            <p className="text-3xl font-bold text-muted/30 mb-2">
              {step.number}
            </p>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
