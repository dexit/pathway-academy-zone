import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { team, execs } from "@/config/data/team";
import { SITE_NAME, SITE_URL } from "@/config/site";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const slugify = (s: string) =>
  s.toLowerCase().replace(/,.*$/, "").trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const everyone = [...execs, ...team];
const teamSchema = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    employee: everyone.map((m) => ({ "@id": `${SITE_URL}/team#${slugify(m.name)}` })),
  },
  ...everyone.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/team#${slugify(m.name)}`,
    name: m.name,
    jobTitle: m.role,
    image: m.img,
    url: `${SITE_URL}/team#${slugify(m.name)}`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    affiliation: { "@type": "EducationalOrganization", name: SITE_NAME, sameAs: SITE_URL },
  })),
];

export default function Team() {
  return (
    <Layout>
      <Seo
        title="The Squad"
        description="Meet the legends behind Pathway Academy Zone — the mentors and leaders redefining Alternative Provision."
        jsonLd={teamSchema}
      />

      {/* Header */}
      <section className="pt-40 pb-24 bg-accent/30 border-b border-border/10">
        <div className="container mx-auto px-4 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block">MEET THE SQUAD</span>
            <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic">
              BUILT BY <br />
              <span className="text-primary">EXPERTS.</span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl font-medium leading-tight">
              We've assembled a team of specialists who don't just teach—they mentor, advocate, and lead.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Team" }]} />
        </div>
      </section>

      {/* Leadership */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl uppercase italic font-black tracking-tighter">THE <span className="text-primary">EXECS.</span></h2>
            <p className="text-muted-foreground text-lg max-w-sm">Defining the vision and setting the standard for excellence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl">
            {execs.map((m, i) => {
              const id = slugify(m.name);
              return (
                <motion.article
                  key={m.name}
                  id={id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-card rounded-3xl overflow-hidden border-2 border-border/50 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_20px_50px_-20px_oklch(var(--primary)/0.4)]">
                    <div className="aspect-square overflow-hidden bg-accent/20 relative">
                       <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                       <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Star className="h-6 w-6 fill-current" />
                       </div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-3xl mb-2 group-hover:text-primary transition-colors uppercase italic font-black">{m.name}</h3>
                      <p className="text-primary font-black text-xs uppercase tracking-widest">{m.role}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Operational Team */}
      <section className="py-32 bg-accent/20 border-y border-accent/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <h2 className="text-5xl md:text-7xl uppercase italic font-black tracking-tighter">MISSION <span className="text-primary">CONTROL.</span></h2>
            <p className="text-muted-foreground text-lg max-w-sm">The team on the ground, making impact every single day.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((m, i) => {
              const id = slugify(m.name);
              return (
                <motion.article
                  key={m.name}
                  id={id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border-2 border-border/50 transition-all duration-500 hover:shadow-2xl hover:border-primary/20 active:scale-[0.98]">
                    <div className="aspect-[4/5] overflow-hidden bg-accent/30">
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-8 text-center bg-card">
                      <h3 className="text-xl font-display font-black text-foreground group-hover:text-primary transition-colors uppercase italic">{m.name}</h3>
                      <p className="text-muted-foreground text-xs font-black uppercase tracking-widest mt-3 leading-tight">{m.role}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join the Team */}
      <section className="py-40 bg-foreground text-background text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-12">WANT IN?</h2>
          <p className="text-background/60 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-medium">
            We're always looking for legends to join our mission. Ready to make a real difference?
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:scale-110 transition-physics px-20 py-10 rounded-full text-2xl shadow-2xl">
            <Link to="/careers">JOIN THE SQUAD</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
