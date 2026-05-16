"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { microOpinions } from "@/content/micro-opinions";
import { TextQuote } from "lucide-react";

export default function MicroOpinions() {
  return (
    <div>
      <SectionHeader label="Thinking" heading="Takes" icon={<TextQuote size={18} />} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="flex flex-wrap gap-3"
      >
        {microOpinions.map((opinion, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-lg border border-slate-200/70 bg-white p-4 border-l-accent border-l-2 max-w-sm dark:border-white/5 dark:bg-[#1F2023]"
          >
            <p className="text-sm text-foreground/80 leading-relaxed">
              &ldquo;{opinion}&rdquo;
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
