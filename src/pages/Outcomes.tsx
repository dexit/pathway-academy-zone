import { motion } from "framer-motion";
import { TrendingUp, Target, Users, UserCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { ContentSidebar } from "@/components/ContentSidebar";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Outcomes() {
  const toc = [
    { id: "impact-stats", label: "Key Impact Statistics", level: 2 as const },
    { id: "success-stories", label: "Real Success Stories", level: 2 as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Outcomes & Impact",
    "description": "Our success is measured by the progress our young people make.",
    "url": `${SITE_URL}/outcomes`,
  };

  return (
    <Layout>
      <Seo title="Outcomes & Impact" description="We measure success through attendance, engagement, and positive progression." jsonLd={jsonLd} />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Outcomes" }]} className="text-primary-foreground/70 mb-6" />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Outcomes & Impact</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              We measure success through attendance, engagement, and positive progression for every learner.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <div className="space-y-20">
            <section id="impact-stats" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8">Key Impact Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-2">94%</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Improved Attendance</p>
                 </div>
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              { label: "Referral Process", description: "How to refer a learner", href: "/referral", tone: "primary" },
              { label: "Knowledge Hub", description: "Deep dive into our work", href: "/knowledge-hub" },
            ]}
            quickContact={{ phone: "01782 365365", email: "info@pathwayacademyzone.co.uk" }}
          />
        </div>
      </div>
    </Layout>
  );
}
