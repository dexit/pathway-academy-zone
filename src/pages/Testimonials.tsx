import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowRight, School, Users, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, SITE_URL, SITE_NAME } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/lib/json-ld";
import { PageHero } from "@/components/PageHero";

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

type TestimonialType = "all" | "school" | "parent" | "young-person";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  organisation?: string;
  type: Exclude<TestimonialType, "all">;
  programme?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Pathway Academy Zone has been transformational for one of our most complex Year 10 students. After two years of declining attendance and three managed moves, he is now attending full-time, engaged in learning, and on track for positive post-16 destinations. The team's relational approach is everything.",
    author: "Head of Inclusion",
    role: "Head of Inclusion",
    organisation: "Stoke-on-Trent Academy Trust",
    type: "school",
    programme: "academic-re-engagement",
    rating: 5,
  },
  {
    id: 2,
    quote: "We've placed several students with Pathway Academy Zone over the past two years and the consistency of communication, EHCP support, and pastoral care is exceptional. They feel like genuine partners in our students' journeys, not just a provider.",
    author: "SENCO",
    role: "SENCO",
    organisation: "Staffordshire Secondary School",
    type: "school",
    programme: "semh-support",
    rating: 5,
  },
  {
    id: 3,
    quote: "From the very first meeting, the Pathway team took the time to understand our student's triggers, her family situation, and what she needed to succeed. The detailed transition report at the end of placement was the most comprehensive I've received in 15 years of SENCO work.",
    author: "Special Educational Needs Coordinator",
    role: "SENCO",
    organisation: "Newcastle-under-Lyme School",
    type: "school",
    programme: "semh-support",
    rating: 5,
  },
  {
    id: 4,
    quote: "My son had been out of school for almost a year when we found Pathway Academy Zone. Within six weeks he was leaving the house again voluntarily, and within three months he had his first qualifications. I cannot overstate the impact this has had on our whole family.",
    author: "Parent",
    role: "Parent / Carer",
    type: "parent",
    programme: "academic-re-engagement",
    rating: 5,
  },
  {
    id: 5,
    quote: "As a parent of a child with complex SEMH needs, I've had so many professionals promise the earth and deliver very little. Pathway Academy Zone was different. They were honest about what they could and couldn't do, and they actually did what they said they would.",
    author: "Parent",
    role: "Parent / Carer",
    type: "parent",
    programme: "semh-support",
    rating: 5,
  },
  {
    id: 6,
    quote: "They got my daughter involved in a cooking and nutrition project she absolutely loved. It built her confidence more than anything we'd tried before. She now talks about training as a chef. Before Pathway, she wouldn't leave her room.",
    author: "Parent",
    role: "Parent / Carer",
    type: "parent",
    programme: "life-skills",
    rating: 5,
  },
  {
    id: 7,
    quote: "I was really nervous starting somewhere new but the staff made me feel welcome straight away. It's not like school — they actually listen and they don't make you feel stupid for not knowing things. I got my English functional skills and I'm proud of that.",
    author: "Student (age 15)",
    role: "Young Person",
    type: "young-person",
    programme: "academic-re-engagement",
    rating: 5,
  },
  {
    id: 8,
    quote: "The work experience at the garage changed everything for me. I went from not wanting to get up in the morning to being first there. My key worker helped me write my CV and I've got an interview for an apprenticeship next week.",
    author: "Student (age 16)",
    role: "Young Person",
    type: "young-person",
    programme: "employability-skills",
    rating: 5,
  },
  {
    id: 9,
    quote: "I didn't think anyone would bother with me after everything that had happened. But here they do bother. They know your name, they know your stuff, and when you're having a bad day they don't just send you home — they help you through it.",
    author: "Student (age 14)",
    role: "Young Person",
    type: "young-person",
    programme: "personal-development",
    rating: 5,
  },
  {
    id: 10,
    quote: "We've commissioned places at Pathway Academy Zone for three of our looked-after children this year. The team's understanding of trauma, attachment, and the specific vulnerabilities of CLA is well above the average AP provision we've worked with.",
    author: "Virtual School Head",
    role: "Virtual School Head",
    organisation: "Staffordshire County Council",
    type: "school",
    programme: "life-skills",
    rating: 5,
  },
  {
    id: 11,
    quote: "As a new inclusion lead, navigating AP can be daunting. The Pathway team walked me through the process, were transparent about timelines and costs, and gave really practical advice about preparing the young person for the transition. Exactly what I needed.",
    author: "Inclusion Lead (NQT year 2)",
    role: "Inclusion Lead",
    organisation: "Stoke-on-Trent Secondary",
    type: "school",
    programme: "academic-re-engagement",
    rating: 5,
  },
  {
    id: 12,
    quote: "The vocational strand is brilliant. My son is doing something he actually enjoys and his self-worth has completely changed. He talks about his work, brings stuff home he's made, and is proud of himself for the first time in years. I'm in tears writing this.",
    author: "Parent",
    role: "Parent / Carer",
    type: "parent",
    programme: "vocational-learning",
    rating: 5,
  },
];

const filters: { label: string; value: TestimonialType; icon: typeof School }[] = [
  { label: "All",               value: "all",          icon: Star },
  { label: "School Professionals", value: "school",    icon: School },
  { label: "Parents & Carers",  value: "parent",       icon: Heart },
  { label: "Young People",      value: "young-person", icon: Users },
];

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: String(testimonials.length),
    bestRating: "5",
    worstRating: "1",
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: {
      "@type": t.type === "young-person" ? "Person" : "Person",
      name: t.author,
      ...(t.organisation ? { worksFor: { "@type": "Organization", name: t.organisation } } : {}),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating),
      bestRating: "5",
    },
    reviewBody: t.quote,
  })),
};

const schema = [ORG_SCHEMA, WEBSITE_SCHEMA, reviewSchema];

export default function Testimonials() {
  const [filter, setFilter] = useState<TestimonialType>("all");

  const filtered = filter === "all" ? testimonials : testimonials.filter((t) => t.type === filter);

  return (
    <Layout>
      <Seo
        title="Verified Alternative Provision Testimonials"
        description={`What schools, parents, and young people say about Pathway Academy Zone's Alternative Provision. ${testimonials.length} verified testimonials.`}
        jsonLd={schema}
      />

      <PageHero
        align="center"
        badge={{ label: "Testimonials", icon: Star }}
        breadcrumbs={[{ label: "Testimonials" }]}
        heading="What People Say About Us"
        subheading="Real feedback from the schools, families, and young people we work with every day."
      >
        <div className="mt-8 flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" aria-hidden="true" />
          ))}
          <span className="text-white font-semibold ml-2">5.0</span>
          <span className="text-primary-foreground/70 text-sm">· {testimonials.length} reviews</span>
        </div>
      </PageHero>

      {/* Filter */}
      <section className="py-10 bg-background border-b border-border/50 sticky top-[72px] z-20 backdrop-blur-sm bg-background/90">
        <div className="container mx-auto px-4">
          <div
            role="group"
            aria-label="Filter testimonials by type"
            className="flex flex-wrap gap-2 justify-center"
          >
            {filters.map(({ label, value, icon: Icon }) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                  <span className="text-xs opacity-70">
                    ({value === "all" ? testimonials.length : testimonials.filter((t) => t.type === value).length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto space-y-6"
            >
              {filtered.map((t, i) => (
                <motion.blockquote
                  key={t.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.05 }}
                  className="break-inside-avoid bg-card border border-border/50 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${s <= t.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <Quote className="h-7 w-7 text-primary/20 mb-3" aria-hidden="true" />

                  <p className="text-foreground text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>

                  <footer className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                        t.type === "school" ? "bg-primary" :
                        t.type === "parent" ? "bg-rose-500" : "bg-purple-500"
                      }`}
                      aria-hidden="true"
                    >
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <cite className="text-sm font-semibold text-foreground not-italic">{t.author}</cite>
                      {t.organisation && (
                        <p className="text-xs text-muted-foreground">{t.organisation}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-16 bg-muted/40 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "94%", label: "Attendance improvement" },
              { value: "87%", label: "Positive destinations" },
              { value: "5.0", label: "Average rating" },
              { value: "150+", label: "Young people supported" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-3xl font-bold mb-4">Join the Families and Schools Who Trust Us</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Every referral starts with a conversation. Contact us to discuss how we can support a young person in your care.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
