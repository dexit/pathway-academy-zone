import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MapPin, Clock, ArrowRight, BookOpen, Wrench, Brain, Lightbulb, Heart, Briefcase
} from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { facilities, timetable, centreProgrammes, centres } from "@/config/data/centres";
import { SITE_NAME, SITE_URL } from "@/config/site";

const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Centres() {
  const currentCentre = centres[0];

  return (
    <Layout>
      <Seo
        title="Our Centres"
        description="Visit our purpose-built Alternative Provision centre in Burslem, Stoke-on-Trent."
      />

      {/* Header */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-accent/30 border-b border-border/10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-black text-xs uppercase tracking-[0.5em] mb-8 block">THE BASE</span>
            <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic">
              WHERE GROWTH <br />
              <span className="text-primary">HAPPENS.</span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl font-medium leading-tight">
              Elite learning environments designed for focus, safety, and high-performance outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Centres" }]} />
        </div>
      </section>

      {/* Centre Detail */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-4xl md:text-6xl mb-8 uppercase italic tracking-tighter">{currentCentre.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                <div className="flex items-start gap-4 p-6 bg-accent/20 rounded-2xl border border-accent/50">
                  <MapPin className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <p className="font-black text-foreground text-xs uppercase tracking-widest mb-2">LOCATION</p>
                    <p className="text-muted-foreground text-sm font-medium">{currentCentre.streetAddress}, {currentCentre.addressLocality}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-accent/20 rounded-2xl border border-accent/50">
                  <Clock className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <p className="font-black text-foreground text-xs uppercase tracking-widest mb-2">ACCESS</p>
                    <p className="text-muted-foreground text-sm font-medium">Mon–Fri, 8:30am–4:00pm</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-12 text-xl font-medium">Our purpose-built centre in Burslem provides a welcoming environment for learning. With small classrooms and dedicated breakout spaces.</p>

              <div className="grid grid-cols-2 gap-4">
                {facilities.map((f) => (
                  <div key={f.title} className="bg-card rounded-2xl p-6 border-2 border-border/50 shadow-sm hover:border-primary/20 transition-all active:scale-[0.98]">
                    <f.icon className="h-8 w-8 text-primary mb-6" />
                    <h4 className="text-xl mb-2 uppercase italic font-bold">{f.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-[60px] group-hover:bg-primary/40 transition-all duration-700" />
                <img src={currentCentre.images.main} alt="Centre building" className="relative rounded-[2rem] shadow-2xl w-full h-[500px] object-cover border-4 border-white" loading="lazy" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <img src={currentCentre.images.classroom} alt="Classroom" className="rounded-3xl w-full h-56 object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                <img src={currentCentre.images.mentoring} alt="Support room" className="rounded-3xl w-full h-56 object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timetable - Dark Minimal */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block text-center">THE DAILY CYCLE</span>
            <h2 className="text-5xl md:text-8xl mb-16 uppercase italic font-black text-center tracking-tighter">A TYPICAL <span className="text-primary italic">SYNC.</span></h2>
            <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden backdrop-blur-3xl">
              {timetable.map((t, i) => (
                <div key={t.time} className={`flex items-center gap-8 px-10 py-6 ${i !== timetable.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/5 transition-colors group`}>
                  <span className="text-sm font-black text-primary/50 group-hover:text-primary transition-colors w-32 shrink-0">{t.time}</span>
                  <span className={`text-lg font-bold uppercase italic tracking-tighter ${t.activity.includes("Break") || t.activity.includes("Lunch") ? "text-primary" : "text-background"}`}>{t.activity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery - Grid Override */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl uppercase italic font-black tracking-tighter">THE <span className="text-primary">GALLERY.</span></h2>
            <p className="text-muted-foreground text-xl max-w-sm">A visual snapshot of the environment where legends are made.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[currentCentre.images.main, currentCentre.images.classroom, currentCentre.images.mentoring, currentCentre.images.vocational].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-3xl aspect-[3/4] shadow-2xl group"
              >
                <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-3 grayscale hover:grayscale-0" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-12">SEE IT FOR REAL.</h2>
          <Button asChild size="lg" className="bg-white text-primary hover:scale-110 transition-physics px-20 py-10 rounded-full text-2xl shadow-2xl">
            <Link to="/contact">ARRANGE A TOUR</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
