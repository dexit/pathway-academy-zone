import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { BLOG_POSTS } from "@/config/data/blog";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Build a simple TOC from the post body sections so the sidebar feels alive.
  const toc = [
    { id: "introduction", label: "Introduction", level: 2 as const },
    { id: "key-points", label: "Key points", level: 2 as const },
    { id: "what-this-means", label: "What this means in practice", level: 2 as const },
    { id: "next-steps", label: "Next steps", level: 2 as const },
  ];

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    articleSection: post.category,
    image: post.image,
    publisher: {
      "@type": "Organization",
      name: "Pathway Academy Zone",
    },
  };

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt}
        jsonLd={jsonLd}
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Blog", to: "/blog" },
                { label: post.title },
              ]}
              className="text-primary-foreground/70 mb-5 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90 border-0 text-xs font-semibold tracking-wide uppercase">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-primary-foreground/70 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          {/* Article body */}
          <article className="min-w-0 prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl border border-border not-prose mb-8"
            />

            <h2 id="introduction">Introduction</h2>
            <p>{post.excerpt}</p>
            <p>
              At Pathway Academy Zone we work every day with young people in
              Stoke-on-Trent and across Staffordshire whose education has been
              disrupted. The themes covered in this article reflect the
              questions we hear most often from schools, Local Authorities and
              families.
            </p>

            <h2 id="key-points">Key points</h2>
            <ul>
              <li>Definitions and the legal basis for {post.category}.</li>
              <li>How this looks in practice in an Alternative Provision setting.</li>
              <li>What good looks like for learners, families and commissioners.</li>
              <li>Practical next steps for anyone considering a referral.</li>
            </ul>

            <h2 id="what-this-means">What this means in practice</h2>
            <p>
              Each learner who joins us receives a personalised plan agreed
              with their commissioning school and family. The plan covers
              attendance, academic targets, pastoral priorities, and the
              progression route we are working towards together &mdash; whether
              that is a managed return to mainstream, a sustained AP placement,
              or a planned transition to post-16 study or training.
            </p>
            <p>
              Our team includes qualified teachers, trained mentors and
              pastoral specialists. We hold the relational space young people
              need to re-engage, while keeping the academic thread intact.
            </p>

            <h2 id="next-steps">Next steps</h2>
            <p>
              If this article has raised questions about a specific young
              person, please get in touch. We welcome conversations from
              schools, Local Authorities, social workers, parents and carers.
              You can{" "}
              <Link to="/referral">start a formal referral</Link>, browse our{" "}
              <Link to="/knowledge-hub">Knowledge Hub</Link>, or{" "}
              <Link to="/contact">contact our team</Link> directly.
            </p>

            <div className="not-prose flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 p-6 rounded-2xl border border-border bg-muted/40">
              <Button asChild variant="ghost">
                <Link to="/blog" title="Back to all articles">
                  <ArrowLeft className="mr-1 h-4 w-4" /> All articles
                </Link>
              </Button>
              <Button asChild>
                <Link to="/referral" title="Start a referral">
                  Make a Referral <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {related.length > 0 && (
              <section className="not-prose mt-14">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Related articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {related.map((r) => (
                    <BlogCard key={r.slug} post={r} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Make a Referral",
                href: "/referral",
                description:
                  "Begin the placement process for a young person.",
                tone: "primary",
              },
              {
                label: "Knowledge Hub",
                href: "/knowledge-hub",
                description: "Long-form guides on Alternative Provision.",
              },
              {
                label: "All Blog Articles",
                href: "/blog",
                description: "Browse the full archive.",
              },
            ]}
            quickContact={{
              phone: "01782 365365",
              email: "info@pathwayacademyzone.co.uk",
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
