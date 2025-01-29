import { create } from "zustand";
import { About } from "@/types/about";

interface AboutStore {
  about: About[];
  setAbout: (About: About[]) => void;
}

export const useAboutStore = create<AboutStore>((set) => ({
  about: [],
  setAbout: (about) => set({ about }),
}));
