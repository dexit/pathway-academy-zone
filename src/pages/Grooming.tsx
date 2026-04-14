import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, Sparkles, ArrowRight } from "lucide-react";
import groomingImg from "@/assets/grooming.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const groomingServices = [
  { name: "Organic Bath", desc: "Gentle cleansing with moisturizing plant-based shampoo and conditioner" },
  { name: "Natural Coat Treatment", desc: "Deep conditioning with coconut oil and aloe vera" },
  { name: "Gentle Nail Care", desc: "Stress-free trimming and filing" },
  { name: "Ear Cleaning", desc: "Natural solution with organic witch hazel" },
  { name: "Teeth Brushing", desc: "Enzymatic paste with natural mint" },
  { name: "Paw Pad Conditioning", desc: "Organic shea butter treatment" },
];

const spaServices = [
  { name: "Oatmeal Soothing Bath", desc: "Colloidal oatmeal for sensitive skin and allergies" },
  { name: "Coconut Oil Conditioning", desc: "Deep moisture treatment for dry coats" },
  { name: "Lavender Calming Spa", desc: "Aromatherapy bath for anxious pets" },
  { name: "De-Shedding Treatment", desc: "Natural oils to loosen undercoat" },
  { name: "Puppy Introduction", desc: "Extra-gentle first grooming experience" },
];

const pricing = [
  { size: "Small", weight: "Under 25 lbs", range: "$45–65" },
  { size: "Medium", weight: "25–55 lbs", range: "$60–85" },
  { size: "Large", weight: "55–85 lbs", range: "$75–105" },
  { size: "Extra Large", weight: "85+ lbs", range: "$90–125" },
];

export default function GroomingPage() {
  return (
    <Layout>
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={groomingImg} alt="Dog being groomed" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Organic Grooming & Spa
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">100% plant-based. Zero harsh chemicals. Pure gentle care.</p>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-12 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {["Plant-based shampoos", "No synthetic fragrances", "Certified organic", "Cruelty-free", "Biodegradable packaging"].map((c) => (
              <span key={c} className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                <Leaf className="h-4 w-4 text-primary" /> {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grooming Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Grooming Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groomingServices.map((s, i) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-muted/40 rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spa */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Sparkles className="h-8 w-8 text-accent mx-auto mb-3" />
            <h2 className="font-display text-3xl font-bold text-foreground">Spa Treatments</h2>
            <p className="text-muted-foreground text-sm mt-2">Add $15–30 to any grooming service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaServices.map((s, i) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-background rounded-xl p-6 border border-border/50">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Pricing by Size</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pricing.map((p) => (
              <div key={p.size} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
                <h3 className="font-display text-lg font-bold text-foreground">{p.size}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.weight}</p>
                <p className="font-display text-2xl font-bold text-primary mt-4">{p.range}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="hero" size="xl">
              <Link to="/booking?service=grooming">Book Grooming <ArrowRight className="ml-1 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
