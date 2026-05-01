import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";
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
    "headline": item.title,
    "datePublished": item.iso,
    "description": item.summary,
    "articleSection": item.tag,
    "url": `${SITE_URL}/news/${item.slug}`,
    "author": {
      "@type": "Organization",
      "name": "Pathway Academy Zone"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pathway Academy Zone",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png"
      }
    },
  };

  return (
    <Layout>
      <Seo title={item.title} description={item.summary} jsonLd={jsonLd} />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-24">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "News", to: "/news" },
                { label: item.title },
              ]}
              className="text-primary-foreground/70 mb-8 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.2em]">
                {item.tag}
              </span>
              <div className="h-px w-8 bg-primary-foreground/20" />
              <div className="flex items-center gap-2 text-primary-foreground/70 text-[11px] font-bold uppercase tracking-[0.2em]">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={item.iso}>{item.date}</time>
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight text-balance">
              {item.title}
            </h1>
            <p className="text-primary-foreground/80 text-xl md:text-2xl leading-relaxed max-w-3xl text-balance">
              {item.summary}
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-start">
          <article className="min-w-0 prose prose-lg md:prose-xl max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl">
            {item.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="not-prose flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 p-8 rounded-[2.5rem] border border-border bg-muted/30">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Navigation</p>
                <Button asChild variant="link" className="p-0 h-auto font-bold text-primary hover:no-underline group">
                  <Link to="/news" title="Back to all news">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Return to all news
                  </Link>
                </Button>
              </div>
              <Button asChild size="xl" className="rounded-full px-10 h-16 font-bold shadow-xl shadow-primary/20">
                <Link to="/contact" title="Contact us">
                  Contact Our Team <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {related.length > 0 && (
              <section className="not-prose mt-20">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-1 h-6 rounded-full bg-primary" />
                  <h2 className="font-display text-2xl font-bold text-foreground uppercase tracking-widest text-sm">
                    Related Announcements
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/news/${r.slug}`}
                      className="group block bg-card border border-border/50 rounded-3xl p-8 hover:shadow-xl hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {r.tag}
                        </span>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {r.date}
                        </p>
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {r.summary}
                      </p>
                    </Link>
                  ))}
                </div>
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
          >
             <div className="rounded-2xl border border-border bg-card p-6 mt-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Share this</p>
                <div className="flex gap-2">
                   <Button size="icon" variant="outline" className="rounded-full" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}>
                      <Share2 className="h-4 w-4" />
                   </Button>
                </div>
             </div>
          </ContentSidebar>
        </div>
      </div>
    </Layout>
  );
}
