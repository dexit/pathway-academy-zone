import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";
import { ArchiveLayout } from "@/components/ArchiveLayout";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Partners() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Our Partners & Networks",
    "description": "We work in close partnership with schools and local authorities across Staffordshire.",
    "url": `${SITE_URL}/partners`,
  };

  return (
    <>
      <Seo title="Our Partners & Networks" description="Working together with schools and local authorities." jsonLd={jsonLd} />
      <ArchiveLayout
        crumbs={[{ label: "Partners" }]}
        title="Our Partners"
        intro="Working together with schools, local authorities and employers to ensure the best outcomes for every young person."
        sidebar={{
          ctas: [
            { label: "Make a Referral", href: "/referral", description: "Start the placement process.", tone: "primary" },
            { label: "Our Team", href: "/team", description: "Meet the people behind our partnerships." },
          ],
          quickContact: { phone: "01782 365365", email: "info@pathwayacademyzone.co.uk" },
        }}
      >
        <div className="space-y-16">
          <section>
             <h2 className="text-2xl font-bold mb-6">Our Network</h2>
             <p className="text-muted-foreground leading-relaxed">We support schools and academies across the West Midlands.</p>
          </section>
        </div>
      </ArchiveLayout>
    </>
  );
}
