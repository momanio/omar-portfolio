import { client } from "@/sanity/client";
import type { TimelineDocument, TimelineEntry } from "@/types/timeline";
import { normalizeTimelineEntry, sortTimelineEntries } from "@/utils/timeline";

const experienceClient = client.withConfig({ maxRetries: 0 });

export const EXPERIENCE_QUERY = `*[_type == "experience"] | order(coalesce(startDate, StartDate) asc){
  _id, type, title, name, isCurrent, highlight,
  "startDate": coalesce(startDate, StartDate),
  "endDate": coalesce(endDate, EndDate),
  "logoUrl": coalesce(logo.asset->url, icon.asset->url),
  "logoAlt": coalesce(logo.alt, icon.alt),
  "description": select(description[0]._type == "block" => pt::text(description), description),
  "techTags": coalesce(techTags, []),
  link
}`;

export const fetchExperience = async (signal?: AbortSignal): Promise<TimelineEntry[]> => {
  const documents = await experienceClient.fetch<TimelineDocument[]>(EXPERIENCE_QUERY, {}, { signal, timeout: 8000 });
  return sortTimelineEntries(documents.map(normalizeTimelineEntry));
};
