import { SectionHeader } from "@/components/ui/SectionHeader";
import { microOpinions } from "@/content/micro-opinions";
import { TextQuote } from "lucide-react";

export default function MicroOpinions() {
  return (
    <div>
      <SectionHeader label="Thinking" heading="Takes" icon={<TextQuote size={18} />} />
      <div className="flex flex-wrap gap-3">
        {microOpinions.map((opinion, i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-200/70 bg-white p-4 border-l-accent border-l-2 max-w-sm dark:border-white/5 dark:bg-[#1F2023]"
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
