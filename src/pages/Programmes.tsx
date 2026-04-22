import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, ArrowRight, Building2, MapPin, Clock
} from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { programmes } from "@/config/data/programmes";
import { SITE_NAME, SITE_URL } from "@/config/site";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Programmes() {
  return (
    <Layout>
      <Seo
        title="Choose Your Path"
        description="Explore the specialised learning pathways at Pathway Academy Zone. From core academics to high-growth vocational sectors."
      />

      {/* Header - Massive & Impactful */}
      <section className="pt-40 pb-24 bg-accent/50 border-b border-border/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block text-center md:text-left">PROGRAMME MANIFESTO</span>
            <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic text-center md:text-left">
              YOUR <span className="text-primary">UPGRADE</span><br />
              STARTS HERE.
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl leading-tight font-medium text-center md:text-left">
              Bespoke education designed for the future. No templates. No busy work. Just the skills you need to win.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Programmes" }]} />
        </div>
      </section>

      {/* Pathway Map - Exploration Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {programmes.map((prog, i) => (
              <motion.article
                id={prog.slug}
                key={prog.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-card rounded-2xl border-2 border-border/50 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-20px_oklch(var(--primary)/0.3)] hover:border-primary/30 h-full flex flex-col active:scale-[0.98]">
                  <div className="relative h-64 overflow-hidden">
                    <img src={prog.img} alt={prog.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                    <div className="absolute top-6 left-6 w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <prog.icon className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="p-10 flex-1 flex flex-col">
                    <h2 className="text-3xl mb-4 group-hover:text-primary transition-colors">{prog.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">{prog.desc}</p>

                    <ul className="space-y-3 mb-10">
                      {prog.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-foreground/80">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button asChild variant="outline" className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      <Link to="/contact">ENQUIRE FOR PATH</Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities - Modern Sidebar Layout */}
      <section className="py-32 bg-foreground text-background overflow-hidden relative">
        <motion.div
          animate={{ x: [-100, 100], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 text-[20rem] font-display font-black leading-none whitespace-nowrap -mt-20 pointer-events-none select-none uppercase italic"
        >
          THE CAMPUS THE CAMPUS THE CAMPUS
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block">WHERE WE OPERATE</span>
              <h2 className="text-5xl md:text-8xl mb-8 uppercase italic tracking-tighter">ELITE ENVIRONMENTS.</h2>
              <p className="text-background/60 text-xl leading-relaxed mb-12">
                We deliver our programmes across specialized centers in Stoke-on-Trent. These aren't classrooms—they are workspaces, tech labs, and creative studios.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-bold text-lg">BURSLEM LEARNING CENTRE</p>
                    <p className="text-background/40 text-sm">Duncalf St, ST6 3LJ</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-bold text-lg">ACCESS HOURS</p>
                    <p className="text-background/40 text-sm">Mon–Fri, 8:30am–4:00pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-[80px] group-hover:bg-primary/40 transition-all" />
              <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                 <img src="/assets/building-exterior.jpg" className="w-full h-full object-cover" alt="The Campus" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call */}
      <section className="py-40 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-8xl mb-12 uppercase italic font-black">STILL UNSURE?</h2>
          <p className="text-muted-foreground text-xl max-w-xl mx-auto mb-12">
            Every pathway is unique. Talk to a mentor today and let's find yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" variant="hero" className="px-16">
              <Link to="/referral">START THE UPGRADE</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-16 rounded-full">
              <Link to="/contact">VISIT CAMPUS</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
