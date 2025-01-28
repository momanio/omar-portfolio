import { useQuery } from "@tanstack/react-query";
import { client } from "../sanity/client";
import { useProjectsStore } from "../store/useProjectsStore";
import { Project } from "@/types/project";

const PROJECTS_QUERY = `*[
  _type == "projects"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  body,
  tags,
  techStack,
  slug,
  "mainImage": image.asset->url, // Map image field to mainImage
  publishedAt
}`;

export const useProjects = () => {
  const setProjects = useProjectsStore((state) => state.setProjects);

  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await client.fetch<Project[]>(PROJECTS_QUERY);
      setProjects(projects);
      return projects;
    },
  });
};
