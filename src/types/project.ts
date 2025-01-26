export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: string | null;
  publishedAt: string;
}
