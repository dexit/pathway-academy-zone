import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.svg', '**/*.gif', '**/*.webp', '**/*.ico'],
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api/external': {
        target: 'http://localhost:8080', // Dummy target
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/external\?url=/, ''),
        router: (req) => {
          const url = new URL(req.url || '', 'http://localhost:8080').searchParams.get('url');
          return url || '';
        }
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
