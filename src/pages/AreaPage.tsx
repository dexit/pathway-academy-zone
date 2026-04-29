import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight, CheckCircle, School, Users, Shield, Target } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";

interface AreaData {
  slug: string;
  name: string;
  county: string;
  postcode: string;
  description: string;
  blurb: string;
  highlights: string[];
  nearbyAreas: string[];
}

const AREAS: Record<string, AreaData> = {
  "stoke-on-trent": {
    slug: "stoke-on-trent",
    name: "Stoke-on-Trent",
    county: "Staffordshire",
    postcode: "ST",
    description: "Alternative Provision in Stoke-on-Trent for young people aged 11–16 with SEMH needs, exclusions, or disengagement from mainstream education.",
    blurb: "Pathway Academy Zone is based in Burslem, Stoke-on-Trent. We work directly with schools, the local authority, and families across the city to provide specialist education, pastoral support, and reintegration pathways for young people who need a different approach.",
    highlights: ["Based in Burslem, Stoke-on-Trent", "Local authority referral partners", "Supporting Stoke schools since 2018", "Emergency placements within 48 hours"],
    nearbyAreas: ["newcastle-under-lyme", "stafford", "cannock"],
  },
  "newcastle-under-lyme": {
    slug: "newcastle-under-lyme",
    name: "Newcastle-under-Lyme",
    county: "Staffordshire",
    postcode: "ST5",
    description: "Alternative Provision serving Newcastle-under-Lyme. SEMH support, re-engagement and vocational pathways for young people aged 11–16.",
    blurb: "Pathway Academy Zone serves young people from Newcastle-under-Lyme and surrounding areas. We work closely with local schools and the Staffordshire local authority to arrange timely, high-quality placements for pupils who are excluded, at risk of exclusion, or struggling in mainstream settings.",
    highlights: ["Close partnership with Newcastle schools", "Fast-track referral process", "Vocational and academic pathways", "Pastoral and SEMH specialist support"],
    nearbyAreas: ["stoke-on-trent", "stafford", "leek"],
  },
  "stafford": {
    slug: "stafford",
    name: "Stafford",
    county: "Staffordshire",
    postcode: "ST16",
    description: "Alternative Provision in Stafford, Staffordshire. Specialist education for young people aged 11–16 with SEMH, exclusion, or disengagement needs.",
    blurb: "Pathway Academy Zone accepts referrals from schools and the local authority in Stafford and across central Staffordshire. Our tailored programmes cover SEMH support, behaviour reintegration, vocational pathways, and 1:1 mentoring.",
    highlights: ["Serving Stafford and mid-Staffordshire", "Referrals accepted from schools and LA", "Vocational and GCSE pathway options", "Regular progress reporting for referring schools"],
    nearbyAreas: ["stoke-on-trent", "cannock", "lichfield"],
  },
  "cannock": {
    slug: "cannock",
    name: "Cannock",
    county: "Staffordshire",
    postcode: "WS11",
    description: "Alternative Provision near Cannock, Staffordshire. SEMH support, exclusion reintegration and vocational pathways for young people 11–16.",
    blurb: "Young people from Cannock and the surrounding Staffordshire area can access Pathway Academy Zone's specialist Alternative Provision through school or local authority referral. We provide structured, nurturing environments to help young people re-engage with education and build toward positive destinations.",
    highlights: ["Accessible from Cannock via referral", "Trauma-informed, SEMH-specialist staff", "Linked to local vocational providers", "Post-16 progression planning included"],
    nearbyAreas: ["stafford", "lichfield", "wolverhampton"],
  },
  "lichfield": {
    slug: "lichfield",
    name: "Lichfield",
    county: "Staffordshire",
    postcode: "WS13",
    description: "Alternative Provision serving Lichfield, Staffordshire. Specialist education and SEMH support for excluded or disengaged young people aged 11–16.",
    blurb: "Pathway Academy Zone supports young people from Lichfield and the southern Staffordshire district through its Alternative Provision programmes. We work with schools, social workers, and families to identify the right pathway and begin placements quickly when needed.",
    highlights: ["Serving Lichfield and south Staffordshire", "Multi-agency partnership working", "Academic and vocational programmes", "Dedicated DSL and safeguarding team"],
    nearbyAreas: ["cannock", "stafford", "tamworth"],
  },
  "tamworth": {
    slug: "tamworth",
    name: "Tamworth",
    county: "Staffordshire",
    postcode: "B79",
    description: "Alternative Provision near Tamworth, Staffordshire. Specialist placements for young people aged 11–16 with SEMH, exclusion or disengagement from mainstream.",
    blurb: "Referrals from Tamworth schools and Staffordshire LA are welcome at Pathway Academy Zone. We provide specialist Alternative Provision through personalised learning plans, pastoral mentoring, and close links with post-16 providers to ensure every young person has a clear destination.",
    highlights: ["Accessible from Tamworth", "Personalised EHCP and SEMH support", "Strong safeguarding and DSL provision", "Post-16 and NEET prevention focus"],
    nearbyAreas: ["lichfield", "stafford", "wolverhampton"],
  },
  "wolverhampton": {
    slug: "wolverhampton",
    name: "Wolverhampton",
    county: "West Midlands",
    postcode: "WV",
    description: "Alternative Provision near Wolverhampton. Pathway Academy Zone offers SEMH support and reintegration programmes for young people 11–16.",
    blurb: "Pathway Academy Zone accepts referrals from schools and local authorities in Wolverhampton and the surrounding West Midlands area. Our specialist Alternative Provision is designed for young people who have been permanently excluded, are at risk of exclusion, or are struggling with SEMH needs.",
    highlights: ["Accessible from Wolverhampton", "Out-of-area LA referrals considered", "Vocational and pastoral programmes", "Qualified SEMH and youth-work staff"],
    nearbyAreas: ["cannock", "lichfield", "stoke-on-trent"],
  },
  "leek": {
    slug: "leek",
    name: "Leek",
    county: "Staffordshire Moorlands",
    postcode: "ST13",
    description: "Alternative Provision serving Leek and the Staffordshire Moorlands. SEMH support, reintegration and vocational pathways for young people aged 11–16.",
    blurb: "Pathway Academy Zone works with schools and families in Leek and the wider Staffordshire Moorlands district. Through our referral process, young people can access specialist support quickly, whether they are facing permanent exclusion, struggling with attendance, or have complex SEMH needs.",
    highlights: ["Serving Staffordshire Moorlands area", "Quick-start referral process", "SEMH and trauma-informed approach", "Links with Staffordshire Moorlands LA"],
    nearbyAreas: ["stoke-on-trent", "newcastle-under-lyme", "stafford"],
  },
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const features = [
  { icon: Shield, title: "Safeguarding First", desc: "DBS-checked staff, dedicated DSL, and robust safeguarding procedures." },
  { icon: Users, title: "Small Group & 1:1", desc: "Low ratios ensuring every young person gets the attention they need." },
  { icon: Target, title: "Personalised Pathways", desc: "Tailored learning plans built around each student's strengths and goals." },
  { icon: School, title: "Positive Destinations", desc: "87% of our learners achieve positive destinations in education, employment or training." },
];

export default function AreaPage() {
  const { areaSlug } = useParams<{ areaSlug: string }>();
  const area = areaSlug ? AREAS[areaSlug] : undefined;

  if (!area) return <Navigate to="/contact" replace />;

  const pageUrl = `${SITE_URL}/alternative-provision/${area.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      areaServed: { "@type": "City", name: area.name },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Duncalf Street, Burslem",
        addressLocality: "Stoke-on-Trent",
        postalCode: "ST6 3LJ",
        addressRegion: "Staffordshire",
        addressCountry: "GB",
      },
      telephone: "+44-1782-365365",
      email: "info@pathwayacademyzone.co.uk",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Alternative Provision in ${area.name}`,
      description: area.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "City", name: area.name },
      serviceType: "Alternative Provision Education",
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/alternative-provision` },
        { "@type": "ListItem", position: 3, name: area.name, item: pageUrl },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        title={`Alternative Provision ${area.name} | ${SITE_NAME}`}
        description={area.description}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Areas We Serve", to: "/contact" },
              { label: area.name },
            ]}
            className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm border border-white/20">
              <MapPin className="w-3.5 h-3.5" /> {area.county}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Alternative Provision<br />in {area.name}
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              {area.blurb}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-white/40 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm">
                <a href="tel:+441782365365">
                  <Phone className="h-4 w-4 mr-2" /> 01782 365365
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-4 mb-12">
            {area.highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 bg-card rounded-xl border border-border/50 px-5 py-4">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground text-sm">{h}</span>
              </div>
            ))}
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Why Choose Pathway Academy Zone in {area.name}?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/40 transition-colors shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to refer */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How to Refer a Young Person in {area.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Referrals from {area.name} schools, the local authority, social workers and parents are all welcome.
              Contact our team to discuss a young person's needs, and we'll guide you through the process from
              assessment to placement — usually within 1–2 weeks, or 48 hours for emergency placements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/referral">Start a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nearby areas */}
      {area.nearbyAreas.length > 0 && (
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-sm text-muted-foreground text-center mb-4">Also serving nearby areas:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {area.nearbyAreas.map((slug) => {
                const nearby = AREAS[slug];
                if (!nearby) return null;
                return (
                  <Link
                    key={slug}
                    to={`/alternative-provision/${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {nearby.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
