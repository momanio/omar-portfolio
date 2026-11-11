import type { Hero } from "@/types/hero";
import type { About } from "@/types/about";

// Verified public Sanity snapshot, 2026-11-12. No invented claims or achievements.
export const heroFallback: Hero = {
  "FirstName": "Omar",
  "LastName": "momani",
  "_id": "606e7386-d43c-4820-8475-eeb585ed0fb9",
  "jobTitle": "Frontend Developer"
};

export const aboutFallback: About = {
  "_id": "4c7ebc7b-af1f-468c-9308-053477a82906",
  "about": "About Me",
  "body": "Frontend Developer specializing in building modern, responsive web applications using React and Angular. I focus on clean architecture, scalable solutions, and seamless user experiences, with hands-on experience integrating Headless CMS platforms."
};

// Condensed from the existing About body; keep it factual when updating the snapshot.
export const profileIntro = "Modern, responsive web applications using React and Angular.";
