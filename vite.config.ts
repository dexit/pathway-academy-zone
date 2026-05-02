import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sitemapPlugin } from "./plugins/sitemap";
import { rssPlugin } from "./plugins/rss";
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
    // Chunk size warning limit (500KB is reasonable for modern SPAs)
    chunkSizeWarningLimit: 500,
    // Source maps for production debugging
    sourcemap: false,
    // Ensure all routes fallback to index.html for SPA
    rollupOptions: {
      output: {
        // Ensures build is optimized for SPA deployment
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        // Smart code splitting for better caching and parallelization
        manualChunks(id) {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('@react')) {
              return 'vendor-react';
            }
            // Router and state management
            if (id.includes('react-router') || id.includes('zustand') || id.includes('jotai')) {
              return 'vendor-routing';
            }
            // UI framework
            if (id.includes('@radix-ui') || id.includes('lucide') || id.includes('clsx')) {
              return 'vendor-ui';
            }
            // Utils and other dependencies
            return 'vendor-other';
          }
        },
      },
    },
    // Optimize module preload
    modulePreload: {
      polyfill: false,
    },
  },
  // Preview mode (local production testing) should also handle SPA routing
  preview: {
    host: "::",
    port: 8080,
  },
}));

