import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useLocation } from "react-router";
import { SectionLink } from "./SectionLink";

export function PageActions() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY >= 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (pathname !== "/") {
    return <button type="button" className="back-to-top" data-visible={visible} tabIndex={visible ? 0 : -1}
      aria-hidden={!visible} aria-label="Back to top" title="Back to top" onClick={() => {
        document.getElementById("main-content")?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }}><FiArrowUp aria-hidden="true" /></button>;
  }

  return (
    <SectionLink id="top" className="back-to-top" data-visible={visible} tabIndex={visible ? 0 : -1}
      aria-hidden={!visible} aria-label="Back to top" title="Back to top">
      <FiArrowUp aria-hidden="true" />
    </SectionLink>
  );
}
