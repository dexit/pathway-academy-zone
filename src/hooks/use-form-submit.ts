import { useCallback, useState } from "react"
import { gqlFetch } from "@/lib/form-endpoints"

export type SubmitMethod = "POST" | "GET" | "PUT" | "PATCH"
export type SubmitFormat = "json" | "form" | "query" | "graphql"

export interface FormSubmitConfig<T extends Record<string, unknown>> {
  /**
   * Target URL. Leave empty for dry-run mode (fires onSuccess locally).
   * For GraphQL: the GraphQL endpoint.
   * For SMTP relay: the serverless relay endpoint.
   */
  url?: string
  method?: SubmitMethod
  /**
   * Wire format:
   *   "json"     — application/json POST body
   *   "form"     — application/x-www-form-urlencoded
   *   "query"    — URL query parameters
   *   "graphql"  — GraphQL mutation via POST
   */
  format?: SubmitFormat
  /** GraphQL mutation string — required when format="graphql". */
  gqlMutation?: string
  /** GraphQL variable wrapper key — variables sent as { [gqlVariablesKey]: payload }. */
  gqlVariablesKey?: string
  /** Additional static headers (e.g. Authorization tokens). */
  headers?: Record<string, string>
  /** Extra fields merged into every payload. */
  extra?: Record<string, unknown>
  /** Optional payload transformer before it hits the wire. */
  transform?: (values: T) => Record<string, unknown>
  /**
   * Cloudflare Workers / webhook payload template.
   *
   * Keys become the output field names; values are strings where `{{fieldName}}`
   * tokens are replaced with the corresponding form-field values at submit time.
   * Nested tokens (e.g. `"{{firstName}} {{lastName}}"`) are fully supported.
   *
   * When provided, the rendered template replaces the raw form values in the
   * outgoing payload. The `extra` fields are still merged on top.
   *
   * Submission format is chosen via `format` as usual:
   *   - "json" → application/json body  (default)
   *   - "form" → application/x-www-form-urlencoded body
   *
   * CF Worker example — receive as JSON:
   * ```ts
   * // wrangler.toml: [vars] ALLOWED_ORIGIN = "https://pathwayacademyzone.co.uk"
   * // worker.ts
   * export default {
   *   async fetch(request: Request): Promise<Response> {
   *     const data = await request.json()
   *     await sendEmail(data)  // your email/CRM logic
   *     return new Response("ok", { status: 200 })
   *   }
   * }
   *
   * // React side:
   * useFormSubmit({
   *   url: import.meta.env.VITE_CONTACT_WEBHOOK,
   *   format: "json",
   *   payloadTemplate: {
   *     from_name:    "{{firstName}} {{lastName}}",
   *     from_email:   "{{email}}",
   *     enquiry_type: "{{enquiryType}}",
   *     organisation: "{{organisation}}",
   *     message:      "{{message}}",
   *   },
   * })
   * ```
   *
   * CF Worker example — receive as form-encoded:
   * ```ts
   * // worker.ts
   * export default {
   *   async fetch(request: Request): Promise<Response> {
   *     const body = await request.formData()
   *     const name = body.get("from_name")
   *     // ...
   *     return new Response("ok", { status: 200 })
   *   }
   * }
   *
   * // React side:
   * useFormSubmit({
   *   url: import.meta.env.VITE_REFERRAL_WEBHOOK,
   *   format: "form",
   *   payloadTemplate: {
   *     subject:      "New referral from {{organisation}}",
   *     referrer:     "{{firstName}} {{lastName}} ({{role}})",
   *     email:        "{{email}}",
   *     phone:        "{{phone}}",
   *     young_person: "{{ypFirstName}} {{ypLastName}}, DOB {{dob}}, Yr {{yearGroup}}",
   *     programme:    "{{programme}}",
   *     reason:       "{{reason}}",
   *   },
   * })
   * ```
   */
  payloadTemplate?: Record<string, string>
  /**
   * Retry on network failure / 5xx.
   * Exponential backoff: delay = baseDelayMs * 2^attempt
   * Default: 3 retries, 400 ms base.
   */
  retries?: number
  baseDelayMs?: number
  onSuccess?: (response: unknown, values: T) => void
  onError?: (error: unknown, values: T) => void
}

export interface FormSubmitState {
  loading: boolean
  error: string | null
  success: boolean
}

export function useFormSubmit<T extends Record<string, unknown>>(
  config: FormSubmitConfig<T> = {}
) {
  const {
    url,
    method = "POST",
    format = "json",
    gqlMutation,
    gqlVariablesKey = "input",
    headers = {},
    extra = {},
    transform,
    payloadTemplate,
    retries = 3,
    baseDelayMs = 400,
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
      const resolvedValues = transform ? transform(values) : (values as Record<string, unknown>)
      const templated = payloadTemplate ? applyPayloadTemplate(payloadTemplate, resolvedValues) : resolvedValues
      const payload: Record<string, unknown> = { ...extra, ...templated }

      try {
        // Dry mode
        if (!url) {
          await delay(600)
          setState({ loading: false, error: null, success: true })
          onSuccess?.({ dryRun: true, payload }, values)
          return { ok: true, dryRun: true, payload }
        }

        let lastError: unknown = null

        for (let attempt = 0; attempt <= retries; attempt++) {
          if (attempt > 0) await delay(baseDelayMs * Math.pow(2, attempt - 1))
          try {
            const result = await doFetch({
              url,
              method,
              format,
              gqlMutation,
              gqlVariablesKey,
              headers,
              payload,
            })
            setState({ loading: false, error: null, success: true })
            onSuccess?.(result, values)
            return { ok: true, body: result }
          } catch (err) {
            lastError = err
            // Only retry on network errors or 5xx; not 4xx client errors
            if (err instanceof HttpError && err.status < 500) break
          }
        }

        throw lastError
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        setState({ loading: false, error: message, success: false })
        onError?.(err, values)
        return { ok: false, error: message }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, method, format, gqlMutation, gqlVariablesKey, JSON.stringify(headers), JSON.stringify(extra), JSON.stringify(payloadTemplate), transform, retries, baseDelayMs, onSuccess, onError]
  )

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false })
  }, [])

  return { ...state, submit, reset }
}

/* ── Internal helpers ───────────────────────────────────────────────── */

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = "HttpError"
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

async function doFetch({
  url,
  method,
  format,
  gqlMutation,
  gqlVariablesKey,
  headers,
  payload,
}: {
  url: string
  method: SubmitMethod
  format: SubmitFormat
  gqlMutation?: string
  gqlVariablesKey: string
  headers: Record<string, string>
  payload: Record<string, unknown>
}): Promise<unknown> {
  if (format === "graphql") {
    if (!gqlMutation) throw new Error("gqlMutation required for graphql format")
    return gqlFetch(url, gqlMutation, { [gqlVariablesKey]: payload }, headers)
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
    throw new HttpError(
      res.status,
      typeof body === "string"
        ? body || `Request failed (${res.status})`
        : `Request failed (${res.status})`
    )
  }

  return body
}

function encodePayload(
  payload: Record<string, unknown>,
  format: SubmitFormat
): { body?: BodyInit; contentType?: string; query?: string } {
  if (format === "json") {
    return { body: JSON.stringify(payload), contentType: "application/json" }
  }
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(payload)) {
    if (v === undefined || v === null) continue
    params.append(k, typeof v === "string" ? v : JSON.stringify(v))
  }
  if (format === "form") {
    return { body: params.toString(), contentType: "application/x-www-form-urlencoded;charset=UTF-8" }
  }
  return { query: params.toString() }
}

function appendQuery(url: string, query: string): string {
  if (!query) return url
  return url + (url.includes("?") ? "&" : "?") + query
}

/**
 * Replace {{fieldName}} tokens in each template value with the corresponding
 * form-field value. Unknown tokens are replaced with an empty string.
 */
function applyPayloadTemplate(
  template: Record<string, string>,
  values: Record<string, unknown>
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(template).map(([key, tmpl]) => [
      key,
      tmpl.replace(/\{\{(\w+)\}\}/g, (_, field) => String(values[field] ?? "")),
    ])
  )
}
