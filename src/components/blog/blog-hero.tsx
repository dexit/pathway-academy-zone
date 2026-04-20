import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"
import type { BlogPost } from "@/config/data/blog"

interface BlogHeroProps {
  post: BlogPost
}

export function BlogHero({ post }: BlogHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary group">
      {/* Background image placeholder */}
      <div className="absolute inset-0">
        <img
          src={post.image}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end p-8 md:p-12 min-h-[420px] max-w-3xl">
        <Badge className="mb-4 w-fit bg-accent text-accent-foreground hover:bg-accent/90 border-0 text-xs font-semibold tracking-wide uppercase">
          {post.category}
        </Badge>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
          {post.title}
        </h2>

        <p className="text-white/70 text-base leading-relaxed mb-6 max-w-xl">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-1.5 text-white/50 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
          <span className="text-white/30 text-sm">{post.date}</span>

          <Link
            to={`/blog/${post.slug}`}
            className="ml-auto flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all"
          >
            Read article
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
