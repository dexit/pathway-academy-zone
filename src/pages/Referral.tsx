import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Referral() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Refer a Learner",
    "description": "Follow our 4-step referral process for Alternative Provision placement.",
  };

  return (
    <Layout>
      <Seo title="Make a Referral" description="Refer a young person to Pathway Academy Zone." jsonLd={jsonLd} />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Referral" }]} className="text-primary-foreground/70 mb-6" />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Make a Referral</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              We accept referrals from schools, local authorities, and virtual schools across Staffordshire.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Start the Journey</h2>
          <p className="text-muted-foreground mb-12">Contact our admissions team to discuss a potential placement.</p>
          <Button asChild size="xl" className="rounded-full">
            <a href="mailto:info@pathwayacademyzone.co.uk">Email Admissions Team</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
