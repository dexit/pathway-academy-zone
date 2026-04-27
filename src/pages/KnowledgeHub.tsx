import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Phone, Search } from "lucide-react"
import { HubSectionCard } from "@/components/knowledge-hub/hub-section-card"
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs } from "@/components/Seo"
import { Input } from "@/components/ui/input"

export default function KnowledgeHub() {
  return (
    <Layout>
      <Seo
        title="Knowledge Hub"
        description="Your comprehensive resource for Alternative Provision. Expert guides, practical comparisons, and evidence-based best practices for educators, parents, and professionals."
      />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <header className="bg-primary text-primary-foreground relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-background rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="container-wide py-16 md:py-24 relative z-10">
            <div className="max-w-4xl">
              <Breadcrumbs
                items={[{ label: "Knowledge Hub" }]}
                className="text-primary-foreground/70 mb-8 md:mb-12 [&_a]:text-primary-foreground/80 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground"
              />
              <span className="inline-block px-4 py-1.5 rounded-full bg-background/10 text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm border border-white/10">
                Resource Library
              </span>
              <h1 className="font-display text-4xl md:text-7xl font-bold leading-tight mb-8 text-balance">
                Knowledge Hub
              </h1>
              <p className="text-primary-foreground/80 text-xl leading-relaxed max-w-2xl mb-12">
                Your comprehensive resource for understanding Alternative
                Provision. Expert guides, practical comparisons, and
                evidence-based best practices for educators and professionals.
              </p>

              <div className="relative max-w-xl group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 group-focus-within:text-primary transition-colors" />
                <Input
                    placeholder="Search resources, legislation, guides..."
                    className="h-16 pl-14 pr-6 rounded-2xl bg-background border-white/20 text-foreground placeholder:text-muted-foreground text-lg shadow-2xl focus:ring-accent transition-all"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="container-wide py-16 md:py-24 space-y-24">
          {/* Featured resource */}
          <section aria-labelledby="featured-heading">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-8 bg-accent rounded-full" />
              <h2 id="featured-heading" className="font-display text-2xl font-bold text-foreground">
                Featured Insight
              </h2>
            </div>

            <div className="relative overflow-hidden rounded-[3rem] bg-foreground text-primary-foreground shadow-2xl border border-white/5">
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                   style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 p-10 md:p-16">
                <div className="max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8">
                    <BookOpen className="w-4 h-4" />
                    <span>Deep Dive</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    The Complete Guide to Alternative Provision
                  </h3>
                  <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
                    Our definitive guide covering the full AP journey from
                    referral triggers to progression routes. Essential reading
                    for anyone involved in supporting young people outside
                    mainstream education.
                  </p>
                  <Button asChild size="xl" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-16 px-10 shadow-xl shadow-primary/20 scale-105 active:scale-95 transition-all">
                    <Link to="/knowledge-hub/complete-guide">
                      Read the Guide <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="relative hidden xl:block">
                    <div className="w-80 h-96 bg-background/5 rounded-3xl border border-white/10 rotate-6 p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <div className="h-4 w-3/4 bg-background/10 rounded-full" />
                            <div className="h-4 w-full bg-background/10 rounded-full" />
                            <div className="h-4 w-1/2 bg-background/10 rounded-full" />
                        </div>
                        <div className="h-10 w-full bg-primary rounded-xl" />
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section cards grid */}
          <section aria-labelledby="resources-heading">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-primary rounded-full" />
                    <h2 id="resources-heading" className="font-display text-2xl font-bold text-foreground">
                        Browse by Topic
                    </h2>
                </div>
                <Link to="/knowledge-hub/glossary" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                    A-Z Glossary <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {HUB_SECTIONS.map((section) => (
                <HubSectionCard key={section.id} section={section} />
              ))}
            </div>
          </section>

          {/* Referral CTA */}
          <section className="rounded-[3rem] border border-primary/20 bg-primary/5 p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-xl text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-primary shadow-xl border border-border/50">
                            <Phone className="h-6 w-6" />
                        </div>
                        <h2 className="font-display text-3xl font-bold text-foreground leading-tight">
                            Need Support with a Referral?
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        If you&apos;re considering Alternative Provision for a young
                        person, our specialized admissions team is here to help guide you through the secure referral process.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                    <Button asChild size="xl" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-16 px-10 shadow-xl shadow-primary/20 active:scale-95 transition-all">
                        <Link to="/referral">
                        Start a Referral <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild size="xl" variant="outline" className="rounded-full font-bold h-16 px-10 bg-background shadow-lg active:scale-95 transition-all">
                        <Link to="/contact">Contact Us</Link>
                    </Button>
                </div>
            </div>
          </section>

          {/* Back nav */}
          <div className="flex justify-center pt-8 pb-4">
            <Link to="/" className="text-muted-foreground font-medium hover:text-primary transition-all flex items-center gap-2 group">
                <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Homepage
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
