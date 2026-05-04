import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, TrendingUp, ArrowRight, BookOpen, Wrench, Brain, Lightbulb, UserCheck, Target, ChevronDown, School, CircleCheckBig, MapPin, ClipboardList, Sparkles, GraduationCap, ShieldCheck, PhoneCall } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import {
  ORG_SCHEMA, WEBSITE_SCHEMA, AREAS_SERVED, CONTACT_POINTS,
  buildServiceSchema, buildCourseCarouselSchema,
} from "@/lib/json-ld";
import WhyItMattersScroller from "@/components/WhyItMattersScroller";
//import heroImg from "@/assets/hero-classroom.webp";
//import classroomImg from "@/assets/classroom-learning.webp";
//import vocationalImg from "@/assets/vocational-training.webp";
//import mentoringImg from "@/assets/mentoring-session.webp";

// ✅ Use the functions or direct strings instead
import { getVocationalImg, getMentoringImg, getClassroomImg, getHeroImg, getCareersImg } from "@/utils/images";

const heroImg = "/assets/hero-classroom.webp";
const classroomImg = "/assets/classroom-learning.webp";
const vocationalImg = "/assets/vocational-training.webp";
const mentoringImg = "/assets/mentoring-session.webp";

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

// Programme stubs for homepage Service + CourseCarousel schemas
const HOME_PROGRAMMES = [
  { slug: "academic-re-engagement", title: "Academic Re-engagement",  desc: "Structured academic curriculum for young people aged 11–16.",    features: [], schedule: "Full-time or part-time", time: "Mon–Fri 9:30am–2:30pm", whoFor: "Post-exclusion students",      outcomes: ["Improved attendance", "GCSE / functional skills"] },
  { slug: "vocational-learning",    title: "Vocational Learning",      desc: "Hands-on practical skills in construction, catering and more.",  features: [], schedule: "1–2 days per week",     time: "Varies",              whoFor: "Practical learners",          outcomes: ["Industry certificates", "Apprenticeship pathways"] },
  { slug: "semh-support",           title: "SEMH Support",             desc: "Therapeutic 1:1 and group support for social and emotional needs.", features: [], schedule: "Ongoing",             time: "2–3 sessions/week",   whoFor: "SEMH-identified students",    outcomes: ["Emotional regulation", "Reduced anxiety"] },
  { slug: "personal-development",   title: "Personal Development",     desc: "Resilience, communication, and life-skills enrichment.",         features: [], schedule: "Integrated",           time: "2 hrs/week",          whoFor: "All students",                outcomes: ["Resilience", "Self-esteem"] },
  { slug: "life-skills",            title: "Life Skills Programme",    desc: "Independent living, digital literacy, and health education.",    features: [], schedule: "Integrated",           time: "Weekly",              whoFor: "CLA and EHCP students",       outcomes: ["Independent living skills"] },
  { slug: "employability-skills",   title: "Employability Skills",     desc: "CV writing, interview practice, and work experience.",           features: [], schedule: "Year 10 & 11",         time: "Weekly + placements", whoFor: "Year 10 and 11",              outcomes: ["Employment-ready", "Positive destinations"] },
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://pathwayacademyzone.co.uk" }],
  };

  const homeJsonLd = [
    ORG_SCHEMA,
    WEBSITE_SCHEMA,
    faqJsonLd,
    breadcrumbJsonLd,
    buildServiceSchema(HOME_PROGRAMMES),
    buildCourseCarouselSchema(HOME_PROGRAMMES),
  ];

  return (
    <Layout>
      <Seo
        title="Alternative Provision Stoke-on-Trent"
        description="Pathway Academy Zone is an Alternative Provision in Stoke-on-Trent for ages 11-16. SEMH support, behaviour and reintegration programmes for schools and Local Authorities."
        jsonLd={homeJsonLd}
      />
      {/* Hero - Full screen with image overlay */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Students collaborating around a laptop in a supportive Alternative Provision classroom in Stoke-on-Trent"
            title="Pathway Academy Zone classroom"
            className="w-full h-full object-cover"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="sync"
            loading="eager"
          />
          <div className="absolute inset-0 bg-scrim/60" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/25">
              Alternative Provision in Staffordshire
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Every Young Person Deserves a Pathway To Success
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-4 max-w-xl">
              We provide specialist education for young people who need a different approach.
            </p>
            <p className="text-white/75 text-base md:text-lg mb-10 max-w-xl">
              Through structure, care and high expectations, we help young people re-engage, rebuild confidence and move forward in education, employment or training.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button asChild size="xl" className="rounded-full shadow-lg px-8">
                <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                <Link to="/about">Learn About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Who We Are</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">Specialist Education for Those Who Need It Most</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Pathway Academy Zone works with young people aged 11-16 who have been excluded from mainstream education, or who are at risk of exclusion. We partner with schools, local authorities, and families across Staffordshire to provide structured, supportive learning environments where every student can succeed.
              </p>
              <ul className="space-y-3 mb-8">
                {["SEMH-focused curriculum delivery", "Small group and 1:1 support", "Qualified teachers and mentors", "Strong pastoral care teams", "Vocational and academic pathways"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CircleCheckBig className="w-5 h-5 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/programmes">Explore Our Programmes <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              <img src={classroomImg} alt="Students engaged in learning at Pathway Academy Zone classroom" width="600" height="256" className="rounded-2xl shadow-lg w-full h-64 object-cover" loading="lazy" decoding="async" />
              <img src={vocationalImg} alt="Young people exploring vocational and apprenticeship pathways" width="600" height="256" className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8" loading="lazy" decoding="async" />
              <img src={mentoringImg} alt="One-to-one mentoring session supporting young people's development" width="1200" height="256" className="rounded-2xl shadow-lg w-full h-64 object-cover col-span-2" loading="lazy" decoding="async" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Support */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Approach</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">How We Support Young People</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Our evidence-based approach combines therapeutic support with quality education to help students overcome barriers and achieve their potential.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {approaches.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Alternative Provision Matters - interactive scrolling visualization */}
      <WhyItMattersScroller />

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


      {/* Latest Blog Posts — temporarily hidden */}

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
