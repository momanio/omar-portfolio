import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { Navbar } from "@/components/Navbar";
import { HeroContent } from "@/pages/hero/HeroContent";
import { heroFallback, aboutFallback } from "@/data/profileFallback";
import { projectFallback } from "@/data/projectFallback";
import { timelineFallback } from "@/data/timelineFallback";
import { contact } from "@/constants/contact";
import { NotFound } from "@/pages/not-found/NotFound";

/** Static first paint shares the exact critical client components and verified snapshot. */
export function renderCriticalShell(notFound = false) {
  return renderToString(<MemoryRouter initialEntries={[notFound ? "/404" : "/"]}><Navbar /><main id="main-content" tabIndex={-1}>{notFound ? <NotFound /> : <><HeroContent hero={heroFallback} /><noscript>
    <style>{".menu-toggle{display:none}.static-navigation{display:flex;flex-wrap:wrap;gap:1rem;padding:1rem}"}</style>
    <nav className="static-navigation" aria-label="Section navigation"><a className="button-secondary" href="#about">About</a><a className="button-secondary" href="#experience">Experience</a><a className="button-secondary" href="#projects">Projects</a><a className="button-secondary" href="#contact">Contact</a></nav>
    <section id="about" className="recovery-page" aria-labelledby="static-about-heading"><h2 id="static-about-heading">{aboutFallback.about}</h2><p dir="auto">{aboutFallback.body}</p></section>
    <section id="experience" className="recovery-page" aria-labelledby="static-experience-heading"><h2 id="static-experience-heading">Experience and education</h2><ol>{timelineFallback.map((entry) => <li key={entry.id} dir="auto"><strong>{entry.title}</strong><p>{entry.organization}</p></li>)}</ol></section>
    <section id="projects" className="recovery-page" aria-labelledby="static-projects-heading"><h2 id="static-projects-heading">Selected projects</h2><ul>{projectFallback.map((project) => <li key={project._id} dir="auto"><strong>{project.title}</strong>{project.summary && <p>{project.summary}</p>}<p>{project.techStack.join(" · ")}</p></li>)}</ul><p>Interactive case studies require JavaScript.</p></section>
    <section id="contact" className="recovery-page" aria-labelledby="static-contact-heading"><h2 id="static-contact-heading">Get in touch</h2><a className="button-primary" href={`mailto:${contact.email}`}>Email {contact.email}</a><a className="button-secondary" href={contact.linkedin}>LinkedIn</a><a className="button-secondary" href={contact.github}>GitHub</a></section>
  </noscript></>}</main></MemoryRouter>);
}
