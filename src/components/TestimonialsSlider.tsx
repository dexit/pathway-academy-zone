import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Quote, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import { SITE_URL, SITE_NAME } from "@/components/Seo"

export interface Testimonial {
  text: string
  author: string
  role?: string
  area?: string
  rating?: number
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[]
  className?: string
  autoplayDelay?: number
  /** Inject the JSON-LD <script> tag into the page */
  withSchema?: boolean
}

function buildTestimonialsSchema(items: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Testimonials — ${SITE_NAME}`,
    url: `${SITE_URL}/outcomes`,
    itemListElement: items.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        author: { "@type": "Person", name: t.author },
        reviewBody: t.text,
        ...(t.rating != null && {
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating,
            bestRating: 5,
          },
        }),
        itemReviewed: {
          "@type": "EducationalOrganization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    })),
  }
}

export default function TestimonialsSlider({
  testimonials,
  className,
  autoplayDelay = 5000,
  withSchema = true,
}: TestimonialsSliderProps) {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildTestimonialsSchema(testimonials)) }}
        />
      )}

      <div className={cn("relative", className)}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.3) }}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <div className="bg-card rounded-2xl p-7 shadow-sm border border-border/50 flex flex-col h-full hover:border-primary/30 hover:shadow-md transition-all">
                  <Quote className="h-7 w-7 text-primary/25 mb-4 shrink-0" aria-hidden="true" />
                  <p className="text-foreground text-sm leading-relaxed italic flex-1">"{t.text}"</p>
                  <div className="mt-5 pt-4 border-t border-border/50">
                    <p className="text-foreground text-sm font-semibold">— {t.author}</p>
                    {t.role && (
                      <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                    )}
                    {t.area && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
                        {t.area}
                      </p>
                    )}
                    {t.rating != null && (
                      <div className="flex gap-0.5 mt-1" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <span
                            key={s}
                            className={cn(
                              "text-sm",
                              s < t.rating! ? "text-yellow-400" : "text-muted-foreground/30"
                            )}
                            aria-hidden="true"
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
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
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>

          <div className="flex gap-1.5" role="tablist" aria-label="Testimonial slides">
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
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </>
  )
}
