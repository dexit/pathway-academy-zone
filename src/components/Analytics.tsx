import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

/**
 * One-stop Analytics component. Every provider is OPT-IN via environment variables,
 * so the site ships with zero third-party scripts unless you set the vars in Vercel/CF.
 *
 *  VITE_GTM_ID              Google Tag Manager container ID  (e.g. "GTM-XXXXXXX")
 *  VITE_GA_ID               GA4 Measurement ID                (e.g. "G-XXXXXXXXXX")
 *  VITE_CLARITY_ID          Microsoft Clarity project ID
 *  VITE_CF_ANALYTICS_TOKEN  Cloudflare Web Analytics token    (from one.dash.cloudflare.com)
 *  VITE_PLAUSIBLE_DOMAIN    Plausible domain (legacy, cookie-less)
 *
 *  Vercel Analytics + Speed Insights are always rendered; they no-op unless the
 *  project is deployed on Vercel with analytics enabled in the dashboard.
 */

type Env = Record<string, string | undefined>
const env: Env = (import.meta as { env?: Env }).env || {}

const GTM_ID = env.VITE_GTM_ID
const GA_ID = env.VITE_GA_ID
const CLARITY_ID = env.VITE_CLARITY_ID
const CF_TOKEN = env.VITE_CF_ANALYTICS_TOKEN
const PLAUSIBLE_DOMAIN = env.VITE_PLAUSIBLE_DOMAIN

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

function injectOnce(id: string, build: () => HTMLScriptElement | HTMLIFrameElement | HTMLNoScriptElement, target: "head" | "body" = "head") {
  if (document.querySelector(`[data-analytics="${id}"]`)) return
  const node = build()
  node.setAttribute("data-analytics", id)
  ;(target === "head" ? document.head : document.body).appendChild(node)
}

function loadGTM(id: string) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" })
  injectOnce("gtm", () => {
    const s = document.createElement("script")
    s.async = true
    s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
    return s
  })
  // GTM noscript fallback immediately inside <body>
  injectOnce(
    "gtm-noscript",
    () => {
      const ns = document.createElement("noscript")
      const iframe = document.createElement("iframe")
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`
      iframe.height = "0"
      iframe.width = "0"
      iframe.style.display = "none"
      iframe.style.visibility = "hidden"
      iframe.title = "Google Tag Manager"
      ns.appendChild(iframe)
      return ns
    },
    "body",
  )
}

function loadGA4(id: string) {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args as unknown as Record<string, unknown>)
  }
  window.gtag("js", new Date())
  // Disable automatic page_view so we emit them on SPA route change
  window.gtag("config", id, { send_page_view: false, anonymize_ip: true })
  injectOnce("ga4", () => {
    const s = document.createElement("script")
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    return s
  })
}

function loadClarity(id: string) {
  injectOnce("clarity", () => {
    const s = document.createElement("script")
    s.type = "text/javascript"
    s.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`
    return s
  })
}

function loadCloudflare(token: string) {
  injectOnce("cloudflare", () => {
    const s = document.createElement("script")
    s.defer = true
    s.src = "https://static.cloudflareinsights.com/beacon.min.js"
    s.setAttribute("data-cf-beacon", JSON.stringify({ token, spa: true }))
    return s
  })
}

function loadPlausible(domain: string) {
  injectOnce("plausible", () => {
    const s = document.createElement("script")
    s.defer = true
    s.setAttribute("data-domain", domain)
    s.src = "https://plausible.io/js/script.js"
    return s
  })
}

export default function Analytics() {
  const { pathname, search } = useLocation()

  // One-time init per provider
  useEffect(() => {
    if (GTM_ID) loadGTM(GTM_ID)
    if (GA_ID) loadGA4(GA_ID)
    if (CLARITY_ID) loadClarity(CLARITY_ID)
    if (CF_TOKEN) loadCloudflare(CF_TOKEN)
    if (PLAUSIBLE_DOMAIN) loadPlausible(PLAUSIBLE_DOMAIN)
  }, [])

  // Fire SPA page_view on route change
  useEffect(() => {
    const url = pathname + (search || "")
    const title = document.title

    if (GTM_ID && window.dataLayer) {
      window.dataLayer.push({ event: "page_view", page_path: url, page_title: title })
    }
    if (GA_ID && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: url, page_title: title, page_location: window.location.href })
    }
    if (CLARITY_ID && typeof window.clarity === "function") {
      window.clarity("set", "page", url)
    }
  }, [pathname, search])

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  )
}
