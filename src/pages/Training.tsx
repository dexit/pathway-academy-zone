import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Shield, Award, ArrowRight, Check } from "lucide-react";
import trainingImg from "@/assets/training.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const focusAreas = [
  "Basic Manners: Sit, stay, come, loose-leash walking",
  "Socialization: Positive interactions with dogs and people",
  "Anxiety Reduction: Techniques for fearful or stressed dogs",
  "Problem Solving: Jumping, barking, pulling management",
  "Puppy Foundations: Early learning for young dogs",
  "Advanced Skills: Off-leash reliability, impulse control",
];

const sessions = [
  { name: "Private Session", duration: "60 min one-on-one", price: 95 },
  { name: "5-Session Package", duration: "Save $50", price: 425, popular: true },
  { name: "10-Session Package", duration: "Save $150", price: 800 },
  { name: "Group Class (6 wks)", duration: "90 min, 3–4 dogs", price: 240 },
];

export default function TrainingPage() {
  return (
    <Layout>
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={trainingImg} alt="Dog training session" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Positive Training
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">100% force-free. Reward-based. Science-backed.</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <blockquote className="text-2xl italic text-foreground/80 border-l-4 border-primary pl-6 font-serif leading-relaxed">
            "Patience and understanding for every dog. No prong collars, shock collars, or aversive techniques—just rewards, play, and praise."
          </blockquote>
          <div className="flex flex-wrap gap-3 mt-8">
            {["CPDT-KA Certified", "KPA CTP Partner", "Fear Free Certified"].map((c) => (
              <span key={c} className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 text-sm font-medium text-secondary-foreground">
                <Award className="h-4 w-4" /> {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {focusAreas.map((f) => (
              <div key={f} className="flex items-start gap-3 bg-card rounded-xl p-4 shadow-sm">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/80 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {sessions.map((s) => (
              <div key={s.name} className={`relative bg-card rounded-xl p-6 text-center shadow-sm border ${s.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border/50'}`}>
                {s.popular && <span className="absolute -top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Best Value</span>}
                <h3 className="font-display text-lg font-bold text-foreground">{s.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{s.duration}</p>
                <p className="font-display text-3xl font-bold text-primary mt-4">${s.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="hero" size="xl">
              <Link to="/booking?service=training-private">Book Training <ArrowRight className="ml-1 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
