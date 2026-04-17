import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data";

export default function KnowledgeHubCategory() {
  const { categoryId } = useParams();
  const section = HUB_SECTIONS.find((s) => s.id === categoryId);

  if (!section) {
    return (
      <Layout>
        <Seo title="Category not found" noIndex />
        <main className="min-h-screen bg-background flex items-center justify-center py-24">
          <div className="text-center max-w-md px-4">
            <h1 className="text-2xl font-bold mb-3">Category not found</h1>
            <Link
              to="/knowledge-hub"
              className="text-primary hover:underline font-semibold"
            >
              Back to Knowledge Hub
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: section.title,
    description: section.description,
    hasPart: section.resources.map((r) => ({
      "@type": "Article",
      name: r.title,
      url: `https://pathwayacademyzone.co.uk${r.href}`,
    })),
  };

  return (
    <Layout>
      <Seo
        title={section.title}
        description={section.description}
        jsonLd={jsonLd}
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Knowledge Hub", to: "/knowledge-hub" },
              { label: section.title },
            ]}
            className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {section.title}
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-3xl">
            {section.description}
          </p>
          <Link
            to="/knowledge-hub"
            className="inline-flex items-center gap-2 my-6 text-primary-foreground/70 hover:text-primary-foreground mb-5 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Knowledge Hub
          </Link>
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
              <span className="font-semibold text-foreground pr-4">
                {resource.title}
              </span>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
