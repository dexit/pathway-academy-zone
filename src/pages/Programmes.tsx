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
import classroomImg  from "@/assets/programmes/classroom-1-NBeOjKjJ.webp";
import vocationalImg from "@/assets/programmes/training-wall-uqB92baC.webp";
import mentoringImg  from "@/assets/programmes/reception-area-CTi6XeEj.webp";
import heroImg       from "@/assets/programmes/skills-advice-BsX137y0.webp";
import careersImg    from "@/assets/programmes/amazon-careers-BRVYfevZ.webp";
import buildingImg   from "@/assets/programmes/careers-fair-B2B2seve.webp";

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
  const [activeNeed, setActiveNeed] = useState<string | null>(null);

  const highlighted = activeNeed
    ? new Set(needs.find((n) => n.label === activeNeed)?.matches ?? [])
    : new Set<string>();

  return (
    <Layout>
      <Seo
        title="Our Alternative Provision Programmes"
        description="Academic re-engagement, vocational learning, SEMH support and more — Alternative Provision programmes in Stoke-on-Trent for ages 11–16."
        jsonLd={programmesSchema}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden">
        {/* Abstract background pattern for premium feel */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Breadcrumbs
            items={[{ label: "Our Programmes" }]}
            className="text-primary-foreground/70 mb-8 justify-center [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
                Alternative Provision Programmes
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Alternative Provision Programmes in Stoke-on-Trent
              </h1>
              <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
                Six structured Alternative Provision programmes delivered across Staffordshire — 
                combining academic re-engagement with vocational skills and specialist 
                Social, Emotional and Mental Health (SEMH) support for young people aged 11–16.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {programmes.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 transition-all hover:scale-105"
                >
                  <p.icon className="h-3.5 w-3.5" />
                  {p.title}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

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

      {/* Programme zig-zag sections */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-20 md:space-y-28">
          {programmes.map((prog, i) => {
            const reverse = i % 2 === 1;
            const isHighlighted = highlighted.size > 0 && highlighted.has(prog.slug);
            return (
              <motion.article
                key={prog.slug}
                id={prog.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-28 ${
                  isHighlighted ? "ring-2 ring-primary/30 rounded-3xl p-4 lg:p-6 -m-4 lg:-m-6 bg-primary/5" : ""
                }`}
              >
                <div className={`${reverse ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-xl">
                    <img
                      src={prog.img}
                      alt={prog.title}
                      title={prog.title}
                      width="900"
                      height="600"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[320px] md:h-[420px] object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${tagColors[prog.tag] ?? "bg-muted text-muted-foreground"}`}>
                        {prog.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`${reverse ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-md">
                      <prog.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    {isHighlighted && (
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Recommended</span>
                    )}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {prog.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-5">{prog.desc}</p>

                  <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                    {prog.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" />{prog.schedule}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{prog.time}</span>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 mb-5 border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Who is it for?</p>
                    <p className="text-sm text-foreground leading-relaxed">{prog.whoFor}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {prog.outcomes.map((o) => (
                      <span key={o} className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground rounded-full px-3 py-1">
                        <CheckCircle className="h-3 w-3 text-primary" />{o}
                      </span>
                    ))}
                  </div>

                  <Button asChild className="rounded-full">
                    <Link to="/referral">Refer for This Programme <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
              </motion.article>
            );
          })}
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
              <p className="text-xs text-muted-foreground">Signs that a student may benefit from Alternative Provision.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium">Read guide <ArrowRight className="h-3 w-3" /></span>
            </Link>
            <Link
              to="/knowledge-hub/glossary"
              className="group bg-card rounded-xl border border-border/60 p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <p className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">Alternative Provision Glossary</p>
              <p className="text-xs text-muted-foreground">SEMH, EHCP, PRU — key terms explained.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium">Browse terms <ArrowRight className="h-3 w-3" /></span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
