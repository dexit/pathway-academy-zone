import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { commitments, pastoral, keyPolicies } from "@/config/data/safeguarding";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Safeguarding() {
  return (
    <Layout>
      <Seo
        title="Safeguarding & Pastoral Support"
        description="Learn about our commitment to safeguarding and pastoral care at Pathway Academy Zone. We prioritize the safety and wellbeing of every young person."
      />
      <section className="py-32 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Support & Safeguarding</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Keeping Young People Safe</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Safeguarding is everyone's responsibility. We maintain the highest standards to ensure all young people feel safe, supported, and heard.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Safeguarding" }]} />
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 items-start">
            <div className="mx-auto md:mx-0 group relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform" />
              <img src="https://pathwayacademyzone.co.uk/assets/martin-chandler-DvF3rkDn.png" alt="Martin Chandler - DSL" className="w-48 h-48 rounded-3xl object-cover shadow-xl border-4 border-white" />
            </div>
            <div>
              <h2 className="font-display text-lg text-muted-foreground mb-1 uppercase tracking-widest font-bold">Our Designated Safeguarding Lead</h2>
              <h3 className="font-display text-3xl font-bold text-foreground mb-1 tracking-tight">Martin Chandler</h3>
              <p className="text-primary font-bold text-sm mb-6 uppercase">Designated Safeguarding Lead (DSL)</p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">Martin leads our safeguarding practice and is the first point of contact for any safeguarding concerns. He works closely with external agencies and ensures all staff receive regular safeguarding training.</p>
              <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/20 shadow-sm">
                <p className="text-sm font-bold text-destructive uppercase tracking-wider mb-2">Urgent Safeguarding Concerns</p>
                <p className="text-foreground font-medium">Contact Martin directly by email at:</p>
                <a href="mailto:martin.chandler@pathwayacademyzone.co.uk" className="text-lg font-bold text-destructive hover:underline break-all">martin.chandler@pathwayacademyzone.co.uk</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">Our Commitment</h2>
            <p className="text-muted-foreground mb-12 text-lg leading-relaxed">At Pathway Academy Zone, we recognise that young people in Alternative Provision may be particularly vulnerable. Our approach to safeguarding is proactive, relational, and trauma-informed.</p>
            <div className="space-y-4">
              {commitments.map((c, i) => (
                <div key={i} className="flex items-start gap-6 bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <span className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0 shadow-lg shadow-primary/20">{i + 1}</span>
                  <p className="text-foreground font-medium leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Pastoral Care</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">How We Support Young People</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastoral.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all active:scale-[0.98]">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">Key Policies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-lg">
            Our safeguarding and pastoral policies are available for review. For full documents, please visit our{" "}
            <Link to="/policies" className="text-primary font-bold hover:underline">
              Policies page
            </Link>
            .
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-12">
            {keyPolicies.map((p) => (
              <li
                key={p}
                className="flex items-center gap-4 rounded-2xl px-6 py-5 bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.99] group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <FileText className="h-5 w-5 text-primary group-hover:text-primary-foreground" aria-hidden="true" />
                </div>
                <span className="text-sm font-bold text-foreground">{p}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="xl" variant="outline" className="rounded-full px-10 shadow-sm">
            <Link to="/policies">
              View All Policies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
