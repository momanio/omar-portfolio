import type { TimelineDocument, TimelineEntry, TimelinePoint } from "@/types/timeline";

export function validTimelineDate(value: string | null | undefined): string | null {
  if (!value || !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(value)) return null;
  const [year, month = "01", day = "01"] = value.split("-");
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().startsWith(`${year}-${month}-${day}`)
    ? value
    : null;
}

export function timelineYear(date: string | null): string {
  return date?.slice(0, 4) ?? "TODO";
}

export function formatTimelineDate(date: string): string {
  if (date.length === 4) return date;
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${date.length === 7 ? `${date}-01` : date}T00:00:00Z`));
}

export function sortTimelineEntries(entries: TimelineEntry[]): TimelineEntry[] {
  return [...entries].sort((a, b) => {
    const first = a.startDate ?? "9999";
    const second = b.startDate ?? "9999";
    return first.localeCompare(second) || a.id.localeCompare(b.id);
  });
}

export function safeTimelineLink(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function normalizeTimelineEntry(document: TimelineDocument): TimelineEntry {
  // Infer only recognizable legacy degree/role titles; leave unknown categories explicit.
  const type = document.type === "work" || document.type === "education" ? document.type
    : /bachelor|master|degree|diploma|ph\.?d/i.test(document.title ?? "") ? "education"
    : /developer|engineer|designer|freelanc/i.test(document.title ?? "") ? "work" : null;
  const organization = document.name?.trim() || "TODO: organization";
  const logoUrl = safeTimelineLink(document.logoUrl);
  const image = logoUrl ? new URL(logoUrl) : null;
  if (image?.hostname === "cdn.sanity.io") {
    image.searchParams.set("w", "112");
    image.searchParams.set("h", "112");
    image.searchParams.set("fit", "max");
    image.searchParams.set("auto", "format");
  }
  return {
    id: document._id,
    type,
    title: document.title?.trim() || "TODO: title",
    organization,
    startDate: validTimelineDate(document.startDate),
    endDate: validTimelineDate(document.endDate),
    isCurrent: document.isCurrent === true || /^present$/i.test(document.endDate ?? ""),
    logo: image ? { src: image.href, alt: document.logoAlt?.trim() || `${organization} logo` } : null,
    description: document.description?.trim() || null,
    techTags: [...new Set(document.techTags?.filter((tag) => typeof tag === "string" && tag.trim()).map((tag) => tag.trim()) ?? [])],
    link: safeTimelineLink(document.link),
  };
}

/** Vertical cubic tangents keep every measured stop on one continuous, smooth route. */
export function buildTimelinePath(points: TimelinePoint[]): string {
  if (!points.length) return "";
  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const middle = (previous.y + point.y) / 2;
    return `${path} C ${previous.x} ${middle}, ${point.x} ${middle}, ${point.x} ${point.y}`;
  }, `M ${points[0].x} ${points[0].y}`);
}
