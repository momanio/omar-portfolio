# Portfolio UX audit — final results

Completed 2026-11-12 against the local **production build**. Baseline: `2c834cc`. See [the prioritized before report](before.md), [browser evidence](after/browser.json), [regressions](after/regressions.json), and [Lighthouse results](after/lighthouse-summary.json). The live site has not been deployed by this task.

## Before / after

Same Lighthouse 13.6.0, Chromium binary, viewport/throttling settings, actual public CMS response replay and 350ms delivery delay. One run per device per phase; lab results fluctuate and are not field guarantees.

| Metric | Mobile before | Mobile after | Desktop before | Desktop after |
|---|---:|---:|---:|---:|
| Performance | 51 | **99** | 85 | **100** |
| Accessibility | 96 | **100** | 96 | **100** |
| Best Practices | 96 | **100** | 96 | **100** |
| SEO | 92 | **100** | 92 | **100** |
| FCP | 2.53s | **0.75s** | 0.62s | **0.20s** |
| LCP | 4.94s | **1.97s** | 1.21s | **0.49s** |
| CLS | 0 | **0** | 0.00006 | **0** |
| TBT | 1,462ms | **29ms** | 264ms | **0ms** |
| Initial JS transfer | 238.8KB | **127.2KB** | 238.8KB | **127.2KB** |
| Total initial transfer | 316.6KB | **200.5KB** | 316.6KB | **200.5KB** |
| Font transfer | 51.1KB | **50.6KB** | 51.1KB | **50.6KB** |
| Initial image transfer | 0KB (inline logo) | 4.5KB | 0KB (inline logo) | 4.5KB |

Main JS chunk: **651.55 → 308.41KB raw**, **222.34 → 99.35KB gzip**. ScrollTrigger/GSAP now loads with below-fold sections. INP was not measured; TBT is a lab responsiveness diagnostic, not an INP result.

Full-scroll image transfer at 390px was **72.9KB / 13 requests before**, **275.4KB / 25 requests after**. The final fast-scroll path loads local placeholder images before replacing them with live CMS images, plus the externalized logo/favicon. It also waits longer between scroll steps to load deferred sections. These totals describe the measured journeys, not an identical image payload comparison. Existing project/experience image URL builders and responsive dimensions remain unchanged. Fallback-image duplication is a remaining bandwidth tradeoff; it does not affect initial LCP, but can be reduced in a future section-owned data/image pass.

## What changed and why

- **Orientation:** native desktop section links, scroll-spy, a stable header, persistent Hire me action, mobile contact dock, back-to-top, skip link and visible focus. The mobile menu is a native dialog with focus trap, ESC, focus return, scroll lock only while open, and close-on-navigation. Deferred section jumps settle beneath the header and stop correcting immediately on user input.
- **First impression:** the existing identity, role and verified React/Angular background appear immediately. Hire me is dominant and fits within both first mobile viewports. No results, years, clients or testimonials were invented.
- **Resilience:** typed verified profile snapshots, bounded CMS requests, background refresh/retry, ten-minute query freshness, hover/focus prefetch, section-sized skeletons, section/global error boundaries and a real 404. CMS failure shows saved content and a retry path.
- **Contact:** public email, LinkedIn and GitHub, copy-email feedback, and a short labelled/validated form when EmailJS is configured. Missing configuration shows a direct-email alternative. Failed submissions retain the draft. No real email was sent during tests.
- **Performance:** lazy below-fold sections/services, deferred heavy animation code, removed global Framer animations, scoped Tailwind source scanning, self-hosted existing Work Sans Latin variable font. No new production dependency. Removed unused `framer-motion`, `@emotion/react`, `@emotion/styled`, `@portabletext/react`, and server-side `emailjs`; `@emailjs/browser` remains a lazy import.
- **Accessibility/mobile:** one main landmark, named footer links, visible technology labels/decorative SVG handling, corrected footer contrast,16px mobile summaries/inputs, safe-area spacing and svh/dvh sizing. Arabic CMS text uses automatic direction; screenshots are not mirrored.
- **SEO/sharing:** charset, canonical, description, Person JSON-LD, project-dialog document titles, noindex 404, real robots/sitemap/manifest/favicons, and a valid 1200×630 OG image using the existing brand/font/colors.

## Static first paint: decision and tradeoff

A small build step renders the shared header/hero using the verified snapshot into the HTML. It also supplies no-JavaScript About, Experience, Projects and Contact content and section navigation, plus a static404 page. The client still uses React Router and replaces this shell on startup; it is not full SSR/hydration or a new routing framework. Shared components keep the first-paint geometry consistent (measured CLS 0).

This was low risk and materially improved first paint/crawler content. Update the snapshot when CMS identity/background changes; otherwise the initial HTML can be stale until the live query completes. Hash fragments are not sent to servers: project dialogs get client-side titles, but social preview crawlers still see the homepage metadata. True per-project server URLs/SSG are deferred to the separate Projects scope. Production hosting must serve `404.html` for missing paths with an appropriate 404 status; Vite preview itself uses SPA fallback 200.

## Verification

- `npm run build` (includes TypeScript project checks), `npx tsc -b --pretty false`, `npm run lint`, and `git diff --check`: passed.
- Screenshots: root/full page, all six sections, all seven project dialogs and 404 at **360×740, 390×844, 768×1024, 1280×800, 1440×900**. Representative before/after images are committed here; complete captures and Lighthouse HTML/JSON are in `artifacts/ux-audit.zip`.
- No overflow at **320,360,390,428,640,768,1024,1280,1440,1600,1920px**. All visible measured links/buttons/inputs are at least 44×44px. This samples the 320–1920 range; it is not a claim of testing every integer width.
- Axe WCAG A/AA checks: **zero violations at all five primary viewports**. Automated checks do not prove complete WCAG conformance.
- Keyboard walkthrough: skip link → main, tab-visible navigation, menu trap/ESC/focus return, section links, project Enter/Space, overlay ESC/Back, contact clipboard feedback,404 recovery. Section destinations settle 92–96px from the top, below the 72px header.
- Three route-away/back cycles: **33 → 0 → 33 ScrollTriggers** each time; no duplicate IDs, console warnings or page exceptions. Project Back preserves the originating card position.
- Reduced motion: **zero running animations**, all inspected timeline/deck parallax transforms `none`; overlay remains usable.
- Slow4G, seven-second CMS delay, 503 failures and raw preview-origin 403: identity/content remain visible, with skeletons or saved data rather than raw errors/blank screens.
- JavaScript disabled: identity, section content/navigation and mailto remain available. OG image decodes at 1200×630; all listed SEO assets return their correct MIME types.
- Mocked EmailJS fixture: invalid fields/focus, failure retains draft, success clears it, honeypot prevents request,16px inputs all passed. Current production configuration has no EmailJS credentials, so the tested direct-email alternative is shown. See [contact results](after/contact.json).
- Physical iOS Safari, browser-bar collapse on hardware and field INP remain unverified. WebKit could not start because this environment lacks libavif16/libmanette. CSS safeguards were inspected; Chromium emulation is not claimed as Safari testing.

## Guideline and Impeccable review / polish

Reviewed against the [current Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md) and installed Impeccable audit/critique/polish references. Separate design and detector reviewers were used. Assessment A supplied its 26/32 applicable heuristic score and shipping disposition before its final formatted response was interrupted by the account usage limit; detector findings were not supplied to A. Assessment B completed source scans and three browser overlay views. No P0/P1 global design defect was evidenced.

Fixed findings:

- `src/components/DeferredSection.tsx:20` — “Reload section” actually reloaded the portfolio; label and recovery copy now name that action accurately.
- `src/prerender.tsx:13` — no-JavaScript mobile navigation had a dead menu control and no Experience target; now has ordinary section links, a hidden JS-only toggle and verified Experience content.
- `src/components/navigation/RouteEffects.tsx:29` — deferred content above a long jump could displace the destination; bounded layout-settle correction now preserves the header offset and yields on interaction.
- `src/pages/contact/Contact.tsx:69` — no EmailJS configuration previously left a submit path that could not deliver; direct email is now the visible alternative.
- Earlier audit fixes include48px footer controls, accessible icon names, main/skip links, reduced-motion cleanup, readable mobile summaries, and footer contrast **3.03:1 → 14.02:1**.

Impeccable source detector: zero findings across 12 global markup files. Browser injection succeeded in three fresh headless pages. Hero was clean. A grid warning on BODY was a false positive for About (computed background is plain black). A low-contrast group belonged to the existing Projects section; its decorative index numerals are intentionally low-opacity and aria-hidden, and the full-page axe run found no text-contrast violations. Its design was preserved. Detector live server/browser were stopped; no persistent human-visible overlay remains. See [overlay evidence](after/global-overlay-evidence.json) and [rule targets](after/global-overlay-detail.json).

The design review found low cognitive load, with an optional information-grouping improvement for the 14 technology labels. This is not a blocking task flow. Identity and layout remain the existing dark Work Sans/slate/indigo system. Questions skipped: the two minor actionable review findings were fixed within the already authorized scope.

## Intentionally skipped / owner checklist

- Experience timeline and Project Deck component/animation source were not rewritten. Their only global typography change is16px mobile descriptive text.
- No new theme toggle, full i18n, decorative scroll-progress effect, full SSR framework or invented hero proof. No unused palette/font was introduced.
- [ ] Configure `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, `VITE_APP_EMAILJS_PUBLIC_KEY` if you want the form; configure provider allowed origins/rate protection. Only public EmailJS configuration belongs in Vite variables.
- [ ] Supply a verified phone/WhatsApp number if desired; absent links stay hidden.
- [ ] Add verified outcomes/testimonials if you want stronger hero proof. None were invented.
- [ ] Keep `src/data/profileFallback.ts` current with CMS identity/background. Existing project/timeline snapshots also need updating when their CMS content changes.
- [ ] Complete project metadata and timeline descriptions as listed in the existing section documentation; this global task does not change their schema/content.
- [ ] Verify physical iOS Safari and repeat Lighthouse on deployed hosting. Confirm robots/OG/404 responses after deployment. Sanity preview-origin 403 is an existing CORS configuration issue; only add trusted preview origins if needed.

## Commits

- `db0850b` Improve navigation and keyboard orientation
- `65bff64` Keep profile and contact usable during failures
- `026895c` Defer heavy sections and self-host the existing font
- `cd23db4` Polish section navigation and contact recovery
- `2462129` Render a static first paint and complete sharing metadata
- Final audit commit contains this report, reproducible scripts and representative screenshots.
