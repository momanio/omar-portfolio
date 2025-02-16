import { create } from "zustand";
import { Experience } from "../types/experience";

interface ExperinceStore {
  experince: Experience[];
  setExperience: (Experince: Experience[]) => void;
}

export const useExperienceStore = create<ExperinceStore>((set) => ({
  experince: [],
  setExperience: (experince) => set({ experince }),
}));
