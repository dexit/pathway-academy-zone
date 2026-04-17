import { useCallback, useState } from "react"

export type SubmitMethod = "POST" | "GET" | "PUT" | "PATCH"
export type SubmitFormat = "json" | "form" | "query"

export interface FormSubmitConfig<T extends Record<string, unknown>> {
  /**
   * Target URL (typically an external webhook or REST endpoint). Leave empty
   * to run the hook in "dry" mode — the payload will resolve locally and the
   * onSuccess callback fires immediately. Useful for demo/preview builds.
   */
  url?: string
  method?: SubmitMethod
  /**
   * Wire format: JSON body, application/x-www-form-urlencoded, or URL query
   * parameters (for GET/POST pass-through integrations). Defaults to "json".
   */
  format?: SubmitFormat
  /** Additional static headers (e.g. Authorization tokens). */
  headers?: Record<string, string>
  /** Extra fields merged into every payload (e.g. site id, source tag). */
  extra?: Record<string, unknown>
  /** Optional payload transformer before it hits the wire. */
  transform?: (values: T) => Record<string, unknown>
  onSuccess?: (response: unknown, values: T) => void
  onError?: (error: unknown, values: T) => void
}

export interface FormSubmitState {
  loading: boolean
  error: string | null
  success: boolean
}

/**
 * Flexible form-submit hook supporting multiple wire formats and external
 * webhook endpoints. Designed so the same Contact/Referral/Careers/Vacancy
 * forms can be pointed at Zapier, Make, n8n, HubSpot, Slack, a WP REST
 * route, or a raw webhook without rewriting the component.
 */
export function useFormSubmit<T extends Record<string, unknown>>(
  config: FormSubmitConfig<T> = {}
) {
  const {
    url,
    method = "POST",
    format = "json",
    headers = {},
    extra = {},
    transform,
    onSuccess,
    onError,
  } = config

  const [state, setState] = useState<FormSubmitState>({
    loading: false,
    error: null,
    success: false,
  })

  const submit = useCallback(
    async (values: T) => {
      setState({ loading: true, error: null, success: false })
      const payload: Record<string, unknown> = {
        ...extra,
        ...(transform ? transform(values) : values),
      }

      try {
        // Dry mode — no URL configured, resolve locally so previews/demos work.
        if (!url) {
          await new Promise((r) => setTimeout(r, 600))
          setState({ loading: false, error: null, success: true })
          onSuccess?.({ dryRun: true, payload }, values)
          return { ok: true, dryRun: true, payload }
        }

        const encoded = encodePayload(payload, format)
        const target =
          format === "query" || method === "GET"
            ? appendQuery(url, encoded.query ?? "")
            : url

        const init: RequestInit = {
          method,
          headers: {
            Accept: "application/json",
            ...(encoded.contentType ? { "Content-Type": encoded.contentType } : {}),
            ...headers,
          },
          ...(encoded.body !== undefined ? { body: encoded.body } : {}),
        }

        const res = await fetch(target, init)
        const contentType = res.headers.get("content-type") ?? ""
        const body = contentType.includes("application/json")
          ? await res.json().catch(() => null)
          : await res.text().catch(() => "")

        if (!res.ok) {
          throw new Error(
            typeof body === "string"
              ? body || `Request failed (${res.status})`
              : `Request failed (${res.status})`
          )
        }

        setState({ loading: false, error: null, success: true })
        onSuccess?.(body, values)
        return { ok: true, body }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        setState({ loading: false, error: message, success: false })
        onError?.(err, values)
        return { ok: false, error: message }
      }
    },
    [url, method, format, headers, extra, transform, onSuccess, onError]
  )

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false })
  }, [])

  return { ...state, submit, reset }
}

function encodePayload(
  payload: Record<string, unknown>,
  format: SubmitFormat
): { body?: BodyInit; contentType?: string; query?: string } {
  if (format === "json") {
    return {
      body: JSON.stringify(payload),
      contentType: "application/json",
    }
  }
  if (format === "form") {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(payload)) {
      if (v === undefined || v === null) continue
      params.append(k, typeof v === "string" ? v : JSON.stringify(v))
    }
    return {
      body: params.toString(),
      contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    }
  }
  // "query" — payload serialised onto URL, no body.
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(payload)) {
    if (v === undefined || v === null) continue
    params.append(k, typeof v === "string" ? v : JSON.stringify(v))
  }
  return { query: params.toString() }
}

function appendQuery(url: string, query: string): string {
  if (!query) return url
  return url + (url.includes("?") ? "&" : "?") + query
}
