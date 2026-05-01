import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Clock, BookOpen, ChevronRight } from "lucide-react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { DETAIL_CONTENT } from "@/config/data/knowledge-hub-detail"
import { RenderBlocks } from "@/components/knowledge-hub/detail-blocks"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
import { SummaryBlock, ReadingTime, RelatedContent, type RelatedItem } from "@/components/SeoBlocks"
import { ContentSidebar } from "@/components/ContentSidebar"
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data"

export default function KnowledgeHubDetail() {
  const { category, slug } = useParams()
  const key = `${category}/${slug}`
  const content = (DETAIL_CONTENT as any)[key]

  if (!content) {
    return (
      <Layout>
        <Seo title="Resource not found" noIndex />
        <main className="min-h-screen bg-background">
          <header className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-14 md:py-20">
              <div className="max-w-3xl">
                <Link
                  to="/knowledge-hub"
                  className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors font-bold uppercase tracking-widest text-xs"
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
          <div className="container mx-auto px-4 py-20 text-center">
            <Button asChild size="xl" className="rounded-full px-10">
              <Link to="/knowledge-hub">Browse Knowledge Hub</Link>
            </Button>
          </div>
        </main>
      </Layout>
    )
  }

  const words = content.blocks
    .map((b: any) => {
      if ("text" in b && typeof b.text === "string") return b.text
      if ("items" in b && Array.isArray(b.items))
        return b.items.map((i: any) => (typeof i === "string" ? i : (i.title + " " + (i.body ?? "")))).join(" ")
      return ""
    })
    .join(" ")
  const minutes = Math.max(3, Math.round(words.trim().split(/\s+/).length / 230))

  const section = HUB_SECTIONS.find((s) => s.title === content.categoryLabel)
  const related: RelatedItem[] = (section?.resources ?? [])
    .filter((r) => !r.href.endsWith(`/${slug}`))
    .slice(0, 4)
    .map((r) => ({ title: r.title, href: r.href, category: content.categoryLabel }))

  const toc = content.blocks
    .filter((b: any): b is { type: "h2"; text: string } => b.type === "h2")
    .map((h: any) => ({
      id: h.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      label: h.text,
      level: 2 as const,
    }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "description": content.summary,
    "abstract": content.summary,
    "wordCount": words.trim().split(/\s+/).length,
    "timeRequired": `PT${minutes}M`,
    "url": `${SITE_URL}/knowledge-hub/${category}/${slug}`,
    "author": { "@type": "Organization", "name": "Pathway Academy Zone" },
    "publisher": {
      "@type": "Organization",
      "name": "Pathway Academy Zone",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png",
      },
    },
    "articleSection": content.categoryLabel,
  }

  return (
    <Layout>
      <Seo title={content.title} description={content.summary} jsonLd={jsonLd} />
      <main className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-24">
            <div className="max-w-4xl lg:max-w-5xl">
              <Breadcrumbs
                items={[
                  { label: "Knowledge Hub", to: "/knowledge-hub" },
                  { label: content.categoryLabel, to: content.categoryHref },
                  { label: content.title },
                ]}
                className="text-primary-foreground/70 mb-8 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
              />
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em]">
                  {content.categoryLabel}
                </span>
                <div className="h-px w-8 bg-primary-foreground/20" />
                <div className="flex items-center gap-2 text-primary-foreground/70 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{minutes} Min Read</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight text-balance">
                {content.title}
              </h1>
              <div className="max-w-3xl">
                <SummaryBlock summary={content.summary} variant="onDark" className="mb-0 text-lg md:text-xl opacity-90 leading-relaxed" />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20">
            <article className="max-w-none mx-auto lg:mx-0 w-full prose prose-lg md:prose-xl prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
              <RenderBlocks blocks={content.blocks} />

              {related.length > 0 && (
                <div className="not-prose mt-20">
                   <div className="flex items-center gap-3 mb-10">
                      <div className="w-1 h-6 rounded-full bg-primary" />
                      <h2 className="font-display text-2xl font-bold text-foreground uppercase tracking-widest text-sm">
                        Related Resources
                      </h2>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {related.map((r) => (
                        <Link
                          key={r.href}
                          to={r.href}
                          className="group block bg-card border border-border/50 rounded-3xl p-8 hover:shadow-xl hover:border-primary/30 transition-all"
                        >
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                             <BookOpen className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                            {r.title}
                          </h3>
                          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                             Read Now <ChevronRight className="w-3 h-3" />
                          </div>
                        </Link>
                      ))}
                   </div>
                </div>
              )}

            {content.ctaTitle && (
              <section className="not-prose mt-20 rounded-[3rem] bg-primary text-primary-foreground p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  {content.ctaTitle}
                </h2>
                {content.ctaBody && (
                  <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
                    {content.ctaBody}
                  </p>
                )}
                {content.ctaButtons && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {content.ctaButtons.map((btn: any) => (
                      <Button
                        key={btn.href}
                        asChild
                        size="xl"
                        className={btn.variant === "primary" ? "bg-white text-primary hover:bg-white/90 font-bold px-10 h-16 rounded-full" : "border-2 border-white/40 bg-transparent text-white hover:bg-white/10 px-10 h-16 rounded-full"}
                      >
                        <Link to={btn.href}>{btn.label}</Link>
                      </Button>
                    ))}
                  </div>
                )}
              </section>
            )}

              <div className="not-prose mt-16 pt-8 border-t border-border flex justify-center">
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground font-bold uppercase tracking-widest text-[10px]">
                  <Link
                    to="/knowledge-hub/complete-guide"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to The Complete Guide
                  </Link>
                </Button>
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
