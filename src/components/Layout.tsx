import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Analytics from "@/components/Analytics"
import VerificationMeta from "@/components/VerificationMeta"
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/components/Seo"

const SOCIAL_LINKS = [
  "https://www.facebook.com/PathwayAcademyZone",
  "https://www.linkedin.com/company/pathway-academy-zone",
  "https://twitter.com/PathwayAcademyZ",
]

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE, width: 512, height: 512 },
      sameAs: SOCIAL_LINKS,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+44-1782-365365",
        contactType: "customer service",
        email: "info@pathwayacademyzone.co.uk",
        areaServed: "GB",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": `${SITE_URL}#localbusiness`,
      name: SITE_NAME,
      url: SITE_URL,
      image: DEFAULT_OG_IMAGE,
      telephone: "+44-1782-365365",
      email: "info@pathwayacademyzone.co.uk",
      priceRange: "Free for referred learners",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Duncalf Street, Burslem",
        addressLocality: "Stoke-on-Trent",
        addressRegion: "Staffordshire",
        postalCode: "ST6 3LJ",
        addressCountry: "GB",
      },
      geo: { "@type": "GeoCoordinates", latitude: 53.044, longitude: -2.181 },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:30",
          closes: "16:00",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Stoke-on-Trent" },
        { "@type": "AdministrativeArea", name: "Staffordshire" },
      ],
      sameAs: SOCIAL_LINKS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE_URL}#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  // Inject the global Organization / LocalBusiness / WebSite graph once on mount.
  useEffect(() => {
    const id = "global-org"
    const existing = document.head.querySelector(`script[data-seo="${id}"]`)
    if (existing) existing.remove()
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.setAttribute("data-seo", id)
    script.text = JSON.stringify(ORGANIZATION_LD)
    document.head.appendChild(script)
  }, [])

  // Restore scroll on route change.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <VerificationMeta />
      <Analytics />
      <Header />
      <main id="main" className="flex-1 pt-20" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
