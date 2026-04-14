import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const team = [
  { name: "Martin Chandler", role: "Head of Community and Engagement (Safeguarding)" },
  { name: "Liam Farrall", role: "Head of Alternative Provision" },
  { name: "Gemma Mason, QTLS", role: "SENCO Lead" },
  { name: "Ahsan Hussain", role: "Head of Partnerships and Impact" },
  { name: "Zulekha Ali", role: "HR and Executive Support" },
];

const leadership = [
  { name: "Safaraz Ali", role: "Founder & CEO" },
  { name: "Waheed Azam", role: "Executive Director" },
];

export default function TeamPage() {
  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Team</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Meet the People Behind Pathway Academy Zone</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our dedicated team of educators, mentors, and specialists work together to support every young person on their journey.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
            {team.map((member, i) => (
              <motion.div key={member.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-2xl text-primary">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-10 text-center">Executive Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto mb-16">
            {leadership.map((member, i) => (
              <motion.div key={member.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-2xl text-primary">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center bg-muted/50 rounded-2xl p-10">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-6">We're always looking for passionate educators and support staff who share our vision for transforming young lives.</p>
            <Button asChild>
              <Link to="/careers">View Current Vacancies <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
