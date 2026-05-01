/**
 * Unified AI client supporting three providers:
 *
 *   "openrouter"  — OpenRouter.ai (100+ models, set VITE_OPENROUTER_API_KEY)
 *   "local-ai"    — Ollama-compatible local server (set VITE_LOCAL_AI_URL)
 *   "wp-proxy"    — WordPress REST proxy (PAZ_OPENROUTER_API_KEY on WP server)
 *                   Best for production — API keys stay server-side.
 *
 * Provider priority (auto-detect):
 *   wp-proxy > openrouter > local-ai
 *
 * Usage:
 *   import { ai } from "@/lib/ai"
 *   const reply = await ai.chat([{ role: "user", content: "What is AP?" }])
 *   // or streaming:
 *   await ai.stream([...], (token) => console.log(token))
 */

export type AIProvider = "openrouter" | "local-ai" | "wp-proxy"

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface AIResponse {
  content: string
  provider: AIProvider
  model: string
}

export interface AIOptions {
  provider?: AIProvider
  model?: string
  context?: string // appended to system prompt
  maxTokens?: number
  temperature?: number
  signal?: AbortSignal
}

/* ── Config ──────────────────────────────────────────────────────────── */

const ENV = import.meta.env as Record<string, string | undefined>

const OPENROUTER_KEY   = ENV.VITE_OPENROUTER_API_KEY ?? ""
const LOCAL_AI_URL     = (ENV.VITE_LOCAL_AI_URL ?? "http://localhost:11434").replace(/\/$/, "")
const WP_API_URL       = (ENV.VITE_WP_API_URL ?? "").replace(/\/$/, "")
const DEFAULT_OR_MODEL = ENV.VITE_OPENROUTER_DEFAULT_MODEL ?? "openai/gpt-4o-mini"
const DEFAULT_LA_MODEL = ENV.VITE_LOCAL_AI_DEFAULT_MODEL   ?? "llama3"

function detectProvider(): AIProvider {
  if (WP_API_URL)       return "wp-proxy"
  if (OPENROUTER_KEY)   return "openrouter"
  return "local-ai"
}

/* ── PAZ system prompt ───────────────────────────────────────────────── */

const SYSTEM_BASE = `You are a helpful assistant for Pathway Academy Zone, a specialist Alternative Provision (AP) provider in Stoke-on-Trent, UK. You help school staff, Local Authority workers, parents, and carers understand AP, our programmes, and referrals. Be warm, professional, and concise. Phone: 01782 365365. Email: info@pathwayacademyzone.co.uk.`

function buildSystemPrompt(context?: string): string {
  return context ? `${SYSTEM_BASE} ${context}` : SYSTEM_BASE
}

/* ── Providers ───────────────────────────────────────────────────────── */

async function callOpenRouter(messages: ChatMessage[], model: string, opts: AIOptions): Promise<AIResponse> {
  if (!OPENROUTER_KEY) throw new Error("VITE_OPENROUTER_API_KEY is not set")
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal: opts.signal,
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "Pathway Academy Zone",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: opts.maxTokens ?? 800,
      temperature: opts.temperature ?? 0.7,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message ?? `OpenRouter error ${res.status}`)
  }
  const json = await res.json()
  return { content: json.choices[0].message.content, provider: "openrouter", model: json.model ?? model }
}

async function callLocalAi(messages: ChatMessage[], model: string, opts: AIOptions): Promise<AIResponse> {
  const res = await fetch(`${LOCAL_AI_URL}/v1/chat/completions`, {
    method: "POST",
    signal: opts.signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: false }),
  })
  if (!res.ok) throw new Error(`Local-AI error ${res.status}`)
  const json = await res.json()
  return { content: json.choices[0].message.content, provider: "local-ai", model: json.model ?? model }
}

async function callWpProxy(
  messages: ChatMessage[],
  model: string,
  opts: AIOptions
): Promise<AIResponse> {
  const endpoint = `${WP_API_URL}/wp-json/paz/v1/ai/chat`
  const res = await fetch(endpoint, {
    method: "POST",
    signal: opts.signal,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      messages: messages.filter((m) => m.role !== "system"), // system prompt added server-side
      provider: opts.provider === "wp-proxy" ? undefined : opts.provider,
      model,
      context: opts.context,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error ?? `WP proxy error ${res.status}`)
  }
  const json = await res.json()
  return { content: json.content, provider: "wp-proxy", model: json.model ?? model }
}

/* ── Streaming helpers ───────────────────────────────────────────────── */

async function streamOpenRouter(
  messages: ChatMessage[],
  model: string,
  opts: AIOptions,
  onToken: (token: string) => void
): Promise<AIResponse> {
  if (!OPENROUTER_KEY) throw new Error("VITE_OPENROUTER_API_KEY is not set")
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal: opts.signal,
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "Pathway Academy Zone",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: opts.maxTokens ?? 800,
      temperature: opts.temperature ?? 0.7,
      stream: true,
    }),
  })
  if (!res.ok || !res.body) throw new Error(`OpenRouter stream error ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    for (const line of chunk.split("\n")) {
      if (!line.startsWith("data: ")) continue
      const data = line.slice(6).trim()
      if (data === "[DONE]") break
      try {
        const json = JSON.parse(data)
        const token = json.choices?.[0]?.delta?.content ?? ""
        if (token) { full += token; onToken(token) }
      } catch { /* skip malformed SSE */ }
    }
  }
  return { content: full, provider: "openrouter", model }
}

async function streamLocalAi(
  messages: ChatMessage[],
  model: string,
  opts: AIOptions,
  onToken: (token: string) => void
): Promise<AIResponse> {
  const res = await fetch(`${LOCAL_AI_URL}/v1/chat/completions`, {
    method: "POST",
    signal: opts.signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: true }),
  })
  if (!res.ok || !res.body) throw new Error(`Local-AI stream error ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    for (const line of chunk.split("\n")) {
      if (!line.startsWith("data: ")) continue
      const data = line.slice(6).trim()
      if (data === "[DONE]") break
      try {
        const json = JSON.parse(data)
        const token = json.choices?.[0]?.delta?.content ?? ""
        if (token) { full += token; onToken(token) }
      } catch { /* skip */ }
    }
  }
  return { content: full, provider: "local-ai", model }
}

/* ── Public API ──────────────────────────────────────────────────────── */

export const ai = {
  /** Non-streaming chat. Returns the full response. */
  async chat(messages: ChatMessage[], opts: AIOptions = {}): Promise<AIResponse> {
    const provider = opts.provider ?? detectProvider()
    const withSystem: ChatMessage[] = [
      { role: "system", content: buildSystemPrompt(opts.context) },
      ...messages,
    ]
    switch (provider) {
      case "openrouter":
        return callOpenRouter(withSystem, opts.model ?? DEFAULT_OR_MODEL, opts)
      case "local-ai":
        return callLocalAi(withSystem, opts.model ?? DEFAULT_LA_MODEL, opts)
      case "wp-proxy":
      default:
        return callWpProxy(withSystem, opts.model ?? DEFAULT_OR_MODEL, opts)
    }
  },

  /** Streaming chat. Calls onToken for each new token. Returns full response on completion. */
  async stream(
    messages: ChatMessage[],
    onToken: (token: string) => void,
    opts: AIOptions = {}
  ): Promise<AIResponse> {
    const provider = opts.provider ?? detectProvider()
    if (provider === "wp-proxy") {
      // WP proxy doesn't stream — fall back to regular chat and call onToken at the end.
      const response = await callWpProxy(
        [{ role: "system", content: buildSystemPrompt(opts.context) }, ...messages],
        opts.model ?? DEFAULT_OR_MODEL,
        opts
      )
      onToken(response.content)
      return response
    }
    const withSystem: ChatMessage[] = [
      { role: "system", content: buildSystemPrompt(opts.context) },
      ...messages,
    ]
    if (provider === "local-ai") return streamLocalAi(withSystem, opts.model ?? DEFAULT_LA_MODEL, opts, onToken)
    return streamOpenRouter(withSystem, opts.model ?? DEFAULT_OR_MODEL, opts, onToken)
  },

  /** Which provider will be used by default (no explicit opts). */
  get defaultProvider(): AIProvider { return detectProvider() },

  /** True if any AI provider is configured. */
  get available(): boolean {
    return Boolean(WP_API_URL || OPENROUTER_KEY)
  },
}
