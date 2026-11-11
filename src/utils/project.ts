import type { Project, ProjectDocument, ProjectImage, ProjectImageDocument } from "@/types/project";

export function safeProjectUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function strings(values: string[] | null | undefined): string[] {
  return [...new Set(values?.filter((value) => typeof value === "string" && value.trim()).map((value) => value.trim()) ?? [])];
}

function normalizeImage(image: ProjectImageDocument | null | undefined, title: string): ProjectImage | null {
  const url = safeProjectUrl(image?.url);
  if (!image || !url) return null;
  return {
    assetId: image.assetId ?? null,
    url,
    alt: image.alt?.trim() || `${title} interface screenshot`,
    width: image.width && image.width > 0 ? image.width : 1600,
    height: image.height && image.height > 0 ? image.height : 900,
    lqip: image.lqip?.startsWith("data:image/") ? image.lqip : null,
  };
}

export function normalizeProject(document: ProjectDocument): Project {
  const title = document.title?.trim() || "Untitled project";
  const thumbnail = normalizeImage(document.thumbnail, title);
  return {
    _id: document._id,
    title,
    slug: { current: document.slug?.current?.trim() || document._id },
    thumbnail,
    fullPageScreenshot: normalizeImage(document.fullPageScreenshot, title),
    gallery: (document.gallery ?? []).flatMap((image) => {
      const normalized = normalizeImage(image, title);
      return normalized ? [normalized] : [];
    }),
    // Publishing time is not evidence of the project's year.
    year: document.year && Number.isInteger(document.year) && document.year >= 1900 && document.year <= 2200 ? document.year : null,
    role: document.role?.trim() || null,
    summary: document.summary?.trim() || null,
    highlights: strings(document.highlights),
    tags: strings(document.tags),
    techStack: strings(document.techStack),
    accentColor: /^#[\da-f]{6}$/i.test(document.accentColor ?? "") ? document.accentColor! : null,
    order: typeof document.order === "number" && Number.isFinite(document.order) ? document.order : null,
    featured: document.featured === true,
    liveUrl: safeProjectUrl(document.liveUrl),
    repoUrl: safeProjectUrl(document.repoUrl),
    publishedAt: document.publishedAt ?? null,
  };
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
    || Number(b.featured) - Number(a.featured)
    || (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
    || a._id.localeCompare(b._id));
}

export function projectHash(slug: string): string {
  return `#projects/${encodeURIComponent(slug)}`;
}

export function projectSlugFromHash(hash: string): string | null {
  if (!hash.startsWith("#projects/")) return null;
  try { return decodeURIComponent(hash.slice("#projects/".length)) || null; } catch { return null; }
}

export function projectNumber(index: number): string {
  return new Intl.NumberFormat("en", { minimumIntegerDigits: 2, useGrouping: false }).format(index + 1);
}
