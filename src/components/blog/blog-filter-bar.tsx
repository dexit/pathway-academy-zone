import { cn } from "@/lib/utils"

interface BlogFilterBarProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export function BlogFilterBar({ categories, active, onChange }: BlogFilterBarProps) {
  return (
    <nav aria-label="Filter posts by category">
      <ul className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              type="button"
              onClick={() => onChange(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                active === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-muted hover:border-muted-foreground/20"
              )}
              aria-current={active === cat ? "true" : undefined}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
