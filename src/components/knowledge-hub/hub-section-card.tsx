import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HubSection } from "@/config/data/knowledge-hub"

interface HubSectionCardProps {
  section: HubSection
}

export function HubSectionCard({ section }: HubSectionCardProps) {
  const Icon = section.icon

  return (
    <div className="flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      {/* Card header */}
      <div className="p-6 border-b border-border bg-gradient-to-br from-card to-secondary/30">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
              <Icon className={cn("w-6 h-6", section.color)} />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {section.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {section.description}
          </p>
        </div>
      </div>

      {/* Resource links */}
      <ul className="flex flex-col divide-y divide-border flex-1">
        {section.resources.map((resource) => (
          <li key={resource.href}>
            <Link
              to={resource.href}
              className="flex items-center justify-between px-6 py-3.5 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary group transition-all duration-200"
            >
              <span className="leading-snug">{resource.title}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
            </Link>
          </li>
        ))}
      </ul>

      {/* View all */}
      <div className="p-4 bg-muted/20">
        <Link
          to={`/knowledge-hub/${section.id}`}
          className="block text-center text-xs font-bold text-primary hover:underline group"
        >
          View all {section.title.toLowerCase()} <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}
