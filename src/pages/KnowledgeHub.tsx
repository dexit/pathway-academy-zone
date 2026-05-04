import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Phone, CheckCircle, GraduationCap, Users } from "lucide-react"
import { HubSectionCard } from "@/components/knowledge-hub/hub-section-card"
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
<<<<<<< HEAD

export default function KnowledgeHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Knowledge Hub - Alternative Provision Resources",
    "description": "Comprehensive resource for Alternative Provision. Expert guides, practical comparisons, and evidence-based best practices.",
    "url": `${SITE_URL}/knowledge-hub`,
    "hasPart": HUB_SECTIONS.map(s => ({
      "@type": "CollectionPage",
      "name": s.title,
      "url": `${SITE_URL}/knowledge-hub/${s.id}`
    }))
  };
=======
import { buildKnowledgeHubSchema, buildItemListJsonLd, ORG_SCHEMA, WEBSITE_SCHEMA } from "@/lib/json-ld"

export default function KnowledgeHub() {
  const hubJsonLd = [
    ORG_SCHEMA,
    WEBSITE_SCHEMA,
    buildKnowledgeHubSchema(
      HUB_SECTIONS.map((s) => ({ title: s.title, id: s.id, description: s.description }))
    ),
    buildItemListJsonLd(
      HUB_SECTIONS.flatMap((s) =>
        s.resources.map((r) => ({ title: r.title, href: `${SITE_URL}${r.href}` }))
      ),
      "Alternative Provision Knowledge Hub — All Resources"
    ),
  ];
>>>>>>> origin/main

  return (
    <Layout>
      <Seo
        title="Knowledge Hub"
<<<<<<< HEAD
        description="Your comprehensive resource for Alternative Provision. Expert guides, practical comparisons, and evidence-based best practices."
        jsonLd={jsonLd}
=======
        description="Your comprehensive resource for Alternative Provision. Expert guides, practical comparisons, and evidence-based best practices for educators, parents, and professionals."
        jsonLd={hubJsonLd}
>>>>>>> origin/main
      />
      <main className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="max-w-3xl">
              <Breadcrumbs
                items={[{ label: "Knowledge Hub" }]}
                className="text-primary-foreground/70 mb-6"
              />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                <GraduationCap className="w-3 h-3" />
                Resource Library
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
                Knowledge Hub
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed text-balance">
                Your comprehensive resource for understanding Alternative
                Provision. Expert guides, practical comparisons, and
                evidence-based best practices for educators, parents, and
                professionals.
              </p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-16 space-y-20">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {HUB_SECTIONS.map((section) => (
                <HubSectionCard key={section.id} section={section} />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-primary/5 px-8 py-14 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden text-center lg:text-left">
            <div className="max-w-2xl relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Need Support with a Referral?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-balance">
                If you&apos;re considering Alternative Provision for a young
                person, our team is here to help guide you through the process.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto relative z-10">
              <Button asChild size="xl" className="rounded-full shadow-lg shadow-primary/20 h-16 px-10 text-lg font-bold">
                <Link to="/referral">Start a Referral <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}
