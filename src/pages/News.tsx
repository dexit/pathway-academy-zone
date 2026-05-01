import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Seo, SITE_URL } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { FilterPills } from "@/components/FilterPills";
import { ArchivePagination } from "@/components/ArchivePagination";
import { NEWS_ITEMS } from "@/data/news-data";

const ALL = "All";
const PAGE_SIZE = 4;

export default function News() {
  const [activeTag, setActiveTag] = useState<string>(ALL);
  const [page, setPage] = useState(1);

  const tags = [ALL, ...Array.from(new Set(NEWS_ITEMS.map((n) => n.tag)))];

  const filtered = useMemo(
    () =>
      activeTag === ALL
        ? NEWS_ITEMS
        : NEWS_ITEMS.filter((n) => n.tag === activeTag),
    [activeTag]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "News & Announcements - Pathway Academy Zone",
    "description": "Latest news, policy updates, partnerships, and announcements from Pathway Academy Zone.",
    "url": `${SITE_URL}/news`,
    "hasPart": NEWS_ITEMS.map((n) => ({
      "@type": "NewsArticle",
      "headline": n.title,
      "datePublished": n.iso,
      "description": n.summary,
      "url": `${SITE_URL}/news/${n.slug}`,
      "publisher": {
        "@type": "Organization",
        "name": "Pathway Academy Zone",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png"
        }
      },
    })),
  };

  return (
    <>
      <Seo
        title="News & Announcements"
        description="Latest news, policy updates, partnerships, and announcements from Pathway Academy Zone."
        jsonLd={jsonLd}
      />
      <ArchiveLayout
        crumbs={[{ label: "News" }]}
        title="News & Announcements"
        intro="Stay informed about policy updates, strategic partnerships, safeguarding notices, and life at Pathway Academy Zone."
        sidebar={{
          ctas: [
            {
              label: "Make a Referral",
              href: "/referral",
              description: "Start the placement process for a young person.",
              tone: "primary",
            },
            {
              label: "Read our Blog",
              href: "/blog",
              description: "In-depth articles on AP, SEMH and best practice.",
            },
            {
              label: "Knowledge Hub",
              href: "/knowledge-hub",
              description: "Guides, comparisons and a complete AP reference.",
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
            options={tags}
            active={activeTag}
            onChange={(t) => {
              setActiveTag(t);
              setPage(1);
            }}
            ariaLabel="Filter news by tag"
          />
        </div>

        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-primary uppercase tracking-widest">Feed</span>
           <p className="text-xs text-muted-foreground">
             Showing <span className="font-bold text-foreground">{paginated.length}</span> of {filtered.length} announcements
           </p>
        </div>

        {paginated.length > 0 ? (
          <div className="space-y-6">
            {paginated.map((item) => (
              <article
                key={item.slug}
                className="bg-card border border-border/50 rounded-[2rem] p-8 md:p-10 hover:shadow-xl hover:shadow-primary/5 transition-all relative group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={item.iso}>{item.date}</time>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  <Link
                    to={`/news/${item.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {item.summary}
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-bold text-primary hover:no-underline group">
                  <Link
                    to={`/news/${item.slug}`}
                    aria-label={`Read full article: ${item.title}`}
                  >
                    Read full announcement <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-[3rem] border border-dashed border-border/50">
            <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-6 opacity-20" />
            <p className="text-muted-foreground text-sm mb-6">
              No news items match this filter.
            </p>
            <Button variant="outline" className="rounded-full font-bold" onClick={() => setActiveTag(ALL)}>
              Clear filter
            </Button>
          </div>
        )}

        <ArchivePagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />

        <div className="mt-8 rounded-[2.5rem] bg-muted/30 border border-border p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Looking for longer reads?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Blog and Knowledge Hub contain in-depth guides, case studies, and evidence-led articles.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button asChild variant="outline" size="lg" className="rounded-full font-bold px-8">
              <Link to="/blog">Our Blog</Link>
            </Button>
            <Button asChild size="lg" className="rounded-full font-bold px-8 shadow-lg shadow-primary/10">
              <Link to="/knowledge-hub">
                Knowledge Hub <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ArchiveLayout>
    </>
  );
}
