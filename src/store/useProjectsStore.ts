import { create } from "zustand";
import type { SanityDocument } from "@sanity/client";

interface ProjectStore {
  projects: SanityDocument[];
  setProjects: (projects: SanityDocument[]) => void;
}

export const useProjectsStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));
