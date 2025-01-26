import { client } from "../sanity/client";

export const fetchProjects = async () => {
  const query = `*[_type == "projects"] {
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

  return await client.fetch(query);
};
