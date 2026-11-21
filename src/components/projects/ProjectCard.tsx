import type { CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/types/project";
import { BrowserFrame } from "./BrowserFrame";
import { ProjectFacts } from "./ProjectFacts";
import { TechChips } from "./TechChips";

export function ProjectCard({ project, active, onOpen }: { project: Project; active: boolean; onOpen: (project: Project, button: HTMLButtonElement) => void }) {
  const style = project.accentColor ? { "--project-accent": project.accentColor } as CSSProperties : undefined;
  return (
    <article data-project-card className="project-card" aria-labelledby={`project-title-${project._id}`} style={style}>
      <div className="project-preview-stage"><BrowserFrame key={`${project._id}-${active}`} project={project} active={active} /></div>
      <div className="project-card-copy">
        <h3 id={`project-title-${project._id}`} dir="auto">{project.title}</h3>
        <ProjectFacts project={project} />
        {project.techStack.length > 0 && <TechChips technologies={project.techStack} tags={[]} />}
        <button type="button" data-project-open className="project-read" aria-label={`Read ${project.title} case study`} aria-haspopup="dialog" onClick={(event) => onOpen(project, event.currentTarget)}>Read case study <FiArrowUpRight aria-hidden="true" /></button>
      </div>
    </article>
  );
}
