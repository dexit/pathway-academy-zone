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

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const centresSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
      department: centres.map((c) => ({ "@id": `${SITE_URL}/centres#${c.id}` })),
    },
    ...centres.map((c) => ({
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": `${SITE_URL}/centres#${c.id}`,
      name: `${SITE_NAME} — ${c.name}`,
      url: `${SITE_URL}/centres#${c.id}`,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      telephone: c.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: c.streetAddress,
        addressLocality: c.addressLocality,
        postalCode: c.postalCode,
        addressRegion: c.region,
        addressCountry: "GB",
      },
      geo: { "@type": "GeoCoordinates", latitude: c.latitude, longitude: c.longitude },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:30",
          closes: "16:00",
        },
      ],
      areaServed: { "@type": "AdministrativeArea", name: c.region },
    })),
  ],
};

export default function Centres() {
  const currentCentre = centres[0];

  return (
    <Layout>
      <Seo
        title="Our Centres"
        description="Visit our purpose-built Alternative Provision centre in Burslem, Stoke-on-Trent. Small classrooms, breakout spaces, IT suite, transport links and a structured daily timetable."
        jsonLd={centresSchema}
      />
      <section className="py-32 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Centres & Facilities</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Learning Environments</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our centres are designed to feel safe, calm, and welcoming – environments where young people can focus on learning and growth.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Centres" }]} />
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight">{currentCentre.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4 p-4 bg-accent/30 rounded-2xl border border-accent/50">
                  <MapPin className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">Address</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{currentCentre.streetAddress}, {currentCentre.addressLocality}, {currentCentre.postalCode}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-accent/30 rounded-2xl border border-accent/50">
                  <Clock className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">Opening Hours</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">Mon–Fri, 8:30am–4:00pm</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">Our purpose-built centre in Burslem provides a welcoming environment for learning. With small classrooms, dedicated breakout spaces, and specialist areas for vocational learning, we create the conditions for every young person to thrive.</p>
              <div className="grid grid-cols-2 gap-4">
                {facilities.map((f) => (
                  <div key={f.title} className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                    <f.icon className="h-6 w-6 text-primary mb-4" />
                    <h4 className="font-display font-bold text-foreground mb-1">{f.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform" />
                <img src={currentCentre.images.main} alt="Pathway Academy Zone building" className="rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white" loading="lazy" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <img src={currentCentre.images.classroom} alt="Classroom" className="rounded-2xl w-full h-48 object-cover shadow-lg border-2 border-white" loading="lazy" />
                <img src={currentCentre.images.mentoring} alt="Support room" className="rounded-2xl w-full h-48 object-cover shadow-lg border-2 border-white" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-6 tracking-tight">A Typical Day</h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">Our structured timetable provides routine and predictability while allowing flexibility for individual needs.</p>
            <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-2xl">
              {timetable.map((t, i) => (
                <div key={t.time} className={`flex items-center gap-6 px-8 py-5 ${i !== timetable.length - 1 ? "border-b border-border/50" : ""} ${t.activity.includes("Break") || t.activity.includes("Lunch") ? "bg-accent/20" : ""}`}>
                  <span className="text-sm font-mono text-primary font-bold w-32 shrink-0">{t.time}</span>
                  <span className={`text-sm font-medium ${t.activity.includes("Break") || t.activity.includes("Lunch") ? "text-primary" : "text-foreground"}`}>{t.activity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12 tracking-tight">Centre Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[currentCentre.images.main, currentCentre.images.classroom, currentCentre.images.mentoring, currentCentre.images.vocational].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-xl transition-shadow group"
              >
                <img src={img} alt="Centre gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Our Curriculum</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">Delivered at Our Centre</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">Every learner&apos;s timetable is built from these core programme strands, blended to match individual needs.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
              {centreProgrammes.map((p) => (
                <div key={p.label} className="bg-card border border-border/50 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <p.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{p.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" className="rounded-full shadow-lg px-10">
                <Link to="/programmes">
                  Explore All Programmes <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full px-10 bg-white">
                <Link to="/referral">
                  Make a Referral
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6 tracking-tight">Visit Our Centre</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg leading-relaxed">We welcome visits from prospective families, referrers, and commissioners to see our facilities firsthand.</p>
          <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 rounded-full shadow-xl px-12">
            <Link to="/contact">Arrange a Visit <ArrowRight className="ml-2 h-6 w-6" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
