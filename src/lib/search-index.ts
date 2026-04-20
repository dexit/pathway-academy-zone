import { BLOG_POSTS } from "@/config/data/blog";
import { DETAIL_CONTENT } from "@/config/data/knowledge-hub-detail";

export type SearchItem = {
  title: string;
  description: string;
  url: string;
  type: "Page" | "Guide" | "Blog" | "Policy" | "News" | "FAQ";
  keywords?: string;
};

const STATIC_PAGES: SearchItem[] = [
  { title: "Home", description: "Alternative Education Provision in Staffordshire for young people who need a different approach.", url: "/", type: "Page" },
  { title: "About Us", description: "Our mission, values, and trauma-informed approach to Alternative Provision.", url: "/about", type: "Page" },
  { title: "Our Team", description: "Meet the qualified teachers, mentors, and pastoral specialists behind Pathway Academy Zone.", url: "/team", type: "Page" },
  { title: "Programmes", description: "Academic and vocational learning pathways for KS3 and KS4 learners.", url: "/programmes", type: "Page" },
  { title: "Make a Referral", description: "Start a referral to Pathway Academy Zone — schools, local authorities, social workers, and parents welcome.", url: "/referral", type: "Page" },
  { title: "Safeguarding", description: "Our safeguarding policies, designated leads, and reporting procedures.", url: "/safeguarding", type: "Page" },
  { title: "Outcomes & Impact", description: "Attendance, destinations, and qualifications outcomes for our learners.", url: "/outcomes", type: "Page" },
  { title: "Partners", description: "Local schools, colleges, and organisations we partner with across Staffordshire.", url: "/partners", type: "Page" },
  { title: "Our Centres", description: "Stafford Learning Centre and Pathway Academy Zone facilities.", url: "/centres", type: "Page" },
  { title: "Policies & Documents", description: "Safeguarding, EDI, complaints, behaviour, GDPR, and visitor policies.", url: "/policies", type: "Page" },
  { title: "Careers", description: "Join our team of educators and specialists.", url: "/careers", type: "Page" },
  { title: "Contact", description: "Get in touch with Pathway Academy Zone.", url: "/contact", type: "Page" },
  { title: "Knowledge Hub", description: "Guides, comparisons, and best-practice resources on Alternative Provision.", url: "/knowledge-hub", type: "Page" },
  { title: "Glossary", description: "Alternative Provision terms explained.", url: "/knowledge-hub/glossary", type: "Page" },
  { title: "The Complete Guide to Alternative Provision", description: "Our definitive guide covering the full AP journey from referral triggers to progression routes.", url: "/knowledge-hub/complete-guide", type: "Guide", keywords: "complete guide alternative provision" },
  { title: "Blog", description: "Insights, guides, and updates on Alternative Provision and SEMH support.", url: "/blog", type: "Page" },
  { title: "News", description: "Latest updates, policy news, and announcements from Pathway Academy Zone.", url: "/news", type: "Page" },
  { title: "FAQs", description: "Frequently asked questions about Alternative Provision and Pathway Academy Zone.", url: "/faqs", type: "Page" },
];

const POLICY_ITEMS: SearchItem[] = [
  { title: "Safeguarding Children & Young Person's Policy", description: "Our statutory safeguarding policy.", url: "/policies", type: "Policy", keywords: "safeguarding child protection" },
  { title: "Equality, Diversity & Inclusion Policy", description: "How we uphold equality and inclusion.", url: "/policies", type: "Policy", keywords: "equality diversity inclusion EDI" },
  { title: "Complaints & Compliments Policy", description: "How to raise concerns or feedback.", url: "/policies", type: "Policy", keywords: "complaints feedback" },
  { title: "Learner Behaviour & Conduct Policy", description: "Our behaviour and conduct expectations.", url: "/policies", type: "Policy", keywords: "behaviour conduct discipline" },
  { title: "Safeguarding Information for Visitors", description: "Safeguarding information for all site visitors.", url: "/policies", type: "Policy", keywords: "safeguarding visitors" },
  { title: "Privacy Notice & GDPR Statement", description: "How we handle personal data.", url: "/policies", type: "Policy", keywords: "privacy GDPR data" },
];

const BLOG_ITEMS: SearchItem[] = BLOG_POSTS.map((p) => ({
  title: p.title,
  description: p.excerpt,
  url: `/blog/${p.slug}`,
  type: "Blog",
  keywords: p.category,
}));

const GUIDE_ITEMS: SearchItem[] = Object.entries(DETAIL_CONTENT).map(
  ([key, c]) => ({
    title: c.title,
    description: c.summary,
    url: `/knowledge-hub/${key}`,
    type: "Guide",
    keywords: c.categoryLabel,
  })
);

export const SEARCH_INDEX: SearchItem[] = [
  ...STATIC_PAGES,
  ...GUIDE_ITEMS,
  ...BLOG_ITEMS,
  ...POLICY_ITEMS,
];

export function searchAll(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return SEARCH_INDEX.map((item) => {
    const haystack = (
      item.title +
      " " +
      item.description +
      " " +
      (item.keywords || "")
    ).toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (!haystack.includes(term)) return { item, score: 0 };
      if (item.title.toLowerCase().includes(term)) score += 5;
      if ((item.keywords || "").toLowerCase().includes(term)) score += 2;
      score += 1;
    }
    return { item, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
