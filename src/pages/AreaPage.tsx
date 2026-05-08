import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Phone, ArrowRight, CheckCircle, School, Users, Shield, Target,
  BookOpen, ChevronDown, GraduationCap, Clock, Briefcase,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";
import {
  ORG_SCHEMA, WEBSITE_SCHEMA, AREAS_SERVED, ORG_REF,
  ORG_ADDRESS, ORG_GEO, ORG_HOURS, CONTACT_POINTS,
  buildOfferCatalogSchema, buildOfferSchema,
} from "@/lib/json-ld";

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
    description: "Alternative Provision in Stoke-on-Trent for young people aged 11–16 with Social, Emotional and Mental Health (SEMH) needs, exclusions, or disengagement from mainstream education.",
    blurb: "Pathway Academy Zone is based in Burslem, Stoke-on-Trent. We work directly with schools, the local authority, and families across the city to provide specialist education, pastoral support, and reintegration pathways for young people who need a different approach.",
    highlights: ["Based in Burslem, Stoke-on-Trent", "Local authority referral partners", "Supporting Stoke schools since 2018", "Emergency placements within 48 hours"],
    nearbyAreas: ["newcastle-under-lyme", "stafford", "cannock"],
  },
  "newcastle-under-lyme": {
    slug: "newcastle-under-lyme",
    name: "Newcastle-under-Lyme",
    county: "Staffordshire",
    postcode: "ST5",
    description: "Alternative Provision serving Newcastle-under-Lyme. Social, Emotional and Mental Health (SEMH) support, re-engagement and vocational pathways for young people aged 11–16.",
    blurb: "Pathway Academy Zone serves young people from Newcastle-under-Lyme and surrounding areas. We work closely with local schools and the Staffordshire local authority to arrange timely, high-quality placements for pupils who are excluded, at risk of exclusion, or struggling in mainstream settings.",
    highlights: ["Close partnership with Newcastle schools", "Fast-track referral process", "Vocational and academic pathways", "Pastoral and SEMH specialist support"],
    nearbyAreas: ["stoke-on-trent", "stafford", "leek"],
  },
  "stafford": {
    slug: "stafford",
    name: "Stafford",
    county: "Staffordshire",
    postcode: "ST16",
    description: "Alternative Provision in Stafford, Staffordshire. Specialist education for young people aged 11–16 with Social, Emotional and Mental Health (SEMH), exclusion, or disengagement needs.",
    blurb: "Pathway Academy Zone accepts referrals from schools and the local authority in Stafford and across central Staffordshire. Our tailored programmes cover Social, Emotional and Mental Health (SEMH) support, behaviour reintegration, vocational pathways, and 1:1 mentoring.",
    highlights: ["Serving Stafford and mid-Staffordshire", "Referrals accepted from schools and LA", "Vocational and GCSE pathway options", "Regular progress reporting for referring schools"],
    nearbyAreas: ["stoke-on-trent", "cannock", "lichfield"],
  },
  "cannock": {
    slug: "cannock",
    name: "Cannock",
    county: "Staffordshire",
    postcode: "WS11",
    description: "Alternative Provision near Cannock, Staffordshire. Social, Emotional and Mental Health (SEMH) support, exclusion reintegration and vocational pathways for young people 11–16.",
    blurb: "Young people from Cannock and the surrounding Staffordshire area can access Pathway Academy Zone's specialist Alternative Provision through school or local authority referral. We provide structured, nurturing environments to help young people re-engage with education and build toward positive destinations.",
    highlights: ["Accessible from Cannock via referral", "Trauma-informed, SEMH-specialist staff", "Linked to local vocational providers", "Post-16 progression planning included"],
    nearbyAreas: ["stafford", "lichfield", "wolverhampton"],
  },
  "lichfield": {
    slug: "lichfield",
    name: "Lichfield",
    county: "Staffordshire",
    postcode: "WS13",
    description: "Alternative Provision serving Lichfield, Staffordshire. Specialist education and Social, Emotional and Mental Health (SEMH) support for excluded or disengaged young people aged 11–16.",
    blurb: "Pathway Academy Zone supports young people from Lichfield and the southern Staffordshire district through its Alternative Provision programmes. We work with schools, social workers, and families to identify the right pathway and begin placements quickly when needed.",
    highlights: ["Serving Lichfield and south Staffordshire", "Multi-agency partnership working", "Academic and vocational programmes", "Dedicated DSL and safeguarding team"],
    nearbyAreas: ["cannock", "stafford", "tamworth"],
  },
  "tamworth": {
    slug: "tamworth",
    name: "Tamworth",
    county: "Staffordshire",
    postcode: "B79",
    description: "Alternative Provision near Tamworth, Staffordshire. Specialist placements for young people aged 11–16 with Social, Emotional and Mental Health (SEMH), exclusion or disengagement from mainstream.",
    blurb: "Referrals from Tamworth schools and Staffordshire LA are welcome at Pathway Academy Zone. We provide specialist Alternative Provision through personalised learning plans, pastoral mentoring, and close links with post-16 providers to ensure every young person has a clear destination.",
    highlights: ["Accessible from Tamworth", "Personalised EHCP and SEMH support", "Strong safeguarding and DSL provision", "Post-16 and NEET prevention focus"],
    nearbyAreas: ["lichfield", "stafford", "wolverhampton"],
  },
  "wolverhampton": {
    slug: "wolverhampton",
    name: "Wolverhampton",
    county: "West Midlands",
    postcode: "WV",
    description: "Alternative Provision near Wolverhampton. Pathway Academy Zone offers Social, Emotional and Mental Health (SEMH) support and reintegration programmes for young people 11–16.",
    blurb: "Pathway Academy Zone accepts referrals from schools and local authorities in Wolverhampton and the surrounding West Midlands area. Our specialist Alternative Provision is designed for young people who have been permanently excluded, are at risk of exclusion, or are struggling with SEMH needs.",
    highlights: ["Accessible from Wolverhampton", "Out-of-area LA referrals considered", "Vocational and pastoral programmes", "Qualified SEMH and youth-work staff"],
    nearbyAreas: ["cannock", "lichfield", "stoke-on-trent"],
  },
  "leek": {
    slug: "leek",
    name: "Leek",
    county: "Staffordshire Moorlands",
    postcode: "ST13",
    description: "Alternative Provision serving Leek and the Staffordshire Moorlands. Social, Emotional and Mental Health (SEMH) support, reintegration and vocational pathways for young people aged 11–16.",
    blurb: "Pathway Academy Zone works with schools and families in Leek and the wider Staffordshire Moorlands district. Through our referral process, young people can access specialist support quickly, whether they are facing permanent exclusion, struggling with attendance, or have complex SEMH needs.",
    highlights: ["Serving Staffordshire Moorlands area", "Quick-start referral process", "SEMH and trauma-informed approach", "Links with Staffordshire Moorlands LA"],
    nearbyAreas: ["stoke-on-trent", "newcastle-under-lyme", "stafford"],
  },
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const features = [
  { icon: Shield, title: "Safeguarding First", desc: "DBS-checked staff, dedicated DSL, and robust safeguarding procedures across all sessions." },
  { icon: Users, title: "Small Group & 1:1", desc: "Low staff-to-student ratios ensuring every young person gets the individual attention they need." },
  { icon: Target, title: "Personalised Pathways", desc: "Tailored learning plans built around each student's strengths, needs and aspirations." },
  { icon: School, title: "Positive Destinations", desc: "87% of our learners move into college, apprenticeships, employment or training after leaving us." },
];

const programmeLinks = [
  { slug: "academic-re-engagement", label: "Academic Re-engagement", icon: BookOpen },
  { slug: "vocational-learning", label: "Vocational Learning", icon: Briefcase },
  { slug: "semh-support", label: "Social, Emotional and Mental Health (SEMH) Support", icon: Shield },
  { slug: "personal-development", label: "Personal Development", icon: Target },
  { slug: "life-skills", label: "Life Skills", icon: Users },
  { slug: "employability-skills", label: "Employability Skills", icon: GraduationCap },
];

const resourceLinks = [
  { href: "/knowledge-hub/guides/what-is-alternative-provision", label: "What is Alternative Provision?", desc: "A complete overview of Alternative Provision (AP), how it works, and who it's for." },
  { href: "/knowledge-hub/guides/when-to-refer", label: "When to Refer a Young Person", desc: "Signs that a student may benefit from an Alternative Provision (AP) placement." },
  { href: "/knowledge-hub/best-practice/semh-pathways", label: "SEMH Pathways in Alternative Provision", desc: "How therapeutic Social, Emotional and Mental Health (SEMH) support is integrated into provision." },
];

const glossaryTerms = [
  { href: "/knowledge-hub/glossary", label: "Alternative Provision (AP)" },
  { href: "/knowledge-hub/glossary", label: "Social, Emotional and Mental Health (SEMH)" },
  { href: "/knowledge-hub/glossary", label: "EHCP" },
];

const heroStats = [
  { value: "94%", label: "Attendance Improvement" },
  { value: "87%", label: "Positive Destinations" },
  { value: "48hrs", label: "Emergency Placement" },
];

const referralSteps = [
  { n: "1", title: "Contact Us", desc: "Call 01782 365365 or complete the online referral form — we respond within one working day." },
  { n: "2", title: "Assessment", desc: "We meet the young person and family, review documentation, and agree a personalised plan." },
  { n: "3", title: "Placement Starts", desc: "Standard starts within 1–2 weeks. Emergency placements within 48 hours where needed." },
];

export default function AreaPage() {
  const { areaSlug } = useParams<{ areaSlug: string }>();
  const area = areaSlug ? AREAS[areaSlug] : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!area) return <Navigate to="/contact" replace />;

  const pageUrl = `${SITE_URL}/alternative-provision/${area.slug}`;

  const faqs = [
    {
      q: `How do I refer a young person in ${area.name}?`,
      a: `Contact us by phone on 01782 365365 or complete our online referral form. We aim to respond within one working day and can arrange emergency placements within 48 hours for urgent cases.`,
    },
    {
      q: `What age range does Pathway Academy Zone serve in ${area.name}?`,
      a: `We support young people aged 11–16 (Years 7–11) who are permanently excluded, at risk of exclusion, struggling with attendance, or have complex Social, Emotional and Mental Health (SEMH) needs that cannot be met in mainstream education.`,
    },
    {
      q: `Does Pathway Academy Zone accept referrals from ${area.name} local authority?`,
      a: `Yes — we work directly with schools, the local authority, social workers, and virtual school heads across ${area.county}. Local Authority funding and Education, Health and Care Plan (EHCP) placements are welcome.`,
    },
    {
      q: `What programmes are available to young people from ${area.name}?`,
      a: `All six of our core programmes are available: Academic Re-engagement, Vocational Learning, Social, Emotional and Mental Health (SEMH) Support, Personal Development, Life Skills, and Employability Skills. Most placements combine elements from several programmes.`,
    },
  ];

  const areaCity = { "@type": "City", name: area.name } as const;

  // Programme stubs for per-area OfferCatalog
  const AREA_PROGRAMME_STUBS = [
    { slug: "academic-re-engagement", title: "Academic Re-engagement",  desc: "Structured academic curriculum for young people aged 11–16.",    features: [], schedule: "Full-time or part-time", time: "Mon–Fri 9:30am–2:30pm", whoFor: "", outcomes: ["Improved attendance", "GCSE / functional skills"] },
    { slug: "vocational-learning",    title: "Vocational Learning",      desc: "Hands-on practical vocational skills.",                           features: [], schedule: "1–2 days per week",     time: "Varies",              whoFor: "", outcomes: ["Industry certificates"] },
    { slug: "semh-support",           title: "Social, Emotional and Mental Health (SEMH) Support",             desc: "Therapeutic support for SEMH needs.",                            features: [], schedule: "Ongoing",             time: "2–3 sessions/week",   whoFor: "", outcomes: ["Emotional regulation"] },
    { slug: "personal-development",   title: "Personal Development",     desc: "Resilience and life-skills enrichment.",                         features: [], schedule: "Integrated",           time: "2 hrs/week",          whoFor: "", outcomes: ["Resilience"] },
    { slug: "life-skills",            title: "Life Skills Programme",    desc: "Independent living and digital literacy.",                       features: [], schedule: "Integrated",           time: "Weekly",              whoFor: "", outcomes: ["Independent living skills"] },
    { slug: "employability-skills",   title: "Employability Skills",     desc: "CV writing, interview practice, and work experience.",           features: [], schedule: "Year 10 & 11",         time: "Weekly + placements", whoFor: "", outcomes: ["Employment-ready"] },
  ];

  const jsonLd = [
    WEBSITE_SCHEMA,
    // LocalBusiness — primary area emphasis + full areaServed
    {
      ...ORG_SCHEMA,
      "@context": "https://schema.org",
      description: `Specialist Alternative Provision for young people aged 11–16 in ${area.name} and across ${area.county}.`,
      areaServed: [areaCity, ...AREAS_SERVED],
    },
    // EducationalOrganization — area-specific teaching emphasis
    {
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization"],
      "@id": `${SITE_URL}/#educational-org`,
      name: SITE_NAME,
      url: SITE_URL,
      educationalLevel: "Secondary",
      teaches: ["Alternative Provision", "Social, Emotional and Mental Health (SEMH) Support", "Vocational Learning", "Academic Re-engagement", "Life Skills", "Employability Skills"],
      areaServed: [areaCity, ...AREAS_SERVED],
      address: ORG_ADDRESS,
      geo: ORG_GEO,
      contactPoint: CONTACT_POINTS,
      openingHoursSpecification: ORG_HOURS,
    },
    // Service — area-specific service page with full OfferCatalog
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/#service-${area.slug}`,
      name: `Alternative Provision in ${area.name}`,
      description: area.description,
      serviceType: "Alternative Provision Education",
      url: pageUrl,
      provider: ORG_REF,
      areaServed: [areaCity, ...AREAS_SERVED],
      audience: {
        "@type": "Audience",
        audienceType: "Schools, Local Authorities, Social Workers in " + area.name,
      },
      offers: buildOfferSchema({ name: `Alternative Provision Placement — ${area.name}`, slug: area.slug, singleArea: areaCity }),
      hasOfferCatalog: {
        ...buildOfferCatalogSchema(AREA_PROGRAMME_STUBS),
        name: `Alternative Provision Programmes available in ${area.name}`,
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${SITE_URL}/referral`,
        servicePhone: {
          "@type": "ContactPoint",
          telephone: "+44 1782 365365",
          contactType: "referrals",
          areaServed: [areaCity, ...AREAS_SERVED],
        },
      },
    },
    // Product — the placement itself as a product (used by LLMs for comparison queries)
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${SITE_URL}/#product-ap-${area.slug}`,
      name: `Alternative Provision Placement — ${area.name}`,
      description: area.description,
      brand: ORG_REF,
      offers: buildOfferSchema({ name: `AP Placement — ${area.name}`, slug: area.slug, singleArea: areaCity }),
      areaServed: [areaCity, ...AREAS_SERVED],
      category: "Educational Service",
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: "Young people aged 11–16",
      },
    },
    // FAQPage
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",           item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/contact` },
        { "@type": "ListItem", position: 3, name: area.name,        item: pageUrl },
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
      <section className="bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden relative">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-white/40 to-transparent blur-3xl" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-white/30 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Breadcrumbs
              items={[
                { label: "Areas We Serve", to: "/contact" },
                { label: area.name },
              ]}
              className="text-primary-foreground/70 mb-8 flex justify-center [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20">
              <MapPin className="w-3.5 h-3.5" /> {area.county} Regional Coverage
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Alternative Provision<br />in {area.name}
            </h1>
            
            <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              {area.blurb}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-8 shadow-xl shadow-primary-900/20">
                <Link to="/referral">Make a Referral <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-white/40 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm px-8">
                <a href="tel:+441782365365">
                  <Phone className="h-5 w-5 mr-2" /> 01782 365365
                </a>
              </Button>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-8 border-t border-white/20 pt-10">
              {heroStats.map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
                  <p className="text-xs md:text-sm font-medium text-primary-foreground/70 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-4 mb-14">
            {area.highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 bg-card rounded-xl border border-border/50 px-5 py-4 shadow-sm">
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

      {/* Programmes available */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Programmes Available to {area.name} Schools
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              All six of our core programmes are accessible to young people referred from {area.name}.
              Placements are personalised — most combine elements from several programmes.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {programmeLinks.map((p) => (
                <Link
                  key={p.slug}
                  to={`/programmes#${p.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:text-primary hover:border-primary/40 transition-colors shadow-sm"
                >
                  <p.icon className="h-3.5 w-3.5 text-primary" />
                  {p.label}
                </Link>
              ))}
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/programmes">View All Programmes <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How to refer — 3-step */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              How to Refer a Young Person in {area.name}
            </h2>
            <p className="text-muted-foreground text-center mb-10 text-sm">
              Referrals from {area.name} schools, the local authority, social workers and parents are all welcome.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {referralSteps.map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-3 shadow-md shadow-primary/20">
                    {s.n}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
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

      {/* FAQ */}
      <section className="py-16 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border/60 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-medium text-foreground text-sm">{faq.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-border/40">
                      <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Knowledge resources */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-foreground mb-2">Helpful Resources</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Guides and best-practice articles for schools and professionals in {area.name} considering a referral.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {resourceLinks.map((r) => (
                <Link
                  key={r.href}
                  to={r.href}
                  className="group bg-card rounded-xl border border-border/60 p-5 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <BookOpen className="h-5 w-5 text-primary mb-3" />
                  <p className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{r.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium">
                    Read more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Glossary terms */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">Useful terms:</span>
              {glossaryTerms.map((t) => (
                <Link
                  key={t.label}
                  to={t.href}
                  className="inline-flex items-center gap-1 text-xs text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary/5 transition-colors"
                >
                  <BookOpen className="h-3 w-3" />{t.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nearby areas */}
      {area.nearbyAreas.length > 0 && (
        <section className="py-12 bg-muted/40 border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm font-semibold text-foreground mb-1">Also serving nearby areas</p>
              <p className="text-xs text-muted-foreground mb-4">We accept referrals from schools and local authorities across the region.</p>
              <div className="flex flex-wrap gap-3">
                {area.nearbyAreas.map((slug) => {
                  const nearby = AREAS[slug];
                  if (!nearby) return null;
                  return (
                    <Link
                      key={slug}
                      to={`/alternative-provision/${slug}`}
                      className="group flex flex-col bg-card rounded-xl border border-border/60 px-5 py-3 hover:border-primary/40 hover:shadow-md transition-all"
                    >
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {nearby.name}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5">{nearby.county}</span>
                    </Link>
                  );
                })}
                <Link
                  to="/contact"
                  className="flex flex-col bg-card rounded-xl border border-dashed border-border px-5 py-3 hover:border-primary/40 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <Clock className="h-3.5 w-3.5" />
                    View all areas
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">Staffordshire &amp; West Midlands</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </Layout>
  );
}
