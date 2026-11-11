import { useQuery } from "@tanstack/react-query";
import type { About } from "@/types/about";
import { aboutFallback } from "@/data/profileFallback";
import { useIdleQuery } from "./useIdleQuery";

export const useAbout = () => useQuery<About[]>({
  queryKey: ["about"],
  queryFn: ({ signal }) => import("@/services/ProfileService").then((module) => module.fetchAbout(signal)),
  placeholderData: [aboutFallback],
  enabled: useIdleQuery(),
});
