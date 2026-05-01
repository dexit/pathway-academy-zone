import { Link, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, FileText, LayoutGrid } from "lucide-react";
import { Seo, SITE_URL } from "@/components/Seo";
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
            <h1 className="text-2xl font-bold mb-3 text-foreground">Category not found</h1>
            <Button asChild variant="link">
              <Link to="/knowledge-hub">Back to Knowledge Hub</Link>
            </Button>
          </div>
        </main>
      </Layout>
    );
  }

  const otherCategories = HUB_SECTIONS.filter((s) => s.id !== categoryId).map((s) => ({
    label: s.title,
    href: `/knowledge-hub/${s.id}`,
    description: `Explore ${s.title.toLowerCase()}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${section.title} - Knowledge Hub`,
    "description": section.description,
    "url": `${SITE_URL}/knowledge-hub/${section.id}`,
    "hasPart": section.resources.map(r => ({
      "@type": "Article",
      "headline": r.title,
      "url": `${SITE_URL}${r.href}`
    }))
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
        <div className="flex items-center gap-2 mb-6">
          <LayoutGrid className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Resources in this section</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.resources.map((resource) => (
            <Link
              key={resource.href}
              to={resource.href}
              className="group flex flex-col p-8 bg-card rounded-[2rem] border border-border/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileText className="w-16 h-16" />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                <BookOpen className="w-7 h-7" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Detailed resource covering key aspects of {resource.title.toLowerCase()} in Alternative Provision. Expert insights for professionals and families.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/50">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> 5 min read
                </span>
                <span className="flex items-center gap-1 text-sm font-bold text-primary group-hover:translate-x-1 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Questions about {section.title.toLowerCase()}?</h2>
          <p className="text-muted-foreground text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Our experts can help you navigate the complexities of Alternative Provision and find the right solutions for your learners. Contact us for a consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" className="rounded-full shadow-lg shadow-primary/20 h-16 px-10 font-bold">
              <Link to="/contact">Speak with an Expert</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full bg-background backdrop-blur-sm h-16 px-10 font-bold">
              <Link to="/knowledge-hub">Explore All Topics</Link>
            </Button>
          </div>
        </div>
      </ArchiveLayout>
    </>
  );
}
