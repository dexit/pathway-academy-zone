import { Link, useParams } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
import { ArrowLeft, ArrowRight, BookOpen, Clock, FileText, LayoutGrid } from "lucide-react";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { Seo } from "@/components/Seo";
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
=======
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data";
import { buildItemListJsonLd } from "@/lib/json-ld";
>>>>>>> origin/main
=======
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data";
import { buildItemListJsonLd } from "@/lib/json-ld";
>>>>>>> origin/main

export default function KnowledgeHubCategory() {
  const { categoryId } = useParams();
  const section = HUB_SECTIONS.find((s) => s.id === categoryId);

  if (!section) {
    return (
<<<<<<< HEAD
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
=======
      <Layout>
        <Seo title="Category not found" noIndex />
        <main className="min-h-screen bg-background flex items-center justify-center py-24">
          <div className="text-center max-w-md px-4">
            <h1 className="text-2xl font-bold mb-3">Category not found</h1>
            <Link to="/knowledge-hub" className="text-primary hover:underline font-semibold">
              Back to Knowledge Hub
            </Link>
          </div>
        </main>
      </Layout>
>>>>>>> origin/main
    );
  }

  // Sibling categories used in the sidebar so users can hop sections.
  const siblings = HUB_SECTIONS.filter((s) => s.id !== section.id);

  const url = `${SITE_URL}/knowledge-hub/${section.id}`;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: section.title,
    description: section.description,
<<<<<<< HEAD
<<<<<<< HEAD
    mainEntity: {
      "@type": "ItemList",
      itemListElement: section.resources.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.title,
        url: `https://pathwayacademyzone.co.uk${r.href}`,
      })),
    },
=======
=======
>>>>>>> origin/main
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Pathway Academy Zone Knowledge Hub",
      url: `${SITE_URL}/knowledge-hub`,
    },
    hasPart: section.resources.map((r) => ({
      "@type": "Article",
      name: r.title,
      url: `${SITE_URL}${r.href}`,
    })),
>>>>>>> origin/main
  };
  const itemListJsonLd = buildItemListJsonLd(section.resources, section.title);
  const Icon = section.icon;

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
            description: "Ready to refer a learner? Our team is here to support you.",
            href: "/referral",
            tone: "primary",
          },
          {
            label: "Complete Guide",
            description: "Read our definitive guide to Alternative Provision.",
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
        jsonLd={[collectionJsonLd, itemListJsonLd]}
      />

<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="group flex flex-col h-full bg-card rounded-[2rem] border border-border/50 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20 transition-all duration-500 active:scale-[0.98]"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                        <FileText className="h-7 w-7" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
                            <Clock className="h-3 w-3" />
                            5 Min Read
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 font-medium">Expert Insights</span>
                    </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {resource.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-10 flex-grow">
                    Deep dive into {resource.title.toLowerCase()}. Explore legislation, practical applications, and best practice models curated by Alternative Provision specialists.
                </p>

                <div className="pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
                    <span className="text-primary font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        Read Full Guide <ArrowRight className="h-4 w-4" />
                    </span>
                    <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
=======
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Knowledge Hub", to: "/knowledge-hub" },
                { label: section.title },
              ]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4">
              <Icon className="w-3.5 h-3.5" />
              Knowledge Hub
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {section.title}
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-2xl">
              {section.description}
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start">
          <div className="min-w-0 space-y-10">
            {/* Resource cards */}
            <section aria-labelledby="resources-heading">
              <div className="flex items-baseline justify-between mb-5">
                <h2
                  id="resources-heading"
                  className="font-display text-xl font-bold text-foreground"
                >
                  All resources in this category
                </h2>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {section.resources.length} article{section.resources.length === 1 ? "" : "s"}
                </span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {section.resources.map((resource, i) => (
                  <li key={resource.href}>
                    <Link
                      to={resource.href}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <FileText className="w-4 h-4" />
                        </span>
                        <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-foreground text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        Practical guidance from the {section.title.toLowerCase()} collection.
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Other categories */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-display text-lg font-bold text-foreground mb-4">
                Browse other categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {siblings.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <Link
                      key={s.id}
                      to={`/knowledge-hub/${s.id}`}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/40 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <SIcon className="w-4 h-4" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                          {s.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {s.resources.length} articles
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={section.resources.map((r) => ({
              id: r.href.split("/").pop() || r.title,
              label: r.title,
              level: 2,
            }))}
            ctas={[
              {
                label: "The Complete Guide",
                description: "15-min source-of-truth article",
                href: "/knowledge-hub/complete-guide",
                tone: "primary",
              },
              {
                label: "Make a Referral",
                description: "Refer a young person",
                href: "/referral",
              },
            ]}
            quickContact={{
              phone: "01782 365365",
              email: "info@pathwayacademyzone.co.uk",
            }}
          >
            <div className="rounded-2xl border border-border bg-accent/40 p-5">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <p className="font-display font-semibold text-foreground text-sm">
                  Looking for definitions?
                </p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Browse our A–Z of Alternative Provision and SEMH terminology.
              </p>
              <Link
                to="/knowledge-hub/glossary"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Open glossary →
              </Link>
            </div>
          </ContentSidebar>
        </div>
>>>>>>> origin/main
      </div>

      <div className="mt-16 p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center shadow-xl border border-border/50 group-hover:rotate-12 transition-transform duration-500">
            <LayoutGrid className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-display text-2xl font-bold text-foreground mb-1">Need more resources?</h4>
            <p className="text-muted-foreground">Browse all specialized categories in our Knowledge Hub.</p>
          </div>
        </div>
        <Button asChild size="lg" variant="outline" className="rounded-full px-10 font-bold h-14 relative z-10 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg shadow-primary/5">
          <Link to="/knowledge-hub">
            View All Categories
          </Link>
        </Button>
      </div>
    </ArchiveLayout>
  );
}
