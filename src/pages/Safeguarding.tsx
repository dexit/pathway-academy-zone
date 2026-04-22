import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

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
  return (
    <Layout>
      <section className="py-32 bg-accent/50"><div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Support & Safeguarding</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Keeping Young People Safe</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Safeguarding is everyone's responsibility. We maintain the highest standards to ensure all young people feel safe, supported, and heard.</p>
      </div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-4xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
          <div className="mx-auto md:mx-0"><img src="https://pathwayacademyzone.co.uk/assets/martin-chandler-DvF3rkDn.png" alt="Martin Chandler - DSL" className="w-48 h-48 rounded-2xl object-cover shadow-lg" /></div>
          <div>
            <h2 className="font-display text-lg text-muted-foreground mb-1">Our Designated Safeguarding Lead</h2>
            <h3 className="font-display text-2xl font-bold text-foreground mb-1">Martin Chandler</h3>
            <p className="text-primary font-medium text-sm mb-4">Designated Safeguarding Lead</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Martin leads our safeguarding practice and is the first point of contact for any safeguarding concerns. He works closely with external agencies and ensures all staff receive regular safeguarding training.</p>
            <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20"><p className="text-sm font-medium text-foreground"><strong>Urgent Safeguarding Concerns</strong></p><p className="text-sm text-muted-foreground">Contact Martin directly by email on <strong>martin.chandler@pathwayacademyzone.co.uk</strong></p></div>
          </div>
        </motion.div>
      </div></section>
      <section className="py-24 bg-accent/20"><div className="container mx-auto px-4 max-w-4xl"><motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
        <p className="text-muted-foreground mb-8">At Pathway Academy Zone, we recognise that young people in Alternative Provision may be particularly vulnerable. Our approach to safeguarding is proactive, relational, and trauma-informed.</p>
        <div className="space-y-4">{commitments.map((c, i) => (<div key={i} className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border/50"><span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</span><p className="text-foreground">{c}</p></div>))}</div>
      </motion.div></div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-4xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Pastoral Care</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2">How We Support Young People</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{pastoral.map((p, i) => (<motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"><h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p></motion.div>))}</div>
      </div></section>
      <section className="py-24 bg-accent/20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Key Policies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Our safeguarding and pastoral policies are available for review. For full documents, please visit our{" "}
            <Link to="/policies" className="text-primary font-medium hover:underline">
              Policies page
            </Link>
            .
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
            {policies.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 rounded-xl px-5 py-4 bg-primary/10 hover:bg-primary/15 transition-colors"
              >
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
    </Layout>
  );
}
