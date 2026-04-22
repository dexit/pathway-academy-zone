import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { whyItMattersChapters } from "@/config/data/homepage";

function ChapterContent({ chapter, align }: { chapter: any; align: "left" | "right" }) {
  return (
    <div className={align === "right" ? "md:ml-auto md:max-w-md md:text-right" : "md:mr-auto md:max-w-md text-left"}>
      <p className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-4">
        {chapter.eyebrow}
      </p>
      <h3 className="text-4xl md:text-5xl mb-6">
        {chapter.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-lg mb-8 font-medium">
        {chapter.body}
      </p>

      <motion.div
        initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative inline-block text-left rounded-xl border-2 border-primary/20 bg-primary/5 p-6 overflow-hidden min-w-[240px] group/stat"
      >
        <div className="absolute inset-0 bg-primary opacity-0 group-hover/stat:opacity-5 transition-opacity duration-500" />
        <p className="relative font-display font-black text-4xl text-primary leading-tight mb-1">
          {chapter.stat.value}
        </p>
        <p className="relative text-xs font-black uppercase tracking-widest text-muted-foreground">
          {chapter.stat.label}
        </p>
      </motion.div>
    </div>
  );
}

function ChapterIllustration({
  chapter,
  from,
}: {
  chapter: any;
  from: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: from === "left" ? -5 : 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${from === "right" ? "md:ml-auto" : "md:mr-auto"} max-w-[400px]`}
    >
      <div className="absolute -inset-8 rounded-full bg-primary/10 blur-[100px] pointer-events-none opacity-50" />
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white shadow-2xl transition-transform duration-700 hover:scale-105 hover:rotate-1">
        <img
          src={chapter.image}
          alt={chapter.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
    </motion.div>
  );
}

function ChapterRow({ chapter, index, total }: { chapter: any; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      id={chapter.id}
      className="relative md:grid md:grid-cols-2 md:gap-24 py-24 md:py-40"
    >
      <div className="hidden md:block">
        {isLeft ? (
          <ChapterContent chapter={chapter} align="right" />
        ) : (
          <ChapterIllustration chapter={chapter} from="left" />
        )}
      </div>

      <div className="hidden md:block">
        {!isLeft ? (
          <ChapterContent chapter={chapter} align="left" />
        ) : (
          <ChapterIllustration chapter={chapter} from="right" />
        )}
      </div>

      <div className="md:hidden space-y-12">
        <ChapterIllustration chapter={chapter} from="left" />
        <ChapterContent chapter={chapter} align="left" />
      </div>
    </div>
  );
}

export default function WhyItMattersScroller() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden">
      {/* Dynamic Background Progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-2 bg-primary z-[60] origin-left"
      />

      <div className="container mx-auto px-4 relative">
        {/* Intro */}
        <div className="min-h-screen flex flex-col justify-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block">MISSION INTEL</span>
            <h2 className="text-6xl md:text-9xl mb-12">WHY IT <span className="text-primary italic">ACTUALLY</span> MATTERS.</h2>
            <p className="text-muted-foreground text-2xl md:text-3xl leading-tight font-medium max-w-2xl">
              We aren't here to play school. We're here to bridge the gap between where you are and where you want to be.
            </p>
          </motion.div>
        </div>

        {/* Chapters */}
        <div className="relative">
          {whyItMattersChapters.map((chapter, i) => (
            <ChapterRow key={chapter.id} chapter={chapter} index={i} total={whyItMattersChapters.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
