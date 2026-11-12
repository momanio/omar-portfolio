import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { IoMdMenu, IoIosClose } from "react-icons/io";
import { navLinks } from "@/constants/navigation";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { SectionLink } from "./navigation/SectionLink";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { active, scrolled } = useSectionNavigation();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);
  useEffect(() => {
    const media = matchMedia("(min-width: 768px)");
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);
  useLayoutEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const body = document.body.style.overflow;
    const html = document.documentElement.style.overflow;
    const returnFocus = trigger.current;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      element.close(); document.body.style.overflow = body; document.documentElement.style.overflow = html;
      returnFocus?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <header className="site-header" data-scrolled={scrolled}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="site-nav" aria-label="Main navigation">
        <SectionLink id="top" className="brand-link" aria-label="Home — Omar Momani"><img src="/brand.svg" width="48" height="48" alt="" /></SectionLink>
        <ul className="desktop-nav">{navLinks.map(({ id, title }) => <li key={id}><SectionLink id={id} aria-current={active === id ? "location" : undefined}>{title}</SectionLink></li>)}</ul>
        <SectionLink id="contact" className="button-primary header-cta">Hire me</SectionLink>
        <button ref={trigger} type="button" className="menu-toggle" aria-label="Open navigation menu" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(true)}><IoMdMenu aria-hidden="true" /></button>
      </nav>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-navigation" aria-modal="true" aria-labelledby="mobile-navigation-title" onCancel={(event) => { event.preventDefault(); setOpen(false); }} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button,a[href]"));
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}>
        <div className="mobile-menu-top"><h2 id="mobile-navigation-title">Navigation</h2><button ref={closeButton} type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close navigation menu"><IoIosClose aria-hidden="true" /></button></div>
        <nav aria-label="Mobile navigation"><ul>{navLinks.map(({ id, title }) => <li key={id}><SectionLink id={id} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{title}</SectionLink></li>)}</ul></nav>
        <SectionLink id="contact" className="button-primary" onClick={() => setOpen(false)}>Let’s work together</SectionLink>
      </dialog>
    </header>
  );
};
