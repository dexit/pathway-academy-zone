import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Users,
  GraduationCap,
  Target,
  TrendingUp,
  Heart,
  ChevronDown,
  Building2,
  BookOpen,
  Calendar,
  Phone,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import WhyItMattersScroller from "@/components/WhyItMattersScroller";
import { Seo } from "@/components/Seo";

const heroImg = "/assets/hero-classroom.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const features = [
  {
    title: "Trauma-Informed Approach",
    desc: "We understand that behavior is communication. Our staff are trained to support young people with complex needs through a relational, empathy-led model.",
    icon: Heart,
  },
  {
    title: "GCSE & Vocational Pathways",
    desc: "From core academics to practical skills like construction and catering, we provide qualifications that open real doors for future success.",
    icon: GraduationCap,
  },
  {
    title: "Specialist SEMH Support",
    desc: "Integrated therapeutic support and low staff-to-student ratios ensure every learner feels seen, safe, and supported to grow.",
    icon: Target,
  }
];

const stats = [
  { label: "Positive Destinations", value: "94%", icon: TrendingUp },
  { label: "Attendance Increase", value: "68%", icon: Calendar },
  { label: "Qualified Staff", value: "100%", icon: Users },
  { label: "Years Experience", value: "15+", icon: Building2 }
];

const faqs = [
  {
    q: "What is Alternative Provision?",
    a: "Alternative Provision (AP) is education for pupils who, because of exclusion, illness, or other reasons, would not otherwise receive suitable education in a mainstream or special school."
  },
  {
    q: "How do I make a referral?",
    a: "Referrals are typically made by schools or local authorities. You can start the process by visiting our Referral page and completing the initial form."
  },
  {
    q: "What qualifications do you offer?",
    a: "We offer GCSEs in core subjects (English, Maths, Science), Functional Skills, and various vocational BTEC qualifications tailored to individual learner pathways."
  }
];

export default function Index() {
  return (
    <Layout>
      <Seo
        title="Specialist Alternative Provision in Stoke-on-Trent"
        description="Pathway Academy Zone provides trauma-informed Alternative Provision for ages 11–16. Empowering young people through academic and vocational success."
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Students working together in a classroom"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-transparent" />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-md border border-white/10">
                Ofsted Registered Alternative Provision
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
                Empowering Young People to <span className="text-primary">Succeed</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed">
                Specialist trauma-informed education and vocational pathways for learners aged 11–16 in Stoke-on-Trent and Staffordshire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="xl" className="rounded-full shadow-xl shadow-primary/20">
                  <Link to="/referral">Make a Referral <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="rounded-full border-white/20 bg-background/5 text-primary-foreground hover:bg-background/10 backdrop-blur-md">
                  <Link to="/about">Our Approach</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-py bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-[2rem] p-10 shadow-sm border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500">
                  <item.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-all duration-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroller Visualization */}
      <WhyItMattersScroller />

      {/* Stats Section */}
      <section className="section-py bg-primary relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-background rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-background/10 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/10">
                  <stat.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="text-4xl md:text-6xl font-bold text-primary-foreground mb-3">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-py bg-background">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Common Questions</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Find quick answers to help you understand our provision and how we support young people.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FaqItem key={faq.q} question={faq.q} answer={faq.a} index={idx} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full font-bold px-10 border-primary/20 hover:bg-primary/5 transition-all">
              <Link to="/faqs">View All FAQs <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Knowledge Hub Preview */}
      <section className="section-py bg-muted/30">
        <div className="container-wide">
          <div className="bg-card rounded-[3rem] p-10 md:p-20 border border-border shadow-sm flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="max-w-2xl relative z-10 text-center lg:text-left">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                Empowering the AP Sector with Expert Insights
              </h2>
              <p className="text-muted-foreground text-xl mb-10 leading-relaxed">
                Explore our Knowledge Hub for comprehensive guides on Alternative Provision, SEMH support, and educational best practices. Designed for schools, LAs, and parents.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <Button asChild size="xl" className="rounded-full font-bold px-10 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                  <Link to="/knowledge-hub">Visit Knowledge Hub</Link>
                </Button>
                <Button asChild variant="ghost" size="xl" className="rounded-full font-bold px-8 group hover:bg-primary/5 transition-all">
                  <Link to="/knowledge-hub/glossary">Browse Glossary <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-auto relative z-10">
              <div className="bg-background rounded-[2rem] border border-border/50 p-10 shadow-2xl max-w-sm mx-auto rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-foreground">Featured Resource</span>
                </div>
                <h3 className="font-display font-bold text-2xl mb-4 leading-tight">The Complete Guide to AP</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">A 5,000+ word deep dive into Alternative Provision legislation and practice.</p>
                <Link to="/knowledge-hub/complete-guide" className="text-primary font-bold hover:underline inline-flex items-center gap-2 group/link">
                  Read Now <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-py bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-7xl font-bold text-primary-foreground mb-10 leading-tight">
              Start the Journey Today
            </h2>
            <p className="text-primary-foreground/80 text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
              Whether you're a school, local authority, or parent, our specialist team is ready to support your young person's educational journey through empathy and expertise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Button
                asChild
                size="xl"
                className="rounded-full bg-background text-primary hover:bg-background/90 font-bold px-12 h-20 text-xl shadow-2xl scale-110 active:scale-105 transition-all"
              >
                <Link to="/referral">Make a Referral <ArrowRight className="ml-3 h-8 w-8" /></Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent text-primary-foreground hover:bg-background/10 hover:text-primary-foreground backdrop-blur-sm px-10 h-20 text-xl font-bold transition-all"
              >
                <Link to="/contact">Speak to our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-card rounded-[1.5rem] border overflow-hidden transition-all duration-300 ${
        open ? "border-primary/40 shadow-xl" : "border-border/50 hover:border-border hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full font-display font-bold text-foreground flex items-center justify-between p-8 text-left gap-6"
      >
        <span className="text-lg md:text-xl">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            open ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.25 }}
              className="px-8 pb-8 text-muted-foreground text-lg leading-relaxed"
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
