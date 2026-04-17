import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { Button } from "@/components/ui/button";

type NewsItem = {
  date: string;
  iso: string;
  title: string;
  summary: string;
  tag: string;
  href: string;
};

const NEWS: NewsItem[] = [
  {
    date: "12 March 2026",
    iso: "2026-03-12",
    title: "Pathway Academy Zone awarded Staffordshire AP Directory status",
    summary:
      "Following our latest quality review, we are proud to confirm our renewed place on the Staffordshire Alternative Provision Directory for another 12 months.",
    tag: "Announcement",
    href: "/news",
  },
  {
    date: "24 February 2026",
    iso: "2026-02-24",
    title: "New vocational partnership with South Staffordshire College",
    summary:
      "Our Key Stage 4 learners can now access Level 1 construction, engineering, and motor vehicle taster programmes from September.",
    tag: "Partnership",
    href: "/news",
  },
  {
    date: "8 January 2026",
    iso: "2026-01-08",
    title: "DfE publishes updated AP performance framework",
    summary:
      "We summarise the key changes for commissioners and explain how our outcomes data already aligns with the new framework.",
    tag: "Policy",
    href: "/news",
  },
  {
    date: "15 December 2025",
    iso: "2025-12-15",
    title: "Winter safeguarding arrangements and contact details",
    summary:
      "Details of our designated safeguarding lead cover over the Christmas period and emergency out-of-hours contact numbers.",
    tag: "Safeguarding",
    href: "/news",
  },
  {
    date: "3 November 2025",
    iso: "2025-11-03",
    title: "Attendance up 11% across our KS4 cohort this term",
    summary:
      "Our autumn term attendance data shows continued progress, with a notable lift in our SEMH pathway cohort.",
    tag: "Outcomes",
    href: "/news",
  },
  {
    date: "18 September 2025",
    iso: "2025-09-18",
    title: "Back to school: our induction week in pictures",
    summary:
      "Meet our new Year 10 and Year 11 cohorts as they complete induction and begin their personalised learning plans.",
    tag: "Life at Pathway",
    href: "/news",
  },
];

export default function News() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News - Pathway Academy Zone",
    hasPart: NEWS.map((n) => ({
      "@type": "NewsArticle",
      headline: n.title,
      datePublished: n.iso,
      description: n.summary,
      publisher: { "@type": "Organization", name: "Pathway Academy Zone" },
    })),
  };

  return (
    <Layout>
      <Seo
        title="News & Announcements"
        description="Latest news, policy updates, partnerships, and announcements from Pathway Academy Zone."
        jsonLd={jsonLd}
      />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Breadcrumbs
            items={[{ label: "News" }]}
            className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Pathway Academy Zone
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            News & Announcements
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
            Policy updates, partnership news, safeguarding notices, and life at
            Pathway Academy Zone.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-10 md:py-16">
        <ul className="space-y-5 max-w-3xl">
          {NEWS.map((item) => (
            <li
              key={item.title}
              className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3 text-xs">
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={item.iso}>{item.date}</time>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                {item.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {item.summary}
              </p>
            </li>
          ))}
        </ul>

        <div className="max-w-3xl mt-12 rounded-2xl bg-muted/50 border border-border p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              Looking for longer reads?
            </h2>
            <p className="text-muted-foreground">
              Our Blog and Knowledge Hub contain in-depth guides and articles.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button asChild variant="outline">
              <Link to="/blog">Blog</Link>
            </Button>
            <Button asChild>
              <Link to="/knowledge-hub">
                Knowledge Hub <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
