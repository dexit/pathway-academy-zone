import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sun, Droplets, TreePine, Award, ArrowRight } from "lucide-react";
import facilityImg from "@/assets/facility.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const outdoorAreas = [
  { name: "Meadow Field", desc: "2-acre open grass area with agility elements" },
  { name: "Shaded Grove", desc: "Tree-covered zone for hot day relief" },
  { name: "Water Garden", desc: "Seasonal splash pools and misting stations" },
  { name: "Quiet Corner", desc: "Low-stimulation area for gentle play" },
  { name: "Training Yard", desc: "Dedicated space for lessons and practice" },
];

const indoorSpaces = [
  { name: "Climate-Controlled Suites", desc: "Individual temperature control, 68–72°F" },
  { name: "Common Play Room", desc: "1,200 sq ft with natural lighting" },
  { name: "Grooming Studio", desc: "Spa-like environment with calming features" },
  { name: "Training Room", desc: "Quiet, distraction-free learning space" },
];

const ecoFeatures = [
  { icon: Sun, text: "40 Solar Panels generating 100% of facility power" },
  { icon: Droplets, text: "2,000-gallon rainwater collection system" },
  { icon: TreePine, text: "Native, drought-resistant landscaping" },
];

const awards = [
  { title: "Best Pet Care Facility 2023", org: "Local Green Business Awards" },
  { title: "Eco-Champion Certification 2022", org: "State Environmental Council" },
  { title: "Top-Rated Pet Resort 2020–2024", org: "Pet Parents Magazine" },
];

export default function FacilityPage() {
  return (
    <Layout>
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={facilityImg} alt="Boutique Boarding facility" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Our Facility
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">3 acres of eco-friendly, pesticide-free paradise.</p>
        </div>
      </section>

      {/* Outdoor */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Natural Play Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outdoorAreas.map((a, i) => (
              <motion.div key={a.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-muted/40 rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{a.name}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Indoor */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Indoor Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {indoorSpaces.map((s, i) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-background rounded-xl p-6 border border-border/50">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco + Awards */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">Eco Features</h2>
              <div className="space-y-6">
                {ecoFeatures.map((e) => (
                  <div key={e.text} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center shrink-0"><e.icon className="h-5 w-5 text-primary" /></div>
                    <p className="text-foreground/80 text-sm">{e.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">Awards</h2>
              <div className="space-y-4">
                {awards.map((a) => (
                  <div key={a.title} className="bg-card rounded-xl p-4 shadow-sm flex items-start gap-3">
                    <Award className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <Button asChild variant="hero" size="xl">
              <Link to="/book-tour">Schedule a Tour <ArrowRight className="ml-1 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
