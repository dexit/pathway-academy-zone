import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Layout from "@/components/Layout"

export default function KnowledgeHubDetail() {
  const { category, slug } = useParams()

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
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 capitalize">
                {slug?.replace(/-/g, ' ') || category?.replace(/-/g, ' ')}
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                Detailed resource and information guide from Pathway Academy Zone.
              </p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-3xl mx-auto prose prose-green prose-lg">
             <p>This is a detailed guide page for <strong>{slug || category}</strong>.</p>
             <p>Pathway Academy Zone provides specialist Alternative Provision education for young people in Staffordshire. Our trauma-informed approach, SEMH support, and personalised learning pathways ensure every young person has a pathway to success.</p>
             <h2>Overview</h2>
             <p>Alternative Provision (AP) is education outside of school that is arranged by local authorities or schools for pupils who, because of exclusion, illness or other reasons, would not otherwise receive suitable education.</p>
             <p>At Pathway Academy Zone, we offer a structured and supportive environment where students can re-engage with learning and develop the skills they need for their future.</p>
             <h3>Key Features</h3>
             <ul>
                <li>SEMH-focused curriculum</li>
                <li>Small group sizes</li>
                <li>Qualified and experienced staff</li>
                <li>Personalised learning plans</li>
             </ul>
          </div>
        </div>
      </main>
    </Layout>
  )
}
