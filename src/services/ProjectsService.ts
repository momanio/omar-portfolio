import { client } from "@/sanity/client";
import type { Project, ProjectDocument } from "@/types/project";
import { normalizeProject, sortProjects } from "@/utils/project";

const projectClient = client.withConfig({ maxRetries: 0 });
const imageProjection = `{
  "assetId": asset->_id, "url": asset->url, alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

export const PROJECTS_QUERY = `*[_type == "projects"] | order(coalesce(order, 999999) asc, featured desc, publishedAt desc){
  _id, title, slug, year, role, highlights, tags, techStack,
  accentColor, order, featured, publishedAt,
  "summary": coalesce(summary, pt::text(body), description),
  "liveUrl": coalesce(liveUrl, projectUrl), repoUrl,
  "thumbnail": coalesce(image, mainImage, thumbnail)${imageProjection},
  "fullPageScreenshot": fullPageScreenshot${imageProjection},
  "gallery": gallery[]${imageProjection}
}`;

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  const documents = await projectClient.fetch<ProjectDocument[]>(PROJECTS_QUERY, {}, { signal, timeout: 8000 });
  return sortProjects(documents.map(normalizeProject));
}
