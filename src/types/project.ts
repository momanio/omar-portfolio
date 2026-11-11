export interface ProjectImage {
  assetId: string | null;
  url: string;
  alt: string;
  width: number;
  height: number;
  lqip: string | null;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  thumbnail: ProjectImage | null;
  fullPageScreenshot: ProjectImage | null;
  gallery: ProjectImage[];
  year: number | null;
  role: string | null;
  summary: string | null;
  highlights: string[];
  tags: string[];
  techStack: string[];
  accentColor: string | null;
  order: number | null;
  featured: boolean;
  liveUrl: string | null;
  repoUrl: string | null;
  publishedAt: string | null;
}

export interface ProjectImageDocument {
  assetId?: string | null;
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  lqip?: string | null;
}

export interface ProjectDocument {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  thumbnail?: ProjectImageDocument | null;
  fullPageScreenshot?: ProjectImageDocument | null;
  gallery?: ProjectImageDocument[] | null;
  year?: number | null;
  role?: string | null;
  summary?: string | null;
  highlights?: string[] | null;
  tags?: string[] | null;
  techStack?: string[] | null;
  accentColor?: string | null;
  order?: number | null;
  featured?: boolean | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  publishedAt?: string | null;
}
