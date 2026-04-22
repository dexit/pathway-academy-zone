import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Phone } from "lucide-react"
import { HubSectionCard } from "@/components/knowledge-hub/hub-section-card"
import { HUB_SECTIONS } from "@/config/data/knowledge-hub"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs } from "@/components/Seo"
import { motion } from "framer-motion"

export default function KnowledgeHub() {
  return (
    <Layout>
      <Seo
        title="Intel Hub"
        description="Your comprehensive resource for Alternative Provision. Expert guides, practical comparisons, and evidence-based best practices."
      />

      {/* Header */}
      <section className="pt-40 pb-24 bg-accent/30 border-b border-border/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Breadcrumbs items={[{ label: "Knowledge Hub" }]} className="mb-8" />
             <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block">CENTRAL INTELLIGENCE</span>
            <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic">
              KNOWLEDGE <br />
              <span className="text-primary">HUB.</span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl font-medium leading-tight">
              Master the system. Browse our deep-dive guides into Alternative Provision and SEMH strategy.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-32 space-y-32">
        {/* Featured resource */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-0.5 w-12 bg-primary" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">FEATURED INTEL</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-foreground text-background p-12 md:p-20 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.15)_0,transparent_70%)] opacity-20" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-10 shadow-2xl shadow-primary/20">
                  <BookOpen className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                  THE COMPLETE <br /><span className="text-primary">AP GUIDE.</span>
                </h3>
                <p className="text-background/60 text-lg md:text-xl leading-relaxed mb-12 font-medium">
                  The definitive breakdown of Alternative Provision in 2025. From legal duties to radical reintegration models.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:scale-105 transition-physics px-12 h-16 rounded-full text-lg shadow-xl"
                >
                  <Link to="/knowledge-hub/complete-guide">
                    ACCESS FULL GUIDE <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </div>
              <div className="hidden lg:block relative">
                 <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px]" />
                 <img src="/assets/classroom-learning.jpg" className="relative rounded-[2rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 rotate-2 group-hover:rotate-0" alt="" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section cards grid */}
        <section>
          <div className="flex items-center gap-4 mb-16">
            <div className="h-0.5 w-12 bg-primary" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">SECTOR REPOS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {HUB_SECTIONS.map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <HubSectionCard section={section} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Support CTA */}
        <section className="rounded-[3rem] bg-accent/20 border-2 border-accent/50 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-foreground">
                MISSION <br /><span className="text-primary">SUPPORT.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-xl font-medium leading-relaxed">
              Need direct intel on a referral? Our squad is standing by to guide you through the protocol.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 shrink-0 w-full md:w-auto">
            <Button asChild size="lg" className="rounded-full px-12 h-20 text-xl font-black shadow-2xl">
              <Link to="/referral">START REFERRAL</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-12 h-20 text-xl font-black bg-white">
              <Link to="/contact">CONTACT HQ</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  )
}
