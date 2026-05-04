import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { ContentSidebar } from "@/components/ContentSidebar";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Safeguarding() {
  const toc = [
    { id: "dsl", label: "Our DSL", level: 2 as const },
    { id: "commitment", label: "Our Commitment", level: 2 as const },
    { id: "policies", label: "Key Policies", level: 2 as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Safeguarding & Pastoral Care",
    "description": "Keeping young people safe is our highest priority at Pathway Academy Zone.",
    "url": `${SITE_URL}/safeguarding`,
  };

  return (
    <Layout>
      <Seo title="Safeguarding & Pastoral Care" description="Keeping young people safe is our highest priority." jsonLd={jsonLd} />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Safeguarding" }]} className="text-primary-foreground/70 mb-6" />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Safeguarding</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Keeping young people safe is our highest priority. We maintain a robust, trauma-informed safeguarding culture.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <div className="space-y-16">
            <section id="dsl" className="scroll-mt-24">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Designated Safeguarding Lead</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">Martin Chandler leads our safeguarding practice and is the first point of contact for any concerns.</p>
              </motion.div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              { label: "Download Policies", description: "Full safeguarding documents", href: "/policies", tone: "primary" },
              { label: "Contact DSL", description: "Speak with Martin Chandler", href: "/contact" },
            ]}
            quickContact={{ phone: "01782 365365", email: "info@pathwayacademyzone.co.uk" }}
          />
        </div>
      </div>
    </Layout>
  );
}
