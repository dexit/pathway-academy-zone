import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { searchAll, type SearchItem } from "@/lib/search-index";
import { Button } from "@/components/ui/button";

const TYPES: Array<SearchItem["type"] | "All"> = [
  "All",
  "Page",
  "Guide",
  "Blog",
  "Policy",
  "News",
  "FAQ",
];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [draft, setDraft] = useState(q);
  const [type, setType] = useState<(typeof TYPES)[number]>("All");

  const results = useMemo(() => searchAll(q), [q]);
  const filtered =
    type === "All" ? results : results.filter((r) => r.type === type);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: results.length };
    for (const r of results) map[r.type] = (map[r.type] || 0) + 1;
    return map;
  }, [results]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setParams(draft ? { q: draft } : {});
  }

  return (
    <Layout>
      <Seo
        title={q ? `Search: ${q}` : "Search"}
        description={
          q
            ? `Search results for "${q}" across guides, blog, policies, and pages.`
            : "Search the Pathway Academy Zone website for guides, blog articles, policies, and more."
        }
        noIndex
      />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Breadcrumbs
            items={[{ label: "Search" }]}
            className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Search
          </h1>
          <form onSubmit={submit} className="relative max-w-2xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60 pointer-events-none" />
            <input
              type="search"
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search guides, blog, policies..."
              aria-label="Search query"
              className="w-full h-14 pl-12 pr-32 rounded-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full"
            >
              Search
            </Button>
          </form>
        </div>
      </header>

      <section className="container mx-auto px-4 py-10 md:py-16">
        {q ? (
          <>
            <p className="text-muted-foreground mb-6">
              {results.length}{" "}
              {results.length === 1 ? "result" : "results"} for{" "}
              <span className="text-foreground font-semibold">
                &quot;{q}&quot;
              </span>
            </p>

            {results.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {TYPES.filter((t) => t === "All" || counts[t]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      type === t
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {t}
                    <span className="ml-1.5 opacity-70">
                      {t === "All" ? counts.All : counts[t] || 0}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {filtered.length > 0 ? (
              <ul className="space-y-4 max-w-3xl">
                {filtered.map((r) => (
                  <li
                    key={`${r.type}-${r.url}-${r.title}`}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <Link to={r.url} className="group block">
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
          </>
        ) : (
          <div className="text-muted-foreground max-w-lg">
            Type a query above to search across all guides, blog articles,
            policies, and pages.
          </div>
        )}
      </section>
    </Layout>
  );
}
