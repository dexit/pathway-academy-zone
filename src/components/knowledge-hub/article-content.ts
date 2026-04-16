export type ArticleSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type Article = {
  slug: string; // full path segment after /knowledge-hub/
  category: string; // display
  categoryId: string; // section id for breadcrumb link
  title: string;
  description: string;
  updated: string;
  readTime: string;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  // Complete Guide (featured, standalone)
  {
    slug: "complete-guide",
    category: "Featured Resource",
    categoryId: "",
    title: "The Complete Guide to Alternative Provision",
    description:
      "A definitive guide covering the full Alternative Provision journey from referral triggers to progression routes.",
    updated: "January 2025",
    readTime: "18 min read",
    sections: [
      {
        paragraphs: [
          "Alternative Provision (AP) is education arranged for pupils who, because of exclusion, illness, or other reasons, would not otherwise receive suitable schooling. For many young people in Staffordshire, AP is the difference between disengagement and a meaningful pathway back into learning, training, or employment.",
          "This guide walks through every stage of the AP journey: understanding the legal duty, recognising the early signs a learner needs support, making a robust referral, the shape of a high-quality placement, and planning for sustainable progression.",
        ],
      },
      {
        heading: "Who AP is for",
        paragraphs: [
          "AP supports pupils in Key Stage 3 and 4 whose needs cannot currently be met in mainstream school. Common reasons include permanent exclusion, persistent absence linked to anxiety or SEMH needs, managed moves, and medical or safeguarding concerns.",
        ],
      },
      {
        heading: "What high-quality AP looks like",
        list: [
          "Trauma-informed, relational practice as the foundation of every interaction",
          "Small group sizes with qualified teachers and pastoral specialists",
          "Personalised learning plans tied to EHCPs and mainstream curriculum where possible",
          "Robust safeguarding and weekly multi-agency oversight",
          "A clear progression plan from day one, whether reintegration, post-16 or employment",
        ],
      },
      {
        heading: "How to refer to Pathway Academy Zone",
        paragraphs: [
          "Referrals are accepted from schools, local authorities, social workers, and families. Our team reviews every referral within 48 hours, completes an assessment, and agrees a placement plan with everyone who supports the young person.",
        ],
      },
    ],
  },

  // Core Guides
  {
    slug: "guides/what-is-alternative-provision",
    category: "Core Guides",
    categoryId: "core-guides",
    title: "What is Alternative Provision?",
    description:
      "A plain-English explanation of Alternative Provision, who it serves, and how it sits within the wider education system.",
    updated: "January 2025",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Alternative Provision (AP) is a statutory form of education for pupils who cannot access mainstream school. It is commissioned by local authorities or by schools themselves under sections 19 and 29A of the Education Act 1996.",
        ],
      },
      {
        heading: "Who attends AP",
        list: [
          "Pupils who have been permanently excluded",
          "Pupils at risk of exclusion whose school commissions early-intervention AP",
          "Pupils unable to attend mainstream due to medical, SEMH or safeguarding reasons",
          "Pupils transitioning through a managed move",
        ],
      },
      {
        heading: "What AP provides",
        paragraphs: [
          "High-quality AP delivers a full curriculum entitlement, access to accredited qualifications (GCSE and vocational), pastoral and therapeutic support, and a named key adult for every learner.",
        ],
      },
    ],
  },
  {
    slug: "guides/how-ap-works-staffordshire",
    category: "Core Guides",
    categoryId: "core-guides",
    title: "How Alternative Provision Works in Staffordshire",
    description:
      "Understand the commissioning routes, quality assurance, and key partners behind AP placements in Staffordshire.",
    updated: "January 2025",
    readTime: "7 min read",
    sections: [
      {
        paragraphs: [
          "Staffordshire County Council commissions AP through a combination of direct placements, the Inclusion Hub, and school-led spot purchasing. Pathway Academy Zone works with all three routes.",
        ],
      },
      {
        heading: "Commissioning routes",
        list: [
          "Local authority direct placement for permanently excluded pupils",
          "School commissioning for early-intervention and dual-roll placements",
          "Social care and YOT commissioning for looked-after and justice-involved young people",
        ],
      },
      {
        heading: "Quality assurance",
        paragraphs: [
          "All commissioned providers must sit on the Staffordshire AP Directory, meet the DfE's AP performance framework, and submit to regular safeguarding and attendance audits.",
        ],
      },
    ],
  },
  {
    slug: "guides/high-quality-ap-provider",
    category: "Core Guides",
    categoryId: "core-guides",
    title: "What Makes a High-Quality AP Provider?",
    description:
      "The markers of a strong Alternative Provision setting — and the red flags to avoid when commissioning.",
    updated: "January 2025",
    readTime: "6 min read",
    sections: [
      {
        heading: "Green flags",
        list: [
          "Clear safeguarding lead and daily attendance tracking shared with commissioners",
          "Ofsted-registered or on the local authority approved list",
          "Measured outcomes: attendance, progression, qualification gains",
          "Qualified teaching staff and DBS-checked support workers",
          "Transparent governance and published policies",
        ],
      },
      {
        heading: "Red flags",
        list: [
          "No named designated safeguarding lead",
          "No curriculum beyond worksheet-based numeracy and literacy",
          "No published outcomes or destinations data",
          "Reluctance to share attendance or behaviour logs",
        ],
      },
    ],
  },
  {
    slug: "guides/when-to-refer",
    category: "Core Guides",
    categoryId: "core-guides",
    title: "When to Refer a Learner",
    description:
      "Recognising the indicators that a young person will benefit from Alternative Provision sooner rather than later.",
    updated: "January 2025",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Early referral transforms outcomes. The longer a pupil spends disengaged, the harder reintegration becomes. These are the key indicators mainstream staff should watch for.",
        ],
      },
      {
        heading: "Clear indicators",
        list: [
          "Attendance has fallen below 85% despite targeted intervention",
          "Repeated fixed-term suspensions within a single term",
          "Escalating SEMH needs that the school SENCo cannot resource alone",
          "A managed move has been agreed but no receiving school is available",
          "EHCP review recommends a specialist setting",
        ],
      },
    ],
  },
  {
    slug: "guides/academic-vs-vocational",
    category: "Core Guides",
    categoryId: "core-guides",
    title: "Academic vs Vocational Pathways in AP",
    description:
      "How to choose the right blend of academic and vocational study for each young person.",
    updated: "January 2025",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Most Pathway Academy Zone learners follow a blended curriculum. GCSE English, Maths, and Science remain at the core wherever possible, complemented by vocational qualifications that give purpose and progression.",
        ],
      },
      {
        heading: "Academic strengths",
        list: [
          "Keeps post-16 options open, including A-level and T-level routes",
          "Recognised currency for apprenticeships and employment",
        ],
      },
      {
        heading: "Vocational strengths",
        list: [
          "Practical, hands-on learning re-engages pupils who have lost trust in school",
          "Direct line of sight to employment and further training",
          "Builds confidence through applied success",
        ],
      },
    ],
  },

  // Comparisons
  {
    slug: "comparisons/ap-vs-mainstream",
    category: "Comparisons",
    categoryId: "comparisons",
    title: "AP vs Mainstream Schooling",
    description:
      "Side-by-side: how Alternative Provision differs from mainstream school in curriculum, ratios, and support.",
    updated: "January 2025",
    readTime: "5 min read",
    sections: [
      {
        heading: "Mainstream",
        list: [
          "Class sizes typically 28-32",
          "Full 10-subject curriculum",
          "Standard pastoral structure",
        ],
      },
      {
        heading: "Alternative Provision",
        list: [
          "Class sizes typically 4-8",
          "Core subjects plus bespoke vocational and therapeutic input",
          "Daily check-ins, named key adult, embedded safeguarding",
        ],
      },
      {
        paragraphs: [
          "AP is not a lesser education — it is a different model designed for pupils who need more intensive relational and therapeutic support alongside their learning.",
        ],
      },
    ],
  },
  {
    slug: "comparisons/group-vs-one-to-one",
    category: "Comparisons",
    categoryId: "comparisons",
    title: "Group vs One-to-One Provision",
    description:
      "When small-group AP is the right fit and when a 1:1 package works better.",
    updated: "January 2025",
    readTime: "4 min read",
    sections: [
      {
        heading: "Small group (4-8 learners)",
        list: [
          "Peer modelling and social reintegration",
          "Cost-effective for commissioners",
          "Suits most SEMH and at-risk-of-exclusion learners",
        ],
      },
      {
        heading: "One-to-one",
        list: [
          "High-anxiety learners unable to tolerate groups initially",
          "Short-term intensive bridging before a group placement",
          "EHCP-specified individualised packages",
        ],
      },
    ],
  },
  {
    slug: "comparisons/short-vs-long-term",
    category: "Comparisons",
    categoryId: "comparisons",
    title: "Short-Term vs Long-Term Placements",
    description:
      "Matching placement length to the young person's needs and progression plan.",
    updated: "January 2025",
    readTime: "4 min read",
    sections: [
      {
        heading: "Short-term (up to 12 weeks)",
        paragraphs: [
          "Typically used as a bridging or assessment placement. The goal is re-engagement and a clear onward plan — usually reintegration to mainstream or a named long-term setting.",
        ],
      },
      {
        heading: "Long-term (2-4 terms)",
        paragraphs: [
          "Used where the young person needs time to rebuild trust and achieve accredited outcomes. Includes full Key Stage 4 placements culminating in GCSE and vocational qualifications.",
        ],
      },
    ],
  },
  {
    slug: "comparisons/onsite-vs-offsite",
    category: "Comparisons",
    categoryId: "comparisons",
    title: "Onsite vs Offsite AP",
    description:
      "The trade-offs between school-based and independent offsite AP models.",
    updated: "January 2025",
    readTime: "5 min read",
    sections: [
      {
        heading: "Onsite (within the commissioning school)",
        list: [
          "Maintains mainstream identity and friendships",
          "Easier reintegration pathway",
          "Limited therapeutic resource",
        ],
      },
      {
        heading: "Offsite (independent provider)",
        list: [
          "Dedicated therapeutic and vocational resource",
          "Complete change of environment for pupils who need a fresh start",
          "Requires strong communication with the home school",
        ],
      },
    ],
  },

  // Best Practice
  {
    slug: "best-practice/semh-pathways",
    category: "Best Practice",
    categoryId: "best-practice",
    title: "SEMH Pathways",
    description:
      "Designing Social, Emotional and Mental Health pathways that build regulation, relationships, and re-engagement.",
    updated: "January 2025",
    readTime: "7 min read",
    sections: [
      {
        paragraphs: [
          "Most learners entering AP present with SEMH needs. A structured SEMH pathway centres regulation before it asks for performance.",
        ],
      },
      {
        heading: "Core components",
        list: [
          "Daily regulation check-ins and sensory breaks",
          "Named key adult relationships",
          "Weekly therapeutic input from trained staff or external practitioners",
          "Restorative practice embedded in behaviour response",
          "Parent and carer partnership meetings each half-term",
        ],
      },
    ],
  },
  {
    slug: "best-practice/attendance-strategies",
    category: "Best Practice",
    categoryId: "best-practice",
    title: "Attendance Strategies That Work",
    description:
      "Proven strategies for lifting attendance in Alternative Provision settings.",
    updated: "January 2025",
    readTime: "6 min read",
    sections: [
      {
        heading: "Before enrolment",
        list: [
          "Home visit to build trust with the young person and family",
          "Agreed soft-start timetable for the first two weeks",
          "Transport planning and barriers audit",
        ],
      },
      {
        heading: "Once attending",
        list: [
          "First-day calls within 20 minutes of any absence",
          "Attendance tracked daily and shared with the commissioner weekly",
          "Rewards tied to incremental gains, not only 100% attendance",
        ],
      },
    ],
  },
  {
    slug: "best-practice/vocational-routes",
    category: "Best Practice",
    categoryId: "best-practice",
    title: "Vocational Routes in AP",
    description:
      "Building vocational pathways that lead to real apprenticeships, college places, and employment.",
    updated: "January 2025",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Vocational qualifications give AP learners a visible pathway to employment. The best programmes partner directly with local employers and FE colleges.",
        ],
      },
      {
        heading: "Popular routes",
        list: [
          "Construction and trades (BTEC Level 1/2)",
          "Motor vehicle and engineering",
          "Hair, beauty, and hospitality",
          "Animal care and land-based studies",
          "Digital and creative media",
        ],
      },
    ],
  },
  {
    slug: "best-practice/post-16-progression",
    category: "Best Practice",
    categoryId: "best-practice",
    title: "Post-16 Progression from AP",
    description:
      "Supporting AP learners into sustained post-16 education, training, and employment.",
    updated: "January 2025",
    readTime: "6 min read",
    sections: [
      {
        heading: "Progression planning timeline",
        list: [
          "Year 10 summer: interests and aptitudes review",
          "Year 11 autumn: first college and apprenticeship visits",
          "Year 11 spring: applications submitted, transition support begins",
          "Year 11 summer: transition days at the receiving setting",
          "Year 12 first term: Pathway Academy Zone follow-up calls to reduce NEET risk",
        ],
      },
    ],
  },
];

export const ARTICLES_BY_PATH: Record<string, Article> = Object.fromEntries(
  ARTICLES.map((a) => [a.slug, a])
);

export function getArticle(pathSegments: string[]): Article | undefined {
  const key = pathSegments.filter(Boolean).join("/");
  return ARTICLES_BY_PATH[key];
}
