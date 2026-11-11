import { useCallback, useRef, type RefObject } from "react";
import type { Project } from "@/types/project";
import { gsap, ScrollTrigger, useGSAP } from "@/components/projects/projectMotion";

export function useProjectDeckAnimation(container: RefObject<HTMLElement | null>, projects: Project[], onActiveChange: (index: number) => void) {
  const positions = useRef<number[]>([]);
  const stickyTop = useRef(128);
  const jumpTo = useCallback((index: number, immediate = false) => {
    const top = positions.current[index];
    if (top === undefined) return;
    window.scrollTo({ top: Math.max(0, top - stickyTop.current + 1), behavior: immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, []);

  useGSAP(() => {
    const root = container.current;
    const list = root?.querySelector<HTMLOListElement>("[data-project-list]");
    if (!root || !list || !projects.length) return;
    const slots = Array.from(list.querySelectorAll<HTMLElement>("[data-project-slot]"));
    let frame = 0;
    let disposed = false;
    let lastIndex = -1;
    const measure = () => {
      // Sticky rects reflect the pinned position. Reconstruct natural flow positions instead.
      let top = list.getBoundingClientRect().top + window.scrollY;
      positions.current = slots.map((slot) => {
        const position = top;
        top += slot.offsetHeight + (parseFloat(getComputedStyle(slot).marginBottom) || 0);
        return position;
      });
      stickyTop.current = parseFloat(getComputedStyle(root).getPropertyValue("--project-stick-top")) || 128;
    };
    measure();
    const selectActive = () => {
      const threshold = window.scrollY + Math.min(window.innerHeight * 0.5, stickyTop.current + 120);
      let active = 0;
      positions.current.forEach((position, index) => { if (position <= threshold) active = index; });
      if (active !== lastIndex) { lastIndex = active; onActiveChange(active); }
    };
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 768px) and (min-height: 740px)",
      mobile: "(max-width: 767px), (max-height: 739px)",
      reduce: "(prefers-reduced-motion: reduce)",
      pointer: "(hover: hover) and (pointer: fine)",
    }, (context) => {
      measure();
      const desktop = Boolean(context.conditions?.desktop);
      const reduced = Boolean(context.conditions?.reduce);
      const pointer = desktop && Boolean(context.conditions?.pointer) && !reduced;
      const listeners: Array<() => void> = [];
      ScrollTrigger.create({ id: "project-deck-index", trigger: list, start: "top bottom", end: "bottom top", onUpdate: selectActive, onRefresh: selectActive });
      if (reduced) {
        // Invalidated hover tweens can retain an identity transform after a media switch.
        // Restore the CSS defaults explicitly so this variant is entirely static.
        gsap.set(list.querySelectorAll("[data-project-card], [data-project-depth], [data-project-mockup], [data-project-pointer], [data-project-chips], [data-project-chip-pointer], [data-shot-scroll], [data-shot-hover], [data-project-dim]"), { clearProps: "transform,opacity" });
      }
      if (!reduced) slots.forEach((slot, index) => {
        const card = slot.querySelector<HTMLElement>("[data-project-card]");
        const viewport = slot.querySelector<HTMLElement>("[data-shot-viewport]");
        const scrollShot = slot.querySelector<HTMLElement>("[data-shot-scroll]");
        const hoverShot = slot.querySelector<HTMLElement>("[data-shot-hover]");
        if (!card || !viewport || !scrollShot || !hoverShot) return;
        const tall = viewport.dataset.tall === "true";
        const travel = () => tall ? Math.max(0, viewport.clientWidth * Number(viewport.dataset.imageRatio) - viewport.clientHeight) : 0;
        const scroll = {
          id: `project-layers-${index}`, trigger: slot,
          start: () => positions.current[index] - window.innerHeight,
          end: () => positions.current[index] + slot.offsetHeight - stickyTop.current,
          scrub: true, invalidateOnRefresh: true,
        };
        gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: scroll })
          .fromTo(slot.querySelector("[data-project-depth]"), { y: desktop ? 34 : 4 }, { y: desktop ? -40 : -4 }, 0)
          .fromTo(slot.querySelector("[data-project-mockup]"), { y: desktop ? 18 : 3 }, { y: desktop ? -12 : -3 }, 0)
          .fromTo(slot.querySelector("[data-project-chips]"), { y: desktop ? 26 : 4 }, { y: desktop ? -18 : -4 }, 0)
          .fromTo(scrollShot, { y: 0, scale: tall ? 1 : 1.015 }, { y: () => tall ? -travel() * 0.35 : 0, scale: tall ? 1 : 1.035 }, 0);
        if (desktop && index < slots.length - 1) {
          gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: {
            id: `project-stack-${index}`, trigger: slots[index + 1],
            start: () => positions.current[index + 1] - window.innerHeight * 0.85,
            end: () => positions.current[index + 1] - stickyTop.current,
            scrub: true, invalidateOnRefresh: true,
          } })
            .to(card, { scale: 0.95, y: -18, transformOrigin: "50% 0%" }, 0)
            .to(slot.querySelector("[data-project-dim]"), { opacity: 0.48 }, 0);
          if (index < slots.length - 2) gsap.to(card, { opacity: 0, ease: "none", scrollTrigger: {
            id: `project-retire-${index}`, trigger: slots[index + 2],
            start: () => positions.current[index + 2] - window.innerHeight * 0.65,
            end: () => positions.current[index + 2] - stickyTop.current,
            scrub: true, invalidateOnRefresh: true,
          } });
        }
        if (pointer) {
          const mockup = slot.querySelector("[data-project-pointer]");
          const chips = slot.querySelector("[data-project-chip-pointer]");
          const tiltX = gsap.quickTo(mockup, "rotationX", { duration: 0.55, ease: "power2.out" });
          const tiltY = gsap.quickTo(mockup, "rotationY", { duration: 0.55, ease: "power2.out" });
          const driftX = gsap.quickTo(chips, "x", { duration: 0.65, ease: "power2.out" });
          const driftY = gsap.quickTo(chips, "y", { duration: 0.65, ease: "power2.out" });
          const move = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            tiltX(-y * 3); tiltY(x * 4); driftX(x * 10); driftY(y * 7);
            if (hover.paused() || hover.reversed()) hover.invalidate().timeScale(1).play();
          };
          const hover = gsap.fromTo(hoverShot, { y: 0, yPercent: 0, scale: 1 }, {
            y: () => tall ? -travel() - Number(gsap.getProperty(scrollShot, "y")) : 0,
            yPercent: tall ? 0 : -1, scale: tall ? 1 : 1.025,
            duration: tall ? Math.min(5, travel() / 220 + 1) : 0.7,
            ease: "power1.inOut", paused: true, immediateRender: false,
          });
          const enter = () => hover.invalidate().timeScale(1).play();
          const leave = () => {
            tiltX(0); tiltY(0); driftX(0); driftY(0);
            hover.timeScale(2).reverse();
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          if (card.matches(":hover")) enter();
          listeners.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerenter", enter); card.removeEventListener("pointerleave", leave); });
        }
      });
      selectActive();
      return () => listeners.forEach((remove) => remove());
    });
    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { if (!disposed) { measure(); ScrollTrigger.refresh(); } });
    };
    ScrollTrigger.addEventListener("refreshInit", measure);
    const observer = new ResizeObserver(refresh);
    observer.observe(root);
    slots.forEach((slot) => observer.observe(slot));
    root.addEventListener("load", refresh, true);
    root.addEventListener("error", refresh, true);
    window.addEventListener("resize", refresh);
    document.fonts.addEventListener("loadingdone", refresh);
    void document.fonts.ready.then(refresh);
    refresh();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); media.revert();
      ScrollTrigger.removeEventListener("refreshInit", measure);
      root.removeEventListener("load", refresh, true); root.removeEventListener("error", refresh, true);
      window.removeEventListener("resize", refresh); document.fonts.removeEventListener("loadingdone", refresh);
    };
  }, { scope: container, dependencies: [projects, onActiveChange], revertOnUpdate: true });
  return { jumpTo };
}
