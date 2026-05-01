import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, TrendingUp, ArrowRight, BookOpen, Wrench, Brain, Lightbulb, Briefcase, UserCheck, Target, ChevronDown, School } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, SITE_URL, SITE_NAME } from "@/components/Seo";
import { LogoTicker } from "@/components/LogoTicker";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { partners } from "@/data/partners-data";
import { reviews } from "@/data/reviews-data";

const heroImg = "/assets/hero-classroom.jpg";
const classroomImg = "/assets/classroom-learning.jpg";
const vocationalImg = "/assets/vocational-training.jpg";
const mentoringImg = "/assets/mentoring-session.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { icon: TrendingUp, value: "94%", label: "Attendance Improvement" },
  { icon: Target, value: "87%", label: "Positive Destinations" },
  { icon: Users, value: "150+", label: "Young People Supported" },
  { icon: School, value: "12+", label: "Partner Schools" },
];

const approaches = [
  { icon: Heart, title: "Trauma-Informed Approach", desc: "Our practice is grounded in understanding how trauma affects learning and behaviour, creating safe spaces for growth." },
  { icon: Target, title: "Personalised Pathways", desc: "Every young person receives a tailored learning plan designed around their strengths, interests, and goals." },
  { icon: UserCheck, title: "Expert Staff", desc: "Our team includes qualified teachers, youth workers, and pastoral specialists dedicated to every student's success." },
  { icon: Shield, title: "Safe Environment", desc: "We maintain the highest safeguarding standards, ensuring all young people feel secure and supported." },
];

const faqs = [
  { q: "What is Alternative Provision?", a: "Alternative Provision (AP) is education arranged for pupils who can't attend mainstream school due to exclusion, illness, or other reasons. It provides structured learning in smaller, more supportive environments." },
  { q: "Who is Pathway Academy Zone for?", a: "We support young people aged 11-16 (KS3 & KS4) who are permanently excluded, at risk of exclusion, disengaged from mainstream education, or have social, emotional and mental health needs." },
  { q: "How does the referral process work?", a: "Referrals are made by schools, local authorities, or social workers. Contact us to discuss needs, we gather information, hold an assessment meeting, then create a personalised placement plan." },
  { q: "How quickly can a learner start?", a: "Emergency placements can begin within 48 hours. Standard placements typically start within 1-2 weeks following the assessment process." },
  { q: "How do you keep learners safe?", a: "Safeguarding is our top priority. All staff are DBS checked and trained, we have a dedicated safeguarding lead, clear reporting procedures, and work closely with local safeguarding partners." },
];

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "PAZ",
    url: SITE_URL,
    logo: "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png",
    description:
      "Alternative Provision in Stoke-on-Trent for ages 11–16. SEMH support, behaviour and reintegration programmes for schools and Local Authorities.",
    telephone: "+44-1782-365365",
    email: "info@pathwayacademyzone.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Duncalf Street, Burslem",
      addressLocality: "Stoke-on-Trent",
      postalCode: "ST6 3LJ",
      addressRegion: "Staffordshire",
      addressCountry: "GB",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Staffordshire" },
    sameAs: [
      "https://www.linkedin.com/company/pathway-academy-zone",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const homeJsonLd = [orgJsonLd, faqJsonLd, websiteJsonLd];

  return (
    <Layout>
      <Seo
        title="Alternative Provision Stoke-on-Trent | Pathway Academy Zone"
        description="Pathway Academy Zone is an Alternative Provision in Stoke-on-Trent for ages 11-16. SEMH support, behaviour and reintegration programmes for schools and Local Authorities."
        jsonLd={homeJsonLd}
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-10" />
          <img
            src={heroImg}
            alt="Students in a supportive learning environment"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Alternative Provision Excellence
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
              Empowering <span className="text-gradient-primary">Every Learner</span> to Succeed
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl text-balance">
              Specialist Alternative Provision in Stoke-on-Trent, providing structured, trauma-informed learning pathways for young people aged 11–16.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="xl" className="rounded-full shadow-lg shadow-primary/20 text-lg px-8">
                <Link to="/referral">Make a Referral <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full bg-background/50 backdrop-blur-sm text-lg px-8">
                <Link to="/programmes">Our Programmes</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground/60"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to explore</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </section>

      <LogoTicker logos={partners} title="Our Trusted Partners & Networks" />

      {/* Philosophy Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Approach</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-8 leading-tight">
                A Different Kind of <span className="text-gradient-primary">Learning Space</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {approaches.map((item) => (
                  <div key={item.title} className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -rotate-2" />
              <img
                src={classroomImg}
                alt="Personalised learning session"
                className="relative rounded-[2rem] shadow-2xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-6 shadow-xl border border-border hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">150+ Students</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Thriving with us</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program strands */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Pathways</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">Structured for Success</h2>
            <p className="text-muted-foreground text-lg">
              We offer six core programme strands, blended to meet the unique needs of every learner referred to us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Academic Re-engagement", desc: "Core subject support (English, Maths, Science) in a low-pressure environment." },
              { icon: Wrench, title: "Vocational Learning", desc: "Hands-on skills and introduction to trades to spark future careers." },
              { icon: Brain, title: "SEMH Support", desc: "Integrated therapeutic interventions and emotional regulation workshops." },
              { icon: Lightbulb, title: "Personal Development", desc: "Building resilience, self-esteem, and essential life skills." },
              { icon: Heart, title: "Life Skills", desc: "Practical preparation for independent living and adulthood." },
              { icon: Briefcase, title: "Employability", desc: "Work experience, CV building, and post-16 transition support." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <p.icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.desc}</p>
                <Link to="/programmes" className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-5xl md:text-6xl font-bold mb-2 tracking-tight">{stat.value}</p>
                <p className="text-primary-foreground/70 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSlider reviews={reviews} title="Trusted by Parents & Schools" />

      {/* Blog & News */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-border pb-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Latest Updates</span>
              <h2 className="font-display text-4xl font-bold text-foreground mt-4">Insights & News</h2>
            </div>
            <Button asChild variant="ghost" className="font-bold">
              <Link to="/blog">View All Articles <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "What Is Alternative Provision?", excerpt: "A complete overview for 2024 covering education for pupils who cannot attend mainstream school.", date: "10 Dec 2024", slug: "what-is-alternative-provision", img: classroomImg },
              { title: "Understanding SEMH Needs", excerpt: "Social, Emotional and Mental Health difficulties are among the most common reasons for AP referrals.", date: "1 Dec 2024", slug: "semh-needs-in-ap", img: mentoringImg },
              { title: "When to Refer a Learner", excerpt: "Knowing the right time to refer can make all the difference for a young person's education.", date: "20 Nov 2024", slug: "when-to-refer-a-learner", img: vocationalImg }
            ].map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group bg-card rounded-[2rem] border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">Guide</span>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{post.date}</p>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Information</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">Common Questions</h2>
            <p className="text-muted-foreground text-lg">Quick answers to help you understand how we work.</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {faqs.map((faq, idx) => (
              <FaqItem key={faq.q} question={faq.q} answer={faq.a} index={idx} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">Have more questions?</p>
            <Button asChild variant="outline" className="rounded-full font-bold">
              <Link to="/faqs">Visit our Full FAQ Archive</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid-white.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-8 tracking-tight">
              Ready to <span className="underline decoration-accent underline-offset-8">Make a Referral?</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 text-balance leading-relaxed">
              Join the schools and local authorities already partnering with us to transform young lives across Staffordshire.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                asChild
                size="xl"
                className="rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-2xl px-10 h-16 text-lg"
              >
                <Link to="/referral">Start a Referral <ArrowRight className="ml-2 h-6 w-6" /></Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="rounded-full border-2 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white backdrop-blur-md px-10 h-16 text-lg"
              >
                <Link to="/contact">Speak to our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-card rounded-2xl border overflow-hidden transition-all duration-300 ${
        open ? "border-primary/40 shadow-lg shadow-primary/5" : "border-border/50 hover:border-border"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full font-display font-bold text-foreground flex items-center justify-between p-8 text-left gap-4"
      >
        <span className="text-lg">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            open ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="px-8 pb-8 text-muted-foreground text-base leading-relaxed max-w-3xl"
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
