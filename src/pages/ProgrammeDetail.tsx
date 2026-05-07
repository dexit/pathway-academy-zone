import { Navigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Wrench, Brain, Lightbulb, Briefcase, Heart,
  CheckCircle, ArrowRight, Calendar, Clock, Users, MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { buildCourseSchema, buildOfferSchema, ORG_SCHEMA, WEBSITE_SCHEMA } from "@/lib/json-ld";
import classroomImg  from "@/assets/classroom-1-NBeOjKjJ.webp";
import vocationalImg from "@/assets/Students_collaborating_around_a_laptop-DxJYaEB5.webp";
import mentoringImg  from "@/assets/classroom-2-ycnLvywG.webp";
import heroImg       from "@/assets/presentation-CgurFU4e.webp";
import careersImg    from "@/assets/amazon-careers-BRVYfevZ.webp";
import buildingImg   from "@/assets/building-exterior-CdR2heuW.webp";

interface Programme {
  slug: string;
  icon: LucideIcon;
  title: string;
  tag: string;
  img: string;
  desc: string;
  longDesc: string;
  features: string[];
  schedule: string;
  time: string;
  ageRange: string;
  groupSize: string;
  whoFor: string;
  outcomes: string[];
  seoDesc: string;
}

const programmes: Programme[] = [
  {
    slug: "academic-re-engagement",
    icon: BookOpen,
    title: "Academic Re-engagement",
    tag: "Core Programme",
    img: classroomImg,
    desc: "Structured academic curriculum adapted for individual learning needs, focusing on core subjects and building confidence in learning.",
    longDesc: "Our Academic Re-engagement programme provides a structured, trauma-informed curriculum for young people who have become disengaged from mainstream education. Working in small groups of no more than 6 students, our specialist teachers deliver personalised learning plans that rebuild foundational skills while nurturing confidence and a love of learning. The programme is accredited through recognised awarding bodies and can lead to functional skills qualifications or GCSE pathways.",
    features: ["English, Maths & Science", "PSHE / RSHE, RE, PE & Citizenship", "Small group teaching (max 6)", "Personalised learning plans", "Functional Skills & GCSE pathways", "Regular progress reviews with schools"],
    schedule: "Full-time or part-time placements",
    time: "Monday to Friday, 9:30am – 2:30pm",
    ageRange: "11–16",
    groupSize: "Maximum 6 per group",
    whoFor: "Students following permanent exclusion, at risk of exclusion, or with significant attendance issues. Also suitable for those returning from managed moves or long-term absence.",
    outcomes: ["Improved attendance", "GCSE / functional skills", "Confidence in learning"],
    seoDesc: "Academic Re-engagement Alternative Provision in Stoke-on-Trent. Small-group teaching for young people aged 11–16 following exclusion or with attendance issues. GCSE and functional skills pathways.",
  },
  {
    slug: "vocational-learning",
    icon: Wrench,
    title: "Vocational Learning",
    tag: "Skills & Careers",
    img: vocationalImg,
    desc: "Hands-on practical programmes developing real-world skills in areas like construction, catering, motor mechanics, and horticulture.",
    longDesc: "Our Vocational Learning strand gives young people access to real-world, practical skills through partnerships with local training providers, colleges, and employers. Students gain recognised qualifications in areas such as construction, catering, motor mechanics, animal care, and horticulture. Vocational learning is available as a 1–2 day per week supplement to academic provision or as a more intensive pathway for students who thrive with practical, hands-on experience.",
    features: ["Industry-standard training", "Work experience placements", "Recognised qualifications", "Employer partnerships", "College taster days", "BTEC, City & Guilds, NCFE pathways"],
    schedule: "1–2 days per week alongside academic",
    time: "Varies by programme and partner",
    ageRange: "13–16 (Year 9+)",
    groupSize: "Varies by employer / provider",
    whoFor: "Young people who thrive with practical, hands-on learning and are working towards vocational qualifications. Particularly valuable for Year 10 and 11 students planning apprenticeships or employment.",
    outcomes: ["Industry certificates", "Work experience", "Apprenticeship pathways"],
    seoDesc: "Vocational Learning Alternative Provision in Stoke-on-Trent. Practical hands-on programmes for young people aged 13–16. BTEC, City & Guilds and work experience pathways.",
  },
  {
    slug: "semh-support",
    icon: Brain,
    title: "SEMH Support",
    tag: "Therapeutic",
    img: mentoringImg,
    desc: "Therapeutic intervention and support for young people with social, emotional, and mental health needs, integrated throughout all provision.",
    longDesc: "Social, Emotional, and Mental Health (SEMH) support is woven throughout everything we do at Pathway Academy Zone. Our trained staff use trauma-informed, relational approaches to understand and respond to the underlying needs behind presenting behaviours. Students with significant SEMH needs receive structured 1:1 therapeutic sessions with qualified practitioners, alongside group workshops addressing emotional regulation, resilience, and wellbeing. We also provide family support and liaise closely with CAMHS, educational psychologists, and other specialist services.",
    features: ["1:1 therapeutic sessions", "Group workshops", "Emotional regulation support", "Family support sessions", "CAMHS liaison", "Trauma-informed whole-staff approach"],
    schedule: "Ongoing throughout placement",
    time: "Typically 2–3 sessions per week",
    ageRange: "11–16",
    groupSize: "1:1 and small group",
    whoFor: "Any student whose SEMH needs are a barrier to engagement or whose EHCP identifies therapeutic support. Students presenting with anxiety, trauma responses, attachment difficulties, or behavioural dysregulation.",
    outcomes: ["Improved emotional regulation", "Reduced anxiety", "Stronger relationships"],
    seoDesc: "SEMH Support Alternative Provision in Stoke-on-Trent. Therapeutic 1:1 and group sessions for young people aged 11–16 with social, emotional and mental health needs.",
  },
  {
    slug: "personal-development",
    icon: Lightbulb,
    title: "Personal Development",
    tag: "Enrichment",
    img: heroImg,
    desc: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.",
    longDesc: "Personal Development is not an add-on — it is central to our educational philosophy. Through structured sessions and integrated enrichment activities, young people develop the communication, problem-solving, and interpersonal skills they need for life, work, and continued learning. Activities include team challenges, project-based learning, community involvement, cultural visits, and mentoring from local role models and business figures. We celebrate growth and effort as well as attainment.",
    features: ["Communication skills", "Problem-solving & critical thinking", "Team building", "Goal setting & reflection", "Community projects", "Mentoring from local role models"],
    schedule: "Integrated into weekly timetable",
    time: "2 hours per week minimum",
    ageRange: "11–16",
    groupSize: "Small group, max 8",
    whoFor: "All students — Personal Development is woven into every programme. Particularly valuable for students with low self-esteem, limited social skills, or who have become isolated from positive peer relationships.",
    outcomes: ["Self-esteem", "Resilience", "Team skills"],
    seoDesc: "Personal Development Alternative Provision in Stoke-on-Trent. Building resilience, communication and life skills for young people aged 11–16 through enrichment and mentoring.",
  },
  {
    slug: "life-skills",
    icon: Heart,
    title: "Life Skills Programme",
    tag: "Independence",
    img: careersImg,
    desc: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.",
    longDesc: "The Life Skills Programme equips young people with the practical knowledge and capabilities they need to navigate adult life. Delivered through a mix of classroom sessions and hands-on activities, students explore healthy eating and cooking, financial literacy, digital skills, relationship education, and managing their own wellbeing. For looked-after children and young people approaching 16, the programme has a specific focus on transitions to independence and accessing community support.",
    features: ["Cooking & nutrition", "Financial literacy & budgeting", "Health education & wellbeing", "Digital skills including AI literacy", "Relationship and sex education (RSE)", "Transitions to independence"],
    schedule: "Integrated into curriculum",
    time: "Weekly sessions",
    ageRange: "11–16 (CLA focus 14–16)",
    groupSize: "Small group, max 8",
    whoFor: "Particularly valuable for looked-after children (CLA), young people with EHCPs, and those at risk of NEET post-16. Available to all students as part of their wider curriculum.",
    outcomes: ["Independent living skills", "Digital literacy", "Health awareness"],
    seoDesc: "Life Skills Alternative Provision in Stoke-on-Trent. Practical independence and life skills programme for young people aged 11–16, including budgeting, cooking, digital skills and wellbeing.",
  },
  {
    slug: "employability-skills",
    icon: Briefcase,
    title: "Employability Skills",
    tag: "Post-16 Ready",
    img: buildingImg,
    desc: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.",
    longDesc: "Our Employability Skills programme gives Year 10 and Year 11 students the tools, confidence, and practical experience to make a positive transition post-16. Working with local employers, colleges, and careers advisers, students build professional CVs, practise interview techniques, understand workplace culture, and explore a range of post-16 pathways including apprenticeships, traineeships, college, and supported employment. All students receive at least one formal work experience placement.",
    features: ["CV & application support", "Interview preparation & mock interviews", "Work experience placements", "Careers guidance (qualified advisers)", "Post-16 options workshops", "Employer visitor days"],
    schedule: "Year 10 & 11 focus",
    time: "Weekly sessions plus placements",
    ageRange: "14–16 (Year 10 & 11)",
    groupSize: "Small group, max 8",
    whoFor: "Year 10 and 11 students preparing for college, apprenticeships, or employment. Students at risk of NEET who need structured support to identify and achieve post-16 destinations.",
    outcomes: ["Employment-ready", "Interview confidence", "Positive destinations"],
    seoDesc: "Employability Skills Alternative Provision in Stoke-on-Trent. Post-16 readiness programme for Year 10 and 11, including CV writing, mock interviews and work experience placements.",
  },
];

const tagColors: Record<string, string> = {
  "Core Programme":  "bg-primary/10 text-primary",
  "Skills & Careers": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Therapeutic":      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Enrichment":       "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Independence":     "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  "Post-16 Ready":    "bg-accent text-accent-foreground",
};

const areaLinks = [
  { name: "Stoke-on-Trent",       slug: "stoke-on-trent" },
  { name: "Newcastle-under-Lyme", slug: "newcastle-under-lyme" },
  { name: "Stafford",             slug: "stafford" },
  { name: "Cannock",              slug: "cannock" },
  { name: "Lichfield",            slug: "lichfield" },
  { name: "Tamworth",             slug: "tamworth" },
  { name: "Wolverhampton",        slug: "wolverhampton" },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function ProgrammeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const prog = programmes.find((p) => p.slug === slug);

  if (!prog) return <Navigate to="/programmes" replace />;

  const related = programmes.filter((p) => p.slug !== prog.slug).slice(0, 3);

  const schema = [
    ORG_SCHEMA,
    WEBSITE_SCHEMA,
    buildCourseSchema(prog),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",       item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Programmes", item: `${SITE_URL}/programmes` },
        { "@type": "ListItem", position: 3, name: prog.title,   item: `${SITE_URL}/programmes/${prog.slug}` },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        title={prog.title}
        description={prog.seoDesc}
        jsonLd={schema}
        image={prog.img}
      />

      {/* Hero */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        <img
          src={prog.img}
          alt={prog.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="1080"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative container mx-auto px-4 pb-14 pt-32">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${tagColors[prog.tag] ?? "bg-muted text-muted-foreground"}`}>
            {prog.tag}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 max-w-2xl leading-tight">
            {prog.title}
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">{prog.desc}</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="py-6 bg-muted/40 border-b border-border/50">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Programmes", to: "/programmes" }, { label: prog.title }]} />
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

            {/* Left: detail */}
            <motion.div
              className="lg:col-span-2 space-y-10"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">About This Programme</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{prog.longDesc}</p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-5">What's Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 bg-muted/40 rounded-xl px-5 py-4 border border-border/50">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Who Is This For?</h2>
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-foreground text-sm leading-relaxed">{prog.whoFor}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Expected Outcomes</h2>
                <div className="flex flex-wrap gap-3">
                  {prog.outcomes.map((o) => (
                    <span key={o} className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-medium">
                      <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                      {o}
                    </span>
                  ))}
                </div>
              </div>

              {/* Area links */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Areas We Cover</h2>
                <div className="flex flex-wrap gap-2">
                  {areaLinks.map((a) => (
                    <Link
                      key={a.slug}
                      to={`/alternative-provision/${a.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted hover:bg-muted/70 text-muted-foreground rounded-full px-3 py-1.5 border border-border/50 transition-colors"
                    >
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: sidebar */}
            <motion.div
              className="space-y-6"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              {/* Quick facts */}
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <h2 className="font-display font-bold text-foreground mb-5">Programme Details</h2>
                <dl className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <dt className="font-medium text-foreground">Schedule</dt>
                      <dd className="text-muted-foreground">{prog.schedule}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <dt className="font-medium text-foreground">Hours</dt>
                      <dd className="text-muted-foreground">{prog.time}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <dt className="font-medium text-foreground">Group Size</dt>
                      <dd className="text-muted-foreground">{prog.groupSize}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <dt className="font-medium text-foreground">Age Range</dt>
                      <dd className="text-muted-foreground">{prog.ageRange}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                <h3 className="font-display font-bold text-lg mb-2">Make a Referral</h3>
                <p className="text-primary-foreground/80 text-sm mb-5">
                  Refer a young person for the {prog.title} programme. Our team will respond within 1 working day.
                </p>
                <Button asChild variant="secondary" className="w-full rounded-full">
                  <Link to="/referral">
                    Start Referral <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Contact */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-6 text-sm">
                <h3 className="font-display font-bold text-foreground mb-2">Have a Question?</h3>
                <p className="text-muted-foreground mb-4">
                  Speak to our team about this programme, placement availability, or how we can support a specific young person.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                  <Link to="/contact">Contact Us <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related programmes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-10">Other Programmes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {related.map((r, i) => (
              <motion.div
                key={r.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="400" height="128" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <span className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagColors[r.tag] ?? "bg-muted text-muted-foreground"}`}>
                    {r.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold text-foreground mb-2">{r.title}</h3>
                  <Link
                    to={`/programmes/${r.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Make a Referral?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Our team is here to discuss placements, answer questions, and support you through every step of the referral process.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10">
              <Link to="/contact">Speak to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
