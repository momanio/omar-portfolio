import { useExperienceStore } from "@/store/useExperienceStore";
import { client } from "../sanity/client";

import { useQuery } from "@tanstack/react-query";
import { Experience } from "../types/experience";

const EXPERIENCE_QUERY = `*[_type == "experience"] | order(StartDate asc){
    _id,
    title,
    name,
    StartDate,
    EndDate,
    "icon": icon.asset->url,
  }`;

export const useExperience = () => {
  const setExperience = useExperienceStore((state) => state.setExperience);

  return useQuery<Experience[]>({
    queryKey: ["experience"],
    queryFn: async () => {
      const experience = await client.fetch<Experience[]>(EXPERIENCE_QUERY);
      setExperience(experience);
      return experience;
    },
  });
};
