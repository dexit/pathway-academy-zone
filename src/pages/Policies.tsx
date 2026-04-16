import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const policies = [
  { name: "Safeguarding Children & Young Person's Policy", file: "Safeguarding-Children-Young-Persons-Policy.pdf" },
  { name: "Equality, Diversity & Inclusion Policy", file: "Equality-Diversity-Inclusion-Policy.pdf" },
  { name: "Complaints & Compliments Policy", file: "Complaints-Compliments-Policy.pdf" },
  { name: "Learner Behaviour & Conduct Policy", file: "Learner-Behaviour-Conduct-Policy.pdf" },
  { name: "Safeguarding Information for Visitors", file: "Safeguarding-Information-Visitors.pdf" },
  { name: "Privacy Notice & GDPR Statement", file: "Privacy-Notice-GDPR.pdf" },
];

export default function Policies() {
  return (
    <Layout>
      <section className="py-32 bg-muted/30"><div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Policies</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Policies & Documents</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Transparency is important to us. Below you'll find our key policies and statutory documents available for download.</p>
      </div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-3xl"><div className="space-y-4">
        {policies.map((p, i) => (<motion.a key={p.name} href={`https://pathwayacademyzone.co.uk/policies/${p.file}`} target="_blank" rel="noopener noreferrer" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between bg-card rounded-xl p-6 border border-border/50 hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><FileText className="h-5 w-5 text-primary" /></div><span className="font-medium text-foreground group-hover:text-primary transition-colors">{p.name}</span></div>
          <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </motion.a>))}
      </div></div></section>
      <section className="py-16 bg-muted/50 text-center"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Need a Different Document?</h2>
        <p className="text-muted-foreground mb-8">If you need a policy that isn't listed here, or would like a paper copy, please contact us.</p>
        <Button asChild><Link to="/contact">Contact Us <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
      </div></section>
    </Layout>
  );
}
