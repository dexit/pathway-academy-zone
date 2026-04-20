import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"
import type { BlogPost } from "@/config/data/blog"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post.title}`} />

      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <Badge
          variant="secondary"
          className="w-fit text-xs font-semibold tracking-wide bg-primary/10 text-primary border-0"
        >
          {post.category}
        </Badge>

        <h3 className="font-bold text-foreground text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span>{post.date}</span>
          </div>

          <div
            className="flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all duration-300"
          >
            Read
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </article>
  )
}
