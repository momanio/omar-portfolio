import { client } from "../sanity/client";

export const fetchProjects = async () => {
  const query = `*[_type == "projects"] {
      _id,
      title,
      slug,
      description,
      publishedAt,
      "imageUrl": image.asset->url,
      body,
      tags,
      techStack,
      projectUrl,
      repoUrl
    }`;

  try {
    const projects = await client.fetch(query);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};
