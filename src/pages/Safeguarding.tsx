import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Users, Heart, Phone } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const pastoralItems = [
  { icon: Heart, title: "Trauma-Informed Practice", desc: "All staff are trained in trauma-informed approaches, understanding how adverse experiences affect behaviour and learning." },
  { icon: Users, title: "Key Worker System", desc: "Every young person has a dedicated key worker who knows them well and advocates for their needs." },
  { icon: Heart, title: "Family Support", desc: "We work closely with families, offering regular communication and support to address challenges together." },
  { icon: Shield, title: "Multi-Agency Working", desc: "We collaborate with external agencies including CAMHS, social care, and specialist services." },
];

const policies = [
  "Child Protection & Safeguarding Policy",
  "Online Safety Policy",
  "Anti-Bullying Policy",
  "Behaviour & Positive Relationships Policy",
  "Safer Recruitment Policy",
  "Whistleblowing Policy",
];

export default function Safeguarding() {
  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Support & Safeguarding</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Keeping Young People Safe</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Safeguarding is everyone's responsibility. We maintain the highest standards to ensure all young people feel safe, supported, and heard.</p>
          </motion.div>
        </div>
      </section>

      {/* DSL */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card rounded-2xl p-8 border border-border/50 text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Our Designated Safeguarding Lead</h2>
            <h3 className="font-display text-xl text-foreground mb-1">Emma Roberts</h3>
            <p className="text-muted-foreground mb-4">Designated Safeguarding Lead</p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto mb-6">Emma leads our safeguarding practice and is the first point of contact for any safeguarding concerns. She works closely with external agencies and ensures all staff receive regular safeguarding training.</p>
            <div className="bg-destructive/10 rounded-xl p-4">
              <p className="text-sm font-semibold text-foreground">Urgent Safeguarding Concerns</p>
              <p className="text-sm text-muted-foreground">Contact Emma directly or email <strong>safeguarding@pathwayacademy.zone</strong></p>
            </div>
          </div>

          {/* Commitment */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">At Pathway Academy Zone, we recognise that young people in Alternative Provision may be particularly vulnerable. Our approach to safeguarding is proactive, relational, and trauma-informed.</p>
            <ol className="space-y-4 mb-12">
              {[
                "All staff complete enhanced DBS checks and receive regular safeguarding training",
                "We maintain clear reporting procedures and work closely with local safeguarding partners",
                "Young people are taught to recognise risks and know who to talk to if they feel unsafe",
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-foreground pt-1">{item}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* Pastoral */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Pastoral Care</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">How We Support Young People</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pastoralItems.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Key Policies</h2>
          <div className="space-y-3">
            {policies.map((p) => (
              <div key={p} className="bg-card rounded-lg p-4 border border-border/50 flex items-center justify-between">
                <span className="text-foreground text-sm font-medium">{p}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/policies">View All Policies</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
