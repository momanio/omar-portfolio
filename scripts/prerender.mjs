import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { createServer as createHttpServer } from "node:http";

// Attach Vite’s internal transport to an inert server: the build opens no network port.
const transport = createHttpServer();
const server = await createServer({
  server: { middlewareMode: true, hmr: { server: transport }, watch: null },
  optimizeDeps: { noDiscovery: true, include: [], entries: [] },
  appType: "custom",
  logLevel: "error",
});
try {
  const { renderCriticalShell, renderStudies } = await server.ssrLoadModule("/src/prerender.tsx");
  const template = await readFile("dist/index.html", "utf8");
  if (!template.includes('<div id="root"></div>')) throw new Error("Static-shell insertion point was not found");
  await writeFile("dist/index.html", template.replace('<div id="root"></div>', `<div id="root">${renderCriticalShell()}</div>`));
  const missing = template.replace('<div id="root"></div>', `<div id="root">${renderCriticalShell(true)}</div>`).replace(/<title>[\s\S]*?<\/title>/, "<title>Page not found — Omar Momani</title>").replace('<meta name="robots" content="index,follow" />', '<meta name="robots" content="noindex,follow" />');
  await writeFile("dist/404.html", missing);
  const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  for (const { path, html, meta } of await renderStudies()) {
    const head = template.replace(/<title>.*?<\/title>/, () => `<title>${escape(meta.title)}</title>`)
      .replace(/<link rel="canonical" href="[^"]*"/, () => `<link rel="canonical" href="${meta.url}"`)
      .replace(/<meta (name|property)="([^"]+)" content="[^"]*" \/>/g, (tag, attr, key) => {
        const value = (attr === "name" ? meta.names : meta.properties)[key];
        return value === undefined ? tag : `<meta ${attr}="${key}" content="${escape(value)}" />`;
      });
    await mkdir(`dist${path}`, { recursive: true });
    await writeFile(`dist${path}index.html`, head.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`));
  }
  console.log("Rendered homepage, featured case studies, and 404 page.");
} finally { await server.close(); }
