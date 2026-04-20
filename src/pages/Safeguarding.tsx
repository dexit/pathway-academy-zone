import { motion } from "framer-motion";
import { Shield, Lock, Users, Phone, Heart, ClipboardCheck, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const toc = [
  { id: "our-commitment", label: "Our Commitment", level: 2 },
  { id: "key-principles", label: "Key Principles", level: 2 },
  { id: "staff-training", label: "Staff Training", level: 2 },
  { id: "reporting-concerns", label: "Reporting Concerns", level: 2 },
  { id: "useful-contacts", label: "Useful Contacts", level: 2 },
];

export default function Safeguarding() {
  return (
    <Layout>
      <Seo
        title="Safeguarding & Welfare"
        description="The safety and wellbeing of our young people is our absolute priority. We maintain a robust, trauma-informed safeguarding culture across all our provision."
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Safeguarding" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Safeguarding & Welfare</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              The safety and wellbeing of our young people is our absolute priority. We maintain a robust, trauma-informed safeguarding culture.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          <div className="space-y-16 min-w-0">
            <section id="our-commitment" className="scroll-mt-24 space-y-5">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Pathway Academy Zone, we recognise our moral and statutory responsibility to safeguard and promote the welfare of all pupils. We endeavour to provide a safe and welcoming environment where children are respected and valued. We are alert to the signs of abuse and neglect and follow our procedures to ensure that children receive effective support, protection, and justice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {[
                  { icon: Shield, title: "Prevention", text: "Creating a positive atmosphere and teaching pupils to stay safe." },
                  { icon: Lock, title: "Protection", text: "Identifying and responding to child protection concerns." },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                    <item.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="key-principles" className="scroll-mt-24 space-y-5">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Key Principles</h2>
              <div className="space-y-4">
                {[
                  { title: "Trauma-Informed", desc: "Understanding the impact of adverse childhood experiences on behaviour and wellbeing." },
                  { title: "Student-Centred", desc: "Always acting in the best interests of the young person." },
                  { title: "Collaborative", desc: "Working closely with parents, schools, and multi-agency partners." },
                  { title: "Vigilant", desc: "Maintaining a culture where safeguarding is everyone&apos;s responsibility." },
                ].map((p, i) => (
                  <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-foreground">{p.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="staff-training" className="scroll-mt-24 space-y-5">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Staff Training & Expertise</h2>
              <p className="text-muted-foreground leading-relaxed">
                All staff at Pathway Academy Zone undergo rigorous background checks and receive regular, high-quality safeguarding training. Our team includes specialists in SEMH and trauma-informed practice.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Enhanced DBS checks for all staff",
                  "Regular Level 3 Safeguarding training",
                  "Prevent Duty and FGM training",
                  "Trauma-informed practice workshops",
                  "Online safety training",
                  "Crisis prevention and intervention",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="reporting-concerns" className="scroll-mt-24 space-y-5">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Reporting Concerns</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have a concern about a young person attending Pathway Academy Zone, please contact our Designated Safeguarding Lead (DSL) immediately.
              </p>
              <div className="p-8 rounded-3xl bg-primary text-primary-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xl text-balance">Designated Safeguarding Lead (DSL)</h3>
                </div>
                <p className="text-primary-foreground/90 mb-6 text-sm">
                  Our DSL is responsible for all safeguarding and child protection matters across our provision.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">DSL Name</p>
                    <p className="font-bold">Martin Chandler</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Contact Number</p>
                    <p className="font-bold">01782 365365</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="useful-contacts" className="scroll-mt-24 space-y-5">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Useful Contacts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Childline", contact: "0800 1111" },
                  { label: "NSPCC", contact: "0808 800 5000" },
                  { label: "Staffordshire First Response", contact: "0800 1313 126" },
                  { label: "Stoke-on-Trent ChAD", contact: "01782 232200" },
                ].map((c) => (
                  <div key={c.label} className="p-5 rounded-2xl bg-card border border-border flex items-center justify-between shadow-sm">
                    <span className="font-bold text-foreground">{c.label}</span>
                    <span className="text-primary font-bold">{c.contact}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Download Policy",
                description: "Read our full Safeguarding Policy",
                href: "/policies",
                tone: "primary",
              },
              {
                label: "Our Team",
                description: "Meet our safeguarding leads",
                href: "/team",
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
