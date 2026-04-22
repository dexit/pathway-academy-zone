import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { stats, approaches, faqs, latestPosts } from "@/config/data/homepage";
import { SITE_NAME, SITE_URL } from "@/config/site";
import WhyItMattersScroller from "@/components/WhyItMattersScroller";

const heroImg = "/assets/hero-classroom.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HomePage() {
  return (
    <Layout>
      <Seo
        title="Level Up Your Future"
        description="Pathway Academy Zone: The premier Alternative Provision in Stoke-on-Trent for young adults ready to re-define their educational journey."
      />

      {/* Immersive Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <img src={heroImg} className="w-full h-full object-cover opacity-20 scale-110 blur-sm" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mask-radial"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em] mb-8 border border-primary/20 backdrop-blur-md">
              The Next Generation of Learning
            </span>
            <h1 className="text-hero mb-8">
              FIND YOUR <span className="text-primary italic text-glow">PATHWAY</span><br />
              OWN YOUR <span className="text-foreground italic">FUTURE</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              We aren't just another school. We are your launchpad. Specialist SEMH support and vocational excellence for ages 11-16 in Stoke-on-Trent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" variant="hero">
                <Link to="/referral">START THE JOURNEY <ArrowRight className="ml-2 h-6 w-6" /></Link>
              </Button>
              <Button asChild size="lg" variant="heroPill">
                <Link to="/programmes">EXPLORE PATHS</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary opacity-50"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      {/* Stats - Gamified Pulse */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="text-6xl md:text-7xl font-display font-black text-primary mb-2 transition-transform group-hover:scale-110 duration-500">
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-background/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Kinetic Greenhouse - Interactive Story */}
      <WhyItMattersScroller />

      {/* Core Approach - Breaking the Grid */}
      <section className="py-32 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">THE BLUEPRINT</span>
              <h2 className="text-5xl md:text-7xl mb-8">OUR CORE <span className="text-primary">DNA</span></h2>
              <p className="text-muted-foreground text-xl mb-12">We combine radical empathy with high-tech skills to ensure you don't just pass—you thrive.</p>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/about">LEARN THE METHOD</Link>
              </Button>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {approaches.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-10 rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 active:scale-95"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl mb-4 uppercase italic">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Vibe - Blog */}
      <section className="py-32 bg-accent/30 border-y border-accent/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">THE FEED</span>
              <h2 className="text-5xl md:text-7xl tracking-tighter">LATEST <span className="text-primary">INTEL</span></h2>
            </div>
            <Button asChild variant="heroPill">
              <Link to="/blog" className="gap-2">VIEW ALL POSTS <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {latestPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group relative overflow-hidden rounded-xl bg-card border border-border/50 aspect-[16/9] md:aspect-[21/9]">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/20 transition-colors duration-700" />
                <div className="absolute bottom-0 left-0 p-10 z-20">
                  <span className="text-primary font-black text-xs uppercase tracking-widest mb-4 block">{post.date}</span>
                  <h3 className="text-3xl md:text-4xl text-foreground mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-base max-w-xl line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Minimal & Sharp */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl mb-6">READY TO <span className="text-primary italic">SYNC?</span></h2>
            <p className="text-muted-foreground text-xl">Quick answers to the common mission criticals.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <FaqItem key={faq.q} question={faq.q} answer={faq.a} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-primary relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-white/10 rounded-full blur-[150px] pointer-events-none"
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-6xl md:text-9xl font-display font-black text-primary-foreground mb-12 tracking-tighter uppercase italic">
            YOUR TURN <span className="text-foreground">NOW.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="bg-white text-primary hover:scale-110 transition-physics px-16 py-10 rounded-full text-xl shadow-2xl">
              <Link to="/referral">START REFERRAL</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-primary px-16 py-10 rounded-full text-xl backdrop-blur-md">
              <Link to="/contact">TALK TO TEAM</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`bg-card border overflow-hidden transition-all duration-500 ${
        open ? "border-primary/50 shadow-2xl scale-[1.02]" : "border-border/50 hover:border-primary/20"
      } rounded-xl`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-8 text-left group"
      >
        <span className="text-xl font-bold uppercase italic tracking-tighter group-hover:text-primary transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          className={`p-2 rounded-full ${open ? "bg-primary text-primary-foreground" : "bg-accent/20 text-primary"}`}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-8 pt-0 text-muted-foreground text-lg border-t border-border/10 mt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
