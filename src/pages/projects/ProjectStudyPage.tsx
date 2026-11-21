import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { ProjectStudy } from "@/components/projects/ProjectStudy";
import { projectFallback } from "@/data/projectFallback";
import { useProjects } from "@/hooks/useProjects";
import { applyPageMetadata, pageMetadata } from "@/utils/pageMetadata";
import type { Project } from "@/types/project";
import { NotFound } from "@/pages/not-found/NotFound";
import { studyPath } from "@/utils/projectRoutes";

export function StudyPageContent({ project }: { project: Project }) {
  return <div className="study-page"><Link className="study-back" to="/#projects">Back to selected work</Link><ProjectStudy project={project} standalone /></div>;
}

export default function ProjectStudyPage() {
  const { slug = "" } = useParams();
  const { data } = useProjects();
  const project = studyPath(slug) ? (data ?? projectFallback).find((item) => item.slug.current === slug) : undefined;
  useEffect(() => {
    applyPageMetadata(pageMetadata(project, !project));
  }, [project]);
  return project ? <StudyPageContent project={project} /> : <NotFound />;
}
