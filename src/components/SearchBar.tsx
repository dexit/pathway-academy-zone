import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchAll, type SearchItem } from "@/lib/search-index";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(compact); // in compact mode start expanded
  const [resultsOpen, setResultsOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setResults(query ? searchAll(query).slice(0, 6) : []);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setResultsOpen(false);
        if (!compact && !query) setExpanded(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [compact, query]);

  useEffect(() => {
    if (expanded && !compact) {
      // focus input after expand animation kicks in
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [expanded, compact]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setResultsOpen(false);
    setQuery("");
    if (!compact) setExpanded(false);
    inputRef.current?.blur();
  }

  return (
    <div ref={ref} className={compact ? "relative w-full" : "relative"}>
      {!compact && (
        <button
          type="button"
          aria-label="Open search"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
          className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all hover:scale-110 active:scale-95"
        >
          <Search className="h-5 w-5" />
        </button>
      )}

      <AnimatePresence>
        {(expanded || compact) && (
          <motion.div
            initial={compact ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={
              compact
                ? "relative w-full"
                : "absolute right-0 top-full mt-2 w-96 bg-card rounded-2xl border border-border shadow-2xl p-3 z-50"
            }
          >
            <form onSubmit={submit} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setResultsOpen(true);
                }}
                onFocus={() => setResultsOpen(true)}
                placeholder="Search..."
                aria-label="Search the site"
                className="w-full h-12 pl-10 pr-10 rounded-xl text-sm font-medium bg-muted/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>

            {resultsOpen && query && (
              <div className="mt-3 bg-card rounded-xl border border-border overflow-hidden shadow-inner">
                {results.length > 0 ? (
                  <ul className="max-h-[400px] overflow-auto py-2">
                    {results.map((r) => (
                      <li key={`${r.type}-${r.url}-${r.title}`}>
                        <button
                          type="button"
                          onClick={() => {
                            navigate(r.url);
                            setResultsOpen(false);
                            setQuery("");
                            if (!compact) setExpanded(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-all border-l-2 border-transparent hover:border-primary group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                              {r.type}
                            </span>
                            <span className="text-sm text-foreground font-bold truncate group-hover:text-primary transition-colors">
                              {r.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-1 font-medium">
                            {r.description}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-8 text-sm text-muted-foreground text-center font-medium">
                    No results for &quot;{query}&quot;
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                    setResultsOpen(false);
                    setQuery("");
                    if (!compact) setExpanded(false);
                  }}
                  className="w-full px-4 py-3 text-xs font-bold text-primary hover:bg-primary hover:text-white border-t border-border text-center transition-all uppercase tracking-widest"
                >
                  View all results
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
