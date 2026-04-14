import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Award, Heart } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const team = [
  {
    name: "Sarah Martinez",
    role: "Co-Founder & Lead Trainer",
    since: "Employee-owner since 2005",
    certs: ["CPDT-KA Certified", "Fear Free Professional"],
    experience: "15 years in positive reinforcement training",
    pets: "Luna (rescue beagle) and Oliver (senior tabby)",
    quote: "Watching a fearful dog gain confidence is the most rewarding work I can imagine.",
    initials: "SM",
  },
  {
    name: "Michael Chen",
    role: "Boarding Manager",
    since: "Employee-owner since 2010",
    certs: ["Certified Pet First Aid & CPR"],
    experience: "12 years in boutique pet care",
    pets: "Two rescue huskies, Koda and Storm",
    quote: "Building trust with nervous boarders and seeing them excited to return is my favorite part.",
    initials: "MC",
  },
  {
    name: "Jennifer Park",
    role: "Grooming Specialist",
    since: "Employee-owner since 2012",
    certs: ["Certified Master Groomer", "Eco-Grooming Specialist"],
    experience: "18 years grooming experience",
    pets: "Maximus (standard poodle) and three rescue cats",
    quote: "Grooming isn't just about looks—it's health and comfort.",
    initials: "JP",
  },
  {
    name: "David Thompson",
    role: "Daycare Coordinator",
    since: "Employee-owner since 2015",
    certs: ["Canine Behavior Certification", "Pet Nutrition Advisor"],
    experience: "10 years in dog daycare management",
    pets: "Bella (lab mix) and rescue rabbit Clover",
    quote: "Every dog has a unique personality. Learning their quirks never gets old.",
    initials: "DT",
  },
  {
    name: "Lisa Nguyen",
    role: "Assistant Manager",
    since: "Employee-owner since 2018",
    certs: ["Fear Free Certified", "Pet First Aid"],
    experience: "8 years in animal care",
    pets: "Two senior rescues, Charlie and Bailey",
    quote: "Senior dogs have my heart. They taught me that love can heal past trauma.",
    initials: "LN",
  },
];

export default function TeamPage() {
  return (
    <Layout>
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our People</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-2 mb-6">Meet the Team</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Every team member is an employee-owner with a personal stake in quality care. Average tenure: 8+ years.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12">
            {team.map((member, i) => (
              <motion.div key={member.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center md:items-start shrink-0">
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-2xl font-display font-bold text-primary mb-3">
                      {member.initials}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground text-center md:text-left">{member.name}</h3>
                    <p className="text-primary text-sm font-medium">{member.role}</p>
                    <p className="text-muted-foreground text-xs mt-1">{member.since}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.certs.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-xs font-medium text-secondary-foreground">
                          <Award className="h-3 w-3" /> {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{member.experience}</p>
                    <p className="text-sm text-muted-foreground mb-4">🐾 {member.pets}</p>
                    <blockquote className="italic text-foreground/70 border-l-4 border-primary pl-4 font-serif text-sm">
                      <Heart className="h-4 w-4 text-primary inline mr-1" />"{member.quote}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
