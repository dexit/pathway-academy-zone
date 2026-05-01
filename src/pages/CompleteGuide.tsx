import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Clock, ShieldCheck, Scale, ClipboardList, Lightbulb, Users, GraduationCap } from "lucide-react"
import Layout from "@/components/Layout"
import { ContentSidebar } from "@/components/ContentSidebar"
import { Button } from "@/components/ui/button"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"

const anchors = [
  { id: "definition", label: "Definition", level: 2 as const },
  { id: "legal-framework", label: "Legal Framework", level: 2 as const },
  { id: "referral-reasons", label: "Referral Reasons", level: 2 as const },
  { id: "models", label: "Models of AP", level: 2 as const },
  { id: "safeguarding", label: "Safeguarding", level: 2 as const },
  { id: "progression", label: "Progression Routes", level: 2 as const },
]

export default function CompleteGuide() {
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
              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/60 text-sm font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 15 min read</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> For Professionals & Families</span>
              </div>
            </div>
          </div>
        </header>

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

              <section id="legal-framework" className="scroll-mt-24 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-primary" />
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
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="xl"
                    className="border-2 border-white/40 text-white hover:bg-white/10 font-bold px-10 h-16 text-lg rounded-full"
                  >
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
                  href: "/referral",
                  tone: "primary",
                },
                {
                  label: "Knowledge Hub",
                  description: "Browse more resources and guides",
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
