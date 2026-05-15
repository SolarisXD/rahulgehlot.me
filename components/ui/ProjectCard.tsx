import { cn } from "@/lib/utils";
import { TechBadge } from "@/components/ui/TechBadge";
import type { Project } from "@/content/projects";
import { ExternalLink } from "lucide-react";

const statusGradients: Record<string, string> = {
  live:
    "transparent padding-box, linear-gradient(to right, #4ade80, #059669) border-box",
  "in-development":
    "transparent padding-box, linear-gradient(to right, #fbbf24, #ea580c) border-box",
  archived:
    "transparent padding-box, linear-gradient(to right, #a3a3a3, #525252) border-box",
};

const statusText: Record<string, string> = {
  live: "text-green-400",
  "in-development": "text-amber-400",
  archived: "text-neutral-400",
};

const statusBorder: Record<string, string> = {
  live: "#4ade80",
  "in-development": "#fbbf24",
  archived: "#a3a3a3",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={cn(
      "rounded-lg border border-slate-200/70 p-5 transition-colors hover:border-accent/50 dark:border-white/5",
      project.status === 'archived' ? 'bg-transparent' : 'bg-white dark:bg-[#1F2023]'
    )}>
      <div className="flex items-start justify-between gap-4 mb-1">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0",
            "border border-transparent",
            statusText[project.status]
          )}
          style={{ background: statusGradients[project.status], borderColor: statusBorder[project.status] }}
        >
          ● {project.status}
        </span>
      </div>
      {project.period && (
        <p className="text-xs font-mono text-amber-600 dark:text-amber-300 mb-3">{project.period}</p>
      )}
      <p className="text-sm text-muted mb-4">{project.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
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
