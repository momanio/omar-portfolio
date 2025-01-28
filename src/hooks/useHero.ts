import { useHeroStore } from "@/store/useHeroStore";
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
  const setHero = useHeroStore((state) => state.setHero);

  return useQuery<Hero[]>({
    queryKey: ["hero"],
    queryFn: async () => {
      const hero = await client.fetch<Hero[]>(HERO_QUERY);
      setHero(hero);
      return hero;
    },
  });
};
