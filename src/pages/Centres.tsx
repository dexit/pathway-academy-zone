import { motion } from "framer-motion";
import { MapPin, Clock, School, Shield, Coffee, Computer, Building2, Wrench, Brain, Lightbulb, Heart, Briefcase, BookOpen, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, SITE_NAME, SITE_URL, Breadcrumbs } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const heroImg = "/assets/building-exterior.jpg";
const classroomImg = "/assets/classroom-learning.jpg";
const vocationalImg = "/assets/vocational-training.jpg";
const mentoringImg = "/assets/mentoring-session.jpg";
const buildingImg = heroImg;

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const facilities = [
  { icon: School, title: "Small Classrooms", desc: "Designed for groups of 4-6 learners to ensure individual attention." },
  { icon: Shield, title: "Nurture Spaces", desc: "Quiet areas for 1:1 support and emotional regulation." },
  { icon: Computer, title: "IT Suite", desc: "Modern computing facilities for functional skills and research." },
  { icon: Coffee, title: "Social Hub", desc: "A welcoming space for break times and developing social skills." },
];
const timetable = [
  { time: "08:30 - 09:00", activity: "Staff Briefing & Preparation" },
  { time: "09:00 - 09:15", activity: "Learner Arrival & Breakfast Club" },
  { time: "09:15 - 10:30", activity: "Session 1 - Core Academics (English/Maths)" },
  { time: "10:30 - 10:45", activity: "Morning Break" },
  { time: "10:45 - 12:00", activity: "Session 2 - Vocational / Creative Arts" },
  { time: "12:00 - 12:45", activity: "Lunch & Social Time" },
  { time: "12:45 - 14:00", activity: "Session 3 - Personal Development / SEMH" },
  { time: "14:00 - 14:15", activity: "Break" },
  { time: "14:15 - 15:00", activity: "Session 4 - Enrichment Activities" },
  { time: "15:00 - 15:15", activity: "End of Day Review & Departure" },
];

const centres = [
  {
    id: "burslem",
    name: `${SITE_NAME} — Burslem Learning Centre`,
    streetAddress: "Duncalf Street, Burslem",
    addressLocality: "Stoke-on-Trent",
    postalCode: "ST6 3LJ",
    region: "Staffordshire",
    telephone: "+44-1782-365365",
    latitude: 53.043,
    longitude: -2.191,
  },
];

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
      name: c.name,
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
  return (
    <Layout>
      <Seo
        title="Our Centres"
        description="Visit our purpose-built Alternative Provision centre in Burslem, Stoke-on-Trent. Small classrooms, breakout spaces, IT suite, transport links and a structured daily timetable."
        jsonLd={centresSchema}
      />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Centres" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Centres</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Safe, purposeful learning environments designed to support engagement and academic progress.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Burslem Learning Centre</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 border border-border/50">
                  <MapPin className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground text-sm uppercase tracking-widest mb-1">Location</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 border border-border/50">
                  <Clock className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground text-sm uppercase tracking-widest mb-1">Hours</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">Monday - Friday<br />8:30am - 4:00pm</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Our purpose-built centre in Burslem provides a welcoming environment for learning. With small classrooms, dedicated breakout spaces, and specialist areas for vocational learning, we create the conditions for every young person to thrive.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facilities.map((f) => (
                  <div key={f.title} className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-display font-bold text-foreground mb-2">{f.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              <div className="relative group">
                <img src={buildingImg} alt="Pathway Academy Zone building" className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <img src={classroomImg} alt="Classroom" className="rounded-2xl shadow-lg w-full h-48 object-cover" loading="lazy" />
                <img src={mentoringImg} alt="Support room" className="rounded-2xl shadow-lg w-full h-48 object-cover" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Routine</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 mb-6">A Typical Day</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our structured timetable provides routine and predictability while allowing flexibility for individual needs.</p>
            </div>
            <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden divide-y divide-border">
              {timetable.map((t, i) => (
                <div key={t.time} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10 px-8 py-6 transition-colors hover:bg-primary/5 ${t.activity.includes("Break") || t.activity.includes("Lunch") ? "bg-muted/50" : ""}`}>
                  <span className="text-sm font-bold text-primary font-mono w-32 shrink-0">{t.time}</span>
                  <span className="text-foreground font-medium">{t.activity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Learning in Action</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[buildingImg, classroomImg, mentoringImg, vocationalImg].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-2xl aspect-square"
              >
                <img src={img} alt="Centre gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-white/80 font-bold text-sm tracking-widest uppercase">Delivery</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-6">Programmes at Burslem</h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto text-balance">Every learner&apos;s timetable is built from these core programme strands, blended to match individual needs.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: BookOpen, label: "Academic Re-engagement" },
                { icon: Wrench, label: "Vocational Learning" },
                { icon: Brain, label: "SEMH Support" },
                { icon: Lightbulb, label: "Personal Development" },
                { icon: Heart, label: "Life Skills" },
                { icon: Briefcase, label: "Employability Skills" },
              ].map((p) => (
                <div key={p.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <p.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-sm">{p.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="xl" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-10">
                <Link to="/programmes">
                  Explore All Programmes <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full border-2 border-white/40 bg-transparent text-white hover:bg-white/10 px-10">
                <Link to="/referral">
                  Make a Referral
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Visit Our Centre</h2>
          <p className="text-muted-foreground text-lg mb-10 text-balance">We welcome visits from prospective families, referrers, and commissioners. Arrange a tour to see our facilities first-hand.</p>
          <Button asChild size="xl" className="rounded-full shadow-xl shadow-primary/20 px-12">
            <Link to="/contact">Arrange a Visit <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
