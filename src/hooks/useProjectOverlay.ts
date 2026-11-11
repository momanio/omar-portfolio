import { useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Project } from "@/types/project";
import { projectHash, projectSlugFromHash } from "@/utils/project";

export interface ProjectOrigin {
  element: HTMLButtonElement;
  frame: DOMRect;
}

export function useProjectOverlay(projects: Project[]) {
  const location = useLocation();
  const navigate = useNavigate();
  const origin = useRef<ProjectOrigin | null>(null);
  const slug = projectSlugFromHash(location.hash);
  const selected = projects.find((project) => project.slug.current === slug) ?? null;
  const open = useCallback((project: Project, button: HTMLButtonElement) => {
    const frame = button.closest("article")?.querySelector("[data-project-browser]");
    origin.current = frame ? { element: button, frame: frame.getBoundingClientRect() } : null;
    void navigate({ pathname: location.pathname, search: location.search, hash: projectHash(project.slug.current) }, { state: { projectDeckOverlay: true } });
  }, [navigate, location.pathname, location.search]);
  const close = useCallback(() => {
    const state: unknown = location.state;
    if (state && typeof state === "object" && "projectDeckOverlay" in state && state.projectDeckOverlay === true) {
      void navigate(-1);
    } else {
      void navigate({ pathname: location.pathname, search: location.search, hash: "#projects" }, { replace: true });
    }
  }, [location.state, location.pathname, location.search, navigate]);
  return { selected, slug, origin, open, close };
}
