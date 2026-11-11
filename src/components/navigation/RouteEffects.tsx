import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function RouteEffects() {
  const location = useLocation();
  const previous = useRef({ pathname: location.pathname, hash: "" });
  useEffect(() => {
    const before = previous.current;
    previous.current = { pathname: location.pathname, hash: location.hash };
    const project = location.hash.startsWith("#projects/");
    const closingProject = before.hash.startsWith("#projects/") && !project;
    if (project || closingProject) return;
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1);
      const target = location.pathname === "/" && id ? document.getElementById(id) : document.querySelector<HTMLElement>("main h1");
      if (target) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        if (id) target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
        else if (before.pathname !== location.pathname) window.scrollTo({ top: 0, behavior: "instant" });
        if (id || before.pathname !== location.pathname) target.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    let timer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 120);
    });
    observer.observe(main);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);
  return null;
}
