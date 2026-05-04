import { Link, useParams } from "react-router-dom";
<<<<<<< HEAD
import { ArrowRight, BookOpen, Clock, FileText, LayoutGrid } from "lucide-react";
import { Seo, SITE_URL } from "@/components/Seo";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
=======
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";
import { ORG_REF, AREAS_SERVED, WEBSITE_SCHEMA } from "@/lib/json-ld";
import { ContentSidebar } from "@/components/ContentSidebar";
import { HUB_SECTIONS } from "@/components/knowledge-hub/hub-data";
import { buildItemListJsonLd } from "@/lib/json-ld";
>>>>>>> origin/main

export default function KnowledgeHubCategory() {
  const { categoryId } = useParams();
  const section = HUB_SECTIONS.find((s) => s.id === categoryId);

  if (!section) {
    return (
      <Layout>
        <Seo title="Category not found" noIndex />
        <main className="min-h-screen bg-background flex items-center justify-center py-24">
          <div className="text-center max-w-md px-4">
<<<<<<< HEAD
            <h1 className="text-2xl font-bold mb-3 text-foreground">Category not found</h1>
            <Button asChild variant="link">
              <Link to="/knowledge-hub">Back to Knowledge Hub</Link>
            </Button>
=======
            <h1 className="text-2xl font-bold mb-3">Category not found</h1>
            <Link to="/knowledge-hub" className="text-primary hover:underline font-semibold">
              Back to Knowledge Hub
            </Link>
>>>>>>> origin/main
          </div>
        </main>
      </Layout>
    );
  }

<<<<<<< HEAD
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
=======
  // Sibling categories used in the sidebar so users can hop sections.
  const siblings = HUB_SECTIONS.filter((s) => s.id !== section.id);

  const url = `${SITE_URL}/knowledge-hub/${section.id}`;
  const collectionJsonLd = {
    "@context":  "https://schema.org",
    "@type":     "CollectionPage",
    "@id":       url,
    name:        section.title,
    description: section.description,
    url,
    inLanguage:  "en-GB",
    about:       ORG_REF,
    publisher:   ORG_REF,
    spatialCoverage: AREAS_SERVED,
    isPartOf: {
      "@id": `${SITE_URL}/knowledge-hub`,
      "@type": "CollectionPage",
      name: "Pathway Academy Zone Knowledge Hub",
      url:  `${SITE_URL}/knowledge-hub`,
    },
    hasPart: section.resources.map((r) => ({
      "@type": "Article",
      name:    r.title,
      url:     `${SITE_URL}${r.href}`,
      about:   ORG_REF,
    })),
>>>>>>> origin/main
  };
  const itemListJsonLd = buildItemListJsonLd(section.resources, section.title);
  const Icon = section.icon;

  return (
    <>
      <Seo
        title={section.title}
        description={section.description}
        jsonLd={[WEBSITE_SCHEMA, collectionJsonLd, itemListJsonLd]}
      />

<<<<<<< HEAD
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
>>>>>>> origin/main
        </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
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
