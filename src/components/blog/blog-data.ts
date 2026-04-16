export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
  featured?: boolean
  image: string
}

export const CATEGORIES = [
  "All",
  "Alternative Provision",
  "SEMH",
  "Referrals",
  "Parents & Families",
  "Policy & Legislation",
  "Best Practice",
]

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-alternative-provision",
    title: "What Is Alternative Provision? A Complete Overview for 2024",
    excerpt:
      "Alternative Provision covers education for pupils who cannot attend mainstream school. Learn what it involves, who qualifies, and how it supports young people back into learning.",
    category: "Alternative Provision",
    date: "12 Nov 2024",
    readTime: "6 min read",
    author: "Pathway Academy Zone",
    featured: true,
    image: "/placeholder.svg",
  },
  {
    slug: "semh-needs-in-ap",
    title: "Understanding SEMH Needs in Alternative Provision Settings",
    excerpt:
      "Social, Emotional and Mental Health (SEMH) difficulties are among the most common reasons for AP referrals. Discover effective strategies for support and intervention.",
    category: "SEMH",
    date: "4 Nov 2024",
    readTime: "5 min read",
    author: "Pathway Academy Zone",
    image: "/placeholder.svg",
  },
  {
    slug: "when-to-refer-a-learner",
    title: "When Should You Refer a Learner to Alternative Provision?",
    excerpt:
      "Knowing the right time to refer can make all the difference. This guide walks through the key indicators and formal criteria for making a referral in Staffordshire.",
    category: "Referrals",
    date: "28 Oct 2024",
    readTime: "4 min read",
    author: "Pathway Academy Zone",
    image: "/placeholder.svg",
  },
  {
    slug: "parents-guide-to-ap",
    title: "A Parent's Guide to Alternative Provision",
    excerpt:
      "If your child has been referred to Alternative Provision, this guide explains what to expect, what your rights are, and how you can stay involved in their education.",
    category: "Parents & Families",
    date: "21 Oct 2024",
    readTime: "7 min read",
    author: "Pathway Academy Zone",
    image: "/placeholder.svg",
  },
  {
    slug: "ap-policy-changes-2024",
    title: "Key Policy Changes Affecting Alternative Provision in 2024",
    excerpt:
      "Recent DfE guidance has brought significant updates to how schools commission and monitor AP placements. Here is what every SENCo and pastoral lead needs to know.",
    category: "Policy & Legislation",
    date: "14 Oct 2024",
    readTime: "5 min read",
    author: "Pathway Academy Zone",
    image: "/placeholder.svg",
  },
  {
    slug: "reintegration-best-practice",
    title: "Best Practice for Reintegrating Pupils from AP into Mainstream",
    excerpt:
      "Successful reintegration requires careful planning, strong relationships, and clear review processes. Explore the proven approaches that make transitions stick.",
    category: "Best Practice",
    date: "7 Oct 2024",
    readTime: "6 min read",
    author: "Pathway Academy Zone",
    image: "/placeholder.svg",
  },
  {
    slug: "attendance-strategies-ap",
    title: "Improving Attendance in Alternative Provision: Practical Strategies",
    excerpt:
      "Persistent absence is a challenge across all AP settings. Learn how to build trust, remove barriers, and create an environment where young people want to attend.",
    category: "Best Practice",
    date: "30 Sep 2024",
    readTime: "5 min read",
    author: "Pathway Academy Zone",
    image: "/placeholder.svg",
  },
  {
    slug: "vocational-routes-in-ap",
    title: "Vocational Routes in AP: Building Pathways to Employment",
    excerpt:
      "Vocational qualifications can transform outcomes for AP learners. Discover the options available and how to match provision to individual young people's strengths.",
    category: "Alternative Provision",
    date: "23 Sep 2024",
    readTime: "4 min read",
    author: "Pathway Academy Zone",
    image: "/placeholder.svg",
  },
]
