import { technologies } from "@/constants";
import { Section } from "@/components/Section";

export const Tech = () => <Section idName="Tech" labelledBy="tech-heading" className="text-white"><h2 id="tech-heading" className="section-heading">Technologies</h2><ul className="technology-list">{technologies.map(({ name, icon: Icon }) => <li key={name}><span className="technology-icon"><Icon aria-hidden="true" focusable="false" /></span><span translate="no">{name}</span></li>)}</ul></Section>;
