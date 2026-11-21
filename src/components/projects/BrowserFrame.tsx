import { useRef, useState, type CSSProperties } from "react";
import { FiArrowDown, FiRotateCcw } from "react-icons/fi";
import type { Project } from "@/types/project";
import { ProjectImage } from "./ProjectImage";

interface BrowserFrameProps {
  project: Project;
  active?: boolean;
  sizes?: string;
}

export function BrowserFrame({ project, active = true, sizes = "(min-width: 920px) 550px, (min-width: 768px) 80vw, 92vw" }: BrowserFrameProps) {
  const image = project.fullPageScreenshot ?? project.thumbnail;
  const tall = Boolean(image && project.fullPageScreenshot && image.height / image.width > 0.625);
  const [latched, setLatched] = useState<boolean | null>(null);
  const [held, setHeld] = useState(false);
  const [hovered, setHovered] = useState(false);
  const playing = active && (held || (latched ?? hovered));
  const pressedAt = useRef(0);
  const shot = image ? <ProjectImage key={image.url} image={image} className={tall ? "project-shot-tall" : "project-shot-short"} sizes={sizes} /> : <span className="project-image-unavailable">Preview unavailable</span>;

  return (
    <div data-project-browser className="project-browser" data-active={active}>
      <div className="project-browser-chrome" aria-hidden="true">
        <span className="project-browser-dots"><i /><i /><i /></span>
        <bdi>{project.title}</bdi>
      </div>
      {tall && image ? (
        <button type="button" className="project-shot-viewport project-preview-control" data-playing={playing} data-latched={latched === true}
          style={{ "--pan-time": `${Math.max(7, image.height / image.width * 5)}s` } as CSSProperties}
          aria-label={`Scroll ${project.title} preview`} aria-description={image.alt} aria-pressed={latched === true}
          onPointerEnter={(event) => { if (event.pointerType === "mouse" && !matchMedia("(prefers-reduced-motion: reduce)").matches) setHovered(true); }}
          onPointerLeave={() => { setHovered(false); setHeld(false); setLatched(null); }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            pressedAt.current = performance.now();
            setHeld(!matchMedia("(prefers-reduced-motion: reduce)").matches);
          }}
          onPointerUp={() => setHeld(false)} onPointerCancel={() => setHeld(false)}
          onBlur={() => setLatched(null)}
          onClick={(event) => {
            if (!event.detail || performance.now() - pressedAt.current < 350) setLatched(!(latched ?? hovered));
          }}>
          {shot}
          <span className="project-preview-hint" aria-hidden="true">{playing ? <FiRotateCcw /> : <FiArrowDown />}<span>{playing ? "Return to start" : "Scroll preview"}</span></span>
        </button>
      ) : <div className="project-shot-viewport">{shot}</div>}
    </div>
  );
}
