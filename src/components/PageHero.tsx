import React from "react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/Seo";

interface PageHeroProps {
  /** "primary" = solid bg-primary band (default); "image" = full-bleed photo with scrim */
  variant?: "primary" | "image";
  /** Image src — required when variant="image" */
  imageSrc?: string;
  imageAlt?: string;
  /** Text alignment within the content block. Default "center" */
  align?: "center" | "left" | "right";
  /** Badge pill above the heading */
  badge?: { label: string; icon?: React.ElementType };
  /** Breadcrumb items */
  breadcrumbs?: Array<{ label: string; to?: string }>;
  /** Main heading (h1) */
  heading: string;
  /** Paragraph below heading */
  subheading?: string;
  /** Optional extra content below subheading (e.g. star rating row) */
  children?: React.ReactNode;
  /** Extra classes on outer section */
  className?: string;
  /** Padding override — defaults to "py-20 md:py-28" for primary, "py-32" for image */
  padding?: string;
}

export function PageHero({
  variant = "primary",
  imageSrc,
  imageAlt,
  align = "center",
  badge,
  breadcrumbs,
  heading,
  subheading,
  children,
  className,
  padding,
}: PageHeroProps) {
  const isCenter = align === "center";
  const isRight = align === "right";

  const alignClass = isCenter ? "text-center" : isRight ? "text-right" : "";

  if (variant === "image") {
    const defaultPadding = "py-32";
    const resolvedPadding = padding ?? defaultPadding;

    return (
      <section className={cn("relative", resolvedPadding, className)}>
        {/* Background image + scrim */}
        <div className="absolute inset-0">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt ?? ""}
              className="w-full h-full object-cover"
              width="1920"
              height="1080"
              loading="eager"
              fetchPriority="high"
            />
          )}
          <div className="absolute inset-0 bg-scrim/60" />
        </div>

        <div className={cn("container mx-auto px-4 relative z-10", alignClass)}>
          {breadcrumbs && (
            <Breadcrumbs
              items={breadcrumbs}
              className={cn(
                "text-white/70 mb-6 [&_a]:text-white/70 [&_a]:hover:text-white [&_[aria-current]]:text-white [&_svg]:text-white/50",
                isCenter && "justify-center"
              )}
            />
          )}

          {badge && (() => {
            const Icon = badge.icon;
            return (
              <div className={cn(
                "inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4 border border-white/20 backdrop-blur-sm",
                !isCenter && "block"
              )}>
                {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
                {badge.label}
              </div>
            );
          })()}

          <h1
            className={cn(
              "font-display text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl text-white",
              isCenter && "mx-auto"
            )}
          >
            {heading}
          </h1>

          {subheading && (
            <p
              className={cn(
                "text-white/80 text-lg leading-relaxed max-w-2xl",
                isCenter && "mx-auto"
              )}
            >
              {subheading}
            </p>
          )}

          {children}
        </div>
      </section>
    );
  }

  // variant === "primary"
  const defaultPadding = "py-20 md:py-28";
  const resolvedPadding = padding ?? defaultPadding;

  return (
    <section className={cn("bg-primary text-primary-foreground", resolvedPadding, className)}>
      <div className={cn("container mx-auto px-4", alignClass)}>
        {breadcrumbs && (
          <Breadcrumbs
            items={breadcrumbs}
            className={cn(
              "text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground",
              isCenter && "justify-center"
            )}
          />
        )}

        {badge && (() => {
          const Icon = badge.icon;
          return (
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4 border border-white/20">
              {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
              {badge.label}
            </div>
          );
        })()}

        <h1
          className={cn(
            "font-display text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl",
            isCenter && "mx-auto"
          )}
        >
          {heading}
        </h1>

        {subheading && (
          <p
            className={cn(
              "text-primary-foreground/80 text-lg leading-relaxed max-w-2xl",
              isCenter && "mx-auto"
            )}
          >
            {subheading}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}

export default PageHero;
