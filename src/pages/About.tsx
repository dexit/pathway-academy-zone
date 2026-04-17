import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import classroomImg from "@/assets/classroom-learning.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
// about ld+json schema needed



const values = [
  { letter: "C", name: "Change", desc: "We embrace learning and adapt to grow." },
  { letter: "A", name: "Ambition", desc: "We aim high and strive for progress." },
  { letter: "R", name: "Reputation", desc: "We work as a team and are known for integrity." },
  { letter: "E", name: "Empathy", desc: "We care deeply and show compassion in action." },
  { letter: "S", name: "Skills", desc: "We grow by sharpening our abilities with discipline." },
];

export default function About() {
  return (
    <Layout>
      <section className="relative py-32">
        <div className="absolute inset-0"><img src={classroomImg} alt="Students learning" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-foreground/60" /></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4 backdrop-blur-sm border border-primary-foreground/20">About Us</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Who We Are</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire.</p>
        </div>
      </section>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Mission</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">Empowering Young People to Succeed</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We believe every young person deserves access to quality education, regardless of their circumstances. Our mission is to provide structured, trauma-informed Alternative Provision that helps students overcome barriers, develop resilience, and build the skills they need for a successful future.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">Founded with a deep understanding of the challenges facing young people in the AP sector, Pathway Academy Zone combines academic rigour with therapeutic support, vocational opportunities, and strong pastoral care.</p>
              <p className="text-muted-foreground leading-relaxed">We work closely with mainstream schools, local authorities, virtual schools, and families to ensure every young person receives the support they need to thrive.</p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><img src={mentoringImg} alt="Young people attending a careers presentation" className="rounded-2xl shadow-lg w-full" loading="lazy" /></motion.div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">What Guides Us</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Our values shape everything we do, from how we design programmes to how we interact with young people and their families.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.letter} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4"><span className="text-primary-foreground font-display font-bold text-xl">{v.letter}</span></div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.name}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">{values.map((v, i) => (<span key={v.name} className="text-primary font-display font-semibold text-sm">{v.name}{i < values.length - 1 && <span className="text-muted-foreground ml-2">·</span>}</span>))}</div>
        </div>
      </section>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Philosophy</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">A Trauma-Informed Approach</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">We understand that many young people in Alternative Provision have experienced adverse childhood experiences that affect their ability to learn and engage.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ title: "Understanding Behaviour", desc: "We view all behaviour as communication. Rather than punishing challenging behaviour, we seek to understand its root causes and address underlying needs." },{ title: "Building Relationships", desc: "Strong, trusting relationships are at the heart of our approach. We maintain low staff-to-student ratios and ensure consistency in key adult relationships." },{ title: "Celebrating Progress", desc: "We recognise and celebrate every achievement, no matter how small. Building self-esteem and confidence is essential to helping young people believe in their potential." }].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Want to Learn More?</h2>
          <p className="text-muted-foreground mb-8">Meet our dedicated team or explore our programmes to see how we can support your young person.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild><Link to="/team">Meet the Team <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
            <Button asChild variant="outline"><Link to="/programmes">Our Programmes</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
