<<<<<<< HEAD
import { Link, useParams, Navigate } from "react-router-dom"
import { ArrowLeft, Clock } from "lucide-react"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
import { ContentSidebar } from "@/components/ContentSidebar"
import { DETAIL_CONTENT } from "@/config/data/knowledge-hub-detail"
=======
import { useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { DETAIL_CONTENT } from "@/components/knowledge-hub/detail-content"
import { RenderBlocks } from "@/components/knowledge-hub/detail-blocks"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
import { SummaryBlock, ReadingTime, RelatedContent, type RelatedItem } from "@/components/SeoBlocks"
import { ContentSidebar } from "@/components/ContentSidebar"
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data"
import { useAutoToc } from "@/hooks/use-auto-toc"
import { buildArticleJsonLd } from "@/lib/json-ld"
>>>>>>> origin/main

export default function KnowledgeHubDetail() {
  const { category, slug } = useParams()
  const content = DETAIL_CONTENT[`${category}/${slug}`]

  if (!content) return <Navigate to="/knowledge-hub" replace />

<<<<<<< HEAD
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
=======
  // Word-count-based reading time from all text blocks.
  const words = content.blocks
    .map((b) => {
      if ("text" in b && typeof b.text === "string") return b.text
      if ("items" in b && Array.isArray(b.items))
        return b.items.map((i) => (typeof i === "string" ? i : (i.title + " " + (i.body ?? "")))).join(" ")
      return ""
    })
    .join(" ")
  const minutes = Math.max(3, Math.round(words.trim().split(/\s+/).length / 230))

  // Sibling resources from the same Knowledge Hub section for "Related".
  const section = HUB_SECTIONS.find((s) => s.title === content.categoryLabel)
  const related: RelatedItem[] = (section?.resources ?? [])
    .filter((r) => !r.href.endsWith(`/${slug}`))
    .slice(0, 4)
    .map((r) => ({ title: r.title, href: r.href, category: content.categoryLabel }))

  // Auto TOC: extract from rendered article DOM (h2 + h3) on mount.
  const articleRef = useRef<HTMLElement>(null)
  const toc = useAutoToc(articleRef, [key])

  const jsonLd = buildArticleJsonLd({
    title: content.title,
    description: content.summary,
    url: `${SITE_URL}/knowledge-hub/${category}/${slug}`,
    section: content.categoryLabel,
    minutesToRead: minutes,
    wordCount: words.trim().split(/\s+/).length,
  })
>>>>>>> origin/main

  return (
    <Layout>
<<<<<<< HEAD
      <Seo title={content.title} description={content.summary} jsonLd={jsonLd} />
<<<<<<< HEAD
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-24">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Knowledge Hub", to: "/knowledge-hub" },
                { label: content.categoryLabel, to: content.categoryHref },
                { label: content.title },
=======
=======
      <Seo
        title={content.title}
        description={content.summary}
        type="article"
        section={content.categoryLabel}
        jsonLd={jsonLd}
      />
>>>>>>> origin/main
      <main className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl">
              <Breadcrumbs
                items={[
                  { label: "Knowledge Hub", to: "/knowledge-hub" },
                  { label: content.categoryLabel, to: content.categoryHref },
                  { label: content.title },
                ]}
                className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
              />
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-balance">
                {content.title}
              </h1>
              <SummaryBlock summary={content.summary} variant="onDark" className="mb-4" />
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/70 text-sm">
                <ReadingTime
                  minutes={minutes}
                  className="text-primary-foreground/70"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
            <article ref={articleRef} className="max-w-none mx-auto lg:mx-0 w-full">
              <RenderBlocks blocks={content.blocks} />

              {related.length > 0 && (
                <RelatedContent items={related} className="mt-14" />
              )}

            {content.ctaTitle && (
              <section className="mt-14 rounded-2xl border border-border bg-card p-8 md:p-10 text-center bg-primary/10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {content.ctaTitle}
                </h2>
                {content.ctaBody && (
                  <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
                    {content.ctaBody}
                  </p>
                )}
                {content.ctaButtons && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {content.ctaButtons.map((btn) => (
                      <Button
                        key={btn.href}
                        asChild
                        variant={btn.variant === "outline" ? "outline" : "default"}
                        className={btn.variant === "primary" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                      >
                        <Link to={btn.href}>{btn.label}</Link>
                      </Button>
                    ))}
                  </div>
                )}
              </section>
            )}

              <div className="mt-10 flex justify-center">
                <Link
                  to="/knowledge-hub/complete-guide"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to The Complete Guide to Alternative Provision
                </Link>
              </div>
            </article>

            <ContentSidebar
              toc={toc}
              ctas={[
                {
                  label: "Make a Referral",
                  description: "Refer a young person in 4 steps",
                  href: "/referral",
                  tone: "primary",
                },
                {
                  label: "Download Policies",
                  description: "Safeguarding & pastoral documents",
                  href: "/policies",
                },
>>>>>>> origin/main
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
