import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const sections = [
  {
    title: "Safeguarding & Child Protection",
    policies: [
      { name: "Safeguarding Policy", available: true },
      { name: "Online Safety Policy", available: false },
      { name: "Safer Recruitment Policy", available: false },
      { name: "Anti-Bullying Policy", available: false },
      { name: "Whistleblowing Policy", available: false },
    ],
  },
  {
    title: "Education & Curriculum",
    policies: [
      { name: "Curriculum Policy", available: false },
      { name: "Assessment & Reporting Policy", available: false },
      { name: "Teaching & Learning Policy", available: false },
      { name: "Careers Education Policy", available: false },
    ],
  },
  {
    title: "Quality Assurance",
    policies: [
      { name: "Quality Assurance Policy", available: true },
    ],
  },
  {
    title: "SEND & Inclusion",
    policies: [
      { name: "SEND Policy & Information Report", available: false },
      { name: "Accessibility Plan", available: false },
      { name: "Equality, Diversity & Inclusion (EDI) Policy", available: false },
      { name: "Supporting Pupils with Medical Conditions", available: false },
    ],
  },
  {
    title: "Behaviour & Pastoral",
    policies: [
      { name: "Behaviour & Positive Relationships Policy", available: false },
      { name: "Physical Intervention Policy", available: false },
      { name: "Attendance Policy", available: false },
      { name: "Exclusions Policy", available: false },
      { name: "Complaints Policy", available: false },
    ],
  },
  {
    title: "Health, Safety & Wellbeing",
    policies: [
      { name: "Health & Safety Policy", available: false },
      { name: "First Aid Policy", available: false },
      { name: "Mental Health & Wellbeing Policy", available: false },
      { name: "Risk Assessment Policy", available: false },
    ],
  },
  {
    title: "Governance & Operations",
    policies: [
      { name: "Data Protection / Privacy Policy", available: false },
      { name: "Staff Code of Conduct", available: false },
      { name: "Social Media Policy", available: false },
      { name: "Acceptable Use Policy", available: false },
    ],
  },
];

export default function Policies() {
  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Policies</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Our Policies & Documents</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Transparency is important to us. Below you'll find our key policies and statutory documents.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-secondary/50 rounded-xl p-6 mb-12">
            <h3 className="font-display font-bold text-foreground mb-2">Statutory Documents</h3>
            <p className="text-muted-foreground text-sm">The following documents are required to be published: Safeguarding Policy, Child Protection Policy, SEND Policy, Behaviour Policy, Complaints Procedure, Accessibility Plan, Equality Information, Data Protection Policy.</p>
          </div>

          <div className="space-y-12">
            {sections.map((section) => (
              <motion.div key={section.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">{section.title}</h2>
                <div className="space-y-2">
                  {section.policies.map((policy) => (
                    <div key={policy.name} className="flex items-center justify-between bg-card rounded-lg p-4 border border-border/50">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-foreground text-sm">{policy.name}</span>
                      </div>
                      {policy.available ? (
                        <span className="flex items-center gap-1 text-primary text-xs font-medium"><Download className="h-3.5 w-3.5" /> PDF</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">Coming soon</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
