import { motion } from "framer-motion";
import { TrendingUp, Target, Users, UserCheck, Quote, ArrowRight, BarChart3, GraduationCap, History } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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

const toc = [
  { id: "impact-stats", label: "Impact at a Glance", level: 2 },
  { id: "measuring-progress", label: "How We Measure Progress", level: 2 },
  { id: "success-stories", label: "Success Stories", level: 2 },
  { id: "what-people-say", label: "Testimonials", level: 2 },
];

export default function Outcomes() {
  return (
    <Layout>
      <Seo
        title="Outcomes & Impact"
        description="Our success is measured by the progress our young people make in attendance, engagement, qualifications, and their future destinations."
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Outcomes" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Making a Real Difference</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Our success is measured by the progress our young people make – in attendance, engagement, qualifications, and most importantly, their futures.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          <div className="space-y-16 min-w-0">
            <section id="impact-stats" className="scroll-mt-24">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border p-6 rounded-2xl text-center shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">{s.value}</p>
                    <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="measuring-progress" className="scroll-mt-24 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">How We Measure Progress</h2>
              </div>
              <div className="space-y-6">
                {progress.map((p) => (
                  <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.desc}</p>
                    <div className="w-full bg-muted rounded-full h-3 mb-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-primary h-full rounded-full"
                      />
                    </div>
                    <p className="text-sm text-primary font-bold">{p.stat}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="success-stories" className="scroll-mt-24 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <History className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Real Stories, Real Impact</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {stories.map((s, i) => (
                  <motion.article key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed italic">&quot;{s.text}&quot;</p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section id="what-people-say" className="scroll-mt-24 space-y-8">
               <h2 className="font-display text-2xl font-bold text-foreground text-center">What People Say</h2>
               <div className="space-y-4">
                  {[
                    { text: "Pathway Academy Zone gave my son a second chance. He went from refusing to attend school to genuinely enjoying learning. The staff truly care.", author: "Parent of Year 10 student" },
                    { text: "The progress we've seen in our referred students has been remarkable. The team understand what these young people need and deliver it consistently.", author: "SENCO, Staffordshire Secondary School" }
                  ].map((t, i) => (
                    <div key={i} className="p-6 bg-muted/30 border border-border rounded-2xl">
                      <p className="text-foreground text-sm leading-relaxed mb-4 italic">&quot;{t.text}&quot;</p>
                      <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">— {t.author}</p>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Make a Referral",
                description: "Start a journey today",
                href: "/referral",
                tone: "primary",
              },
              {
                label: "Our Programmes",
                description: "Explore our pathways",
                href: "/programmes",
              },
            ]}
            quickContact={{
              phone: "01782 365365",
              email: "info@pathwayacademyzone.co.uk",
            }}
          >
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm mt-6">
               <img src={mentoringImg} alt="Students" className="w-full h-40 object-cover" />
               <div className="p-4 bg-card">
                  <p className="text-xs text-muted-foreground font-medium">Providing trauma-informed support across Staffordshire.</p>
               </div>
            </div>
          </ContentSidebar>
        </div>
      </div>
    </Layout>
  );
}
