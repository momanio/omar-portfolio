import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import type { Project } from "@/types/project";
import type { ProjectOrigin } from "@/hooks/useProjectOverlay";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ProjectStudy } from "./ProjectStudy";

export function ProjectOverlay({ project, origin, onClose }: { project: Project | null; origin: RefObject<ProjectOrigin | null>; onClose: () => void }) {
  const [visible, setVisible] = useState<Project | null>(project);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = project === null;
  useEffect(() => { if (project) setVisible(project); }, [project]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!visible || !dialog) return;
    const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnTarget = origin.current?.element ?? active;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    const padding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.paddingRight = padding;
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
      else document.getElementById("projects-heading")?.focus({ preventScroll: true });
    };
  }, [visible, origin]);

  useGSAP(() => {
    const dialog = dialogRef.current;
    if (!dialog || !visible || (project && project._id !== visible._id)) return;
    const panel = dialog.querySelector("[data-study-panel]");
    const media = gsap.matchMedia();
    media.add({ reduce: "(prefers-reduced-motion: reduce)", normal: "(prefers-reduced-motion: no-preference)" }, (context) => {
      const reduced = Boolean(context.conditions?.reduce);
      const duration = reduced ? 0.15 : 0.5;
      if (closing) {
        gsap.to(panel, { opacity: 0, duration: reduced ? 0.15 : 0.2, onComplete: () => setVisible(null) });
        gsap.to(dialog.querySelector("[data-study-scrim]"), { opacity: 0, duration: 0.2 });
        return;
      }
      gsap.fromTo(dialog.querySelector("[data-study-scrim]"), { opacity: 0 }, { opacity: 1, duration });
      gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: reduced ? 0.15 : 0.3 });
      const image = dialog.querySelector<HTMLElement>("[data-study-image]");
      if (image && !reduced && origin.current?.element.isConnected && origin.current.frame) {
        const from = origin.current.frame;
        const to = image.getBoundingClientRect();
        gsap.fromTo(image, {
          x: from.left - to.left, y: from.top - to.top,
          scaleX: from.width / to.width, scaleY: from.height / to.height, transformOrigin: "0 0",
        }, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration, ease: "power3.out" });
      }
    });
    return () => media.revert();
  }, { scope: dialogRef, dependencies: [visible, project, closing], revertOnUpdate: true });

  if (!visible) return null;
  return createPortal(
    <dialog ref={dialogRef} id="project-case-study" className="project-overlay" aria-modal="true" aria-labelledby="project-study-title" onCancel={(event) => { event.preventDefault(); if (!closing) onClose(); }} onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')).filter((element) => element.getClientRects().length > 0);
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div data-study-scrim className="project-study-scrim" aria-hidden="true" />
      <div data-study-panel className="project-study-panel">
        <div className="project-study-toolbar"><span dir="auto">{visible.title}</span><button ref={closeRef} type="button" onClick={() => { if (!closing) onClose(); }} className="project-study-close">Close<FiX aria-hidden="true" /></button></div>
        <ProjectStudy project={visible} />
      </div>
    </dialog>, document.body,
  );
}
