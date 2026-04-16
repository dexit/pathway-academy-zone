import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const SITE_URL = "https://pathwayacademyzone.co.uk";
const SITE_NAME = "Pathway Academy Zone";

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  jsonLd?: JsonLd;
  noIndex?: boolean;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
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

export function Seo({
  title,
  description,
  canonical,
  image,
  jsonLd,
  noIndex,
}: SeoProps) {
  const { pathname } = useLocation();
  const url = canonical || `${SITE_URL}${pathname}`;
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;

  useEffect(() => {
    document.title = fullTitle;
    if (description) upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex,nofollow" : "index,follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", fullTitle);
    if (description) upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    if (image) upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", fullTitle);
    if (description) upsertMeta("name", "twitter:description", description);
    if (image) upsertMeta("name", "twitter:image", image);

    if (jsonLd) injectJsonLd("page", jsonLd);
    return () => {
      const el = document.head.querySelector('script[data-seo="page"]');
      if (el) el.remove();
    };
  }, [fullTitle, description, url, image, jsonLd, noIndex]);

  return null;
}

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
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
      className={
        "flex items-center flex-wrap gap-1 text-sm text-muted-foreground " +
        (className || "")
      }
    >
      {trail.map((c, i) => {
        const isLast = i === trail.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="flex items-center gap-1">
            {i === 0 ? (
              <Home className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            ) : null}
            {isLast || !c.to ? (
              <span
                aria-current={isLast ? "page" : undefined}
                className="text-foreground font-medium"
              >
                {c.label}
              </span>
            ) : (
              <Link
                to={c.to}
                className="hover:text-foreground transition-colors"
              >
                {c.label}
              </Link>
            )}
            {!isLast && (
              <ChevronRight
                className="h-3.5 w-3.5 opacity-60"
                aria-hidden="true"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}
