import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import type { TimelineEntry, TimelinePoint } from "@/types/timeline";
import { buildTimelinePath } from "@/utils/timeline";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useTimelineAnimation(
  container: RefObject<HTMLElement | null>,
  entries: TimelineEntry[],
  onActiveChange: (index: number) => void,
) {
  useGSAP(() => {
    const root = container.current;
    const route = root?.querySelector<HTMLElement>("[data-timeline-route]");
    const path = root?.querySelector<SVGPathElement>("[data-route-draw]");
    const track = root?.querySelector<SVGPathElement>("[data-route-track]");
    const svg = path?.ownerSVGElement;
    if (!root || !route || !path || !track || !svg || !entries.length) return;

    const stops = Array.from(root.querySelectorAll<HTMLElement>("[data-timeline-stop]"));
    const anchors = Array.from(root.querySelectorAll<HTMLElement>("[data-timeline-anchor]"));
    const progress = root.querySelector<HTMLElement>("[data-progress-line]");
    let points: TimelinePoint[] = [];
    let fractions: number[] = [];
    let disposed = false;
    let refreshFrame = 0;
    let lastIndex = -1;

    const measure = () => {
      // Measure the stationary anchors, excluding all transforms on card/year children.
      const bounds = route.getBoundingClientRect();
      const nodes = anchors.map((anchor) => {
        const position = anchor.getBoundingClientRect();
        return { x: position.left - bounds.left, y: position.top - bounds.top };
      });
      points = [
        { x: nodes[0].x, y: Math.max(0, nodes[0].y - 56) },
        ...nodes,
        { x: nodes[nodes.length - 1].x, y: route.offsetHeight - 24 },
      ];
      svg.setAttribute("viewBox", `0 0 ${route.clientWidth} ${route.offsetHeight}`);
      const d = buildTimelinePath(points);
      path.setAttribute("d", d);
      track.setAttribute("d", d);
      const length = path.getTotalLength();
      // Calibrate drawing distance to each stop, including unequal/expanded cards.
      fractions = points.map((_, index) => {
        track.setAttribute("d", buildTimelinePath(points.slice(0, index + 1)));
        return length ? track.getTotalLength() / length : 0;
      });
      track.setAttribute("d", d);
    };
    measure();

    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const desktop = Boolean(context.conditions?.desktop);
      const reducedMotion = Boolean(context.conditions?.reduce);
      measure();
      const selectActive = () => {
        const center = window.innerHeight / 2;
        let active = 0;
        anchors.forEach((anchor, index) => {
          if (anchor.getBoundingClientRect().top <= center + 1) active = index;
        });
        if (active !== lastIndex) {
          lastIndex = active;
          onActiveChange(active);
        }
      };

      if (reducedMotion) {
        // No transforms, scrub, pulses, or hidden content in the static variant.
        gsap.set(path, { attr: { "stroke-dasharray": "none", "stroke-dashoffset": 0 } });
        gsap.set(progress, { opacity: 0 });
        ScrollTrigger.create({ id: "career-static-progress", trigger: route, start: "top bottom", end: "bottom top", onUpdate: selectActive, onRefresh: selectActive });
      } else {
        gsap.set(path, { attr: { "stroke-dasharray": 1, "stroke-dashoffset": 1 } });
        gsap.set(progress, { scaleX: 0 });
        const routePosition = () => route.getBoundingClientRect().top + window.scrollY;
        const master = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "career-route", trigger: route,
            start: () => routePosition() + points[0].y - window.innerHeight / 2,
            end: () => routePosition() + points[points.length - 1].y - window.innerHeight / 2,
            scrub: 0.3, invalidateOnRefresh: true,
            onUpdate: selectActive, onRefresh: selectActive,
          },
        });
        // Each segment reaches its node precisely when that node crosses the center.
        // SVG attributes retain fractional normalized distances; CSS px auto-rounding does not.
        master.fromTo(path, { attr: { "stroke-dashoffset": 1 } }, {
          attr: { "stroke-dashoffset": 0 }, duration: 1,
          ease: (progress: number) => {
            const y = points[0].y + progress * (points[points.length - 1].y - points[0].y);
            const nextIndex = points.findIndex((point) => point.y >= y);
            if (nextIndex <= 0) return nextIndex === 0 ? 0 : 1;
            const previous = points[nextIndex - 1];
            const span = points[nextIndex].y - previous.y;
            const segmentProgress = span > 0 ? (y - previous.y) / span : 1;
            return fractions[nextIndex - 1] + segmentProgress * (fractions[nextIndex] - fractions[nextIndex - 1]);
          },
        }, 0);
        master.to(progress, { scaleX: 1, duration: 1 }, 0);
        gsap.fromTo(root.querySelector("[data-timeline-grid]"), { y: -64 }, {
          y: 64, ease: "none",
          scrollTrigger: { id: "career-grid", trigger: root, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        });
        stops.forEach((stop, index) => {
          const scroll = { trigger: stop, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true };
          const parallax = gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: { ...scroll, id: `career-parallax-${index}` } });
          const year = stop.querySelector("[data-timeline-year]");
          const title = stop.querySelector("[data-card-title]");
          const detail = stop.querySelector("[data-card-detail]");
          const logo = stop.querySelector("[data-card-logo]");
          if (year) parallax.fromTo(year, { y: desktop ? 32 : 8 }, { y: desktop ? -48 : -8 }, 0);
          if (title) parallax.fromTo(title, { y: desktop ? 14 : 4 }, { y: desktop ? -14 : -4 }, 0);
          if (detail) parallax.fromTo(detail, { y: desktop ? 22 : 6 }, { y: desktop ? -22 : -6 }, 0);
          if (logo) parallax.fromTo(logo, { y: desktop ? 8 : 2, scale: 0.94 }, { y: desktop ? -8 : -2, scale: 1 }, 0);
          // Build the complete activation up front so callbacks create no untracked tweens.
          const activation = gsap.timeline({ paused: true });
          activation.to(stop.querySelector("[data-node-shape]"), { scale: 1.2, svgOrigin: "0 0", duration: 0.25, ease: "power2.out" }, 0)
            .to(stop.querySelector("[data-node-fill]"), { opacity: 1, duration: 0.2 }, 0)
            .fromTo(stop.querySelector("[data-node-ring]"), { scale: 0.6, opacity: 0, svgOrigin: "0 0" }, { scale: 1.65, opacity: 0.45, duration: 0.35, ease: "power2.out" }, 0)
            .to(stop.querySelector("[data-node-ring]"), { opacity: 0, duration: 0.4 }, 0.35);
          ScrollTrigger.create({
            id: `career-node-${index}`, trigger: anchors[index], start: "top center", end: "bottom top",
            onEnter: () => activation.play(), onLeaveBack: () => activation.reverse(),
            onRefresh: (self) => activation.progress(self.progress > 0 ? 1 : 0).pause(),
          });
        });
      }
      selectActive();
    });

    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        if (disposed) return;
        measure();
        ScrollTrigger.refresh();
      });
    };
    // refreshInit also covers ScrollTrigger's own debounced viewport refresh.
    ScrollTrigger.addEventListener("refreshInit", measure);
    const observer = new ResizeObserver(refresh);
    observer.observe(route);
    stops.forEach((stop) => observer.observe(stop));
    const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
    images.forEach((image) => {
      image.addEventListener("load", refresh);
      image.addEventListener("error", refresh);
    });
    void document.fonts.ready.then(refresh);
    document.fonts.addEventListener("loadingdone", refresh);
    window.addEventListener("resize", refresh);
    refresh();

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      observer.disconnect();
      window.removeEventListener("resize", refresh);
      document.fonts.removeEventListener("loadingdone", refresh);
      ScrollTrigger.removeEventListener("refreshInit", measure);
      images.forEach((image) => {
        image.removeEventListener("load", refresh);
        image.removeEventListener("error", refresh);
      });
      media.revert();
    };
  }, { scope: container, dependencies: [entries, onActiveChange], revertOnUpdate: true });
}
