export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  iso: string;
  summary: string;
  tag: string;
  body: string[];
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "new-burslem-centre-opening",
    title: "New Burslem Learning Centre Now Open",
    date: "15 Jan 2025",
    iso: "2025-01-15",
    summary: "We are delighted to announce the opening of our purpose-built learning centre in Burslem.",
    tag: "Announcements",
    body: [
      "Pathway Academy Zone is proud to unveil its newest facility in Burslem, Stoke-on-Trent.",
      "The centre features specialized SEMH breakout rooms, a high-tech IT suite, and modern vocational workshops."
    ]
  },
  {
    slug: "staffordshire-partnership-expanded",
    title: "Staffordshire Education Partnership Expanded",
    date: "10 Jan 2025",
    iso: "2025-01-10",
    summary: "Pathway Academy Zone has expanded its partnership with local authorities.",
    tag: "Partnerships",
    body: [
      "We are increasing our capacity to support more learners through expanded frameworks with local authorities.",
      "This expansion ensures more young people have access to high-quality Alternative Provision."
    ]
  }
];
