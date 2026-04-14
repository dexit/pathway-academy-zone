import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import classroomImg from "@/assets/classroom-learning.jpg";
import vocationalImg from "@/assets/vocational-training.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";
import careersImg from "@/assets/careers-event.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const programmes = [
  {
    title: "Academic Re-engagement",
    desc: "Structured academic curriculum adapted for individual learning needs, focusing on core subjects and building confidence in learning.",
    features: ["English, Maths & Science", "PSHE / RSHE, RE, PE & Citizenship", "Small group teaching (max 6)", "Personalised learning plans"],
    schedule: "Full-time or part-time placements",
    hours: "Monday to Friday, 9:30am - 2:30pm",
    img: classroomImg,
  },
  {
    title: "Vocational Learning",
    desc: "Hands-on practical programmes developing real-world skills in areas like construction, catering, motor mechanics, and horticulture.",
    features: ["Industry-standard training", "Work experience placements", "Recognised qualifications", "Employer partnerships"],
    schedule: "1-2 days per week alongside academic",
    hours: "Varies by programme",
    img: vocationalImg,
  },
  {
    title: "SEMH Support",
    desc: "Therapeutic intervention and support for young people with social, emotional, and mental health needs, integrated throughout all provision.",
    features: ["1:1 therapeutic sessions", "Group workshops", "Emotional regulation support", "Family support sessions"],
    schedule: "Ongoing throughout placement",
    hours: "As needed, typically 2-3 sessions per week",
    img: mentoringImg,
  },
  {
    title: "Personal Development",
    desc: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.",
    features: ["Communication skills", "Problem-solving", "Team building", "Goal setting"],
    schedule: "Integrated into weekly timetable",
    hours: "2 hours per week minimum",
    img: careersImg,
  },
  {
    title: "Life Skills Programme",
    desc: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.",
    features: ["Cooking & nutrition", "Financial literacy", "Health education", "Digital skills including AI skills"],
    schedule: "Integrated into curriculum",
    hours: "Weekly sessions",
    img: classroomImg,
  },
  {
    title: "Employability Skills",
    desc: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.",
    features: ["CV & application support", "Interview preparation", "Work experience", "Careers guidance"],
    schedule: "Year 10 & 11 focus",
    hours: "Weekly sessions plus placements",
    img: careersImg,
  },
];

export default function Programmes() {
  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Programmes</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Pathways to Success</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We offer a range of structured programmes designed to meet individual needs, combining academic learning with vocational skills and therapeutic support.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 space-y-16">
          {programmes.map((prog, i) => (
            <motion.div key={prog.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <img src={prog.img} alt={prog.title} className="rounded-2xl shadow-lg w-full" loading="lazy" />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{prog.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{prog.desc}</p>
                <ul className="space-y-2 mb-6">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-foreground text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{prog.schedule}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{prog.hours}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Find the Right Programme</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">Every young person is unique. Contact us to discuss which pathway would best support your student's needs and goals.</p>
          <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90 rounded-lg">
            <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
