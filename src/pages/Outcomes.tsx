import { motion } from "framer-motion";
import { TrendingUp, Target, Users, UserCheck, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import mentoringImg from "@/assets/mentoring-session.jpg";
import careersImg from "@/assets/careers-event.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stats = [
  { icon: TrendingUp, value: "94%", label: "Improved Attendance" },
  { icon: Target, value: "87%", label: "Positive Destinations" },
  { icon: Users, value: "92%", label: "Improved Engagement" },
  { icon: UserCheck, value: "78%", label: "Achieved Qualifications" },
];
const progress = [
  { title: "Attendance & Engagement", desc: "We track attendance closely and celebrate improvements. Most students see significant gains within the first term.", pct: 94, stat: "94% of students improve attendance" },
  { title: "Academic Progress", desc: "Regular assessments track progress against individual targets. We celebrate every step forward.", pct: 78, stat: "78% achieve qualifications" },
  { title: "Positive Destinations", desc: "We track where students go after leaving us - college, training, employment, or return to mainstream.", pct: 87, stat: "87% move to positive destinations" },
];
const stories = [
  { title: "From Exclusion to Achievement", text: "Jordan came to us after permanent exclusion in Year 9, having not attended school for 6 months. Through our trauma-informed approach and vocational programme, he re-engaged with learning and achieved his GCSEs." },
  { title: "Overcoming Anxiety", text: "Mia struggled with severe anxiety that prevented her from attending mainstream school. Our small group setting and therapeutic support helped her rebuild confidence. She improved her attendance from 15% to 85%." },
  { title: "Finding a Pathway", text: "Tyler had been through multiple school placements and was labelled as 'unteachable'. At Pathway, he discovered a passion for motor mechanics through our vocational programme. He's now on an apprenticeship." },
];
const testimonials = [
  { text: "Pathway Academy Zone gave my son a second chance. He went from refusing to attend school to genuinely enjoying learning. The staff truly care.", author: "Parent of Year 10 student" },
  { text: "The progress we've seen in our referred students has been remarkable. The team understand what these young people need and deliver it consistently.", author: "SENCO, Staffordshire Secondary School" },
  { text: "I actually want to come here. The teachers listen to me and don't give up when things get hard. I feel like I can do something with my life now.", author: "Year 11 Student" },
];

export default function Outcomes() {
  return (
    <Layout>
      <section className="py-32 bg-muted/30"><div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Outcomes & Impact</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Making a Real Difference</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our success is measured by the progress our young people make – in attendance, engagement, qualifications, and most importantly, their futures.</p>
      </div></section>
      <section className="py-20 bg-primary"><div className="container mx-auto px-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (<motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4"><s.icon className="h-7 w-7 text-primary-foreground" /></div>
          <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{s.value}</p><p className="text-primary-foreground/70 text-sm">{s.label}</p>
        </motion.div>))}
      </div></div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div><h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">How We Measure Progress</h2><div className="space-y-8">
          {progress.map((p) => (<motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-xl p-6 border border-border/50">
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3><p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
            <div className="w-full bg-muted rounded-full h-3 mb-2"><div className="bg-primary h-3 rounded-full" style={{ width: `${p.pct}%` }} /></div>
            <p className="text-sm text-primary font-medium">{p.stat}</p>
          </motion.div>))}
        </div></div>
        <div className="space-y-4"><img src={mentoringImg} alt="Careers presentation event" className="rounded-2xl shadow-lg w-full" loading="lazy" /><img src={careersImg} alt="Skills advice" className="rounded-2xl shadow-lg w-full" loading="lazy" /></div>
      </div></div></section>
      <section className="py-24 bg-muted/50"><div className="container mx-auto px-4">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Success Stories</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2">Real Stories, Real Impact</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{stories.map((s, i) => (<motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"><h3 className="font-display text-lg font-bold text-foreground mb-3">{s.title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p></motion.div>))}</div>
      </div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">{testimonials.map((t, i) => (<motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"><Quote className="h-8 w-8 text-primary/30 mb-4" /><p className="text-foreground text-sm leading-relaxed mb-4 italic">"{t.text}"</p><p className="text-muted-foreground text-sm font-medium">— {t.author}</p></motion.div>))}</div>
      </div></section>
    </Layout>
  );
}
