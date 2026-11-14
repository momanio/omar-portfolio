# Career timeline implementation notes

The original public experience collection is used without a content migration. The six fallback records are a verbatim snapshot of the existing titles, organizations, dates, and current flags retrieved on 2026-11-12; local optimized logo copies are included for offline use.

## Sanity Studio integration

The local Sanity Studio registers `studio/schemaTypes/experienceType.ts`. The portable `src/sanity/schemaTypes/experience.ts` also exports `experienceSchema` for external Studios. Keep these definitions in sync; do not register a second document type with the same name. Merge any extra fields in an external schema before replacing it.

All new fields are optional. Existing `StartDate`, `EndDate`, and `icon` data remains readable. New `startDate`, `endDate`, and `logo` fields take precedence. `isCurrent` takes precedence over an end date. An explicit `Present` legacy end string is also recognized; a missing end date alone is not assumed current. Recognizable legacy degree/role titles infer education/work until the category is set explicitly. Missing types, dates, titles, organizations, logos, and descriptions are omitted. Broken logos are removed, and date separators appear only when both ends are present. Text and legacy Portable Text descriptions are supported by the query.

`description` may be omitted, null, empty, or whitespace-only. Its paragraph is rendered only when it contains text, and the details wrapper is omitted when no description, highlight, tags, or link exists. `highlight` is an optional string validated to at most 100 characters in both schemas; the frontend normalizes it to one line and truncates it visually where needed. Optional `techTags` are trimmed, deduplicated, and rendered as small chips. Existing documents need no migration.

## Content to finish

- Add factual descriptions where useful; entries are complete without them. No achievements or technology claims were invented.
- Set the explicit work/education category on the legacy records.
- Add optional highlights, technology tags, and organization/project links.
- Verify PrimeTag's `isCurrent: true` is intentional: its existing end date is 2026-02-01, but the UI correctly displays Present because the current flag wins.
- Review the overlapping freelance and PrimeTag dates; they were retained exactly.
- Update `src/data/timelineFallback.ts` and its local logo snapshots when you change the career content.

## Visual and interaction decisions

The route-map composition inherits Work Sans, slate/gray surfaces, white text, and indigo accents. Editorial cards alternate beside a gently winding center route on wide screens. At smaller widths the route moves left. A circle denotes work and a diamond denotes education. An unpinned sticky rail displays the current year and milestone count. The grid, outlined years, card titles, descriptions, and logos use distinct restrained parallax speeds; the path and nodes stay in the same measured coordinate system. The route is a native SVG dash animation, so DrawSVG is not required.

GSAP objects and media-query variants are created inside a scoped useGSAP context. Font/image listeners, ResizeObserver, animation frames, and matchMedia are disposed on unmount or data change. The reduced-motion variant uses a fully drawn path and visible nodes without parallax or pulses. Scroll-linked year/count still provides wayfinding.

## Review and polish

The current [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) were reviewed against the timeline components and animation hook. The pass checked semantics, focus, native links, decorative hiding, reduced motion, wrapping, dimensions, lazy images, and scroll behavior. The required SVG stroke animation is the deliberate exception to the general transform/opacity animation guidance.

Impeccable critique used two separate agents: design assessment A (`timeline_design_review`) and detector/browser assessment B (`timeline_evidence_review`). A completed before B findings reached the implementation context. A inspected browser captures and source; B used a fresh browser page and live detector overlay. A scored the portfolio surface 24/28 (not-applicable heuristics: 5, 7, 10), with no P0/P1 issue. B found zero blocking issues and one advisory: the two-axis grid. The blueprint grid is an explicit requirement of this brief and remains intentionally subtle. The full-page detector's unrelated findings were kept outside the section's scope.

Fixes completed in the polish pass:

- Moved mobile years above each card so they stay readable instead of being clipped behind card surfaces.
- Removed heavy card fills; thin rules and open composition now share the surrounding gradient and grid.
- Balanced headings and allowed long CMS titles, organizations, tags, and descriptions to wrap without overflow.
- Added résumé access at the introduction as well as the ending, with visible keyboard focus and 44px touch targets.
- Hid the completion underline in reduced motion so it cannot contradict the milestone count; the route itself remains fully drawn.
- Switched normalized stroke animation to SVG attributes to avoid CSS pixel rounding and preserve smooth fractional progress.
- Requested 112px CMS logos, preserved fixed image dimensions, and supplied small local logo copies for failure/offline rendering.
- Reduced each stop's four parallax effects to one scrubbed timeline, alongside its activation trigger.

Missing descriptions render no text, wrapper, or margin. No jobs, dates, achievements, or technologies were invented.

The November 14 spacing pass removed the desktop 340px minimum entry height, reduced inter-entry padding, and removed trailing card padding. Entries now grow with their content. The mobile year clearance and the alternating desktop years remain intact; nodes retain their 24px offset from the card rule. The existing ResizeObserver still remeasures the route and calls `ScrollTrigger.refresh()` when content or viewport size changes. Parallax only targets elements that are present.

## Initial implementation verification

- `npm run build`: passed, including strict TypeScript project checks. Vite reports a non-blocking main-chunk size advisory.
- `npm run lint`: passed. The unused legacy ProjectDetails component had two pre-existing lint errors; its local model is now typed and the unused query was removed.
- Public GROQ request: passed against the existing six documents without a content migration or CMS mutation.
- Chromium/Playwright: checked at 360, 768, and 1440px; every node is within 1px of the measured route, cards fit, and no section overflow occurs.
- Progressive drawing: verified fractional offsets in chronological order, active nodes, current year, and milestone count.
- Cleanup: checked the actual app route unmount/remount and three matched-router navigation cycles. Each animated mount has 14 unique triggers; navigating away leaves zero.
- Reduced motion: fully drawn path, all content visible, no parallax transforms at all three widths, no completion underline.
- Edge cases: invalid/leap dates, missing fields, legacy Present, unsafe links, one entry, empty CMS results, long unbroken content, and CMS failure checked. Failed live requests retain six local entries and local logos.
- Browser runtime: no timeline page errors or GSAP/React warnings during the acceptance checks. The real app has only the `/` route; the deliberately unmatched route used to exercise unmount emits React Router's expected unmatched-route warning, separately from the matched-route tests.
- Local preview note: the existing Sanity CORS settings reject this local origin. Successful CMS browser tests proxied public responses inside the test; failure tests used an unavailable CMS response. No Sanity CORS, access, or content settings were changed.

The independent detector's temporary overlay server was stopped and its browser contexts closed. Screenshots and browser evidence were retained in `/tmp` for this session. No real mid-range phone profiling was performed.

## Optional content and spacing verification — 2026-11-14

Portfolio build (including strict TypeScript checks) and lint passed. Studio type checks, lint, and build passed; the Studio build retained its auto-update configuration and reported non-blocking appId/CDN version-check warnings. The scoped layout detector and `git diff --check` passed.

Chromium checked 360px, 768px, and 1440px with normal and reduced motion. Tests used the six saved entries with live requests unavailable, plus mocked Sanity projections for missing, null, empty, whitespace-only, and populated descriptions; highlight-only, tags-only, and link-only details; missing metadata; broken logos; long text/tags; and empty/single-entry collections. Only source comments retain development reminders; no user-visible fallback strings remain.

| Viewport | Previous route height | Updated route height | Reduction |
| --- | ---: | ---: | ---: |
| 360px | 2,206px | 1,542px | 30% |
| 768px | 2,163px | 1,499px | 31% |
| 1440px | 2,168px | 1,235px | 43% |

The six saved entries render zero detail wrappers. Node/path error stayed below 1px, with card rules and year numerals retaining their alignment. No page or content overflow occurred. Growing a populated card by 300px changed the measured path and increased ScrollTrigger's end position by 300px. Live resizing across all three widths preserved alignment. Centering successive nodes selected the correct active milestone. Reduced motion applied no parallax transforms. No timeline page errors or GSAP target warnings occurred.

Screenshots: [360px](career-timeline/360.png), [768px](career-timeline/768.png), [1440px](career-timeline/1440.png).
