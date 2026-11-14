/**
 * Portable Studio schema: register this in the external Studio's schema.types.
 * The local Studio is in studio/. Existing documents need no migration.
 */
export const experienceSchema = {
  name: "experience",
  title: "Education & experience",
  type: "document",
  fields: [
    { name: "title", title: "Role or qualification", type: "string" },
    { name: "name", title: "Organization", type: "string" },
    { name: "type", title: "Milestone type", type: "string", options: { list: [{ title: "Work", value: "work" }, { title: "Education", value: "education" }], layout: "radio" }, description: "Choose explicitly. Legacy recognizable degree/role titles are inferred until this is filled." },
    { name: "startDate", title: "Start date", type: "date", description: "Optional for legacy entries: the frontend falls back to StartDate." },
    { name: "endDate", title: "End date", type: "date", description: "Optional for legacy entries: the frontend falls back to EndDate. Ignored while current." },
    { name: "isCurrent", title: "Current role or education", type: "boolean", initialValue: false },
    { name: "logo", title: "Organization logo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alternative text", type: "string" }], description: "Falls back to the legacy icon field. Prefer a small, transparent image." },
    { name: "description", title: "Description", type: "text", rows: 4, description: "Optional summary. Leave blank to omit it from the timeline." },
    { name: "highlight", title: "Highlight", type: "string", description: "Optional short highlight, displayed on one line (up to 100 characters).", validation: (rule: { max: (length: number) => unknown }) => rule.max(100) },
    { name: "techTags", title: "Technologies", type: "array", of: [{ type: "string" }], options: { layout: "tags" } },
    { name: "link", title: "Organization or related work URL", type: "url" },
    { name: "StartDate", title: "Legacy start date", type: "date", readOnly: true, hidden: true },
    { name: "EndDate", title: "Legacy end date", type: "date", readOnly: true, hidden: true },
    { name: "icon", title: "Legacy logo", type: "image", readOnly: true, hidden: true },
  ],
  preview: { select: { title: "title", subtitle: "name", media: "logo" } },
};
