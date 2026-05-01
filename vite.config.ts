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
        // Optimized code splitting that respects dependency chains
        manualChunks: {
          // Keep React core and JSX runtime together
          'vendor-react': ['react', 'react-dom', 'react/jsx-runtime'],
          // Route handling together
          'vendor-router': ['react-router-dom'],
          // UI components library
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-slot',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
          ].filter(pkg => {
            try {
              require.resolve(pkg);
              return true;
            } catch {
              return false;
            }
          }),
        },
      },
    },
  },
  // Preview mode (local production testing) should also handle SPA routing
  preview: {
    host: "::",
    port: 8080,
  },
}));

