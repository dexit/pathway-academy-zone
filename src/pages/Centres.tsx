import { motion } from "framer-motion";
import { MapPin, Clock, Monitor, Users, Coffee, Bus } from "lucide-react";
import Layout from "@/components/Layout";
import buildingImg from "@/assets/building-exterior.jpg";
import classroomImg from "@/assets/classroom-learning.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  { icon: Users, title: "Learning Rooms", desc: "Bright, calm classrooms designed for small group teaching" },
  { icon: Coffee, title: "Breakout Spaces", desc: "Quiet areas for 1:1 support and emotional regulation" },
  { icon: Monitor, title: "IT Suite", desc: "Modern computers for digital learning and research" },
  { icon: Bus, title: "Transport Links", desc: "Good public transport access and parking available" },
];

const schedule = [
  { time: "8:45 - 9:00", activity: "Arrival & Check-in" },
  { time: "9:00 - 9:15", activity: "Morning Registration & Wellbeing Check" },
  { time: "9:15 - 10:30", activity: "Session 1 - Core Learning" },
  { time: "10:30 - 10:45", activity: "Break" },
  { time: "10:45 - 12:00", activity: "Session 2 - Academic or Vocational" },
  { time: "12:00 - 12:45", activity: "Lunch & Social Time" },
  { time: "12:45 - 14:00", activity: "Session 3 - Personal Development / SEMH" },
  { time: "14:00 - 14:15", activity: "Break" },
  { time: "14:15 - 15:00", activity: "Session 4 - Enrichment Activities" },
  { time: "15:00 - 15:15", activity: "End of Day Review & Departure" },
];

export default function Centres() {
  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Centres & Facilities</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Our Learning Environments</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our centres are designed to feel safe, calm, and welcoming — environments where young people can focus on learning and growth.</p>
          </motion.div>
        </div>
      </section>

      {/* Burslem Centre */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Burslem Learning Centre</h2>
            <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />Monday - Friday, 8:30am - 4:00pm</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">Our purpose-built centre in Burslem provides a welcoming environment for learning. With small classrooms, dedicated breakout spaces, and specialist areas for vocational learning, we create the conditions for every young person to thrive.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border/50 text-center">
                <f.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold text-foreground text-sm mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-xs">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <img src={buildingImg} alt="Building exterior" className="rounded-xl shadow-lg w-full col-span-1 md:col-span-2 h-64 object-cover" loading="lazy" />
            <div className="grid grid-rows-2 gap-4">
              <img src={classroomImg} alt="Classroom" className="rounded-xl shadow-lg w-full h-full object-cover" loading="lazy" />
              <img src={mentoringImg} alt="Support room" className="rounded-xl shadow-lg w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Schedule */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">A Typical Day</h2>
            <p className="text-muted-foreground mb-6">Our structured timetable provides routine and predictability while allowing flexibility for individual needs.</p>
            <div className="space-y-2">
              {schedule.map((s) => (
                <div key={s.time} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border/50">
                  <span className="text-primary font-mono font-semibold text-sm w-28 shrink-0">{s.time}</span>
                  <span className="text-foreground text-sm">{s.activity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
