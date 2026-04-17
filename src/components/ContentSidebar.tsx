import { Link } from "react-router-dom"
import { ReactNode } from "react"
import { ArrowRight, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  label: string
  level?: 2 | 3
}

interface CtaItem {
  label: string
  href: string
  description?: string
  tone?: "primary" | "subtle"
}

/**
 * Right-rail sidebar intended for long-form content pages (Knowledge Hub
 * detail, Safeguarding, Policies). Composes a sticky TOC, contact CTA, and
 * any number of related-link cards. Collapses to a single column on mobile.
 */
export function ContentSidebar({
  toc,
  ctas,
  quickContact,
  children,
  className,
}: {
  toc?: TocItem[]
  ctas?: CtaItem[]
  quickContact?: { phone?: string; email?: string }
  children?: ReactNode
  className?: string
}) {
  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        "lg:sticky lg:top-24 space-y-6 self-start",
        className
      )}
    >
      {toc && toc.length > 0 && (
        <nav aria-label="On this page" className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            On this page
          </p>
          <ol className="space-y-1.5 text-sm">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                <a
                  href={`#${item.id}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {ctas && ctas.length > 0 && (
        <div className="space-y-3">
          {ctas.map((cta) => (
            <Link
              key={cta.href}
              to={cta.href}
              className={cn(
                "group block rounded-2xl p-5 transition-all",
                cta.tone === "primary"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border bg-card hover:border-primary/40"
              )}
            >
              <p className="font-display font-semibold">{cta.label}</p>
              {cta.description && (
                <p
                  className={cn(
                    "text-sm mt-1",
                    cta.tone === "primary"
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {cta.description}
                </p>
              )}
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      )}

      {quickContact && (quickContact.phone || quickContact.email) && (
        <div className="rounded-2xl border border-border bg-muted/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Need to speak to us?
          </p>
          {quickContact.phone && (
            <a
              href={`tel:${quickContact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4 text-primary" />
              {quickContact.phone}
            </a>
          )}
          {quickContact.email && (
            <a
              href={`mailto:${quickContact.email}`}
              className="block text-sm text-muted-foreground hover:text-primary transition-colors mt-1"
            >
              {quickContact.email}
            </a>
          )}
        </div>
      )}

      {children}
    </aside>
  )
}
