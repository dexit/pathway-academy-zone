import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import classroomImg from "@/assets/classroom-learning.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const values = [
  { letter: "P", name: "Purpose", desc: "Every action has a goal for the learner's future." },
  { letter: "A", name: "Achievement", desc: "Celebrating progress, no matter how small." },
  { letter: "T", name: "Trust", desc: "Building reliable, consistent relationships." },
  { letter: "H", name: "Hope", desc: "Maintaining belief in every young person's potential." },
];

export default function About() {
  return (
    <Layout>
      <Seo
        title="About Us"
        description="Pathway Academy Zone provides specialist Alternative Provision in Stoke-on-Trent, focusing on trauma-informed education and SEMH support."
      />

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={classroomImg} alt="Students learning" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container-wide text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-4 backdrop-blur-md border border-white/10">About Our Provision</span>
          <h1 className="font-display text-4xl md:text-7xl font-bold text-primary-foreground mb-6">Who We Are</h1>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto leading-relaxed">Pathway Academy Zone is a specialist Alternative Provision organisation based in Stoke-on-Trent, supporting vulnerable young people aged 11–16.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/50">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "About" }]} />
        </div>
      </section>

      <section className="section-py bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Our Mission</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-8">Empowering Young People to Succeed</h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>We believe every young person deserves access to quality education, regardless of their circumstances. Our mission is to provide structured, trauma-informed Alternative Provision that helps students overcome barriers and develop resilience.</p>
                <p>Founded with a deep understanding of the challenges facing young people in the AP sector, Pathway Academy Zone combines academic rigour with therapeutic support and vocational opportunities.</p>
                <p>We work closely with mainstream schools, local authorities, virtual schools, and families to ensure every young person receives the support they need to thrive.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
              <img src={mentoringImg} alt="Mentoring session at PAZ" className="relative rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-py bg-muted/30 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="container-wide relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase border border-primary/20 mb-6">Our Values</span>
            <h2 className="font-display text-3xl md:text-6xl font-bold text-foreground tracking-tight">The <span className="text-gradient-primary">PATH</span> to Success</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <span className="text-primary font-display font-bold text-3xl group-hover:text-primary-foreground transition-colors">{v.letter}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">{v.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-background">
        <div className="container-wide max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Our Philosophy</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">A Trauma-Informed Approach</h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">We understand that many young people in Alternative Provision have experienced adverse childhood experiences that affect their ability to learn and engage.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Behaviour is Communication", desc: "We seek to understand root causes rather than punishing symptoms." },
              { title: "Relational Focus", desc: "Strong, trusting relationships are the foundation of all our work." },
              { title: "Celebrating Growth", desc: "We recognize every small victory to build self-esteem and resilience." }
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container-wide text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">Want to Learn More?</h2>
          <p className="text-primary-foreground/80 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">Meet our dedicated team or explore our specialized programmes to see how we can support your young person.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" className="rounded-full bg-background text-primary hover:bg-background/90 font-bold px-10">
                <Link to="/team">Meet the Team <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full border-white/20 bg-background/5 text-primary-foreground hover:bg-background/10 backdrop-blur-md px-10">
                <Link to="/programmes">Our Programmes</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
