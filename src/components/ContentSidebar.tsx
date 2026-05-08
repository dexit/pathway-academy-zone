import { Link } from "react-router-dom"
import { ReactNode, useState } from "react"
import { ArrowRight, Phone, MapPin, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useActiveHeading } from "@/hooks/use-auto-toc"
import { AnimatePresence, motion } from "framer-motion"

const AREA_LINKS = [
  { name: "Stoke-on-Trent", slug: "stoke-on-trent" },
  { name: "Newcastle-under-Lyme", slug: "newcastle-under-lyme" },
  { name: "Stafford", slug: "stafford" },
  { name: "Cannock", slug: "cannock" },
  { name: "Lichfield", slug: "lichfield" },
  { name: "Tamworth", slug: "tamworth" },
  { name: "Wolverhampton", slug: "wolverhampton" },
  { name: "Leek", slug: "leek" },
]

export interface TocItem {
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
 * Right-rail sidebar for long-form content pages.
 * - "On This Page" TOC card is sticky independently at top-24
 * - TOC collapses level-3 children until their parent is active or manually expanded
 * - Other cards scroll naturally below the TOC
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
    <aside aria-label="Sidebar" className={cn("space-y-5", className)}>
      {/* Sticky TOC card */}
      {toc && toc.length > 0 && (
        <div className="lg:sticky lg:top-24">
          <TocNav toc={toc} />
        </div>
      )}

      {/* Scrolling cards below */}
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

      {/* Areas we serve */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Areas We Serve
        </p>
        <div className="flex flex-wrap gap-1.5">
          {AREA_LINKS.map((a) => (
            <Link
              key={a.slug}
              to={`/alternative-provision/${a.slug}`}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1 hover:text-primary hover:border-primary/40 transition-colors"
            >
              <MapPin className="h-2.5 w-2.5" />{a.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

/* ─── Collapsible TOC ───────────────────────────────────────────────────────── */

interface TocGroup {
  parent: TocItem
  children: TocItem[]
}

function buildGroups(toc: TocItem[]): TocGroup[] {
  const groups: TocGroup[] = []
  let current: TocGroup | null = null
  for (const item of toc) {
    if (!item.level || item.level === 2) {
      current = { parent: item, children: [] }
      groups.push(current)
    } else if (item.level === 3 && current) {
      current.children.push(item)
    }
  }
  return groups
}

function TocNav({ toc }: { toc: TocItem[] }) {
  const ids = toc.map((t) => t.id)
  const active = useActiveHeading(ids)
  const groups = buildGroups(toc)

  // Find which group the active id belongs to
  const activeGroupId = groups.find(
    (g) => g.parent.id === active || g.children.some((c) => c.id === active)
  )?.parent.id ?? null

  // Track manually expanded groups
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggleGroup = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isGroupOpen = (id: string) => id === activeGroupId || expanded.has(id)

  return (
    <nav aria-label="On this page" className="rounded-2xl border border-border bg-card p-5 overflow-hidden">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        On this page
      </p>
      <ol className="space-y-0.5 text-sm border-l border-border">
        {groups.map((group) => {
          const isParentActive = active === group.parent.id
          const hasActiveChild = group.children.some((c) => c.id === active)
          const open = isGroupOpen(group.parent.id)

          return (
            <li key={group.parent.id}>
              {/* Parent row */}
              <div className="relative flex items-center pl-3 pr-1 py-1">
                {(isParentActive || hasActiveChild) && (
                  <span aria-hidden="true" className="absolute left-[-1px] top-1 bottom-1 w-[2px] bg-primary rounded" />
                )}
                <a
                  href={`#${group.parent.id}`}
                  aria-current={isParentActive ? "location" : undefined}
                  className={cn(
                    "flex-1 block py-0.5 transition-colors duration-200 font-medium",
                    (isParentActive || hasActiveChild)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {group.parent.label}
                </a>
                {group.children.length > 0 && (
                  <button
                    onClick={() => toggleGroup(group.parent.id)}
                    aria-label={open ? `Collapse ${group.parent.label}` : `Expand ${group.parent.label}`}
                    aria-expanded={open}
                    className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground ml-1 shrink-0"
                  >
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </motion.span>
                  </button>
                )}
              </div>

              {/* Children */}
              <AnimatePresence initial={false}>
                {open && group.children.length > 0 && (
                  <motion.ol
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden border-l border-border ml-3"
                  >
                    {group.children.map((child) => {
                      const isChildActive = active === child.id
                      return (
                        <li key={child.id} className="relative pl-3 py-0.5">
                          {isChildActive && (
                            <span aria-hidden="true" className="absolute left-[-1px] top-1 bottom-1 w-[2px] bg-primary rounded" />
                          )}
                          <a
                            href={`#${child.id}`}
                            aria-current={isChildActive ? "location" : undefined}
                            className={cn(
                              "block py-0.5 text-xs transition-colors duration-200",
                              isChildActive
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-primary"
                            )}
                          >
                            {child.label}
                          </a>
                        </li>
                      )
                    })}
                  </motion.ol>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
