import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Cell,
} from "recharts";
import {
  TrendingUp, Target, Users, UserCheck, ArrowRight,
  MapPin, GraduationCap, Briefcase, BookOpen, CheckCircle2, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";
import TestimonialsSlider, { type Testimonial } from "@/components/TestimonialsSlider";
import ReviewsSlider, { type Review } from "@/components/ReviewsSlider";
import mentoringImg from "@/assets/programmes/pastoral-support-DgJkB7ng.webp";
import careersImg from "@/assets/programmes/amazon-careers-BRVYfevZ.webp";

/* ─── data ─────────────────────────────────────────────────────────────── */
const stats = [
  { icon: TrendingUp, value: 94, suffix: "%", label: "Improved Attendance", color: "text-primary" },
  { icon: Target,     value: 87, suffix: "%", label: "Positive Destinations", color: "text-primary" },
  { icon: Users,      value: 92, suffix: "%", label: "Improved Engagement", color: "text-primary" },
  { icon: UserCheck,  value: 78, suffix: "%", label: "Achieved Qualifications", color: "text-primary" },
];

const destinationData = [
  { name: "College / FE", value: 42, fill: "hsl(var(--primary))" },
  { name: "Apprenticeship", value: 18, fill: "hsl(var(--chart-2))" },
  { name: "Employment", value: 15, fill: "hsl(var(--chart-3))" },
  { name: "Return to School", value: 12, fill: "hsl(var(--chart-4))" },
  { name: "Training / ETE", value: 10, fill: "hsl(var(--chart-5))" },
  { name: "Other Positive", value: 3,  fill: "hsl(var(--muted-foreground))" },
];

const termlyProgress = [
  { term: "Start",  attendance: 28, engagement: 32, confidence: 25 },
  { term: "T1",     attendance: 52, engagement: 55, confidence: 44 },
  { term: "T2",     attendance: 70, engagement: 68, confidence: 61 },
  { term: "T3",     attendance: 82, engagement: 79, confidence: 74 },
  { term: "T4",     attendance: 89, engagement: 85, confidence: 83 },
  { term: "End",    attendance: 94, engagement: 92, confidence: 91 },
];

const radialData = [
  { name: "Attendance",    value: 94, fill: "hsl(var(--primary))" },
  { name: "Engagement",    value: 92, fill: "hsl(var(--chart-2))" },
  { name: "Qualifications",value: 78, fill: "hsl(var(--chart-3))" },
  { name: "Destinations",  value: 87, fill: "hsl(var(--chart-4))" },
];

const journeySteps = [
  { icon: BookOpen,       step: "Referral",        desc: "School, LA or social worker contacts us. We assess the young person's needs and agree a placement plan." },
  { icon: Users,          step: "Assessment",      desc: "Comprehensive assessment across academic, social, emotional and vocational areas. Baseline established." },
  { icon: Target,         step: "Programme Start", desc: "Personalised timetable begins. Small group teaching, pastoral support and SEMH interventions introduced." },
  { icon: TrendingUp,     step: "Progress",        desc: "Regular progress reviews. Attendance, engagement and achievement tracked against personal targets." },
  { icon: GraduationCap,  step: "Transition",      desc: "Post-placement planning begins. College applications, apprenticeships or return to mainstream arranged." },
  { icon: Briefcase,      step: "Destination",     desc: "87% move into college, apprenticeships, employment or training. Ongoing alumni support available." },
];

const stories = [
  { area: "Stoke-on-Trent", title: "From Exclusion to Achievement", text: "Jordan came to us after permanent exclusion from a Stoke-on-Trent secondary school, having not attended for 6 months. Through our trauma-informed approach and vocational programme, he re-engaged with learning and achieved his GCSEs." },
  { area: "Newcastle-under-Lyme", title: "Overcoming Anxiety", text: "Mia, referred by a Newcastle-under-Lyme school SENCO, struggled with severe anxiety that prevented mainstream attendance. Our small group setting improved her attendance from 15% to 85% within two terms." },
  { area: "Stafford", title: "Finding a Pathway", text: "Tyler had been through multiple placements in the Stafford area before arriving at Pathway. He discovered motor mechanics through our vocational programme and is now completing an apprenticeship with a local employer." },
];

const testimonials: Testimonial[] = [
  { text: "Pathway Academy Zone gave my son a second chance. He went from refusing to attend school to genuinely enjoying learning. The staff truly care.", author: "Parent of Year 10 student", role: "Parent / Carer", area: "Stoke-on-Trent", rating: 5 },
  { text: "The progress we've seen in our referred students has been remarkable. The team understand what these young people need and deliver it consistently.", author: "SENCO, Staffordshire Secondary School", role: "School Professional", area: "Staffordshire", rating: 5 },
  { text: "I actually want to come here. The teachers listen to me and don't give up when things get hard. I feel like I can do something with my life now.", author: "Year 11 Student", role: "Current Learner", area: "Burslem Centre", rating: 5 },
  { text: "Pathway worked with us every step of the way — from the initial referral to transition planning. An exceptional provider.", author: "Inclusion Lead", role: "Local Authority", area: "Newcastle-under-Lyme", rating: 5 },
  { text: "The vocational programme gave our young person something to get out of bed for. He's now in an apprenticeship.", author: "Parent", role: "Parent / Carer", area: "Stafford", rating: 5 },
  { text: "Martin and the safeguarding team give us absolute confidence that our most vulnerable pupils are in safe hands.", author: "Head of Year", role: "Secondary School", area: "Tamworth", rating: 5 },
];

const reviews: Review[] = [
  { text: "Outstanding Alternative Provision. The holistic approach to each child's needs is second to none. Our school trusts Pathway completely.", author: "SENCo", role: "Secondary School", area: "Stoke-on-Trent", rating: 5, source: "School Partnership Feedback" },
  { text: "My daughter has transformed since joining PAZ. She has friends, attends every day, and is working towards her GCSEs. Truly life-changing.", author: "Parent", role: "Parent / Carer", area: "Cannock", rating: 5, source: "Parent Feedback" },
  { text: "Placement process was swift, the team communicated well throughout, and outcomes exceeded our expectations.", author: "Virtual School Head", role: "Local Authority", area: "Staffordshire", rating: 5, source: "Commissioner Feedback" },
  { text: "The trauma-informed ethos runs through every aspect of provision. Highly recommended for any child with SEMH needs.", author: "Educational Psychologist", role: "Specialist Professional", area: "West Midlands", rating: 5, source: "Partner Review" },
];

const areaLinks = [
  { name: "Stoke-on-Trent", slug: "stoke-on-trent" },
  { name: "Newcastle-under-Lyme", slug: "newcastle-under-lyme" },
  { name: "Stafford", slug: "stafford" },
  { name: "Cannock", slug: "cannock" },
  { name: "Lichfield", slug: "lichfield" },
  { name: "Tamworth", slug: "tamworth" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: "Alternative Provision Stoke-on-Trent — 94% attendance improvement, 87% positive destinations across Staffordshire.",
};

/* ─── animated counter ─────────────────────────────────────────────────── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    raw.set(target);
  }, [inView, raw, target]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v).toString()));
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── animated progress bar ────────────────────────────────────────────── */
function ProgressBar({ pct, label }: { pct: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-primary font-semibold">{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

/* ─── custom tooltip ───────────────────────────────────────────────────── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; fill: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill }}>
          {p.name}: <strong>{p.value}%</strong>
        </p>
      ))}
    </div>
  );
}

/* ─── page ─────────────────────────────────────────────────────────────── */
export default function Outcomes() {
  return (
    <Layout>
      <Seo
        title="Outcomes & Impact of Alternative Provision"
        description="94% attendance improvement, 87% positive destinations. See how Pathway Academy Zone transforms lives across Staffordshire."
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[{ label: "Outcomes & Impact" }]}
            className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4 border border-white/20">
              <Star className="w-3.5 h-3.5 fill-current" /> Evidence-based outcomes
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Making a Real Difference Across Staffordshire
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Our outcomes are measured against national benchmarks. Every number
              represents a young person from Stoke-on-Trent, Stafford, Newcastle-under-Lyme
              and across the region who found their pathway.
            </p>
          </div>
        </div>
      </section>

      {/* Animated stat counters */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-foreground mb-1 tabular-nums">
                  <AnimatedNumber target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-muted-foreground text-sm leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Termly progress chart + radial overview */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Data & Visualisations</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">Progress Across a Typical Placement</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              Average figures across young people referred from Staffordshire schools and local authorities, tracked from placement start to exit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Bar chart — termly trend */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-base font-semibold text-foreground mb-1">Attendance, Engagement & Confidence</h3>
              <p className="text-xs text-muted-foreground mb-5">Average % improvement over 4 terms (cohort aggregate)</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={termlyProgress} margin={{ top: 4, right: 8, left: -16, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="term" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted))" }} />
                  <Bar dataKey="attendance"  name="Attendance"  fill="hsl(var(--primary))"    radius={[4,4,0,0]} />
                  <Bar dataKey="engagement"  name="Engagement"  fill="hsl(var(--chart-2))"    radius={[4,4,0,0]} />
                  <Bar dataKey="confidence"  name="Confidence"  fill="hsl(var(--chart-3))"    radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-4">
                {[
                  { label: "Attendance",  color: "hsl(var(--primary))" },
                  { label: "Engagement",  color: "hsl(var(--chart-2))" },
                  { label: "Confidence",  color: "hsl(var(--chart-3))" },
                ].map((l) => (
                  <span key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: l.color }} />
                    {l.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Radial bar chart — key metrics */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
              <h3 className="text-base font-semibold text-foreground mb-1">Exit Outcomes</h3>
              <p className="text-xs text-muted-foreground mb-4">% of leavers meeting their target at end of placement</p>
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart
                  innerRadius="25%"
                  outerRadius="90%"
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar dataKey="value" cornerRadius={6} background={{ fill: "hsl(var(--muted))" }}>
                    {radialData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </RadialBar>
                  <Tooltip
                    formatter={(v: number, _name: string, props: { payload?: { name: string } }) => [
                      `${v}% achieved target`,
                      props.payload?.name ?? "",
                    ]}
                    contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>

              {/* Enhanced legend with mini progress bars */}
              <div className="space-y-3 w-full mt-3 border-t border-border pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Legend</p>
                {radialData.map((d) => (
                  <div key={d.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-foreground font-medium">
                        <span className="w-3 h-3 rounded-full shrink-0 ring-2 ring-background shadow-sm" style={{ background: d.fill }} />
                        {d.name}
                      </span>
                      <span className="font-bold tabular-nums" style={{ color: d.fill }}>{d.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${d.value}%`, background: d.fill }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground pt-1">
                  Based on cohort data 2023–24. Figures represent average across all placements.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destinations breakdown */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Where They Go Next</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">
                Positive Destinations on Exit
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                87% of young people leaving Pathway Academy Zone move into a positive destination.
                We work hard to ensure every student from Stoke-on-Trent and across Staffordshire
                has a clear next step planned well before they leave us.
              </p>
              <div className="space-y-3">
                {destinationData.map((d) => (
                  <ProgressBar key={d.name} pct={d.value} label={d.name} />
                ))}
              </div>
            </motion.div>

            {/* Photo + inline metric */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              <div className="relative">
                <img
                  src={careersImg}
                  alt="Young people at a careers and destinations event"
                  className="rounded-2xl shadow-lg w-full h-72 object-cover"
                  loading="lazy"
                  width="700" height="288"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border/50 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">42% progress to College / FE</p>
                      <p className="text-xs text-muted-foreground">The single largest positive destination</p>
                    </div>
                  </div>
                </div>
              </div>
              <img
                src={mentoringImg}
                alt="1-to-1 mentoring session supporting young person's development"
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
                loading="lazy"
                width="700" height="192"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student journey timeline */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">The Journey</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
              What a Placement Looks Like
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
              From first contact to positive destination — a typical pathway through our provision.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div aria-hidden className="hidden md:block absolute top-7 left-[calc(50%-1px)] w-0.5 h-[calc(100%-3.5rem)] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-12">
              {journeySteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex gap-4 items-start ${i % 2 === 0 ? "md:text-right md:flex-row-reverse" : ""}`}
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20 relative z-10">
                    <step.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className={`bg-card rounded-xl border border-border/50 p-4 shadow-sm flex-1 hover:border-primary/30 transition-colors ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-primary font-semibold uppercase tracking-widest">Step {i + 1}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{step.step}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Success Stories</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">Real Young People, Real Change</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stories.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-7 shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="inline-flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 rounded-full px-3 py-1 mb-4">
                  <MapPin className="h-3 w-3" />
                  {s.area}
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials slider */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Voices</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">What People Say</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
              Hear from parents, professionals and young people who have experienced Pathway Academy Zone first-hand.
            </p>
          </motion.div>
          <TestimonialsSlider testimonials={testimonials} withSchema={false} />
        </div>
      </section>

      {/* Reviews slider */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Reviews</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">Partner & Professional Reviews</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
              Feedback from the schools, commissioners and specialist professionals who work alongside us.
            </p>
          </motion.div>
          <ReviewsSlider
            reviews={reviews}
            aggregateRating={{ value: 4.9, count: 47 }}
          />
        </div>
      </section>

      {/* Areas we serve */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Delivering Outcomes Across the Region</h2>
            <p className="text-muted-foreground text-sm mb-6">
              We accept referrals from schools and local authorities across Staffordshire and the wider West Midlands.
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
              <Button asChild size="lg">
                <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Speak to Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
