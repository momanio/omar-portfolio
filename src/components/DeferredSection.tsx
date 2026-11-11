import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { ErrorBoundary } from "./ErrorBoundary";
import { contact } from "@/constants/contact";

export function DeferredSection({ id, title, kind, children }: { id: string; title: string; kind: "about" | "tech" | "experience" | "projects" | "contact"; children: ReactNode }) {
  const location = useLocation();
  const requested = location.hash === `#${id}` || (id === "projects" && location.hash.startsWith("#projects/"));
  const [visible, setVisible] = useState(requested);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => { if (requested) setVisible(true); }, [requested]);
  useEffect(() => {
    const node = container.current;
    if (!node || visible) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { rootMargin: "500px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);
  const fallback = <section id={id} className={`section-skeleton skeleton-${kind}`} aria-label={`Loading ${title}`} aria-busy="true"><div aria-hidden="true"><div className="skeleton-title" /><div className="skeleton-line" /><div className="skeleton-line" /><div className="skeleton-panel" /></div><p role="status" className="sr-only">Loading {title}…</p></section>;
  const recovery = <section id={id} className="section-skeleton" role="alert"><h2 className="section-heading">{title}</h2><p className="content-notice">This section couldn’t load. You can reload it or contact me directly.</p><div className="hero-actions"><button type="button" className="button-primary" onClick={() => window.location.reload()}>Reload section</button><a className="button-secondary" href={`mailto:${contact.email}`}>Email Omar</a></div></section>;
  return <div ref={container} data-deferred-section={id} tabIndex={-1} role="group" aria-label={title}>{visible ? <ErrorBoundary fallback={recovery}><Suspense fallback={fallback}>{children}</Suspense></ErrorBoundary> : fallback}</div>;
}
