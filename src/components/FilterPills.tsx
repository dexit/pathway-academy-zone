import { cn } from "@/lib/utils";

interface FilterPillsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  counts?: Record<string, number>;
}

/**
 * Shared rounded-pill filter bar used across all archive pages
 * (Blog, News, FAQs, Policies, Search) so filtering looks identical
 * everywhere. Uses semantic tokens — never raw colours.
 */
export function FilterPills({
  options,
  active,
  onChange,
  ariaLabel = "Filter",
  counts,
}: FilterPillsProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = active === opt;
          return (
            <li key={opt}>
              <button
                type="button"
                onClick={() => onChange(opt)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border inline-flex items-center gap-1.5",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-muted hover:border-muted-foreground/20"
                )}
              >
                <span>{opt}</span>
                {counts && counts[opt] !== undefined && (
                  <span
                    className={cn(
                      "text-[11px] opacity-70",
                      isActive ? "" : "text-muted-foreground"
                    )}
                  >
                    {counts[opt]}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
