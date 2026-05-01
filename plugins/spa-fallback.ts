/**
 * Vite plugin — SPA fallback for dev server
 * Routes all 404s to index.html for client-side routing to work
 */
import type { Plugin } from "vite";
import type { ViteDevServer } from "vite";

export function spaFallbackPlugin(rootDir: string): Plugin {
  let server: ViteDevServer;

  return {
    name: "vite-plugin-spa-fallback",
    apply: "serve",
    configureServer(devServer) {
      server = devServer;
      // Return middleware that runs BEFORE other middlewares
      return () => {
        devServer.middlewares.use((req, res, next) => {
          // Allow all static assets, API routes, and special paths to pass through
          if (
            !req.url ||
            req.url.startsWith("/api") ||
            req.url.startsWith("/@") ||
            req.url.startsWith("/__") ||
            req.url === "/favicon.ico" ||
            req.url === "/robots.txt" ||
            req.url === "/sitemap.xml" ||
            // Allow manifest and other common manifest files
            req.url === "/manifest.json" ||
            // Allow requests with file extensions (assets)
            /\.[a-zA-Z0-9]+$/.test(req.url)
          ) {
            return next();
          }

          // For all other requests (routes without extensions), serve index.html
          // This allows React Router to handle the routing on the client
          req.url = "/index.html";
          next();
        });
      };
    },
  };
}

