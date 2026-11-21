import { useEffect, useRef, useState, type CSSProperties } from "react";
import { technologies, type TechnologyGroup } from "@/constants/technologies";
import { Section } from "@/components/Section";

function TechnologyList({ group, label }: { group: TechnologyGroup; label: string }) {
  const list = useRef<HTMLUListElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={list} className="technology-list" data-revealed={revealed} aria-label={label}>
      {technologies.filter((item) => item.group === group).map(({ name, icon: Icon, color, lightSurface, originalColors }, index) => (
        <li key={name} style={{ "--brand": color, "--delay": `${index * 32}ms` } as CSSProperties}>
          <span className="technology-icon" data-light={lightSurface} aria-hidden="true">
            {typeof Icon !== "string" ? <Icon focusable="false" /> : originalColors ? <img src={Icon} alt="" width="40" height="40" loading="lazy" /> : <span className="technology-mask" style={{ maskImage: `url("${Icon}")` }} />}
          </span>
          <span translate="no">{name}</span>
        </li>
      ))}
    </ul>
  );
}

export const Tech = () => (
  <Section idName="Tech" labelledBy="tech-heading" className="technology-section text-white">
    <h2 id="tech-heading" className="section-heading">Technologies</h2>
    <TechnologyList group="development" label="Development technologies" />
    <h3 className="technology-subheading">AI-assisted workflow</h3>
    <TechnologyList group="ai" label="AI-assisted workflow" />
  </Section>
);
