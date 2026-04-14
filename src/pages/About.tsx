import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import classroomImg from "@/assets/classroom-learning.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const values = [
  { letter: "C", title: "Change", desc: "We embrace learning and adapt to grow." },
  { letter: "A", title: "Ambition", desc: "We aim high and strive for progress." },
  { letter: "R", title: "Reputation", desc: "We work as a team and are known for integrity." },
  { letter: "E", title: "Empathy", desc: "We care deeply and show compassion in action." },
  { letter: "S", title: "Skills", desc: "We grow by sharpening our abilities with discipline." },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">About Us</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">Who We Are</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <img src={classroomImg} alt="Students learning" className="rounded-2xl shadow-lg w-full" loading="lazy" width={1280} height={854} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Mission</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Empowering Young People to Succeed</h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6 text-muted-foreground leading-relaxed">
            <p>We believe every young person deserves access to quality education, regardless of their circumstances. Our mission is to provide structured, trauma-informed Alternative Provision that helps students overcome barriers, develop resilience, and build the skills they need for a successful future.</p>
            <p>Founded with a deep understanding of the challenges facing young people in the AP sector, Pathway Academy Zone combines academic rigour with therapeutic support, vocational opportunities, and strong pastoral care.</p>
            <p>We work closely with mainstream schools, local authorities, virtual schools, and families to ensure every young person receives the support they need to thrive.</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">What Guides Us</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Our values shape everything we do, from how we design programmes to how we interact with young people and their families.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.letter} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">{v.letter}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <img src={mentoringImg} alt="Mentoring session" className="rounded-2xl shadow-lg w-full" loading="lazy" width={1280} height={854} />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Philosophy</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">A Trauma-Informed Approach</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">We understand that many young people in Alternative Provision have experienced adverse childhood experiences that affect their ability to learn and engage.</p>
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">Understanding Behaviour</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">We view all behaviour as communication. Rather than punishing challenging behaviour, we seek to understand its root causes and address underlying needs.</p>
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">Building Relationships</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Strong, trusting relationships are at the heart of our approach. We maintain low staff-to-student ratios and ensure consistency in key adult relationships.</p>
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">Celebrating Progress</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">We recognise and celebrate every achievement, no matter how small. Building self-esteem and confidence is essential to helping young people believe in their potential.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">Want to Learn More?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">Meet our dedicated team or explore our programmes to see how we can support your young person.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90 rounded-lg">
              <Link to="/team">Meet the Team</Link>
            </Button>
            <Button asChild variant="heroPill" size="lg">
              <Link to="/programmes">Our Programmes <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
