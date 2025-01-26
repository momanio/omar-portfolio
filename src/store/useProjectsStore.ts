import { create } from "zustand";
import type { Project } from "../types/project";

interface ProjectStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export const useProjectsStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));
