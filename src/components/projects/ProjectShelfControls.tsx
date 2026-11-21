import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { projectNumber } from "@/utils/project";

export function ProjectShelfControls({ activeIndex, total, onSelect }: { activeIndex: number; total: number; onSelect: (index: number) => void }) {
  return <div className="project-shelf-controls">
    <p className="project-shelf-counter" role="status" aria-atomic="true">
      <span className="sr-only">Featured project </span>{projectNumber(activeIndex)}
      <span aria-hidden="true"> / </span><span className="sr-only"> of </span>{projectNumber(total - 1)}
    </p>
    <button type="button" aria-label="Previous project" aria-controls="project-deck-list" aria-disabled={activeIndex === 0} onClick={() => onSelect(activeIndex - 1)}><FiArrowLeft aria-hidden="true" /></button>
    <button type="button" aria-label="Next project" aria-controls="project-deck-list" aria-disabled={activeIndex === total - 1} onClick={() => onSelect(activeIndex + 1)}><FiArrowRight aria-hidden="true" /></button>
  </div>;
}
