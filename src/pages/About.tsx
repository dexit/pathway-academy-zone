import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";
<<<<<<< HEAD
import { ContentSidebar } from "@/components/ContentSidebar";
import mentoringImg from "@/assets/mentoring-session.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
=======
import { buildAboutPageSchema, ORG_SCHEMA, WEBSITE_SCHEMA } from "@/lib/json-ld";
import classroomImg from "@/assets/classroom-learning.webp";
import mentoringImg from "@/assets/mentoring-session.webp";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const aboutJsonLd = [ORG_SCHEMA, WEBSITE_SCHEMA, buildAboutPageSchema()];

const areaLinks = [
  { name: "Stoke-on-Trent",      slug: "stoke-on-trent" },
  { name: "Newcastle-under-Lyme",slug: "newcastle-under-lyme" },
  { name: "Stafford",            slug: "stafford" },
  { name: "Cannock",             slug: "cannock" },
  { name: "Lichfield",           slug: "lichfield" },
  { name: "Tamworth",            slug: "tamworth" },
];



>>>>>>> origin/main
const values = [
  { letter: "P", name: "Purposeful", desc: "Every action and session has a clear goal for the young person." },
  { letter: "A", name: "Aspirational", desc: "We hold high expectations for every learner's potential." },
  { letter: "T", name: "Trustworthy", desc: "Consistency and reliability in our relationships." },
  { letter: "H", name: "Holistic", desc: "Supporting the whole person — academic, emotional, and social." },
  { letter: "W", name: "Welcoming", desc: "Creating a safe, inclusive environment where everyone belongs." },
];

export default function About() {
  const toc = [
    { id: "mission", label: "Our Mission", level: 2 as const },
    { id: "values", label: "Our Values", level: 2 as const },
    { id: "philosophy", label: "Our Philosophy", level: 2 as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "description": "Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire.",
      "knowsAbout": ["Alternative Provision", "SEMH Support", "Trauma-Informed Practice"],
      "areaServed": "Staffordshire"
    }
  };

  return (
    <Layout>
      <Seo
<<<<<<< HEAD
        title="Who We Are"
        description="Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire."
        jsonLd={jsonLd}
      />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "About" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Who We Are</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire.
            </p>
=======
        title="About Us"
        description="Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people aged 11–16 across Staffordshire."
        jsonLd={aboutJsonLd}
      />
      <section className="relative py-32">
        <div className="absolute inset-0"><img src={classroomImg} alt="Students learning" className="w-full h-full object-cover" width="1920" height="1080" loading="eager" fetchPriority="high" /><div className="absolute inset-0 bg-scrim/60" /></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Breadcrumbs
            items={[{ label: "About Us" }]}
            className="text-primary-foreground/70 mb-6 justify-center [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4 backdrop-blur-sm border border-primary-foreground/20">About Us</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Who We Are</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire.</p>
        </div>
      </section>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Mission</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">Empowering Young People to Succeed</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We believe every young person deserves access to quality education, regardless of their circumstances. Our mission is to provide structured, trauma-informed Alternative Provision that helps students overcome barriers, develop resilience, and build the skills they need for a successful future.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">Founded with a deep understanding of the challenges facing young people in the AP sector, Pathway Academy Zone combines academic rigour with therapeutic support, vocational opportunities, and strong pastoral care.</p>
              <p className="text-muted-foreground leading-relaxed">We work closely with mainstream schools, local authorities, virtual schools, and families to ensure every young person receives the support they need to thrive.</p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><img src={mentoringImg} alt="Young people attending a careers presentation" className="rounded-2xl shadow-lg w-full" loading="lazy" width="800" height="600" /></motion.div>
>>>>>>> origin/main
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <div className="space-y-20">
            <section id="mission" className="scroll-mt-24">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Mission</span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">Empowering Young People to Succeed</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>We believe every young person deserves access to quality education, regardless of their circumstances. Our mission is to provide structured, trauma-informed Alternative Provision that helps students overcome barriers, develop resilience, and build the skills they need for a successful future.</p>
                    <p>Founded with a deep understanding of the challenges facing young people in the AP sector, Pathway Academy Zone combines academic rigour with therapeutic support, vocational opportunities, and strong pastoral care.</p>
                    <p>We work closely with mainstream schools, local authorities, virtual schools, and families to ensure every young person receives the support they need to thrive.</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <img src={mentoringImg} alt="Young people attending a careers presentation" className="rounded-2xl shadow-lg w-full aspect-[4/3] object-cover" loading="lazy" />
                </motion.div>
              </div>
            </section>

            <section id="values" className="scroll-mt-24">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
                <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Values</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">What Guides Us</h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                {values.map((v, i) => (
                  <motion.div
                    key={v.letter}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border/50 rounded-2xl p-6 text-center hover:border-primary/30 transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                      {v.letter}
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{v.name}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="philosophy" className="scroll-mt-24">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
                <div className="max-w-2xl mx-auto text-center">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Philosophy</span>
                  <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-6">A Trauma-Informed Approach</h2>
                  <p className="text-muted-foreground leading-relaxed mb-10">We understand that many young people in Alternative Provision have experienced adverse childhood experiences that affect their ability to learn and engage.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Understanding Behaviour", desc: "We view all behaviour as communication. Rather than punishing challenging behaviour, we seek to understand its root causes." },
                    { title: "Building Relationships", desc: "Strong, trusting relationships are at the heart of our approach. We maintain low staff-to-student ratios." },
                    { title: "Celebrating Progress", desc: "We recognise and celebrate every achievement. Building self-esteem is essential to helping young people believe in their potential." }
                  ].map((item) => (
                    <div key={item.title} className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
                      <h3 className="font-bold text-foreground mb-2 text-sm">{item.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            <section className="text-center py-10">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Want to Learn More?</h2>
              <p className="text-muted-foreground mb-8">Meet our dedicated team or explore our programmes to see how we can support your young person.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg"><Link to="/team">Meet the Team <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link to="/programmes">Our Programmes</Link></Button>
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Our Team",
                description: "Meet the people behind PAZ",
                href: "/team",
                tone: "primary",
              },
              {
                label: "Knowledge Hub",
                description: "Learn more about AP",
                href: "/knowledge-hub",
              },
            ]}
            quickContact={{
              phone: "01782 365365",
              email: "info@pathwayacademyzone.co.uk",
            }}
          />
        </div>
<<<<<<< HEAD
      </div>
=======
      </section>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Philosophy</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">A Trauma-Informed Approach</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">We understand that many young people in Alternative Provision have experienced adverse childhood experiences that affect their ability to learn and engage.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ title: "Understanding Behaviour", desc: "We view all behaviour as communication. Rather than punishing challenging behaviour, we seek to understand its root causes and address underlying needs." },{ title: "Building Relationships", desc: "Strong, trusting relationships are at the heart of our approach. We maintain low staff-to-student ratios and ensure consistency in key adult relationships." },{ title: "Celebrating Progress", desc: "We recognise and celebrate every achievement, no matter how small. Building self-esteem and confidence is essential to helping young people believe in their potential." }].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Areas we serve */}
      <section className="py-14 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Serving Schools Across the Region</h2>
            <p className="text-muted-foreground text-sm mb-5">
              We accept referrals from schools and local authorities across Staffordshire
              and the wider West Midlands — reaching young people wherever they are.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {areaLinks.map((a) => (
                <Link
                  key={a.slug}
                  to={`/alternative-provision/${a.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5" />{a.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild><Link to="/team">Meet the Team <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <Button asChild variant="outline"><Link to="/programmes">Our Programmes</Link></Button>
              <Button asChild variant="outline"><Link to="/referral">Make a Referral</Link></Button>
            </div>
          </motion.div>
        </div>
      </section>
>>>>>>> origin/main
    </Layout>
  );
}
