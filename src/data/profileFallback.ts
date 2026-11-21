import type { Hero, HeroCopy } from "@/types/hero";
import type { About } from "@/types/about";

// Verified public Sanity snapshot, 2026-11-12. No invented claims or achievements.
export const heroFallback: Hero = {
  FirstName: "Omar",
  LastName: "momani",
  _id: "606e7386-d43c-4820-8475-eeb585ed0fb9",
  jobTitle: "Frontend Developer",
};

export const aboutFallback: About = {
  _id: "4c7ebc7b-af1f-468c-9308-053477a82906",
  about: "About Me",
  body: "",
};

// Shared hero copy for the client and build-time first-paint shell.
export const heroContent: HeroCopy = {
  description: "",
  skills: ["React", "Angular", "TypeScript", "Node.js", "RTL-ready"],
};
