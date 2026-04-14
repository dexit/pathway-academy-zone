import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import boardingImg from "@/assets/boarding-suite.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const suites = [
  {
    name: "Garden Suite",
    price: 75,
    size: "120 sq ft",
    bestFor: "Dogs up to 50 lbs",
    features: [
      "Private indoor/outdoor access with personal patio door",
      "Raised orthopedic bed with organic cotton bedding",
      "Climate-controlled interior space",
      "Natural wood finishes and calming earth tones",
      "Window views of meadow play areas",
    ],
  },
  {
    name: "Cottage Suite",
    price: 110,
    size: "180 sq ft",
    bestFor: "Larger dogs or those needing extra space",
    popular: true,
    features: [
      "Spacious private room with premium amenities",
      "Private covered patio with natural landscaping",
      "Memory foam bed with organic bedding options",
      "Soft lighting and nature sound system",
      "Elevated feeding station",
    ],
  },
  {
    name: "Family Suite",
    price: 145,
    size: "250 sq ft",
    bestFor: "Bonded pairs or siblings (up to 3 dogs)",
    features: [
      "Multi-pet accommodation for bonded pairs",
      "Largest space with multiple rest areas",
      "Separate feeding stations",
      "Shared patio access with privacy fencing",
      "Multiple bed options (orthopedic and standard)",
    ],
  },
];

const included = [
  "Natural treats throughout the day",
  "Individual playtime in natural areas (3x daily)",
  "Personalized routine following home schedule",
  "Daily photo updates via mobile app",
  "Evening bedtime story and calming music",
  "Webcam access to common play areas",
];

export default function BoardingPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={boardingImg} alt="Cozy boarding suite" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Boutique Boarding
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">Private suites designed for comfort. Limited to 12 dogs per night.</p>
        </div>
      </section>

      {/* Availability */}
      <section className="py-4 bg-primary">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-primary-foreground text-sm">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-full" /> Tonight: 3 suites remaining</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-limited" /> This Weekend: Limited</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-available" /> Next Week: Good availability</span>
        </div>
      </section>

      {/* Suites */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {suites.map((suite, i) => (
              <motion.div key={suite.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`relative bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${suite.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border/50'}`}>
                {suite.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
                )}
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">{suite.name}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{suite.size} · {suite.bestFor}</p>
                  <div className="flex items-baseline gap-1 my-6">
                    <span className="font-display text-4xl font-bold text-primary">${suite.price}</span>
                    <span className="text-muted-foreground text-sm">/night</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {suite.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant={suite.popular ? "hero" : "outline"} className="w-full" size="lg">
                    <Link to={`/booking?service=boarding-${suite.name.split(" ")[0].toLowerCase()}`}>Check Availability <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground">Included With Every Stay</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-card rounded-xl p-4 shadow-sm">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6">Organic breakfast and dinner options available (+$12/day)</p>
        </div>
      </section>
    </Layout>
  );
}
