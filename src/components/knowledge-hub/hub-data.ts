import { BookOpen, GitCompare, Star, BookMarked } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type HubResource = {
  title: string
  href: string
  description?: string
}

export type HubSection = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  resources: HubResource[]
}

export const HUB_SECTIONS: HubSection[] = [
  {
    id: "core-guides",
    title: "Core Guides",
    description:
      "Essential guides explaining Alternative Provision fundamentals, processes, and pathways for educators, parents, and referring professionals.",
    icon: BookOpen,
    color: "text-primary",
    resources: [
      { title: "What is Alternative Provision", href: "/knowledge-hub/guides/what-is-alternative-provision", description: "A comprehensive overview of AP — who it's for, how it differs from mainstream schooling, and what good provision looks like." },
      { title: "How AP Works in Staffordshire", href: "/knowledge-hub/guides/how-ap-works-staffordshire", description: "A local guide to the Staffordshire AP landscape — types of provision, the referral process, and key contacts in the region." },
      { title: "High-Quality AP Provider", href: "/knowledge-hub/guides/high-quality-ap-provider", description: "What to look for when commissioning Alternative Provision — safeguarding standards, staffing quality, and outcome transparency." },
      { title: "When to Refer a Learner", href: "/knowledge-hub/guides/when-to-refer", description: "Practical guidance for SENCOs and inclusion leads on identifying the right moment to refer a young person to AP." },
      { title: "Academic vs Vocational", href: "/knowledge-hub/guides/academic-vs-vocational", description: "Side-by-side comparison of academic re-engagement and vocational pathways to help you choose the right route for each learner." },
    ],
  },
  {
    id: "comparisons",
    title: "Comparisons",
    description:
      "Side-by-side comparisons to help decision-makers understand the differences between various AP models and approaches.",
    icon: GitCompare,
    color: "text-primary",
    resources: [
      { title: "AP vs Mainstream Schooling", href: "/knowledge-hub/comparisons/ap-vs-mainstream", description: "How Alternative Provision differs from mainstream school — class sizes, staffing ratios, curriculum flexibility, and pastoral intensity." },
      { title: "Group vs One-to-One", href: "/knowledge-hub/comparisons/group-vs-one-to-one", description: "When small group provision is the right choice versus intensive one-to-one support — and how to transition between the two." },
      { title: "Short-Term vs Long-Term", href: "/knowledge-hub/comparisons/short-vs-long-term", description: "The difference between short intervention placements (6–12 weeks) and long-term programmes through to qualifications and transition." },
      { title: "Onsite vs Offsite", href: "/knowledge-hub/comparisons/onsite-vs-offsite", description: "Comparing internal school units with off-site specialist settings — fresh start benefits, reintegration ease, and specialist resource access." },
    ],
  },
  {
    id: "best-practice",
    title: "Best Practice",
    description:
      "Evidence-based strategies and proven approaches for achieving the best outcomes in Alternative Provision settings.",
    icon: Star,
    color: "text-primary",
    resources: [
      { title: "SEMH Pathways", href: "/knowledge-hub/best-practice/semh-pathways", description: "Evidence-based strategies for supporting learners with social, emotional and mental health needs — trauma-informed practice and therapeutic integration." },
      { title: "Attendance Strategies", href: "/knowledge-hub/best-practice/attendance-strategies", description: "Proven approaches to improving attendance in AP settings, from flexible start times and transport support to relationship-based re-engagement." },
      { title: "Vocational Routes", href: "/knowledge-hub/best-practice/vocational-routes", description: "The most effective vocational pathways for disengaged learners — construction, motor vehicle, catering, and how to link to apprenticeship progression." },
      { title: "Post-16 Progression", href: "/knowledge-hub/best-practice/post-16-progression", description: "Planning successful transitions after AP — college, apprenticeships, traineeships, and how to prevent NEET outcomes through early planning." },
    ],
  },
  {
    id: "glossary",
    title: "Glossary",
    description:
      "Clear definitions of key Alternative Provision terms and concepts for quick reference and understanding.",
    icon: BookMarked,
    color: "text-primary",
    resources: [
      { title: "Alternative Provision", href: "/knowledge-hub/glossary#alternative-provision", description: "The statutory definition of AP and how it differs from mainstream and special school settings." },
      { title: "SEMH", href: "/knowledge-hub/glossary#semh", description: "Social, Emotional and Mental Health — the SEN category covering difficulties that affect a young person's ability to learn and engage." },
      { title: "EHCP", href: "/knowledge-hub/glossary#ehcp", description: "Education, Health and Care Plan — the legal document describing complex SEN needs and the support required to meet them." },
      { title: "Managed Move", href: "/knowledge-hub/glossary#managed-move", description: "A voluntary transfer between schools as an alternative to permanent exclusion, giving pupils a fresh start without an exclusion record." },
    ],
  },
]
