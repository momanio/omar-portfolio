import { client } from "@/sanity/client";

export const fetchExperience = async () => {
  const query = `*[_type == "experience"] | order(StartDate asc){
      _id,
      title,
      name,
      StartDate,
      EndDate,
      icon,
    }`;
  try {
    const experience = await client.fetch(query);
    return experience;
  } catch (error) {
    console.error("Error fetching experience:", error);
    throw new Error("Failed to fetch experience");
  }
};
