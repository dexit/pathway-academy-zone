import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout"
import { ContentSidebar } from "@/components/ContentSidebar"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const commitments = ["All staff complete enhanced DBS checks and receive regular safeguarding training","We maintain clear reporting procedures and work closely with local safeguarding partners","Young people are taught to recognise risks and know who to talk to if they feel unsafe"];
const pastoral = [
  { title: "Trauma-Informed Practice", desc: "All staff are trained in trauma-informed approaches, understanding how adverse experiences affect behaviour and learning." },
  { title: "Key Worker System", desc: "Every young person has a dedicated key worker who knows them well and advocates for their needs." },
  { title: "Family Support", desc: "We work closely with families, offering regular communication and support to address challenges together." },
  { title: "Multi-Agency Working", desc: "We collaborate with external agencies including CAMHS, social care, and specialist services." },
];
const policies = ["Child Protection & Safeguarding Policy","Online Safety Policy","Anti-Bullying Policy","Behaviour & Positive Relationships Policy","Safer Recruitment Policy","Whistleblowing Policy"];

export default function Safeguarding() {
  const toc = [
    { id: "dsl", label: "Our DSL", level: 2 as const },
    { id: "commitment", label: "Our Commitment", level: 2 as const },
    { id: "support", label: "How We Support", level: 2 as const },
    { id: "policies", label: "Key Policies", level: 2 as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Safeguarding & Pastoral Care",
    "description": "Keeping young people safe is our highest priority. We maintain a robust, trauma-informed safeguarding culture at Pathway Academy Zone.",
    "url": `${SITE_URL}/safeguarding`,
    "mainEntity": {
      "@type": "Article",
      "headline": "Safeguarding Children and Young People",
      "author": { "@type": "Organization", "name": "Pathway Academy Zone" }
    }
  };

  return (
    <Layout>
      <Seo
        title="Safeguarding & Pastoral Care"
        description="Keeping young people safe is our highest priority. We maintain a robust, trauma-informed safeguarding culture at Pathway Academy Zone."
        jsonLd={jsonLd}
      />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Safeguarding" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Safeguarding</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Keeping young people safe is our highest priority. We maintain a robust, trauma-informed safeguarding culture.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <div className="space-y-16">
            <section id="dsl" className="scroll-mt-24">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
                <div className="mx-auto md:mx-0">
                  <img src="https://pathwayacademyzone.co.uk/assets/martin-chandler-DvF3rkDn.png" alt="Martin Chandler - DSL" className="w-48 h-48 rounded-2xl object-cover shadow-lg" />
                </div>
                <div>
                  <h2 className="font-display text-lg text-muted-foreground mb-1">Our Designated Safeguarding Lead</h2>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">Martin Chandler</h3>
                  <p className="text-primary font-medium text-sm mb-4">Designated Safeguarding Lead</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">Martin leads our safeguarding practice and is the first point of contact for any safeguarding concerns. He works closely with external agencies and ensures all staff receive regular safeguarding training.</p>
                  <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
                    <p className="text-sm font-medium text-foreground"><strong>Urgent Safeguarding Concerns</strong></p>
                    <p className="text-sm text-muted-foreground">Contact Martin directly by email on <strong>martin.chandler@pathwayacademyzone.co.uk</strong></p>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="commitment" className="scroll-mt-24">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
                <p className="text-muted-foreground mb-8">At Pathway Academy Zone, we recognise that young people in Alternative Provision may be particularly vulnerable. Our approach to safeguarding is proactive, relational, and trauma-informed.</p>
                <div className="space-y-4">
                  {commitments.map((c, i) => (
                    <div key={i} className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border/50">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</span>
                      <p className="text-foreground">{c}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            <section id="support" className="scroll-mt-24">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                <span className="text-primary font-medium text-sm tracking-wider uppercase">Pastoral Care</span>
                <h2 className="font-display text-3xl font-bold text-foreground mt-2">How We Support Young People</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastoral.map((p, i) => (
                  <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="policies" className="scroll-mt-24">
              <div className="rounded-2xl bg-muted/40 p-8 md:p-10 border border-border/50 text-center">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Key Policies</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                  Our safeguarding and pastoral policies are available for review. For full documents, please visit our{" "}
                  <Link to="/policies" className="text-primary font-medium hover:underline">
                    Policies page
                  </Link>.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
                  {policies.map((p) => (
                    <li key={p} className="flex items-center gap-3 rounded-xl px-5 py-4 bg-background border border-border/50 hover:bg-muted transition-colors">
                      <FileText className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline">
                  <Link to="/policies">
                    View All Policies
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Download Policies",
                description: "Full safeguarding documents",
                href: "/policies",
                tone: "primary",
              },
              {
                label: "Contact DSL",
                description: "Speak with Martin Chandler",
                href: "/contact",
              },
            ]}
            quickContact={{
              phone: "01782 365365",
              email: "info@pathwayacademyzone.co.uk",
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
