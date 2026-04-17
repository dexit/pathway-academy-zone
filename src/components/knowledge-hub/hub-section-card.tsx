import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HubSection } from "./hub-data"

interface HubSectionCardProps {
  section: HubSection
}

export function HubSectionCard({ section }: HubSectionCardProps) {
  const Icon = section.icon

  return (
    <div className="flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow h-full">
      {/* Card header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Icon className={cn("w-5 h-5", section.color)} />
            </div>
            <h3 className="text-base font-semibold text-foreground">
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
              className="flex items-center justify-between px-6 py-3.5 text-sm text-foreground hover:bg-secondary hover:text-primary group transition-colors"
            >
              <span className="leading-snug">{resource.title}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
            </Link>
          </li>
        ))}
      </ul>

      {/* View all */}
      <div className="p-4 pt-0">
        <Link
          to={`/knowledge-hub/${section.id}`}
          className="block text-center text-xs font-semibold text-primary hover:underline mt-4"
        >
          View all {section.title.toLowerCase()} &rarr;
        </Link>
      </div>
    </div>
  )
}
