import type { CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/types/project";
import { projectNumber } from "@/utils/project";
import { BrowserFrame } from "./BrowserFrame";
import { TechChips } from "./TechChips";

export function ProjectCard({ project, index, onOpen, onReveal }: { project: Project; index: number; onOpen: (project: Project, button: HTMLButtonElement) => void; onReveal: () => void }) {
  const style = project.accentColor ? { "--project-accent": project.accentColor } as CSSProperties : undefined;
  return (
    <article data-project-card className="project-card" aria-labelledby={`project-title-${project._id}`} style={style}>
      <span data-project-depth className="project-depth-number" aria-hidden="true">{projectNumber(index)}</span>
      <div className="project-card-main">
        <div className="project-card-copy">
          <h3 id={`project-title-${project._id}`} dir="auto">{project.title}</h3>
          {(project.year || project.role) && <p className="project-card-meta" dir="auto">{project.role}{project.year && <time dateTime={String(project.year)}>{project.year}</time>}</p>}
          {project.summary && <p className="project-card-summary" dir="auto">{project.summary}</p>}
          <span className="project-open-prompt" aria-hidden="true">Explore project<FiArrowUpRight /></span>
        </div>
        <div data-project-mockup className="project-mockup"><div data-project-pointer className="project-pointer"><BrowserFrame project={project} /></div></div>
      </div>
      <div className="project-card-foreground"><div data-project-chip-pointer><TechChips technologies={project.techStack} tags={project.tags} floating /></div></div>
      <div data-project-dim className="project-card-dim" aria-hidden="true" />
      <button type="button" data-project-open className="project-card-hit" aria-label={`Explore ${project.title}`} aria-haspopup="dialog" onFocus={onReveal} onClick={(event) => onOpen(project, event.currentTarget)} />
    </article>
  );
}
