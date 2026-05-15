import { SectionHeader } from "@/components/ui/SectionHeader";
import { stackDecisions } from "@/content/stack-decisions";
import { Scale } from "lucide-react";

export default function StackDecisions() {
  return (
    <div>
      <SectionHeader
        label="Decisions"
        heading="Why I chose what I chose"
        icon={<Scale size={18} />}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {stackDecisions.map((decision) => (
          <div
            key={decision.choice}
            className="rounded-lg border border-slate-200/70 bg-white p-5 dark:border-white/5 dark:bg-[#1F2023]"
          >
            <p className="font-semibold text-base">{decision.choice}</p>
            <p className="text-sm text-muted mb-3">vs {decision.alternative}</p>
            <div className="h-px bg-border mb-3" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              {decision.reasoning}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
