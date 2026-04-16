import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { DETAIL_CONTENT } from "@/components/knowledge-hub/detail-content"
import { RenderBlocks } from "@/components/knowledge-hub/detail-blocks"
import { Seo, Breadcrumbs } from "@/components/Seo"

export default function KnowledgeHubDetail() {
  const { category, slug } = useParams()
  const key = `${category}/${slug}`
  const content = DETAIL_CONTENT[key]

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
          <div className="container mx-auto px-4 py-10 md:py-16 text-center">
            <Button asChild>
              <Link to="/knowledge-hub">Browse Knowledge Hub</Link>
            </Button>
          </div>
        </main>
      </Layout>
    )
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.summary,
    author: { "@type": "Organization", name: "Pathway Academy Zone" },
    publisher: {
      "@type": "Organization",
      name: "Pathway Academy Zone",
      logo: {
        "@type": "ImageObject",
        url: "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png",
      },
    },
    articleSection: content.categoryLabel,
  }

  return (
    <Layout>
      <Seo title={content.title} description={content.summary} jsonLd={jsonLd} />
      <main className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="max-w-3xl">
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
              <div className="rounded-xl bg-primary-foreground/10 p-5 mb-4 border border-primary-foreground/15">
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
                  Summary
                </p>
                <p className="text-primary-foreground/90 leading-relaxed">{content.summary}</p>
              </div>
              <p className="text-primary-foreground/70 text-sm">{content.meta}</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-3xl mx-auto">
            <RenderBlocks blocks={content.blocks} />

            {content.ctaTitle && (
              <section className="mt-14 rounded-2xl border border-border bg-card p-8 md:p-10 text-center">
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
          </div>
        </div>
      </main>
    </Layout>
  )
}
