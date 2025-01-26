import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "cnwn4pjq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
