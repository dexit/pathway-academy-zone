import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, TrendingUp, ArrowRight, BookOpen, Wrench, Brain, Lightbulb, UserCheck, Target, ChevronDown, School } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
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
    "@id": "https://pathwayacademyzone.co.uk/#organization",
    name: "Pathway Academy Zone",
    alternateName: "PAZ",
    url: "https://pathwayacademyzone.co.uk",
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

  const homeJsonLd = [orgJsonLd, faqJsonLd];

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
            alt="Students in classroom"
            className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-6 border border-primary/20">
                Alternative Provision Excellence
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-8">
                Building Pathways to <span className="text-primary italic">Bright Futures</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                Empowering young people across Staffordshire to re-engage with education through
                personalised learning, vocational training, and trauma-informed support.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Button asChild size="xl" className="rounded-full px-8 shadow-lg shadow-primary/20 w-full sm:w-auto">
                  <Link to="/referral">Make a Referral <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="rounded-full px-8 w-full sm:w-auto">
                  <Link to="/programmes">Explore Programmes</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LogoTicker logos={partners} title="Working in Partnership With" />

      {/* Approaches */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Foundation of Success</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto italic">More than just a school, we provide a structured environment where every young person can find their unique path.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <img src={mentoringImg} alt="Student mentoring" className="rounded-3xl shadow-xl w-full relative z-10" loading="lazy" />
              <div className="absolute -bottom-8 -right-8 bg-card p-6 rounded-2xl shadow-lg border border-border/50 z-20 hidden md:block">
                <p className="text-primary font-bold text-3xl">1:1</p>
                <p className="text-sm text-muted-foreground">Personalised Support</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Vision</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6 leading-tight">Every young person deserves a path to success.</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Many of our learners have found mainstream environments challenging. At Pathway Academy Zone, we don't just see the barriers; we see the potential.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                By combining a robust academic curriculum with high-quality vocational training and
                dedicated pastoral care, we help students rebuild their relationship with learning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full"><BookOpen className="h-4 w-4 text-primary" /></div>
                  <p className="text-sm font-medium text-foreground">Academic Excellence</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full"><Wrench className="h-4 w-4 text-primary" /></div>
                  <p className="text-sm font-medium text-foreground">Vocational Training</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full"><Brain className="h-4 w-4 text-primary" /></div>
                  <p className="text-sm font-medium text-foreground">SEMH Specialist Support</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full"><Lightbulb className="h-4 w-4 text-primary" /></div>
                  <p className="text-sm font-medium text-foreground">Personal Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informational Text Section (similar to About brief) */}
      <section className="py-24 bg-muted/20 border-y border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-10">How we work</h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              Pathway Academy Zone operates as a registered Alternative Provision based in Stoke-on-Trent,
              commissioned by secondary schools and local authorities to provide high-quality education
              and SEMH (Social, Emotional and Mental Health) support.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              For schools and commissioners, we provide a reliable, evidence-based partner. The first start is
              the <Link to="/referral" className="text-primary font-medium hover:underline">online referral form</Link>;
              for general enquiries please use our <Link to="/contact" className="text-primary font-medium hover:underline">contact page</Link>
              {" "}or call <a href="tel:+441782365365" className="text-primary font-medium hover:underline">01782 365365</a>.
              For practitioners researching the field, our <Link to="/knowledge-hub/complete-guide" className="text-primary font-medium hover:underline">Complete Guide to Alternative Provision</Link>
              {" "}is a long-form, evidence-led reference covering definitions, legal duties, programme models and
              progression routes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Making a Real Difference</h2>
            <p className="text-primary-foreground/70 mt-3 max-w-xl mx-auto">Our outcomes speak to the transformative impact we have on young people's lives across Staffordshire.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSlider reviews={reviews} title="Trusted by Parents & Schools" />

      {/* Latest Blog Posts */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Stay Updated</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Latest from our Blog</h2>
              <p className="text-muted-foreground mt-4">Insights, guides, and updates on Alternative Provision and SEMH support.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/blog">View All Articles <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "What Is Alternative Provision?", excerpt: "A complete overview for 2024 covering education for pupils who cannot attend mainstream school.", date: "10 Dec 2024", slug: "what-is-alternative-provision" },
              { title: "Understanding SEMH Needs", excerpt: "Social, Emotional and Mental Health difficulties are among the most common reasons for AP referrals.", date: "1 Dec 2024", slug: "semh-needs-in-ap" },
              { title: "When to Refer a Learner", excerpt: "Knowing the right time to refer can make all the difference for a young person's education.", date: "20 Nov 2024", slug: "when-to-refer-a-learner" }
            ].map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted" />
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                  <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Common Questions</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-4">Quick answers to help you understand Alternative Provision and how Pathway Academy Zone works.</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
            {faqs.map((faq, idx) => (
              <FaqItem key={faq.q} question={faq.q} answer={faq.a} index={idx} />
            ))}
          </motion.div>
        </div>
      </section>


      {/* Knowledge Hub Preview */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Educational Resources & Guides</h2>
              <p className="text-muted-foreground">Explore our Knowledge Hub for comprehensive guides on Alternative Provision, SEMH support, and educational best practices.</p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link to="/knowledge-hub">Visit Knowledge Hub <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Make a Referral?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
              Whether you're a school, local authority, social worker, or parent, we're here to help. Our team will guide you through the referral process and find the right pathway for your young person.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="xl"
                className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
              >
                <Link to="/referral">Start a Referral <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                <Link to="/contact">Contact Us</Link>
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
        open ? "border-primary/40 shadow-md" : "border-border/50 hover:border-border"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full font-display font-semibold text-foreground flex items-center justify-between p-6 text-left gap-4"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            open ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
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
              className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed"
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
