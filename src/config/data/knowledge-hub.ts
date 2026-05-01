import { BookOpen, GitCompare, Star, BookMarked, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type HubResource = {
  title: string
  href: string
  summary?: string
  readTime?: string
  statutory?: boolean
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
      "Essential guides explaining Alternative Provision fundamentals, legal duties, and regional commissioning frameworks.",
    icon: BookOpen,
    color: "text-primary",
    resources: [
      {
        title: "What is Alternative Provision",
        href: "/knowledge-hub/guides/what-is-alternative-provision",
        summary: "Statutory definitions and the role of AP in the UK education system.",
        readTime: "8 min",
        statutory: true
      },
      {
        title: "How AP Works in Staffordshire",
        href: "/knowledge-hub/guides/how-ap-works-staffordshire",
        summary: "Local referral pathways, the AP directory, and regional quality standards.",
        readTime: "6 min"
      },
      {
        title: "High-Quality AP Provider",
        href: "/knowledge-hub/guides/high-quality-ap-provider",
        summary: "A framework for schools and LAs to evaluate the effectiveness of provision.",
        readTime: "10 min",
        statutory: true
      },
      {
        title: "When to Refer a Learner",
        href: "/knowledge-hub/guides/when-to-refer",
        summary: "Proactive identification of need and triggers for specialized intervention.",
        readTime: "5 min"
      },
      {
        title: "Academic vs Vocational",
        href: "/knowledge-hub/guides/academic-vs-vocational",
        summary: "Navigating curriculum choices to maximize engagement and qualification outcomes.",
        readTime: "7 min"
      },
    ],
  },
  {
    id: "comparisons",
    title: "Comparisons",
    description:
      "Strategic comparisons to help commissioners and families select the most appropriate model of support.",
    icon: GitCompare,
    color: "text-primary",
    resources: [
      {
        title: "AP vs Mainstream Schooling",
        href: "/knowledge-hub/comparisons/ap-vs-mainstream",
        summary: "Understanding the shift in environment, ratio, and pedagogical focus.",
        readTime: "5 min"
      },
      {
        title: "Group vs One-to-One",
        href: "/knowledge-hub/comparisons/group-vs-one-to-one",
        summary: "Balancing social skill development against intensive individual stabilization.",
        readTime: "5 min"
      },
      {
        title: "Short-Term vs Long-Term",
        href: "/knowledge-hub/comparisons/short-vs-long-term",
        summary: "When to use AP as a circuit-breaker vs a sustained educational pathway.",
        readTime: "5 min"
      },
      {
        title: "Onsite vs Offsite",
        href: "/knowledge-hub/comparisons/onsite-vs-offsite",
        summary: "Evaluating the benefits of a complete fresh start in a specialized setting.",
        readTime: "5 min"
      },
    ],
  },
  {
    id: "best-practice",
    title: "Best Practice",
    description:
      "Evidence-led strategies for improving outcomes in SEMH, attendance, and vocational pathways.",
    icon: Star,
    color: "text-primary",
    resources: [
      {
        title: "SEMH Pathways",
        href: "/knowledge-hub/best-practice/semh-pathways",
        summary: "Implementing trauma-informed routines and therapeutic check-ins.",
        readTime: "6 min"
      },
      {
        title: "Attendance Strategies",
        href: "/knowledge-hub/best-practice/attendance-strategies",
        summary: "Relational models for re-engaging persistent absentees.",
        readTime: "6 min"
      },
      {
        title: "Vocational Routes",
        href: "/knowledge-hub/best-practice/vocational-routes",
        summary: "Designing curriculum 'hooks' that build professional identity.",
        readTime: "6 min"
      },
      {
        title: "Post-16 Progression",
        href: "/knowledge-hub/best-practice/post-16-progression",
        summary: "Frameworks for successful transition to FE, apprenticeships, and work.",
        readTime: "6 min"
      },
    ],
  },
  {
    id: "governance",
    title: "Governance & Safety",
    description: "Guidance on regulatory compliance, Ofsted readiness, and robust safeguarding oversight.",
    icon: ShieldCheck,
    color: "text-primary",
    resources: [
      {
        title: "DSL Requirements",
        href: "/knowledge-hub/governance/dsl-requirements",
        summary: "Statutory duties and leadership expectations for safeguarding in AP.",
        readTime: "8 min",
        statutory: true
      },
      {
        title: "Ofsted in AP Settings",
        href: "/knowledge-hub/governance/ofsted-guidance",
        summary: "Interpreting the Education Inspection Framework for specialized settings.",
        readTime: "12 min",
        statutory: true
      },
      {
        title: "Risk Management",
        href: "/knowledge-hub/governance/risk-assessment",
        summary: "Multi-dimensional frameworks for assessing student and site safety.",
        readTime: "7 min"
      },
    ]
  },
  {
    id: "glossary",
    title: "Glossary",
    description:
      "A comprehensive reference of terminology used in the Alternative Provision sector.",
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
