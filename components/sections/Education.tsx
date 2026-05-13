import { SectionHeader } from "@/components/ui/SectionHeader";
import { education, certifications } from "@/content/education";

export default function Education() {
  return (
    <div>
      <SectionHeader label="Education" heading="Where I studied" />

      {education.map((entry, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-card p-5 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
            <div>
              <h3 className="font-semibold">{entry.institution}</h3>
              <p className="text-sm text-muted">
                {entry.degree} in {entry.field}
              </p>
            </div>
            <div className="text-sm text-muted shrink-0">{entry.period}</div>
          </div>

          {entry.grade && (
            <p className="text-sm text-foreground/80 mb-3">{entry.grade}</p>
          )}

          {entry.highlights && entry.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {entry.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center rounded-md bg-card border border-border px-2.5 py-0.5 text-xs font-medium text-foreground/70"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      {certifications.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md border border-border px-2.5 py-1 text-xs"
              >
                {cert.name} &middot; {cert.issuer}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
