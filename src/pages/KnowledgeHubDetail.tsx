import { Link, useParams, Navigate } from "react-router-dom"
import { ArrowLeft, Clock } from "lucide-react"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
import { ContentSidebar } from "@/components/ContentSidebar"
import { DETAIL_CONTENT } from "@/config/data/knowledge-hub-detail"

export default function KnowledgeHubDetail() {
  const { category, slug } = useParams()
  const content = DETAIL_CONTENT[`${category}/${slug}`]

  if (!content) return <Navigate to="/knowledge-hub" replace />

  const toc = content.blocks
    .filter((b: any) => b.type === "h2")
    .map((h: any) => ({
      id: h.text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      label: h.text,
      level: 2 as const,
    }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "description": content.summary,
    "url": `${SITE_URL}/knowledge-hub/${category}/${slug}`,
    "author": { "@type": "Organization", "name": "Pathway Academy Zone" },
    "articleSection": content.categoryLabel,
  }

  return (
    <Layout>
      <Seo title={content.title} description={content.summary} jsonLd={jsonLd} />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-24">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Knowledge Hub", to: "/knowledge-hub" },
                { label: content.categoryLabel, to: content.categoryHref },
                { label: content.title },
              ]}
              className="text-primary-foreground/70 mb-8"
            />
            <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
              {content.title}
            </h1>
            <p className="text-primary-foreground/80 text-xl md:text-2xl leading-relaxed max-w-3xl">
              {content.summary}
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20">
          <article className="prose prose-lg max-w-none">
            {content.blocks.map((block: any, i: number) => (
              <div key={i} className="mb-8">
                {block.type === "h2" && <h2 id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="text-3xl font-bold mt-12 mb-6">{block.text}</h2>}
                {block.type === "p" && <p className="text-muted-foreground leading-relaxed">{block.text}</p>}
              </div>
            ))}
          </article>

          <ContentSidebar
            toc={toc}
            ctas={[
              { label: "Make a Referral", description: "Refer a young person", href: "/referral", tone: "primary" },
              { label: "Knowledge Hub", description: "Browse all topics", href: "/knowledge-hub" },
            ]}
            quickContact={{ phone: "01782 365365", email: "info@pathwayacademyzone.co.uk" }}
          />
        </div>
      </div>
    </Layout>
  )
}
