import { useMemo, useRef, useState } from "react";
import type { Project } from "@/types/project";
import { sortProjects } from "@/utils/project";
import { useProjectDeckAnimation } from "@/hooks/useProjectDeckAnimation";
import { useProjectOverlay } from "@/hooks/useProjectOverlay";
import { ProjectCard } from "./ProjectCard";
import { ProjectIndexRail } from "./ProjectIndexRail";
import { ProjectOverlay } from "./ProjectOverlay";
import "./projects.css";

export function ProjectDeck({ projects, isLoading = false, usingFallback = false }: { projects: Project[]; isLoading?: boolean; usingFallback?: boolean }) {
  const container = useRef<HTMLElement>(null);
  const sorted = useMemo(() => sortProjects(projects), [projects]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { jumpTo } = useProjectDeckAnimation(container, sorted, setActiveIndex);
  const { selected, slug, origin, open, close } = useProjectOverlay(sorted);
  return (
    <section ref={container} id="projects" aria-labelledby="projects-heading" className="project-deck mx-auto max-w-7xl px-6 py-16 text-slate-50 sm:px-16 sm:py-24">
      <header className="project-deck-header">
        <h2 id="projects-heading" tabIndex={-1}>Projects,<br /><span>in perspective.</span></h2>
        <p>Scroll through the deck.<br />Open any project for a closer look.</p>
      </header>
      <p role="status" className="sr-only">{isLoading ? "Loading projects. Showing saved projects." : usingFallback ? "Showing saved projects. Live content is unavailable." : "Projects loaded."}</p>
      {usingFallback && !isLoading && <p className="project-fallback-note">Showing the saved project deck while live content is unavailable.</p>}
      {slug && !selected && !isLoading && <p className="project-not-found" role="status">This project is unavailable. <button type="button" onClick={close}>Return to the project deck</button></p>}
      {sorted.length ? <div className="project-deck-layout">
        <ProjectIndexRail projects={sorted} activeIndex={Math.min(activeIndex, sorted.length - 1)} onSelect={jumpTo} />
        <ol data-project-list className="project-deck-list" aria-label="Project deck">
          {sorted.map((project, index) => <li key={project._id} data-project-slot className="project-slot"><ProjectCard project={project} index={index} onOpen={open} onReveal={() => { if (index !== activeIndex) jumpTo(index, true); }} /></li>)}
        </ol>
      </div> : <p className="project-empty">No projects to show yet.</p>}
      <ProjectOverlay project={selected} origin={origin} onClose={close} />
    </section>
  );
}
