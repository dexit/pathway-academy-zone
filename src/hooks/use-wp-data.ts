/**
 * React hooks for fetching data from the WordPress paz/v1 REST API.
 * Each hook returns { data, loading, error } and falls back to the
 * static data already baked into the SPA when WP is not configured.
 */
import { useState, useEffect, useRef } from "react"
import {
  wpApi,
  WP_API_ENABLED,
  type WpTeamMember,
  type WpProgramme,
  type WpArea,
  type WpFaq,
  type WpTestimonial,
  type WpNewsItem,
  type WpVacancy,
  type WpPartner,
  type WpCentre,
  type WpSettings,
  type WpSearchResult,
} from "@/lib/wp-api"

interface WpHookResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

function useWpEndpoint<T>(fetcher: () => Promise<T | null>, deps: unknown[] = []): WpHookResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(WP_API_ENABLED)
  const [error, setError] = useState<string | null>(null)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    if (!WP_API_ENABLED) { setLoading(false); return }
    setLoading(true)
    fetcher()
      .then((d) => { if (mounted.current) { setData(d); setLoading(false) } })
      .catch((e) => { if (mounted.current) { setError(String(e)); setLoading(false) } })
    return () => { mounted.current = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}

export function useWpTeam(): WpHookResult<WpTeamMember[]> {
  return useWpEndpoint(() => wpApi.team())
}

export function useWpProgrammes(area?: string): WpHookResult<WpProgramme[]> {
  return useWpEndpoint(() => wpApi.programmes(area), [area])
}

export function useWpAreas(): WpHookResult<WpArea[]> {
  return useWpEndpoint(() => wpApi.areas())
}

export function useWpFaqs(opts?: { area?: string; programme_id?: string }): WpHookResult<WpFaq[]> {
  return useWpEndpoint(() => wpApi.faqs(opts), [opts?.area, opts?.programme_id])
}

export function useWpTestimonials(): WpHookResult<WpTestimonial[]> {
  return useWpEndpoint(() => wpApi.testimonials())
}

export function useWpNews(perPage = 9): WpHookResult<WpNewsItem[]> {
  return useWpEndpoint(() => wpApi.news(perPage), [perPage])
}

export function useWpVacancies(): WpHookResult<WpVacancy[]> {
  return useWpEndpoint(() => wpApi.vacancies())
}

export function useWpPartners(): WpHookResult<WpPartner[]> {
  return useWpEndpoint(() => wpApi.partners())
}

export function useWpCentres(): WpHookResult<WpCentre[]> {
  return useWpEndpoint(() => wpApi.centres())
}

export function useWpSettings(): WpHookResult<WpSettings> {
  return useWpEndpoint(() => wpApi.settings())
}

export function useWpSearch(query: string): WpHookResult<WpSearchResult[]> {
  return useWpEndpoint(() => wpApi.search(query), [query])
}
