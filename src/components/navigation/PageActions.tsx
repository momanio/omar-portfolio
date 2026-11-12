import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { SectionLink } from "./SectionLink";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

export function PageActions() {
  const [visible, setVisible] = useState(false);
  const { active } = useSectionNavigation();
  useEffect(() => {
    const update = () => setVisible(scrollY > Math.min(innerHeight * 0.7, 600));
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <aside className="page-actions" data-section={active} aria-label="Page shortcuts" hidden={!visible}><SectionLink id="contact" className="button-primary dock-contact">Contact me</SectionLink><SectionLink id="top" className="icon-button" aria-label="Back to top"><FiArrowUp aria-hidden="true" /></SectionLink></aside>;
}
