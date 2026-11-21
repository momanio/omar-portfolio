# Project case studies

BeeBites, Nawa Clinic, and Elham each have an indexable page under `/projects/<slug>/`. Their title, description, preview image, and article are included in the production HTML. Existing `/#projects/<slug>` bookmarks still open a dialog. Badil and the other projects appear under **More work**.

## Sanity Studio

Review the nine project drafts in **Projects**. The featured drafts use **Display order** 1 for BeeBites, 2 for Nawa Clinic, and 3 for Elham. Publish the reviewed drafts when ready. The portfolio reads published records. Its local snapshot supplies case-study copy and previews when the CMS is unavailable, and includes the newly added clinic until its record is published.

Use **Problem**, **Summary**, **Role**, and an optional **Result** for each study. Add performance or business figures only when documented. **Live project URL** (`projectUrl`) and **Repo URL** (`repoUrl`) are independent optional fields. The portfolio also accepts the aliases `liveUrl` and `repositoryUrl`. Remove a retired link from its field. Baslex and Xitmnt use archived screenshots. Bandar links to the fitness source and includes an archived sign-in screen.

Use **Project thumbnail** and **Full-page screenshot** for the browser-frame preview. Upload at the original aspect ratio and supply descriptive alternative text. Existing CMS images take priority over local fallback assets. The BeeBites sequence shows one real order before and after switching languages. Its screenshots and Elham’s service detail are in `public/projects/`.

Run `npm run build` to regenerate the static pages and metadata after publishing editorial changes. The build reads published Sanity records and uses `src/data/projectFallback.ts` if the CMS is unavailable. The featured defaults and standalone slugs are in `src/utils/projectRoutes.ts`.
