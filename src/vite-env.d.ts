/// <reference types="vite/client" />

interface ImportMetaEnv {
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

  /** Google Search Console verification token */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string
  /** Bing Webmaster Tools verification (msvalidate.01) */
  readonly VITE_BING_SITE_VERIFICATION?: string
  /** Yandex Webmaster verification */
  readonly VITE_YANDEX_VERIFICATION?: string
  /** Facebook domain verification token */
  readonly VITE_FACEBOOK_DOMAIN?: string
  /** Pinterest domain verification token */
  readonly VITE_PINTEREST_VERIFICATION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
