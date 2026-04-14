import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import careersImg from "@/assets/careers-event.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { value: "94%", label: "Improved Attendance" },
  { value: "87%", label: "Positive Destinations" },
  { value: "92%", label: "Improved Engagement" },
  { value: "78%", label: "Achieved Qualifications" },
];

const stories = [
  { title: "From Exclusion to Achievement", text: "Jordan came to us after permanent exclusion in Year 9, having not attended school for 6 months. Through our trauma-informed approach and vocational programme, he re-engaged with learning and achieved his GCSEs. He's now studying construction at college." },
  { title: "Overcoming Anxiety", text: "Mia struggled with severe anxiety that prevented her from attending mainstream school. Our small group setting and therapeutic support helped her rebuild confidence. She improved her attendance from 15% to 85% and is now considering her options for sixth form." },
  { title: "Finding a Pathway", text: "Tyler had been through multiple school placements and was labelled as 'unteachable'. At Pathway, he discovered a passion for motor mechanics through our vocational programme. He's now on an apprenticeship with a local garage." },
];

const testimonials = [
  { text: "Pathway Academy Zone gave my son a second chance. He went from refusing to attend school to genuinely enjoying learning. The staff truly care.", author: "Parent of Year 10 student" },
  { text: "The progress we've seen in our referred students has been remarkable. The team understand what these young people need and deliver it consistently.", author: "SENCO, Staffordshire Secondary School" },
  { text: "I actually want to come here. The teachers listen to me and don't give up when things get hard. I feel like I can do something with my life now.", author: "Year 11 Student" },
];

export default function Outcomes() {
  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Outcomes & Impact</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Making a Real Difference</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our success is measured by the progress our young people make — in attendance, engagement, qualifications, and most importantly, their futures.</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Measure */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">How We Measure Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Attendance & Engagement", desc: "We track attendance closely and celebrate improvements. Most students see significant gains within the first term.", stat: "94% of students improve attendance" },
              { title: "Academic Progress", desc: "Regular assessments track progress against individual targets. We celebrate every step forward.", stat: "78% achieve qualifications" },
              { title: "Positive Destinations", desc: "We track where students go after leaving us — college, training, employment, or return to mainstream.", stat: "87% move to positive destinations" },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border/50">
                <h3 className="font-display font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
                <p className="text-primary font-semibold text-sm">{item.stat}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src={careersImg} alt="Young people at careers event" className="rounded-2xl shadow-lg w-full" loading="lazy" />
            <img src={careersImg} alt="Skills advice session" className="rounded-2xl shadow-lg w-full" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Success Stories</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">Real Stories, Real Impact</h2>
            <p className="text-muted-foreground mt-2 text-sm">Names have been changed to protect privacy.</p>
          </motion.div>
          <div className="space-y-8">
            {stories.map((story) => (
              <motion.div key={story.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-card rounded-xl p-8 border border-border/50">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{story.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{story.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div key={t.author} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border/50">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-accent text-accent" />)}
                </div>
                <p className="text-foreground/80 italic text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-sm font-semibold text-muted-foreground">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
