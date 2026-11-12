# Omar Portfolio

A headless CMS modern, responsive, and feature-rich portfolio showcasing your skills and projects. Built with cutting-edge web technologies, this portfolio is designed to leave a lasting impression.

Features
Frameworks & Libraries:

Built with React and TypeScript for robust and scalable development.
Bundled using Vite for fast build times and optimized performance.
Styling:

Styled with TailwindCSS for a clean, modern, and responsive design.
Animations:

Smooth transitions and engaging animations powered by GSAP.
Content Management:

Integrated with Sanity CMS for dynamic project and easy updates.
State Management:

Leveraging Zustand for efficient and minimal state management.
Contact Form:

Seamlessly integrates EmailJS for functional and secure contact forms.
Performance Optimization:

Fully optimized for performance and fast load times.

- 🌐 Visit the live site: [omarmomani.is-a.dev/](https://omarmomani.is-a.dev)

## Local development

The portfolio and Sanity Studio live in this repository as separate npm packages,
each with its own lockfile. Install both on a fresh checkout:

```sh
npm ci
npm --prefix studio ci
```

Use Node.js 22.13+ (22.x), or Node.js 24 or newer, for the Studio and its tooling.

Run these in separate terminals:

```sh
npm run dev
npm run studio:dev
```

The portfolio runs at http://localhost:5173 and Studio at http://localhost:3333.
Both use Sanity project `cnwn4pjq`, dataset `production`, by default. Moving Studio
into this repository does not move or duplicate the content stored in Sanity.

Validate both packages before submitting changes:

```sh
npm run lint
npm run build
npm run studio:lint
npm run studio:typecheck
npm run studio:build
```

See [studio/README.md](studio/README.md) for content editing and Studio deployment.
