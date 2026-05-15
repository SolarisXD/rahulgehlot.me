import { SectionHeader } from "@/components/ui/SectionHeader";
import { education, certifications } from "@/content/education";
import { GraduationCap, ExternalLink, Calendar } from "lucide-react";

export default function Education() {
  return (
    <div className="space-y-12">
      <SectionHeader
        icon={GraduationCap}
        heading="Education"
        subheading="Academic background and specialized certifications."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Academic Column */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-foreground/30 uppercase tracking-widest flex items-center gap-2">
            Academic
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-all hover:bg-white/[0.04]"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-foreground/60 font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-xs text-foreground/30 font-mono flex items-center gap-1.5 whitespace-nowrap">
                    <Calendar size={12} />
                    {edu.period}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-400/10">
                    CGPA {edu.cgpa}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-foreground/30 uppercase tracking-widest flex items-center gap-2">
            Certifications
          </h3>
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="group p-5 rounded-2xl border border-white/5 bg-white/[0.02] transition-all hover:bg-white/[0.04]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-foreground/50">{cert.issuer}</p>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-foreground/30 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="Verify Certificate"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
