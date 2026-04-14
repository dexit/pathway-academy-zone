import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, TrendingUp, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const benefits = [
  { icon: Heart, title: "Meaningful Work", desc: "Make a real difference in young people's lives every day" },
  { icon: Users, title: "Supportive Team", desc: "Work alongside dedicated, passionate colleagues" },
  { icon: TrendingUp, title: "Professional Development", desc: "Regular training and opportunities for growth" },
  { icon: Clock, title: "Work-Life Balance", desc: "Term-time working options and flexible arrangements" },
];

const vacancies = [
  { title: "SEMH Teacher", type: "Full-time, Permanent", location: "Stoke-on-Trent", salary: "£28,000 - £35,000", closing: "Open" },
  { title: "Youth Mentor", type: "Full-time, Fixed Term", location: "Stoke-on-Trent", salary: "£22,000 - £26,000", closing: "Open" },
  { title: "Learning Support Assistant", type: "Part-time (20hrs)", location: "Stoke-on-Trent", salary: "£12.50/hour", closing: "Open" },
];

export default function Careers() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Enquiry Submitted", description: "We'll be in touch soon." });
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Careers</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Join Our Team</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We're looking for passionate educators, mentors, and support staff who want to make a difference in young people's lives.</p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Why Work at Pathway Academy Zone?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div key={b.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center border border-border/50">
                <b.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold text-foreground mb-1 text-sm">{b.title}</h3>
                <p className="text-muted-foreground text-xs">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">What We Look For</h2>
          <p className="text-muted-foreground text-center mb-6">We value attitude and commitment as much as qualifications. Our ideal team members:</p>
          <ul className="space-y-3">
            {[
              "Believe in every young person's potential",
              "Are resilient and patient, even when things are challenging",
              "Build strong, trusting relationships with young people",
              "Collaborate effectively with colleagues and partners",
              "Are committed to continuous learning and improvement",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-foreground">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vacancies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Current Vacancies</h2>
          <div className="space-y-4 mb-16">
            {vacancies.map((v) => (
              <motion.div key={v.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border/50">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                  <span>{v.type}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{v.location}</span>
                </div>
                <p className="text-primary font-semibold text-sm mb-1">{v.salary}</p>
                <p className="text-xs text-muted-foreground">Closing: {v.closing}</p>
              </motion.div>
            ))}
          </div>

          {/* Speculative */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4 text-center">Speculative Applications</h2>
            <p className="text-muted-foreground text-center mb-8">Don't see a suitable role? We're always interested in hearing from talented individuals.</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-2xl p-8 border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Your Name *" required />
                <Input type="email" placeholder="Email Address *" required />
              </div>
              <Input type="tel" placeholder="Phone Number" />
              <Input placeholder="Area of Interest *" required />
              <Textarea placeholder="Tell Us About Yourself *" rows={4} required />
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
