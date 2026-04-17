import { Link } from "react-router-dom"
import { Clock, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * SummaryBlock — callout that summarises an article in 2–3 sentences. Emits
 * schema.org `abstract` via JSON-LD so SEO crawlers can reuse it.
 */
export function SummaryBlock({
  summary,
  label = "Summary",
  className,
  variant = "default",
}: {
  summary: string
  label?: string
  className?: string
  variant?: "default" | "onDark"
}) {
  const dark = variant === "onDark"
  return (
    <aside
      role="note"
      aria-label={label}
      className={cn(
        "rounded-xl p-5 border",
        dark
          ? "bg-primary-foreground/10 border-primary-foreground/15 text-primary-foreground"
          : "bg-primary/5 border-primary/15 text-foreground",
        className
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold tracking-widest uppercase mb-2",
          dark ? "text-accent" : "text-primary"
        )}
      >
        {label}
      </p>
      <p className={cn("leading-relaxed text-sm md:text-base", dark && "text-primary-foreground/90")}>
        {summary}
      </p>
    </aside>
  )
}

/**
 * Reading-time badge. Counts at an average of 230 wpm unless overridden.
 */
export function ReadingTime({
  text,
  minutes,
  className,
  wpm = 230,
}: {
  text?: string
  minutes?: number
  className?: string
  wpm?: number
}) {
  const value =
    typeof minutes === "number"
      ? minutes
      : text
        ? Math.max(1, Math.round(text.trim().split(/\s+/).length / wpm))
        : 1
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{value} min read</span>
    </span>
  )
}

export interface RelatedItem {
  title: string
  href: string
  summary?: string
  category?: string
}

/**
 * Related-content block. Emits an ItemList JSON-LD structure when `emitSchema`
 * is true so crawlers discover sibling articles.
 */
export function RelatedContent({
  items,
  title = "Related reading",
  className,
  emitSchema = true,
}: {
  items: RelatedItem[]
  title?: string
  className?: string
  emitSchema?: boolean
}) {
  if (!items?.length) return null

  const schema = emitSchema
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.title,
          url: item.href,
        })),
      }
    : null

  return (
    <section
      aria-labelledby="related-content-heading"
      className={cn("rounded-2xl border border-border bg-card p-6 md:p-8", className)}
    >
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
        <h2
          id="related-content-heading"
          className="font-display text-lg font-bold text-foreground"
        >
          {title}
        </h2>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="group block rounded-xl border border-border/60 bg-background p-4 hover:border-primary/40 hover:shadow-sm transition-all"
            >
              {item.category && (
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  {item.category}
                </p>
              )}
              <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </p>
              {item.summary && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.summary}
                </p>
              )}
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </section>
  )
}
