import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, ArrowRight, Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Seo, SITE_URL } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { FilterPills } from "@/components/FilterPills";

const ALL = "All";

type FAQ = {
  q: string;
  a: string;
  category: "General" | "Referrals" | "Curriculum" | "Safeguarding";
};

const FAQS: FAQ[] = [
  {
    category: "General",
    q: "What is Alternative Provision (AP)?",
    a: "Alternative Provision (AP) is education arranged for pupils who, because of exclusion, illness, or other reasons, would not otherwise receive suitable education. It provides structured learning in smaller, more supportive environments than mainstream schools.",
  },
  {
    category: "General",
    q: "Who is Pathway Academy Zone for?",
    a: "We support young people aged 11-16 (Key Stage 3 & 4) who are permanently excluded, at risk of exclusion, disengaged from mainstream education, or have social, emotional and mental health (SEMH) needs.",
  },
  {
    category: "Referrals",
    q: "How does the referral process work?",
    a: "Referrals are typically made by schools, local authorities, or social workers. Once an enquiry is received, we gather information, hold an assessment meeting with the student and family, and then create a personalised placement plan.",
  },
  {
    category: "Referrals",
    q: "How quickly can a learner start?",
    a: "Emergency placements can often begin within 48 hours. Standard placements typically start within 1-2 weeks following the initial assessment and information-sharing process.",
  },
  {
    category: "Curriculum",
    q: "What subjects do you teach?",
    a: "We offer a broad curriculum including core academics (English, Maths, Science), vocational learning (various trades), and personal development. We support GCSEs, Functional Skills, and other accredited qualifications.",
  },
  {
    category: "Safeguarding",
    q: "How do you keep learners safe?",
    a: "Safeguarding is our absolute priority. All staff are DBS checked and receive regular training. We have a dedicated Designated Safeguarding Lead (DSL), clear reporting procedures, and work closely with local safeguarding partners.",
  },
];

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const categories = [ALL, ...Array.from(new Set(FAQS.map((f) => f.category)))];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchesCat = activeCategory === ALL || f.category === activeCategory;
      const matchesQ = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [activeCategory, query]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  const grouped = useMemo(() => {
    const map: Record<string, FAQ[]> = {};
    filtered.forEach((f) => {
      if (!map[f.category]) map[f.category] = [];
      map[f.category].push(f);
    });
    return Object.entries(map);
  }, [filtered]);

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Find answers to common questions about Alternative Provision, referrals, our curriculum, and safeguarding at Pathway Academy Zone."
        jsonLd={jsonLd}
      />
      <ArchiveLayout
        crumbs={[{ label: "FAQs" }]}
        title="Common Questions"
        intro="Everything you need to know about how Pathway Academy Zone supports young people, the referral journey, and our educational approach."
        sidebar={{
          ctas: [
            {
              label: "Knowledge Hub",
              href: "/knowledge-hub",
              description: "In-depth guides on AP topics.",
              tone: "primary",
            },
            {
              label: "Make a Referral",
              href: "/referral",
              description: "Begin the placement process.",
            },
            {
              label: "Our Programmes",
              href: "/programmes",
              description: "Explore what we teach.",
            },
          ],
          quickContact: {
            phone: "01782 365365",
            email: "info@pathwayacademyzone.co.uk",
          },
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <FilterPills
            options={categories}
            active={activeCategory}
            onChange={setActiveCategory}
            ariaLabel="Filter FAQs by category"
          />
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              aria-label="Search FAQs"
            />
          </div>
        </div>

        {grouped.length > 0 ? (
          <div className="space-y-12">
            {grouped.map(([cat, items]) => (
              <section key={cat} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-border flex-1" />
                  <h2 className="text-xs font-bold text-primary uppercase tracking-[0.2em] shrink-0">{cat}</h2>
                  <div className="h-px bg-border flex-1" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {items.map((faq, idx) => (
                    <FaqItem
                      key={faq.q}
                      question={faq.q}
                      answer={faq.a}
                      index={idx}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-[2rem] border border-dashed border-border/50">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold text-foreground mb-2">No matching questions found</h3>
            <p className="text-muted-foreground text-sm mb-6">Try adjusting your search or category filters.</p>
            <Button
              variant="outline"
              className="rounded-full font-bold"
              onClick={() => {
                setActiveCategory(ALL);
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <div className="rounded-[2rem] bg-primary/5 border border-primary/10 p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-xl">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Still have questions?
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Our team is happy to talk you through any aspect of our provision. We provide free consultations for schools and families.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button asChild variant="outline" size="lg" className="rounded-full font-bold px-8">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" className="rounded-full font-bold px-8 shadow-lg shadow-primary/10">
              <Link to="/referral">
                Make a Referral <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ArchiveLayout>
    </>
  );
}

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "bg-card rounded-[1.5rem] border overflow-hidden transition-all duration-300",
        open ? "border-primary/40 shadow-xl shadow-primary/5" : "border-border/50 hover:border-border"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full font-display font-bold text-foreground flex items-center justify-between p-7 text-left gap-4"
      >
        <span className="text-lg">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
            open ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="px-7 pb-8 text-muted-foreground leading-relaxed max-w-3xl"
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
