import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  CheckCircle,
  Calendar,
  Clock,
  BookOpen,
  Wrench,
  Brain,
  Lightbulb,
  Heart,
  Briefcase,
  Building2,
  MapPin,
  ArrowRight
} from "lucide-react"
import Layout from "@/components/Layout"
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { ContentSidebar } from "@/components/ContentSidebar"
import heroImg from "@/assets/hero-classroom.jpg"
import careersImg from "@/assets/careers-event.jpg"
import buildingImg from "@/assets/building-exterior.jpg"
import vocationalImg from "@/assets/vocational-training.jpg"
import classroomImg from "@/assets/classroom-learning.jpg"

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const programmes = [
  { slug: "academic-reengagement", icon: BookOpen, title: "Academic Re-engagement", img: classroomImg, desc: "Focusing on core subjects (English, Maths, Science) to rebuild confidence and prepare for qualifications in a low-pressure environment.", features: ["Small group sizes (max 6)","Individual learning plans","GCSE & Functional Skills pathways","Trauma-informed teaching"], schedule: "Monday - Friday", time: "9:00am - 2:30pm" },
  { slug: "vocational-learning", icon: Wrench, title: "Vocational Learning", img: vocationalImg, desc: "Practical, hands-on experience in various trades and skills, designed to spark interest and provide a foundation for future apprenticeships.", features: ["Hands-on workshops","Introduction to trades","Portfolio building","Industry-standard tools"], schedule: "2 days per week", time: "9:30am - 3:00pm" },
  { slug: "semh-support", icon: Brain, title: "SEMH Support", img: classroomImg, desc: "Integrated social, emotional, and mental health support. Every programme includes access to therapeutic interventions and pastoral care.", features: ["1:1 therapeutic sessions","Group workshops","Emotional regulation support","Family support sessions"], schedule: "Ongoing throughout placement", time: "As needed, typically 2-3 sessions per week" },
  { slug: "personal-development", icon: Lightbulb, title: "Personal Development", img: heroImg, desc: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.", features: ["Communication skills","Problem-solving","Team building","Goal setting"], schedule: "Integrated into weekly timetable", time: "2 hours per week minimum" },
  { slug: "life-skills", icon: Heart, title: "Life Skills Programme", img: careersImg, desc: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.", features: ["Cooking & nutrition","Financial literacy","Health education","Digital skills including AI skills"], schedule: "Integrated into curriculum", time: "Weekly sessions" },
  { slug: "employability-skills", icon: Briefcase, title: "Employability Skills", img: buildingImg, desc: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.", features: ["CV & application support","Interview preparation","Work experience","Careers guidance"], schedule: "Year 10 & 11 focus", time: "Weekly sessions plus placements" },
];

const programmesSchema = [
  ...programmes.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": p.title,
    "description": p.desc,
    "url": `${SITE_URL}/programmes#${p.slug}`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": SITE_NAME,
      "sameAs": SITE_URL,
    },
    "educationalLevel": "Key Stage 3 / Key Stage 4",
    "inLanguage": "en-GB",
    "audience": { "@type": "EducationalAudience", "educationalRole": "student", "audienceType": "Ages 11–16" },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "location": {
        "@type": "Place",
        "name": `${SITE_NAME} — Burslem Learning Centre`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Duncalf Street, Burslem",
          "addressLocality": "Stoke-on-Trent",
          "postalCode": "ST6 3LJ",
          "addressCountry": "GB",
        },
      },
      "courseSchedule": { "@type": "Schedule", "description": `${p.schedule} — ${p.time}` },
    },
    "offers": { "@type": "Offer", "category": "Alternative Provision", "availability": "https://schema.org/InStock" },
  })),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Alternative Provision Programmes",
    "numberOfItems": programmes.length,
    "itemListElement": programmes.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE_URL}/programmes#${p.slug}`,
      "name": p.title
    }))
  }
];

export default function Programmes() {
  const toc = programmes.map(p => ({
    id: p.slug,
    label: p.title,
    level: 2 as const
  }));

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
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Programmes</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Structured learning pathways combining academic rigour with vocational expertise and SEMH support.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <div className="space-y-24">
            {programmes.map((prog, i) => (
              <motion.article
                id={prog.slug}
                key={prog.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
                  <div className={i % 2 === 1 ? "xl:order-2" : ""}>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <prog.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{prog.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{prog.desc}</p>
                    <ul className="space-y-3 mb-6">
                      {prog.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-foreground text-sm">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground bg-muted/30 p-4 rounded-xl">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {prog.schedule}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {prog.time}
                      </span>
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "xl:order-1" : ""}>
                    <img src={prog.img} alt={prog.title} className="rounded-2xl shadow-lg w-full h-80 object-cover" loading="lazy" />
                  </div>
                </div>
              </motion.article>
            ))}

            <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-3">
                <Building2 className="h-4 w-4" /> Where We Deliver
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Programmes are Delivered at Our Centres
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
                Every programme is delivered in our purpose-built learning
                centre in Burslem, Stoke-on-Trent. Visit the Centres page to see
                our facilities, a typical day&apos;s timetable, and how to
                arrange a tour.
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-medium text-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Duncalf St, Burslem ST6 3LJ
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Mon–Fri, 8:30am–4:00pm
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/centres">
                    Visit Our Centres <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Arrange a Tour
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={toc}
            ctas={[
              {
                label: "Make a Referral",
                description: "Start the process for a new placement",
                href: "/referral",
                tone: "primary",
              },
              {
                label: "Contact Us",
                description: "Questions about our curriculum?",
                href: "/contact",
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
  )
}
