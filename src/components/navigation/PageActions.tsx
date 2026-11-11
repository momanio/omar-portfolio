import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { SectionLink } from "./SectionLink";

export function PageActions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(scrollY > Math.min(innerHeight * 0.7, 600));
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <aside className="page-actions" aria-label="Page shortcuts" hidden={!visible}><SectionLink id="contact" className="button-primary dock-contact">Contact me</SectionLink><SectionLink id="top" className="icon-button" aria-label="Back to top"><FiArrowUp aria-hidden="true" /></SectionLink></aside>;
}
