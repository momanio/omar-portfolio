import type { IconType } from "react-icons";
import { SiAngular, SiBootstrap, SiCss3, SiGit, SiGraphql, SiHtml5, SiIonic, SiJavascript, SiNextdotjs, SiNodedotjs, SiOpenai, SiReact, SiRedux, SiTailwindcss, SiTypescript } from "react-icons/si";
import claudeCode from "simple-icons/icons/claudecode.svg?url";
import gemini from "simple-icons/icons/googlegemini.svg?url";
import cursor from "simple-icons/icons/cursor.svg?url";
import copilot from "simple-icons/icons/githubcopilot.svg?url";
import figma from "@/assets/tech/figma-color.svg?url";

export type TechnologyGroup = "development" | "ai";

interface Technology {
  name: string;
  group: TechnologyGroup;
  icon: IconType | string;
  color: string;
  lightSurface?: boolean;
  originalColors?: boolean;
}

export const technologies: Technology[] = [
  { group: "development", name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { group: "development", name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { group: "development", name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { group: "development", name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { group: "development", name: "Angular", icon: SiAngular, color: "#F11653" },
  { group: "development", name: "React", icon: SiReact, color: "#61DAFB" },
  { group: "development", name: "Ionic", icon: SiIonic, color: "#3880FF" },
  { group: "development", name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
  { group: "development", name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { group: "development", name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { group: "development", name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { group: "development", name: "Next.js", icon: SiNextdotjs, color: "#000000", lightSurface: true },
  { group: "development", name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { group: "development", name: "Git", icon: SiGit, color: "#F05032" },
  { group: "development", name: "Figma", icon: figma, color: "#F24E1E", originalColors: true },
  { group: "ai", name: "Claude Code", icon: claudeCode, color: "#D97757" },
  { group: "ai", name: "OpenAI/Codex", icon: SiOpenai, color: "#000000", lightSurface: true },
  { group: "ai", name: "Gemini", icon: gemini, color: "#8E75B2" },
  { group: "ai", name: "Cursor", icon: cursor, color: "#000000", lightSurface: true },
  { group: "ai", name: "GitHub Copilot", icon: copilot, color: "#000000", lightSurface: true },
];
