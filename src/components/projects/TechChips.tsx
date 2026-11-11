import type { IconType } from "react-icons";
import { SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiLaravel, SiPhp, SiHtml5, SiCss3, SiVite, SiMui } from "react-icons/si";
import { FiCode } from "react-icons/fi";

const icons: Record<string, IconType> = {
  react: SiReact, jsx: SiReact, typescript: SiTypescript, javascript: SiJavascript,
  "vanilla js": SiJavascript, tailwindcss: SiTailwindcss, "tailwind css": SiTailwindcss,
  laravel: SiLaravel, php: SiPhp, html5: SiHtml5, css3: SiCss3, vite: SiVite, mui: SiMui,
};

export function TechChips({ technologies, tags, floating = false }: { technologies: string[]; tags: string[]; floating?: boolean }) {
  return (
    <div className="project-chip-groups" data-project-chips={floating ? "" : undefined}>
      {technologies.length > 0 && <ul className="project-tech-list" aria-label="Technology stack" dir="auto">
        {technologies.map((name) => {
          const Icon = icons[name.toLowerCase()] ?? FiCode;
          return <li key={name} className="project-tech-chip" dir="auto"><Icon aria-hidden="true" /><span translate="no">{name}</span></li>;
        })}
      </ul>}
      {tags.length > 0 && <ul className="project-tag-list" aria-label="Project tags" dir="auto">{tags.map((tag) => <li key={tag} className="project-tag-chip" dir="auto">{tag}</li>)}</ul>}
    </div>
  );
}
