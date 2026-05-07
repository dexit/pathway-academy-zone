import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sitemapPlugin } from "./plugins/sitemap";
import { rssPlugin } from "./plugins/rss";
import { wpCopyPlugin } from "./plugins/wp-copy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.svg', '**/*.gif', '**/*.webp', '**/*.ico'],
  server: {
    host: "::",
    port: 8080,
    strictPort: false,
    hmr: {
      overlay: false,
    },
    // Proper SPA fallback for dev server — Vite's native approach
    middlewareMode: false,
  },
  plugins: [
    react(),
    // Generates /sitemap.xml from route config at build time.
    // Also refreshes public/sitemap.xml so the dev-server is current.
    sitemapPlugin(__dirname),
    rssPlugin(__dirname),
    wpCopyPlugin(__dirname),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Output directory for static build
    outDir: 'dist',
    // Clear output directory before build
    emptyOutDir: true,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Ensure all routes fallback to index.html for SPA
    rollupOptions: {
      output: {
        // Ensures build is optimized for SPA deployment
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  // Preview mode (local production testing) should also handle SPA routing
  preview: {
    host: "::",
    port: 4173,
    strictPort: false,
  },
}));

