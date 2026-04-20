import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Download, ArrowRight, Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Seo from "@/components/Seo";
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
    name: "Policies & Documents - Pathway Academy Zone",
    description:
      "Statutory and organisational policies published by Pathway Academy Zone.",
    hasPart: POLICIES.map((p) => ({
      "@type": "DigitalDocument",
      name: p.name,
      description: p.description,
      url: `https://pathwayacademyzone.co.uk/policies/${p.file}`,
      encodingFormat: "application/pdf",
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
        intro="Transparency is important to us. Below you'll find our key statutory and organisational policies. All documents are reviewed annually by our leadership team and governors."
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
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-foreground/80 leading-relaxed">
            All policies are published in PDF format. If you need a document
            in an alternative format (large print, plain text, or paper copy),
            please contact us and we&apos;ll arrange this at no cost.
          </p>
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
            <Input
              type="search"
              placeholder="Search policies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground"
              aria-label="Search policies"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          of {POLICIES.length} policies
        </p>

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
                className="flex items-start justify-between gap-4 bg-card rounded-xl p-6 border border-border/50 hover:shadow-md hover:border-primary/40 transition-all group"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {p.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {p.description}
                    </p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground">
                      {p.category}
                    </span>
                  </div>
                </div>
                <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-border bg-card">
            <p className="text-muted-foreground text-base mb-4">
              No policies match your filter.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveCategory(ALL);
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <div className="rounded-2xl bg-muted/50 border border-border p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              Need a Different Document?
            </h2>
            <p className="text-muted-foreground">
              If you need a policy that isn&apos;t listed here, or would like a
              paper copy, please contact us.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <Link to="/contact">
              Contact Us <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </ArchiveLayout>
    </>
  );
}
