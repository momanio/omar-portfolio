# Portfolio UX audit — before changes

Audited the unchanged production build using `npm run build` and `npm run preview` on 2026-11-12. Baseline commit: `2c834cc`. The existing Experience/Projects work is not part of this global redesign scope.

## Method and limits

- Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/148.0.0.0 Safari/537.36 (existing installed binary), Lighthouse 13.6.0. Mobile: 390×844, simulated Lighthouse mobile throttling; desktop: 1440×900 with desktop settings. Single runs; results are comparative lab measurements, not field Core Web Vitals.
- Browser/axe sweep: 360×740, 390×844, 768×1024, 1280×800, 1440×900. All six sections, root/full-page views, all seven project hash dialogs, and the unmatched route captured.
- Successful CMS tests replay the actual public Sanity GET responses inside Playwright because the existing preview origin receives HTTP 403 under current CORS settings. Lighthouse uses the same public responses with a documented 350ms delivery delay. No CMS data or settings changed. Raw-origin, seven-second CMS delay, failure, and slow-4G scenarios were tested separately.
- Slow 4G: 150ms latency, 1.6Mbps download, 750Kbps upload, 4× CPU slowdown.
- INP requires real interactions/field collection; Lighthouse TBT is recorded as a lab responsiveness diagnostic, not relabelled INP.
- WebKit downloaded, but cannot launch without libavif16/libmanette. Actual iOS Safari address-bar collapse, safe-area hardware values and rubber-band behavior remain device-QA items; Chromium emulation/code inspection are not represented as physical Safari testing.

## Lighthouse baseline

| Mode | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT | Initial JS transfer | Font transfer | Initial image transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| mobile | 51 | 96 | 96 | 92 | 2.53s | 4.94s | 0.00000 | 1462ms | 238.8KB | 51.1KB | 0.0KB |
| desktop | 85 | 96 | 96 | 92 | 0.62s | 1.21s | 0.00006 | 264ms | 238.8KB | 51.1KB | 0.0KB |

The built main chunk is 651.55KB raw / 222.34KB gzip. Initial LCP is text; the logo is inlined, so zero initial network image transfer does not mean the page has no imagery. Below-fold project images already use responsive Sanity URLs and explicit dimensions; those designs should be preserved.

## Prioritized findings

No data-loss/security-critical issue was established by this UX audit. High items block orientation, loading resilience, accessibility or the performance target.

| Priority | Finding and evidence | Affected viewports/scenario | Proposed fix |
|---|---|---|---|
| High | Mobile Performance 51; LCP 4.94s; TBT 1,462ms; initial JS 238.8KB transfer. Main chunk 651.55KB raw. | Mobile Lighthouse; desktop TBT 264ms | Split below-fold sections and heavy libraries; remove unused global motion; keep critical text visible immediately. |
| High | At 700ms CMS delay, identity/about are loading-only; failed and raw-origin cases settle to Error loading hero/About. | 390×844 slow/failure; preview CORS403 | Verified local profile fallback, bounded background retry, stable loading placeholders, no raw error surface. |
| High | All four desktop section links are clickable li elements absent from the tab sequence. Mobile toggle is30×30px; menu remains open after ESC and allows focus/body scroll behind it. | All desktop sizes;390×844 mobile-menu capture | Native anchors; stable header; native modal mobile navigation with trap/ESC/scroll lock and route-close. |
| High | Axe reports serious link-name (four footer links) and svg-img-alt (technology icons); zero main landmarks at every size; no skip link. | All five sizes | Named44px controls, decorative SVG hiding plus visible technology labels, main landmark/skip link/global focus. |
| High | Nine animations still run with prefers-reduced-motion; global Framer entrances can hide section content. | 390×844 reduced-motion | Remove global looping/deferred entrances; preserve static variants of the existing GSAP sections. |
| High | Unmatched route renders a blank body. | All five /__audit_missing captures | Accessible404 plus an error boundary and route-focus management. |
| High | Hero only offers View Projects/About; no visible hire/contact action there or persistent CTA. Contact has no direct email/social path or copy control, no inline validation/announced result. | All sizes;390px hero/contact captures | Dominant hire CTA, persistent contact access, direct verified contact links, copy feedback and short accessible form. |
| Medium | SEO92: robots.txt returns HTML with49 parse errors. OG/manifest/apple-icon paths return index HTML locally; live OG image returns404. Charset audit fails (Best Practices96). | All routes/crawlers/link previews | Real robots/sitemap/manifest/favicons/1200×630 OG asset, charset, verified metadata/Person JSON-LD, modest static critical shell. |
| Medium | Initial HTML root is empty; no identity/contact text for JS-disabled rendering. H1 depends on CMS and fade-in. | First paint/crawlers/slow4G | Build a low-risk static critical shell using the same React header/hero and verified snapshot; explain snapshot freshness and hash-preview limits. |
| Medium | External font stylesheet requests three font families although Work Sans is used;51.1KB initial font transfer. | All first visits | One self-hosted Latin Work Sans variable subset, preload, swap and fixed line geometry. |
| Medium | Footer gray text measures 3.03:1 against gray-800; mobile project/timeline summaries are14px. | Mobile reading/footer | Correct text tokens;16px mobile body/input text, preserving existing card composition. |
| Low | No overflow at five measured sizes, CLS already0 mobile/0.000057desktop; screenshot images already lazy/responsive. | All tested sizes | Preserve these strengths; broaden regression widths320–1920 rather than redesigning working sections. |

## Evidence

- Machine-readable browser results: [browser.json](before/browser.json).
- Lighthouse metrics and failing-audit details: [lighthouse-summary.json](before/lighthouse-summary.json).
- Menu, type/contrast and image-transfer supplement: [supplement.json](before/supplement.json).
- Complete screenshots, Lighthouse HTML/JSON and scenario captures are archived in `artifacts/ux-audit.zip` (download archive supplied with final results).

## Scope and implementation order

1. Preserve baseline commit `2c834cc` (Experience/Project Deck already committed).
2. Navigation/orientation and accessible landmarks.
3. Critical loading, verified profile fallback, form/contact resilience.
4. Code splitting, fonts and static first-paint shell; retain the dark visual identity.
5. Metadata/assets and404/error paths.
6. Re-run identical measurements, keyboard/failure tests, final guideline/Impeccable review, then commit evidence/results.

No code changes were made before these measurements. Audit tooling was installed in `/tmp/portfolio-audit-tools`; it adds no production dependency.

Full-scroll screenshot image transfer at 390px: **72.9KB** across 13 requested images, measured with CDP encoded-data events. No image rewrite is justified.
