import { Link, useParams } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Seo } from "@/components/Seo";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

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

  const otherCategories = HUB_SECTIONS.filter((s) => s.id !== categoryId).map((s) => ({
    label: s.title,
    href: `/knowledge-hub/${s.id}`,
    description: `Browse ${s.title.toLowerCase()} resources`,
  }));

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
    <>
      <Seo
        title={section.title}
        description={section.description}
        jsonLd={jsonLd}
      />

      <ArchiveLayout
        crumbs={[
          { label: "Knowledge Hub", to: "/knowledge-hub" },
          { label: section.title },
        ]}
        title={section.title}
        intro={section.description}
        sidebar={{
          ctas: [
            ...otherCategories,
            {
              label: "Complete Guide",
              href: "/knowledge-hub/complete-guide",
              description: "Read our full guide to Alternative Provision",
              tone: "primary",
            },
          ],
          quickContact: {
            phone: "01782 365365",
            email: "info@pathwayacademyzone.co.uk",
          },
        }}
      >
        <div className="grid grid-cols-1 gap-4">
          {section.resources.map((resource) => (
            <Link
              key={resource.href}
              to={resource.href}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/40 hover:shadow-md transition-all gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Click to read full article
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read Guide <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-muted/40 border border-border/50 text-center">
          <h2 className="text-xl font-bold text-foreground mb-3">Looking for something else?</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Our Knowledge Hub is constantly being updated with new resources, case studies, and regulatory guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline">
              <Link to="/knowledge-hub">Browse All Hub</Link>
            </Button>
            <Button asChild>
              <Link to="/contact">Request a Resource</Link>
            </Button>
          </div>
        </div>
      </ArchiveLayout>
    </>
  );
}
