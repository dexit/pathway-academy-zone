import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout.tsx";
import { Seo, SITE_URL, SITE_NAME, Breadcrumbs } from "@/components/Seo";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const team = [
  { name: "Martin Chandler", role: "Head of Community and Engagement (Safeguarding)", img: "https://pathwayacademyzone.co.uk/assets/martin-chandler-DvF3rkDn.png" },
  { name: "Liam Farrall", role: "Head of Alternative Provision", img: "https://pathwayacademyzone.co.uk/assets/liam-farrall-DwXnuzxA.jpg" },
  { name: "Gemma Mason, QTLS", role: "SENCO Lead", img: "https://pathwayacademyzone.co.uk/assets/gemma-mason-Dplhj7uo.jpeg" },
  { name: "Ahsan Hussain", role: "Head of Partnerships and Impact", img: "https://pathwayacademyzone.co.uk/assets/ahsan-hussain-OIFhfXvg.png" },
  { name: "Zulekha Ali", role: "HR and Executive Support", img: "https://pathwayacademyzone.co.uk/assets/zulekha-ali-Dfoelgdx.png" },
];

const execs = [
  { name: "Safaraz Ali", role: "Founder & CEO", img: "https://pathwayacademyzone.co.uk/assets/safaraz-ali-R0JVDMEt.png" },
  { name: "Waheed Azam", role: "Executive Director", img: "https://pathwayacademyzone.co.uk/assets/waheed-azam-DQhc8GBT.jpeg" },
];

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
      <section className="relative py-32 bg-primary overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container-wide text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-background/10 text-primary-foreground text-sm font-medium mb-4 border border-white/20">Our Team</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">Meet the Experts</h1>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto leading-relaxed">Our dedicated team of educators, mentors, and specialists work together to support every young person on their journey.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/50">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Team" }]} />
        </div>
      </section>

      <section className="section-py bg-background">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-16 underline decoration-primary/30 underline-offset-8">Academy Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
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
                  className="group bg-card rounded-3xl overflow-hidden shadow-sm border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 scroll-mt-24"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                    <img src={m.img} alt={`${m.name} — ${m.role}`} title={m.name} itemProp="image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-8 text-center">
                    <h3 itemProp="name" className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{m.name}</h3>
                    <p itemProp="jobTitle" className="text-muted-foreground font-medium mt-2">{m.role}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-py bg-muted/30">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-16">Executive Board</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
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
                  className="group bg-card rounded-3xl overflow-hidden shadow-md border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 scroll-mt-24"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                    <img src={m.img} alt={`${m.name} — ${m.role}`} title={m.name} itemProp="image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-8 text-center">
                    <h3 itemProp="name" className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{m.name}</h3>
                    <p itemProp="jobTitle" className="text-muted-foreground font-medium mt-2">{m.role}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-py bg-background text-center">
        <div className="container-wide max-w-3xl">
          <div className="bg-primary/5 rounded-3xl p-10 md:p-16 border border-primary/10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Join Our Mission</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">We're always looking for passionate educators and support staff who share our vision for transforming young lives.</p>
            <Button asChild size="xl" className="rounded-full px-10 font-bold shadow-lg shadow-primary/20">
                <Link to="/careers" title="Current vacancies">View Current Vacancies <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
