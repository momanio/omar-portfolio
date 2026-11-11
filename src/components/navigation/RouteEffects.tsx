import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function RouteEffects() {
  const location = useLocation();
  const previous = useRef({ pathname: location.pathname, hash: "", pushedProject: false });
  useEffect(() => {
    const before = previous.current;
    previous.current = { pathname: location.pathname, hash: location.hash, pushedProject: Boolean(location.state && typeof location.state === "object" && "projectDeckOverlay" in location.state && location.state.projectDeckOverlay === true) };
    const project = location.hash.startsWith("#projects/");
    const closingProject = before.hash.startsWith("#projects/") && !project;
    if (project || (closingProject && before.pushedProject)) return;
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1);
      const target = location.pathname === "/" && id ? document.getElementById(id) : document.querySelector<HTMLElement>("main h1");
      if (target) {
        const focusTarget = target.closest<HTMLElement>("[data-deferred-section]") ?? target;
        if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
        // Focus first: focusing after scrollIntoView can cancel native smooth scrolling.
        if (id || before.pathname !== location.pathname) focusTarget.focus({ preventScroll: true });
        if (id) target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
        else if (before.pathname !== location.pathname) window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, location.state]);
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
