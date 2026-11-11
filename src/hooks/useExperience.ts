import { useQuery } from "@tanstack/react-query";
import { fetchExperience } from "@/services/experienceService";
import type { TimelineEntry } from "@/types/timeline";

export const useExperience = () => {
  return useQuery<TimelineEntry[]>({
    queryKey: ["experience"],
    queryFn: ({ signal }) => fetchExperience(signal),
    retry: false,
  });
};
