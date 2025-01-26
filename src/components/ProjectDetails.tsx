import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjects } from "../services/ProjectsService";

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const getProject = async () => {
      const query = `*[_type == "projects" && slug.current == $slug][0] {
        title,
        description,
        "imageUrl": image.asset->url,
        body,
        techStack,
        projectUrl,
        repoUrl
      }`;
      const data = await fetchProjects();
      setProject(data);
    };

    getProject();
  }, [slug]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-details">
      <h1>{project.title}</h1>
      <img src={project.imageUrl} alt={project.title} />
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectDetails;
