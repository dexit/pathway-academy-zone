import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { values, philosophy } from "@/config/data/about";
import { Seo, Breadcrumbs } from "@/components/Seo";

const classroomImg = "/assets/classroom-learning.jpg";
const mentoringImg = "/assets/mentoring-session.jpg";

const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function About() {
  return (
    <Layout>
      <Seo
        title="Who We Are"
        description="Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire."
      />

      {/* Header - Kinetic Growth */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-foreground text-background">
        <motion.div
          animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-black text-xs uppercase tracking-[0.5em] mb-8 block">THE IDENTITY</span>
            <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic">
              BEYOND THE <br />
              <span className="text-primary">CLASSROOM.</span>
            </h1>
            <p className="text-background/60 text-xl md:text-2xl max-w-2xl font-medium leading-tight">
              We are a specialist Alternative Provision built on the belief that environment dictates potential.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "About Us" }]} />
        </div>
      </section>

      {/* Mission Section - Asymmetrical */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <span className="text-primary font-black text-xs uppercase tracking-widest mb-6 block">OUR MISSION</span>
                <h2 className="text-5xl md:text-7xl mb-8 uppercase italic tracking-tighter">EMPOWERING <span className="text-primary">LEGENDS.</span></h2>
                <div className="space-y-6 text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
                  <p>We believe every young person deserves access to quality education, regardless of their circumstances. Our mission is to provide structured, trauma-informed Alternative Provision that helps students overcome barriers.</p>
                  <p>Founded with a deep understanding of the challenges facing young people, Pathway Academy Zone combines academic rigour with therapeutic support and vocational opportunities.</p>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-6 relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-[60px] group-hover:bg-primary/40 transition-all duration-700" />
              <img src={mentoringImg} alt="Mentoring" className="relative rounded-2xl shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Values - The CARES Grid */}
      <section className="py-32 bg-accent/20 border-y border-accent/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-24">
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">OUR VALUES</span>
            <h2 className="text-6xl md:text-8xl tracking-tighter uppercase italic">THE <span className="text-primary italic">DNA</span> OF GROWTH.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.letter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-10 rounded-2xl border-2 border-border/50 hover:border-primary/40 transition-all group"
              >
                <div className="text-7xl font-display font-black text-primary/20 group-hover:text-primary transition-colors mb-8 italic">{v.letter}</div>
                <h3 className="text-2xl mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">{v.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Deep Cards */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-24">
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">OUR PHILOSOPHY</span>
            <h2 className="text-5xl md:text-7xl tracking-tighter uppercase italic">RADICAL <span className="text-primary">EMPATHY.</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {philosophy.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-12 rounded-3xl border-2 border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all active:scale-[0.98]"
              >
                <h3 className="text-2xl mb-6 uppercase italic tracking-tighter">{item.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-12">NEXT STEP.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="bg-white text-primary hover:scale-110 transition-physics px-16 py-10 rounded-full text-xl shadow-2xl">
              <Link to="/team">MEET THE SQUAD</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-primary px-16 py-10 rounded-full text-xl backdrop-blur-md">
              <Link to="/programmes">SEE THE PATHS</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
