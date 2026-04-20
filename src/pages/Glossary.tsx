import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"

const terms: { term: string; slug: string; definition: string }[] = [
  { term: "Alternative Provision (AP)", slug: "alternative-provision", definition: "Education arranged for pupils who, because of exclusion, illness, or other reasons, would not otherwise receive suitable education. AP can be delivered by local authorities, schools, or registered providers outside of mainstream and special school settings." },
  { term: "SEMH (Social, Emotional and Mental Health)", slug: "semh", definition: "A category of Special Educational Needs covering difficulties with social interaction, emotional regulation, and mental health that significantly impact a young person's ability to learn. SEMH needs often require specialist support and therapeutic interventions." },
  { term: "EHCP (Education, Health and Care Plan)", slug: "ehcp", definition: "A legal document for children and young people aged 0-25 with more complex special educational needs. EHCPs describe the child's needs, the support required, and the outcomes to be achieved. They are reviewed annually." },
  { term: "Managed Move", slug: "managed-move", definition: "A voluntary agreement between schools, parents, and the local authority to transfer a pupil to another school as an alternative to permanent exclusion. Managed moves aim to give pupils a fresh start while avoiding exclusion on their record." },
  { term: "Trauma-Informed Practice", slug: "trauma-informed", definition: "An approach to education that recognises the widespread impact of trauma on young people's behaviour and learning. Staff understand trauma responses, avoid re-traumatisation, and create safe, predictable environments that support recovery." },
  { term: "Re-Engagement", slug: "re-engagement", definition: "The process of helping disengaged learners reconnect with education through modified approaches, relationship-building, and addressing underlying barriers. Academic re-engagement focuses on rebuilding confidence in learning." },
  { term: "Vocational Pathway", slug: "vocational-pathway", definition: "An educational route focused on practical, skills-based learning that prepares young people for specific careers or industries. Vocational pathways in AP often include construction, catering, motor vehicle, hair and beauty, or creative industries." },
  { term: "Pastoral Support", slug: "pastoral-support", definition: "Non-academic support provided to students addressing their emotional, social, and personal needs. In AP settings, pastoral support is often intensive and may include mentoring, counselling, family liaison, and multi-agency coordination." },
  { term: "Progression Routes", slug: "progression-routes", definition: "The pathways available to young people when they complete their AP placement. These include return to mainstream school, college, apprenticeships, employment, or continued specialist provision depending on individual needs and aspirations." },
  { term: "Permanent Exclusion", slug: "permanent-exclusion", definition: "When a headteacher decides that a pupil should no longer attend their school. This is the most serious sanction available and should only be used as a last resort. Local authorities must arrange education from day 6 of a permanent exclusion." },
  { term: "Fixed-Term Exclusion (Suspension)", slug: "fixed-term-exclusion", definition: "When a pupil is temporarily removed from school for a set period. Schools must provide work for the first 5 days and arrange alternative education from day 6. A pupil can receive a maximum of 45 days of fixed-term exclusion in one school year." },
  { term: "Pupil Referral Unit (PRU)", slug: "pru", definition: "A type of school established and maintained by local authorities specifically to provide education for children who are excluded, sick, or otherwise unable to attend mainstream school. PRUs are a form of Alternative Provision." },
  { term: "Designated Safeguarding Lead (DSL)", slug: "dsl", definition: "The person in a school or AP setting with overall responsibility for safeguarding and child protection. The DSL is the first point of contact for concerns, coordinates with external agencies, and ensures staff are trained." },
  { term: "Multi-Agency Working", slug: "multi-agency-working", definition: "Collaboration between different services and professionals (education, health, social care, police) to support young people with complex needs. Effective multi-agency working ensures coordinated support without duplication." },
  { term: "Children Looked After (CLA)", slug: "cla", definition: "Children in the care of the local authority, either under a care order or accommodated with parental agreement. CLA have additional educational entitlements and support, including a Virtual School Head and Personal Education Plan." },
  { term: "Personal Education Plan (PEP)", slug: "pep", definition: "A plan required for all Children Looked After that forms part of their overall care plan. The PEP identifies educational needs, sets targets, and outlines the support required to help the young person achieve." },
  { term: "Elective Home Education (EHE)", slug: "ehe", definition: "When parents choose to educate their child at home rather than sending them to school. Parents are responsible for providing a suitable full-time education but are not required to follow the national curriculum." },
  { term: "NEET (Not in Education, Employment or Training)", slug: "neet", definition: "A classification for young people aged 16-24 who are not engaged in any form of education, employment, or training. Reducing NEET rates is a key outcome measure for Alternative Provision." },
]

export default function Glossary() {
  return (
    <Layout>
      <main className="min-h-screen bg-background">
              <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Knowledge Hub", to: "/knowledge-hub" },
                { label: "Glossary" }
              ]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Alternative Provision Glossary</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Clear definitions of key terms and concepts used in Alternative Provision — a quick reference guide for educators and families.
            </p>
          </div>
        </div>
      </header>


        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-3xl mx-auto space-y-6">
            {terms.map((item) => (
              <article
                key={item.slug}
                id={item.slug}
                className="p-6 bg-card rounded-xl border border-border scroll-mt-24"
              >
                <h2 className="text-xl font-bold text-foreground mb-2">{item.term}</h2>
                <p className="text-muted-foreground leading-relaxed">{item.definition}</p>
              </article>
            ))}
          </div>

          <section className="mt-14 rounded-2xl border border-border bg-card p-8 md:p-10 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Explore More Resources</h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
              Dive deeper into Alternative Provision with our comprehensive guides and best practice
              resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/knowledge-hub/complete-guide">
                  Read the Complete Guide
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/knowledge-hub">Back to Knowledge Hub</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}
