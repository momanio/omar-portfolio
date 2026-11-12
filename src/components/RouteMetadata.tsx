import { useEffect } from "react";
import { useLocation } from "react-router";

const baseTitle = "Omar Momani — Frontend Developer";
const description = "Frontend developer building modern, responsive web applications with React and Angular. Explore Omar Momani’s work and get in touch.";

function meta(name: string, content: string, property = false) {
  const key = property ? "property" : "name";
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${name}"]`);
  if (!element) { element = document.createElement("meta"); element.setAttribute(key, name); document.head.append(element); }
  element.content = content;
}

export function RouteMetadata() {
  const location = useLocation();
  useEffect(() => {
    const missing = location.pathname !== "/";
    const update = () => {
      const projectTitle = location.hash.startsWith("#projects/") ? document.getElementById("project-study-title")?.textContent : null;
      const title = missing ? "Page not found — Omar Momani" : projectTitle ? `${projectTitle} — Omar Momani` : baseTitle;
      document.title = title;
      meta("description", missing ? "This portfolio page could not be found. Return to Omar Momani’s portfolio or get in touch." : description);
      meta("robots", missing ? "noindex,follow" : "index,follow");
      meta("og:title", title, true); meta("twitter:title", title);
    };
    update();
    if (!location.hash.startsWith("#projects/")) return;
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [location.pathname, location.hash]);
  return null;
}
