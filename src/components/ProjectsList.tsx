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
  console.log("Projects: ", projects);
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <li
          key={project._id}
          className="group overflow-hidden rounded-xl shadow-lg transition hover:shadow-2xl backdrop-blur-md bg-white/10 border border-white/20"
        >
          <div className="relative h-48">
            <img
              src={project.mainImage || "/placeholder-image.jpg"}
              alt={project.title}
              className="h-full w-full object-cover transition group-hover:scale-105 rounded-t-xl"
            />
          </div>

          <div className="p-6 bg-white/20 backdrop-blur-lg rounded-b-xl">
            <h2 className="text-2xl font-semibold text-gray-200 group-hover:text-blue-400">
              {project.title}
            </h2>
            <p className="text-gray-400 text-sm mt-2"></p>

            {project.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-white bg-blue-500/80 rounded-full backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.techStack && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-300">
                  Tech Stack
                </h3>
                <ul className="grid grid-cols-3 list-disc list-inside text-sm text-gray-400 mt-1">
                  {project.techStack.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
