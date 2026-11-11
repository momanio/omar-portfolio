# Career timeline implementation notes

The original public experience collection is used without a content migration. The six fallback records are a verbatim snapshot of the existing titles, organizations, dates, and current flags retrieved on 2026-11-12; local optimized logo copies are included for offline use.

## Sanity Studio integration

This repo has a Sanity client but no Sanity Studio or deployed schema source. The portable `src/sanity/schemaTypes/experience.ts` exports `experienceSchema`; copy/import it into the Studio that manages this dataset and replace its existing `experience` schema registration. Do not register a second document type with the same name. Merge any extra fields in the external schema before replacing it.

All new fields are optional. Existing `StartDate`, `EndDate`, and `icon` data remains readable. New `startDate`, `endDate`, and `logo` fields take precedence. `isCurrent` takes precedence over an end date. An explicit `Present` legacy end string is also recognized; a missing end date alone is not assumed current. Recognizable legacy degree/role titles infer education/work until the category is set explicitly. Unknown types, missing dates, titles, organization names, logos, and descriptions show TODOs. Optional technologies/links remain absent until supplied. Text and legacy Portable Text descriptions are supported by the query.

## Content to finish

- Add factual descriptions for all six entries. No achievements or technology claims were invented.
- Set the explicit work/education category on the legacy records.
- Add optional technology tags and organization/project links.
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

The missing descriptions remain visible TODOs because their factual content requires the owner. No jobs, dates, achievements, or technologies were invented.

## Verification

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
