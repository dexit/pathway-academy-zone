/**
 * Vite plugin — after production build, copy the dist/ output into the local
 * wpsys/wp-content/uploads/paz-spa/ directory so WordPress can iframe it.
 *
 * Only runs when COPY_TO_WP=1 is set, or the wp-copy flag is passed.
 * This keeps regular Vercel/CI builds fast.
 *
 * Usage:
 *   COPY_TO_WP=1 npm run build
 *   npm run build:wp
 */
import type { Plugin } from "vite"
import { cpSync, mkdirSync, existsSync } from "fs"
import { resolve } from "path"

export function wpCopyPlugin(rootDir: string): Plugin {
  return {
    name: "paz:wp-copy",
    apply: "build",
    closeBundle() {
      if (!process.env.COPY_TO_WP && process.env.npm_lifecycle_script?.includes("build:wp") === false) {
        // Only run when explicitly requested
        const isBuildWp =
          process.env.COPY_TO_WP === "1" ||
          process.argv.includes("--wp") ||
          process.env.npm_lifecycle_event === "build:wp"
        if (!isBuildWp) return
      }

      const src  = resolve(rootDir, "dist")
      const dest = resolve(rootDir, "wpsys/wp-content/uploads/paz-spa")

      if (!existsSync(src)) {
        console.warn("[paz:wp-copy] dist/ not found — skipping WP copy")
        return
      }

      mkdirSync(dest, { recursive: true })
      cpSync(src, dest, { recursive: true, force: true })
      console.log(`\n✓ [paz:wp-copy] Copied dist/ → wpsys/wp-content/uploads/paz-spa/\n`)
    },
  }
}
