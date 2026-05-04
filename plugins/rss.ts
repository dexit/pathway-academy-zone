/**
 * Vite plugin — generates /feed.xml (RSS 2.0 with media:content) at build time
 * from src/components/blog/blog-data.ts.  Also refreshes public/feed.xml for
 * the dev server.
 */
import type { Plugin } from "vite";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://pathwayacademyzone.co.uk";
const FEED_URL = `${SITE_URL}/feed.xml`;

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image?: string;
}

function toRfc822(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toUTCString();
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resolveImage(image: string | undefined): string {
  if (!image || image === "/placeholder.svg") return `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`;
  if (image.startsWith("http")) return image;
  return `${SITE_URL}${image}`;
}

function buildRss(posts: BlogPost[]): string {
  const now = new Date().toUTCString();
  const items = posts
    .map((p) => {
      const link = `${SITE_URL}/blog/${p.slug}`;
      const img = resolveImage(p.image);
      const pubDate = toRfc822(p.date);
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <description>${esc(p.excerpt)}</description>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <author>info@pathwayacademyzone.co.uk (${esc(p.author)})</author>`,
        `      <category>${esc(p.category)}</category>`,
        `      <media:content url="${esc(img)}" medium="image" width="1200" height="630">`,
        `        <media:title>${esc(p.title)}</media:title>`,
        `      </media:content>`,
        `      <enclosure url="${esc(img)}" type="image/png" length="0" />`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"',
    '  xmlns:media="http://search.yahoo.com/mrss/"',
    '  xmlns:atom="http://www.w3.org/2005/Atom"',
    '  xmlns:dc="http://purl.org/dc/elements/1.1/"',
    '  xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    "  <channel>",
    `    <title>Pathway Academy Zone Blog</title>`,
    `    <link>${SITE_URL}</link>`,
    `    <description>Insights, guides, and updates on Alternative Provision, SEMH support, and best practice for educators and families in the UK.</description>`,
    `    <language>en-gb</language>`,
    `    <lastBuildDate>${now}</lastBuildDate>`,
    `    <managingEditor>info@pathwayacademyzone.co.uk (Pathway Academy Zone)</managingEditor>`,
    `    <webMaster>info@pathwayacademyzone.co.uk (Pathway Academy Zone)</webMaster>`,
    `    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />`,
    `    <image>`,
    `      <url>${SITE_URL}/assets/PAZlogo-BYea4nq1.png</url>`,
    `      <title>Pathway Academy Zone Blog</title>`,
    `      <link>${SITE_URL}</link>`,
    `      <width>144</width>`,
    `      <height>144</height>`,
    `    </image>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export function rssPlugin(rootDir: string): Plugin {
  return {
    name: "vite-plugin-rss",
    apply: "build",

    closeBundle() {
      let posts: BlogPost[] = [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const jiti = require("jiti")(rootDir, { interopDefault: true });
        const mod = jiti(resolve(rootDir, "src/components/blog/blog-data.ts"));
        posts = (mod.BLOG_POSTS ?? mod.default?.BLOG_POSTS ?? []) as BlogPost[];
      } catch {
        console.warn("rss plugin: could not load blog-data.ts via jiti — using inline fallback");
        posts = [
          { slug: "what-is-alternative-provision", title: "What Is Alternative Provision? A Complete Overview for 2024", excerpt: "Alternative Provision covers education for pupils who cannot attend mainstream school.", category: "Alternative Provision", date: "12 Nov 2024", author: "Pathway Academy Zone" },
          { slug: "semh-needs-in-ap", title: "Understanding SEMH Needs in Alternative Provision Settings", excerpt: "Social, Emotional and Mental Health difficulties are among the most common reasons for AP referrals.", category: "SEMH", date: "4 Nov 2024", author: "Pathway Academy Zone" },
          { slug: "when-to-refer-a-learner", title: "When Should You Refer a Learner to Alternative Provision?", excerpt: "Knowing the right time to refer can make all the difference.", category: "Referrals", date: "28 Oct 2024", author: "Pathway Academy Zone" },
          { slug: "parents-guide-to-ap", title: "A Parent's Guide to Alternative Provision", excerpt: "If your child has been referred to Alternative Provision, this guide explains what to expect.", category: "Parents & Families", date: "21 Oct 2024", author: "Pathway Academy Zone" },
          { slug: "ap-policy-changes-2024", title: "Key Policy Changes Affecting Alternative Provision in 2024", excerpt: "Recent DfE guidance has brought significant updates to how schools commission and monitor AP placements.", category: "Policy & Legislation", date: "14 Oct 2024", author: "Pathway Academy Zone" },
          { slug: "reintegration-best-practice", title: "Best Practice for Reintegrating Pupils from AP into Mainstream", excerpt: "Successful reintegration requires careful planning, strong relationships, and clear review processes.", category: "Best Practice", date: "7 Oct 2024", author: "Pathway Academy Zone" },
          { slug: "attendance-strategies-ap", title: "Improving Attendance in Alternative Provision: Practical Strategies", excerpt: "Persistent absence is a challenge across all AP settings.", category: "Best Practice", date: "30 Sep 2024", author: "Pathway Academy Zone" },
          { slug: "vocational-routes-in-ap", title: "Vocational Routes in AP: Building Pathways to Employment", excerpt: "Vocational qualifications can transform outcomes for AP learners.", category: "Alternative Provision", date: "23 Sep 2024", author: "Pathway Academy Zone" },
        ];
      }

      const xml = buildRss(posts);

      const distDir = resolve(rootDir, "dist");
      try {
        mkdirSync(distDir, { recursive: true });
        writeFileSync(resolve(distDir, "feed.xml"), xml, "utf-8");
        console.log(`✓ feed.xml written to dist/ (${posts.length} items)`);
      } catch (e) {
        console.warn("rss plugin: could not write dist/feed.xml", e);
      }

      const publicDir = resolve(rootDir, "public");
      try {
        writeFileSync(resolve(publicDir, "feed.xml"), xml, "utf-8");
        console.log(`✓ feed.xml refreshed in public/`);
      } catch (e) {
        console.warn("rss plugin: could not refresh public/feed.xml", e);
      }
    },
  };
}
