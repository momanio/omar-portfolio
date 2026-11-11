import { FiLock } from "react-icons/fi";
import type { Project } from "@/types/project";
import { ProjectImage } from "./ProjectImage";

export function BrowserFrame({ project }: { project: Project }) {
  const image = project.fullPageScreenshot ?? project.thumbnail;
  const tall = Boolean(image && project.fullPageScreenshot && image.height / image.width > 1.25);
  return (
    <div data-project-browser className="project-browser" dir="ltr">
      <div className="project-browser-chrome" aria-hidden="true">
        <span className="project-browser-dots"><i /><i /><i /></span>
        <span className="project-address"><FiLock /><bdi dir="auto">{project.slug.current}</bdi></span>
        <span className="project-browser-corner" />
      </div>
      <div data-shot-viewport className="project-shot-viewport" data-tall={tall} data-image-ratio={image ? image.height / image.width : 0.5625}>
        <div data-shot-scroll className="project-shot-scroll">
          <div data-shot-hover className="project-shot-hover">
            {image ? <ProjectImage image={image} className={tall ? "project-shot-tall" : "project-shot-short"} /> : <div className="project-image-unavailable">Preview unavailable</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
