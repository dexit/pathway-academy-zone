import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Monitor, BookOpen, Coffee, Bus, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import buildingImg from "@/assets/building-exterior.jpg";
import classroomImg from "@/assets/classroom-learning.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";
import vocationalImg from "@/assets/vocational-training.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const facilities = [
  { icon: BookOpen, title: "Learning Rooms", desc: "Bright, calm classrooms designed for small group teaching" },
  { icon: Coffee, title: "Breakout Spaces", desc: "Quiet areas for 1:1 support and emotional regulation" },
  { icon: Monitor, title: "IT Suite", desc: "Modern computers for digital learning and research" },
  { icon: Bus, title: "Transport Links", desc: "Good public transport access and parking available" },
];
const timetable = [
  { time: "8:45 - 9:00", activity: "Arrival & Check-in" },{ time: "9:00 - 9:15", activity: "Morning Registration & Wellbeing Check" },
  { time: "9:15 - 10:30", activity: "Session 1 - Core Learning" },{ time: "10:30 - 10:45", activity: "Break" },
  { time: "10:45 - 12:00", activity: "Session 2 - Academic or Vocational" },{ time: "12:00 - 12:45", activity: "Lunch & Social Time" },
  { time: "12:45 - 14:00", activity: "Session 3 - Personal Development / SEMH" },{ time: "14:00 - 14:15", activity: "Break" },
  { time: "14:15 - 15:00", activity: "Session 4 - Enrichment Activities" },{ time: "15:00 - 15:15", activity: "End of Day Review & Departure" },
];

export default function Centres() {
  return (
    <Layout>
      <section className="py-32 bg-muted/30"><div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Centres & Facilities</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Learning Environments</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our centres are designed to feel safe, calm, and welcoming – environments where young people can focus on learning and growth.</p>
      </div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Burslem Learning Centre</h2>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Address</p><p className="text-muted-foreground text-sm">Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ</p></div></div>
            <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Opening Hours</p><p className="text-muted-foreground text-sm">Monday - Friday, 8:30am - 4:00pm</p></div></div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-8">Our purpose-built centre in Burslem provides a welcoming environment for learning. With small classrooms, dedicated breakout spaces, and specialist areas for vocational learning, we create the conditions for every young person to thrive.</p>
          <div className="grid grid-cols-2 gap-4">{facilities.map((f) => (<div key={f.title} className="bg-muted/50 rounded-xl p-4 border border-border/50"><f.icon className="h-5 w-5 text-primary mb-2" /><h4 className="font-display font-bold text-foreground text-sm mb-1">{f.title}</h4><p className="text-muted-foreground text-xs">{f.desc}</p></div>))}</div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          <img src={buildingImg} alt="Pathway Academy Zone building" className="rounded-2xl shadow-lg w-full" loading="lazy" />
          <div className="grid grid-cols-2 gap-4"><img src={classroomImg} alt="Classroom" className="rounded-xl w-full h-40 object-cover" loading="lazy" /><img src={mentoringImg} alt="Support room" className="rounded-xl w-full h-40 object-cover" loading="lazy" /></div>
        </motion.div>
      </div></div></section>
      <section className="py-24 bg-muted/50"><div className="container mx-auto px-4 max-w-3xl"><motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">A Typical Day</h2>
        <p className="text-muted-foreground text-center mb-10">Our structured timetable provides routine and predictability while allowing flexibility for individual needs.</p>
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          {timetable.map((t, i) => (<div key={t.time} className={`flex items-center gap-4 px-6 py-4 ${i !== timetable.length - 1 ? "border-b border-border/50" : ""} ${t.activity.includes("Break") || t.activity.includes("Lunch") ? "bg-muted/30" : ""}`}><span className="text-sm font-mono text-primary font-medium w-28 shrink-0">{t.time}</span><span className="text-sm text-foreground">{t.activity}</span></div>))}
        </div>
      </motion.div></div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-10">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">{[buildingImg, classroomImg, mentoringImg, vocationalImg].map((img, i) => (<motion.img key={i} src={img} alt="Centre gallery" className="rounded-xl w-full h-56 object-cover" loading="lazy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} />))}</div>
      </div></section>
      <section className="py-16 bg-muted/50 text-center"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Visit Our Centre</h2>
        <p className="text-muted-foreground mb-8">We welcome visits from prospective families, referrers, and commissioners.</p>
        <Button asChild><Link to="/contact">Arrange a Visit <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
      </div></section>
    </Layout>
  );
}
