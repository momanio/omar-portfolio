import { useAboutStore } from "@/store/useAboutStore";
import { client } from "../sanity/client";
import { About } from "@/types/about";
import { useQuery } from "@tanstack/react-query";

const HERO_QUERY = `*[_type == "about"]{
    _id,
    about,
    body,
  }`;

export const useAbout = () => {
  const setAbout = useAboutStore((state) => state.setAbout);

  return useQuery<About[]>({
    queryKey: ["about"],
    queryFn: async () => {
      const about = await client.fetch<About[]>(HERO_QUERY);
      setAbout(about);
      return about;
    },
  });
};
