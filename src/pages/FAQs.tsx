import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Phone, Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArchiveLayout } from "@/components/ArchiveLayout";
import { FilterPills } from "@/components/FilterPills";
import { cn } from "@/lib/utils";

type QA = { q: string; a: string };
type FAQGroup = { id: string; title: string; items: QA[] };

const GROUPS: FAQGroup[] = [
  {
    id: "about-ap",
    title: "About Alternative Provision",
    items: [
      {
        q: "What is Alternative Provision?",
        a: "Alternative Provision (AP) is education arranged for pupils who can't attend mainstream school due to exclusion, illness, SEMH needs, or other reasons. It provides structured learning in smaller, more supportive environments alongside pastoral and therapeutic input.",
      },
      {
        q: "Who is Pathway Academy Zone for?",
        a: "We support young people aged 11-16 (Key Stages 3 and 4) who are permanently excluded, at risk of exclusion, disengaged from mainstream education, or who have social, emotional and mental health (SEMH) needs that mainstream cannot currently meet.",
      },
      {
        q: "Is AP the same as being 'sent away from school'?",
        a: "No. AP is a legitimate, statutory education route. Many of our learners remain dual-rolled with their home school and return to mainstream after a successful placement.",
      },
    ],
  },
  {
    id: "referrals",
    title: "Referrals",
    items: [
      {
        q: "How does the referral process work?",
        a: "Referrals are made by schools, local authorities, social workers, or parents. We review every referral within 48 hours, hold an assessment meeting with the young person and family, then agree a personalised placement plan with all parties.",
      },
      {
        q: "How quickly can a learner start?",
        a: "Emergency placements can begin within 48 hours. Standard placements typically start within 1-2 weeks following the assessment process.",
      },
      {
        q: "Can parents self-refer?",
        a: "Parents and carers are welcome to contact us for a conversation. Formal placements are normally commissioned by a school or the local authority, but we can guide you through who to speak to next.",
      },
    ],
  },
  {
    id: "life-at-paz",
    title: "Life at Pathway Academy Zone",
    items: [
      {
        q: "What does a typical day look like?",
        a: "Each day starts with a regulation check-in and breakfast, followed by core academic sessions in small groups, a structured lunch, vocational or enrichment input in the afternoon, and a reflective close with your key adult.",
      },
      {
        q: "What qualifications can learners achieve?",
        a: "Learners can access GCSE English, Maths, and Science, Functional Skills, and a range of BTEC and vocational Level 1 and 2 qualifications depending on their pathway.",
      },
      {
        q: "How do you keep learners safe?",
        a: "Safeguarding is our top priority. All staff are DBS checked and trained, we have a designated safeguarding lead on site every day, robust reporting procedures, and we work closely with local safeguarding partners.",
      },
    ],
  },
  {
    id: "commissioners",
    title: "Commissioners & Partner Schools",
    items: [
      {
        q: "Are you on the Staffordshire AP Directory?",
        a: "Yes. Pathway Academy Zone is an approved provider on the Staffordshire Alternative Provision Directory and meets the DfE's AP performance framework.",
      },
      {
        q: "What outcomes data do you publish?",
        a: "We publish attendance, progression to positive destinations, and qualification gains each academic year. Summary data is available on our Outcomes page; full reports are shared with commissioners on request.",
      },
      {
        q: "Can you support reintegration to mainstream?",
        a: "Absolutely. Reintegration is one of our core progression routes. We work closely with home schools, SENCos, and families to plan and phase the return.",
      },
    ],
  },
];

const ALL = "All";

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const allItems = useMemo(() => GROUPS.flatMap((g) => g.items), []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GROUPS
      .filter((g) => activeCategory === ALL || g.title === activeCategory)
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (item) =>
            !q ||
            item.q.toLowerCase().includes(q) ||
            item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [activeCategory, query]);

  const categories = [ALL, ...GROUPS.map((g) => g.title)];
  const totalMatches = filteredGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to the most common questions about Alternative Provision, referrals, and life at Pathway Academy Zone."
        jsonLd={jsonLd}
      />
      <ArchiveLayout
        crumbs={[{ label: "FAQs" }]}
        title="Frequently Asked Questions"
        intro="Quick answers for parents, carers, schools, local authorities, and anyone new to Alternative Provision."
        sidebar={{
          toc: GROUPS.map((g) => ({ id: g.id, label: g.title, level: 2 })),
          ctas: [
            {
              label: "Make a Referral",
              href: "/referral",
              description: "Start the placement process for a young person.",
              tone: "primary",
            },
            {
              label: "Knowledge Hub",
              href: "/knowledge-hub",
              description: "Guides, comparisons and best practice for AP.",
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
            <Input
              type="search"
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground"
              aria-label="Search FAQs"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{totalMatches}</span>{" "}
          of {allItems.length} questions
        </p>

        {filteredGroups.length > 0 ? (
          <div className="space-y-12">
            {filteredGroups.map((group) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-heading`}
                className="scroll-mt-28"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="block w-1 h-5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <h2
                    id={`${group.id}-heading`}
                    className="text-sm font-semibold text-muted-foreground tracking-widest uppercase"
                  >
                    {group.title}
                  </h2>
                </div>
                <div className="space-y-3">
                  {group.items.map((item, idx) => (
                    <FaqItem
                      key={item.q}
                      question={item.q}
                      answer={item.a}
                      index={idx}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-border bg-card">
            <p className="text-muted-foreground text-base mb-4">
              No questions found matching your search.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveCategory(ALL);
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <div className="rounded-2xl bg-muted/50 border border-border p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Still have questions?
              </h2>
            </div>
            <p className="text-muted-foreground">
              Our team is happy to talk you through any aspect of our provision.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild>
              <Link to="/referral">
                Make a Referral <ArrowRight className="ml-1 h-4 w-4" />
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
        "bg-card rounded-2xl border overflow-hidden transition-all duration-300",
        open ? "border-primary/40 shadow-md" : "border-border/50 hover:border-border"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full font-display font-semibold text-foreground flex items-center justify-between p-6 text-left gap-4"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
            open ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          <ChevronDown className="h-4 w-4" />
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
              className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed"
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
