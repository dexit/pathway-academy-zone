import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
<<<<<<< HEAD
import { ContentSidebar } from "@/components/ContentSidebar";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
=======
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/lib/json-ld";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const dslPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/team#martin-chandler`,
  name: "Martin Chandler",
  jobTitle: "Designated Safeguarding Lead",
  url: `${SITE_URL}/team#martin-chandler`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  affiliation: { "@type": "EducationalOrganization", name: SITE_NAME, sameAs: SITE_URL },
  image: "https://pathwayacademyzone.co.uk/assets/martin-chandler-DvF3rkDn.png",
};

const safeguardingSchema = [ORG_SCHEMA, WEBSITE_SCHEMA, dslPerson];
const commitments = ["All staff complete enhanced DBS checks and receive regular safeguarding training","We maintain clear reporting procedures and work closely with local safeguarding partners","Young people are taught to recognise risks and know who to talk to if they feel unsafe"];
const pastoral = [
  { title: "Trauma-Informed Practice", desc: "All staff are trained in trauma-informed approaches, understanding how adverse experiences affect behaviour and learning." },
  { title: "Key Worker System", desc: "Every young person has a dedicated key worker who knows them well and advocates for their needs." },
  { title: "Family Support", desc: "We work closely with families, offering regular communication and support to address challenges together." },
  { title: "Multi-Agency Working", desc: "We collaborate with external agencies including CAMHS, social care, and specialist services." },
];
const policies = ["Child Protection & Safeguarding Policy","Online Safety Policy","Anti-Bullying Policy","Behaviour & Positive Relationships Policy","Safer Recruitment Policy","Whistleblowing Policy"];
>>>>>>> origin/main

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
<<<<<<< HEAD
      <Seo title="Safeguarding & Pastoral Care" description="Keeping young people safe is our highest priority." jsonLd={jsonLd} />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Safeguarding" }]} className="text-primary-foreground/70 mb-6" />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Safeguarding</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Keeping young people safe is our highest priority. We maintain a robust, trauma-informed safeguarding culture.
            </p>
=======
      <Seo
        title="Safeguarding"
        description="Safeguarding is at the heart of everything we do at Pathway Academy Zone. Learn about our Designated Safeguarding Lead, policies, and trauma-informed approach to keeping young people safe."
        jsonLd={safeguardingSchema}
      />
      <section className="py-32 bg-muted/30"><div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Support & Safeguarding</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Keeping Young People Safe</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Safeguarding is everyone's responsibility. We maintain the highest standards to ensure all young people feel safe, supported, and heard.</p>
      </div></section>
      <section className="py-4 bg-background"><div className="container mx-auto px-4"><Breadcrumbs items={[{ label: "Safeguarding" }]} /></div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-4xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
          <div className="mx-auto md:mx-0"><img src="https://pathwayacademyzone.co.uk/assets/martin-chandler-DvF3rkDn.png" alt="Martin Chandler — Designated Safeguarding Lead" className="w-48 h-48 rounded-2xl object-cover shadow-lg" width="192" height="192" loading="lazy" decoding="async" /></div>
          <div>
            <h2 className="font-display text-lg text-muted-foreground mb-1">Our Designated Safeguarding Lead</h2>
            <h3 className="font-display text-2xl font-bold text-foreground mb-1">Martin Chandler</h3>
            <p className="text-primary font-medium text-sm mb-4">Designated Safeguarding Lead</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Martin leads our safeguarding practice and is the first point of contact for any safeguarding concerns. He works closely with external agencies and ensures all staff receive regular safeguarding training.</p>
            <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20"><p className="text-sm font-medium text-foreground"><strong>Urgent Safeguarding Concerns</strong></p><p className="text-sm text-muted-foreground">Contact Martin directly by email on <strong>martin.chandler@pathwayacademyzone.co.uk</strong></p></div>
>>>>>>> origin/main
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
