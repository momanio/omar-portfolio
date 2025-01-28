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
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <li
          key={project._id}
          className="group overflow-hidden rounded-lg shadow-lg transition hover:shadow-xl bg-white"
        >
          <Link to={`/${project.slug.current}`} className="block">
            <div className="relative h-48">
              <img
                src={project.mainImage || "/placeholder-image.jpg"}
                alt={project.title}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600">
                {project.title}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {new Date(project.publishedAt).toLocaleDateString()}
              </p>

              {project.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium text-white bg-indigo-500 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.techStack && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Tech Stack:
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {project.techStack.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
