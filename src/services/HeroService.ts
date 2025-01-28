import { client } from "@/sanity/client";

export const fetchHero = async () => {
  const query = `*[_type == "hero"] {
      _id,
      FirstName,
      LastName,
      JobTitle
    }`;
  try {
    const hero = await client.fetch(query);
    return hero;
  } catch (error) {
    console.error("Error fetching Hero:", error);
    throw new Error("Failed to fetch Hero");
  }
};
