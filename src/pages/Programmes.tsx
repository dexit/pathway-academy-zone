import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, Calendar, Clock, ArrowRight, Building2, MapPin
} from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { programmes } from "@/config/data/programmes";
import { SITE_NAME, SITE_URL } from "@/config/site";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const programmesSchema = [
  ...programmes.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.title,
    description: p.desc,
    url: `${SITE_URL}/programmes#${p.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    educationalLevel: "Key Stage 3 / Key Stage 4",
    inLanguage: "en-GB",
    audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "Ages 11–16" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: {
        "@type": "Place",
        name: `${SITE_NAME} — Burslem Learning Centre`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Duncalf Street, Burslem",
          addressLocality: "Stoke-on-Trent",
          postalCode: "ST6 3LJ",
          addressCountry: "GB",
        },
      },
      courseSchedule: { "@type": "Schedule", description: `${p.schedule} — ${p.time}` },
    },
    offers: { "@type": "Offer", category: "Alternative Provision", availability: "https://schema.org/InStock" },
  })),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pathway Academy Zone Programmes",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: programmes.length,
    itemListElement: programmes.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/programmes#${p.slug}`,
      name: p.title,
    })),
  },
];

export default function Programmes() {
  return (
    <Layout>
      <Seo
        title="Our Programmes"
        description="Academic re-engagement, vocational learning, SEMH support and more — Alternative Provision programmes in Stoke-on-Trent for ages 11–16."
        jsonLd={programmesSchema}
      />
      <section className="py-32 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Programmes</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Pathways to Success</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We offer a range of structured programmes designed to meet individual needs, combining academic learning with vocational skills and therapeutic support.</p>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Programmes" }]} />
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {programmes.map((prog, i) => (
              <motion.article
                id={prog.slug}
                key={prog.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                    <prog.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{prog.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{prog.desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
                    {prog.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-foreground text-sm">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-6 p-4 bg-accent/30 rounded-2xl border border-accent/50 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{prog.schedule}</span>
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{prog.time}</span>
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""} relative group`}>
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform" />
                  <img src={prog.img} alt={prog.title} className="rounded-3xl shadow-xl w-full h-96 object-cover border-4 border-white" loading="lazy" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center bg-card rounded-3xl border border-border p-8 md:p-12 shadow-xl">
            <div>
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-4">
                <Building2 className="h-5 w-5" /> Where We Deliver
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
                Our Centres in Stoke-on-Trent
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
                Every programme is delivered in our purpose-built learning
                centre in Burslem. Visit our centres to see our facilities and meet the team.
              </p>
              <div className="flex flex-wrap items-center gap-6 mt-8 text-sm font-medium text-foreground">
                <span className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border shadow-sm">
                  <MapPin className="h-4 w-4 text-primary" /> Duncalf St, Burslem ST6 3LJ
                </span>
                <span className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border shadow-sm">
                  <Clock className="h-4 w-4 text-primary" /> Mon–Fri, 8:30am–4:00pm
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <Button asChild size="lg" className="rounded-full shadow-lg">
                <Link to="/centres">
                  Explore Centres <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/contact">
                  Arrange a Tour
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6 tracking-tight">Find the Right Programme</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">Every young person is unique. Contact us to discuss which pathway would best support your student's needs and goals.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 rounded-full shadow-xl px-10">
              <Link to="/referral">Make a Referral <ArrowRight className="ml-2 h-6 w-6" /></Link>
            </Button>
            <Button asChild size="xl" className="border-2 border-white/40 text-white hover:bg-white/10 rounded-full bg-transparent px-10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
