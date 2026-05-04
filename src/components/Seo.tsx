import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const SITE_URL = "https://pathwayacademyzone.co.uk";
export const SITE_NAME = "Pathway Academy Zone";
// Branded 1200x630 social share card — works for Facebook, LinkedIn,
// Twitter/X, Pinterest, WhatsApp, iMessage, Slack, Discord previews.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-default.jpg`;
export const DEFAULT_OG_IMAGE_W = 1200;
export const DEFAULT_OG_IMAGE_H = 630;

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string;
  /** Absolute or root-relative URL. Defaults to branded OG card. */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** og:type — "website" (default) or "article" for blog/news/KB content. */
  type?: "website" | "article" | "profile";
  /** ISO date strings — used when type="article". */
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  jsonLd?: JsonLd;
  noIndex?: boolean;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(attr: "name" | "property", key: string) {
  document.head.querySelectorAll(`meta[${attr}="${key}"]`).forEach((n) => n.remove());
}

function upsertCanonical(href: string) {
  const existing = document.head.querySelectorAll('link[rel="canonical"]');
  existing.forEach((node, i) => {
    if (i > 0) node.remove();
  });
  let el = existing[0] as HTMLLinkElement | undefined;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertLink(rel: string, href: string, type?: string, title?: string) {
  const sel = type
    ? `link[rel="${rel}"][type="${type}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (type) el.setAttribute("type", type);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  if (title) el.setAttribute("title", title);
}

function injectJsonLd(id: string, data: JsonLd) {
  const existing = document.head.querySelector(`script[data-seo="${id}"]`);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo", id);
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

function absoluteUrl(u: string) {
  if (!u) return u;
  if (/^https?:\/\//i.test(u)) return u;
  return `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`;
}

function imageMimeFromUrl(u: string): string {
  const lower = u.split("?")[0].toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

export function Seo({
  title,
  description,
  canonical,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  jsonLd,
  noIndex,
}: SeoProps) {
  const { pathname } = useLocation();
  const url = canonical || `${SITE_URL}${pathname}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE);
  const ogAlt = imageAlt || `${SITE_NAME} — Alternative Provision in Stoke-on-Trent`;
  const ogW = (image ? imageWidth : DEFAULT_OG_IMAGE_W) ?? 1200;
  const ogH = (image ? imageHeight : DEFAULT_OG_IMAGE_H) ?? 630;
  const ogMime = imageMimeFromUrl(ogImage);

  useEffect(() => {
    document.title = fullTitle;
    if (description) upsertMeta("name", "description", description);
    upsertMeta(
      "name",
      "robots",
      noIndex
        ? "noindex,nofollow"
        : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    );
    upsertCanonical(url);

    // Open Graph (Facebook, LinkedIn, WhatsApp, Pinterest, iMessage, Slack)
    upsertMeta("property", "og:title", fullTitle);
    if (description) upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "en_GB");
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:secure_url", ogImage);
    upsertMeta("property", "og:image:type", ogMime);
    upsertMeta("property", "og:image:width", String(ogW));
    upsertMeta("property", "og:image:height", String(ogH));
    upsertMeta("property", "og:image:alt", ogAlt);

    // Article-specific OG (blog / news / knowledge hub)
    if (type === "article") {
      if (publishedTime) upsertMeta("property", "article:published_time", publishedTime);
      if (modifiedTime) upsertMeta("property", "article:modified_time", modifiedTime);
      if (author) upsertMeta("property", "article:author", author);
      if (section) upsertMeta("property", "article:section", section);
      // Clear stale tags then add new ones
      document.head.querySelectorAll('meta[property="article:tag"]').forEach((n) => n.remove());
      (tags || []).forEach((t) => {
        const m = document.createElement("meta");
        m.setAttribute("property", "article:tag");
        m.setAttribute("content", t);
        document.head.appendChild(m);
      });
    } else {
      removeMeta("property", "article:published_time");
      removeMeta("property", "article:modified_time");
      removeMeta("property", "article:author");
      removeMeta("property", "article:section");
      document.head.querySelectorAll('meta[property="article:tag"]').forEach((n) => n.remove());
    }

    // Twitter / X
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", "@PathwayAcademyZ");
    upsertMeta("name", "twitter:creator", "@PathwayAcademyZ");
    upsertMeta("name", "twitter:title", fullTitle);
    if (description) upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);
    upsertMeta("name", "twitter:image:alt", ogAlt);
    upsertMeta("name", "twitter:domain", "pathwayacademyzone.co.uk");
    upsertMeta("name", "twitter:url", url);

    // Pinterest rich pin description (uses og:description) + verification hint
    upsertMeta("name", "pinterest-rich-pin", "true");

    // Instagram / generic — uses og:* (Instagram itself does not unfurl URLs in
    // posts, but Stories/DM previews and link-in-bio tools read OG tags.)
    upsertMeta("property", "og:image:url", ogImage);

    // oEmbed discovery — lets Facebook, WordPress, Discord, Slack and others
    // request a richer rendering. Static endpoint at /oembed.json.
    upsertLink(
      "alternate",
      `${SITE_URL}/oembed.json`,
      "application/json+oembed",
      `${SITE_NAME} oEmbed`
    );

    if (jsonLd) injectJsonLd("page", jsonLd);
    return () => {
      const el = document.head.querySelector('script[data-seo="page"]');
      if (el) el.remove();
    };
  }, [
    fullTitle,
    description,
    url,
    ogImage,
    ogAlt,
    ogW,
    ogH,
    ogMime,
    type,
    publishedTime,
    modifiedTime,
    author,
    section,
    JSON.stringify(tags || []),
    jsonLd,
    noIndex,
  ]);

  return null;
}

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ label: "Home", to: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${SITE_URL}${c.to}` } : {}),
    })),
  };

  useEffect(() => {
    injectJsonLd("breadcrumbs", jsonLd);
    return () => {
      const el = document.head.querySelector('script[data-seo="breadcrumbs"]');
      if (el) el.remove();
    };
  }, [JSON.stringify(jsonLd)]);

  return (
    <nav
      aria-label="Breadcrumb"
      className={"flex items-center flex-wrap gap-1 text-sm text-muted-foreground " + (className || "")}
    >
      {trail.map((c, i) => {
        const isLast = i === trail.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="flex items-center gap-1">
            {i === 0 ? <Home className="h-3.5 w-3.5 opacity-70" aria-hidden="true" /> : null}
            {isLast || !c.to ? (
              <span aria-current={isLast ? "page" : undefined} className="text-foreground font-medium">
                {c.label}
              </span>
            ) : (
              <Link
                to={c.to}
                className="hover:text-foreground transition-colors underline decoration-transparent hover:decoration-current underline-offset-2 decoration-[1.5px] duration-200"
              >
                {c.label}
              </Link>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
          </span>
        );
      })}
    </nav>
  );
}
