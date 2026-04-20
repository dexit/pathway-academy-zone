import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { School, Building2, GraduationCap, Users, Briefcase, Stethoscope, ArrowRight, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import careersImg from "@/assets/careers-event.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const partners = [
  { icon: School, title: "Staffordshire Schools", desc: "We work with secondary schools across Staffordshire to provide Alternative Provision placements.", tags: ["Mainstream secondaries","Special schools","Academy trusts"] },
  { icon: Building2, title: "Local Authority Teams", desc: "Close partnerships with Staffordshire County Council education and children's services.", tags: ["Inclusion teams","SEND services","Early Help"] },
  { icon: GraduationCap, title: "Virtual Schools", desc: "We provide specialist placements for looked after children, working closely with virtual school heads.", tags: ["PEP meetings","Designated teachers","Care coordination"] },
  { icon: Users, title: "Youth & Community Services", desc: "Partnerships with local youth services and community organisations enrich our offer.", tags: ["Youth clubs","Sports organisations","Arts groups"] },
  { icon: Briefcase, title: "Employers & Training Providers", desc: "Local businesses and training providers support our vocational programmes.", tags: ["Apprenticeship providers","Local businesses","Colleges"] },
  { icon: Stethoscope, title: "Specialist Services", desc: "We work alongside CAMHS, educational psychologists, speech and language therapists.", tags: ["CAMHS","Educational psychology","SALT"] },
];
const areas = ["Stafford","Cannock Chase","East Staffordshire","Lichfield","Newcastle-under-Lyme","South Staffordshire","Staffordshire Moorlands","Tamworth"];

export default function Partners() {
  return (
    <Layout>
            <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Partners" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Partners</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              We work collaboratively with schools, local authorities, and employers to ensure the best outcomes for our young people.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-background"><div className="container mx-auto px-4"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((p, i) => (<motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><p.icon className="h-6 w-6 text-primary" /></div>
          <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3><p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
          <div className="flex flex-wrap gap-2">{p.tags.map((t) => (<span key={t} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{t}</span>))}</div>
        </motion.div>))}
      </div></div></section>
      <section className="py-24 bg-muted/50"><div className="container mx-auto px-4">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">In Action</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2">Connecting Young People with Opportunities</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <img src={careersImg} alt="Young people at careers fair" className="rounded-2xl shadow-lg w-full h-72 object-cover" loading="lazy" />
          <img src={mentoringImg} alt="Apprenticeship opportunities" className="rounded-2xl shadow-lg w-full h-72 object-cover" loading="lazy" />
        </div>
      </div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Areas We Serve</h2>
        <p className="text-muted-foreground mb-8">We accept referrals from across Staffordshire, with transport arrangements available where needed.</p>
        <div className="flex flex-wrap justify-center gap-3">{areas.map((a) => (<span key={a} className="flex items-center gap-2 bg-card border border-border/50 rounded-full px-5 py-2.5 text-sm text-foreground shadow-sm"><MapPin className="h-4 w-4 text-primary" />{a}</span>))}</div>
      </div></section>
      <section className="py-16 bg-primary text-center"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-primary-foreground mb-4">Become a Partner</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">We're always looking to expand our network of partners to create more opportunities for young people.</p>
        <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90 rounded-full"><Link to="/contact">Get in Touch <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
      </div></section>
    </Layout>
  );
}
