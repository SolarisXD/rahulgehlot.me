import { education, certifications } from "@/content/education";
import { GraduationCap, ExternalLink } from "lucide-react";

export default function Education() {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 flex items-center justify-center">
          <GraduationCap size={18} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
            Education
          </h2>
          <p className="text-sm text-slate-500 dark:text-foreground/50">
            Academic background and specialized certifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em]">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/70 bg-white p-6 transition-all hover:border-slate-300 dark:border-white/5 dark:bg-[#1F2023]"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-foreground/40">
                  <span className="font-mono text-amber-600 dark:text-amber-300">
                    {edu.period}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-foreground/20" />
                  <span className="font-semibold text-slate-600 dark:text-foreground/60">
                    {edu.institution}
                  </span>
                </div>
                <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {edu.degree}
                </h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-foreground/60">
                  {edu.summary ?? edu.field}
                </p>
                {edu.grade && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-400/10 dark:border-cyan-400/20">
                      {edu.grade}
                    </span>
                  </div>
                )}

                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {edu.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                      >
                        <span>{highlight}</span>
                      </span>
                    ))}
                  </div>
                )}
                {edu.linkLabel && edu.linkUrl && (
                  <a
                    href={edu.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                  >
                    {edu.linkLabel}
                    <ExternalLink size={12} />
                  </a>
                )}
                {edu.quote && (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm italic text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-foreground/60">
                    “{edu.quote}”
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em]">
            Certifications
          </h3>
          <div className="space-y-1">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-white/5 dark:bg-[#1F2023]"
              >
                <div className="w-12 text-xs font-mono text-violet-600 dark:text-violet-300">
                  {cert.year}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-foreground/50">
                    {cert.issuer}
                  </p>
                </div>
                {cert.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 border border-slate-200 rounded-md px-2 py-1 dark:text-foreground/60 dark:border-white/10">
                    {cert.badge}
                  </span>
                )}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all dark:bg-white/5 dark:text-foreground/30 dark:hover:text-white dark:hover:bg-white/10"
                    aria-label="Verify Certificate"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
