import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Layout from "@/components/Layout"

const terms = [
  { term: "Alternative Provision (AP)", definition: "Education arranged by local authorities or schools for pupils who, because of exclusion, illness or other reasons, would not otherwise receive suitable education in a mainstream school." },
  { term: "SEMH", definition: "Social, Emotional and Mental Health. This refers to the needs of children and young people who have difficulties with their emotional and social development, which can impact their mental health and behaviour." },
  { term: "EHCP", definition: "Education, Health and Care Plan. A legal document that describes a child or young person's special educational, health and social care needs, the support they need, and the outcomes they should achieve." },
  { term: "Trauma-Informed", definition: "An approach that recognizes the widespread impact of trauma and understands potential paths for recovery; recognizes the signs and symptoms of trauma in clients, families, staff, and others involved with the system; and responds by fully integrating knowledge about trauma into policies, procedures, and practices." },
  { term: "Managed Move", definition: "A voluntary agreement between two schools, a child, and their parents, allowing the child to transfer to another school to have a fresh start in a new environment." },
]

export default function Glossary() {
  return (
    <Layout>
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="max-w-3xl">
              <Link to="/knowledge-hub" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Knowledge Hub
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Glossary
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                A guide to the key terms and concepts in Alternative Provision and specialist education.
              </p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            {terms.map((item) => (
              <div key={item.term} id={item.term.toLowerCase().replace(/\s+/g, '-')} className="p-6 bg-card rounded-xl border border-border">
                <h2 className="text-xl font-bold text-foreground mb-2">{item.term}</h2>
                <p className="text-muted-foreground leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}
