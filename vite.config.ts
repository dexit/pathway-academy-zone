import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sitemapPlugin } from "./plugins/sitemap";
import { wpCopyPlugin } from "./plugins/wp-copy";
import { spaFallbackPlugin } from "./plugins/spa-fallback";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.svg', '**/*.gif', '**/*.webp', '**/*.ico'],
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // SPA fallback middleware for dev server
    spaFallbackPlugin(__dirname),
    // Generates /sitemap.xml from route config at build time.
    // Also refreshes public/sitemap.xml so the dev-server is current.
    sitemapPlugin(__dirname),
    wpCopyPlugin(__dirname),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure all routes fallback to index.html for SPA
    rollupOptions: {
      output: {
        // Ensures build is optimized for SPA deployment
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
  // Preview mode (local production testing) should also handle SPA routing
  preview: {
    host: "::",
    port: 8080,
  },
}));
