import { create } from "zustand";
import type { Hero } from "../types/hero";

interface HeroStore {
  hero: Hero[];
  setHero: (Hero: Hero[]) => void;
}

export const useHeroStore = create<HeroStore>((set) => ({
  hero: [],
  setHero: (hero) => set({ hero }),
}));
