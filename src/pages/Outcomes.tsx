import { motion } from "framer-motion";
import { Quote, TrendingUp, Target, Users, UserCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { outcomeStats, progressMetrics, successStories, testimonials } from "@/config/data/outcomes";

const mentoringImg = "/assets/mentoring-session.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Outcomes() {
  return (
    <Layout>
      <Seo
        title="Impact & Legacy"
        description="The proof is in the progress. Real data, real stories, and the undeniable impact of Pathway Academy Zone."
      />

      {/* Header */}
      <section className="pt-40 pb-24 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block">THE PROOF</span>
            <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic">
              REAL DATA.<br />
              <span className="text-primary">REAL IMPACT.</span>
            </h1>
            <p className="text-background/60 text-xl md:text-2xl max-w-2xl font-medium leading-tight">
              We measure success by the lives transformed. From attendance spikes to career launches, the legacy starts here.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Outcomes" }]} />
        </div>
      </section>

      {/* Grid Stats */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {outcomeStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-12 rounded-2xl border-2 border-border/50 text-center hover:border-primary/30 hover:shadow-2xl transition-all active:scale-95"
              >
                <div className="text-6xl font-display font-black text-primary mb-2 italic tracking-tighter">
                  {s.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Stories - Storytelling First */}
      <section className="py-32 bg-accent/30 border-y border-accent/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-24 text-center">
            <h2 className="text-5xl md:text-7xl mb-8 uppercase italic font-black">BEYOND THE <span className="text-primary">NUMBERS.</span></h2>
            <p className="text-muted-foreground text-xl">Data tells a story, but these legends live it. Meet the students who redefined their limits.</p>
          </div>

          <div className="space-y-12">
            {successStories.map((story, i) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`p-12 rounded-3xl bg-card border-2 border-border/50 shadow-xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                   <span className="text-primary font-black text-xs uppercase tracking-widest mb-6 block">SUCCESS STORY 0{i+1}</span>
                   <h3 className="text-4xl mb-6 uppercase italic tracking-tighter">{story.title}</h3>
                   <p className="text-muted-foreground text-lg leading-relaxed mb-8">{story.text}</p>
                   <div className="h-1 w-20 bg-primary/20 rounded-full" />
                </div>
                <div className={`aspect-square rounded-3xl overflow-hidden shadow-2xl relative group ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img src={mentoringImg} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" alt="" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Vibe - Testimonials */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-8xl mb-24 uppercase italic font-black tracking-tighter text-center">THE WALL OF <span className="text-primary">VIBE.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-10 rounded-2xl border-2 border-border/50 relative group hover:border-primary/20 transition-all"
              >
                <Quote className="h-12 w-12 text-primary/10 mb-8 group-hover:text-primary/30 transition-colors" />
                <p className="text-xl font-medium leading-relaxed italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                   <div className="h-0.5 w-12 bg-primary" />
                   <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-6xl md:text-9xl mb-12 font-black italic uppercase tracking-tighter">WRITE YOURS.</h2>
          <Button asChild size="lg" className="bg-white text-primary hover:scale-110 transition-physics px-20 py-10 rounded-full text-2xl shadow-2xl">
            <Link to="/referral">JOIN THE ACADEMY</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
