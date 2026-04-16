import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, TrendingUp, ArrowRight, BookOpen, Wrench, Brain, Lightbulb, UserCheck, Target, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero-classroom.jpg";
import classroomImg from "@/assets/classroom-learning.jpg";
import vocationalImg from "@/assets/vocational-training.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { icon: TrendingUp, value: "94%", label: "Improved Attendance" },
  { icon: Target, value: "87%", label: "Positive Destinations" },
  { icon: Users, value: "92%", label: "Improved Engagement" },
  { icon: UserCheck, value: "78%", label: "Achieved Qualifications" },
];

const approaches = [
  { icon: Heart, title: "Trauma-Informed Approach", desc: "Our practice is grounded in understanding how trauma affects learning and behaviour, creating safe spaces for growth." },
  { icon: Target, title: "Personalised Pathways", desc: "Every young person receives a tailored learning plan designed around their strengths, interests, and goals." },
  { icon: UserCheck, title: "Expert Staff", desc: "Our team includes qualified teachers, youth workers, and pastoral specialists dedicated to every student's success." },
  { icon: Shield, title: "Safe Environment", desc: "We maintain the highest safeguarding standards, ensuring all young people feel secure and supported." },
];

const faqs = [
  { q: "What is Alternative Provision?", a: "Alternative Provision (AP) is education arranged for pupils who can't attend mainstream school due to exclusion, illness, or other reasons. It provides structured learning in smaller, more supportive environments." },
  { q: "Who is Pathway Academy Zone for?", a: "We support young people aged 11-16 (KS3 & KS4) who are permanently excluded, at risk of exclusion, disengaged from mainstream education, or have social, emotional and mental health needs." },
  { q: "How does the referral process work?", a: "Referrals are made by schools, local authorities, or social workers. Contact us to discuss needs, we gather information, hold an assessment meeting, then create a personalised placement plan." },
  { q: "How quickly can a learner start?", a: "Emergency placements can begin within 48 hours. Standard placements typically start within 1-2 weeks following the assessment process." },
  { q: "How do you keep learners safe?", a: "Safeguarding is our top priority. All staff are DBS checked and trained, we have a dedicated safeguarding lead, clear reporting procedures, and work closely with local safeguarding partners." },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero - Full screen with image overlay */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Students collaborating around a laptop in a supportive classroom environment" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
              Alternative Provision in Staffordshire
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Every Young Person Deserves a Pathway To Success
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-4 max-w-xl">
              We provide specialist education for young people who need a different approach.
            </p>
            <p className="text-primary-foreground/70 text-base md:text-lg mb-10 max-w-xl">
              Through structure, care and high expectations, we help young people re-engage, rebuild confidence and move forward in education, employment or training.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button asChild size="xl" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold shadow-lg px-8">
                <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full backdrop-blur-sm bg-transparent">
                <Link to="/about">Learn About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Who We Are</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">Specialist Education for Those Who Need It Most</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Pathway Academy Zone works with young people aged 11-16 who have been excluded from mainstream education, or who are at risk of exclusion. We partner with schools, local authorities, and families across Staffordshire to provide structured, supportive learning environments where every student can succeed.
              </p>
              <ul className="space-y-3 mb-8">
                {["SEMH-focused curriculum delivery", "Small group and 1:1 support", "Qualified teachers and mentors", "Strong pastoral care teams", "Vocational and academic pathways"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/programmes">Explore Our Programmes <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              <img src={classroomImg} alt="Students at careers fair" className="rounded-2xl shadow-lg w-full h-64 object-cover" loading="lazy" />
              <img src={vocationalImg} alt="Young people exploring apprenticeships" className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8" loading="lazy" />
              <img src={mentoringImg} alt="Young people at careers stand" className="rounded-2xl shadow-lg w-full h-64 object-cover col-span-2" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Support */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Approach</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">How We Support Young People</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Our evidence-based approach combines therapeutic support with quality education to help students overcome barriers and achieve their potential.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {approaches.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Making a Real Difference</h2>
            <p className="text-primary-foreground/70 mt-3 max-w-xl mx-auto">Our outcomes speak to the transformative impact we have on young people's lives across Staffordshire.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Common Questions</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-4">Quick answers to help you understand Alternative Provision and how Pathway Academy Zone works.</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-card rounded-xl border border-border/50 overflow-hidden">
                <summary className="font-display font-semibold text-foreground cursor-pointer list-none flex items-center justify-between p-6">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Make a Referral?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
              Whether you're a school, local authority, social worker, or parent, we're here to help. Our team will guide you through the referral process and find the right pathway for your young person.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" className="bg-card text-primary hover:bg-card/90 rounded-full font-semibold shadow-lg">
                <Link to="/referral">Start a Referral <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full backdrop-blur-sm bg-transparent">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
