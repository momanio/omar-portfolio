import { useQuery } from "@tanstack/react-query";

import type { SanityDocument } from "@sanity/client";
import { client } from "../sanity/client";
import { useProjectsStore } from "../store/useProjectsStore";

const PROJECTS_QUERY = `*[
  _type == "projects"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, mainImage, publishedAt}`;

export function useProjects() {
  const setProjects = useProjectsStore((state) => state.setProjects);

  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await client.fetch<SanityDocument[]>(PROJECTS_QUERY);
      setProjects(projects);
      return projects;
    },
  });
}
