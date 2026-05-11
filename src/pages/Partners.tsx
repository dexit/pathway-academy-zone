import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  School, Building2, GraduationCap, Users, Briefcase, Stethoscope,
  ArrowRight, MapPin, Handshake, BookOpen,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, SITE_URL, SITE_NAME } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import careersImg from "@/assets/amazon-careers-BRVYfevZ.webp";
import mentoringImg from "@/assets/classroom-2-ycnLvywG.webp";

/* ─── animation variant ───────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

/* ─── data ────────────────────────────────────────────────────────────────── */
const partners = [
  {
    icon: School,
    title: "Staffordshire Schools",
    desc: "We work with secondary schools across Staffordshire to provide Alternative Provision placements.",
    tags: ["Mainstream secondaries", "Special schools", "Academy trusts"],
  },
  {
    icon: Building2,
    title: "Local Authority Teams",
    desc: "Close partnerships with Staffordshire County Council education and children's services.",
    tags: ["Inclusion teams", "SEND services", "Early Help"],
  },
  {
    icon: GraduationCap,
    title: "Virtual Schools",
    desc: "We provide specialist placements for looked after children, working closely with virtual school heads.",
    tags: ["PEP meetings", "Designated teachers", "Care coordination"],
  },
  {
    icon: Users,
    title: "Youth & Community Services",
    desc: "Partnerships with local youth services and community organisations enrich our offer.",
    tags: ["Youth clubs", "Sports organisations", "Arts groups"],
  },
  {
    icon: Briefcase,
    title: "Employers & Training Providers",
    desc: "Local businesses and training providers support our vocational programmes.",
    tags: ["Apprenticeship providers", "Local businesses", "Colleges"],
  },
  {
    icon: Stethoscope,
    title: "Specialist Services",
    desc: "We work alongside CAMHS, educational psychologists, speech and language therapists.",
    tags: ["CAMHS", "Educational psychology", "SALT"],
  },
];

const areaLinks = [
  { name: "Stoke-on-Trent",       slug: "stoke-on-trent" },
  { name: "Newcastle-under-Lyme", slug: "newcastle-under-lyme" },
  { name: "Stafford",             slug: "stafford" },
  { name: "Cannock",              slug: "cannock" },
  { name: "Lichfield",            slug: "lichfield" },
  { name: "Tamworth",             slug: "tamworth" },
  { name: "Wolverhampton",        slug: "wolverhampton" },
  { name: "Leek",                 slug: "leek" },
];

const knowledgeResources = [
  {
    title: "What is Alternative Provision?",
    desc: "A comprehensive guide to AP — who it's for, how placements work, and what good provision looks like.",
    href: "/knowledge-hub/guides/what-is-alternative-provision",
  },
  {
    title: "When to Refer a Young Person",
    desc: "Practical guidance for SENCOs, inclusion leads and pastoral teams on identifying the right moment to refer.",
    href: "/knowledge-hub/guides/when-to-refer",
  },
  {
    title: "SEMH Pathways: Best Practice",
    desc: "How trauma-informed approaches and SEMH-focused provision lead to better outcomes for vulnerable learners.",
    href: "/knowledge-hub/best-practice/semh-pathways",
  },
];

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/partners`,
  name: `Partners | ${SITE_NAME}`,
  description:
    "Pathway Academy Zone partners with Staffordshire schools, local authorities, employers and specialist services to deliver outstanding Alternative Provision.",
  url: `${SITE_URL}/partners`,
  about: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Partners", item: `${SITE_URL}/partners` },
    ],
  },
};

/* ─── page ────────────────────────────────────────────────────────────────── */
export default function Partners() {
  return (
    <Layout>
      <Seo
        title="Our Educational & Strategic Partners"
        description="Pathway Academy Zone partners with Staffordshire schools, local authorities, employers and specialist services to deliver outstanding Alternative Provision."
        jsonLd={jsonLd}
      />

      <PageHero
        align="center"
        badge={{ label: "Local Partnerships", icon: Handshake }}
        breadcrumbs={[{ label: "Partners" }]}
        heading="Working Together Across Staffordshire"
        subheading="Strong partnerships are essential to supporting young people effectively. We collaborate with schools, local authorities, employers and specialist services so every referral leads to the right provision at the right time."
      />

      {/* ── Partner cards grid ────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Who We Work With
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
              Our Partnership Network
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              Six categories of partner organisations help us deliver joined-up support
              across Staffordshire and the wider West Midlands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px -8px hsl(var(--primary)/0.18)" }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:border-primary/30 transition-colors cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── In Action ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              In Action
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">
              Connecting Young People with Opportunities
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              From careers fairs to one-to-one mentoring, our partnerships create
              real-world pathways for every young person we support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <img
                src={careersImg}
                alt="Young people at careers fair"
                className="rounded-2xl shadow-lg w-full h-72 object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <img
                src={mentoringImg}
                alt="Apprenticeship opportunities"
                className="rounded-2xl shadow-lg w-full h-72 object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Areas We Serve ────────────────────────────────────────────────── */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Coverage
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">
              Areas We Serve
            </h2>
            <p className="text-muted-foreground mb-8 text-sm">
              We accept referrals from across Staffordshire and the wider West Midlands,
              with transport arrangements available where needed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {areaLinks.map((a) => (
                <Link
                  key={a.slug}
                  to={`/alternative-provision/${a.slug}`}
                  className="inline-flex items-center gap-2 bg-card border border-border/50 rounded-full px-5 py-2.5 text-sm text-foreground shadow-sm hover:border-primary/40 hover:text-primary hover:shadow-md transition-all"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  {a.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Knowledge Resources ───────────────────────────────────────────── */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Knowledge Hub
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
              Resources for Partner Organisations
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              Guides and best-practice articles to help schools, local authorities and
              specialist teams get the most from Alternative Provision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {knowledgeResources.map((r, i) => (
              <motion.div
                key={r.href}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={r.href}
                  className="group flex flex-col h-full bg-card rounded-2xl p-7 shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {r.desc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-5 text-primary text-sm font-medium">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Become a Partner CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white/10 border border-white/20 rounded-3xl p-10 md:p-14 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-5 border border-white/20">
                  <Handshake className="w-3.5 h-3.5" /> Partner with us
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
                  Become a Partner
                </h2>
                <p className="text-primary-foreground/80 leading-relaxed mb-2">
                  We're always looking to expand our network — whether you're a school
                  seeking reliable AP placements, an employer wanting to support young
                  people into work, or a specialist service looking to collaborate.
                </p>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Our partnership team will talk through your needs and explore how we
                  can work together to create more opportunities for young people across
                  Staffordshire.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <ul className="space-y-3 text-primary-foreground/90 text-sm mb-2">
                  {[
                    "Flexible referral and placement arrangements",
                    "Regular progress updates and joint reviews",
                    "Access to our vocational and SEMH programmes",
                    "Dedicated partnership lead as your point of contact",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-1 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <ArrowRight className="h-2.5 w-2.5 text-white" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-full font-semibold"
                  >
                    <Link to="/contact">
                      Get in Touch <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground rounded-full"
                  >
                    <Link to="/referral">Make a Referral</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
