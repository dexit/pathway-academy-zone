import { TrendingUp, Target, Users, School, Heart, UserCheck, Shield, BookOpen, MapPin, ClipboardList, Sparkles, GraduationCap, ShieldCheck, PhoneCall } from "lucide-react";

export const stats = [
  { icon: TrendingUp, value: "94%", label: "ATTENDANCE LEVEL UP" },
  { icon: Target, value: "87%", label: "POSITIVE DESTINATIONS" },
  { icon: Users, value: "150+", label: "LIVES TRANSFORMED" },
  { icon: School, value: "12+", label: "ACADEMY PARTNERS" },
];

export const approaches = [
  {
    icon: Heart,
    title: "TRAUMA-FIRST",
    desc: "We don't just see behavior; we see the story behind it. Healing is the first step to learning."
  },
  {
    icon: Target,
    title: "BESPOKE PATHS",
    desc: "Your journey isn't a template. We build the curriculum around your strengths and goals."
  },
  {
    icon: UserCheck,
    title: "MENTOR SQUAD",
    desc: "Experts who actually get it. Our team is here to hold the space you need to grow."
  },
  {
    icon: Shield,
    title: "ELITE SAFETY",
    desc: "Zero compromise on your wellbeing. A sanctuary where you can finally be yourself."
  },
];

export const faqs = [
  {
    q: "What is Alternative Provision?",
    a: "It's education for legends who don't fit the standard mold. A specialized, smaller environment designed for high impact and personal growth."
  },
  {
    q: "Who is this for?",
    a: "Ages 11-16 who are ready for a fresh start. If mainstream isn't working, we are your new home base."
  },
  {
    q: "How fast can I start?",
    a: "We move at light speed. Emergency placements can often launch within 48 hours of assessment."
  }
];

export const latestPosts = [
  {
    title: "The 2025 AP Manifesto",
    excerpt: "Why the old school system is breaking and how we are fixing it for the next generation.",
    date: "20 JAN 2025",
    slug: "ap-manifesto-2025"
  },
  {
    title: "SEMH: The Hidden Power",
    excerpt: "Turning emotional sensitivity into your greatest professional asset.",
    date: "12 JAN 2025",
    slug: "semh-hidden-power"
  }
];

export const whyItMattersChapters = [
  {
    id: "mission",
    eyebrow: "01 — THE MISSION",
    pillLabel: "THE GAP",
    title: "THE SYSTEM ISN'T BROKEN, IT WAS JUST BUILT FOR SOMEONE ELSE.",
    icon: MapPin,
    image: "/assets/why-1-local-picture.jpg",
    imageAlt: "Stoke-on-Trent landscape",
    stat: { value: "100s", label: "AT RISK ANNUALLY" },
    body: "Hundreds of young people in Stoke-on-Trent are left behind by standard environments. High-quality AP is the bridge to their potential.",
  },
  {
    id: "relational",
    eyebrow: "02 — THE VIBE",
    pillLabel: "RELATIONAL",
    title: "DIGNITY OVER DISCIPLINE. RELATIONSHIPS OVER RULES.",
    icon: Heart,
    image: "/assets/why-2-who-we-are.jpg",
    imageAlt: "Relational space",
    stat: { value: "1:1", label: "RADICAL SUPPORT" },
    body: "We hold the relational space young people need to re-engage. We start with safety and dignity, then we tackle the grades.",
  },
  {
    id: "curriculum",
    eyebrow: "03 — THE WORK",
    pillLabel: "FUTURE READY",
    title: "CORE ACADEMICS + CYBER SKILLS + TRADES.",
    icon: GraduationCap,
    image: "/assets/why-4-curriculum.jpg",
    imageAlt: "Curriculum",
    stat: { value: "BTEC", label: "INDUSTRY PATHS" },
    body: "From GCSEs to construction and creative industries. We ensure the academic thread is never broken while building real-world skills.",
  },
];
