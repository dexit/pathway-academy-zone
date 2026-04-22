import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function HubSectionCard({ section }: { section: any }) {
  const Icon = section.icon

  return (
    <div className="flex flex-col bg-card rounded-[2rem] border-2 border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl h-full group">
      {/* Card header */}
      <div className="p-10 border-b-2 border-border/10">
        <div className="flex flex-col gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
            <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">
              {section.title}
            </h3>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      </div>

      {/* Resource links */}
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {section.resources.slice(0, 3).map((resource: any) => (
            <li key={resource.href}>
              <Link
                to={resource.href}
                className="flex items-center justify-between p-4 rounded-xl text-sm font-bold uppercase italic tracking-tighter text-foreground hover:bg-primary/5 hover:text-primary transition-all group/link"
              >
                <span>{resource.title}</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* View all */}
      <div className="p-10 pt-0">
        <Link
          to={`/knowledge-hub/${section.id}`}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all"
        >
          VIEW FULL REPO <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
