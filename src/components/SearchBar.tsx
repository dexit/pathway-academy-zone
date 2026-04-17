import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchAll, type SearchItem } from "@/lib/search-index";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
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
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  }

  return (
    <div ref={ref} className={compact ? "relative w-full" : "relative w-56"}>
      <form onSubmit={submit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search..."
          aria-label="Search the site"
          className="w-full h-9 pl-9 pr-9 rounded-full text-sm bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>

      {open && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-lg overflow-hidden z-50">
          {results.length > 0 ? (
            <ul className="max-h-[360px] overflow-auto py-1">
              {results.map((r) => (
                <li key={`${r.type}-${r.url}-${r.title}`}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(r.url);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {r.type}
                      </span>
                      <span className="text-sm text-foreground font-medium truncate">
                        {r.title}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {r.description}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-sm text-muted-foreground text-center">
              No results for &quot;{query}&quot;
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent(query.trim())}`);
              setOpen(false);
              setQuery("");
            }}
            className="w-full px-4 py-2.5 text-xs font-semibold text-primary hover:bg-muted border-t border-border text-center"
          >
            View all results
          </button>
        </div>
      )}
    </div>
  );
}
