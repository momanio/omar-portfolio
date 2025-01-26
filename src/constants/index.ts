import bandar from "../assets/projects/bandar.webp";
import baslex from "../assets/projects/baslex.png";
import elham from "../assets/projects/elham.webp";

import xitmnt from "../assets/projects/xitmnt.webp";

import herbalhome from "../assets/projects/herbalhome.webp";
import codefolio from "../assets/projects/codefolio.webp";
import just from "../assets/company/just.webp";
import nixpend from "../assets/company/nixpend.webp";
import sitech from "../assets/company/sitech.webp";
import omar from "../assets/company/omar.webp";

import { FaCode, FaCogs, FaPencilRuler, FaRocket } from "react-icons/fa";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaBootstrap,
  FaGithub,
  FaLinkedinIn,
  FaFacebook,
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

// Work experience
export const experiences = [
  {
    title: "Bachelor of Software Engineering",
    company_name: "Jordan University of Science and Technology",
    icon: just,
    iconBg: "#333333",
    date: "June 2019",
  },
  {
    title: "Software Developer",
    company_name: "Nixpend",
    icon: nixpend,
    iconBg: "#333333",
    date: "Jan 2020 - May 2021",
  },
  {
    title: "Frontend Developer",
    company_name: "Sitech",
    icon: sitech,
    iconBg: "#333333",
    date: "Jan 2022 - Dec 2022",
  },
  {
    title: "Freelance Frontend Developer",
    company_name: "Self Employed",
    icon: omar,
    iconBg: "#333333",
    date: "Dec 2022 - Present",
  },
];

export const projects = [
  {
    id: "project-1",
    name: "Baslex",
    description: `Baslex is a SPA admin dashboard for a company that help the clients to hire a photographers with their needs.`,
    tags: ["React", "TypeScript", "Tailwindcss"],
    image: baslex,
    repo: "https://github.com/Primetag-sa/baslex-dashboardReact",
  },
  {
    id: "project-2",
    name: "Elham",
    description: `A single-page application that allows users to know more about Elham Company and its services.`,
    tags: ["nextjs", "supabase", "css"],
    image: elham,
    repo: "https://github.com/momanio/Elham-Frontend",
  },
  {
    id: "project-3",
    name: "Bandar",
    description: "Admin Dashboard for a Gym and Fitness Center.",
    tags: ["react", "mongodb", "tailwind"],
    image: bandar,
    repo: "https://github.com/momanio/bandar-app",
  },
  {
    id: "project-4",
    name: "Xitmnt",
    description: "A single-page application for gaming services by Xitmnt.",
    tags: ["nextjs", "supabase", "css"],
    image: xitmnt,
    repo: "https://github.com/momanio/xitmnt-project",
  },
  {
    id: "project-5",
    name: "Herbal Home",
    description:
      "Herbal Home provides Natural Herbal Medications, allowing users to search for product ratings and details.",
    tags: ["nextjs", "supabase", "css"],
    image: herbalhome,
    repo: "https://github.com/momanio/angular-project",
  },
  {
    id: "project-6",
    name: "Codefolio",
    description: "A previous version of my Portfolio created using Next.js.",
    tags: ["react", "restapi", "scss"],
    image: codefolio,
    repo: "https://github.com/momanio/my-codefolio",
  },
];

export const socialIcons = [
  { id: "Github", socialPath: "https://github.com/momanio", icon: FaGithub },
  {
    id: "LinkedIn",
    socialPath: "https://linkedin.com/in/momanio",
    icon: FaLinkedinIn,
  },
  {
    id: "Facebook",
    socialPath: "https://www.facebook.com/oamomani",
    icon: FaFacebook,
  },
];
