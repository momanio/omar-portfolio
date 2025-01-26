import { Link } from "react-router";
import { useProjects } from "../hooks/useProjects";
import { useProjectsStore } from "../store/useProjectsStore";

export const ProjectsList = () => {
  const { isLoading, error } = useProjects();
  const projects = useProjectsStore((state) => state.projects);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading projects</div>;
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <ul className="flex flex-col gap-y-4">
        {projects.map((project) => (
          <li className="hover:underline" key={project._id}>
            <Link to={`/${project.slug.current}`}>
              <img src={project.mainImage} alt={project.title} />
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p>{new Date(project.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
