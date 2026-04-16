import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Layout from "@/components/Layout"
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data"

export default function KnowledgeHubCategory() {
  const { categoryId } = useParams()
  const section = HUB_SECTIONS.find(s => s.id === categoryId)

  if (!section) return null

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
                {section.title}
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                {section.description}
              </p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {section.resources.map((resource) => (
              <Link
                key={resource.href}
                to={resource.href}
                className="flex items-center justify-between p-6 bg-card rounded-xl border border-border hover:shadow-md transition-shadow group"
              >
                <span className="font-semibold">{resource.title}</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}
