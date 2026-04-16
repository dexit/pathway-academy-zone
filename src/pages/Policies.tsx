import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowRight, Info } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const policies = [
  {
    name: "Safeguarding Children & Young Person's Policy",
    file: "Safeguarding-Children-Young-Persons-Policy.pdf",
    description:
      "Our statutory policy covering safeguarding, child protection, designated leads, and reporting procedures.",
  },
  {
    name: "Equality, Diversity & Inclusion Policy",
    file: "Equality-Diversity-Inclusion-Policy.pdf",
    description:
      "How we uphold equality, celebrate diversity, and ensure every learner is included.",
  },
  {
    name: "Complaints & Compliments Policy",
    file: "Complaints-Compliments-Policy.pdf",
    description:
      "The process for raising concerns, making complaints, or sharing positive feedback.",
  },
  {
    name: "Learner Behaviour & Conduct Policy",
    file: "Learner-Behaviour-Conduct-Policy.pdf",
    description:
      "Our relational, restorative approach to behaviour and learner conduct expectations.",
  },
  {
    name: "Safeguarding Information for Visitors",
    file: "Safeguarding-Information-Visitors.pdf",
    description:
      "Essential safeguarding information for contractors, volunteers, and all site visitors.",
  },
  {
    name: "Privacy Notice & GDPR Statement",
    file: "Privacy-Notice-GDPR.pdf",
    description:
      "How we collect, use, store, and protect personal data in line with UK GDPR.",
  },
];

export default function Policies() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Policies & Documents - Pathway Academy Zone",
    description:
      "Statutory and organisational policies published by Pathway Academy Zone.",
    hasPart: policies.map((p) => ({
      "@type": "DigitalDocument",
      name: p.name,
      description: p.description,
      url: `https://pathwayacademyzone.co.uk/policies/${p.file}`,
      encodingFormat: "application/pdf",
    })),
  };

  return (
    <Layout>
      <Seo
        title="Policies & Documents"
        description="Download our key policies including safeguarding, EDI, complaints, behaviour, visitor safeguarding, and GDPR."
        jsonLd={jsonLd}
      />

      <section className="py-24 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Policies" }]} className="mb-6" />
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Policies
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Policies & Documents
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Transparency is important to us. Below you&apos;ll find our key
              statutory and organisational policies available for download. All
              documents are reviewed annually by our leadership team and
              governors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 mb-8">
            <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              All policies are published in PDF format. If you need a document
              in an alternative format (large print, plain text, or paper
              copy), please contact us and we&apos;ll arrange this at no cost.
            </p>
          </div>
          <div className="space-y-4">
            {policies.map((p, i) => (
              <motion.a
                key={p.name}
                href={`https://pathwayacademyzone.co.uk/policies/${p.file}`}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start justify-between gap-4 bg-card rounded-xl p-6 border border-border/50 hover:shadow-md transition-shadow group"
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
                  </div>
                </div>
                <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Need a Different Document?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            If you need a policy that isn&apos;t listed here, or would like a
            paper copy, please contact us.
          </p>
          <Button asChild>
            <Link to="/contact">
              Contact Us <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
