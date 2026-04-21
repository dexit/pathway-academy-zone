import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { BLOG_POSTS, CATEGORIES } from "@/config/data/blog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
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
    name: "Pathway Academy Zone Blog",
    description:
      "Insights, guides, and updates on Alternative Provision, SEMH support, and best practice for educators and families in the UK.",
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `https://pathwayacademyzone.co.uk/blog/${p.slug}`,
      author: { "@type": "Organization", name: p.author },
      articleSection: p.category,
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
        intro="Insights, guides, and updates on Alternative Provision, SEMH support, and best practice for educators and families in the UK."
        beforeMain={
          featuredPost && (
            <section aria-label="Featured article">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">
                  Featured
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
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <FilterPills
            options={CATEGORIES}
            active={activeCategory}
            onChange={(c) => {
              setActiveCategory(c);
              setPage(1);
            }}
            ariaLabel="Filter posts by category"
          />

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground"
              aria-label="Search articles"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {paginated.length}
          </span>{" "}
          of {filteredPosts.length} articles
        </p>

        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {paginated.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-border bg-card">
            <p className="text-muted-foreground text-base mb-4">
              No articles found matching your criteria.
            </p>
            <Button
              variant="outline"
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

        <section className="rounded-2xl bg-primary text-primary-foreground px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-2">
              Stay up to date with AP news
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed">
              Get the latest articles, policy updates, and best-practice guides
              delivered directly to your inbox.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto flex-wrap">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 md:w-64 focus-visible:ring-accent"
              aria-label="Email address for newsletter"
            />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shrink-0">
              Subscribe
            </Button>
          </div>
        </section>

        <div className="flex justify-center pb-4">
          <Link
            to="/"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </ArchiveLayout>
    </>
  );
}
