import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import type { Project } from "@/types/project";
import { selectProjectShelf } from "@/utils/project";
import { useProjectOverlay } from "@/hooks/useProjectOverlay";
import { SectionLink } from "@/components/navigation/SectionLink";
import { ProjectCard } from "./ProjectCard";
import { ProjectOverlay } from "./ProjectOverlay";
import { ProjectShelfControls } from "./ProjectShelfControls";
import "./projects.css";

export function ProjectDeck({ projects, isLoading = false, usingFallback = false }: { projects: Project[]; isLoading?: boolean; usingFallback?: boolean }) {
  const list = useRef<HTMLOListElement>(null);
  const { featured, more } = useMemo(() => selectProjectShelf(projects), [projects]);
  const [activeIndex, setActiveIndex] = useState(0);
  const current = Math.max(0, Math.min(activeIndex, featured.length - 1));
  const { selected, slug, origin, open, close } = useProjectOverlay(projects);

  function jumpTo(index: number) {
    const target = list.current?.children[index];
    if (!(target instanceof HTMLElement) || !list.current) return;
    if (list.current.contains(document.activeElement)) list.current.focus({ preventScroll: true });
    list.current.scrollTo({ left: target.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function navigateShelf(event: KeyboardEvent) {
    const destinations: Record<string, number> = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: featured.length - 1 };
    if (event.altKey || event.metaKey || event.ctrlKey || !(event.key in destinations)) return;
    event.preventDefault();
    jumpTo(destinations[event.key]);
  }

  return (
    <section id="projects" aria-labelledby="projects-heading" className="project-deck mx-auto max-w-7xl px-5 py-12 text-slate-50 sm:px-12 sm:py-16 lg:px-16">
      <div role="region" aria-label="Featured projects" aria-roledescription="carousel" onKeyDown={navigateShelf}>
        <header className="project-deck-header">
          <h2 id="projects-heading" tabIndex={-1}>Selected work</h2>
          {featured.length > 0 && <ProjectShelfControls activeIndex={current} total={featured.length} onSelect={jumpTo} />}
        </header>
        <p role="status" className="sr-only">{isLoading ? "Loading projects." : usingFallback ? "Showing saved projects." : "Projects loaded."}</p>
        {slug && !selected && !isLoading && <p className="project-not-found" role="status">This project is unavailable. <button type="button" onClick={close}>Return to projects</button></p>}
        {featured.length ? (
          <ol ref={list} id="project-deck-list" data-project-list className="project-deck-list" aria-label="Featured case studies" tabIndex={0} dir="ltr"
            onScroll={(event) => {
              const track = event.currentTarget;
              const next = track.children[1];
              if (next instanceof HTMLElement && next.offsetLeft) setActiveIndex(Math.round(track.scrollLeft / next.offsetLeft));
            }}>
            {featured.map((project, index) => <li key={project._id} data-project-slot className="project-slot" inert={index !== current}><ProjectCard project={project} active={index === current} onOpen={open} /></li>)}
          </ol>
        ) : <p>No featured projects yet.</p>}
      </div>
      {more.length > 0 && <details className="project-archive">
        <summary>More work <span>{more.length}</span><FiChevronDown aria-hidden="true" /></summary>
        <ul>{more.map((project) => <li key={project._id}><button type="button" aria-haspopup="dialog" onClick={(event) => open(project, event.currentTarget)}>
          <strong dir="auto">{project.title}</strong><span dir="auto">{project.problem || project.summary || project.techStack.join(", ")}</span><FiArrowUpRight aria-hidden="true" />
        </button></li>)}</ul>
      </details>}
      <div className="project-invitation"><h3>Have a similar project in mind?</h3><SectionLink id="contact" className="button-primary">Tell me about your project</SectionLink></div>
      <ProjectOverlay project={selected} origin={origin} onClose={close} />
    </section>
  );
}
