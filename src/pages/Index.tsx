import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, TrendingUp, ArrowRight, BookOpen, Wrench, Brain, Lightbulb, UserCheck, Target, Clock } from "lucide-react";
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
  { value: "94%", label: "Attendance Improvement" },
  { value: "87%", label: "Positive Destinations" },
  { value: "150+", label: "Young People Supported" },
  { value: "12+", label: "Partner Schools" },
];

const approaches = [
  { icon: Heart, title: "Trauma-Informed Approach", desc: "Our practice is grounded in understanding how trauma affects learning and behaviour, creating safe spaces for growth." },
  { icon: Target, title: "Personalised Pathways", desc: "Every young person receives a tailored learning plan designed around their strengths, interests, and goals." },
  { icon: UserCheck, title: "Expert Staff", desc: "Our team includes qualified teachers, youth workers, and pastoral specialists dedicated to every student's success." },
  { icon: Shield, title: "Safe Environment", desc: "We maintain the highest safeguarding standards, ensuring all young people feel secure and supported." },
];

const programmes = [
  { icon: BookOpen, title: "Academic Re-engagement", desc: "Structured curriculum adapted for individual learning needs", img: classroomImg, path: "/programmes" },
  { icon: Wrench, title: "Vocational Learning", desc: "Hands-on practical skills in construction, catering and more", img: vocationalImg, path: "/programmes" },
  { icon: Brain, title: "SEMH Support", desc: "Therapeutic intervention for social and emotional needs", img: mentoringImg, path: "/programmes" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="order-2 lg:order-1">
              <span className="inline-block px-4 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium mb-6 border border-border">
                Alternative Provision in Staffordshire
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                Alternative Provision That
                <br />
                <span className="text-primary">Re-Engages, Rebuilds</span>
                <br />
                and Redirects Young People
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-lg">
                Supporting students aged 11–16 across Stoke-on-Trent and Staffordshire with behaviour support, personalised learning and clear pathways back into education, training or employment.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Learn About Us</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src={heroImg}
                  alt="Students learning in a supportive classroom environment"
                  className="w-full h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
                  width={1920}
                  height={1080}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Who We Are</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">Specialist Education for Those Who Need It Most</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Pathway Academy Zone works with young people aged 11-16 who have been excluded from mainstream education, or who are at risk of exclusion. We partner with schools, local authorities, and families across Staffordshire to provide structured, supportive learning environments where every student can succeed.
              </p>
              <ul className="space-y-3 mb-8">
                {["SEMH-focused curriculum delivery", "Small group and 1:1 support", "Qualified teachers and mentors", "Strong pastoral care teams", "Vocational and academic pathways"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/programmes">Explore Our Programmes <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <img src={classroomImg} alt="Bright learning environment" className="rounded-2xl shadow-lg w-full" loading="lazy" width={1280} height={854} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Support */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Approach</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">How We Support Young People</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Our evidence-based approach combines therapeutic support with quality education to help students overcome barriers and achieve their potential.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {approaches.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-card rounded-xl p-6 shadow-sm border border-border/50"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes Preview */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Programmes</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Pathways to Success</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programmes.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={s.path} className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <s.icon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Making a Real Difference</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Common Questions</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            {[
              { q: "What is Alternative Provision?", a: "Alternative Provision (AP) is education arranged for pupils who can't attend mainstream school due to exclusion, illness, or other reasons. It provides structured learning in smaller, more supportive environments." },
              { q: "Who is Pathway Academy Zone for?", a: "We support young people aged 11-16 (KS3 & KS4) who are permanently excluded, at risk of exclusion, disengaged from mainstream education, or have social, emotional and mental health needs." },
              { q: "How does the referral process work?", a: "Referrals are made by schools, local authorities, or social workers. Contact us to discuss needs, we gather information, hold an assessment meeting, then create a personalised placement plan." },
              { q: "How quickly can a learner start?", a: "Emergency placements can begin within 48 hours. Standard placements typically start within 1-2 weeks following the assessment process." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-card rounded-xl border border-border/50 p-6">
                <summary className="font-display font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <Lightbulb className="h-5 w-5 text-primary group-open:rotate-45 transition-transform" />
                </summary>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Make a Referral?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
              Whether you're a school, local authority, social worker, or parent, we're here to help. Our team will guide you through the referral process and find the right pathway for your young person.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" className="bg-card text-primary hover:bg-card/90 rounded-lg font-semibold shadow-lg">
                <Link to="/referral">Start a Referral</Link>
              </Button>
              <Button asChild variant="heroPill" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
