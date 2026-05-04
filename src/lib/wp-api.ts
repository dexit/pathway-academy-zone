/**
 * WordPress REST API client for the paz/v1 namespace.
 *
 * Set VITE_WP_API_URL to your WordPress install root, e.g.:
 *   VITE_WP_API_URL=https://cms.pathwayacademyzone.co.uk
 *
 * Omit the env var in production deployments where the SPA is served
 * from the same origin as WordPress.
 *
 * All endpoints fall back to empty arrays / null so the SPA gracefully
 * degrades when WordPress is not reachable.
 */

const BASE = (import.meta.env.VITE_WP_API_URL as string | undefined)
  ? `${(import.meta.env.VITE_WP_API_URL as string).replace(/\/$/, "")}/wp-json/paz/v1`
  : "/wp-json/paz/v1"

const WP_NONCE = (import.meta.env.VITE_WP_NONCE as string | undefined) ?? ""

/* ── Types ──────────────────────────────────────────────────────────── */

export interface WpTeamMember {
  id: number
  name: string
  slug: string
  role: string
  bio: string
  image: string | null
  permalink: string
}

export interface WpProgramme {
  id: number
  title: string
  slug: string
  subtitle: string
  duration: string
  key_stage: string
  icon_name: string
  colour: string
  permalink: string
}

export interface WpArea {
  id: number
  title: string
  slug: string
  region: string
  lat: string
  lng: string
  permalink: string
  programme_count: number
}

export interface WpFaq {
  id: number
  question: string
  answer: string
  categories: string[]
}

export interface WpTestimonial {
  id: number
  author: string
  role: string
  organisation: string
  quote: string
  rating: number
}

export interface WpNewsItem {
  id: number
  title: string
  slug: string
  excerpt: string
  date: string
  image: string | null
  permalink: string
  categories: string[]
}

export interface WpVacancy {
  id: number
  title: string
  slug: string
  department: string
  location: string
  type: string
  salary: string
  closing_date: string
  excerpt: string
  permalink: string
}

export interface WpPartner {
  id: number
  title: string
  slug: string
  category: string
  website: string
  logo: string | null
  excerpt: string
}

export interface WpCentre {
  id: number
  title: string
  slug: string
  address: string
  phone: string
  lat: string
  lng: string
  image: string | null
  permalink: string
}

export interface WpSettings {
  contact_phone: string
  contact_email: string
  announcement_text: string
  announcement_link: string
  spa_base_url: string
  ai_enabled: boolean
  ai_providers: string[]
}

export interface WpSearchResult {
  id: number
  type: string
  title: string
  excerpt: string
  permalink: string
  slug: string
}

/* ── Fetch helper ────────────────────────────────────────────────────── */

async function pazFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T | null> {
  const url = new URL(`${BASE}${endpoint}`, window.location.href)
  if (params) {
    Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v))
  }
  try {
    const headers: HeadersInit = { Accept: "application/json" }
    if (WP_NONCE) headers["X-WP-Nonce"] = WP_NONCE
    const res = await fetch(url.toString(), { headers, credentials: "same-origin" })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

/* ── Simple in-memory request deduplication cache ───────────────────── */

const _cache = new Map<string, { data: unknown; ts: number }>()
const CACHE_TTL = 60_000 // 1 minute

async function cachedFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T | null> {
  const key = endpoint + JSON.stringify(params ?? {})
  const hit = _cache.get(key)
  if (hit && Date.now() - hit.ts < CACHE_TTL) return hit.data as T
  const data = await pazFetch<T>(endpoint, params)
  if (data !== null) _cache.set(key, { data, ts: Date.now() })
  return data
}

/* ── Public API ──────────────────────────────────────────────────────── */

export const wpApi = {
  team: (): Promise<WpTeamMember[] | null> =>
    cachedFetch<WpTeamMember[]>("/team"),

  programmes: (area?: string): Promise<WpProgramme[] | null> =>
    cachedFetch<WpProgramme[]>("/programmes", area ? { area } : undefined),

  areas: (): Promise<WpArea[] | null> =>
    cachedFetch<WpArea[]>("/areas"),

  faqs: (opts?: { area?: string; programme_id?: string }): Promise<WpFaq[] | null> =>
    cachedFetch<WpFaq[]>("/faqs", opts as Record<string, string>),

  testimonials: (): Promise<WpTestimonial[] | null> =>
    cachedFetch<WpTestimonial[]>("/testimonials"),

  news: (perPage = 9): Promise<WpNewsItem[] | null> =>
    cachedFetch<WpNewsItem[]>("/news", { per_page: String(perPage) }),

  vacancies: (): Promise<WpVacancy[] | null> =>
    cachedFetch<WpVacancy[]>("/vacancies"),

  partners: (): Promise<WpPartner[] | null> =>
    cachedFetch<WpPartner[]>("/partners"),

  centres: (): Promise<WpCentre[] | null> =>
    cachedFetch<WpCentre[]>("/centres"),

  settings: (): Promise<WpSettings | null> =>
    cachedFetch<WpSettings>("/settings"),

  search: (q: string): Promise<WpSearchResult[] | null> =>
    q.length > 1 ? pazFetch<WpSearchResult[]>("/search", { q }) : Promise.resolve([]),

  /** Clear the local request cache (e.g. after a mutation). */
  clearCache: () => _cache.clear(),
}

/** Returns true when a WP API URL is configured. */
export const WP_API_ENABLED = Boolean(import.meta.env.VITE_WP_API_URL)
