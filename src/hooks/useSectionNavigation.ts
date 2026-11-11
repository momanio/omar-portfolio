import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { navLinks } from "@/constants";

export function useSectionNavigation() {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        let current = "";
        navLinks.forEach(({ id }) => {
          if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 150) current = id;
        });
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [location.pathname]);
  return { active, scrolled };
}
