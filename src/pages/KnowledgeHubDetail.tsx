import { useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { DETAIL_CONTENT } from "@/components/knowledge-hub/detail-content"
import { RenderBlocks } from "@/components/knowledge-hub/detail-blocks"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
import { SummaryBlock, ReadingTime, RelatedContent, type RelatedItem } from "@/components/SeoBlocks"
import { ContentSidebar } from "@/components/ContentSidebar"
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data"
<<<<<<< HEAD
<<<<<<< HEAD
import { useTableOfContents } from "@/hooks/useTableOfContents"
=======
import { useAutoToc } from "@/hooks/use-auto-toc"
import { buildArticleJsonLd } from "@/lib/json-ld"
>>>>>>> origin/main
=======
import { useAutoToc } from "@/hooks/use-auto-toc"
import { buildArticleJsonLd } from "@/lib/json-ld"
>>>>>>> origin/main

export default function KnowledgeHubDetail() {
  const { category, slug } = useParams()
  const key = `${category}/${slug}`
  const content = DETAIL_CONTENT[key]

  // Use the hook to track dynamic headers
  const toc = useTableOfContents("article h2");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  if (!content) {
    return (
      <Layout>
        <Seo title="Resource not found" noIndex />
        <main className="min-h-screen bg-background">
          <header className="bg-primary text-primary-foreground">
            <div className="container-wide py-14 md:py-20">
              <div className="max-w-3xl">
                <Link
                  to="/knowledge-hub"
                  className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Knowledge Hub
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 capitalize">
                  {slug?.replace(/-/g, " ") || "Resource"}
                </h1>
                <p className="text-primary-foreground/70 text-lg leading-relaxed">
                  This resource is being prepared. Explore the rest of our Knowledge Hub in the meantime.
                </p>
              </div>
            </div>
          </header>
          <div className="container-wide py-16 text-center">
            <Button asChild>
              <Link to="/knowledge-hub">Browse Knowledge Hub</Link>
            </Button>
          </div>
        </main>
      </Layout>
    )
  }

  // Word-count-based reading time
  const words = content.blocks
    .map((b) => {
      if ("text" in b && typeof b.text === "string") return b.text
      if ("items" in b && Array.isArray(b.items))
        return b.items.map((i) => (typeof i === "string" ? i : (i.title + " " + (i.body ?? "")))).join(" ")
      return ""
    })
    .join(" ")
  const minutes = Math.max(3, Math.round(words.trim().split(/\s+/).length / 230))

  // Sibling resources
  const section = HUB_SECTIONS.find((s) => s.title === content.categoryLabel)
  const related: RelatedItem[] = (section?.resources ?? [])
    .filter((r) => !r.href.endsWith(`/${slug}`))
    .slice(0, 4)
    .map((r) => ({ title: r.title, href: r.href, category: content.categoryLabel }))

<<<<<<< HEAD
<<<<<<< HEAD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.summary,
    author: { "@type": "Organization", name: "Pathway Academy Zone" },
    publisher: {
      "@type": "Organization",
      name: "Pathway Academy Zone",
      logo: { "@type": "ImageObject", url: "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png" },
    },
    articleSection: content.categoryLabel,
  }
=======
  // Auto TOC: extract from rendered article DOM (h2 + h3) on mount.
  const articleRef = useRef<HTMLElement>(null)
  const toc = useAutoToc(articleRef, [key])

  const jsonLd = buildArticleJsonLd({
    title: content.title,
    description: content.summary,
=======
  // Auto TOC: extract from rendered article DOM (h2 + h3) on mount.
  const articleRef = useRef<HTMLElement>(null)
  const toc = useAutoToc(articleRef, [key])

  const jsonLd = buildArticleJsonLd({
    title: content.title,
    description: content.summary,
>>>>>>> origin/main
    url: `${SITE_URL}/knowledge-hub/${category}/${slug}`,
    section: content.categoryLabel,
    minutesToRead: minutes,
    wordCount: words.trim().split(/\s+/).length,
  })
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> origin/main

  return (
    <Layout>
      <Seo title={content.title} description={content.summary} jsonLd={jsonLd} />
      <main className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground relative overflow-hidden">
          <div aria-hidden className="absolute top-0 right-0 w-1/3 h-full bg-card/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
          <div className="container-wide py-14 md:py-20 relative z-10">
            <div className="max-w-4xl">
              <Breadcrumbs
                items={[
                  { label: "Knowledge Hub", to: "/knowledge-hub" },
                  { label: content.categoryLabel, to: content.categoryHref },
                  { label: content.title },
                ]}
                className="text-primary-foreground/70 mb-8 md:mb-12 [&_a]:text-primary-foreground/80 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground"
              />
              <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-6 text-balance">
                {content.title}
              </h1>
              <SummaryBlock summary={content.summary} variant="onDark" className="mb-6" />
              <ReadingTime minutes={minutes} className="text-primary-foreground/70" />
            </div>
          </div>
        </header>

<<<<<<< HEAD
        <div className="container-wide py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 xl:gap-20">
            <article className="max-w-none w-full min-w-0">
=======
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
            <article ref={articleRef} className="max-w-none mx-auto lg:mx-0 w-full">
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> origin/main
              <RenderBlocks blocks={content.blocks} />

              {related.length > 0 && (
                <RelatedContent items={related} className="mt-14" />
              )}

              {content.ctaTitle && (
                <section className="mt-16 rounded-3xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {content.ctaTitle}
                  </h2>
                  {content.ctaBody && (
                    <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                      {content.ctaBody}
                    </p>
                  )}
                  {content.ctaButtons && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {content.ctaButtons.map((btn) => (
                        <Button
                          key={btn.href}
                          asChild
                          variant={btn.variant === "outline" ? "outline" : "default"}
                          className={`rounded-full px-8 h-12 font-bold ${btn.variant === "primary" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : ""}`}
                        >
                          <Link to={btn.href}>{btn.label}</Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </section>
              )}

              <div className="mt-12 flex justify-center">
                <Link
                  to="/knowledge-hub"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Knowledge Hub
                </Link>
              </div>
            </article>

            <ContentSidebar
              toc={toc}
              ctas={[
                {
                  label: "Make a Referral",
                  description: "Help a young person thrive through relational education.",
                  href: "/referral",
                  tone: "primary",
                },
                {
                  label: "Download Policies",
                  description: "Access our safeguarding and operational documents.",
                  href: "/policies",
                },
              ]}
              quickContact={{
                phone: "01782 365365",
                email: "info@pathwayacademyzone.co.uk",
              }}
            />
          </div>
        </div>
      </main>
    </Layout>
  )
}
