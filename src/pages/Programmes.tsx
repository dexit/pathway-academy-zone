<<<<<<< HEAD
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  CheckCircle,
  Calendar,
  Clock,
  BookOpen,
  Wrench,
  Brain,
  Lightbulb,
  Heart,
  Briefcase,
  Building2,
  MapPin,
  ArrowRight
} from "lucide-react"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { ContentSidebar } from "@/components/ContentSidebar"
import heroImg from "@/assets/hero-classroom.jpg"
import careersImg from "@/assets/careers-event.jpg"
import buildingImg from "@/assets/building-exterior.jpg"
import vocationalImg from "@/assets/vocational-training.jpg"
import classroomImg from "@/assets/classroom-learning.jpg"

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const programmes = [
  { slug: "academic-reengagement", icon: BookOpen, title: "Academic Re-engagement", img: classroomImg, desc: "Focusing on core subjects (English, Maths, Science) to rebuild confidence and prepare for qualifications in a low-pressure environment.", features: ["Small group sizes (max 6)","Individual learning plans","GCSE & Functional Skills pathways","Trauma-informed teaching"], schedule: "Monday - Friday", time: "9:00am - 2:30pm" },
  { slug: "vocational-learning", icon: Wrench, title: "Vocational Learning", img: vocationalImg, desc: "Practical, hands-on experience in various trades and skills, designed to spark interest and provide a foundation for future apprenticeships.", features: ["Hands-on workshops","Introduction to trades","Portfolio building","Industry-standard tools"], schedule: "2 days per week", time: "9:30am - 3:00pm" },
  { slug: "semh-support", icon: Brain, title: "SEMH Support", img: classroomImg, desc: "Integrated social, emotional, and mental health support. Every programme includes access to therapeutic interventions and pastoral care.", features: ["1:1 therapeutic sessions","Group workshops","Emotional regulation support","Family support sessions"], schedule: "Ongoing throughout placement", time: "As needed, typically 2-3 sessions per week" },
  { slug: "personal-development", icon: Lightbulb, title: "Personal Development", img: heroImg, desc: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.", features: ["Communication skills","Problem-solving","Team building","Goal setting"], schedule: "Integrated into weekly timetable", time: "2 hours per week minimum" },
  { slug: "life-skills", icon: Heart, title: "Life Skills Programme", img: careersImg, desc: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.", features: ["Cooking & nutrition","Financial literacy","Health education","Digital skills including AI skills"], schedule: "Integrated into curriculum", time: "Weekly sessions" },
  { slug: "employability-skills", icon: Briefcase, title: "Employability Skills", img: buildingImg, desc: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.", features: ["CV & application support","Interview preparation","Work experience","Careers guidance"], schedule: "Year 10 & 11 focus", time: "Weekly sessions plus placements" },
];

const programmesSchema = [
  ...programmes.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": p.title,
    "description": p.desc,
    "url": `${SITE_URL}/programmes#${p.slug}`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": SITE_NAME,
      "sameAs": SITE_URL,
    },
    "educationalLevel": "Key Stage 3 / Key Stage 4",
    "inLanguage": "en-GB",
    "audience": { "@type": "EducationalAudience", "educationalRole": "student", "audienceType": "Ages 11–16" },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "location": {
        "@type": "Place",
        "name": `${SITE_NAME} — Burslem Learning Centre`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Duncalf Street, Burslem",
          "addressLocality": "Stoke-on-Trent",
          "postalCode": "ST6 3LJ",
          "addressCountry": "GB",
        },
      },
      "courseSchedule": { "@type": "Schedule", "description": `${p.schedule} — ${p.time}` },
    },
    "offers": { "@type": "Offer", "category": "Alternative Provision", "availability": "https://schema.org/InStock" },
  })),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Alternative Provision Programmes",
    "numberOfItems": programmes.length,
    "itemListElement": programmes.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE_URL}/programmes#${p.slug}`,
      "name": p.title
    }))
  }
=======
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Wrench, Brain, Lightbulb, Briefcase, Heart,
  Calendar, Clock, CheckCircle, ArrowRight, MapPin, Building2,
  ChevronDown, Users, Target, Shield, GraduationCap,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, SITE_URL, SITE_NAME, Breadcrumbs } from "@/components/Seo";
import {
  buildCourseSchema, buildServiceSchema,
  buildCourseCarouselSchema, ORG_SCHEMA, WEBSITE_SCHEMA,
} from "@/lib/json-ld";
import classroomImg  from "@/assets/classroom-learning.webp";
import vocationalImg from "@/assets/vocational-training.webp";
import mentoringImg  from "@/assets/mentoring-session.webp";
import heroImg       from "@/assets/hero-classroom.webp";
import careersImg    from "@/assets/careers-event.webp";
import buildingImg   from "@/assets/building-exterior.webp";

/* ─── data ─────────────────────────────────────────────────────────────── */
const programmes = [
  {
    slug: "academic-re-engagement",
    icon: BookOpen,
    title: "Academic Re-engagement",
    tag: "Core Programme",
    img: classroomImg,
    desc: "Structured academic curriculum adapted for individual learning needs, focusing on core subjects and building confidence in learning.",
    features: ["English, Maths & Science", "PSHE / RSHE, RE, PE & Citizenship", "Small group teaching (max 6)", "Personalised learning plans"],
    schedule: "Full-time or part-time placements",
    time: "Monday to Friday, 9:30am – 2:30pm",
    whoFor: "Students following permanent exclusion, at risk of exclusion, or with significant attendance issues.",
    outcomes: ["Improved attendance", "GCSE / functional skills", "Confidence in learning"],
  },
  {
    slug: "vocational-learning",
    icon: Wrench,
    title: "Vocational Learning",
    tag: "Skills & Careers",
    img: vocationalImg,
    desc: "Hands-on practical programmes developing real-world skills in areas like construction, catering, motor mechanics, and horticulture.",
    features: ["Industry-standard training", "Work experience placements", "Recognised qualifications", "Employer partnerships"],
    schedule: "1–2 days per week alongside academic",
    time: "Varies by programme",
    whoFor: "Young people who thrive with practical, hands-on learning and are working towards vocational qualifications.",
    outcomes: ["Industry certificates", "Work experience", "Apprenticeship pathways"],
  },
  {
    slug: "semh-support",
    icon: Brain,
    title: "SEMH Support",
    tag: "Therapeutic",
    img: mentoringImg,
    desc: "Therapeutic intervention and support for young people with social, emotional, and mental health needs, integrated throughout all provision.",
    features: ["1:1 therapeutic sessions", "Group workshops", "Emotional regulation support", "Family support sessions"],
    schedule: "Ongoing throughout placement",
    time: "Typically 2–3 sessions per week",
    whoFor: "Any student whose SEMH needs are a barrier to engagement or whose EHCP identifies therapeutic support.",
    outcomes: ["Improved emotional regulation", "Reduced anxiety", "Stronger relationships"],
  },
  {
    slug: "personal-development",
    icon: Lightbulb,
    title: "Personal Development",
    tag: "Enrichment",
    img: heroImg,
    desc: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.",
    features: ["Communication skills", "Problem-solving", "Team building", "Goal setting"],
    schedule: "Integrated into weekly timetable",
    time: "2 hours per week minimum",
    whoFor: "All students — woven into every programme to build the foundations young people need for life.",
    outcomes: ["Self-esteem", "Resilience", "Team skills"],
  },
  {
    slug: "life-skills",
    icon: Heart,
    title: "Life Skills Programme",
    tag: "Independence",
    img: careersImg,
    desc: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.",
    features: ["Cooking & nutrition", "Financial literacy", "Health education", "Digital skills including AI skills"],
    schedule: "Integrated into curriculum",
    time: "Weekly sessions",
    whoFor: "Particularly valuable for CLA, young people with EHCPs, and those at risk of NEET post-16.",
    outcomes: ["Independent living skills", "Digital literacy", "Health awareness"],
  },
  {
    slug: "employability-skills",
    icon: Briefcase,
    title: "Employability Skills",
    tag: "Post-16 Ready",
    img: buildingImg,
    desc: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.",
    features: ["CV & application support", "Interview preparation", "Work experience", "Careers guidance"],
    schedule: "Year 10 & 11 focus",
    time: "Weekly sessions plus placements",
    whoFor: "Year 10 and 11 students preparing for college, apprenticeships, or employment.",
    outcomes: ["Employment-ready", "Interview confidence", "Positive destinations"],
  },
>>>>>>> origin/main
];

const tagColors: Record<string, string> = {
  "Core Programme":  "bg-primary/10 text-primary",
  "Skills & Careers":"bg-chart-2/10 text-chart-2",
  "Therapeutic":     "bg-chart-3/10 text-chart-3",
  "Enrichment":      "bg-chart-4/10 text-chart-4",
  "Independence":    "bg-chart-5/10 text-chart-5",
  "Post-16 Ready":   "bg-accent text-accent-foreground",
};

/* ─── who-is-it-for navigator ───────────────────────────────────────────── */
const needs = [
  { label: "Permanently Excluded",   matches: ["academic-re-engagement", "semh-support", "personal-development"] },
  { label: "At Risk of Exclusion",   matches: ["academic-re-engagement", "semh-support", "personal-development"] },
  { label: "SEMH / Mental Health",   matches: ["semh-support", "personal-development", "life-skills"] },
  { label: "Poor Attendance",        matches: ["academic-re-engagement", "semh-support"] },
  { label: "Disengaged Learner",     matches: ["vocational-learning", "personal-development", "life-skills"] },
  { label: "EHCP / CLA",             matches: ["semh-support", "life-skills", "academic-re-engagement"] },
  { label: "Year 10 / 11",           matches: ["employability-skills", "vocational-learning", "academic-re-engagement"] },
  { label: "Post-16 Planning",       matches: ["employability-skills", "vocational-learning"] },
];

const areaLinks = [
  { name: "Stoke-on-Trent",      slug: "stoke-on-trent" },
  { name: "Newcastle-under-Lyme",slug: "newcastle-under-lyme" },
  { name: "Stafford",            slug: "stafford" },
  { name: "Cannock",             slug: "cannock" },
  { name: "Lichfield",           slug: "lichfield" },
  { name: "Tamworth",            slug: "tamworth" },
  { name: "Wolverhampton",       slug: "wolverhampton" },
];

/* ─── schema ─────────────────────────────────────────────────────────────── */
// Service → OfferCatalog → [Offer(itemOffered: Course+Product)] × 6
// + CourseCarousel ItemList for Google Rich Results
// + individual Course+Product schemas for deep indexing
const programmesSchema = [
  ORG_SCHEMA,
  WEBSITE_SCHEMA,
  buildServiceSchema(programmes),
  buildCourseCarouselSchema(programmes),
  ...programmes.map((p) => buildCourseSchema(p)),
];

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ─── programme card (condensed grid view) ──────────────────────────────── */
function ProgrammeCard({ prog, highlighted }: { prog: typeof programmes[0]; highlighted: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      id={prog.slug}
      layout
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`bg-card rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm scroll-mt-28 ${
        highlighted ? "border-primary ring-2 ring-primary/20 shadow-md" : "border-border/50 hover:border-border hover:shadow-md"
      }`}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={prog.img}
          alt={prog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width="600"
          height="176"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${tagColors[prog.tag] ?? "bg-muted text-muted-foreground"}`}>
            {prog.tag}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg">
            <prog.icon className="h-4.5 w-4.5 text-primary-foreground" style={{ width: "18px", height: "18px" }} />
          </div>
        </div>
        {highlighted && (
          <div className="absolute top-3 right-3">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">Recommended</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-base font-bold text-foreground mb-2">{prog.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{prog.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {prog.outcomes.map((o) => (
            <span key={o} className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-0.5">
              <CheckCircle className="h-3 w-3 text-primary" />{o}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors"
        >
          {open ? "Show less" : "View details"}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">What's included</p>
                  <ul className="space-y-1.5">
                    {prog.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Who is it for?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{prog.whoFor}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" />{prog.schedule}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" />{prog.time}</span>
                </div>
                <Button asChild size="sm" className="w-full rounded-full mt-1">
                  <Link to="/referral">Refer for This Programme <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* ─── page ─────────────────────────────────────────────────────────────── */
export default function Programmes() {
<<<<<<< HEAD
  const toc = programmes.map(p => ({
    id: p.slug,
    label: p.title,
    level: 2 as const
  }));
=======
  const [activeNeed, setActiveNeed] = useState<string | null>(null);

  const highlighted = activeNeed
    ? new Set(needs.find((n) => n.label === activeNeed)?.matches ?? [])
    : new Set<string>();
>>>>>>> origin/main

  return (
    <Layout>
      <Seo
        title="Our Programmes"
        description="Academic re-engagement, vocational learning, SEMH support and more — Alternative Provision programmes in Stoke-on-Trent for ages 11–16."
        jsonLd={programmesSchema}
      />
<<<<<<< HEAD
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Programmes" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Programmes</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Structured learning pathways combining academic rigour with vocational expertise and SEMH support.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <div className="space-y-24">
            {programmes.map((prog, i) => (
              <motion.article
                id={prog.slug}
                key={prog.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
                  <div className={i % 2 === 1 ? "xl:order-2" : ""}>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <prog.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{prog.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{prog.desc}</p>
                    <ul className="space-y-3 mb-6">
                      {prog.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-foreground text-sm">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground bg-muted/30 p-4 rounded-xl">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {prog.schedule}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {prog.time}
                      </span>
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "xl:order-1" : ""}>
                    <img src={prog.img} alt={prog.title} className="rounded-2xl shadow-lg w-full h-80 object-cover" loading="lazy" />
                  </div>
                </div>
              </motion.article>
            ))}

            <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-3">
                <Building2 className="h-4 w-4" /> Where We Deliver
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Programmes are Delivered at Our Centres
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
                Every programme is delivered in our purpose-built learning
                centre in Burslem, Stoke-on-Trent. Visit the Centres page to see
                our facilities, a typical day&apos;s timetable, and how to
                arrange a tour.
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-medium text-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Duncalf St, Burslem ST6 3LJ
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Mon–Fri, 8:30am–4:00pm
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/centres">
                    Visit Our Centres <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Arrange a Tour
                  </Link>
                </Button>
              </div>
            </section>
=======

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[{ label: "Programmes" }]}
            className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium mb-4 border border-white/20">
              Our Programmes
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Pathways to Success</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">
              Six structured programmes delivered in Stoke-on-Trent for young people aged 11–16
              across Staffordshire — combining academic learning with vocational skills and therapeutic support.
            </p>
            <div className="flex flex-wrap gap-3">
              {programmes.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 px-3 py-1.5 transition-colors"
                >
                  <p.icon className="h-3.5 w-3.5" />
                  {p.title}
                </a>
              ))}
            </div>
>>>>>>> origin/main
          </div>

<<<<<<< HEAD
          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Make a Referral",
                description: "Start the process for a new placement",
                href: "/referral",
                tone: "primary",
              },
              {
                label: "Contact Us",
                description: "Questions about our curriculum?",
                href: "/contact",
              },
            ]}
            quickContact={{
              phone: "01782 365365",
              email: "info@pathwayacademyzone.co.uk",
            }}
          />
        </div>
      </div>
=======
      {/* Which programme? navigator */}
      <section className="py-14 bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Which Programme is Right?</h2>
            <p className="text-muted-foreground text-sm mt-2">
              Select a presenting need to highlight the most relevant programmes below.
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-2 justify-center">
            {needs.map((n) => (
              <button
                key={n.label}
                onClick={() => setActiveNeed(activeNeed === n.label ? null : n.label)}
                aria-pressed={activeNeed === n.label}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeNeed === n.label
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
          {activeNeed && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-xs text-muted-foreground mt-4">
              Showing programmes most relevant to <strong className="text-foreground">{activeNeed}</strong> —
              <button onClick={() => setActiveNeed(null)} className="ml-1 text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">clear</button>
            </motion.p>
          )}
        </div>
      </section>

      {/* Programme cards grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((prog) => (
              <ProgrammeCard
                key={prog.slug}
                prog={prog}
                highlighted={highlighted.size > 0 && highlighted.has(prog.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How programmes combine — visual flow */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Integrated Approach</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
              How Our Programmes Work Together
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              No young person receives a single programme in isolation. Every placement is a blend
              designed around individual need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Safeguarding & Pastoral Foundation",
                desc: "Every young person has a named key worker. Safeguarding, wellbeing and relationships underpin every session.",
                colour: "bg-primary/10 text-primary",
              },
              {
                icon: BookOpen,
                title: "Academic Core",
                desc: "English, maths and wider curriculum delivered in groups of up to 6, with individual learning plans that flex as students progress.",
                colour: "bg-chart-2/10 text-chart-2",
              },
              {
                icon: Wrench,
                title: "Vocational & Enrichment Layer",
                desc: "Practical programmes, life skills and employability woven around the academic core to build real-world readiness.",
                colour: "bg-chart-3/10 text-chart-3",
              },
              {
                icon: Brain,
                title: "Therapeutic Support",
                desc: "SEMH interventions run in parallel — 1:1 sessions, group work, emotional regulation and family liaison.",
                colour: "bg-chart-4/10 text-chart-4",
              },
              {
                icon: Target,
                title: "Progress & Review",
                desc: "Formal half-termly reviews with the young person, family and referring school. Targets adjusted as confidence grows.",
                colour: "bg-chart-5/10 text-chart-5",
              },
              {
                icon: GraduationCap,
                title: "Destinations Planning",
                desc: "Post-16 planning begins at the first review. College applications, apprenticeship research and employer introductions.",
                colour: "bg-accent text-accent-foreground",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 hover:shadow-md transition-all shadow-sm"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${item.colour}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Area delivery */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-wider uppercase mb-3">
                  <Building2 className="h-4 w-4" /> Where We Deliver
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Serving Schools Across Staffordshire
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                  All programmes are delivered from our purpose-built centre at Duncalf Street, Burslem,
                  Stoke-on-Trent. We accept referrals from schools and local authorities across the region —
                  including Stafford, Newcastle-under-Lyme, Cannock, Lichfield, Tamworth and Wolverhampton.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {areaLinks.map((a) => (
                    <Link
                      key={a.slug}
                      to={`/alternative-provision/${a.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                      <MapPin className="h-3 w-3" />{a.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Duncalf St, Burslem ST6 3LJ
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> Mon–Fri, 8:30am–4:00pm
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Emergency Placements</h3>
                      <p className="text-sm text-muted-foreground">Students can start within 48 hours following an emergency referral — we work fast when young people need support urgently.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Standard Placements</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive assessment and planning typically means a student starts within 1–2 weeks of referral, with a fully personalised timetable in place from day one.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1">
                    <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/centres">View Our Centres</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-center">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Find the Right Programme for Your Young Person
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-sm">
              Every young person is unique. Speak to our team about the presenting needs and we'll
              recommend the best combination of programmes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-card text-primary hover:bg-card/90 font-semibold">
                <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" className="rounded-full border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Knowledge & Glossary cross-links */}
      <section className="py-12 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/knowledge-hub/guides/academic-vs-vocational"
              className="group bg-card rounded-xl border border-border/60 p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <p className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">Academic vs Vocational</p>
              <p className="text-xs text-muted-foreground">Which pathway suits your young person best?</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium">Read guide <ArrowRight className="h-3 w-3" /></span>
            </Link>
            <Link
              to="/knowledge-hub/guides/when-to-refer"
              className="group bg-card rounded-xl border border-border/60 p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <p className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">When to Refer</p>
              <p className="text-xs text-muted-foreground">Signs that a student may benefit from AP.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium">Read guide <ArrowRight className="h-3 w-3" /></span>
            </Link>
            <Link
              to="/knowledge-hub/glossary"
              className="group bg-card rounded-xl border border-border/60 p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <p className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">AP Glossary</p>
              <p className="text-xs text-muted-foreground">SEMH, EHCP, PRU — key terms explained.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium">Browse terms <ArrowRight className="h-3 w-3" /></span>
            </Link>
          </div>
        </div>
      </section>
>>>>>>> origin/main
    </Layout>
  )
}
