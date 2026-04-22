import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Clock, Share2 } from "lucide-react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { DETAIL_CONTENT } from "@/config/data/knowledge-hub-detail"
import { RenderBlocks } from "@/components/knowledge-hub/detail-blocks"
import { Seo, Breadcrumbs } from "@/components/Seo"
import { SummaryBlock } from "@/components/SeoBlocks"
import { ContentSidebar } from "@/components/ContentSidebar"
import { motion } from "framer-motion"

export default function KnowledgeHubDetail() {
  const { category, slug } = useParams()
  const key = `${category}/${slug}`
  const content = DETAIL_CONTENT[key]

  if (!content) {
    return (
      <Layout>
        <Seo title="Intel Not Found" noIndex />
        <main className="min-h-screen bg-background">
          <header className="pt-40 pb-24 bg-foreground text-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <Link
                  to="/knowledge-hub"
                  className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-widest mb-12 hover:gap-5 transition-all text-sm"
                >
                  <ArrowLeft className="w-5 h-5" /> BACK TO HUB
                </Link>
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                  INTEL <br /><span className="text-primary">MISSING.</span>
                </h1>
                <p className="text-background/60 text-xl font-medium leading-relaxed">
                  This repository has not been initialized yet.
                </p>
              </div>
            </div>
          </header>
        </main>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title={content.title} description={content.summary} type="article" />

      <main className="min-h-screen bg-background">
        <header className="pt-40 pb-24 bg-accent/30 border-b border-border/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl">
              <Breadcrumbs
                items={[
                  { label: "Knowledge Hub", to: "/knowledge-hub" },
                  { label: content.categoryLabel, to: content.categoryHref },
                  { label: content.title },
                ]}
                className="mb-8"
              />
              <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">DOC_TYPE: INTELLIGENCE_REPORT</span>
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                {content.title}
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-muted-foreground text-sm font-black uppercase tracking-widest mt-12">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 6 MIN READ</div>
                <div className="flex items-center gap-2"><Share2 className="w-4 h-4 text-primary" /> ENCRYPTED SHARE</div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-20 lg:gap-32">
            <article className="min-w-0">
              <SummaryBlock summary={content.summary} className="mb-16 p-10 bg-primary/5 rounded-[2rem] border-2 border-primary/10 text-2xl font-medium leading-relaxed italic text-foreground" />

              <div className="prose prose-xl prose-primary dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-muted-foreground prose-p:font-medium prose-p:leading-relaxed">
                <RenderBlocks blocks={content.blocks} />
              </div>

              {content.ctaTitle && (
                <section className="mt-24 rounded-[2.5rem] bg-foreground text-background p-12 md:p-20 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-primary/10 opacity-20 pointer-events-none" />
                  <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                      {content.ctaTitle}
                    </h2>
                    {content.ctaBody && (
                      <p className="text-background/60 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-xl">
                        {content.ctaBody}
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-6">
                      <Button asChild size="lg" className="rounded-full px-12 h-16 text-lg font-black italic shadow-xl">
                        <Link to="/referral">INITIATE PROTOCOL</Link>
                      </Button>
                    </div>
                  </div>
                </section>
              )}

              <div className="mt-20 pt-20 border-t border-border/10 flex justify-center">
                <Link
                  to="/knowledge-hub"
                  className="inline-flex items-center gap-4 text-muted-foreground hover:text-primary transition-all font-black uppercase tracking-[0.2em] text-sm"
                >
                  <ArrowLeft className="w-5 h-5" /> BACK TO CENTRAL HUB
                </Link>
              </div>
            </article>

            <aside className="sticky top-32">
              <ContentSidebar
                ctas={[
                  {
                    label: "Make a Referral",
                    href: "/referral",
                    tone: "primary",
                  },
                  {
                    label: "Download Briefing",
                    href: "/policies",
                  },
                ]}
                quickContact={{
                  phone: "01782 365365",
                  email: "info@pathwayacademyzone.co.uk",
                }}
              />
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  )
}
