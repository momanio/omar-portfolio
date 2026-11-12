# Reproduce the UX measurements

Run from the repository root. Tooling is deliberately outside production dependencies.

```sh
npm install --prefix /tmp/portfolio-audit-tools playwright lighthouse@13.6.0 @axe-core/playwright
npx --prefix /tmp/portfolio-audit-tools playwright install chromium
npm run build
npm run preview -- --port 4173 --strictPort
```

In another terminal, run these **sequentially** (especially Lighthouse; avoid competing browser/build jobs):

```sh
node scripts/audit/browser.mjs after
node scripts/audit/regressions.mjs
node scripts/audit/supplement.mjs
node scripts/audit/lighthouse.mjs after
```

`AUDIT_TOOLS_DIR` can override `/tmp/portfolio-audit-tools`. `CHROME_PATH` can select a specific executable. The recorded before/after run used `/home/omar/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome`, not the separately installed Playwright version's default browser. Keep browser/Lighthouse versions identical for comparisons.

Results go to `/tmp/portfolio-ux-audit/after`. The browser script also accepts `before`; run it on a separate baseline checkout/build. The strict regression script targets the final UI. Successful CMS tests fetch actual public Sanity data outside the page and replay it because the local preview origin is not allowed by the project's existing Sanity CORS configuration. Lighthouse adds 350ms response delay. Failure/slow/raw-origin scenarios are separately recorded. No CMS writes or email deliveries occur.

## Contact fixture

Build a separate fixture using fake public configuration; do not replace `dist` or real `.env`:

```sh
VITE_APP_EMAILJS_SERVICE_ID=fixture VITE_APP_EMAILJS_TEMPLATE_ID=fixture VITE_APP_EMAILJS_PUBLIC_KEY=fixture npx vite build --outDir /tmp/portfolio-contact-fixture
npm run preview -- --outDir /tmp/portfolio-contact-fixture --port 4175 --strictPort
```

Then `node scripts/audit/contact.mjs`. All EmailJS requests are intercepted. It asserts validation/focus, success/failure, retained drafts, honeypot and input sizing. Stop both preview processes with Ctrl+C when finished.

See `docs/ux-audit/before.md` and `after.md` for methods, screenshots and known limits. Baseline-only scripts and full machine evidence are also included in the local artifact archive.

## Mobile project shelf follow-up

Run `node scripts/audit/mobile-project-shelf.mjs` against the production preview on 4173. It checks compact/desktop widths, accessibility, navigation controls, case-study history/focus, reduced motion, breakpoint cleanup, and synthesized horizontal/vertical touch gestures. See `docs/mobile-project-shelf/README.md` for results. Physical Safari remains separate device QA.
