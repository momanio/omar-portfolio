import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/services/ProjectsService";
import type { Project } from "@/types/project";

export const useProjects = () => useQuery<Project[]>({
  queryKey: ["projects"],
  queryFn: ({ signal }) => fetchProjects(signal),
  retry: false,
});
