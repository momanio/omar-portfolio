import { useEffect } from "react";
import { useLocation } from "react-router";
import { studyPath } from "@/utils/projectRoutes";
import { applyPageMetadata, pageMetadata } from "@/utils/pageMetadata";

export function RouteMetadata() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const match = /^\/projects\/([^/]+)\/?$/.exec(pathname);
    if (match && studyPath(match[1])) return;
    const legacy = pathname === "/" && hash.startsWith("#projects/");
    const update = () => {
      const title = legacy ? document.getElementById("project-study-title")?.textContent : null;
      applyPageMetadata(pageMetadata(undefined, pathname !== "/", title));
    };
    update();
    if (!legacy) return;
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [pathname, hash]);
  return null;
}
