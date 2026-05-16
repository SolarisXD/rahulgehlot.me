"use client";
import { motion } from "framer-motion";
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {stackDecisions.map((decision) => (
          <motion.div
            key={decision.choice}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-lg border border-slate-200/70 bg-white p-5 dark:border-white/5 dark:bg-[#1F2023]"
          >
            <p className="font-semibold text-base">{decision.choice}</p>
            <p className="text-sm text-muted mb-3">vs {decision.alternative}</p>
            <div className="h-px bg-border mb-3" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              {decision.reasoning}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
