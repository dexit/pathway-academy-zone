import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const steps = [
  { num: "1", title: "Initial Contact", desc: "Contact us by phone or complete the referral form to discuss your young person's needs." },
  { num: "2", title: "Information Gathering", desc: "We collect relevant documentation including educational history, EHCP/SEN information, and safeguarding details." },
  { num: "3", title: "Assessment Meeting", desc: "We meet with the young person and family to assess needs and discuss potential pathways." },
  { num: "4", title: "Placement Planning", desc: "We create a personalised plan and agree start dates, transport arrangements, and support packages." },
];

const eligibility = [
  "Young people aged 11-16",
  "Permanently excluded or at risk of exclusion",
  "Disengaged from mainstream education",
  "Social, emotional and mental health needs",
  "Anxiety-based non-attendance",
  "Looked after children and care leavers",
];

export default function Referral() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Referral Submitted", description: "We'll contact you within 2 working days." });
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Referral Process</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">How to Refer a Young Person</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We accept referrals from schools, local authorities, social workers, and virtual schools. Parents and carers should contact their child's school or local authority to initiate a referral.</p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">The Referral Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">{step.num}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Eligibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Documentation Required</h2>
              <ul className="space-y-3">
                {["Recent school reports and attendance data", "EHCP or SEN support documentation (if applicable)", "Any relevant safeguarding information", "Professional reports (educational psychology, CAMHS, etc.)", "PEP (Personal Education Plan) for looked after children"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground text-sm">
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Referral Form</h2>
            <p className="text-muted-foreground text-center mb-2">Complete this form and our team will contact you within 2 working days.</p>
            <p className="text-sm text-muted-foreground text-center mb-8 italic">Referrals can only be made by schools, local authorities, social workers, or other professionals.</p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-8 border border-border/50">
              <h3 className="font-display font-bold text-foreground">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Your Name *" required />
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                  <option value="">Select Role *</option>
                  <option>School Staff</option>
                  <option>Local Authority</option>
                  <option>Social Worker</option>
                  <option>Virtual School</option>
                  <option>Other Professional</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="email" placeholder="Email Address *" required />
                <Input type="tel" placeholder="Phone Number *" required />
              </div>
              <Input placeholder="Organisation / School" />

              <hr className="border-border" />
              <h3 className="font-display font-bold text-foreground">Young Person Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Young Person's Name *" required />
                <Input type="date" placeholder="Date of Birth *" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                  <option value="">Select Year Group *</option>
                  <option>Year 7</option>
                  <option>Year 8</option>
                  <option>Year 9</option>
                  <option>Year 10</option>
                  <option>Year 11</option>
                </select>
                <Input placeholder="Current / Previous School" />
              </div>
              <Textarea placeholder="Reason for Referral *" rows={4} required />
              <Textarea placeholder="Additional Information" rows={3} />

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Referral"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
