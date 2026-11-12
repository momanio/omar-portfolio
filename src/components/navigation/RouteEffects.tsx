import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function RouteEffects() {
  const location = useLocation();
  const previous = useRef({ pathname: location.pathname, hash: "", pushedProject: false });
  useEffect(() => {
    const before = previous.current;
    previous.current = { pathname: location.pathname, hash: location.hash, pushedProject: Boolean(location.state && typeof location.state === "object" && "projectDeckOverlay" in location.state && location.state.projectDeckOverlay === true) };
    const project = location.pathname === "/" && location.hash.startsWith("#projects/");
    if (project || (before.hash.startsWith("#projects/") && before.pushedProject && before.pathname === location.pathname)) return;
    let timer = 0;
    let expiry = 0;
    let observer: ResizeObserver | undefined;
    let stopped = false;
    const stop = () => { stopped = true; clearTimeout(timer); observer?.disconnect(); };
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1);
      const findTarget = () => location.pathname === "/" && id ? document.getElementById(id) : document.querySelector<HTMLElement>("main h1");
      const target = findTarget();
      if (!target) return;
      const focusTarget = target.closest<HTMLElement>("[data-deferred-section]") ?? target;
      if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
      if (id || before.pathname !== location.pathname) focusTarget.focus({ preventScroll: true });
      if (!id) { if (before.pathname !== location.pathname) window.scrollTo({ top: 0, behavior: "instant" }); return; }
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
      // Deferred sections above the destination can change height during a long jump.
      // Correct once layout settles; any user input immediately cancels this assistance.
      const started = performance.now();
      const schedule = () => {
        if (stopped) return;
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          const current = findTarget();
          if (stopped || !current) return;
          const offset = parseFloat(getComputedStyle(current).scrollMarginTop) || 0;
          if (Math.abs(current.getBoundingClientRect().top - offset) > 3) current.scrollIntoView({ behavior: "instant", block: "start" });
        }, Math.max(180, (reduced ? 0 : 900) - (performance.now() - started)));
      };
      const main = document.getElementById("main-content");
      if (main) { observer = new ResizeObserver(schedule); observer.observe(main); }
      events.forEach((event) => window.addEventListener(event, stop, { passive: true }));
      expiry = window.setTimeout(stop, 5000);
      schedule();
    });
    return () => { cancelAnimationFrame(frame); stop(); clearTimeout(expiry); events.forEach((event) => window.removeEventListener(event, stop)); };
  }, [location.pathname, location.hash, location.state]);
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    let timer = 0;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 120);
    });
    observer.observe(main);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);
  return null;
}
