import type { Hero } from "@/types/hero";
import { profileIntro } from "@/data/profileFallback";
import { SectionLink } from "@/components/navigation/SectionLink";
import { FiArrowDown } from "react-icons/fi";

/** Shared by the client and build-time first-paint shell. */
export function HeroContent({ hero, status = "" }: { hero: Hero; status?: string }) {
  return <section id="top" className="hero-section" aria-labelledby="hero-heading">
    <div className="hero-content"><h1 id="hero-heading" dir="auto">{hero.FirstName}<br className="hero-name-break" /><span>{hero.LastName}</span></h1>
      <p className="hero-role" dir="auto">{hero.jobTitle}</p><p className="hero-intro" dir="auto">{profileIntro}</p>
      <div className="hero-actions"><SectionLink id="contact" className="button-primary">Hire me</SectionLink><SectionLink id="projects" className="button-secondary">View projects</SectionLink></div>
      <p className="hero-proof">React · Angular · Headless CMS</p><p className="hero-status" role="status">{status}</p>
      <SectionLink id="about" className="hero-scroll">Explore my background<FiArrowDown aria-hidden="true" /></SectionLink>
    </div>
  </section>;
}
