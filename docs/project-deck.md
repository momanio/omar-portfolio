# Project case studies

The portfolio reads published `projects` documents from Sanity. The carousel initially features BeeBites, react-router-activity, and Elham. Opening **More work** shows the remaining projects. Each entry keeps its `/#projects/<slug>` case-study URL.

## Publish the Studio fields

The Studio in `studio/` already defines the two new optional strings, `problem` and `result`. Run `npm run studio:dev` to edit locally. To make the fields available in the hosted editor, run `npm --prefix studio run deploy` and deploy the portfolio build through its usual host.

In **Projects**, enter one sentence in **Problem** and describe your contribution in **Summary**. Use **Role** for your responsibility and **Tech Stack** for the tools you used. Enter **Result** only for a verified outcome. A qualitative result is fine. Existing documents, screenshots and deep links work while fields are empty. Authored Summary takes priority over legacy Body and the bundled copy.

### Add the npm package

Create one Projects document with these values. Select a publication date in Studio. The website matches the document by its slug and uses it in place of the bundled package entry.

| Studio field | Value |
| --- | --- |
| Title and Slug | `react-router-activity` |
| Featured / Display order | Enabled / `2` |
| Problem | Navigating away from a route discards its component state. |
| Summary | I built a drop-in outlet for React Router that keeps visited routes mounted with React Activity. |
| Role | Package author |
| Tech Stack | TypeScript, React, React Router, as separate values |
| Result | Returning to a cached route restores its existing form state. |
| Tags | Open source, npm |
| Live project URL | `https://www.npmjs.com/package/react-router-activity` |
| Repo URL | `https://github.com/momanio/react-router-activity` |
| Project thumbnail | `public/projects/react-router-activity.webp` |
| Full-page screenshot | `public/projects/react-router-activity-full.webp` |
| Screenshot alternative text | The package README with installation, ActivityOutlet usage, and the visibility hook. |

### Complete the existing featured entries

| Field | BeeBites | Elham |
| --- | --- | --- |
| Featured / Display order | Enabled / `1` | Enabled / `3` |
| Problem | How can customers build a pastry box in Arabic or English and send it to the bakery? | Help potential clients understand Elham’s services and how the team works. |
| Summary | I built a bilingual menu, a box builder, and a WhatsApp order handoff for a home bakery in Jordan. | I built a single-page site that walks visitors through the agency’s process, services, and contact form. |
| Role | Storefront and CMS development | Frontend developer |
| Result | Switching languages keeps the selected items and quantities in the box. | Leave empty until you have a verified outcome. |
| Full-page screenshot | `public/projects/beebites-full.webp` | `public/projects/elham-full.webp` |
| Alternative text | BeeBites’ Arabic storefront, from the featured item through the menu and ordering instructions. | Elham’s website from its opening illustration through the process, services, and contact sections. |

BeeBites’ current published **Tech Stack** includes NextJS. The captured storefront uses React, TypeScript, Vite, Tailwind CSS, and Sanity. Review that field and set **Live project URL** to `https://beebites.o-a-momani.workers.dev/` if it represents the version you want to showcase. Elham’s **Repo URL** is `https://github.com/momanio/Elham-Frontend`.

Publish each edited document. To change the selection later, mark three or four documents **Featured** and set their **Display order**. Marked documents take priority. The site fills empty slots from the default selection, then the normal CMS ordering. Extra documents appear in More work.

## Previews and fallback content

A full-page screenshot fills the preview at its original width. Hover or hold to pan, or activate the preview button with the keyboard. Reduced motion disables hover, hold, idle movement and animation. The case-study dialog includes a readable stationary image. Arabic screenshots retain their original orientation and the surrounding project text detects its reading direction.

Sanity image fields take priority. The featured WebP captures and verified copy in `src/data/projectFallback.ts` fill gaps in older documents and allow offline browsing. Published edits to the new fields take precedence. The package is available from the bundled copy until its Sanity document is published. Absent roles and results are omitted from the interface. The captures come from the [BeeBites storefront](https://beebites.o-a-momani.workers.dev/), [package README](https://github.com/momanio/react-router-activity#readme), and [Elham public build](https://github.com/momanio/Elham-Frontend/tree/HEAD/dist).
