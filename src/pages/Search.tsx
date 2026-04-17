import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
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
        <form onSubmit={submit} className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search guides, blog, policies..."
            aria-label="Search query"
            className="w-full h-14 pl-12 pr-32 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
          >
            Search
          </Button>
        </form>

        {q ? (
          <>
            <p className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "result" : "results"} for{" "}
              <span className="text-foreground font-semibold">
                &quot;{q}&quot;
              </span>
            </p>

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
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <Link
                      to={r.url}
                      title={r.title}
                      className="group block"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {r.type}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {r.url}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {r.title}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {r.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-16 max-w-lg mx-auto">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  No results found
                </h2>
                <p className="text-muted-foreground mb-6">
                  Try different keywords, check for typos, or browse the
                  Knowledge Hub for related guides.
                </p>
                <Button asChild>
                  <Link to="/knowledge-hub">Browse Knowledge Hub</Link>
                </Button>
              </div>
            )}

            <ArchivePagination
              page={currentPage}
              totalPages={totalPages}
              onChange={setPage}
            />
          </>
        ) : (
          <div className="text-muted-foreground">
            Type a query above to search across all guides, blog articles,
            policies, and pages.
          </div>
        )}
      </ArchiveLayout>
    </>
  );
}
