import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  text: string;
  author: string;
  rating?: number;
}

interface TestimonialSliderProps {
  reviews: Review[];
  title?: string;
}

export function TestimonialSlider({ reviews, title }: TestimonialSliderProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {title && <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">{title}</h2>}
        <div className="relative max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                  <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-all duration-300 bg-card">
                    <CardContent className="p-8 flex flex-col h-full">
                      <Quote className="h-8 w-8 text-primary/20 mb-4 shrink-0" />
                      <div className="flex gap-0.5 mb-4">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-foreground/90 leading-relaxed italic mb-6 flex-grow text-sm">"{review.text}"</p>
                      <div className="mt-auto pt-4 border-t border-border/50">
                        <p className="font-bold text-xs text-foreground uppercase tracking-wider">— {review.author}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 bg-background border-border" />
            <CarouselNext className="-right-4 bg-background border-border" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
