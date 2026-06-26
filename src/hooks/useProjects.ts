import { useQuery } from "@tanstack/react-query";
import { client } from "../sanity/client";
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
  "mainImage": image.asset->url, 
  publishedAt
}`;

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => client.fetch<Project[]>(PROJECTS_QUERY),
  });
};
