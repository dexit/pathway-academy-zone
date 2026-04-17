import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";
import { Button } from "@/components/ui/button";
import { NEWS_ITEMS } from "@/data/news-data";

export default function NewsDetail() {
  const { slug } = useParams();
  const item = NEWS_ITEMS.find((n) => n.slug === slug);

  if (!item) {
    return <Navigate to="/news" replace />;
  }

  const related = NEWS_ITEMS.filter(
    (n) => n.slug !== item.slug && n.tag === item.tag
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.iso,
    description: item.summary,
    articleSection: item.tag,
    publisher: { "@type": "Organization", name: "Pathway Academy Zone" },
  };

  return (
    <Layout>
      <Seo title={item.title} description={item.summary} jsonLd={jsonLd} />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "News", to: "/news" },
                { label: item.title },
              ]}
              className="text-primary-foreground/70 mb-5 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <span className="inline-block px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[11px] font-semibold uppercase tracking-wider mb-4">
              {item.tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {item.title}
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-5">
              {item.summary}
            </p>
            <p className="inline-flex items-center gap-2 text-primary-foreground/70 text-sm">
              <Calendar className="h-4 w-4" />
              <time dateTime={item.iso}>{item.date}</time>
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          <article className="min-w-0 prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
            {item.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="not-prose flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 p-6 rounded-2xl border border-border bg-muted/40">
              <Button asChild variant="ghost">
                <Link to="/news" title="Back to all news">
                  <ArrowLeft className="mr-1 h-4 w-4" /> All news
                </Link>
              </Button>
              <Button asChild>
                <Link to="/contact" title="Contact us">
                  Contact Us <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {related.length > 0 && (
              <section className="not-prose mt-14">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Related news
                </h2>
                <ul className="space-y-4">
                  {related.map((r) => (
                    <li
                      key={r.slug}
                      className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <p className="text-xs text-muted-foreground mb-1">
                        <time dateTime={r.iso}>{r.date}</time> · {r.tag}
                      </p>
                      <Link
                        to={`/news/${r.slug}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                        title={r.title}
                      >
                        {r.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {r.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <ContentSidebar
            ctas={[
              {
                label: "Make a Referral",
                href: "/referral",
                description: "Start the placement process for a young person.",
                tone: "primary",
              },
              {
                label: "All News",
                href: "/news",
                description: "Browse the full news archive.",
              },
              {
                label: "Read our Blog",
                href: "/blog",
                description: "In-depth articles on AP and SEMH.",
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
