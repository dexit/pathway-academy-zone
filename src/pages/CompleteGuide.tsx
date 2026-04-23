import { useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, BookOpen } from "lucide-react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
import { ContentSidebar } from "@/components/ContentSidebar"
import { ReadingTime } from "@/components/SeoBlocks"
import { useAutoToc } from "@/hooks/use-auto-toc"
import { buildArticleJsonLd } from "@/lib/json-ld"

const anchors = [
  { id: "what-is-ap", label: "What is AP" },
  { id: "legal-framework", label: "Legal Framework" },
  { id: "referral-triggers", label: "Referral Triggers" },
  { id: "programme-models", label: "Programme Models" },
  { id: "safeguarding", label: "Safeguarding" },
  { id: "progression", label: "Progression Routes" },
]

export default function CompleteGuide() {
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

  return (
    <Layout>
      <Seo
        title="The Complete Guide to Alternative Provision"
        description="Comprehensive guide to Alternative Provision in England, with a focus on Staffordshire. Covers definitions, legal duties, referral triggers, programme models, safeguarding, and progression routes."
        jsonLd={jsonLd}
      />
      <main className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="max-w-3xl">
              <Breadcrumbs
                items={[
                  { label: "Knowledge Hub", to: "/knowledge-hub" },
                  { label: "The Complete Guide" },
                ]}
                className="text-primary-foreground/70 mb-5 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
              />
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5">
                <BookOpen className="w-3.5 h-3.5" />
                Source of Truth
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 text-balance">
                The Complete Guide to Alternative Provision
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">
                Alternative Provision (AP) is education arranged for pupils who cannot attend mainstream school
                due to exclusion, illness, or other reasons. This comprehensive guide covers everything
                professionals, parents, and educators need to know about AP in England, with specific focus on
                Staffordshire provision.
              </p>
              <p className="text-primary-foreground/60 text-sm mb-6">15 min read · For educators, parents &amp; professionals</p>
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
            </div>
          </div>
        </header>

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
                  <h4 className="font-semibold text-foreground mb-2">Local Authority Duties</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                    <li>Arrange suitable education for permanently excluded pupils from day 6</li>
                    <li>Ensure provision for children unable to attend school due to illness</li>
                    <li>Monitor quality and outcomes of AP settings</li>
                    <li>Maintain oversight of children missing education</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border">
                  <h4 className="font-semibold text-foreground mb-2">School Responsibilities</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                    <li>Arrange education for fixed-term exclusions from day 6</li>
                    <li>Continue responsibility for pupil outcomes when using AP</li>
                    <li>Ensure appropriate safeguarding arrangements</li>
                    <li>Plan for reintegration where appropriate</li>
                  </ul>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-secondary border border-border">
                <h4 className="font-bold text-foreground mb-1">Key Legal Consideration</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Schools remain accountable for the educational outcomes of pupils in Alternative Provision.
                  This includes monitoring attendance, progress, and ensuring safeguarding standards are met
                  throughout the placement.
                </p>
              </div>
            </section>

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
                    <h4 className="font-semibold text-foreground mb-2">{card.title}</h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                      {card.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-sm">
                Related:{" "}
                <Link
                  to="/knowledge-hub/guides/when-to-refer"
                  className="text-accent font-semibold hover:underline"
                >
                  When a Learner Should Be Referred to AP →
                </Link>
              </p>
            </section>

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
                    <h4 className="font-semibold text-foreground mb-2">{p.title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-3">{p.body}</p>
                    <Link to={p.link} className="text-accent font-semibold text-sm hover:underline">
                      {p.linkLabel} →
                    </Link>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  { href: "/knowledge-hub/comparisons/group-vs-one-to-one", label: "Group vs One-to-One Provision" },
                  { href: "/knowledge-hub/comparisons/short-vs-long-term", label: "Short-Term vs Long-Term Placements" },
                  { href: "/knowledge-hub/comparisons/onsite-vs-offsite", label: "On-Site vs Off-Site Provision" },
                  { href: "/knowledge-hub/comparisons/ap-vs-mainstream", label: "AP vs Mainstream Schooling" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="px-3 py-1.5 rounded-full bg-secondary text-foreground hover:bg-secondary/70 transition-colors"
                  >
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
                    <h4 className="font-semibold text-foreground mb-2">{c.title}</h4>
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
                    <h4 className="font-semibold text-foreground mb-1">{c.title}</h4>
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
                  <h4 className="font-semibold text-foreground mb-2">During KS3/KS4</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                    <li>Reintegration to mainstream school</li>
                    <li>Managed move to alternative mainstream</li>
                    <li>Continuation in AP with qualifications</li>
                    <li>Specialist SEND placement</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Post-16 Options</h4>
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
                  href: "/referral",
                  tone: "primary",
                },
                {
                  label: "Browse Knowledge Hub",
                  description: "All guides and references",
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
