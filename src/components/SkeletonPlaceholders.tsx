import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/**
 * Reusable skeleton placeholders for perceived-performance during route
 * transitions, search index loading, and lazy-loaded long pages.
 */

export function ArticleSkeleton({ className }: { className?: string }) {
  return (
    <div aria-busy="true" aria-live="polite" className={cn("space-y-4", className)}>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-56 w-full rounded-2xl" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-8/12" />
    </div>
  )
}

export function CardGridSkeleton({
  count = 6,
  columns = 3,
  className,
}: {
  count?: number
  columns?: 1 | 2 | 3 | 4
  className?: string
}) {
  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : columns === 3
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn("grid gap-6", gridCols, className)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  )
}

export function JobListSkeleton({
  count = 3,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div aria-busy="true" aria-live="polite" className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-64" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-44 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function FormSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn("space-y-4 rounded-2xl border border-border bg-card p-8", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
      <Skeleton className="h-32" />
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  )
}
