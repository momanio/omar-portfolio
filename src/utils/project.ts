import type { Project, ProjectDocument, ProjectImage, ProjectImageDocument, ProjectSnapshot } from "@/types/project";
import { standaloneSlugs } from "./projectRoutes";

export function safeProjectUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

function strings(values: string[] | null | undefined): string[] {
  return [...new Set(values?.filter((value) => typeof value === "string" && value.trim()).map((value) => value.trim()) ?? [])];
}

const labelNames: Record<string, string> = {
  tailwindcss: "Tailwind CSS", tailwind: "Tailwind CSS", jsx: "JSX", "vanilla js": "JavaScript",
};

function labels(values: string[] | null | undefined) {
  const seen = new Set<string>();
  return strings(values).flatMap((value) => {
    const label = labelNames[value.toLowerCase()] ?? value;
    const key = label.toLowerCase();
    if (key === "tasstack" || seen.has(key)) return [];
    seen.add(key);
    return [label];
  });
}

// Retired destinations are still present in older published records.
function projectDestination(value: string | null | undefined) {
  const url = safeProjectUrl(value);
  if (!url) return null;
  return ["baslex.vercel.app", "xitmnt.sa", "www.xitmnt.sa"].includes(new URL(url).hostname) ? null : url;
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

export function normalizeProject(document: ProjectDocument, snapshot?: ProjectSnapshot): Project {
  const title = document.title?.trim() || "Untitled project";
  const thumbnail = normalizeImage(document.thumbnail, title);
  const legacy = document.legacySummary?.trim();
  const legacyRecord = !document.summary?.trim();
  const savedLive = legacyRecord ? snapshot?.liveUrl : null;
  const savedRepo = legacyRecord ? snapshot?.repoUrl : null;
  const liveUrl = projectDestination(document.liveUrl) ?? savedLive ?? null;
  const repoUrl = projectDestination(document.repoUrl) ?? savedRepo ?? null;
  const stack = legacyRecord && snapshot?.slug.current === "beebites" ? snapshot.techStack : document.techStack;
  const techStack = labels(stack).filter((label) => label !== "SPA");
  const stackKeys = new Set(techStack.map((label) => label.toLowerCase()));
  return {
    _id: document._id,
    title,
    slug: { current: document.slug?.current?.trim() || document._id },
    thumbnail: thumbnail ?? snapshot?.thumbnail ?? null,
    fullPageScreenshot: normalizeImage(document.fullPageScreenshot, title) ?? snapshot?.fullPageScreenshot ?? null,
    gallery: (document.gallery ?? []).flatMap((image) => {
      const normalized = normalizeImage(image, title);
      return normalized ? [normalized] : [];
    }),
    // Publishing time is not evidence of the project's year.
    year: document.year && Number.isInteger(document.year) && document.year >= 1900 && document.year <= 2200 ? document.year : null,
    role: document.role?.trim() || snapshot?.role || null,
    problem: document.problem?.trim() || snapshot?.problem || null,
    result: document.result?.trim() || snapshot?.result || null,
    summary: document.summary?.trim() || (legacy === snapshot?.legacyBody ? snapshot?.summary : legacy) || snapshot?.summary || null,
    highlights: strings(document.highlights ?? (legacyRecord ? snapshot?.highlights : [])),
    tags: labels(document.tags).filter((label) => !stackKeys.has(label.toLowerCase())),
    techStack,
    accentColor: /^#[\da-f]{6}$/i.test(document.accentColor ?? "") ? document.accentColor! : snapshot?.accentColor ?? null,
    order: typeof document.order === "number" && Number.isFinite(document.order) ? document.order : null,
    featured: document.featured === true,
    liveUrl,
    repoUrl: repoUrl !== liveUrl ? repoUrl : null,
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

export function selectProjectShelf(projects: Project[]) {
  const sorted = sortProjects(projects);
  const curated = standaloneSlugs
    .flatMap((slug) => sorted.filter((project) => project.slug.current === slug));
  const marked = sorted.filter((project) => project.featured);
  const ordered = [...new Set([...marked, ...curated, ...sorted])];
  const featured = ordered.slice(0, Math.min(4, Math.max(3, marked.length)));
  return { featured, more: sorted.filter((project) => !featured.includes(project)) };
}
