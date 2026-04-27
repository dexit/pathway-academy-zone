import { Link } from "react-router-dom"
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HubSection } from "./hub-data"

interface HubSectionCardProps {
  section: HubSection
}

export function HubSectionCard({ section }: HubSectionCardProps) {
  const Icon = section.icon

  return (
    <div className="flex flex-col bg-card rounded-[2.5rem] border border-border/50 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20 transition-all duration-500 group h-full relative">
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles className="w-5 h-5 text-primary/30" />
      </div>

      {/* Card header */}
      <div className="p-10 pb-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-sm">
              <Icon className={cn("w-7 h-7 transition-colors duration-500", section.color, "group-hover:text-primary-foreground")} />
            </div>
            <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 block mb-1">Topic Category</span>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                </h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {section.description}
          </p>
        </div>
      </div>

      {/* Resource links */}
      <div className="px-6 flex-1">
        <div className="bg-muted/30 rounded-3xl p-4 border border-border/30">
            <ul className="flex flex-col gap-1">
                {section.resources.slice(0, 3).map((resource) => (
                <li key={resource.href}>
                    <Link
                    to={resource.href}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-card hover:text-primary rounded-2xl hover:shadow-sm transition-all group/link"
                    >
                    <span className="leading-snug flex-1 truncate mr-4">{resource.title}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover/link:text-primary group-hover/link:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                </li>
                ))}
            </ul>
        </div>
      </div>

      {/* View all */}
      <div className="p-8 mt-auto">
        <Link
          to={`/knowledge-hub/${section.id}`}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-primary/10 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm shadow-primary/5"
        >
          View all {section.title.toLowerCase()} <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
