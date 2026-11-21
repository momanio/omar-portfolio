import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { SectionLink } from "./SectionLink";

export function PageActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY >= 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <SectionLink id="top" className="back-to-top" data-visible={visible} tabIndex={visible ? 0 : -1}
      aria-hidden={!visible} aria-label="Back to top" title="Back to top">
      <FiArrowUp aria-hidden="true" />
    </SectionLink>
  );
}
