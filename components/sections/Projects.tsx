"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/content/projects";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const standard = projects.filter((p) => !p.featured);

  return (
    <div>
      <SectionHeader
        label="Projects"
        heading="What I've built"
        accent
        icon={<FolderGit2 size={18} />}
        rightContent={
          <a
            href="https://github.com/SolarisXD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            SolarisXD
          </a>
        }
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="space-y-4 mb-6"
      >
        {featured.map((project) => (
          <motion.div
            key={project.id}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <CaseStudyCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      {standard.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-4 sm:grid-cols-2 items-stretch"
        >
          {standard.map((project) => (
            <motion.div
              key={project.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
