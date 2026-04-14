import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Leaf, Sun, Droplets, Recycle, Users, Heart, TreePine, Award } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const smallByDesign = [
  "Maximum 12 dogs for overnight boarding at any given time",
  "Daycare groups capped at 8 dogs per session",
  "One staff member for every 4 dogs during active hours",
  "Private or semi-private accommodations only",
];

const sustainability = [
  { icon: Sun, text: "100% solar-powered facility since 2018" },
  { icon: Droplets, text: "Rainwater collection system for outdoor irrigation" },
  { icon: Leaf, text: "Eco-friendly cleaning products (plant-based, biodegradable)" },
  { icon: Recycle, text: "Recycled and sustainable building materials" },
  { icon: TreePine, text: "Composting program for organic waste" },
  { icon: Droplets, text: "Water-efficient fixtures throughout" },
];

const stats = [
  { value: "12", label: "Max Dogs Per Night" },
  { value: "8", label: "Max Per Playgroup" },
  { value: "1:4", label: "Staff to Pet Ratio" },
  { value: "8+", label: "Avg Staff Tenure (yrs)" },
];

export default function PhilosophyPage() {
  return (
    <Layout>
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Philosophy</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-2 mb-6">Small By Design</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We believe that quality pet care starts with limiting capacity. Fewer pets means more love, more attention, and a calmer environment for everyone.</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center bg-secondary rounded-2xl p-8">
                <span className="font-display text-4xl md:text-5xl font-bold text-primary">{s.value}</span>
                <p className="text-sm font-medium text-foreground mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Small by design details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Leaf className="h-8 w-8 text-primary mb-4" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Capacity Limits</h2>
              <ul className="space-y-4">
                {smallByDesign.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Users className="h-8 w-8 text-primary mb-4" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Employee Ownership</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Founded in 1992, employee-owned since 2005. Every team member has a stake in quality care.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">Long-term staff retention (average 8+ years) means consistent, familiar faces for your pets.</p>
              <p className="text-muted-foreground leading-relaxed">Ongoing training and certification programs keep our team at the forefront of animal care.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Sustainability</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-2">Caring for Pets & Planet</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sustainability.map((item, i) => (
              <motion.div key={item.text} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-foreground text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
