import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Wrench, Brain, Lightbulb, Briefcase, Heart, Calendar, Clock, CheckCircle, ArrowRight, MapPin, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, SITE_URL, SITE_NAME, Breadcrumbs } from "@/components/Seo";
import classroomImg from "@/assets/classroom-learning.jpg";
import vocationalImg from "@/assets/vocational-training.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";
import heroImg from "@/assets/hero-classroom.jpg";
import careersImg from "@/assets/careers-event.jpg";
import buildingImg from "@/assets/building-exterior.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const programmes = [
  { slug: "academic-re-engagement", icon: BookOpen, title: "Academic Re-engagement", img: classroomImg, desc: "Structured academic curriculum adapted for individual learning needs, focusing on core subjects and building confidence in learning.", features: ["English, Maths & Science","PSHE / RSHE, RE, PE & Citizenship","Small group teaching (max 6)","Personalised learning plans"], schedule: "Full-time or part-time placements", time: "Monday to Friday, 9:30am - 2:30pm" },
  { slug: "vocational-learning", icon: Wrench, title: "Vocational Learning", img: vocationalImg, desc: "Hands-on practical programmes developing real-world skills in areas like construction, catering, motor mechanics, and horticulture.", features: ["Industry-standard training","Work experience placements","Recognised qualifications","Employer partnerships"], schedule: "1-2 days per week alongside academic", time: "Varies by programme" },
  { slug: "semh-support", icon: Brain, title: "SEMH Support", img: mentoringImg, desc: "Therapeutic intervention and support for young people with social, emotional, and mental health needs, integrated throughout all provision.", features: ["1:1 therapeutic sessions","Group workshops","Emotional regulation support","Family support sessions"], schedule: "Ongoing throughout placement", time: "As needed, typically 2-3 sessions per week" },
  { slug: "personal-development", icon: Lightbulb, title: "Personal Development", img: heroImg, desc: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.", features: ["Communication skills","Problem-solving","Team building","Goal setting"], schedule: "Integrated into weekly timetable", time: "2 hours per week minimum" },
  { slug: "life-skills", icon: Heart, title: "Life Skills Programme", img: careersImg, desc: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.", features: ["Cooking & nutrition","Financial literacy","Health education","Digital skills including AI skills"], schedule: "Integrated into curriculum", time: "Weekly sessions" },
  { slug: "employability-skills", icon: Briefcase, title: "Employability Skills", img: buildingImg, desc: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.", features: ["CV & application support","Interview preparation","Work experience","Careers guidance"], schedule: "Year 10 & 11 focus", time: "Weekly sessions plus placements" },
];

// Course + ItemList ("CourseCarousel" rich result eligibility per
// schema.org Course extension). Each entry is also a standalone Course
// node so individual programme detail surfaces.
const programmesSchema = [
  ...programmes.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.title,
    description: p.desc,
    url: `${SITE_URL}/programmes#${p.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    educationalLevel: "Key Stage 3 / Key Stage 4",
    inLanguage: "en-GB",
    audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "Ages 11–16" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: {
        "@type": "Place",
        name: `${SITE_NAME} — Burslem Learning Centre`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Duncalf Street, Burslem",
          addressLocality: "Stoke-on-Trent",
          postalCode: "ST6 3LJ",
          addressCountry: "GB",
        },
      },
      courseSchedule: { "@type": "Schedule", description: `${p.schedule} — ${p.time}` },
    },
    offers: { "@type": "Offer", category: "Alternative Provision", availability: "https://schema.org/InStock" },
  })),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pathway Academy Zone Programmes",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: programmes.length,
    itemListElement: programmes.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/programmes#${p.slug}`,
      name: p.title,
    })),
  },
];

export default function Programmes() {
  return (
    <Layout>
      <Seo
        title="Our Programmes"
        description="Academic re-engagement, vocational learning, SEMH support and more — Alternative Provision programmes in Stoke-on-Trent for ages 11–16."
        jsonLd={programmesSchema}
      />
            <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Programmes" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Pathways to Success</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Academic re-engagement, vocational learning, and SEMH support — structured programmes designed to meet individual needs and inspire futures.
            </p>
          </div>
        </div>
      </header>

      <section className="py-16 bg-background"><div className="container mx-auto px-4"><div className="space-y-24">
        {programmes.map((prog, i) => (
          <motion.article id={prog.slug} key={prog.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24`}>
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5"><prog.icon className="h-7 w-7 text-primary-foreground" /></div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{prog.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{prog.desc}</p>
              <ul className="space-y-3 mb-6">{prog.features.map((f) => (<li key={f} className="flex items-center gap-3 text-foreground"><CheckCircle className="h-5 w-5 text-primary shrink-0" />{f}</li>))}</ul>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{prog.schedule}</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{prog.time}</span>
              </div>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}><img src={prog.img} alt={prog.title} className="rounded-2xl shadow-lg w-full h-80 object-cover" loading="lazy" /></div>
          </motion.article>
        ))}
      </div></div></section>
      {/* Where these programmes are delivered */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div>
              <span className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-wider uppercase mb-3">
                <Building2 className="h-4 w-4" /> Where We Deliver
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Our Programmes are Delivered at Our Centres
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                Every programme is delivered in our purpose-built learning
                centre in Burslem, Stoke-on-Trent. Visit the Centres page to see
                our facilities, a typical day&apos;s timetable, and how to
                arrange a tour.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Duncalf St, Burslem ST6 3LJ
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Mon–Fri, 8:30am–4:00pm
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Button asChild>
                <Link to="/centres" title="Our Centres">
                  Visit Our Centres <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact" title="Arrange a tour">
                  Arrange a Tour
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-center"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Find the Right Programme</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Every young person is unique. Contact us to discuss which pathway would best support your student's needs and goals.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90 rounded-full"><Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          <Button asChild size="lg" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full bg-transparent"><Link to="/contact">Contact Us</Link></Button>
        </div>
      </div></section>
    </Layout>
  );
}
