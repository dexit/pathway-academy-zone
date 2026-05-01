import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { BLOG_POSTS, CATEGORIES } from "@/components/blog/blog-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Seo, SITE_URL } from "@/components/Seo";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { FilterPills } from "@/components/FilterPills";
import { ArchivePagination } from "@/components/ArchivePagination";

const PAGE_SIZE = 6;

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const regularPosts = BLOG_POSTS.filter((p) => !p.featured);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return regularPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [regularPosts, activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Pathway Academy Zone Blog",
    "description": "Insights, guides, and updates on Alternative Provision, SEMH support, and best practice for educators and families in the UK.",
    "url": `${SITE_URL}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Pathway Academy Zone",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png"
      }
    },
    "blogPost": BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "description": p.excerpt,
      "datePublished": p.date,
      "url": `${SITE_URL}/blog/${p.slug}`,
      "author": { "@type": "Organization", "name": p.author },
      "articleSection": p.category,
    })),
  };

  return (
    <>
      <Seo
        title="Blog"
        description="Insights, guides, and updates on Alternative Provision, SEMH support, and best practice for educators and families in the UK."
        jsonLd={jsonLd}
      />
      <ArchiveLayout
        crumbs={[{ label: "Blog" }]}
        title="Blog"
        intro="Expert insights and the latest updates on Alternative Provision, SEMH support, and educational best practice."
        beforeMain={
          featuredPost && (
            <section aria-label="Featured article" className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 rounded-full bg-accent" />
                <h2 className="text-xs font-bold text-muted-foreground tracking-[0.2em] uppercase">
                  Featured Article
                </h2>
              </div>
              <BlogHero post={featuredPost} />
            </section>
          )
        }
        sidebar={{
          ctas: [
            {
              label: "Make a Referral",
              href: "/referral",
              description: "Start the placement process for a young person.",
              tone: "primary",
            },
            {
              label: "Knowledge Hub",
              href: "/knowledge-hub",
              description: "Guides, comparisons and a complete AP reference.",
            },
            {
              label: "News & Announcements",
              href: "/news",
              description: "Latest updates from Pathway Academy Zone.",
            },
          ],
          quickContact: {
            phone: "01782 365365",
            email: "info@pathwayacademyzone.co.uk",
          },
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between border-b border-border pb-8">
          <FilterPills
            options={CATEGORIES}
            active={activeCategory}
            onChange={(c) => {
              setActiveCategory(c);
              setPage(1);
            }}
            ariaLabel="Filter posts by category"
          />

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-11 h-12 bg-card border-border rounded-full shadow-sm focus-visible:ring-primary/20"
              aria-label="Search articles"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-primary uppercase tracking-widest">Archive</span>
           <p className="text-xs text-muted-foreground">
             Showing <span className="font-bold text-foreground">{paginated.length}</span> of {filteredPosts.length} articles
           </p>
        </div>

        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {paginated.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-[3rem] border border-dashed border-border/50">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h3 className="text-xl font-bold text-foreground mb-4">No articles found</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-8">Try adjusting your search or category filters to find what you're looking for.</p>
            <Button
              variant="outline"
              className="rounded-full font-bold"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <ArchivePagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />

        <section className="rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 mt-12 relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="max-w-xl relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Stay Informed
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed text-lg text-balance">
              Get the latest articles, policy updates, and best-practice guides
              delivered directly to your inbox.
            </p>
          </div>
          <div className="flex gap-4 w-full lg:w-auto flex-wrap sm:flex-nowrap relative z-10">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-14 rounded-full px-6 md:w-80 focus-visible:ring-accent"
              aria-label="Email address for newsletter"
            />
            <Button className="bg-white text-primary hover:bg-white/90 font-bold h-14 px-8 rounded-full shadow-lg">
              Subscribe
            </Button>
          </div>
        </section>

        <div className="flex justify-center pt-8 border-t border-border">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground font-bold uppercase tracking-widest text-[10px]">
            <Link to="/">
              ← Back to Home Page
            </Link>
          </Button>
        </div>
      </ArchiveLayout>
    </>
  );
}
