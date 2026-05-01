import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Handshake, Users } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";
import { LogoTicker } from "@/components/LogoTicker";
import { partners } from "@/data/partners-data";
import careersImg from "@/assets/careers-event.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const areas = ["Stafford","Cannock Chase","East Staffordshire","Lichfield","Newcastle-under-Lyme","South Staffordshire","Staffordshire Moorlands","Tamworth"];

export default function Partners() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Our Partners & Networks",
    "description": "We work in close partnership with schools, local authorities, and specialist services across Staffordshire to support young people.",
    "url": `${SITE_URL}/partners`,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Strategic Partners",
      "itemListElement": partners.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": p.title,
        "description": p.desc
      }))
    }
  };

  return (
    <Layout>
      <Seo
        title="Our Partners & Networks"
        description="We work in close partnership with schools, local authorities, and specialist services across Staffordshire to support young people."
        jsonLd={jsonLd}
      />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Partners" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Partners</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Working together with schools, local authorities and employers to ensure the best outcomes for young people.
            </p>
          </div>
        </div>
      </header>

      <LogoTicker logos={partners} title="Our Trusted Partners & Networks" />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Network</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">Strategic Partnerships</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all flex flex-col group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <p.icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-secondary text-primary px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">In Action</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">Connecting Opportunities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="relative group">
              <img src={careersImg} alt="Young people at careers fair" className="rounded-3xl shadow-2xl w-full h-[400px] object-cover" loading="lazy" />
              <div className="absolute inset-0 rounded-3xl bg-primary/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="relative group">
              <img src={mentoringImg} alt="Apprenticeship opportunities" className="rounded-3xl shadow-2xl w-full h-[400px] object-cover" loading="lazy" />
              <div className="absolute inset-0 rounded-3xl bg-primary/10 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-8 border border-primary/10">
            <MapPin className="w-3.5 h-3.5" />
            Regional Coverage
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Areas We Serve</h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">We accept referrals from across Staffordshire, with transport arrangements available where needed for our learners.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((a) => (
              <span key={a} className="flex items-center gap-2 bg-card border border-border/50 rounded-2xl px-6 py-4 text-sm font-bold text-foreground shadow-sm hover:border-primary/30 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tight">Become a Partner</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg leading-relaxed text-balance">
            We're always looking to expand our network of partners to create more opportunities for young people. Whether you're an employer or service provider, get in touch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-10 h-16 text-lg shadow-2xl">
              <Link to="/contact">Get in Touch <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
