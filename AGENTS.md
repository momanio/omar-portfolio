# Repository Guidelines

## Project Structure & Module Organization

This portfolio uses React, TypeScript, Vite, and Tailwind CSS. `src/main.tsx` initializes React and the React Query provider; `src/App.tsx` defines routing.

- `src/pages/`: portfolio sections, grouped into lowercase directories such as `projects/` and `contact/`.
- `src/components/` and `src/layouts/`: reusable UI and layout components.
- `src/hooks/`, `src/services/`, and `src/sanity/`: content queries, service functions, and the Sanity client.
- `src/store/`: Zustand stores; `src/types/`: shared TypeScript models.
- `src/assets/`: imported images, logos, and icons; `public/`: directly served static files.
- `src/utils/` and `src/constants/`: shared helpers and constants.

`dist/` is generated build output. No automated test directory currently exists.

## Build, Test, and Development Commands

- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server.
- `npm run build`: run TypeScript project checks and generate `dist/`.
- `npm run lint`: run ESLint, including TypeScript, React Hooks, and React Refresh rules.
- `npm run preview`: serve the production build locally after building.

## Coding Style & Naming Conventions

Use two-space indentation, double quotes, and semicolons in application TypeScript. Match surrounding formatting when editing configuration files. TypeScript strict mode is enabled; give shared data explicit types in `src/types/`.

Use PascalCase for components and component filenames (`ProjectDetails.tsx`), camelCase for functions and variables, and `use` prefixes for hooks (`useProjects.ts`). Existing import aliases include `@/`, `@components/`, `@hooks/`, and `@utils/`. Prefer Tailwind utilities for styling. ESLint is configured; no dedicated formatter is configured.

## Testing Guidelines

No test runner, `npm test` script, or coverage threshold is configured. Run lint and build before submitting changes. Manually verify affected sections, mobile and desktop layouts, navigation, project details, and contact-form validation. Describe checks and any failures in the pull request.

## Commit & Pull Request Guidelines

History uses short, descriptive subjects such as `Improve SEO` and `Fix nav issue`; no consistent Conventional Commits prefix is used. Keep commits focused. Pull requests should explain the change, link relevant issues, record verification results, and include screenshots for visual changes.

## Configuration & Security

Use an ignored `.env` file for local configuration. Sanity reads `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and `VITE_SANITY_API_VERSION`. Contact submission requires `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, and `VITE_APP_EMAILJS_PUBLIC_KEY`. Vite exposes `VITE_` values to browsers; never place private credentials in them.
