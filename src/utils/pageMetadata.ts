import type { Project } from "@/types/project";
import { studyPath } from "./projectRoutes";

const site = "https://omarmomani.is-a.dev";
const homeTitle = "Omar Momani — Frontend Developer";
const homeDescription = "Frontend developer building modern, responsive web applications with React and Angular. Explore Omar Momani’s work and get in touch.";

export function pageMetadata(project?: Project, missing = false, legacyTitle?: string | null) {
  const path = project && studyPath(project.slug.current);
  const url = site + (path || "/");
  const title = missing ? "Page not found — Omar Momani" : project || legacyTitle ? `${project?.title ?? legacyTitle} — Omar Momani` : homeTitle;
  const description = missing ? "This portfolio page could not be found. Return to Omar Momani’s portfolio or get in touch." : project?.summary || homeDescription;
  const image = project?.thumbnail;
  const imageUrl = new URL(image?.url ?? "/og-image.png", site).href;
  const alt = image?.alt ?? "Omar Momani — Frontend Developer. React, Angular, TypeScript.";
  const names: Record<string, string> = {
    description, robots: missing ? "noindex,follow" : "index,follow",
    "twitter:url": url, "twitter:title": title, "twitter:description": description, "twitter:image": imageUrl, "twitter:image:alt": alt,
  };
  const properties: Record<string, string> = {
    "og:type": project ? "article" : "website", "og:url": url, "og:title": title, "og:description": description,
    "og:image": imageUrl, "og:image:width": String(image?.width ?? 1200), "og:image:height": String(image?.height ?? 630), "og:image:alt": alt,
  };
  const extension = new URL(imageUrl).pathname.split(".").pop()?.toLowerCase();
  const types: Record<string, string> = { webp: "image/webp", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg" };
  if (extension && types[extension]) properties["og:image:type"] = types[extension];
  return { title, url, names, properties };
}

export function applyPageMetadata(data: ReturnType<typeof pageMetadata>) {
  document.title = data.title;
  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", data.url);
  document.head.querySelector('meta[property="og:image:type"]')?.remove();
  for (const [attribute, fields] of [["name", data.names], ["property", data.properties]] as const) {
    for (const [key, value] of Object.entries(fields)) {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = value;
    }
  }
}
