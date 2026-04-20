import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Info, CheckCircle2, LayoutDashboard, Search, FileText, UserPlus, GraduationCap, ShieldAlert } from "lucide-react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Seo, Breadcrumbs } from "@/components/Seo"
import { ContentSidebar } from "@/components/ContentSidebar"

const toc = [
  { id: "what-is-ap", label: "What is AP?", level: 2 },
  { id: "who-is-it-for", label: "Who is it for?", level: 2 },
  { id: "referral-process", label: "The Referral Process", level: 2 },
  { id: "models-of-ap", label: "Models of AP", level: 2 },
  { id: "safeguarding", label: "Safeguarding", level: 2 },
  { id: "progression", label: "Progression Routes", level: 2 },
]

export default function CompleteGuide() {
  return (
    <Layout>
      <Seo
        title="The Complete Guide to Alternative Provision"
        description="Our comprehensive guide to Alternative Provision: understanding the legal basis, who it's for, and how to achieve the best outcomes for learners."
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Knowledge Hub", to: "/knowledge-hub" },
                { label: "Complete Guide" }
              ]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight text-balance">
              The Complete Guide to Alternative Provision
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Everything you need to know about AP: from understanding what it is and how it works, to best practices for referrals and supporting learners.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          <div className="space-y-16 min-w-0">
            <section id="what-is-ap" className="scroll-mt-24 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" />
                Definition
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">What is Alternative Provision?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alternative Provision (AP) is education arranged for pupils who, because of exclusion,
                illness or other reasons, would not otherwise receive suitable education. It is a vital
                part of the education system designed to support young people who may find mainstream
                environments challenging.
              </p>
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                  <h3 className="font-bold text-foreground mb-2">The Legal Basis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Local authorities have a statutory duty under section 19 of the Education Act 1996
                    to provide suitable education for children of compulsory school age who cannot
                    attend school.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                  <h3 className="font-bold text-foreground mb-2">Who Provides It?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AP can be provided by Pupil Referral Units (PRUs), academy APs, free school APs,
                    and independent providers like Pathway Academy Zone.
                  </p>
                </div>
              </div>
              <Link to="/knowledge-hub/guides/what-is-alternative-provision" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Read more about AP fundamentals <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            <section id="who-is-it-for" className="scroll-mt-24 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Learner Profiles
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Who is Alternative Provision for?</h2>
              <p className="text-muted-foreground leading-relaxed">
                AP supports a wide range of learners, each with their own unique needs and challenges.
                Common reasons for referral include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Social, Emotional & Mental Health (SEMH) needs",
                  "Risk of permanent exclusion",
                  "Chronic school refusal or anxiety",
                  "Medical or health-related barriers",
                  "Complex trauma or attachment history",
                  "Need for vocational or practical learning",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/knowledge-hub/glossary" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Explore our glossary of terms <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            <section id="referral-process" className="scroll-mt-24 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <UserPlus className="w-3.5 h-3.5" />
                Next Steps
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">The Referral Process</h2>
              <p className="text-muted-foreground leading-relaxed">
                A high-quality referral is the foundation of a successful AP placement. It requires
                collaboration between the school, the provider, the family, and the young person.
              </p>
              <div className="space-y-4">
                {[
                  { step: "1. Identification", desc: "Recognising that mainstream interventions are not yielding the required progress." },
                  { step: "2. Consultation", desc: "Speaking with providers to check capacity and suitability for the learner." },
                  { step: "3. Formal Referral", desc: "Providing comprehensive data including EHCP, safeguarding, and academic history." },
                  { step: "4. Induction", desc: "A planned transition with visits and a phased start to ensure early success." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                    <div className="font-bold text-primary shrink-0">{item.step.split(".")[0]}</div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.step.split(".")[1].trim()}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/referral" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Begin a referral <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            <section id="models-of-ap" className="scroll-mt-24 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Variety
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Different Models of AP</h2>
              <p className="text-muted-foreground leading-relaxed">
                AP is not one-size-fits-all. Different models serve different purposes based on
                the young person&apos;s goals.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Academic Re-engagement", body: "Focuses on rebuilding confidence in core subjects and achieving GCSEs/Functional Skills in a smaller setting.", link: "/knowledge-hub/guides/academic-vs-vocational", linkLabel: "Academic vs Vocational Guide" },
                  { title: "Vocational Pathways", body: "Hands-on learning in industry-standard facilities like construction, catering, or motor vehicle trades.", link: "/knowledge-hub/best-practice/vocational-routes", linkLabel: "Vocational Routes Guide" },
                  { title: "Therapeutic / SEMH", body: "Prioritises emotional regulation and mental health support alongside education using trauma-informed approaches.", link: "/knowledge-hub/best-practice/semh-pathways", linkLabel: "SEMH Pathways Guide" },
                  { title: "Early Intervention", body: "Short-term placements aimed at assessment and stabilisation before returning to mainstream.", link: "/knowledge-hub/comparisons/short-vs-long-term", linkLabel: "Short vs Long Term Guide" },
                ].map((p) => (
                  <div key={p.title} className="flex flex-col p-6 rounded-2xl bg-card border border-border shadow-sm">
                    <h4 className="font-bold text-foreground mb-2">{p.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">{p.body}</p>
                    <Link to={p.link} className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">
                      {p.linkLabel} →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <section id="safeguarding" className="scroll-mt-24 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                Priority
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Safeguarding in AP</h2>
              <p className="text-muted-foreground leading-relaxed">
                Robust safeguarding is non-negotiable. Young people in AP often have complex
                backgrounds including trauma, exploitation risk, and vulnerability.
              </p>
              <div className="p-6 rounded-2xl bg-muted border border-border">
                <h3 className="font-bold text-foreground mb-4">Essential Requirements:</h3>
                <ul className="space-y-3">
                  {[
                    "Dedicated DSL available at all times",
                    "Comprehensive staff training in trauma-informed practice",
                    "Individualised risk assessments for every learner",
                    "Strong multi-agency collaboration (CAMHS, Social Care, Police)",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/safeguarding" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Our Safeguarding Approach <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            <section id="progression" className="scroll-mt-24 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                Futures
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Progression Routes</h2>
              <p className="text-muted-foreground leading-relaxed">
                Effective AP always plans for next steps. Whether returning to mainstream or moving
                to post-16 study, the transition is carefully managed.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">During KS3/KS4</h4>
                  <ul className="space-y-2">
                    {["Reintegration to mainstream", "Managed move", "Continuation in AP with qualifications", "Specialist SEND placement"].map(i => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Post-16 Options</h4>
                  <ul className="space-y-2">
                    {["College (Academic/Vocational)", "Apprenticeships", "Supported Employment", "Specialist Post-16 Provision"].map(i => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link to="/knowledge-hub/best-practice/post-16-progression" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Best Post-16 Progression Pathways <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            <section className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 text-center shadow-xl shadow-primary/20">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Make a Referral?</h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                If you believe a young person could benefit from Alternative Provision, we&apos;re here to
                help you through the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8">
                  <Link to="/referral">
                    Start a Referral
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-8"
                >
                  <Link to="/contact">Speak to Our Team</Link>
                </Button>
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Download Policies",
                description: "Safeguarding & pastoral docs",
                href: "/policies",
              },
              {
                label: "Our Programmes",
                description: "Academic & vocational paths",
                href: "/programmes",
              },
            ]}
            quickContact={{
              phone: "01782 365365",
              email: "info@pathwayacademyzone.co.uk",
            }}
          />
        </div>
      </div>
    </Layout>
  )
}
