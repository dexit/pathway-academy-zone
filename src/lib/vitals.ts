/**
 * 2026 Web Vitals collection — covers the full Core Web Vitals set plus
 * Long Animation Frames (LoAF) introduced in Chrome 116.
 *
 * Metrics reported:
 *   LCP  — Largest Contentful Paint    (target < 2.5 s)
 *   CLS  — Cumulative Layout Shift     (target < 0.1)
 *   INP  — Interaction to Next Paint   (target < 200 ms, replaced FID)
 *   FCP  — First Contentful Paint      (target < 1.8 s)
 *   TTFB — Time to First Byte          (target < 800 ms)
 *   LoAF — Long Animation Frames       (> 50 ms, informational)
 *
 * Reports are batched and sent via navigator.sendBeacon so they don't block
 * page unload. Falls back to fetch for browsers without beacon support.
 */

export interface VitalReport {
  name: string
  value: number
  rating: "good" | "needs-improvement" | "poor"
  delta: number
  id: string
  navigationType: string
  url: string
}

type ReportHandler = (report: VitalReport) => void

const ENDPOINT = import.meta.env.VITE_VITALS_ENDPOINT as string | undefined

function getNavigationType(): string {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
  return nav?.type ?? "unknown"
}

function makeId(): string {
  return `v3-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function sendReport(report: VitalReport): void {
  if (!ENDPOINT) return
  const body = JSON.stringify(report)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(ENDPOINT, body)
  } else {
    fetch(ENDPOINT, {
      body,
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => {/* swallow — analytics are non-critical */})
  }
}

function rate(name: string, value: number): VitalReport["rating"] {
  const thresholds: Record<string, [number, number]> = {
    LCP:  [2500, 4000],
    CLS:  [0.1,  0.25],
    INP:  [200,  500],
    FCP:  [1800, 3000],
    TTFB: [800,  1800],
  }
  const [good, poor] = thresholds[name] ?? [Infinity, Infinity]
  if (value <= good) return "good"
  if (value <= poor) return "needs-improvement"
  return "poor"
}

function observe(
  type: string,
  callback: (entries: PerformanceEntryList, observer: PerformanceObserver) => void,
  opts: PerformanceObserverInit
): PerformanceObserver | null {
  try {
    const observer = new PerformanceObserver((list, obs) => callback(list.getEntries(), obs))
    observer.observe(opts)
    return observer
  } catch {
    return null
  }
}

/* ── LCP ────────────────────────────────────────────────────────────── */
function observeLCP(handler: ReportHandler): void {
  let finalValue = 0
  let finalEntry: PerformanceEntry | null = null
  const id = makeId()
  const report = () => {
    if (!finalEntry) return
    const report: VitalReport = {
      name: "LCP",
      value: finalValue,
      rating: rate("LCP", finalValue),
      delta: finalValue,
      id,
      navigationType: getNavigationType(),
      url: location.href,
    }
    handler(report)
    sendReport(report)
  }
  observe(
    "largest-contentful-paint",
    (entries) => {
      const last = entries[entries.length - 1] as LargestContentfulPaint
      finalValue = last.startTime
      finalEntry = last
    },
    { type: "largest-contentful-paint", buffered: true }
  )
  addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") report() }, { once: true })
  addEventListener("pagehide", report, { once: true })
}

/* ── CLS ────────────────────────────────────────────────────────────── */
function observeCLS(handler: ReportHandler): void {
  let clsValue = 0
  let sessionValue = 0
  let sessionEntries: PerformanceEntry[] = []
  const id = makeId()
  const report = () => {
    const r: VitalReport = {
      name: "CLS",
      value: clsValue,
      rating: rate("CLS", clsValue),
      delta: clsValue,
      id,
      navigationType: getNavigationType(),
      url: location.href,
    }
    handler(r)
    sendReport(r)
  }
  observe(
    "layout-shift",
    (entries) => {
      for (const entry of entries as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) {
        if (entry.hadRecentInput) continue
        const firstEntry = sessionEntries[0] as (PerformanceEntry & { startTime: number }) | undefined
        const lastEntry = sessionEntries[sessionEntries.length - 1] as (PerformanceEntry & { startTime: number }) | undefined
        if (
          sessionEntries.length &&
          entry.startTime - (lastEntry?.startTime ?? 0) > 1000 &&
          entry.startTime - (firstEntry?.startTime ?? 0) > 5000
        ) {
          sessionValue = 0
          sessionEntries = []
        }
        sessionValue += entry.value
        sessionEntries.push(entry)
        if (sessionValue > clsValue) clsValue = sessionValue
      }
    },
    { type: "layout-shift", buffered: true }
  )
  addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") report() }, { once: true })
  addEventListener("pagehide", report, { once: true })
}

/* ── INP ────────────────────────────────────────────────────────────── */
function observeINP(handler: ReportHandler): void {
  let maxDuration = 0
  const id = makeId()
  const report = () => {
    if (!maxDuration) return
    const r: VitalReport = {
      name: "INP",
      value: maxDuration,
      rating: rate("INP", maxDuration),
      delta: maxDuration,
      id,
      navigationType: getNavigationType(),
      url: location.href,
    }
    handler(r)
    sendReport(r)
  }
  observe(
    "event",
    (entries) => {
      for (const entry of entries as (PerformanceEntry & { processingEnd: number; processingStart: number; startTime: number })[]) {
        const inp = entry.processingEnd - entry.startTime
        if (inp > maxDuration) maxDuration = inp
      }
    },
    { type: "event", buffered: true, durationThreshold: 40 } as PerformanceObserverInit & { durationThreshold?: number }
  )
  addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") report() }, { once: true })
  addEventListener("pagehide", report, { once: true })
}

/* ── FCP ────────────────────────────────────────────────────────────── */
function observeFCP(handler: ReportHandler): void {
  const id = makeId()
  observe(
    "paint",
    (entries) => {
      const fcp = entries.find((e) => e.name === "first-contentful-paint")
      if (!fcp) return
      const r: VitalReport = {
        name: "FCP",
        value: fcp.startTime,
        rating: rate("FCP", fcp.startTime),
        delta: fcp.startTime,
        id,
        navigationType: getNavigationType(),
        url: location.href,
      }
      handler(r)
      sendReport(r)
    },
    { type: "paint", buffered: true }
  )
}

/* ── TTFB ───────────────────────────────────────────────────────────── */
function observeTTFB(handler: ReportHandler): void {
  const id = makeId()
  observe(
    "navigation",
    (entries) => {
      const nav = entries[0] as PerformanceNavigationTiming | undefined
      if (!nav) return
      const ttfb = nav.responseStart - nav.requestStart
      const r: VitalReport = {
        name: "TTFB",
        value: ttfb,
        rating: rate("TTFB", ttfb),
        delta: ttfb,
        id,
        navigationType: getNavigationType(),
        url: location.href,
      }
      handler(r)
      sendReport(r)
    },
    { type: "navigation", buffered: true }
  )
}

/* ── Long Animation Frames (LoAF) ───────────────────────────────────── */
function observeLoAF(handler: ReportHandler): void {
  observe(
    "long-animation-frame",
    (entries) => {
      for (const entry of entries) {
        const r: VitalReport = {
          name: "LoAF",
          value: entry.duration,
          rating: entry.duration > 100 ? "poor" : "needs-improvement",
          delta: entry.duration,
          id: makeId(),
          navigationType: getNavigationType(),
          url: location.href,
        }
        handler(r)
        sendReport(r)
      }
    },
    { type: "long-animation-frame", buffered: false }
  )
}

/* ── Public API ─────────────────────────────────────────────────────── */

export function reportWebVitals(handler: ReportHandler = () => {}): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return
  observeLCP(handler)
  observeCLS(handler)
  observeINP(handler)
  observeFCP(handler)
  observeTTFB(handler)
  observeLoAF(handler)
}

/** Convenience: log vitals to console in development */
export function logVitals(): void {
  if (import.meta.env.DEV) {
    reportWebVitals((r) => {
      const color = r.rating === "good" ? "#22c55e" : r.rating === "needs-improvement" ? "#f59e0b" : "#ef4444"
      console.log(`%c${r.name}%c ${r.value.toFixed(1)} [${r.rating}]`, `color:${color};font-weight:700`, "color:inherit")
    })
  }
}
