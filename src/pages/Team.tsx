import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
        title="Our Team"
        description="Meet the educators, mentors and leadership team behind Pathway Academy Zone — Alternative Provision in Stoke-on-Trent."
        jsonLd={teamSchema}
      />
      <section className="py-32 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Team</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Meet the People Behind {SITE_NAME}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Our dedicated team of educators, mentors, and specialists work together to support every young person on their journey.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Team" }]} />
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16 tracking-tight">Executive Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {execs.map((m, i) => {
              const id = slugify(m.name);
              return (
                <motion.article
                  key={m.name}
                  id={id}
                  itemScope
                  itemType="https://schema.org/Person"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border/50 transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/20 active:scale-[0.98]">
                    <div className="aspect-square overflow-hidden bg-accent/30 relative">
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img src={m.img} alt={`${m.name} — ${m.role}`} title={m.name} itemProp="image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    </div>
                    <div className="p-8 text-center bg-card">
                      <h3 itemProp="name" className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{m.name}</h3>
                      <p itemProp="jobTitle" className="text-primary font-semibold text-sm mt-2 uppercase tracking-wider">{m.role}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16 tracking-tight">Our Operational Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((m, i) => {
              const id = slugify(m.name);
              return (
                <motion.article
                  key={m.name}
                  id={id}
                  itemScope
                  itemType="https://schema.org/Person"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border/50 transition-all duration-500 group-hover:shadow-xl group-hover:border-primary/20 active:scale-[0.98]">
                    <div className="aspect-[4/5] overflow-hidden bg-accent/30">
                      <img src={m.img} alt={`${m.name} — ${m.role}`} title={m.name} itemProp="image" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 itemProp="name" className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">{m.name}</h3>
                      <p itemProp="jobTitle" className="text-muted-foreground text-sm mt-1 leading-tight">{m.role}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6 tracking-tight">Join Our Growing Team</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">We're always looking for passionate educators and support staff who share our vision for transforming young lives.</p>
          <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 rounded-full shadow-xl px-12">
            <Link to="/careers" title="Current vacancies">View Current Vacancies <ArrowRight className="ml-2 h-6 w-6" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
