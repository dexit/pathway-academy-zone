import { useState } from "react"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogFilterBar } from "@/components/blog/blog-filter-bar"
import { BLOG_POSTS, CATEGORIES } from "@/components/blog/blog-data"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs } from "@/components/Seo"

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredPost = BLOG_POSTS.find((p) => p.featured)
  const regularPosts = BLOG_POSTS.filter((p) => !p.featured)

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Pathway Academy Zone Blog",
    description: "Insights, guides, and updates on Alternative Provision, SEMH support, and best practice for educators and families in the UK.",
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      author: { "@type": "Organization", name: p.author },
      articleSection: p.category,
    })),
  }

  return (
    <Layout>
      <Seo
        title="Blog"
        description="Insights, guides, and updates on Alternative Provision, SEMH support, and best practice for educators and families in the UK."
        jsonLd={jsonLd}
      />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <header className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="max-w-2xl">
              <Breadcrumbs
                items={[{ label: "Blog" }]}
                className="text-primary-foreground/70 mb-5 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
              />
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
                Pathway Academy Zone
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Blog
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                Insights, guides, and updates on Alternative Provision, SEMH
                support, and best practice for educators and families in the UK.
              </p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-16 space-y-12">
          {/* Featured post */}
          {featuredPost && (
            <section aria-label="Featured article">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">
                  Featured
                </h2>
              </div>
              <BlogHero post={featuredPost} />
            </section>
          )}

          {/* Filter & Search bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <BlogFilterBar
              categories={CATEGORIES}
              active={activeCategory}
              onChange={setActiveCategory}
            />

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground"
                aria-label="Search articles"
              />
            </div>
          </div>

          {/* Posts grid */}
          <section aria-label="Blog articles">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-base mb-4">
                  No articles found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveCategory("All")
                    setSearchQuery("")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </section>

          {/* Newsletter CTA */}
          <section className="rounded-2xl bg-primary text-primary-foreground px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
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

          {/* Back to site nav */}
          <div className="flex justify-center pb-4">
            <Link
              to="/"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
