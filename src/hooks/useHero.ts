import { useQuery } from "@tanstack/react-query";
import type { Hero } from "@/types/hero";
import { heroFallback } from "@/data/profileFallback";
import { useIdleQuery } from "./useIdleQuery";

export const useHero = () => useQuery<Hero[]>({
  queryKey: ["hero"],
  queryFn: ({ signal }) => import("@/services/ProfileService").then((module) => module.fetchHero(signal)),
  placeholderData: [heroFallback],
  enabled: useIdleQuery(),
});
