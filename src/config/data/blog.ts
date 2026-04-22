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
]
