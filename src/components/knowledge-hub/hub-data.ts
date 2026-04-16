import { BookOpen, GitCompare, Star, BookMarked } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type HubResource = {
  title: string
  href: string
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
    color: "text-accent",
    resources: [
      { title: "What is Alternative Provision", href: "/knowledge-hub/guides/what-is-alternative-provision" },
      { title: "How AP Works in Staffordshire", href: "/knowledge-hub/guides/how-ap-works-staffordshire" },
      { title: "When to Refer a Learner", href: "/knowledge-hub/guides/when-to-refer" },
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
      { title: "AP vs Mainstream Schooling", href: "/knowledge-hub/comparisons/ap-vs-mainstream" },
      { title: "Group vs One-to-One", href: "/knowledge-hub/comparisons/group-vs-one-to-one" },
      { title: "Short-Term vs Long-Term", href: "/knowledge-hub/short-vs-long-term" },
    ],
  },
  {
    id: "best-practice",
    title: "Best Practice",
    description:
      "Evidence-based strategies and proven approaches for achieving the best outcomes in Alternative Provision settings.",
    icon: Star,
    color: "text-accent",
    resources: [
      { title: "SEMH Pathways", href: "/knowledge-hub/best-practice/semh-pathways" },
      { title: "Attendance Strategies", href: "/knowledge-hub/best-practice/attendance-strategies" },
      { title: "Vocational Routes", href: "/knowledge-hub/best-practice/vocational-routes" },
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
      { title: "Alternative Provision", href: "/knowledge-hub/glossary#alternative-provision" },
      { title: "SEMH", href: "/knowledge-hub/glossary#semh" },
      { title: "EHCP", href: "/knowledge-hub/glossary#ehcp" },
      { title: "Managed Move", href: "/knowledge-hub/glossary#managed-move" },
    ],
  },
]
