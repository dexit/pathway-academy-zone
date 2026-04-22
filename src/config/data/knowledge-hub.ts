import { BookOpen, Shield, Users, Lightbulb } from "lucide-react"

export const HUB_SECTIONS = [
  {
    id: "understanding-ap",
    title: "Understanding Alternative Provision",
    description: "New to AP? Start here to learn the basics, legal duties, and how it differs from mainstream education.",
    icon: BookOpen,
    resources: [
      { title: "What is Alternative Provision?", href: "/knowledge-hub/understanding-ap/what-is-ap" },
      { title: "The Legal Framework for AP", href: "/knowledge-hub/understanding-ap/legal-framework" },
      { title: "Who is AP for?", href: "/knowledge-hub/understanding-ap/who-is-ap-for" },
    ],
  },
  {
    id: "referral-best-practice",
    title: "Referral & Commissioning",
    description: "Guides for schools and Local Authorities on how to identify needs and commission the right provision.",
    icon: Users,
    resources: [
      { title: "When to refer a student", href: "/knowledge-hub/referral-best-practice/when-to-refer" },
      { title: "Effective commissioning guide", href: "/knowledge-hub/referral-best-practice/effective-commissioning" },
    ],
  },
  {
    id: "safeguarding-wellbeing",
    title: "Safeguarding & Wellbeing",
    description: "Trauma-informed practice, mental health support, and keeping young people safe in specialized settings.",
    icon: Shield,
    resources: [
      { title: "Trauma-informed approaches", href: "/knowledge-hub/safeguarding-wellbeing/trauma-informed" },
      { title: "SEMH support strategies", href: "/knowledge-hub/safeguarding-wellbeing/semh-strategies" },
    ],
  },
  {
    id: "best-practice",
    title: "Best Practice & Innovation",
    description: "Evidence-based research and innovative models for the future of Alternative Provision.",
    icon: Lightbulb,
    resources: [
      { title: "Vocational integration models", href: "/knowledge-hub/best-practice/vocational-models" },
      { title: "The future of AP 2025", href: "/knowledge-hub/best-practice/future-of-ap" },
    ],
  },
]
