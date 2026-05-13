import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/content/projects";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const standard = projects.filter((p) => !p.featured);

  return (
    <div>
      <SectionHeader label="Projects" heading="What I've built" />

      <div className="space-y-4 mb-6">
        {featured.map((project) => (
          <CaseStudyCard key={project.id} project={project} />
        ))}
      </div>

      {standard.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {standard.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
