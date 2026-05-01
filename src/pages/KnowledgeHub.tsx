import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Phone, CheckCircle, GraduationCap, Users } from "lucide-react"
import { HubSectionCard } from "@/components/knowledge-hub/hub-section-card"
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"

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

  return (
    <Layout>
      <Seo
        title="Knowledge Hub"
        description="Your comprehensive resource for Alternative Provision. Expert guides, practical comparisons, and evidence-based best practices for educators, parents, and professionals."
        jsonLd={jsonLd}
      />
      <main className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="max-w-3xl">
              <Breadcrumbs
                items={[{ label: "Knowledge Hub" }]}
                className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
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
          <section aria-labelledby="featured-heading">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 rounded-full bg-accent" />
              <h2 id="featured-heading" className="text-xs font-bold text-muted-foreground tracking-[0.2em] uppercase">
                Featured Resource
              </h2>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-card border border-border shadow-2xl shadow-primary/5">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-8 md:p-14">
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/10">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                      The Complete Guide to Alternative Provision
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl text-balance">
                      Our definitive guide covering the full AP journey from
                      referral triggers to progression routes. Essential reading
                      for anyone involved in supporting young people outside
                      mainstream education.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground bg-muted/50 px-4 py-2 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-primary" /> Statutory Guidance
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground bg-muted/50 px-4 py-2 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-primary" /> 15 Min Read
                    </div>
                  </div>
                </div>
                <div className="shrink-0 w-full lg:w-auto">
                  <Button
                    asChild
                    size="xl"
                    className="w-full lg:w-auto rounded-full shadow-xl shadow-primary/20 h-16 px-10 text-lg font-bold"
                  >
                    <Link to="/knowledge-hub/complete-guide">
                      Read the Full Guide
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="resources-heading">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-6 rounded-full bg-accent" />
              <h2 id="resources-heading" className="text-xs font-bold text-muted-foreground tracking-[0.2em] uppercase">
                Browse by Topic
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {HUB_SECTIONS.map((section) => (
                <HubSectionCard key={section.id} section={section} />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-primary/5 px-8 py-14 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 opacity-5 -mb-20 -mr-20">
              <Users className="w-96 h-96" />
            </div>

            <div className="max-w-2xl relative z-10 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Need Support with a Referral?
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed text-balance">
                If you&apos;re considering Alternative Provision for a young
                person, our team is here to help guide you through the process. We can discuss suitability, funding, and start dates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto relative z-10">
              <Button
                asChild
                size="xl"
                className="rounded-full shadow-lg shadow-primary/20 h-16 px-10 text-lg font-bold"
              >
                <Link to="/referral">
                  Start a Referral
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full bg-background backdrop-blur-sm h-16 px-10 text-lg font-bold border-2">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </section>

          <div className="flex justify-center pb-8">
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground font-bold uppercase tracking-widest text-[10px]">
              <Link to="/">
                ← Back to Home Page
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  )
}
