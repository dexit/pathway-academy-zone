import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import {
  MapPin,
  ClipboardList,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

type Chapter = {
  id: string;
  eyebrow: string;
  pillLabel: string;
  title: string;
  icon: LucideIcon;
  body: React.ReactNode;
  stat: { value: string; label: string };
};

const chapters: Chapter[] = [
  {
    id: "context",
    eyebrow: "01 — The local picture",
    pillLabel: "Local picture",
    title: "Hundreds of Stoke-on-Trent learners are at risk each year",
    icon: MapPin,
    stat: { value: "100s", label: "of young people locally at risk of exclusion" },
    body: (
      <>
        Across Stoke-on-Trent and the wider Staffordshire region, hundreds of young people
        are at risk of permanent exclusion, persistent absence, or disengagement from
        mainstream education each year. For many learners the standard school environment is
        not the right fit — not because they cannot succeed, but because they need a smaller
        setting, more relational practice, and a curriculum that meets them where they are.
        That is the gap high-quality Alternative Provision is designed to fill.
      </>
    ),
  },
  {
    id: "who",
    eyebrow: "02 — Who we are",
    pillLabel: "Who we are",
    title: "A registered AP for KS3 & KS4 learners aged 11–16",
    icon: ClipboardList,
    stat: { value: "11–16", label: "Key Stage 3 & 4 learners" },
    body: (
      <>
        Pathway Academy Zone is a registered Alternative Provision serving Key Stage 3 and
        Key Stage 4 learners aged 11–16. We accept referrals from mainstream secondary
        schools, Local Authorities, virtual schools, social workers, and family workers. Our
        team includes qualified teachers, pastoral specialists, and trained mentors who hold
        the relational space young people need to re-engage with learning.
      </>
    ),
  },
  {
    id: "story",
    eyebrow: "03 — Every story is different",
    pillLabel: "Every story",
    title: "Calm assessment, personalised plans, dignity first",
    icon: Sparkles,
    stat: { value: "1:1", label: "or small-group timetables" },
    body: (
      <>
        Every learner arrives with a different story. Some have experienced repeated
        fixed-term suspensions; others face managed moves, exclusion panels, or significant
        SEMH needs. A growing number are young people whose anxiety, school refusal, or
        neurodivergence has gone unmet for too long. Whatever the route in, we start the
        same way: a calm assessment, a personalised plan, and a small-group or 1:1 timetable
        that prioritises safety, attendance, and dignity before academic outcomes.
      </>
    ),
  },
  {
    id: "curriculum",
    eyebrow: "04 — A balanced curriculum",
    pillLabel: "Curriculum",
    title: "Core academics, vocational routes, real qualifications",
    icon: GraduationCap,
    stat: { value: "GCSE · BTEC", label: "Functional Skills & vocational routes" },
    body: (
      <>
        We deliver a balanced curriculum covering core English, Maths, Science, and PSHE
        alongside vocational and enrichment routes — construction, hospitality, motor
        vehicle, sport, and creative industries. Functional Skills, GCSEs and BTECs are
        available depending on Key Stage and individual targets. We work closely with
        commissioning schools so the academic thread is never broken, and support a managed
        return to mainstream wherever it is the right outcome.
      </>
    ),
  },
  {
    id: "safeguarding",
    eyebrow: "05 — Safeguarding at the centre",
    pillLabel: "Safeguarding",
    title: "Trained leads, robust processes, trusted partnerships",
    icon: ShieldCheck,
    stat: { value: "DSL", label: "Designated lead + LADO partnerships" },
    body: (
      <>
        Safeguarding sits at the centre of everything we do. We have a designated
        safeguarding lead, robust reporting processes, and partnerships with local
        safeguarding boards, CAMHS, the police, and the Local Authority Designated Officer
        (LADO). Parents, carers and referrers can contact us directly to discuss any concern
        at any point during a placement.
      </>
    ),
  },
  {
    id: "next",
    eyebrow: "06 — Start the conversation",
    pillLabel: "Start the conversation",
    title: "Refer a learner, talk to our team, or read the guide",
    icon: PhoneCall,
    stat: { value: "01782 365365", label: "Direct line to our team" },
    body: (
      <>
        If you are a school or Local Authority colleague considering a referral, the fastest
        way to start is the{" "}
        <Link to="/referral" className="text-primary font-semibold hover:underline">
          online referral form
        </Link>
        . For general enquiries use our{" "}
        <Link to="/contact" className="text-primary font-semibold hover:underline">
          contact page
        </Link>{" "}
        or call{" "}
        <a href="tel:+441782365365" className="text-primary font-semibold hover:underline">
          01782 365365
        </a>
        . For practitioners, our{" "}
        <Link
          to="/knowledge-hub/complete-guide"
          className="text-primary font-semibold hover:underline"
        >
          Complete Guide to Alternative Provision
        </Link>{" "}
        is a long-form, evidence-led reference.
      </>
    ),
  },
];

function ChapterContent({
  chapter,
  align,
}: {
  chapter: Chapter;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "md:ml-auto md:max-w-md md:text-right" : "md:mr-auto md:max-w-md text-left"}>
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-2">
        {chapter.eyebrow}
      </p>
      <h3 className="font-display text-2xl md:text-[26px] font-bold text-foreground leading-tight mb-4">
        {chapter.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base mb-5">
        {chapter.body}
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="relative inline-block text-left rounded-2xl border border-primary/15 bg-gradient-to-br from-accent/40 to-background p-5 overflow-hidden min-w-[220px]"
      >
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
        <p
          className={`relative font-display font-bold text-gradient-primary leading-tight mb-2 break-words ${
            chapter.stat.value.length > 8 ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
          }`}
        >
          {chapter.stat.value}
        </p>
        <p className="relative text-xs text-muted-foreground leading-snug">
          {chapter.stat.label}
        </p>
      </motion.div>
    </div>
  );
}

function ChapterRow({ chapter, index, total }: { chapter: Chapter; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const Icon = chapter.icon;
  const isLeft = index % 2 === 0;
  const connectorX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div
      ref={ref}
      id={chapter.id}
      className="relative md:grid md:grid-cols-[1fr_88px_1fr] md:gap-8 py-12 md:py-20"
    >
      {/* LEFT column */}
      <div className="hidden md:block relative">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ChapterContent chapter={chapter} align="right" />
            {/* Connector line from content to rail */}
            <motion.div
              style={{ scaleX: connectorX, transformOrigin: "right" }}
              className="absolute top-3 right-0 h-px w-12 translate-x-full bg-gradient-to-l from-primary/60 to-transparent"
            />
          </motion.div>
        )}
      </div>

      {/* CENTER rail node (desktop) */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          style={{ scale: useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 1.1, 1]) }}
          className="sticky top-32 z-10"
        >
          <div className="relative">
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.4], [0, 0.5]) }}
              className="absolute inset-0 rounded-2xl bg-primary/30 blur-2xl"
            />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--teal-dark))] flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-background">
              <Icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="absolute -top-2 -right-2 text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-background border border-border text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT column */}
      <div className="hidden md:block relative">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ChapterContent chapter={chapter} align="left" />
            {/* Connector line from rail to content */}
            <motion.div
              style={{ scaleX: connectorX, transformOrigin: "left" }}
              className="absolute top-3 left-0 h-px w-12 -translate-x-full bg-gradient-to-r from-primary/60 to-transparent"
            />
          </motion.div>
        )}
      </div>

      {/* MOBILE single-column */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="md:hidden"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(var(--teal-dark))] flex items-center justify-center shadow-md">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xs font-bold tracking-wider text-primary">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <ChapterContent chapter={chapter} align="left" />
      </motion.div>
    </div>
  );
}

export default function WhyItMattersScroller() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressY = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.3 });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">
            Why It Matters
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5 leading-tight">
            Why Alternative Provision matters in{" "}
            <span className="text-gradient-primary">Stoke-on-Trent</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Scroll through the story of how Pathway Academy Zone meets young people where
            they are — from the local picture to the moment a referral begins.
          </p>

          {/* Chapter pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {chapters.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(c.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  if (history.replaceState) history.replaceState(null, "", `#${c.id}`);
                }}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-colors"
              >
                <span className="text-primary/70 mr-1">{String(i + 1).padStart(2, "0")}</span>
                {c.pillLabel}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll content with timeline rail */}
        <div className="relative">
          {/* Vertical rail */}
          <div className="hidden md:block absolute left-[43px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          {/* Animated rail progress */}
          <motion.div
            style={{ scaleY: progressY, transformOrigin: "top" }}
            className="hidden md:block absolute left-[43px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/60 to-transparent"
          />

          {chapters.map((chapter, i) => (
            <ChapterRow key={chapter.id} chapter={chapter} index={i} total={chapters.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
