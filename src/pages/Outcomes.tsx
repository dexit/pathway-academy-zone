import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { outcomeStats, progressMetrics, successStories, testimonials } from "@/config/data/outcomes";

const mentoringImg = "/assets/mentoring-session.jpg";
const careersImg = "/assets/careers-event.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Outcomes() {
  return (
    <Layout>
      <Seo
        title="Outcomes & Impact"
        description="Our success is measured by the progress our young people make – in attendance, engagement, qualifications, and most importantly, their futures."
      />
      <section className="py-32 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Outcomes & Impact</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Making a Real Difference</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Our success is measured by the progress our young people make – in attendance, engagement, qualifications, and most importantly, their futures.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Outcomes" }]} />
        </div>
      </section>

      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {outcomeStats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                  <s.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{s.value}</p>
                <p className="text-white/70 text-sm font-medium uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight">How We Measure Progress</h2>
              <div className="space-y-6">
                {progressMetrics.map((p) => (
                  <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-all">
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{p.desc}</p>
                    <div className="w-full bg-accent/30 rounded-full h-4 mb-3 p-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-primary h-2 rounded-full"
                      />
                    </div>
                    <p className="text-sm text-primary font-bold">{p.stat}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-6 lg:mt-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform" />
                <img src={mentoringImg} alt="Mentoring success" className="rounded-3xl shadow-2xl w-full h-[300px] object-cover border-4 border-white" loading="lazy" />
              </div>
              <img src={careersImg} alt="Career progression" className="rounded-3xl shadow-xl w-full h-[300px] object-cover border-2 border-white" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Success Stories</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">Real Stories, Real Impact</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all active:scale-[0.98]">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-16 tracking-tight">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl p-8 border border-border/50 shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-12 -mt-12 transition-all group-hover:bg-primary/10" />
                <Quote className="h-10 w-10 text-primary/20 mb-6" />
                <p className="text-foreground text-sm leading-relaxed mb-6 italic font-medium">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-1 bg-primary/30 rounded-full" />
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
