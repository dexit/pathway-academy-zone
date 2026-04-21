import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { partnerships, servedAreas } from "@/config/data/partners";

const careersImg = "/assets/careers-event.jpg";
const mentoringImg = "/assets/mentoring-session.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Partners() {
  return (
    <Layout>
      <Seo
        title="Our Partners"
        description="We work in partnership with schools, Local Authorities, and community organizations across Staffordshire to support young people."
      />
      <section className="py-32 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Local Partnerships</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Working Together Across Staffordshire</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Strong partnerships are essential to supporting young people effectively. We collaborate with agencies across the region to create positive pathways.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Partners" }]} />
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerships.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all active:scale-[0.98] group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <p.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold bg-accent/50 text-primary px-3 py-1 rounded-full border border-primary/10">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">In Action</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">Connecting Young People with Opportunities</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform" />
              <img src={careersImg} alt="Young people at careers fair" className="rounded-3xl shadow-xl w-full h-80 object-cover border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl -translate-x-3 translate-y-3 -z-10 group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform" />
              <img src={mentoringImg} alt="Apprenticeship opportunities" className="rounded-3xl shadow-xl w-full h-80 object-cover border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">Areas We Serve</h2>
          <p className="text-muted-foreground mb-12 text-lg leading-relaxed">We accept referrals from across Staffordshire, with transport arrangements available where needed to ensure access to our centres.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {servedAreas.map((a) => (
              <span key={a} className="flex items-center gap-3 bg-card border border-border/50 rounded-2xl px-6 py-3.5 text-sm font-bold text-foreground shadow-sm hover:shadow-md hover:border-primary/20 transition-all active:scale-95 cursor-default">
                <MapPin className="h-5 w-5 text-primary" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6 tracking-tight">Become a Partner</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">We're always looking to expand our network of partners to create more opportunities for young people. Let's discuss how we can work together.</p>
          <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 rounded-full shadow-xl px-12">
            <Link to="/contact">Get in Touch <ArrowRight className="ml-2 h-6 w-6" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
