/**
 * Centralised form submission endpoint config.
 *
 * Priority order (first truthy env var wins):
 *   1. VITE_WEBHOOK_URL   — plain POST to any webhook (Zapier / Make / n8n / WP REST)
 *   2. VITE_GRAPHQL_URL   — GraphQL mutation endpoint
 *   3. VITE_SMTP_API_URL  — serverless SMTP-relay (e.g. Cloudflare Worker / Vercel Edge)
 *
 * Set VITE_FORM_METHOD to override: "webhook" | "graphql" | "smtp"
 */

export type FormSubmissionMethod = "webhook" | "graphql" | "smtp" | "dry"

export interface EndpointConfig {
  method: FormSubmissionMethod
  url: string
  /** Extra headers (e.g. auth tokens) */
  headers?: Record<string, string>
}

function resolveMethod(): FormSubmissionMethod {
  const forced = import.meta.env.VITE_FORM_METHOD as FormSubmissionMethod | undefined
  if (forced && ["webhook", "graphql", "smtp"].includes(forced)) return forced
  if (import.meta.env.VITE_WEBHOOK_URL) return "webhook"
  if (import.meta.env.VITE_GRAPHQL_URL) return "graphql"
  if (import.meta.env.VITE_SMTP_API_URL) return "smtp"
  return "dry"
}

function baseHeaders(): Record<string, string> {
  const token = import.meta.env.VITE_FORM_AUTH_TOKEN as string | undefined
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const ACTIVE_METHOD: FormSubmissionMethod = resolveMethod()

export const CONTACT_ENDPOINT: EndpointConfig = {
  method: ACTIVE_METHOD,
  url:
    ACTIVE_METHOD === "graphql"
      ? (import.meta.env.VITE_GRAPHQL_URL ?? "")
      : ACTIVE_METHOD === "smtp"
        ? (import.meta.env.VITE_SMTP_API_URL ?? "") + "/contact"
        : (import.meta.env.VITE_WEBHOOK_URL ?? "") + (import.meta.env.VITE_CONTACT_PATH ?? ""),
  headers: baseHeaders(),
}

export const REFERRAL_ENDPOINT: EndpointConfig = {
  method: ACTIVE_METHOD,
  url:
    ACTIVE_METHOD === "graphql"
      ? (import.meta.env.VITE_GRAPHQL_URL ?? "")
      : ACTIVE_METHOD === "smtp"
        ? (import.meta.env.VITE_SMTP_API_URL ?? "") + "/referral"
        : (import.meta.env.VITE_WEBHOOK_URL ?? "") + (import.meta.env.VITE_REFERRAL_PATH ?? ""),
  headers: baseHeaders(),
}

export const CAREERS_ENDPOINT: EndpointConfig = {
  method: ACTIVE_METHOD,
  url:
    ACTIVE_METHOD === "graphql"
      ? (import.meta.env.VITE_GRAPHQL_URL ?? "")
      : ACTIVE_METHOD === "smtp"
        ? (import.meta.env.VITE_SMTP_API_URL ?? "") + "/careers"
        : (import.meta.env.VITE_WEBHOOK_URL ?? "") + (import.meta.env.VITE_CAREERS_PATH ?? ""),
  headers: baseHeaders(),
}

/* ── GraphQL mutation strings ──────────────────────────────────────── */

export const GQL_SUBMIT_CONTACT = /* graphql */ `
  mutation SubmitContactForm($input: ContactFormInput!) {
    submitContactForm(input: $input) {
      success
      message
    }
  }
`

export const GQL_SUBMIT_REFERRAL = /* graphql */ `
  mutation SubmitReferralForm($input: ReferralFormInput!) {
    submitReferralForm(input: $input) {
      success
      message
    }
  }
`

export const GQL_SUBMIT_CAREERS = /* graphql */ `
  mutation SubmitCareersForm($input: CareersFormInput!) {
    submitCareersForm(input: $input) {
      success
      message
    }
  }
`

/* ── GraphQL fetch helper ───────────────────────────────────────────── */

export async function gqlFetch<T = unknown>(
  url: string,
  query: string,
  variables: Record<string, unknown>,
  headers: Record<string, string> = {}
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GraphQL error")
  }
  return json.data as T
}
