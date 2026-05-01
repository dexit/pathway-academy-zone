import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Download, ArrowRight, Info, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo, SITE_URL } from "@/components/Seo";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { FilterPills } from "@/components/FilterPills";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type Policy = {
  name: string;
  file: string;
  description: string;
  category:
    | "Safeguarding"
    | "Inclusion"
    | "Conduct"
    | "Data & Privacy"
    | "Complaints";
};

const POLICIES: Policy[] = [
  {
    name: "Safeguarding Children & Young Person's Policy",
    file: "Safeguarding-Children-Young-Persons-Policy.pdf",
    description:
      "Our statutory policy covering safeguarding, child protection, designated leads, and reporting procedures.",
    category: "Safeguarding",
  },
  {
    name: "Equality, Diversity & Inclusion Policy",
    file: "Equality-Diversity-Inclusion-Policy.pdf",
    description:
      "How we uphold equality, celebrate diversity, and ensure every learner is included.",
    category: "Inclusion",
  },
  {
    name: "Complaints & Compliments Policy",
    file: "Complaints-Compliments-Policy.pdf",
    description:
      "The process for raising concerns, making complaints, or sharing positive feedback.",
    category: "Complaints",
  },
  {
    name: "Learner Behaviour & Conduct Policy",
    file: "Learner-Behaviour-Conduct-Policy.pdf",
    description:
      "Our relational, restorative approach to behaviour and learner conduct expectations.",
    category: "Conduct",
  },
  {
    name: "Safeguarding Information for Visitors",
    file: "Safeguarding-Information-Visitors.pdf",
    description:
      "Essential safeguarding information for contractors, volunteers, and all site visitors.",
    category: "Safeguarding",
  },
  {
    name: "Privacy Notice & GDPR Statement",
    file: "Privacy-Notice-GDPR.pdf",
    description:
      "How we collect, use, store, and protect personal data in line with UK GDPR.",
    category: "Data & Privacy",
  },
];

const ALL = "All";

export default function Policies() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const categories = [ALL, ...Array.from(new Set(POLICIES.map((p) => p.category)))];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POLICIES.filter((p) => {
      const matchesCat =
        activeCategory === ALL || p.category === activeCategory;
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [activeCategory, query]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Policies & Documents - Pathway Academy Zone",
    "description": "Statutory and organisational policies published by Pathway Academy Zone.",
    "url": `${SITE_URL}/policies`,
    "hasPart": POLICIES.map((p) => ({
      "@type": "DigitalDocument",
      "name": p.name,
      "description": p.description,
      "url": `https://pathwayacademyzone.co.uk/policies/${p.file}`,
      "encodingFormat": "application/pdf",
    })),
  };

  return (
    <>
      <Seo
        title="Policies & Documents"
        description="Download our key policies including safeguarding, EDI, complaints, behaviour, visitor safeguarding, and GDPR."
        jsonLd={jsonLd}
      />
      <ArchiveLayout
        crumbs={[{ label: "Policies" }]}
        title="Our Policies & Documents"
        intro="Transparency is important to us. Below you'll find our key statutory and organisational policies. All documents are reviewed annually."
        sidebar={{
          ctas: [
            {
              label: "Safeguarding",
              href: "/safeguarding",
              description: "How we keep every young person safe.",
              tone: "primary",
            },
            {
              label: "Make a Referral",
              href: "/referral",
              description: "Begin the placement process for a young person.",
            },
            {
              label: "Contact Us",
              href: "/contact",
              description: "Request an alternative format or paper copy.",
            },
          ],
          quickContact: {
            phone: "01782 365365",
            email: "info@pathwayacademyzone.co.uk",
          },
        }}
      >
        <div className="flex items-start gap-4 p-6 rounded-[1.5rem] bg-primary/5 border border-primary/10 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm uppercase tracking-widest mb-1">Accessibility</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you need a document in an alternative format (large print, plain text, or paper copy), please contact us and we&apos;ll arrange this at no cost.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <FilterPills
            options={categories}
            active={activeCategory}
            onChange={setActiveCategory}
            ariaLabel="Filter policies by category"
          />
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              aria-label="Search policies"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Results</span>
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-bold text-foreground">{filtered.length}</span> of {POLICIES.length} documents
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((p, i) => (
              <motion.a
                key={p.name}
                href={`https://pathwayacademyzone.co.uk/policies/${p.file}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Download ${p.name} (PDF)`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between gap-6 bg-card rounded-[1.5rem] p-6 border border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="flex items-center gap-5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <FileText className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest bg-muted text-muted-foreground">
                        {p.category}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-primary/60">
                        PDF Document
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-border group-hover:border-primary/40 group-hover:bg-primary/5 transition-all shrink-0">
                  <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-[2rem] border border-dashed border-border/50">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground text-sm mb-6">
              No policies found matching your search.
            </p>
            <Button
              variant="outline"
              className="rounded-full font-bold"
              onClick={() => {
                setActiveCategory(ALL);
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <div className="rounded-[2rem] bg-muted/30 border border-border p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left mt-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Need a different document?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you require a policy that isn&apos;t listed here, or would like a paper copy posted to you, please get in touch with our operations team.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 rounded-full font-bold px-10">
            <Link to="/contact">
              Contact Operations <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </ArchiveLayout>
    </>
  );
}
