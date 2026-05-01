/**
 * Vite plugin — generates /sitemap.xml from src/lib/site-routes.ts at build
 * time and writes it into the output directory (dist/).  Also refreshes
 * public/sitemap.xml so the dev-server always returns a current copy.
 *
 * Single source of truth: src/lib/site-routes.ts  ← edit routes there only.
 */
import type { Plugin } from "vite";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://pathwayacademyzone.co.uk";

interface SiteRoute {
  path: string;
  changefreq: string;
  priority: number;
  lastmod?: string;
}

function buildXml(routes: SiteRoute[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) => {
      const loc = `${SITE_URL}${r.path}`;
      const lastmod = r.lastmod ?? today;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${r.changefreq}</changefreq>`,
        `    <priority>${r.priority.toFixed(2)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

export function sitemapPlugin(rootDir: string): Plugin {
  return {
    name: "vite-plugin-sitemap",
    apply: "build",

    closeBundle() {
      // Import routes at plugin execution time (Node / CommonJS context).
      // We use a dynamic require via jiti so the ESM TypeScript source
      // is transpiled on-the-fly without needing a separate build step.
      let allRoutes: SiteRoute[] = [];
      try {
        // jiti is bundled with Vite so is always available.
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const jiti = require("jiti")(rootDir, { interopDefault: true });
        const mod = jiti(resolve(rootDir, "src/lib/site-routes.ts"));
        allRoutes = (mod.getAllRoutes?.() ?? []) as SiteRoute[];
      } catch {
        // Fallback: inline static list so the build never fails silently.
        console.warn("sitemap plugin: could not load site-routes.ts via jiti — using inline fallback");
        const today = new Date().toISOString().slice(0, 10);
        const STATIC: SiteRoute[] = [
          { path: "/",                                        changefreq: "weekly",  priority: 1.0 },
          { path: "/about",                                   changefreq: "monthly", priority: 0.8 },
          { path: "/team",                                    changefreq: "monthly", priority: 0.7 },
          { path: "/programmes",                              changefreq: "monthly", priority: 0.9 },
          { path: "/referral",                                changefreq: "monthly", priority: 0.9 },
          { path: "/safeguarding",                            changefreq: "monthly", priority: 0.8 },
          { path: "/outcomes",                                changefreq: "monthly", priority: 0.8 },
          { path: "/partners",                                changefreq: "monthly", priority: 0.7 },
          { path: "/centres",                                 changefreq: "monthly", priority: 0.7 },
          { path: "/policies",                                changefreq: "monthly", priority: 0.6 },
          { path: "/careers",                                 changefreq: "weekly",  priority: 0.7 },
          { path: "/contact",                                 changefreq: "monthly", priority: 0.8 },
          { path: "/faqs",                                    changefreq: "monthly", priority: 0.7 },
          { path: "/testimonials",                            changefreq: "monthly", priority: 0.7 },
          { path: "/blog",                                    changefreq: "weekly",  priority: 0.75 },
          { path: "/news",                                    changefreq: "weekly",  priority: 0.7 },
          { path: "/search",                                  changefreq: "monthly", priority: 0.5 },
          { path: "/knowledge-hub",                           changefreq: "weekly",  priority: 0.9 },
          { path: "/knowledge-hub/complete-guide",            changefreq: "monthly", priority: 0.95 },
          { path: "/knowledge-hub/glossary",                  changefreq: "monthly", priority: 0.8 },
          { path: "/knowledge-hub/core-guides",               changefreq: "monthly", priority: 0.8 },
          { path: "/knowledge-hub/comparisons",               changefreq: "monthly", priority: 0.8 },
          { path: "/knowledge-hub/best-practice",             changefreq: "monthly", priority: 0.8 },
          { path: "/knowledge-hub/guides/what-is-alternative-provision", changefreq: "monthly", priority: 0.85 },
          { path: "/knowledge-hub/guides/how-ap-works-staffordshire",    changefreq: "monthly", priority: 0.85 },
          { path: "/knowledge-hub/guides/high-quality-ap-provider",      changefreq: "monthly", priority: 0.85 },
          { path: "/knowledge-hub/guides/when-to-refer",                 changefreq: "monthly", priority: 0.85 },
          { path: "/knowledge-hub/guides/academic-vs-vocational",        changefreq: "monthly", priority: 0.85 },
          { path: "/knowledge-hub/comparisons/ap-vs-mainstream",         changefreq: "monthly", priority: 0.80 },
          { path: "/knowledge-hub/comparisons/group-vs-one-to-one",      changefreq: "monthly", priority: 0.80 },
          { path: "/knowledge-hub/comparisons/short-vs-long-term",       changefreq: "monthly", priority: 0.80 },
          { path: "/knowledge-hub/comparisons/onsite-vs-offsite",        changefreq: "monthly", priority: 0.80 },
          { path: "/knowledge-hub/best-practice/semh-pathways",          changefreq: "monthly", priority: 0.80 },
          { path: "/knowledge-hub/best-practice/attendance-strategies",  changefreq: "monthly", priority: 0.80 },
          { path: "/knowledge-hub/best-practice/vocational-routes",      changefreq: "monthly", priority: 0.80 },
          { path: "/knowledge-hub/best-practice/post-16-progression",    changefreq: "monthly", priority: 0.80 },
        ];
        const AREA_SLUGS = [
          "stoke-on-trent", "newcastle-under-lyme", "stafford", "cannock",
          "lichfield", "tamworth", "wolverhampton", "leek",
        ];
        allRoutes = [
          ...STATIC,
          ...AREA_SLUGS.map((slug) => ({
            path: `/alternative-provision/${slug}`,
            changefreq: "monthly",
            priority: slug === "stoke-on-trent" ? 0.9 : 0.85,
            lastmod: today,
          })),
        ];
      }

      const xml = buildXml(allRoutes);

      const distDir = resolve(rootDir, "dist");
      try {
        mkdirSync(distDir, { recursive: true });
        writeFileSync(resolve(distDir, "sitemap.xml"), xml, "utf-8");
        console.log(`✓ sitemap.xml written to dist/ (${allRoutes.length} URLs)`);
      } catch (e) {
        console.warn("sitemap plugin: could not write dist/sitemap.xml", e);
      }

      const publicDir = resolve(rootDir, "public");
      try {
        writeFileSync(resolve(publicDir, "sitemap.xml"), xml, "utf-8");
        console.log(`✓ sitemap.xml refreshed in public/`);
      } catch (e) {
        console.warn("sitemap plugin: could not refresh public/sitemap.xml", e);
      }
    },
  };
}
