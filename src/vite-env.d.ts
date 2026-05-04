/// <reference types="vite/client" />

interface ImportMetaEnv {
  // ── Page analytics ─────────────────────────────────────────────────
  /** Google Tag Manager container ID, e.g. "GTM-XXXXXXX" */
  readonly VITE_GTM_ID?: string
  /** Google Analytics 4 Measurement ID, e.g. "G-XXXXXXXXXX" */
  readonly VITE_GA_ID?: string
  /** Microsoft Clarity project ID */
  readonly VITE_CLARITY_ID?: string
  /** Cloudflare Web Analytics token */
  readonly VITE_CF_ANALYTICS_TOKEN?: string
  /** Plausible Analytics domain (legacy; cookie-less) */
  readonly VITE_PLAUSIBLE_DOMAIN?: string

  // ── Ads / conversion tracking ──────────────────────────────────────
  /** Google Ads conversion ID, e.g. "AW-123456789" */
  readonly VITE_GOOGLE_ADS_ID?: string
  /** Google Ads conversion label for lead/referral events */
  readonly VITE_GOOGLE_ADS_CONVERSION_LABEL?: string
  /** Bing / Microsoft Ads Universal Event Tracking tag ID */
  readonly VITE_BING_UET_ID?: string
  /** Meta (Facebook) Pixel ID */
  readonly VITE_META_PIXEL_ID?: string
  /** LinkedIn Insight Tag partner ID */
  readonly VITE_LINKEDIN_PARTNER_ID?: string
  /** TikTok Pixel ID */
  readonly VITE_TIKTOK_PIXEL_ID?: string

  // ── HubSpot CRM ────────────────────────────────────────────────────
  readonly VITE_HUBSPOT_PORTAL_ID?: string
  readonly VITE_HUBSPOT_REGION?: string
  readonly VITE_HUBSPOT_CHAT?: string
  readonly VITE_HUBSPOT_CHAT_PORTAL_ID?: string

  // ── Search engine verification ─────────────────────────────────────
  /** Google Search Console HTML-tag verification token */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string
  /** Bing Webmaster Tools (msvalidate.01) */
  readonly VITE_BING_SITE_VERIFICATION?: string
  /** Yandex Webmaster verification */
  readonly VITE_YANDEX_VERIFICATION?: string
  /** Facebook domain verification token */
  readonly VITE_FACEBOOK_DOMAIN?: string
  /** Pinterest domain verification token */
  readonly VITE_PINTEREST_VERIFICATION?: string
  /** Apple Maps MapKit JS token (for embedded map widget) */
  readonly VITE_APPLE_MAPS_TOKEN?: string

  // ── IndexNow ───────────────────────────────────────────────────────
  /** IndexNow key — must match the /{key}.txt file in public/ */
  readonly VITE_INDEXNOW_KEY?: string

  // ── WordPress / AI ─────────────────────────────────────────────────
  readonly VITE_WP_API_URL?: string
  readonly VITE_OPENROUTER_API_KEY?: string
  readonly VITE_LOCAL_AI_URL?: string
  readonly VITE_VITALS_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
