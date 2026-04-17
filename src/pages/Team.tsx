import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout.tsx";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const team = [
  { name: "Martin Chandler", role: "Head of Community and Engagement (Safeguarding)", img: "https://pathwayacademyzone.co.uk/assets/martin-chandler-DvF3rkDn.png" },
  { name: "Liam Farrall", role: "Head of Alternative Provision", img: "https://pathwayacademyzone.co.uk/assets/liam-farrall-DwXnuzxA.jpg" },
  { name: "Gemma Mason, QTLS", role: "SENCO Lead", img: "https://pathwayacademyzone.co.uk/assets/gemma-mason-Dplhj7uo.jpeg" },
  { name: "Ahsan Hussain", role: "Head of Partnerships and Impact", img: "https://pathwayacademyzone.co.uk/assets/ahsan-hussain-OIFhfXvg.png" },
  { name: "Zulekha Ali", role: "HR and Executive Support", img: "https://pathwayacademyzone.co.uk/assets/zulekha-ali-Dfoelgdx.png" },
];
const execs = [
  { name: "Safaraz Ali", role: "Founder & CEO", img: "https://pathwayacademyzone.co.uk/assets/safaraz-ali-R0JVDMEt.png" },
  { name: "Waheed Azam", role: "Executive Director", img: "https://pathwayacademyzone.co.uk/assets/waheed-azam-DQhc8GBT.jpeg" },
];

export default function Team() {
  return (
    <Layout>
      <section className="py-32 bg-muted/30"><div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Team</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Meet the People Behind Pathway Academy Zone</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our dedicated team of educators, mentors, and specialists work together to support every young person on their journey.</p>
      </div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((m, i) => (<motion.div key={m.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] overflow-hidden bg-muted"><img src={m.img} alt={m.name} className="w-full h-full object-cover" loading="lazy" /></div>
            <div className="p-6 text-center"><h3 className="font-display text-lg font-bold text-foreground">{m.name}</h3><p className="text-muted-foreground text-sm mt-1">{m.role}</p></div>
          </motion.div>))}
        </div>
      </div></section>
      <section className="py-24 bg-muted/50"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">Executive Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {execs.map((m, i) => (<motion.div key={m.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] overflow-hidden bg-muted"><img src={m.img} alt={m.name} className="w-full h-full object-cover" loading="lazy" /></div>
            <div className="p-6 text-center"><h3 className="font-display text-lg font-bold text-foreground">{m.name}</h3><p className="text-muted-foreground text-sm mt-1">{m.role}</p></div>
          </motion.div>))}
        </div>
      </div></section>
      <section className="py-16 bg-background text-center"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Join Our Team</h2>
        <p className="text-muted-foreground mb-8">We're always looking for passionate educators and support staff who share our vision for transforming young lives.</p>
        <Button asChild><Link to="/careers">View Current Vacancies <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
      </div></section>
    </Layout>
  );
}
