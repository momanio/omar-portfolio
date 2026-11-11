import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjects } from "@/services/ProjectsService";
import type { Project } from "@/types/project";

// Legacy detail component retained for callers outside the current single-route app.
const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    void fetchProjects(controller.signal).then((projects) => {
      setProject(projects.find((item) => item.slug.current === slug) ?? null);
    }).catch(() => undefined);
    return () => controller.abort();
  }, [slug]);
  if (!project) return <div>Loading…</div>;
  return <article><h1 dir="auto">{project.title}</h1>{project.thumbnail && <img src={project.thumbnail.url} alt={project.thumbnail.alt} width={project.thumbnail.width} height={project.thumbnail.height} />}{project.summary && <p dir="auto">{project.summary}</p>}</article>;
};
export default ProjectDetails;
