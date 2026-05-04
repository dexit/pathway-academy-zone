import { SITE_NAME, SITE_URL } from "@/components/Seo";

/**
 * Centralised JSON-LD builders.
 * Single source of truth for all schema.org markup across the site.
 * Import helpers into page files — never hand-write schemas inline.
 */

/* ─── IDs ────────────────────────────────────────────────────────────────── */
export const ORG_ID       = `${SITE_URL}/#organization`;
export const EDU_ORG_ID   = `${SITE_URL}/#educational-org`;
export const SERVICE_ID   = `${SITE_URL}/#service`;
export const CATALOG_ID   = `${SITE_URL}/#offer-catalog`;

/* ─── areaServed (shared across all schemas) ─────────────────────────────── */
export const AREAS_SERVED = [
  { "@type": "City",                name: "Stoke-on-Trent" },
  { "@type": "City",                name: "Newcastle-under-Lyme" },
  { "@type": "City",                name: "Stafford" },
  { "@type": "City",                name: "Cannock" },
  { "@type": "City",                name: "Lichfield" },
  { "@type": "City",                name: "Tamworth" },
  { "@type": "City",                name: "Wolverhampton" },
  { "@type": "City",                name: "Leek" },
  { "@type": "AdministrativeArea",  name: "Staffordshire" },
  { "@type": "AdministrativeArea",  name: "Staffordshire Moorlands" },
  { "@type": "AdministrativeArea",  name: "West Midlands" },
] as const;

/* ─── Shared address / location fragments ────────────────────────────────── */
export const ORG_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress:   "Duncalf Street, Burslem",
  addressLocality: "Stoke-on-Trent",
  postalCode:      "ST6 3LJ",
  addressRegion:   "Staffordshire",
  addressCountry:  "GB",
} as const;

export const ORG_GEO = {
  "@type": "GeoCoordinates",
  latitude:  53.043,
  longitude: -2.191,
} as const;

export const ORG_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens:  "08:30",
    closes: "16:00",
  },
] as const;

/* ─── ContactPoint (with full areaServed) ───────────────────────────────── */
export const CONTACT_POINTS = [
  {
    "@type":         "ContactPoint",
    contactType:     "customer service",
    telephone:       "+44-1782-365365",
    email:           "info@pathwayacademyzone.co.uk",
    areaServed:      AREAS_SERVED,
    availableLanguage: ["English"],
    hoursAvailable: {
      "@type":     "OpeningHoursSpecification",
      dayOfWeek:   ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens:       "08:30",
      closes:      "16:00",
    },
  },
  {
    "@type":     "ContactPoint",
    contactType: "referrals",
    telephone:   "+44-1782-365365",
    email:       "info@pathwayacademyzone.co.uk",
    areaServed:  AREAS_SERVED,
    availableLanguage: ["English"],
  },
  {
    "@type":     "ContactPoint",
    contactType: "admissions",
    telephone:   "+44-1782-365365",
    email:       "info@pathwayacademyzone.co.uk",
    areaServed:  AREAS_SERVED,
    availableLanguage: ["English"],
  },
] as const;

/* ─── Base Organization schema (reused by reference everywhere) ──────────── */
export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type":    ["EducationalOrganization", "LocalBusiness"],
  "@id":      ORG_ID,
  name:       SITE_NAME,
  alternateName: "PAZ",
  url:        SITE_URL,
  logo: {
    "@type": "ImageObject",
    url:    `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
    width:  512,
    height: 512,
  },
  image:       `${SITE_URL}/assets/hero-classroom.jpg`,
  telephone:   "+44-1782-365365",
  email:       "info@pathwayacademyzone.co.uk",
  address:     ORG_ADDRESS,
  geo:         ORG_GEO,
  areaServed:  AREAS_SERVED,
  contactPoint: CONTACT_POINTS,
  openingHoursSpecification: ORG_HOURS,
  priceRange:  "££",
  foundingDate: "2018",
  sameAs: [
    "https://www.facebook.com/PathwayAcademyZone",
    "https://www.linkedin.com/company/pathway-academy-zone",
    "https://twitter.com/PathwayAcademyZ",
  ],
  aggregateRating: {
    "@type":       "AggregateRating",
    ratingValue:   "4.9",
    reviewCount:   "47",
    bestRating:    "5",
    worstRating:   "1",
  },
} as const;

/** Lightweight org reference (use instead of ORG_SCHEMA when linking) */
export const ORG_REF = { "@id": ORG_ID } as const;

/* ─── Course / Programme data type ──────────────────────────────────────── */
export interface ProgrammeInput {
  slug:     string;
  title:    string;
  desc:     string;
  features: string[];
  schedule: string;
  time:     string;
  whoFor:   string;
  outcomes: string[];
  image?:   string;
}

/* ─── Build a single Course+Product schema ───────────────────────────────── */
export function buildCourseSchema(p: ProgrammeInput) {
  const courseUrl = `${SITE_URL}/programmes#${p.slug}`;
  const courseId  = `${SITE_URL}/#course-${p.slug}`;
  return {
    "@context":      "https://schema.org",
    "@type":         ["Course", "Product"],
    "@id":           courseId,
    name:            p.title,
    description:     p.desc,
    url:             courseUrl,
    image:           p.image ?? `${SITE_URL}/assets/hero-classroom.jpg`,
    brand:           ORG_REF,
    provider:        ORG_REF,
    educationalLevel: "Key Stage 3 / Key Stage 4",
    inLanguage:      "en-GB",
    teaches:         p.outcomes,
    coursePrerequisites: "Referral from school, local authority, or social worker",
    audience: {
      "@type":        "EducationalAudience",
      educationalRole: "student",
      audienceType:   "Young people aged 11–16",
    },
    areaServed: AREAS_SERVED,
    hasCourseInstance: {
      "@type":     "CourseInstance",
      courseMode:  "Onsite",
      location: {
        "@type": "Place",
        name:    `${SITE_NAME} — Burslem Learning Centre`,
        address: ORG_ADDRESS,
      },
      courseSchedule: {
        "@type":      "Schedule",
        description:  `${p.schedule} — ${p.time}`,
      },
      instructor: ORG_REF,
    },
    offers: buildOfferSchema({ name: p.title, slug: p.slug }),
  };
}

/* ─── Build a single Offer schema ────────────────────────────────────────── */
export function buildOfferSchema({
  name,
  slug,
  singleArea,
}: {
  name: string;
  slug: string;
  singleArea?: { "@type": string; name: string };
}) {
  return {
    "@context":    "https://schema.org",
    "@type":       "Offer",
    "@id":         `${SITE_URL}/#offer-${slug}`,
    name,
    url:           `${SITE_URL}/programmes#${slug}`,
    seller:        ORG_REF,
    areaServed:    singleArea ? [singleArea, ...AREAS_SERVED] : AREAS_SERVED,
    availability:  "https://schema.org/InStock",
    priceCurrency: "GBP",
    priceSpecification: {
      "@type":       "PriceSpecification",
      priceCurrency: "GBP",
      description:   "Funded via LA, EHCP, or school commissioning. Contact us for details.",
    },
    category:      "Alternative Provision Education",
    validFrom:     "2024-09-01",
    businessFunction: "https://schema.org/LeaseOut",
  };
}

/* ─── Build the OfferCatalog linking all programmes ─────────────────────── */
export function buildOfferCatalogSchema(programmes: ProgrammeInput[]) {
  return {
    "@context": "https://schema.org",
    "@type":    "OfferCatalog",
    "@id":      CATALOG_ID,
    name:       "Pathway Academy Zone — Alternative Provision Programmes",
    description: "Six structured AP programmes covering academic re-engagement, vocational learning, SEMH support, personal development, life skills, and employability skills for young people aged 11–16 across Staffordshire.",
    provider:   ORG_REF,
    areaServed: AREAS_SERVED,
    itemListElement: programmes.map((p, i) => ({
      "@type":    "Offer",
      "@id":      `${SITE_URL}/#offer-${p.slug}`,
      position:   i + 1,
      name:       p.title,
      url:        `${SITE_URL}/programmes#${p.slug}`,
      seller:     ORG_REF,
      areaServed: AREAS_SERVED,
      availability: "https://schema.org/InStock",
      priceCurrency: "GBP",
      category:   "Alternative Provision Education",
      itemOffered: {
        "@type": ["Course", "Product"],
        "@id":   `${SITE_URL}/#course-${p.slug}`,
        name:    p.title,
        description: p.desc,
        url:     `${SITE_URL}/programmes#${p.slug}`,
        provider: ORG_REF,
      },
    })),
  };
}

/* ─── Build the Service schema (AP as a service) ─────────────────────────── */
export function buildServiceSchema(programmes: ProgrammeInput[]) {
  return {
    "@context":   "https://schema.org",
    "@type":      "Service",
    "@id":        SERVICE_ID,
    name:         "Alternative Provision — Pathway Academy Zone",
    description:  "Specialist Alternative Provision for young people aged 11–16 across Staffordshire and the West Midlands. SEMH support, academic re-engagement, vocational learning, and pastoral care.",
    serviceType:  "Alternative Provision Education",
    url:          `${SITE_URL}/programmes`,
    provider:     ORG_REF,
    areaServed:   AREAS_SERVED,
    audience: {
      "@type":    "Audience",
      audienceType: "Schools, Local Authorities, Social Workers, Virtual Schools, Families",
    },
    availableChannel: {
      "@type":        "ServiceChannel",
      serviceUrl:     `${SITE_URL}/referral`,
      serviceSmsNumber: "+44-1782-365365",
      servicePhone: {
        "@type":     "ContactPoint",
        telephone:   "+44-1782-365365",
        contactType: "referrals",
        areaServed:  AREAS_SERVED,
      },
    },
    hasOfferCatalog: buildOfferCatalogSchema(programmes),
    termsOfService: `${SITE_URL}/policies`,
    hoursAvailable: ORG_HOURS,
  };
}

/* ─── Course Carousel ItemList (Google Rich Results) ─────────────────────── */
export function buildCourseCarouselSchema(programmes: ProgrammeInput[]) {
  return {
    "@context": "https://schema.org",
    "@type":    "ItemList",
    "@id":      `${SITE_URL}/#course-list`,
    name:       "Alternative Provision Programmes at Pathway Academy Zone",
    description: "Structured AP programmes for young people aged 11–16 across Staffordshire.",
    url:        `${SITE_URL}/programmes`,
    numberOfItems: programmes.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: programmes.map((p, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      item: {
        "@type":         ["Course", "Product"],
        "@id":           `${SITE_URL}/#course-${p.slug}`,
        name:            p.title,
        description:     p.desc,
        url:             `${SITE_URL}/programmes#${p.slug}`,
        provider:        ORG_REF,
        educationalLevel: "Key Stage 3 / Key Stage 4",
        inLanguage:      "en-GB",
        areaServed:      AREAS_SERVED,
        offers: {
          "@type":       "Offer",
          "@id":         `${SITE_URL}/#offer-${p.slug}`,
          availability:  "https://schema.org/InStock",
          priceCurrency: "GBP",
          areaServed:    AREAS_SERVED,
          seller:        ORG_REF,
        },
      },
    })),
  };
}

/* ─── WebSite + SearchAction ─────────────────────────────────────────────── */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type":    "WebSite",
  "@id":      `${SITE_URL}/#website`,
  name:       SITE_NAME,
  url:        SITE_URL,
  inLanguage: "en-GB",
  publisher:  ORG_REF,
  potentialAction: {
    "@type":       "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

/* ─── ContactPage schema ─────────────────────────────────────────────────── */
export function buildContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    "ContactPage",
    "@id":      `${SITE_URL}/contact`,
    name:       `Contact ${SITE_NAME}`,
    url:        `${SITE_URL}/contact`,
    description: "Contact Pathway Academy Zone to make a referral, arrange a visit, or speak to our team about Alternative Provision across Staffordshire and the West Midlands.",
    inLanguage: "en-GB",
    isPartOf:   { "@id": `${SITE_URL}/#website` },
    about:      ORG_REF,
    mainEntity: {
      "@id":        ORG_ID,
      "@type":      ["EducationalOrganization", "LocalBusiness"],
      name:         SITE_NAME,
      telephone:    "+44-1782-365365",
      email:        "info@pathwayacademyzone.co.uk",
      address:      ORG_ADDRESS,
      geo:          ORG_GEO,
      areaServed:   AREAS_SERVED,
      contactPoint: CONTACT_POINTS,
      openingHoursSpecification: ORG_HOURS,
    },
  };
}

/* ─── AboutPage schema ───────────────────────────────────────────────────── */
export function buildAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    "AboutPage",
    "@id":      `${SITE_URL}/about`,
    name:       `About ${SITE_NAME}`,
    url:        `${SITE_URL}/about`,
    description: "Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people aged 11–16 across Staffordshire and the West Midlands.",
    inLanguage: "en-GB",
    isPartOf:   { "@id": `${SITE_URL}/#website` },
    about:      ORG_REF,
    mainEntity: {
      "@context":    "https://schema.org",
      "@type":       "EducationalOrganization",
      "@id":         EDU_ORG_ID,
      name:          SITE_NAME,
      url:           SITE_URL,
      foundingDate:  "2018",
      description:   "Specialist Alternative Provision for young people aged 11–16 with SEMH needs, exclusions, or disengagement from mainstream education.",
      areaServed:    AREAS_SERVED,
      address:       ORG_ADDRESS,
      contactPoint:  CONTACT_POINTS,
      educationalLevel: "Secondary",
      teaches: [
        "Alternative Provision", "SEMH Support", "Vocational Learning",
        "Academic Re-engagement", "Personal Development", "Employability Skills",
      ],
    },
  };
}

/* ─── SearchResultsPage schema ───────────────────────────────────────────── */
export function buildSearchPageSchema(query: string) {
  return {
    "@context": "https://schema.org",
    "@type":    "SearchResultsPage",
    "@id":      `${SITE_URL}/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    name:       query ? `Search results for "${query}"` : "Search — Pathway Academy Zone",
    url:        `${SITE_URL}/search`,
    inLanguage: "en-GB",
    isPartOf:   { "@id": `${SITE_URL}/#website` },
    about:      ORG_REF,
  };
}

/* ─── CollectionPage schema (Knowledge Hub index) ────────────────────────── */
export function buildKnowledgeHubSchema(
  sections: { title: string; id: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type":    "CollectionPage",
    "@id":      `${SITE_URL}/knowledge-hub`,
    name:       "Alternative Provision Knowledge Hub",
    url:        `${SITE_URL}/knowledge-hub`,
    description: "Comprehensive guides, comparisons, and best-practice articles about Alternative Provision for educators, parents, and professionals across Staffordshire.",
    inLanguage: "en-GB",
    about:      ORG_REF,
    isPartOf:   { "@id": `${SITE_URL}/#website` },
    publisher:  ORG_REF,
    audience: {
      "@type":      "Audience",
      audienceType: "Educators, parents, school SENCOs, local authority officers, social workers",
    },
    hasPart: sections.map((s) => ({
      "@type": "CollectionPage",
      name:    s.title,
      url:     `${SITE_URL}/knowledge-hub/${s.id}`,
      description: s.description,
    })),
    spatialCoverage: AREAS_SERVED,
  };
}

/* ─── Existing builders (unchanged) ─────────────────────────────────────── */

export interface ArticleJsonLdInput {
  title:          string;
  description:    string;
  url:            string;
  wordCount?:     number;
  minutesToRead?: number;
  section?:       string;
  datePublished?: string;
  dateModified?:  string;
  authorName?:    string;
  image?:         string;
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
  const minutes =
    input.minutesToRead ??
    (input.wordCount ? Math.max(1, Math.round(input.wordCount / 230)) : undefined);

  return {
    "@context": "https://schema.org",
    "@type":    "Article",
    headline:   input.title,
    description: input.description,
    abstract:   input.description,
    mainEntityOfPage: input.url,
    url:        input.url,
    inLanguage: "en-GB",
    ...(input.wordCount  ? { wordCount: input.wordCount } : {}),
    ...(minutes          ? { timeRequired: `PT${minutes}M` } : {}),
    ...(input.section    ? { articleSection: input.section } : {}),
    datePublished: input.datePublished ?? "2024-01-01",
    dateModified:  input.dateModified  ?? new Date().toISOString().slice(0, 10),
    author: {
      "@type": input.authorName ? "Person" : "Organization",
      name:    input.authorName ?? SITE_NAME,
      ...(input.authorName ? { affiliation: ORG_REF } : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id":   ORG_ID,
      name:    SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url:     `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
      },
    },
    image: input.image ?? `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
    spatialCoverage: AREAS_SERVED,
  };
}

export function buildItemListJsonLd(
  items: { title: string; href: string }[],
  name?: string
) {
  return {
    "@context": "https://schema.org",
    "@type":    "ItemList",
    ...(name ? { name } : {}),
    itemListElement: items.map((it, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      name:      it.title,
      url:       it.href.startsWith("http") ? it.href : `${SITE_URL}${it.href}`,
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
    "@type":    "DefinedTermSet",
    name,
    url,
    about:      ORG_REF,
    spatialCoverage: AREAS_SERVED,
    hasDefinedTerm: terms.map((t) => ({
      "@type":         "DefinedTerm",
      "@id":           `${url}#${t.slug}`,
      name:            t.term,
      description:     t.definition,
      inDefinedTermSet: url,
    })),
  };
}

/** Kept for backward-compat */
export const LOCAL_BUSINESS_SCHEMA = ORG_SCHEMA;
