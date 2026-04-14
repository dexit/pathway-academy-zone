import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Dog, ArrowRight } from "lucide-react";
import daycareImg from "@/assets/daycare-dogs.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const schedule = [
  { time: "7:00–9:00 AM", activity: "Arrival and settling in" },
  { time: "9:00–10:30 AM", activity: "First play session with structured activities" },
  { time: "10:30–11:00 AM", activity: "Rest period with calming music" },
  { time: "11:00 AM–12:30 PM", activity: "Second play session with free play" },
  { time: "12:30–1:30 PM", activity: "Midday rest, organic treats, water" },
  { time: "1:30–3:00 PM", activity: "Third play session with enrichment games" },
  { time: "3:00–3:30 PM", activity: "Quiet time and grooming check" },
  { time: "3:30–5:00 PM", activity: "Final play session, wind down" },
  { time: "5:00–6:00 PM", activity: "Pickup time with daily report" },
];

const pricing = [
  { name: "Full Day", time: "7 AM – 6 PM", price: 48 },
  { name: "Half Day", time: "7 AM – 12 PM or 1 – 6 PM", price: 32 },
  { name: "5-Day Package", time: "Save $25", price: 215, badge: "Popular" },
  { name: "10-Day Package", time: "Save $70", price: 410 },
  { name: "20-Day Package", time: "Save $190", price: 770, badge: "Best Value" },
];

const groups = [
  { label: "Small Dogs", filled: 6, total: 8 },
  { label: "Medium Dogs", filled: 8, total: 8, full: true },
  { label: "Large Dogs", filled: 4, total: 8 },
];

export default function DaycarePage() {
  return (
    <Layout>
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={daycareImg} alt="Dogs playing together" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Small Group Daycare
          </motion.h1>
          <p className="text-7xl font-display font-bold text-primary-foreground/90 mt-4">8 Dogs Max</p>
          <p className="text-primary-foreground/70 text-lg mt-2">Never more than 8 dogs per playgroup. Ever.</p>
        </div>
      </section>

      {/* Groups Today */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">Today's Groups</h2>
          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g.label} className="bg-background rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground text-sm">{g.label}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${g.full ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-secondary-foreground'}`}>
                    {g.full ? 'FULL – Waitlist' : `${g.filled}/${g.total} spots filled`}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${g.full ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${(g.filled / g.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Daily Schedule</h2>
          <div className="border-l-4 border-primary pl-6 space-y-6">
            {schedule.map((s) => (
              <motion.div key={s.time} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
                <div className="absolute -left-[34px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-foreground">{s.time}</span>
                    <p className="text-sm text-muted-foreground">{s.activity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {pricing.map((p) => (
              <div key={p.name} className="relative bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
                {p.badge && <span className="absolute -top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
                <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.time}</p>
                <p className="font-display text-3xl font-bold text-primary mt-4">${p.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="hero" size="xl">
              <Link to="/booking?service=daycare-full">Enroll Now <ArrowRight className="ml-1 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
