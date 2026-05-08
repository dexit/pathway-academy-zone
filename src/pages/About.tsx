import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";
import { buildAboutPageSchema, ORG_SCHEMA, WEBSITE_SCHEMA } from "@/lib/json-ld";
import classroomImg from "@/assets/classroom-1-NBeOjKjJ.webp";
import mentoringImg from "@/assets/classroom-2-ycnLvywG.webp";

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



const values = [
  { letter: "C", name: "Change", desc: "We embrace learning and adapt to grow." },
  { letter: "A", name: "Ambition", desc: "We aim high and strive for progress." },
  { letter: "R", name: "Reputation", desc: "We work as a team and are known for integrity." },
  { letter: "E", name: "Empathy", desc: "We care deeply and show compassion in action." },
  { letter: "S", name: "Skills", desc: "We grow by sharpening our abilities with discipline." },
];

export default function About() {
  return (
    <Layout>
      <Seo
        title="About Pathway Academy Zone"
        description="Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people aged 11–16 across Staffordshire."
        jsonLd={aboutJsonLd}
      />
      <section className="relative py-32">
        <div className="absolute inset-0"><img src={classroomImg} alt="Students learning in a classroom at Pathway Academy Zone" className="w-full h-full object-cover" width="1920" height="1080" loading="eager" fetchPriority="high" /><div className="absolute inset-0 bg-scrim/60" /></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Breadcrumbs
            items={[{ label: "About Us" }]}
            className="text-white/70 mb-6 justify-center [&_a]:text-white/70 [&_a]:hover:text-white [&_[aria-current]]:text-white [&_svg]:text-white/50"
          />
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4 backdrop-blur-sm border border-white/20">About Us</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Who We Are</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire.</p>
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
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><img src={mentoringImg} alt="One-to-one mentoring session supporting a young person" className="rounded-2xl shadow-lg w-full" loading="lazy" width="800" height="600" /></motion.div>
          </div>
        </div>
      </section>
      <section className="relative py-28 bg-gradient-to-b from-muted/40 via-background to-muted/40 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:24px_24px]" />
        <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-[0.2em] uppercase border border-primary/20">Our Values</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">What Guides <span className="text-gradient-primary">Us</span></h2>
            <p className="text-muted-foreground mt-5 max-w-2xl mx-auto leading-relaxed">Our values shape everything we do, from how we design programmes to how we interact with young people and their families.</p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connecting line — desktop only */}
            <div aria-hidden className="hidden md:block absolute top-10 left-0 right-0 h-px overflow-hidden">
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut" }} style={{ transformOrigin: "left" }} className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.letter}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Letter node on the line */}
                  <div className="relative mb-5">
                    <div aria-hidden className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--teal-dark))] flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-background group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
                      <span className="text-primary-foreground font-display font-bold text-3xl">{v.letter}</span>
                    </div>
                    <span aria-hidden className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border border-primary/30 text-primary text-[11px] font-semibold flex items-center justify-center shadow-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="relative w-full bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/60 shadow-sm group-hover:shadow-xl group-hover:border-primary/40 group-hover:-translate-y-1 transition-all duration-500">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                    <div aria-hidden className="absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-14">
            {values.map((v, i) => (
              <span key={v.name} className="inline-flex items-center gap-3 text-primary font-display font-semibold text-sm tracking-wide">
                {v.name}
                {i < values.length - 1 && <span aria-hidden className="text-primary/40">●</span>}
              </span>
            ))}
          </motion.div>
        </div>
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
    </Layout>
  );
}
