import { SITE_NAME, SITE_URL } from "@/components/Seo";

/**
 * Centralised JSON-LD builders used across the site so every long-form
 * page emits consistent Article / Breadcrumb / Organization / FAQ /
 * LocalBusiness / ItemList schemas. Keep helpers small and composable.
 */

const ORG_ID = `${SITE_URL}/#organization`;

export const ORG_SCHEMA = {
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
  sameAs: ["https://www.linkedin.com/company/pathway-academy-zone"],
} as const;

export const LOCAL_BUSINESS_SCHEMA = {
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+44-1782-365365",
  email: "info@pathwayacademyzone.co.uk",
  image: `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Duncalf Street, Burslem",
    addressLocality: "Stoke-on-Trent",
    postalCode: "ST6 3LJ",
    addressRegion: "Staffordshire",
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.043, longitude: -2.191 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "16:00",
    },
  ],
  parentOrganization: { "@id": ORG_ID },
} as const;

export interface ArticleJsonLdInput {
  title: string;
  description: string;
  url: string;
  wordCount?: number;
  minutesToRead?: number;
  section?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
  const minutes =
    input.minutesToRead ??
    (input.wordCount ? Math.max(1, Math.round(input.wordCount / 230)) : undefined);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    abstract: input.description,
    mainEntityOfPage: input.url,
    url: input.url,
    inLanguage: "en-GB",
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    ...(minutes ? { timeRequired: `PT${minutes}M` } : {}),
    ...(input.section ? { articleSection: input.section } : {}),
    datePublished: input.datePublished ?? "2024-01-01",
    dateModified: input.dateModified ?? new Date().toISOString().slice(0, 10),
    author: {
      "@type": input.authorName ? "Person" : "Organization",
      name: input.authorName ?? SITE_NAME,
      ...(input.authorName ? { affiliation: { "@id": ORG_ID } } : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
      },
    },
    image: input.image ?? `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
  };
}

export function buildItemListJsonLd(items: { title: string; href: string }[], name?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name ? { name } : {}),
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.title,
      url: it.href.startsWith("http") ? it.href : `${SITE_URL}${it.href}`,
    })),
  };
}

export function buildDefinedTermSetJsonLd(
  name: string,
  url: string,
  terms: { term: string; slug: string; definition: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    url,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${url}#${t.slug}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: url,
    })),
  };
}
