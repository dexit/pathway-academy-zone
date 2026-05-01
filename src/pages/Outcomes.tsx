import { motion } from "framer-motion";
import { TrendingUp, Target, Users, UserCheck, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout"
import { ContentSidebar } from "@/components/ContentSidebar"
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo"
import { TestimonialSlider } from "@/components/TestimonialSlider"
import { reviews } from "@/data/reviews-data"
import mentoringImg from "@/assets/mentoring-session.jpg"
import careersImg from "@/assets/careers-event.jpg"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

export default function Outcomes() {
  const toc = [
    { id: "impact-stats", label: "Key Impact Statistics", level: 2 as const },
    { id: "measuring-progress", label: "How We Measure Progress", level: 2 as const },
    { id: "success-stories", label: "Real Success Stories", level: 2 as const },
    { id: "testimonials", label: "Testimonials", level: 2 as const },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Outcomes & Impact",
    "description": "Our success is measured by the progress our young people make in attendance, engagement, qualifications, and their futures.",
    "url": `${SITE_URL}/outcomes`,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Key Impact Statistics",
      "itemListElement": stats.map((s, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": s.label,
        "description": s.value
      }))
    }
  };

  return (
    <Layout>
      <Seo
        title="Outcomes & Impact"
        description="Our success is measured by the progress our young people make in attendance, engagement, qualifications, and their futures."
        jsonLd={jsonLd}
      />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Outcomes" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight text-balance">Outcomes & Impact</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              We measure success through attendance, engagement, and positive progression for every learner.
            </p>
          </div>
        </div>
      </header>

      <section id="impact-stats" className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">{s.value}</p>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <div className="space-y-20">
            <section id="measuring-progress" className="scroll-mt-24">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">How We Measure Progress</h2>
                  <div className="space-y-6">
                    {progress.map((p) => (
                      <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card rounded-[1.5rem] p-6 border border-border/50 shadow-sm hover:shadow-lg transition-all">
                        <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                        <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${p.pct}%` }} />
                        </div>
                        <p className="text-sm text-primary font-bold">{p.stat}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6 pt-4">
                  <div className="relative group">
                    <img src={mentoringImg} alt="Mentoring session" className="rounded-3xl shadow-2xl w-full aspect-video object-cover" />
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10" />
                  </div>
                  <div className="relative group">
                    <img src={careersImg} alt="Careers event" className="rounded-3xl shadow-2xl w-full aspect-video object-cover" />
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10" />
                  </div>
                </div>
              </div>
            </section>

            <section id="success-stories" className="scroll-mt-24">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                <span className="text-primary font-bold text-sm tracking-widest uppercase">Success Stories</span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">Real Stories, Real Impact</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stories.map((s, i) => (
                  <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-[2rem] p-8 shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 leading-tight">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="testimonials" className="scroll-mt-24">
              <TestimonialSlider reviews={reviews} title="What People Say" />
            </section>

            <section className="rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Want to learn more about our impact?</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-10 text-lg leading-relaxed text-balance">
                We produce termly impact reports for our partner schools and local authorities, documenting the progress and destinations of our learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 font-bold px-10 h-16 text-lg rounded-full">
                  <Link to="/contact">
                    Request Impact Report
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Referral Process",
                description: "How to refer a learner",
                href: "/referral",
                tone: "primary",
              },
              {
                label: "Case Studies",
                description: "Deep dive into our work",
                href: "/knowledge-hub",
              },
            ]}
            quickContact={{
              phone: "01782 365365",
              email: "info@pathwayacademyzone.co.uk",
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
