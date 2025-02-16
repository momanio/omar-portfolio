import { FaCode, FaCogs, FaPencilRuler, FaRocket } from "react-icons/fa";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiIonic,
  SiGraphql,
  SiAngular,
  SiFigma,
} from "react-icons/si";

// Navigation Links
export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

// Services offered
export const services = [
  { title: "Frontend Development", icon: FaCode },
  { title: "Software Engineering", icon: FaCogs },
  { title: "UI/UX Design", icon: FaPencilRuler },
  { title: "Software Prototyping", icon: FaRocket },
];

// Technologies used
export const technologies = [
  { name: "HTML 5", icon: FaHtml5 },
  { name: "CSS 3", icon: FaCss3Alt },
  { name: "JavaScript", icon: FaJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Angular", icon: SiAngular },
  { name: "React JS", icon: FaReact },
  { name: "Ionic", icon: SiIonic },
  { name: "Redux Toolkit", icon: SiRedux },
  { name: "Bootstrap", icon: FaBootstrap },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node JS", icon: FaNodeJs },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Git", icon: FaGitAlt },
  { name: "Figma", icon: SiFigma },
];
