import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import Layout from "@/components/Layout.tsx";
import { Seo, SITE_URL, SITE_NAME } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { TeamModal } from "@/components/TeamModal";
import { LIVE_CONTENT } from "@/data/live-site-content";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const slugify = (s: string) =>
  s.toLowerCase().replace(/,.*$/, "").trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const teamSchema = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    employee: [...LIVE_CONTENT.team.leadership, ...LIVE_CONTENT.team.coreTeam].map((m) => ({ "@id": `${SITE_URL}/team#${slugify(m.name)}` })),
  },
  ...LIVE_CONTENT.team.coreTeam.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/team#${slugify(m.name)}`,
    name: m.name,
    jobTitle: m.role,
    image: m.image,
    url: `${SITE_URL}/team#${slugify(m.name)}`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    affiliation: { "@type": "EducationalOrganization", name: SITE_NAME, sameAs: SITE_URL },
  })),
  ...LIVE_CONTENT.team.leadership.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/team#${slugify(m.name)}`,
    name: m.name,
    jobTitle: m.role,
    image: m.image,
    url: `${SITE_URL}/team#${slugify(m.name)}`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    affiliation: { "@type": "EducationalOrganization", name: SITE_NAME, sameAs: SITE_URL },
  })),
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<(typeof LIVE_CONTENT.team.coreTeam)[0] | (typeof LIVE_CONTENT.team.leadership)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member: (typeof LIVE_CONTENT.team.coreTeam)[0] | (typeof LIVE_CONTENT.team.leadership)[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <Seo
        title="Meet the Pathway Academy Zone Team"
        description="Meet the educators, mentors and leadership team behind Pathway Academy Zone — Alternative Provision in Stoke-on-Trent."
        jsonLd={teamSchema}
      />
      <PageHero
        align="center"
        badge={{ label: "Our Team", icon: Users }}
        breadcrumbs={[{ label: "Team" }]}
        heading="Meet the People Behind Pathway Academy Zone"
        subheading="Our dedicated team of educators, mentors, and specialists work together to support every young person on their journey."
      />

      {/* Core Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">{LIVE_CONTENT.team.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {LIVE_CONTENT.team.coreTeam.map((m, i) => {
              const id = slugify(m.name);
              return (
                <motion.button
                  key={m.id}
                  id={id}
                  onClick={() => handleMemberClick(m)}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow scroll-mt-24 text-left focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img src={m.image} alt={`${m.name} — ${m.role}`} title={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-display text-lg font-bold text-foreground">{m.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{m.role}</p>
                    {m.bio && <p className="text-muted-foreground text-xs mt-3">Click to read bio</p>}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">Executive Leadership and Governance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {LIVE_CONTENT.team.leadership.map((m, i) => {
              const id = slugify(m.name);
              return (
                <motion.button
                  key={m.id}
                  id={id}
                  onClick={() => handleMemberClick(m)}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow scroll-mt-24 text-left focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img src={m.image} alt={`${m.name} — ${m.role}`} title={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-display text-lg font-bold text-foreground">{m.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{m.role}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-8">We're always looking for passionate educators and support staff who share our vision for transforming young lives.</p>
          <Button asChild>
            <Link to="/careers" title="Current vacancies">
              View Current Vacancies <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <TeamModal member={selectedMember} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </Layout>
  );
}
