import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Phone } from "lucide-react"
import { HubSectionCard } from "@/components/knowledge-hub/hub-section-card"
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs } from "@/components/Seo"

export default function KnowledgeHub() {
  return (
    <Layout>
      <Seo
        title="Knowledge Hub"
        description="Your comprehensive resource for Alternative Provision. Expert guides, practical comparisons, and evidence-based best practices for educators, parents, and professionals."
      />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="max-w-2xl">
              <Breadcrumbs
                items={[{ label: "Knowledge Hub" }]}
                className="text-primary-foreground/70 mb-5 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
              />
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
                Pathway Academy Zone
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Knowledge Hub
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                Your comprehensive resource for understanding Alternative
                Provision. Expert guides, practical comparisons, and
                evidence-based best practices for educators, parents, and
                professionals.
              </p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-16 space-y-14">
          {/* Featured resource */}
          <section aria-labelledby="featured-heading">
            <div className="flex items-center gap-2 mb-5">
              <span className="block w-1 h-5 rounded-full bg-accent" aria-hidden="true" />
              <h2
                id="featured-heading"
                className="text-sm font-semibold text-muted-foreground tracking-widest uppercase"
              >
                Featured Resource
              </h2>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground">
              {/* Decorative background pattern */}
              <div
                className="absolute inset-0 opacity-5"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-12">
                <div className="flex flex-col items-start gap-5">
                  <div className="flex flex-row  w-full gap-3">
                 
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                                      <h3 className="text-xl md:text-2xl font-bold mb-1 items-center">
                      The Complete Guide to Alternative Provision
                    </h3>
                     </div>
                  <div className="max-w-xl">

                    <p className="text-primary-foreground/70 leading-relaxed text-sm md:text-base">
                      Our definitive guide covering the full AP journey from
                      referral triggers to progression routes. Essential reading
                      for anyone involved in supporting young people outside
                      mainstream education.
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shrink-0 gap-2"
                >
                  <Link to="/knowledge-hub/complete-guide">
                    Read the Complete Guide
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Section cards grid */}
          <section aria-labelledby="resources-heading">
            <div className="flex items-center gap-2 mb-6">
              <span className="block w-1 h-5 rounded-full bg-accent" aria-hidden="true" />
              <h2
                id="resources-heading"
                className="text-sm font-semibold text-muted-foreground tracking-widest uppercase"
              >
                Browse by Topic
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HUB_SECTIONS.map((section) => (
                <HubSectionCard key={section.id} section={section} />
              ))}
            </div>
          </section>

          {/* Referral CTA */}
          <section className="rounded-2xl border border-border bg-card px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-primary/10">
            <div className="max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Need Support with a Referral?
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                If you&apos;re considering Alternative Provision for a young
                person, our team is here to help guide you through the process.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
              >
                <Link to="/referral">
                  Start a Referral
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="font-semibold">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </section>

          {/* Back nav */}
          <div className="flex justify-center pb-4">
            <Link
              to="/"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
