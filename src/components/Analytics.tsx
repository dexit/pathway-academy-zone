import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

/**
 * One-stop Analytics + Conversion-Tracking component.
 * Every provider is OPT-IN via environment variables — the site ships
 * with zero third-party scripts unless you configure them in Vercel/CF.
 *
 * ── Page analytics ──────────────────────────────────────────────────
 *  VITE_GTM_ID              Google Tag Manager container ID  (GTM-XXXXXXX)
 *  VITE_GA_ID               GA4 Measurement ID               (G-XXXXXXXXXX)
 *  VITE_CLARITY_ID          Microsoft Clarity project ID
 *  VITE_CF_ANALYTICS_TOKEN  Cloudflare Web Analytics token
 *  VITE_PLAUSIBLE_DOMAIN    Plausible domain (cookie-less)
 *
 * ── Ads / conversion ────────────────────────────────────────────────
 *  VITE_GOOGLE_ADS_ID               Google Ads conversion ID (AW-XXXXXXXXXX)
 *  VITE_GOOGLE_ADS_CONVERSION_LABEL Google Ads conversion label
 *  VITE_BING_UET_ID                 Bing / Microsoft Ads UET tag ID
 *  VITE_META_PIXEL_ID               Meta (Facebook) Pixel ID
 *  VITE_LINKEDIN_PARTNER_ID         LinkedIn Insight Tag partner ID
 *  VITE_TIKTOK_PIXEL_ID             TikTok Pixel ID
 *
 * ── CRM ─────────────────────────────────────────────────────────────
 *  VITE_HUBSPOT_PORTAL_ID           HubSpot portal ID (tracker)
 *  VITE_HUBSPOT_REGION              "" (US) | "eu1"
 *  VITE_HUBSPOT_CHAT                "true" to enable chat widget
 *  VITE_HUBSPOT_CHAT_PORTAL_ID      Override portal for chat widget
 */

type Env = Record<string, string | undefined>
const env: Env = (import.meta as { env?: Env }).env || {}

const GTM_ID       = env.VITE_GTM_ID
const GA_ID        = env.VITE_GA_ID
const CLARITY_ID   = env.VITE_CLARITY_ID
const CF_TOKEN     = env.VITE_CF_ANALYTICS_TOKEN
const PLAUSIBLE_DOMAIN = env.VITE_PLAUSIBLE_DOMAIN

const GADS_ID     = env.VITE_GOOGLE_ADS_ID
const GADS_LABEL  = env.VITE_GOOGLE_ADS_CONVERSION_LABEL
const BING_UET_ID = env.VITE_BING_UET_ID
const META_PIXEL  = env.VITE_META_PIXEL_ID
const LI_PARTNER  = env.VITE_LINKEDIN_PARTNER_ID
const TIKTOK_PX   = env.VITE_TIKTOK_PIXEL_ID

const HS_PORTAL_ID      = env.VITE_HUBSPOT_PORTAL_ID
const HS_REGION         = env.VITE_HUBSPOT_REGION
const HS_CHAT_ENABLED   = (env.VITE_HUBSPOT_CHAT || "").toLowerCase() === "true"
const HS_CHAT_PORTAL_ID = env.VITE_HUBSPOT_CHAT_PORTAL_ID || HS_PORTAL_ID

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
    _hsq?: Array<unknown[]>
    hsConversationsSettings?: { loadImmediately?: boolean }
    hsConversationsOnReady?: Array<() => void>
    HubSpotConversations?: {
      widget: { load: () => void; remove: () => void; open: () => void }
    }
    uetq?: Array<unknown>
    fbq?: (...args: unknown[]) => void
    _linkedin_data_partner_id?: string
    lintrk?: (action: string, data: Record<string, unknown>) => void
    ttq?: { track: (e: string, d?: Record<string, unknown>) => void; page: () => void; load: (id: string) => void }
  }
}

function injectOnce(id: string, build: () => HTMLElement, target: "head" | "body" = "head") {
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
  injectOnce("gtm-noscript", () => {
    const ns = document.createElement("noscript")
    const iframe = document.createElement("iframe")
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`
    iframe.height = "0"; iframe.width = "0"
    iframe.style.cssText = "display:none;visibility:hidden"
    iframe.title = "Google Tag Manager"
    ns.appendChild(iframe)
    return ns
  }, "body")
}

function loadGA4(id: string) {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args as unknown as Record<string, unknown>)
  }
  window.gtag("js", new Date())
  window.gtag("config", id, { send_page_view: false, anonymize_ip: true })
  injectOnce("ga4", () => {
    const s = document.createElement("script")
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    return s
  })
}

function loadGoogleAds(adsId: string) {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args as unknown as Record<string, unknown>)
    }
    window.gtag("js", new Date())
  }
  window.gtag("config", adsId)
  injectOnce("google-ads", () => {
    const s = document.createElement("script")
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${adsId}`
    return s
  })
}

function loadBingUET(tagId: string) {
  window.uetq = window.uetq || []
  injectOnce("bing-uet", () => {
    const s = document.createElement("script")
    s.async = true
    s.text = `(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${tagId}",enableAutoSpaTracking:true};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","https://bat.bing.com/bat.js","uetq");`
    return s
  })
}

function loadMetaPixel(pixelId: string) {
  injectOnce("meta-pixel", () => {
    const s = document.createElement("script")
    s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`
    return s
  })
  injectOnce("meta-pixel-noscript", () => {
    const ns = document.createElement("noscript")
    const img = document.createElement("img")
    img.height = 1; img.width = 1
    img.style.cssText = "display:none"
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`
    img.alt = ""
    ns.appendChild(img)
    return ns
  }, "body")
}

function loadLinkedIn(partnerId: string) {
  window._linkedin_data_partner_id = partnerId
  injectOnce("linkedin-insight", () => {
    const s = document.createElement("script")
    s.type = "text/javascript"
    s.text = `_linkedin_partner_id="${partnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);`
    return s
  })
  injectOnce("linkedin-noscript", () => {
    const ns = document.createElement("noscript")
    const img = document.createElement("img")
    img.height = 1; img.width = 1
    img.style.cssText = "display:none"
    img.alt = ""
    img.src = `https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`
    ns.appendChild(img)
    return ns
  }, "body")
}

function loadTikTokPixel(pixelId: string) {
  injectOnce("tiktok-pixel", () => {
    const s = document.createElement("script")
    s.text = `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load("${pixelId}");ttq.page();}(window,document,"ttq");`
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

function loadHubSpotTracker(portalId: string, region?: string) {
  window._hsq = window._hsq || []
  if (!window.hsConversationsSettings) {
    window.hsConversationsSettings = { loadImmediately: false }
  }
  const host = region === "eu1" ? "js-eu1.hs-scripts.com" : "js.hs-scripts.com"
  injectOnce("hubspot", () => {
    const s = document.createElement("script")
    s.async = true; s.defer = true; s.id = "hs-script-loader"
    s.src = `https://${host}/${portalId}.js`
    return s
  })
}

function loadHubSpotChat(portalId: string, region?: string) {
  window.hsConversationsSettings = { ...window.hsConversationsSettings, loadImmediately: true }
  window.hsConversationsOnReady = window.hsConversationsOnReady || []
  window.hsConversationsOnReady.push(() => window.HubSpotConversations?.widget.load())
  if (!document.getElementById("hs-script-loader")) {
    const host = region === "eu1" ? "js-eu1.hs-scripts.com" : "js.hs-scripts.com"
    injectOnce("hubspot", () => {
      const s = document.createElement("script")
      s.async = true; s.defer = true; s.id = "hs-script-loader"
      s.src = `https://${host}/${portalId}.js`
      return s
    })
  }
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

// ── Exported conversion helper — call from form success handlers ─────
export type ConversionEvent = "referral_submit" | "contact_submit" | "careers_submit" | "lead"

export function fireConversion(event: ConversionEvent) {
  if ((GA_ID || GADS_ID) && typeof window.gtag === "function") {
    if (GADS_ID && GADS_LABEL) {
      window.gtag("event", "conversion", { send_to: `${GADS_ID}/${GADS_LABEL}`, event_category: "lead" })
    }
    window.gtag("event", event, { event_category: "lead" })
  }
  if (BING_UET_ID && window.uetq) {
    window.uetq.push("event", event, {})
  }
  if (META_PIXEL && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: event })
  }
  if (LI_PARTNER && typeof window.lintrk === "function") {
    window.lintrk("track", { conversion_id: event })
  }
  if (TIKTOK_PX && window.ttq) {
    window.ttq.track("SubmitForm", { content_name: event })
  }
  if (GTM_ID && window.dataLayer) {
    window.dataLayer.push({ event, event_category: "lead" })
  }
}

export default function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (GTM_ID)           loadGTM(GTM_ID)
    if (GA_ID)            loadGA4(GA_ID)
    if (GADS_ID)          loadGoogleAds(GADS_ID)
    if (BING_UET_ID)      loadBingUET(BING_UET_ID)
    if (META_PIXEL)       loadMetaPixel(META_PIXEL)
    if (LI_PARTNER)       loadLinkedIn(LI_PARTNER)
    if (TIKTOK_PX)        loadTikTokPixel(TIKTOK_PX)
    if (CLARITY_ID)       loadClarity(CLARITY_ID)
    if (CF_TOKEN)         loadCloudflare(CF_TOKEN)
    if (PLAUSIBLE_DOMAIN) loadPlausible(PLAUSIBLE_DOMAIN)
    if (HS_PORTAL_ID)     loadHubSpotTracker(HS_PORTAL_ID, HS_REGION)
    if (HS_CHAT_ENABLED && HS_CHAT_PORTAL_ID) loadHubSpotChat(HS_CHAT_PORTAL_ID, HS_REGION)
  }, [])

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
    if (HS_PORTAL_ID && window._hsq) {
      window._hsq.push(["setPath", url])
      window._hsq.push(["trackPageView"])
    }
    if (META_PIXEL && typeof window.fbq === "function") {
      window.fbq("track", "PageView")
    }
    if (TIKTOK_PX && window.ttq) {
      window.ttq.page()
    }
  }, [pathname, search])

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  )
}
