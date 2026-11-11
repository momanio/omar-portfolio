export interface TimelineEntry {
  id: string;
  type: "work" | "education" | null;
  title: string;
  organization: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  logo: { src: string; alt: string } | null;
  description: string | null;
  techTags: string[];
  link: string | null;
}

/** The nullable projection also supports documents created by the legacy Studio. */
export interface TimelineDocument {
  _id: string;
  type?: string | null;
  title?: string | null;
  name?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent?: boolean | null;
  logoUrl?: string | null;
  logoAlt?: string | null;
  description?: string | null;
  techTags?: string[] | null;
  link?: string | null;
}

export interface TimelinePoint {
  x: number;
  y: number;
}
