import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechBadge } from "@/components/ui/TechBadge";
import { skills } from "@/content/skills";

export default function Skills() {
  return (
    <div>
      <SectionHeader label="Skills" heading="What I work with" />
      <div className="space-y-6">
        {skills.map((group) => (
          <div key={group.domain}>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-sm font-semibold">{group.domain}</h3>
              {group.note && (
                <span className="text-xs text-muted italic">{group.note}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <TechBadge key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

