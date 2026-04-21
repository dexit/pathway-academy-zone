import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock, FileText, LayoutGrid } from "lucide-react";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { Seo } from "@/components/Seo";
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function KnowledgeHubCategory() {
  const { categoryId } = useParams();
  const section = HUB_SECTIONS.find((s) => s.id === categoryId);

  if (!section) {
    return (
      <ArchiveLayout
        title="Category not found"
        crumbs={[{ label: "Knowledge Hub", to: "/knowledge-hub" }, { label: "Not Found" }]}
      >
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-6">The category you are looking for doesn't exist.</p>
          <Link to="/knowledge-hub" className="text-primary font-bold hover:underline">
            Return to Knowledge Hub
          </Link>
        </div>
      </ArchiveLayout>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: section.title,
    description: section.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: section.resources.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.title,
        url: `https://pathwayacademyzone.co.uk${r.href}`,
      })),
    },
  };

  return (
    <ArchiveLayout
      title={section.title}
      intro={section.description}
      eyebrow="Knowledge Hub"
      crumbs={[
        { label: "Knowledge Hub", to: "/knowledge-hub" },
        { label: section.title },
      ]}
      sidebar={{
        ctas: [
          {
            label: "Referral Form",
            description: "Ready to refer a learner?",
            href: "/referral",
            tone: "primary",
          },
          {
            label: "Complete Guide",
            description: "Read our comprehensive guide to AP.",
            href: "/knowledge-hub/complete-guide",
          },
        ],
        quickContact: {
          phone: "01782 365365",
          email: "info@pathwayacademyzone.co.uk",
        },
      }}
    >
      <Seo
        title={`${section.title} - Knowledge Hub`}
        description={section.description}
        jsonLd={jsonLd}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.resources.map((resource, i) => (
          <motion.div
            key={resource.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Link
              to={resource.href}
              className="group flex flex-col h-full p-8 bg-card rounded-3xl border border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary transition-colors">
                  <Clock className="h-3 w-3" />
                  <span>5 Min Read</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                {resource.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                Explore key insights, best practices, and detailed information about {resource.title.toLowerCase()} in our expert-written guide.
              </p>

              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                Read Guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-3xl bg-muted/30 border border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-border/50">
            <LayoutGrid className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">Need more resources?</h4>
            <p className="text-sm text-muted-foreground">Browse all categories in our Knowledge Hub.</p>
          </div>
        </div>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link to="/knowledge-hub">
            View All Categories
          </Link>
        </Button>
      </div>
    </ArchiveLayout>
  );
}
