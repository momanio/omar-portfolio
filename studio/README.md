# Portfolio Sanity Studio

This package manages the portfolio's content in Sanity project `cnwn4pjq`, dataset
`production`. Content stays in Sanity's hosted Content Lake; this directory contains
the editor configuration and schemas.

Use Node.js 22.13+ (22.x), or Node.js 24 or newer. From the repository root:

```sh
npm --prefix studio ci
npm run studio:dev
```

Open http://localhost:3333 and sign in with a Sanity account that has access to the
project. Run the portfolio separately with `npm run dev`.

## Content

- **Hero:** first name, last name, and job title.
- **About:** heading and body text.
- **Experience:** work or education, organization, dates, current status, logo,
  description, technologies, and link.
- **Projects:** title, slug, publication date, thumbnail, full-page screenshot,
  gallery, summary, year, role, highlights, body, tags, technologies, URLs, accent
  color, display order, and featured status.

Existing field names (`StartDate`, `EndDate`, `icon`, `image`, and `projectUrl`) are
retained so existing content and the portfolio queries continue working. Newly
added fields are optional. If Summary is empty, the portfolio uses Body.

The portfolio's `VITE_SANITY_*` environment variables configure only the portfolio.
If you change its project or dataset, also update `sanity.config.ts` and
`sanity.cli.ts` here to keep Studio connected to the same content.

## Checks and deployment

From this directory:

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

The build writes to `studio/dist`; `npm run preview` previews that build locally
(or use `npm run studio:preview` from the repository root). `npm start` is an alias
for the same preview command.
The repository ignores Studio dependencies, build output, and generated `.sanity`
files. Studio has its own ESLint configuration; the portfolio's lint command
checks the portfolio separately.

To publish the Studio to Sanity hosting, run `npm run deploy` from this directory
and follow the CLI prompts. Deploying the portfolio does not deploy Studio.
Auto-updates remain enabled in `sanity.cli.ts`.

Sanity CLI currently pulls in `@vercel/frameworks` with pinned older YAML and TOML
parsers. The overrides in `package.json` select patched releases within the same
major versions. The remaining npm audit findings come from transitive
`minimatch` 10 dependencies in the CLI and lint tooling. Its patched v11 changes
the public API, so do not force a global v11 override or run
`npm audit fix --force`; update the parent packages when compatible fixes land.

The existing portfolio document types validate against these schemas. The dataset
also contains a legacy `post` document, which has no schema in this copied Studio
and is not used by the portfolio. Validation reports it as an unknown-type warning;
restore its original schema if you want to edit that document here.

If Sanity reports an origin error, review the project's API CORS settings in
[Sanity Manage](https://www.sanity.io/manage). Studio needs a credential-enabled
origin for its actual URL, including `http://localhost:3333` for development.
The portfolio's local origins `http://localhost:5173` and `http://localhost:4173`
are also registered, without credentials, so it can read published content.
