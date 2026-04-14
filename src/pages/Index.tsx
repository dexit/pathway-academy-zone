import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Leaf, Users, Award, ArrowRight, Star, Home, Dog, Scissors, GraduationCap, Heart, Clock, UserCheck, Settings } from "lucide-react";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero-dogs.jpg";
import boardingImg from "@/assets/boarding-suite.jpg";
import daycareImg from "@/assets/daycare-dogs.jpg";
import groomingImg from "@/assets/grooming.jpg";
import trainingImg from "@/assets/training.jpg";

const trustBadges = [
  { icon: Shield, label: "Limited to 12 Dogs Per Night" },
  { icon: Leaf, label: "100% Eco-Friendly Practices" },
  { icon: Users, label: "Employee-Owned Since 1992" },
  { icon: Award, label: "Award-Winning Natural Care" },
];

const services = [
  { icon: Home, title: "Boutique Boarding", desc: "Private suites with natural bedding and outdoor access", img: boardingImg, path: "/boarding" },
  { icon: Dog, title: "Small Group Daycare", desc: "Never more than 8 dogs per playgroup", img: daycareImg, path: "/daycare" },
  { icon: Scissors, title: "Organic Grooming", desc: "Chemical-free products, gentle care", img: groomingImg, path: "/grooming" },
  { icon: GraduationCap, title: "Positive Training", desc: "Force-free methods in calm environments", img: trainingImg, path: "/training" },
];

const whyBoutique = [
  { icon: Heart, title: "Individual Attention", desc: "With limited capacity, we know every pet by name and personality" },
  { icon: Shield, title: "Stress-Free Environment", desc: "Small groups mean calmer, happier pets" },
  { icon: UserCheck, title: "Consistent Care Team", desc: "Same loving staff members every visit" },
  { icon: Settings, title: "Flexible Routines", desc: "We adapt to your pet's schedule, not ours" },
];

const testimonials = [
  { text: "Luna has stayed at many facilities, but Boutique Boarding is the only place she's excited to visit. The staff knows her quirks and keeps her routine exactly as we do at home.", author: "Rachel Martinez", pet: "Luna's Mom" },
  { text: "As someone who cares deeply about sustainability, I love that they use solar power and organic products. My dogs come home clean, happy, and the planet isn't paying the price.", author: "David Chen", pet: "Dog Dad" },
  { text: "The small group size makes all the difference. Max is anxious around too many dogs, and here he actually plays and socializes at his own pace.", author: "Jennifer Park", pet: "Max's Mom" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="order-2 lg:order-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 border border-border">
                🌿 Boutique Pet Sanctuary
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6">
                Small Groups.
                <br />
                <span className="italic text-primary">Big Love.</span>
                <br />
                Natural Care.
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-lg">
                A boutique sanctuary where every pet receives individual attention in a natural, stress-free environment.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/book-tour">Book a Tour <ArrowRight className="ml-1 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/boarding">View Suites</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src={heroImg}
                  alt="Happy dog looking at camera"
                  className="w-full h-[500px] lg:h-[640px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary/50 rounded-xl p-6 text-center"
              >
                <badge.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="text-sm font-semibold text-foreground">{badge.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Services</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">Everything Your Pet Needs</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={s.path}
                  className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

      {/* Why Boutique */}
      <section className="py-20 bg-muted/40 bg-blob-green">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Why Boutique?</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">Small By Design</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whyBoutique.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-card rounded-xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
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

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Testimonials</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">What Pet Parents Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 relative"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 italic leading-relaxed mb-6 font-serif">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.pet}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--forest)/0.5),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Visit?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
              Schedule a tour and see why pet parents choose Boutique Boarding for their furry family members.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" className="bg-card text-primary hover:bg-card/90 rounded-full font-semibold shadow-lg">
                <Link to="/book-tour">Schedule a Tour</Link>
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
