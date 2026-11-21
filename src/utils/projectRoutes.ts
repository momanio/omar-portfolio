export const standaloneSlugs = ["beebites", "nawa-clinic", "elham"] as const;

export function studyPath(slug: string) {
  return standaloneSlugs.some((item) => item === slug) ? `/projects/${slug}/` : null;
}
