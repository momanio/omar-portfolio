import { client } from "@/sanity/client";
import type { Hero } from "@/types/hero";
import type { About } from "@/types/about";

const profileClient = client.withConfig({ maxRetries: 0 });
export async function fetchHero(signal?: AbortSignal): Promise<Hero[]> {
  const rows = await profileClient.fetch<Hero[]>('*[_type == "hero"]{_id,FirstName,LastName,jobTitle}', {}, { signal, timeout: 5000 });
  if (!rows.length) throw new Error("Profile is not available");
  return rows;
}
export async function fetchAbout(signal?: AbortSignal): Promise<About[]> {
  const rows = await profileClient.fetch<About[]>('*[_type == "about"]{_id,about,body}', {}, { signal, timeout: 5000 });
  if (!rows.length) throw new Error("Background is not available");
  return rows;
}
