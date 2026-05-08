import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import { SITE_URL, SITE_NAME } from "@/components/Seo"

export interface Review {
  text: string
  author: string
  role?: string
  area?: string
  rating: number
  date?: string
  source?: string
}

interface ReviewsSliderProps {
  reviews: Review[]
  aggregateRating?: { value: number; count: number; bestRating?: number }
  className?: string
  autoplayDelay?: number
  withSchema?: boolean
}

function buildReviewsSchema(reviews: Review[], aggregate?: ReviewsSliderProps["aggregateRating"]) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    ...(aggregate && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregate.value.toFixed(1),
        reviewCount: aggregate.count,
        bestRating: aggregate.bestRating ?? 5,
      },
    }),
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      ...(r.date && { datePublished: r.date }),
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
    })),
  }
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function ReviewsSlider({
  reviews,
  aggregateRating,
  className,
  autoplayDelay = 6000,
  withSchema = true,
}: ReviewsSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()))
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  return (
    <>
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildReviewsSchema(reviews, aggregateRating)) }}
        />
      )}

      <div className={cn("relative", className)}>
        {aggregateRating && (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-foreground tabular-nums">
              {aggregateRating.value.toFixed(1)}
            </span>
            <div>
              <StarRating rating={aggregateRating.value} />
              <p className="text-xs text-muted-foreground mt-0.5">
                Based on {aggregateRating.count} reviews
              </p>
            </div>
          </div>
        )}

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.3) }}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <div className="bg-card rounded-2xl p-7 shadow-sm border border-border/50 flex flex-col h-full hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <Quote className="h-6 w-6 text-primary/25 shrink-0" aria-hidden="true" />
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="text-foreground text-sm leading-relaxed italic flex-1">"{r.text}"</p>
                  <div className="mt-5 pt-4 border-t border-border/50">
                    <p className="text-foreground text-sm font-semibold">— {r.author}</p>
                    {r.role && (
                      <p className="text-xs text-muted-foreground mt-0.5">{r.role}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      {r.area && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
                          {r.area}
                        </span>
                      )}
                      {r.source && (
                        <span className="text-xs text-muted-foreground/60">{r.source}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={scrollPrev}
            aria-label="Previous review"
            className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>

          <div className="flex gap-1.5" role="tablist" aria-label="Review slides">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === selectedIndex}
                aria-label={`Slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === selectedIndex ? "bg-primary w-6" : "bg-border w-1.5 hover:bg-primary/40"
                )}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            aria-label="Next review"
            className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </>
  )
}
