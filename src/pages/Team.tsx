import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { Seo, SITE_URL, SITE_NAME } from "@/components/Seo";
import { ArchiveLayout } from "@/components/ArchiveLayout";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const team = [
  { name: "Martin Chandler", role: "Head of Community and Engagement (Safeguarding)", img: "/assets/martin-chandler-DvF3rkDn.png" },
  { name: "Liam Farrall", role: "Head of Alternative Provision", img: "/assets/liam-farrall-DwXnuzxA.jpg" },
  { name: "Gemma Mason, QTLS", role: "SENCO Lead", img: "/assets/gemma-mason-Dplhj7uo.jpeg" },
  { name: "Ahsan Hussain", role: "Head of Partnerships and Impact", img: "/assets/ahsan-hussain-OIFhfXvg.png" },
  { name: "Zulekha Ali", role: "HR and Executive Support", img: "/assets/zulekha-ali-Dfoelgdx.png" },
];

const execs = [
  { name: "Safaraz Ali", role: "Founder & CEO", img: "/assets/safaraz-ali-R0JVDMEt.png" },
  { name: "Waheed Azam", role: "Executive Director", img: "/assets/waheed-azam-DQhc8GBT.jpeg" },
];

const everyone = [...execs, ...team];

const teamSchema = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    employee: everyone.map((m) => ({ "@type": "Person", "name": m.name, "jobTitle": m.role })),
  }
];

export default function Team() {
  return (
    <>
      <Seo
        title="Our Team"
        description="Meet the educators, mentors and leadership team behind Pathway Academy Zone."
        jsonLd={teamSchema}
      />
      <ArchiveLayout
        crumbs={[{ label: "Team" }]}
        title="Our Team"
        intro="Meet the educators, mentors and leadership team dedicated to supporting every young person at Pathway Academy Zone."
        sidebar={{
          ctas: [
            { label: "Join Our Team", href: "/careers", description: "View current vacancies.", tone: "primary" },
            { label: "Contact Us", href: "/contact", description: "Get in touch with our leadership." },
          ],
          quickContact: { phone: "01782 365365", email: "info@pathwayacademyzone.co.uk" },
        }}
      >
        <section className="space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 rounded-full bg-primary" />
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Executive Leadership</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {execs.map((m, i) => (
                <motion.article key={m.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-xl transition-all group">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">{m.name}</h3>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{m.role}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 rounded-full bg-primary" />
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Our Staff</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {team.map((m, i) => (
                <motion.article key={m.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-lg transition-all group">
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{m.name}</h3>
                    <p className="text-muted-foreground text-sm leading-tight">{m.role}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 rounded-[2.5rem] p-10 text-center border border-primary/10">
             <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
             </div>
             <h2 className="text-2xl font-bold text-foreground mb-4">Want to Join Us?</h2>
             <p className="text-muted-foreground mb-8 max-w-md mx-auto">We are always looking for passionate professionals to join our growing team.</p>
             <Button asChild size="lg" className="rounded-full font-bold px-10">
                <Link to="/careers">View Open Roles</Link>
             </Button>
          </div>
        </section>
      </ArchiveLayout>
    </>
  );
}
