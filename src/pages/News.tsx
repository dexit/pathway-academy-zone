import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { FilterPills } from "@/components/FilterPills";
import { ArchivePagination } from "@/components/ArchivePagination";
import { NEWS_ITEMS } from "@/config/data/news";

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
    name: "News - Pathway Academy Zone",
    hasPart: NEWS_ITEMS.map((n) => ({
      "@type": "NewsArticle",
      headline: n.title,
      datePublished: n.iso,
      description: n.summary,
      url: `https://pathwayacademyzone.co.uk/news/${n.slug}`,
      publisher: { "@type": "Organization", name: "Pathway Academy Zone" },
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
        intro="Policy updates, partnership news, safeguarding notices, and life at Pathway Academy Zone."
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
        <FilterPills
          options={tags}
          active={activeTag}
          onChange={(t) => {
            setActiveTag(t);
            setPage(1);
          }}
          ariaLabel="Filter news by tag"
        />

        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {paginated.length}
          </span>{" "}
          of {filtered.length} articles
        </p>

        {paginated.length > 0 ? (
          <ul className="space-y-5">
            {paginated.map((item) => (
              <li
                key={item.slug}
                className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={item.iso}>{item.date}</time>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  <Link
                    to={`/news/${item.slug}`}
                    title={item.title}
                    className="hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
                <Link
                  to={`/news/${item.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-primary text-sm font-semibold hover:gap-2 transition-all"
                  aria-label={`Read full article: ${item.title}`}
                >
                  Read full article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-border bg-card">
            <p className="text-muted-foreground text-base mb-4">
              No news items match this filter.
            </p>
            <Button variant="outline" onClick={() => setActiveTag(ALL)}>
              Clear filter
            </Button>
          </div>
        )}

        <ArchivePagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />

        <div className="mt-4 rounded-2xl bg-accent/20 border border-border p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              Looking for longer reads?
            </h2>
            <p className="text-muted-foreground">
              Our Blog and Knowledge Hub contain in-depth guides and articles.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button asChild variant="outline">
              <Link to="/blog">Blog</Link>
            </Button>
            <Button asChild>
              <Link to="/knowledge-hub">
                Knowledge Hub <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ArchiveLayout>
    </>
  );
}
