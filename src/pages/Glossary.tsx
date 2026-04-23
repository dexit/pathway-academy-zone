import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, BookMarked } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Seo, Breadcrumbs, SITE_URL } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";
import { buildDefinedTermSetJsonLd } from "@/lib/json-ld";

const terms: { term: string; slug: string; definition: string }[] = [
  { term: "Alternative Provision (AP)", slug: "alternative-provision", definition: "Education arranged for pupils who, because of exclusion, illness, or other reasons, would not otherwise receive suitable education. AP can be delivered by local authorities, schools, or registered providers outside of mainstream and special school settings." },
  { term: "SEMH (Social, Emotional and Mental Health)", slug: "semh", definition: "A category of Special Educational Needs covering difficulties with social interaction, emotional regulation, and mental health that significantly impact a young person's ability to learn. SEMH needs often require specialist support and therapeutic interventions." },
  { term: "EHCP (Education, Health and Care Plan)", slug: "ehcp", definition: "A legal document for children and young people aged 0-25 with more complex special educational needs. EHCPs describe the child's needs, the support required, and the outcomes to be achieved. They are reviewed annually." },
  { term: "Managed Move", slug: "managed-move", definition: "A voluntary agreement between schools, parents, and the local authority to transfer a pupil to another school as an alternative to permanent exclusion. Managed moves aim to give pupils a fresh start while avoiding exclusion on their record." },
  { term: "Trauma-Informed Practice", slug: "trauma-informed", definition: "An approach to education that recognises the widespread impact of trauma on young people's behaviour and learning. Staff understand trauma responses, avoid re-traumatisation, and create safe, predictable environments that support recovery." },
  { term: "Re-Engagement", slug: "re-engagement", definition: "The process of helping disengaged learners reconnect with education through modified approaches, relationship-building, and addressing underlying barriers. Academic re-engagement focuses on rebuilding confidence in learning." },
  { term: "Vocational Pathway", slug: "vocational-pathway", definition: "An educational route focused on practical, skills-based learning that prepares young people for specific careers or industries. Vocational pathways in AP often include construction, catering, motor vehicle, hair and beauty, or creative industries." },
  { term: "Pastoral Support", slug: "pastoral-support", definition: "Non-academic support provided to students addressing their emotional, social, and personal needs. In AP settings, pastoral support is often intensive and may include mentoring, counselling, family liaison, and multi-agency coordination." },
  { term: "Progression Routes", slug: "progression-routes", definition: "The pathways available to young people when they complete their AP placement. These include return to mainstream school, college, apprenticeships, employment, or continued specialist provision depending on individual needs and aspirations." },
  { term: "Permanent Exclusion", slug: "permanent-exclusion", definition: "When a headteacher decides that a pupil should no longer attend their school. This is the most serious sanction available and should only be used as a last resort. Local authorities must arrange education from day 6 of a permanent exclusion." },
  { term: "Fixed-Term Exclusion (Suspension)", slug: "fixed-term-exclusion", definition: "When a pupil is temporarily removed from school for a set period. Schools must provide work for the first 5 days and arrange alternative education from day 6. A pupil can receive a maximum of 45 days of fixed-term exclusion in one school year." },
  { term: "Pupil Referral Unit (PRU)", slug: "pru", definition: "A type of school established and maintained by local authorities specifically to provide education for children who are excluded, sick, or otherwise unable to attend mainstream school. PRUs are a form of Alternative Provision." },
  { term: "Designated Safeguarding Lead (DSL)", slug: "dsl", definition: "The person in a school or AP setting with overall responsibility for safeguarding and child protection. The DSL is the first point of contact for concerns, coordinates with external agencies, and ensures staff are trained." },
  { term: "Multi-Agency Working", slug: "multi-agency-working", definition: "Collaboration between different services and professionals (education, health, social care, police) to support young people with complex needs. Effective multi-agency working ensures coordinated support without duplication." },
  { term: "Children Looked After (CLA)", slug: "cla", definition: "Children in the care of the local authority, either under a care order or accommodated with parental agreement. CLA have additional educational entitlements and support, including a Virtual School Head and Personal Education Plan." },
  { term: "Personal Education Plan (PEP)", slug: "pep", definition: "A plan required for all Children Looked After that forms part of their overall care plan. The PEP identifies educational needs, sets targets, and outlines the support required to help the young person achieve." },
  { term: "Elective Home Education (EHE)", slug: "ehe", definition: "When parents choose to educate their child at home rather than sending them to school. Parents are responsible for providing a suitable full-time education but are not required to follow the national curriculum." },
  { term: "NEET (Not in Education, Employment or Training)", slug: "neet", definition: "A classification for young people aged 16-24 who are not engaged in any form of education, employment, or training. Reducing NEET rates is a key outcome measure for Alternative Provision." },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Glossary() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return terms;
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by first letter for the A–Z view.
  const grouped = useMemo(() => {
    const map = new Map<string, typeof terms>();
    filtered.forEach((t) => {
      const letter = t.term[0]?.toUpperCase() || "#";
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(t);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const availableLetters = useMemo(
    () => new Set(grouped.map(([l]) => l)),
    [grouped]
  );

  const url = `${SITE_URL}/knowledge-hub/glossary`;
  const jsonLd = buildDefinedTermSetJsonLd("Alternative Provision Glossary", url, terms);

  return (
    <Layout>
      <Seo
        title="Alternative Provision Glossary"
        description="Searchable A–Z glossary of Alternative Provision, SEND and SEMH terminology for educators, parents and professionals."
        jsonLd={jsonLd}
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Knowledge Hub", to: "/knowledge-hub" },
                { label: "Glossary" },
              ]}
              className="text-primary-foreground/70 mb-5 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4">
              <BookMarked className="w-3.5 h-3.5" />
              Reference
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Alternative Provision Glossary
            </h1>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              Clear, searchable definitions of key terms and concepts used in Alternative Provision —
              for educators, parents, and professionals.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start">
          <div className="min-w-0 space-y-8">
            {/* Search + A–Z */}
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6 space-y-5 sticky top-20 z-10 shadow-sm">
              <label className="block">
                <span className="sr-only">Search glossary</span>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search terms or definitions…"
                    className="w-full rounded-full border border-input bg-background pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                  />
                </div>
              </label>
              <div className="flex flex-wrap gap-1.5" role="navigation" aria-label="Glossary A to Z">
                {ALPHABET.map((letter) => {
                  const enabled = availableLetters.has(letter);
                  return (
                    <a
                      key={letter}
                      href={enabled ? `#letter-${letter}` : undefined}
                      onClick={(e) => {
                        if (!enabled) {
                          e.preventDefault();
                          return;
                        }
                        e.preventDefault();
                        document
                          .getElementById(`letter-${letter}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      aria-disabled={!enabled}
                      className={
                        "w-8 h-8 inline-flex items-center justify-center rounded-md text-xs font-semibold transition-colors " +
                        (enabled
                          ? "bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground cursor-pointer"
                          : "bg-muted/40 text-muted-foreground/40 cursor-not-allowed")
                      }
                    >
                      {letter}
                    </a>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                {filtered.length} of {terms.length} terms
              </p>
            </div>

            {grouped.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center">
                <p className="text-muted-foreground">
                  No terms match <strong className="text-foreground">{query}</strong>.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setQuery("")}>
                  Clear search
                </Button>
              </div>
            ) : (
              grouped.map(([letter, items]) => (
                <section key={letter} id={`letter-${letter}`} className="scroll-mt-32">
                  <div className="flex items-baseline gap-3 mb-4">
                    <h2 className="font-display text-3xl font-bold text-primary">{letter}</h2>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">
                      {items.length} term{items.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {items.map((item) => (
                      <article
                        key={item.slug}
                        id={item.slug}
                        className="p-5 bg-card rounded-xl border border-border scroll-mt-32 hover:border-primary/40 transition-colors"
                      >
                        <h3 className="text-base font-bold text-foreground mb-1.5">{item.term}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.definition}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              ))
            )}

            <section className="mt-6 rounded-2xl border border-border bg-primary/10 p-8 md:p-10 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-3">Explore More Resources</h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
                Dive deeper into Alternative Provision with our comprehensive guides and best
                practice resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link to="/knowledge-hub/complete-guide">
                    Read the Complete Guide
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/knowledge-hub">Back to Knowledge Hub</Link>
                </Button>
              </div>
            </section>
          </div>

          <ContentSidebar
            toc={grouped.map(([l]) => ({ id: `letter-${l}`, label: l, level: 2 }))}
            ctas={[
              {
                label: "Make a Referral",
                description: "Refer a young person in 4 steps",
                href: "/referral",
                tone: "primary",
              },
              {
                label: "Browse Knowledge Hub",
                description: "All categories and resources",
                href: "/knowledge-hub",
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
  );
}
