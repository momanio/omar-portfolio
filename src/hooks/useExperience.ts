import { client } from "../sanity/client";
import { useQuery } from "@tanstack/react-query";
import { Experience } from "../types/experience";

const EXPERIENCE_QUERY = `*[_type == "experience"] | order(StartDate asc){
    _id,
    title,
    name,
    StartDate,
    EndDate,
    isCurrent,
    "icon": icon.asset->url,
  }`;

export const useExperience = () => {
  return useQuery<Experience[]>({
    queryKey: ["experience"],
    queryFn: () => client.fetch<Experience[]>(EXPERIENCE_QUERY),
  });
};
