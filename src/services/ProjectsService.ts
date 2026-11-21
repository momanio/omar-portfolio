import { client } from "@/sanity/client";
import type { Project, ProjectDocument } from "@/types/project";
import { normalizeProject, sortProjects } from "@/utils/project";
import { projectFallback } from "@/data/projectFallback";

const projectClient = client.withConfig({ maxRetries: 0 });
const imageProjection = `{
  "assetId": asset->_id, "url": asset->url, alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

export const PROJECTS_QUERY = `*[_type == "projects"] | order(coalesce(order, 999999) asc, featured desc, publishedAt desc){
  _id, title, slug, year, role, problem, summary, result, highlights, tags, techStack,
  accentColor, order, featured, publishedAt,
  "legacySummary": coalesce(pt::text(body), description),
  "liveUrl": coalesce(liveUrl, projectUrl), "repoUrl": coalesce(repositoryUrl, repoUrl),
  "thumbnail": coalesce(image, mainImage, thumbnail)${imageProjection},
  "fullPageScreenshot": fullPageScreenshot${imageProjection},
  "gallery": gallery[]${imageProjection}
}`;

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  const documents = await projectClient.fetch<ProjectDocument[]>(PROJECTS_QUERY, {}, { signal, timeout: 8000 });
  const projects = documents.map((document) => {
    const snapshot = projectFallback.find((item) => item._id === document._id || item.slug.current === document.slug?.current);
    return normalizeProject(document, snapshot);
  });
  // The clinic was added in this release. Prefer its CMS record when the editor publishes it.
  const clinic = projectFallback.find((item) => item.slug.current === "nawa-clinic");
  if (clinic && !projects.some((project) => project.slug.current === clinic.slug.current)) projects.push(clinic);
  return sortProjects(projects);
}
