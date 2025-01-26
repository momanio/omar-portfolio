import { Link } from "react-router";
import { useProjects } from "../hooks/useProjects";
import { useProjectsStore } from "../store/useProjectsStore";

export const ProjectsList = () => {
  const { isLoading, error } = useProjects();
  const projects = useProjectsStore((state) => state.projects);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl text-red-500">
        Error loading projects
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <li
            key={project._id}
            className="group overflow-hidden rounded-lg shadow-lg transition hover:shadow-xl bg-white"
          >
            <Link to={`/${project.slug.current}`} className="block">
              <div className="relative h-48">
                <img
                  src={project.mainImage || "/placeholder-image.jpg"} // Fallback for null images
                  alt={project.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                  {project.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(project.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
