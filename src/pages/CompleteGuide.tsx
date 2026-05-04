import { useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Clock, ShieldCheck, Scale, ClipboardList, Lightbulb, Users, GraduationCap } from "lucide-react"
import Layout from "@/components/Layout"
import { ContentSidebar } from "@/components/ContentSidebar"
import { Button } from "@/components/ui/button"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
<<<<<<< HEAD
=======
import { ContentSidebar } from "@/components/ContentSidebar"
import { ReadingTime } from "@/components/SeoBlocks"
import { useAutoToc } from "@/hooks/use-auto-toc"
import { buildArticleJsonLd } from "@/lib/json-ld"
>>>>>>> origin/main

const anchors = [
  { id: "definition", label: "Definition", level: 2 as const },
  { id: "legal-framework", label: "Legal Framework", level: 2 as const },
  { id: "referral-reasons", label: "Referral Reasons", level: 2 as const },
  { id: "models", label: "Models of AP", level: 2 as const },
  { id: "safeguarding", label: "Safeguarding", level: 2 as const },
  { id: "progression", label: "Progression Routes", level: 2 as const },
]

export default function CompleteGuide() {
<<<<<<< HEAD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Complete Guide to Alternative Provision",
    "description": "A definitive guide covering the full Alternative Provision journey from referral triggers to progression routes, written for educators, parents, and professionals.",
    "author": { "@type": "Organization", "name": "Pathway Academy Zone" },
    "publisher": {
      "@type": "Organization",
      "name": "Pathway Academy Zone",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/knowledge-hub/complete-guide`
    },
    "articleSection": "Alternative Provision",
    "datePublished": "2024-12-10",
    "timeRequired": "PT15M"
  };
=======
  const articleRef = useRef<HTMLDivElement>(null)
  const toc = useAutoToc(articleRef, [])

  const jsonLd = buildArticleJsonLd({
    title: "The Complete Guide to Alternative Provision",
    description:
      "A definitive guide covering the full Alternative Provision journey from referral triggers to progression routes, written for educators, parents, and professionals.",
    url: `${SITE_URL}/knowledge-hub/complete-guide`,
    section: "Featured Resource",
    minutesToRead: 15,
    wordCount: 3450,
  })
>>>>>>> origin/main

  return (
    <Layout>
      <Seo
        title="The Complete Guide to Alternative Provision"
        description="Comprehensive guide to Alternative Provision in England, with a focus on Staffordshire. Covers definitions, legal duties, referral triggers, programme models, safeguarding, and progression routes."
        jsonLd={jsonLd}
      />
      <main className="min-h-screen bg-background text-balance">
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-24">
            <div className="max-w-4xl">
              <Breadcrumbs
                items={[
                  { label: "Knowledge Hub", to: "/knowledge-hub" },
                  { label: "The Complete Guide" },
                ]}
                className="text-primary-foreground/70 mb-8 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
              />
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm border border-accent/20">
                <BookOpen className="w-4 h-4" />
                Definitive Resource
              </div>
              <h1 className="text-4xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                The Complete Guide to <span className="text-accent">Alternative Provision</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-2xl leading-relaxed mb-10 max-w-3xl">
                Alternative Provision (AP) is education arranged for pupils who cannot attend mainstream school
                due to exclusion, illness, or other reasons. This guide covers everything you need to know about AP in England.
              </p>
<<<<<<< HEAD
              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/60 text-sm font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 15 min read</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> For Professionals & Families</span>
              </div>
=======
              <p className="text-primary-foreground/60 text-sm mb-6 inline-flex items-center gap-3"><ReadingTime minutes={15} className="text-primary-foreground/70" /> · For educators, parents &amp; professionals</p>
              <nav aria-label="On this page" className="flex flex-wrap gap-2">
                {anchors.map((a) => (
                  <a
                    key={a.id}
                    href={`#${a.id}`}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  >
                    {a.label}
                  </a>
                ))}
              </nav>
>>>>>>> origin/main
            </div>
          </div>
        </header>

<<<<<<< HEAD
        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-20">
            <div className="space-y-20">
              <section id="definition" className="scroll-mt-24 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">What is Alternative Provision?</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Alternative Provision refers to education arranged for pupils who, because of exclusion,
                  illness, or other reasons, would not otherwise receive suitable education. It operates outside
                  mainstream and special school settings, providing tailored support for young people facing
                  significant barriers to learning.
=======
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start">
            <div ref={articleRef} className="min-w-0 space-y-14">
            <section id="what-is-ap" className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">What is Alternative Provision?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alternative Provision refers to education arranged for pupils who, because of exclusion,
                illness, or other reasons, would not otherwise receive suitable education. It operates outside
                mainstream and special school settings, providing tailored support for young people facing
                significant barriers to learning.
              </p>
              <h3 className="text-xl font-semibold text-foreground">AP typically serves learners who:</h3>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Have been permanently excluded from mainstream school</li>
                <li>Are at risk of permanent exclusion due to behaviour</li>
                <li>Have medical or mental health needs preventing mainstream attendance</li>
                <li>Require a managed move or fresh start arrangement</li>
                <li>Are Children Looked After requiring specialist educational support</li>
              </ul>
              <p className="text-sm">
                Related:{" "}
                <Link
                  to="/knowledge-hub/guides/what-is-alternative-provision"
                  className="text-accent font-semibold hover:underline"
                >
                  What is Alternative Provision (In-Depth Guide) →
                </Link>
              </p>
            </section>

            <section id="legal-framework" className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Legal Framework and Duties</h2>
              <p className="text-muted-foreground leading-relaxed">
                Local authorities and schools have specific legal responsibilities regarding Alternative
                Provision under the Education Act 1996 and subsequent guidance.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Local Authority Duties</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                    <li>Arrange suitable education for permanently excluded pupils from day 6</li>
                    <li>Ensure provision for children unable to attend school due to illness</li>
                    <li>Monitor quality and outcomes of AP settings</li>
                    <li>Maintain oversight of children missing education</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">School Responsibilities</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                    <li>Arrange education for fixed-term exclusions from day 6</li>
                    <li>Continue responsibility for pupil outcomes when using AP</li>
                    <li>Ensure appropriate safeguarding arrangements</li>
                    <li>Plan for reintegration where appropriate</li>
                  </ul>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-secondary border border-border">
                <h3 className="font-bold text-foreground mb-1">Key Legal Consideration</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Schools remain accountable for the educational outcomes of pupils in Alternative Provision.
                  This includes monitoring attendance, progress, and ensuring safeguarding standards are met
                  throughout the placement.
>>>>>>> origin/main
                </p>
                <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" /> AP typically serves learners who:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Have been permanently excluded",
                      "Are at risk of permanent exclusion",
                      "Have medical or mental health needs",
                      "Require a managed move",
                      "Are Children Looked After (CLA)",
                      "Are disengaged from mainstream",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

<<<<<<< HEAD
              <section id="legal-framework" className="scroll-mt-24 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-primary" />
=======
            <section id="referral-triggers" className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Referral Triggers and Indicators</h2>
              <p className="text-muted-foreground leading-relaxed">
                Understanding when Alternative Provision is appropriate is crucial for ensuring young people
                receive timely, effective support.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Behavioural Indicators", items: ["Persistent disruptive behaviour", "Physical aggression towards staff or peers", "Repeated fixed-term exclusions", "Significant safeguarding concerns"] },
                  { title: "Attendance and Engagement", items: ["Persistent absence below 50%", "School refusal or anxiety", "Complete disengagement from learning", "Emotional-based school avoidance"] },
                  { title: "SEMH and Wellbeing", items: ["Significant mental health difficulties", "Trauma affecting school functioning", "Self-harm or suicide risk", "Diagnosed SEMH requiring specialist support"] },
                ].map((card) => (
                  <div key={card.title} className="p-5 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                    <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                      {card.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
>>>>>>> origin/main
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">The Legal Framework</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  The statutory guidance "Alternative Provision: Statutory guidance for local authorities"
                  sets out the expectations for LAs, schools, and providers. Key legal duties include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Duty to Provide", desc: "LAs must arrange suitable full-time education for permanently excluded pupils from the sixth day." },
                    { title: "Suitability", desc: "Education must be suitable to the child's age, ability, and any special educational needs they may have." },
                    { title: "Quality Standards", desc: "LAs should have a process for commissioning and monitoring the quality of AP providers." },
                    { title: "Personalisation", desc: "AP should be tailored to the individual learner, with regular reviews of progress and outcomes." },
                  ].map((item) => (
                    <div key={item.title} className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                      <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

<<<<<<< HEAD
              <section id="referral-reasons" className="scroll-mt-24 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Referral Triggers</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Recognising when a young person requires Alternative Provision is key to early intervention and successful outcomes.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "Sustained Low Attendance", desc: "Attendance falling below 50% despite school-level interventions." },
                    { title: "Escalating Behavioural Incidents", desc: "Increase in fixed-term suspensions or serious internal incidents." },
                    { title: "Social & Emotional Decline", desc: "Severe anxiety, school refusal, or significant mental health barriers." },
                    { title: "Academic Stagnation", desc: "Inability to access the mainstream curriculum despite support." }
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/30 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="models" className="scroll-mt-24 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Models of AP</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-xl font-bold text-foreground mb-4">Academic Re-engagement</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">Focuses on core GCSEs and Functional Skills in small group settings to rebuild learner confidence and ensure qualifications are achieved.</p>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                       <Link to="/programmes" className="hover:underline">Learn More →</Link>
                    </div>
                  </div>
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-xl font-bold text-foreground mb-4">Vocational Learning</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">Practical, skills-based learning in trades like construction, motor mechanics, or catering, designed to spark interest and path to employment.</p>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                       <Link to="/programmes" className="hover:underline">Learn More →</Link>
                    </div>
                  </div>
                </div>
              </section>

              <section id="safeguarding" className="scroll-mt-24 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Safeguarding Excellence</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Robust safeguarding is non-negotiable in AP settings. Young people often have complex backgrounds including trauma and vulnerability.
                </p>
                <div className="bg-primary/5 rounded-[2.5rem] p-8 md:p-12 border border-primary/10">
                   <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Statutory Requirements</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { title: "Trained DSL", desc: "A Designated Safeguarding Lead must be available at all times during provision hours." },
                        { title: "Staff Training", desc: "All staff must receive regular safeguarding training, including KCSIE updates." },
                        { title: "Risk Management", desc: "Individual risk assessments for every learner, reviewed regularly with partners." },
                        { title: "Multi-Agency", desc: "Strong communication channels with social care, police, and mental health services." }
                      ].map((item) => (
                        <div key={item.title} className="space-y-2">
                           <h4 className="font-bold text-primary flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item.title}</h4>
                           <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </section>

              <section id="progression" className="scroll-mt-24 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Progression Routes</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Effective AP always plans for the next step, ensuring young people have a clear destination when their placement ends.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 rounded-3xl bg-muted/30 border border-border/50">
                      <h4 className="font-bold text-foreground mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> KS3/KS4 Options</h4>
                      <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                        <li>• Reintegration to mainstream</li>
                        <li>• Managed move to alternative mainstream</li>
                        <li>• Sustained AP placement for GCSEs</li>
                        <li>• Specialist SEND placement</li>
                      </ul>
                   </div>
                   <div className="p-8 rounded-3xl bg-muted/30 border border-border/50">
                      <h4 className="font-bold text-foreground mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Post-16 Options</h4>
                      <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                        <li>• FE College (Academic/Vocational)</li>
                        <li>• Apprenticeships & Traineeships</li>
                        <li>• Supported Employment</li>
                        <li>• Specialist Post-16 Provision</li>
                      </ul>
                   </div>
                </div>
              </section>

              <section className="rounded-[3rem] bg-primary text-primary-foreground p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Discuss a Placement?</h2>
                <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
                  Whether you're a school, local authority, or parent, our team is here to help you find the right pathway.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 font-bold px-10 h-16 text-lg rounded-full">
                    <Link to="/referral">
                      Start a Referral <ArrowRight className="ml-2 h-5 w-5" />
=======
            <section id="programme-models" className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Programme Models and Approaches</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alternative Provision encompasses various models designed to meet different learner needs and
                circumstances.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Academic Re-engagement", body: "Focuses on rebuilding core academic skills and confidence, often with the aim of reintegration to mainstream education. Includes modified curriculum, smaller class sizes, and intensive literacy/numeracy support.", link: "/knowledge-hub/guides/academic-vs-vocational", linkLabel: "Compare Academic vs Vocational AP" },
                  { title: "Vocational Pathways", body: "Combines practical, skills-based learning with functional skills. Ideal for learners who thrive with hands-on activities and are preparing for employment or further vocational training.", link: "/knowledge-hub/best-practice/vocational-routes", linkLabel: "Best Vocational Routes for Disengaged Learners" },
                  { title: "Therapeutic and SEMH Focused", body: "Prioritises emotional regulation, trauma recovery, and mental health support alongside education. Uses therapeutic approaches integrated throughout the curriculum.", link: "/knowledge-hub/best-practice/semh-pathways", linkLabel: "Best AP Pathways for SEMH Learners" },
                ].map((p) => (
                  <div key={p.title} className="p-5 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-3">{p.body}</p>
                    <Link to={p.link} className="text-accent font-semibold text-sm hover:underline">
                      {p.linkLabel} →
>>>>>>> origin/main
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="xl"
                    className="border-2 border-white/40 text-white hover:bg-white/10 font-bold px-10 h-16 text-lg rounded-full"
                  >
<<<<<<< HEAD
                    <Link to="/contact">Speak to Our Team</Link>
                  </Button>
                </div>
              </section>
            </div>

            <ContentSidebar
              toc={anchors}
              ctas={[
                {
                  label: "Make a Referral",
                  description: "Start the process for a new placement",
=======
                    {l.label} →
                  </Link>
                ))}
              </div>
            </section>

            <section id="safeguarding" className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Safeguarding in Alternative Provision</h2>
              <p className="text-muted-foreground leading-relaxed">
                Robust safeguarding is non-negotiable in AP settings. Young people in Alternative Provision
                often have complex backgrounds including trauma, exploitation risk, and vulnerability.
              </p>
              <h3 className="text-xl font-semibold text-foreground">Essential Safeguarding Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Designated Safeguarding Lead", body: "Trained DSL available at all times with clear escalation procedures" },
                  { title: "Staff Training", body: "All staff receive safeguarding training including trauma-informed practice" },
                  { title: "Risk Assessment", body: "Individual risk assessments for each learner, regularly reviewed" },
                  { title: "Multi-Agency Working", body: "Strong links with social care, CAMHS, police, and other agencies" },
                ].map((c) => (
                  <div key={c.title} className="p-5 rounded-xl bg-card border border-border">
                    <h4 className="font-semibold text-foreground mb-1">{c.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm">
                Related:{" "}
                <Link
                  to="/knowledge-hub/guides/high-quality-ap-provider"
                  className="text-accent font-semibold hover:underline"
                >
                  What Makes a High Quality AP Provider →
                </Link>{" "}
                |{" "}
                <Link to="/safeguarding" className="text-accent font-semibold hover:underline">
                  Our Safeguarding Approach →
                </Link>
              </p>
            </section>

            <section className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Staffing and Expertise</h2>
              <p className="text-muted-foreground leading-relaxed">
                High-quality AP requires specialist staff with skills beyond standard teaching qualifications.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Teaching Staff", items: ["Qualified teachers", "SEND specialists", "Vocational instructors"] },
                  { title: "Support Staff", items: ["Learning mentors", "Behaviour specialists", "Family liaison"] },
                  { title: "Therapeutic", items: ["Counsellors", "Art/play therapists", "Pastoral leads"] },
                ].map((c) => (
                  <div key={c.title} className="p-5 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
                    <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                      {c.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Delayed Referral", body: "Waiting until crisis point before considering AP. Early intervention often leads to better outcomes and shorter placements." },
                  { title: "Poor Transition Planning", body: "Inadequate handover of information, support plans, and relationships between settings. Comprehensive transition is essential." },
                  { title: "Treating AP as Punishment", body: "Using AP punitively rather than as positive intervention. AP should be presented as opportunity, not consequence." },
                  { title: "Neglecting Family Engagement", body: "Failing to involve parents and carers as partners in the young person's education and progress." },
                ].map((c) => (
                  <div key={c.title} className="p-5 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="progression" className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Progression Routes</h2>
              <p className="text-muted-foreground leading-relaxed">
                Effective AP always plans for next steps, whether that&apos;s return to mainstream, further
                education, employment, or specialist provision.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">During KS3/KS4</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                    <li>Reintegration to mainstream school</li>
                    <li>Managed move to alternative mainstream</li>
                    <li>Continuation in AP with qualifications</li>
                    <li>Specialist SEND placement</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Post-16 Options</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                    <li>College (academic or vocational)</li>
                    <li>Apprenticeships and traineeships</li>
                    <li>Supported employment</li>
                    <li>Specialist post-16 provision</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm">
                Related:{" "}
                <Link
                  to="/knowledge-hub/best-practice/post-16-progression"
                  className="text-accent font-semibold hover:underline"
                >
                  Best Post-16 Progression Pathways →
                </Link>
              </p>
            </section>

            <section className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Make a Referral?</h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
                If you believe a young person could benefit from Alternative Provision, we&apos;re here to
                help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2">
                  <Link to="/referral">
                    Start a Referral
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
                >
                  <Link to="/contact">Speak to Our Team</Link>
                </Button>
              </div>
            </section>
            </div>

            <ContentSidebar
              toc={toc.length ? toc : anchors.map((a) => ({ id: a.id, label: a.label, level: 2 as const }))}
              ctas={[
                {
                  label: "Make a Referral",
                  description: "Refer a young person in 4 steps",
>>>>>>> origin/main
                  href: "/referral",
                  tone: "primary",
                },
                {
<<<<<<< HEAD
                  label: "Knowledge Hub",
                  description: "Browse more resources and guides",
=======
                  label: "Browse Knowledge Hub",
                  description: "All guides and references",
>>>>>>> origin/main
                  href: "/knowledge-hub",
                },
              ]}
              quickContact={{
                phone: "01782 365365",
                email: "info@pathwayacademyzone.co.uk",
              }}
            />
          </div>
        </div>
      </main>
    </Layout>
  )
}
