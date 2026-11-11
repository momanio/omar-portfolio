import { useProjects } from "@/hooks/useProjects";
import { projectFallback } from "@/data/projectFallback";
import { ProjectDeck } from "@/components/projects/ProjectDeck";

export const ProjectsList = () => {
  const { data, isLoading, isError } = useProjects();
  return <ProjectDeck projects={data ?? projectFallback} isLoading={isLoading} usingFallback={isError || !data} />;
};
