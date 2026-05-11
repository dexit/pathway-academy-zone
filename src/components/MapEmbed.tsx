import { cn } from "@/lib/utils"

interface MapEmbedProps {
  className?: string
  /** Height in pixels (default 400) */
  height?: number
}

/**
 * Responsive Google Maps embed for the Pathway Academy Zone — Burslem centre.
 * Drop this anywhere a map is needed (Centres page, Contact page, etc.).
 */
export function MapEmbed({ className, height = 400 }: MapEmbedProps) {
  return (
    <div
      className={cn("w-full overflow-hidden rounded-2xl border border-border shadow-sm", className)}
      style={{ height }}
      itemProp="hasMap"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008.5491624572948!2d-2.203716362539113!3d53.04287195357389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a435c2f1bed7b%3A0xd25d39ddea5d3ea2!2sPathway%20AcademyZone!5e0!3m2!1sen!2suk!4v1778258685204!5m2!1sen!2suk"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Pathway Academy Zone — Burslem Learning Centre, Duncalf St, Stoke-on-Trent ST6 3LJ"
        aria-label="Google Maps showing Pathway Academy Zone location"
      />
    </div>
  )
}
