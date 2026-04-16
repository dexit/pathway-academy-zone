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

  /**
   * HubSpot portal ID used for the tracking beacon (page views + form captures).
   * Set this to enable HubSpot analytics without the chat widget.
   */
  readonly VITE_HUBSPOT_PORTAL_ID?: string
  /**
   * HubSpot region for the script host. Leave blank for the US tracker
   * ("js.hs-scripts.com"); use "eu1" for EU-hosted portals.
   */
  readonly VITE_HUBSPOT_REGION?: string
  /**
   * Set to "true" to enable the HubSpot live chat / conversations widget.
   * Requires VITE_HUBSPOT_PORTAL_ID (or VITE_HUBSPOT_CHAT_PORTAL_ID for a
   * separate chat-only portal). When unset, the chat widget stays hidden
   * even if the tracker is loaded.
   */
  readonly VITE_HUBSPOT_CHAT?: string
  /** Optional override: a different portal for the chat widget. */
  readonly VITE_HUBSPOT_CHAT_PORTAL_ID?: string

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
