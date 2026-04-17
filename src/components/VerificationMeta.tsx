import { useEffect } from "react"

/**
 * Search-engine verification meta tags, all opt-in via environment variables.
 *
 *  VITE_GOOGLE_SITE_VERIFICATION   Google Search Console
 *  VITE_BING_SITE_VERIFICATION     Bing Webmaster Tools (msvalidate.01)
 *  VITE_YANDEX_VERIFICATION        Yandex Webmaster
 *  VITE_FACEBOOK_DOMAIN            Facebook domain verification
 *  VITE_PINTEREST_VERIFICATION     Pinterest domain verification
 */

type Env = Record<string, string | undefined>
const env: Env = (import.meta as { env?: Env }).env || {}

const tags: Array<{ name: string; value: string | undefined }> = [
  { name: "google-site-verification", value: env.VITE_GOOGLE_SITE_VERIFICATION },
  { name: "msvalidate.01", value: env.VITE_BING_SITE_VERIFICATION },
  { name: "yandex-verification", value: env.VITE_YANDEX_VERIFICATION },
  { name: "facebook-domain-verification", value: env.VITE_FACEBOOK_DOMAIN },
  { name: "p:domain_verify", value: env.VITE_PINTEREST_VERIFICATION },
]

export default function VerificationMeta() {
  useEffect(() => {
    for (const { name, value } of tags) {
      if (!value) continue
      let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute("name", name)
        document.head.appendChild(el)
      }
      el.setAttribute("content", value)
    }
  }, [])

  return null
}
