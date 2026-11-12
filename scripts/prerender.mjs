import { readFile, writeFile } from "node:fs/promises";
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
  const { renderCriticalShell } = await server.ssrLoadModule("/src/prerender.tsx");
  const template = await readFile("dist/index.html", "utf8");
  if (!template.includes('<div id="root"></div>')) throw new Error("Static-shell insertion point was not found");
  await writeFile("dist/index.html", template.replace('<div id="root"></div>', `<div id="root">${renderCriticalShell()}</div>`));
  const missing = template.replace('<div id="root"></div>', `<div id="root">${renderCriticalShell(true)}</div>`).replace(/<title>[\s\S]*?<\/title>/, "<title>Page not found — Omar Momani</title>").replace('<meta name="robots" content="index,follow" />', '<meta name="robots" content="noindex,follow" />');
  await writeFile("dist/404.html", missing);
  console.log("Rendered verified identity/contact shell and static 404 page.");
} finally { await server.close(); }
