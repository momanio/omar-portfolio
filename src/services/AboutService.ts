import { client } from "@/sanity/client";

export const fetchAbout = async () => {
  const query = `*[_type == "about"] {
      _id,
      about,
      body,
    }`;
  try {
    const about = await client.fetch(query);
    return about;
  } catch (error) {
    console.error("Error fetching About:", error);
    throw new Error("Failed to fetch About");
  }
};
