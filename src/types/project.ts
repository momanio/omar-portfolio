export interface Project {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  techStack: string[];
  slug: { current: string };
  mainImage: string | null;
  publishedAt: string;
}
