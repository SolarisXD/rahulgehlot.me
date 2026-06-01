import { TechBadge } from "@/components/ui/TechBadge";
import type { Project } from "@/content/projects";
import { ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const statusGradients: Record<string, string> = {
  live:
    "transparent padding-box, linear-gradient(to right, #4ade80, #059669) border-box",
  "in-development":
    "transparent padding-box, linear-gradient(to right, #fbbf24, #ea580c) border-box",
  halt:
    "transparent padding-box, linear-gradient(to right, #94a3b8, #64748b) border-box",
  archived:
    "transparent padding-box, linear-gradient(to right, #a3a3a3, #525252) border-box",
};

const statusText: Record<string, string> = {
  live: "text-green-400",
  "in-development": "text-amber-400",
  halt: "text-slate-400",
  archived: "text-neutral-400",
};

const statusBorder: Record<string, string> = {
  live: "#4ade80",
  "in-development": "#fbbf24",
  halt: "#94a3b8",
  archived: "#a3a3a3",
};

export function SemiFeaturedCard({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 transition-colors hover:border-sky-400/50",
        "border-border/0 border-b-[rgba(56,189,248,0.3)]",
        "bg-[linear-gradient(to_right_bottom_in_oklab,_rgba(56,189,248,0.12)_0%,_rgba(0,0,0,0)_100%)]"
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            "border border-transparent shrink-0",
            statusText[project.status]
          )}
          style={{ background: statusGradients[project.status], borderColor: statusBorder[project.status] }}
        >
          ● {project.status}
        </span>
      </div>
      {project.period && (
        <p className="text-xs font-mono text-sky-600 dark:text-sky-300 mb-3">{project.period}</p>
      )}

      <p className="text-sm text-foreground/80 leading-relaxed mb-4">
        {project.description}
      </p>

      {project.showCaseStudy && project.caseStudy ? (
        <div className="space-y-4 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-500 mb-1">
              Why it exists
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {project.caseStudy.why}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-500 mb-1">
              The key decision
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {project.caseStudy.decision}
            </p>
          </div>
          {project.caseStudy.outcome && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-500 mb-1">
                Outcome
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {project.caseStudy.outcome}
              </p>
            </div>
          )}
        </div>
      ) : project.caseStudy?.decision && (
        <div className="flex gap-3 px-3 py-2.5 rounded-md bg-sky-500/5 border border-sky-500/10 mb-4">
          <Sparkles size={14} className="mt-0.5 shrink-0 text-sky-500" />
          <p className="text-xs leading-relaxed text-foreground/70">
            <span className="font-semibold text-sky-600 dark:text-sky-400">Key call: </span>
            {project.caseStudy.decision}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label={`${project.title} GitHub`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label={`${project.title} demo`}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
