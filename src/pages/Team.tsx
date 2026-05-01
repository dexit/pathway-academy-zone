import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import Layout from "@/components/Layout";
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
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Team" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Team</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Meet the educators, mentors and leadership team behind Pathway Academy Zone — dedicated to supporting every young person.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Leadership</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">Executive Team</h2>
          </div>
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
                  className="bg-card rounded-[2.5rem] overflow-hidden shadow-sm border border-border/50 hover:shadow-2xl hover:border-primary/20 transition-all scroll-mt-24 group"
                >
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <img src={m.img} alt={`${m.name} — ${m.role}`} title={m.name} itemProp="image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-8 text-center">
                    <h3 itemProp="name" className="font-display text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{m.name}</h3>
                    <p itemProp="jobTitle" className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{m.role}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Provision</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">Our Staff</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all scroll-mt-24 group"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img src={m.img} alt={`${m.name} — ${m.role}`} title={m.name} itemProp="image" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-8 text-center">
                    <h3 itemProp="name" className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{m.name}</h3>
                    <p itemProp="jobTitle" className="text-muted-foreground text-sm leading-relaxed">{m.role}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-[3rem] bg-primary p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tight">Join Our Team</h2>
              <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto text-balance">
                We're always looking for passionate educators, mentors and support staff who share our vision for transforming young lives through Alternative Provision.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="xl" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-10 h-16 text-lg">
                  <Link to="/careers">View Open Roles <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="rounded-full border-2 border-white/40 bg-transparent text-white hover:bg-white/10 px-10 h-16 text-lg">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
