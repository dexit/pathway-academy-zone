import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
<<<<<<< HEAD
import { Seo, SITE_URL } from "@/components/Seo";
=======
import { Seo } from "@/components/Seo";
import { buildSearchPageSchema, WEBSITE_SCHEMA } from "@/lib/json-ld";
>>>>>>> origin/main
import { searchAll, type SearchItem } from "@/lib/search-index";
import { Button } from "@/components/ui/button";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { FilterPills } from "@/components/FilterPills";
import { ArchivePagination } from "@/components/ArchivePagination";

const TYPES: Array<SearchItem["type"] | "All"> = [
  "All",
  "Page",
  "Guide",
  "Blog",
  "Policy",
  "News",
  "FAQ",
];

const PAGE_SIZE = 8;

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [draft, setDraft] = useState(q);
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [page, setPage] = useState(1);

  const results = useMemo(() => searchAll(q), [q]);
  const filtered =
    type === "All" ? results : results.filter((r) => r.type === type);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: results.length };
    for (const r of results) map[r.type] = (map[r.type] || 0) + 1;
    return map;
  }, [results]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const visibleTypes = TYPES.filter(
    (t) => t === "All" || (counts[t as string] ?? 0) > 0
  ) as string[];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setParams(draft ? { q: draft } : {});
    setPage(1);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": q ? `Search Results for "${q}"` : "Search",
    "description": `Search results for query "${q}" on Pathway Academy Zone.`,
    "url": `${SITE_URL}/search${q ? `?q=${encodeURIComponent(q)}` : ""}`
  };

  return (
    <>
      <Seo
        title={q ? `Search: ${q}` : "Search"}
        description={
          q
            ? `Search results for "${q}" across guides, blog, policies, and pages.`
            : "Search the Pathway Academy Zone website for guides, blog articles, policies, and more."
        }
        noIndex
<<<<<<< HEAD
        jsonLd={jsonLd}
=======
        jsonLd={[WEBSITE_SCHEMA, buildSearchPageSchema(q)]}
>>>>>>> origin/main
      />
      <ArchiveLayout
        crumbs={[{ label: "Search" }]}
        title="Search"
        intro="Search across all guides, blog articles, news, policies, and pages."
        sidebar={{
          ctas: [
            {
              label: "Knowledge Hub",
              href: "/knowledge-hub",
              description: "Browse the full library of guides.",
              tone: "primary",
            },
            {
              label: "FAQs",
              href: "/faqs",
              description: "Quick answers to common questions.",
            },
            {
              label: "Make a Referral",
              href: "/referral",
              description: "Start the placement process.",
            },
          ],
          quickContact: {
            phone: "01782 365365",
            email: "info@pathwayacademyzone.co.uk",
          },
        }}
      >
        <form onSubmit={submit} className="relative mb-10">
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search guides, blog, policies..."
            aria-label="Search query"
            className="w-full h-16 pl-14 pr-36 rounded-full bg-card border border-border text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
          <Button
            type="submit"
            size="lg"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 px-8 font-bold"
          >
            Search
          </Button>
        </form>

        {q ? (
<<<<<<< HEAD
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found <span className="text-foreground font-bold">{results.length}</span> {results.length === 1 ? "result" : "results"} for{" "}
                <span className="text-primary font-bold">
=======
          <>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-muted-foreground">
                {results.length} {results.length === 1 ? "result" : "results"} for{" "}
                <span className="text-foreground font-semibold">
>>>>>>> origin/main
                  &quot;{q}&quot;
                </span>
              </p>
            </div>

            {results.length > 0 && (
              <FilterPills
                options={visibleTypes}
                active={type}
                onChange={(t) => {
                  setType(t as (typeof TYPES)[number]);
                  setPage(1);
                }}
                counts={counts}
                ariaLabel="Filter search results by type"
              />
            )}

            {paginated.length > 0 ? (
              <ul className="space-y-4">
                {paginated.map((r) => (
                  <li
                    key={`${r.type}-${r.url}-${r.title}`}
                    className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all group"
                  >
                    <Link
                      to={r.url}
                      title={r.title}
                      className="block"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary">
                          {r.type}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground truncate uppercase tracking-widest">
                          {r.url}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {r.title}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {r.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-24 bg-card rounded-[3rem] border border-dashed border-border/50">
                <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-6 opacity-20" />
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  No results found
                </h2>
                <p className="text-muted-foreground mb-10 max-w-sm mx-auto">
                  Try different keywords, check for typos, or browse the
                  Knowledge Hub for related guides.
                </p>
                <Button asChild size="xl" className="rounded-full font-bold px-10">
                  <Link to="/knowledge-hub">Browse Knowledge Hub</Link>
                </Button>
              </div>
            )}

            <ArchivePagination
              page={currentPage}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground italic">
            Enter a search term above to begin exploring our resources.
          </div>
        )}
      </ArchiveLayout>
    </>
  );
}
