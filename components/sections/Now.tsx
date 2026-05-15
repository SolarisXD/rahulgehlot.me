import { SectionHeader } from "@/components/ui/SectionHeader";
import { now, nowLastUpdated } from "@/content/now";
import { Radio } from "lucide-react";

export default function Now() {
  const formattedDate = new Date(nowLastUpdated + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <SectionHeader
        label="now"
        heading="What I'm doing right now"
        icon={<Radio size={18} />}
      />
      <div className="space-y-3">
        {now.map((item) => (
          <div key={item.label} className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-muted shrink-0">
              ↳ {item.label}
            </span>
            {item.link ? (
              <a
                href={item.link}
                className="text-foreground hover:text-accent transition-colors"
              >
                {item.value}
              </a>
            ) : (
              <span className="text-foreground">{item.value}</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">Last updated: {formattedDate}</p>
    </div>
  );
}
