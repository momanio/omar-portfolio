import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/types/project";
import { ProjectFacts } from "./ProjectFacts";
import { ProjectImage } from "./ProjectImage";
import { TechChips } from "./TechChips";
import { BrowserFrame } from "./BrowserFrame";

const boxSteps = [
  { image: "bee-box.webp", alt: "Arabic order review with one pastry at quantity two and a line total of 14 JD.", caption: "Add two of the same pastry and open the box." },
  { image: "bee-language.webp", alt: "The mobile navigation open with English as the language option.", caption: "Close the box, open the menu, and choose English." },
  { image: "bee-kept.webp", alt: "English order review showing the same pastry, quantity two, and line total of 14 JD.", caption: "Reopen the box. The quantity and line total are the same." },
];

const archiveCaptions: Record<string, string> = {
  "bandar-coatch": "The Arabic sign-in screen is the entry point for staff. The linked source contains the trainee dashboard and the exercise and nutrition plan editors.",
  "baslex-project": "The public Arabic landing page pairs a photography gallery with links for clients and photographers. The staff dashboard for managing orders sits behind sign-in.",
  xitmnt: "The home screen introduces Xitmnt with a game-style “Press Start” prompt. The navigation across the top leads to its services and contact information.",
};

export function ProjectStudy({ project, standalone = false }: { project: Project; standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const Subheading = standalone ? "h2" : "h3";
  const slug = project.slug.current;
  const archive = archiveCaptions[slug];
  const hero = project.thumbnail ?? project.fullPageScreenshot;
  const gallery = project.gallery.filter((image, index, images) =>
    image.url !== hero?.url && image.url !== project.fullPageScreenshot?.url && images.findIndex((other) => other.url === image.url) === index);
  return (
    <article className="project-study-content">
      <Heading id="project-study-title" dir="auto">{project.title}</Heading>
      {project.year && <time className="project-year" dateTime={String(project.year)}>{project.year}</time>}
      <ProjectFacts project={project} />
      {(project.liveUrl || project.repoUrl) && <div className="project-study-links">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open {project.title} demo<FiArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">View repository<FiArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
      </div>}
      {slug === "beebites" ? <section className="project-study-block">
        <Subheading>One pastry box, two languages</Subheading>
        <ol className="study-sequence">{boxSteps.map((step) => <li key={step.image}><figure>
          <img src={`/projects/${step.image}`} width={390} height={310} alt={step.alt} loading="lazy" decoding="async" />
          <figcaption>{step.caption}</figcaption>
        </figure></li>)}</ol>
      </section> : archive && hero ? <section className="project-study-block">
        <Subheading>Archived walkthrough</Subheading>
        <figure><ProjectImage image={hero} className="h-auto w-full rounded-lg" /><figcaption>{archive}</figcaption></figure>
      </section> : hero && <div data-study-image className="project-study-hero">
        {project.fullPageScreenshot ? <BrowserFrame project={project} sizes="(min-width: 1152px) 1056px, 94vw" /> : <ProjectImage image={hero} className="h-auto w-full" />}
      </div>}
      {slug !== "beebites" && project.fullPageScreenshot && <a className="study-back" href={project.fullPageScreenshot.url}>View full-page screenshot</a>}
      {project.highlights.length > 0 && <section className="project-study-block">
        <Subheading>{slug === "elham" ? "Building the service gallery" : "Implementation"}</Subheading>
        <ul className="project-highlights">{project.highlights.map((line) => <li key={line} dir="auto">{line}</li>)}</ul>
        {slug === "elham" && <figure className="study-detail">
          <img src="/projects/elham-services.webp" width={960} height={540} alt="Elham’s service slider showing a UI/UX example with mobile screens between the previous and next controls." loading="lazy" decoding="async" />
          <figcaption>The UI/UX slide pairs the service name with screens from the work.</figcaption>
        </figure>}
      </section>}
      {(project.techStack.length > 0 || project.tags.length > 0) && <section className="project-study-block">
        <Subheading>{project.techStack.length ? "Built with" : "Project tags"}</Subheading><TechChips technologies={project.techStack} tags={project.tags} />
      </section>}
      {gallery.length > 0 && <section className="project-study-block"><Subheading>A closer look</Subheading>
        <div className="project-gallery">{gallery.map((image) => <figure key={image.url}><ProjectImage image={image} className="h-auto w-full" /></figure>)}</div>
      </section>}
    </article>
  );
}
