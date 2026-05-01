/**
 * Single source of truth for every URL this site exposes.
 * Used by:
 *   - App.tsx  (React Router route declarations)
 *   - vite.config.ts plugin  (generates /sitemap.xml at build time)
 *
 * changefreq / priority follow sitemaps.org spec.
 */

export interface SiteRoute {
  path: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  lastmod?: string; // ISO date — defaults to build date if omitted
}

const TODAY = new Date().toISOString().slice(0, 10);

// ─── Static routes ────────────────────────────────────────────────────────────
export const STATIC_ROUTES: SiteRoute[] = [
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
];

// ─── Knowledge Hub guides (resolved dynamic routes) ───────────────────────────
export const KNOWLEDGE_HUB_GUIDES: SiteRoute[] = [
  // Core guides
  { path: "/knowledge-hub/guides/what-is-alternative-provision", changefreq: "monthly", priority: 0.85 },
  { path: "/knowledge-hub/guides/how-ap-works-staffordshire",    changefreq: "monthly", priority: 0.85 },
  { path: "/knowledge-hub/guides/high-quality-ap-provider",      changefreq: "monthly", priority: 0.85 },
  { path: "/knowledge-hub/guides/when-to-refer",                 changefreq: "monthly", priority: 0.85 },
  { path: "/knowledge-hub/guides/academic-vs-vocational",        changefreq: "monthly", priority: 0.85 },
  // Comparisons
  { path: "/knowledge-hub/comparisons/ap-vs-mainstream",         changefreq: "monthly", priority: 0.80 },
  { path: "/knowledge-hub/comparisons/group-vs-one-to-one",      changefreq: "monthly", priority: 0.80 },
  { path: "/knowledge-hub/comparisons/short-vs-long-term",       changefreq: "monthly", priority: 0.80 },
  { path: "/knowledge-hub/comparisons/onsite-vs-offsite",        changefreq: "monthly", priority: 0.80 },
  // Best practice
  { path: "/knowledge-hub/best-practice/semh-pathways",          changefreq: "monthly", priority: 0.80 },
  { path: "/knowledge-hub/best-practice/attendance-strategies",  changefreq: "monthly", priority: 0.80 },
  { path: "/knowledge-hub/best-practice/vocational-routes",      changefreq: "monthly", priority: 0.80 },
  { path: "/knowledge-hub/best-practice/post-16-progression",    changefreq: "monthly", priority: 0.80 },
];

// ─── Area lead-capture pages ──────────────────────────────────────────────────
export const AREA_SLUGS = [
  "stoke-on-trent",
  "newcastle-under-lyme",
  "stafford",
  "cannock",
  "lichfield",
  "tamworth",
  "wolverhampton",
  "leek",
] as const;

export type AreaSlug = typeof AREA_SLUGS[number];

export const AREA_ROUTES: SiteRoute[] = AREA_SLUGS.map((slug) => ({
  path: `/alternative-provision/${slug}`,
  changefreq: "monthly" as const,
  priority: slug === "stoke-on-trent" ? 0.9 : 0.85,
}));

// ─── All routes combined ──────────────────────────────────────────────────────
export function getAllRoutes(): SiteRoute[] {
  return [
    ...STATIC_ROUTES,
    ...KNOWLEDGE_HUB_GUIDES,
    ...AREA_ROUTES,
  ].map((r) => ({ ...r, lastmod: r.lastmod ?? TODAY }));
}
