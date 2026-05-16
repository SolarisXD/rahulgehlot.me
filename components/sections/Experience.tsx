"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechBadge } from "@/components/ui/TechBadge";
import { experience } from "@/content/experience";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

const typeColors: Record<string, string> = {
  freelance: "text-emerald-500 border-emerald-500/30",
  contract: "text-blue-500 border-blue-500/30",
  internship: "text-violet-500 border-violet-500/30",
};

export default function Experience() {
  return (
    <div>
      <SectionHeader label="Work" heading="Where I've worked" accent icon={<Briefcase size={18} />} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="relative pl-6 border-l-2 border-accent/30"
      >
        {experience.map((entry, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative pb-10 last:pb-0"
          >
            {/* Dot on the timeline */}
            <div className="absolute left-[-1.5rem] top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-accent motion-safe:animate-pulse" />

            <div className="rounded-lg border border-border/80 border-b-[rgba(246,186,4,0.3)] bg-[linear-gradient(to_right_bottom_in_oklab,_rgba(246,186,4,0.12)_0%,_rgba(0,0,0,0)_100%)] p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-semibold">{entry.role}</h3>
                  <p className="text-sm text-muted">
                    {entry.org} &middot; {entry.location}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      "text-xs font-medium border rounded-full px-2.5 py-0.5",
                      typeColors[entry.type] || "text-muted border-border"
                    )}
                  >
                    {entry.type}
                  </span>
                  <span className="text-xs text-muted">{entry.period}</span>
                </div>
              </div>

              <ul className="space-y-1.5 mb-3">
                {entry.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-sm text-foreground/80 pl-4 relative leading-relaxed"
                  >
                    <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-full bg-muted" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {entry.stack.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
