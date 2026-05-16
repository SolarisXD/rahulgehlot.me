"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { copy } from "@/content/copy";
import { GitBranch } from "lucide-react";

export default function Process() {
  return (
    <div>
      <SectionHeader label="Process" heading="How I work" icon={<GitBranch size={18} />} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid gap-4 sm:grid-cols-4"
      >
        {copy.process.map((step) => (
          <motion.div
            key={step.number}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-lg border border-slate-200/70 bg-white p-5 dark:border-white/5 dark:bg-[#1F2023]"
          >
            <p className="text-3xl font-bold text-muted/30 mb-2">
              {step.number}
            </p>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {step.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
