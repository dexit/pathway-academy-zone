import { motion } from "framer-motion";
import { School, Building2, Users, Heart, Briefcase, Stethoscope } from "lucide-react";
import Layout from "@/components/Layout";
import careersImg from "@/assets/careers-event.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const partners = [
  { icon: School, title: "Staffordshire Schools", desc: "We work with secondary schools across Staffordshire to provide Alternative Provision placements.", tags: ["Mainstream secondaries", "Special schools", "Academy trusts"] },
  { icon: Building2, title: "Local Authority Teams", desc: "Close partnerships with Staffordshire County Council education and children's services.", tags: ["Inclusion teams", "SEND services", "Early Help"] },
  { icon: Users, title: "Virtual Schools", desc: "We provide specialist placements for looked after children, working closely with virtual school heads.", tags: ["PEP meetings", "Designated teachers", "Care coordination"] },
  { icon: Heart, title: "Youth & Community Services", desc: "Partnerships with local youth services and community organisations enrich our offer.", tags: ["Youth clubs", "Sports organisations", "Arts groups"] },
  { icon: Briefcase, title: "Employers & Training Providers", desc: "Local businesses and training providers support our vocational programmes.", tags: ["Apprenticeship providers", "Local businesses", "Colleges"] },
  { icon: Stethoscope, title: "Specialist Services", desc: "We work alongside CAMHS, educational psychologists, and other specialists.", tags: ["CAMHS", "Educational psychology", "SALT"] },
];

export default function Partners() {
  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Local Partnerships</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Working Together Across Staffordshire</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Strong partnerships are essential to supporting young people effectively. We collaborate with schools, local authorities, community organisations, and employers.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partners.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border/50">
                <p.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">In Action</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-6">Connecting Young People with Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">We regularly host and participate in careers events, bringing employers and training providers directly to our young people.</p>
            <img src={careersImg} alt="Careers event" className="rounded-2xl shadow-lg w-full max-w-3xl mx-auto" loading="lazy" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
