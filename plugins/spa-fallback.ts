/**
 * Vite plugin — SPA fallback for dev server
 * Routes all 404s to index.html for client-side routing to work
 */
import type { Plugin } from "vite";
import type { ViteDevServer } from "vite";
import { createReadStream } from "fs";
import { resolve } from "path";

export function spaFallbackPlugin(rootDir: string): Plugin {
  let server: ViteDevServer;

  return {
    name: "vite-plugin-spa-fallback",
    apply: "serve",
    configureServer(devServer) {
      server = devServer;
      return () => {
        // Return middleware AFTER all other middlewares
        devServer.middlewares.use((req, res, next) => {
          // Skip if request is for static assets or API routes
          if (
            !req.url ||
            req.url.startsWith("/api") ||
            req.url.startsWith("/@") ||
            req.url.startsWith("/__") ||
            req.url.includes(".") ||
            req.url === "/favicon.ico" ||
            req.url === "/robots.txt" ||
            req.url === "/sitemap.xml"
          ) {
            return next();
          }

          // For all other requests, serve index.html
          // This allows React Router to handle the routing on the client
          req.url = "/index.html";
          next();
        });
      };
    },
  };
}
