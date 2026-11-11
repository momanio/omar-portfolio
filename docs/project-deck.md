# Project Deck

The Projects section now opens every project in an in-page case study. It keeps the existing dark slate/gray palette, Work Sans, and indigo emphasis. No external URL is required to explore a project.

## Implementation

- `src/components/projects/`: ProjectDeck, ProjectCard, BrowserFrame, ProjectIndexRail, ProjectOverlay, TechChips, responsive image component, scoped styles, and GSAP registration.
- `src/hooks/useProjectDeckAnimation.ts`: native CSS sticky desktop cards with scrubbed depth/dimming, three independent layers, screenshot travel, hover and pointer response, index navigation, and layout refresh/cleanup.
- `src/hooks/useProjectOverlay.ts`: React Router hash state (`#projects/<encoded-slug>`), pushed history on open, Back on close, and safe replacement for directly loaded links. Existing query strings are retained.
- `src/services/ProjectsService.ts`: one typed GROQ query and normalization path. Legacy `image`, `mainImage`, `thumbnail`, `body`, `description`, and `projectUrl` remain readable. Projects without slugs remain visible with a stable document-ID link.
- `src/data/projectFallback.ts` and `public/projects/`: verified snapshot of the seven existing public CMS records and optimized local WebP screenshots, retrieved 2026-11-12.

The native dialog supplies modal semantics and background inertness. Tab cycling is explicitly trapped, the close control receives initial focus, and the initiating card receives return focus. Scroll is locked only during the dialog’s lifetime, including its short closing transition. The screenshot enters from the card using measured transform-only translation and scale; direct links and reduced motion use a fade. ESC, Close, Back, and Forward work with history.

Desktop stacking uses CSS sticky, not ScrollTrigger pinning. GSAP scales and dims the previous card, retires older cards, and gives the index, browser, and foreground chips different movement rates. Mobile below 768px and short desktop viewports use an unpinned vertical list. Reduced motion uses a static list. Actual full-page images pan within the browser; the seven current short thumbnails receive only subtle pan/zoom. Screenshots retain left-to-right geometry; CMS text uses `dir="auto"`.

Sanity’s image URL builder supplies width-limited responsive sources and srcset. Asset dimensions reserve image space; available LQIP metadata paints a small placeholder without a large blur filter. Offscreen images load lazily. Optional links are sanitized to HTTP(S), rendered only inside the dialog when present, and open normally.

## Sanity Studio integration

There is no Studio or deployed project schema source in this repository. Import/copy `src/sanity/schemaTypes/projects.ts` into the external Studio and merge it into the existing `projects` document registration. Do not register a duplicate document type. Preserve any additional fields from that Studio.

New fields are optional, so existing documents work without migration. Explicit order comes first, then featured and existing publishing order. Project year is shown only when explicitly supplied; a publishing timestamp is not evidence of project year. Existing tags and technology labels are preserved, including spelling.

## Content checklist

For **every project**, fill or review these optional fields:

- [ ] `year`: actual project year.
- [ ] `role`: your verified role.
- [ ] `summary`: a finished, factual case-study introduction.
- [ ] `highlights`: verified contributions/results; no invented metrics.
- [ ] `fullPageScreenshot`: a genuinely tall screenshot to enable full-page panning.
- [ ] `gallery`: additional real screenshots with meaningful `alt` text.
- [ ] `image.alt`: describe the current thumbnail (the frontend currently derives a title-based fallback).
- [ ] `order` / `featured`: only if you want to change the existing ordering.
- [ ] `liveUrl` / `repoUrl`: optional; leave absent when unavailable.
- [ ] `accentColor`: optional six-digit hex; affects a subtle border tint, never essential text contrast.

All seven currently have stable slugs, thumbnails, tags, and technology stacks. None currently has an explicit year, role, highlights, gallery, or full-page screenshot. Missing blocks stay hidden in the visitor UI.

| Project | Summary state | Additional data review |
|---|---|---|
| Barqya | Existing body is only “Barqya is”; complete it. | No live/repository URL required. |
| Badil | No summary/body; add verified text. | No live/repository URL required. |
| Xitmnt | Existing body supplies the summary. | Review the existing live URL if desired. |
| Herbal Home | Existing body supplies the summary. | No live/repository URL required. |
| Elham | Existing body supplies the summary. | No live/repository URL required. |
| Bandar Coatch | Existing body supplies the summary. | Both legacy live and repository URLs point at the Baslex deployment; confirm or clear them. Preserve/correct the title spelling in CMS as desired. |
| Baslex | Existing body supplies the summary. | Repository URL equals the live deployment URL; provide a real repository URL or clear it. Confirm the existing `tasStack` technology label. |

The last two documents also contain “testing the description” in the legacy description field. Their real body copy takes precedence; replace test copy at the source when convenient. No content was written back to Sanity. Update the typed fallback and local screenshots when publishing new case-study content.

## Review and polish

The final components were reviewed against the current [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): native controls, dialog semantics, focus and return focus, reduced motion, text wrapping, dimensions/alt text, image loading, history state, touch targets, safe areas, and overflow.

Impeccable used independent design and detector/browser agents. A completed before B's findings entered the implementation context. Initial design score: 26/32 (Experience-mode heuristics 7 and 10 not applicable). The source detector ran once and returned zero findings. The browser detector found two typography advisories in this section (short final lines in summaries); paragraph wrapping was refined without rewriting facts. Its three other findings belonged to existing sections, which were left untouched.

Polish fixes:

- Reduced-motion media switches explicitly restore static transform/opacity defaults after hover and resize.
- Hover preview resumes when the pointer is already over a newly mounted card; all hover tweens remain owned by the scoped media context.
- Deduplicated the gallery and render its heading only when images remain, including the full-page-image-only case.
- Replaced the empty-state CMS instructions with visitor-facing copy.
- Added prettier paragraph wrapping while preserving factual CMS copy.
- Kept dialog close controls at the safe-area edge, with 44px targets and visible focus.
- Preserved query strings during case-study hash navigation.
- Replaced a deprecated Sanity builder import to remove its browser console warning.

Barqya's incomplete text and other absent case-study fields remain owner content tasks, not fabricated filler.

## Verification

- `npm run build` includes the strict TypeScript project checks; `npm run lint` and `git diff --check` pass. Vite retains its non-blocking main-chunk size advisory.
- Chromium/Playwright checked 360×1000, 768×1000, and 1440×1000. Independent review also checked 360×800 and 768×1024. No horizontal overflow; desktop cards fit their sticky stage.
- All seven real projects open from the card and display their existing technology/tags. External controls appear only for provided HTTP(S) links. No placeholder/disabled external controls exist.
- Enter and Space open; Tab/Shift+Tab stay in the dialog; ESC, Close, Back, and direct deep links work; focus and body-scroll styles restore. Query strings remain intact.
- Side-index selection, scale/dim stacking, three distinct parallax transforms, pointer response, and short-image hover were exercised.
- Reduced motion was toggled after pointer activity and viewport changes at all three widths: cards/layers have no transforms, sticky cards/rail are disabled, all cards stay visible, and dialogs remain usable with a fade.
- Three actual app-route unmount/remount cycles: 19 unique Project Deck triggers → zero triggers while away → 19 after returning. Mobile has 8 Project Deck triggers; reduced mode has only its index-status trigger. No duplicate IDs or application warnings/exceptions.
- Isolated, explicitly synthetic fixtures verified Arabic titles/summary/role, unmirrored browser geometry, real tall-image travel and hover, highlights/gallery, gallery deduplication, long unbroken content at 360px, empty results, and modal body-scroll locking. Fixtures were test-only and are not included in production data.
- A failed CMS request retains all seven typed local entries and local screenshots; those cards still open and close their dialogs.
- The local origin is subject to the existing Sanity CORS restriction. Browser success tests proxied the public responses inside Playwright; failure tests supplied an unavailable response. No CMS settings/content were changed.

The detector's temporary servers were stopped and browser contexts closed. Evidence is retained in `/tmp/project-deck-verification.json` and `/tmp/project-deck-final-*.png` for this session. No real-phone FPS profiling was performed.

Final Impeccable verdict: **ship for the reviewed fix batch**. The reviewer scored reduced-motion cleanup, empty-gallery handling, and visitor-facing empty-state copy resolved, and confirmed Barqya's factual-copy handoff is documented. No new defects were reported in that fix batch. Static evidence is also retained in `/tmp/project-deck-static-{360,768,1440}.png` and `/tmp/project-deck-static-proof.json`.
