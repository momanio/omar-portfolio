import type { Project } from "@/types/project";
import { projectNumber } from "@/utils/project";

export function ProjectIndexRail({ projects, activeIndex, onSelect }: { projects: Project[]; activeIndex: number; onSelect: (index: number) => void }) {
  return (
    <nav className="project-index-rail" aria-label="Project deck index">
      <p className="project-index-counter"><span>{projectNumber(activeIndex)}</span><span className="project-index-total"> / {projectNumber(projects.length - 1)}</span></p>
      <ol>{projects.map((project, index) => <li key={project._id}>
        <button type="button" onClick={() => onSelect(index)} aria-current={index === activeIndex ? "step" : undefined}>
          <span className="project-index-tick" aria-hidden="true" /><span dir="auto">{project.title}</span>
        </button>
      </li>)}</ol>
      <p className="project-index-hint">Scroll to browse.<br />Open to explore.</p>
    </nav>
  );
}
