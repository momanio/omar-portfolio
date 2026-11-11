import { queryClient } from "@/services/reactQueryClient";

export async function prefetchSection(id: string) {
  if (id === "projects") await queryClient.prefetchQuery({ queryKey: ["projects"], queryFn: () => import("@/services/ProjectsService").then((module) => module.fetchProjects()) });
  else if (id === "experience") await queryClient.prefetchQuery({ queryKey: ["experience"], queryFn: () => import("@/services/experienceService").then((module) => module.fetchExperience()) });
  else if (id === "about") await queryClient.prefetchQuery({ queryKey: ["about"], queryFn: () => import("@/services/ProfileService").then((module) => module.fetchAbout()) });
}
