import { client } from "../sanity/client";
import { Hero } from "@/types/hero";
import { useQuery } from "@tanstack/react-query";

const HERO_QUERY = `*[_type == "hero"]{
    _id,
    FirstName,
    LastName,
    jobTitle
  }`;

export const useHero = () => {
  return useQuery<Hero[]>({
    queryKey: ["hero"],
    queryFn: () => client.fetch<Hero[]>(HERO_QUERY),
  });
};
