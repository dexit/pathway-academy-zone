import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, BookMarked, Phone, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Seo, SITE_URL } from "@/components/Seo";
import { buildDefinedTermSetJsonLd } from "@/lib/json-ld";
import { PageHero } from "@/components/PageHero";

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
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return terms;
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
    );
  }, [query]);

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

  // Displayed terms: filter by activeLetter if set
  const displayedGroups = useMemo(() => {
    if (!activeLetter) return grouped;
    return grouped.filter(([l]) => l === activeLetter);
  }, [grouped, activeLetter]);

  function handleLetterClick(letter: string) {
    if (!availableLetters.has(letter)) return;
    if (activeLetter === letter) {
      // Second click deactivates filter, scroll to section
      setActiveLetter(null);
      document
        .getElementById(`letter-${letter}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setActiveLetter(letter);
      // Scroll to top of glossary content after filter
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const url = `${SITE_URL}/knowledge-hub/glossary`;
  const jsonLd = buildDefinedTermSetJsonLd("Alternative Provision Glossary", url, terms);

  return (
    <Layout>
      <Seo
        title="Alternative Provision Glossary"
        description="Searchable A–Z glossary of Alternative Provision, SEND and SEMH terminology for educators, parents and professionals."
        jsonLd={jsonLd}
      />

      <PageHero
        breadcrumbs={[{ label: "Knowledge Hub", to: "/knowledge-hub" }, { label: "Glossary" }]}
        heading="Alternative Provision Glossary"
        subheading="Clear, searchable definitions of key terms and concepts used in Alternative Provision — for educators, parents, and professionals."
        badge={{ label: "Reference", icon: BookMarked }}
        padding="py-14 md:py-20"
      />

      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Search bar — not sticky */}
        <div className="mb-8">
          <label className="block">
            <span className="sr-only">Search glossary</span>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveLetter(null);
                }}
                placeholder="Search terms or definitions…"
                className="w-full rounded-full border border-input bg-background pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
              />
            </div>
          </label>
          <p className="text-xs text-muted-foreground mt-2 ml-1">
            {filtered.length} of {terms.length} terms
            {activeLetter && (
              <span className="ml-2">
                · Showing letter <strong className="text-primary">{activeLetter}</strong>
                <button
                  onClick={() => setActiveLetter(null)}
                  className="ml-2 text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Show all
                </button>
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14 items-start">
          {/* Main content */}
          <div className="min-w-0 space-y-8">
            {displayedGroups.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center">
                <p className="text-muted-foreground">
                  No terms match <strong className="text-foreground">{query}</strong>.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => { setQuery(""); setActiveLetter(null); }}>
                  Clear search
                </Button>
              </div>
            ) : (
              displayedGroups.map(([letter, items]) => (
                <section key={letter} id={`letter-${letter}`} className="scroll-mt-28">
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
                        className="p-5 bg-card rounded-xl border border-border scroll-mt-28 hover:border-primary/40 transition-colors"
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

          {/* Sidebar with A-Z navigation */}
          <aside aria-label="Glossary navigation" className="lg:sticky lg:top-24 space-y-6 self-start">
            {/* A-Z letter navigator */}
            <nav
              aria-label="Glossary A to Z"
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Browse A–Z
              </p>
              <div className="grid grid-cols-6 gap-1.5">
                {ALPHABET.map((letter) => {
                  const enabled = availableLetters.has(letter);
                  const isActive = activeLetter === letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => handleLetterClick(letter)}
                      disabled={!enabled}
                      aria-pressed={isActive}
                      aria-label={`Filter by ${letter}${!enabled ? " (no terms)" : ""}`}
                      className={
                        "w-8 h-8 inline-flex items-center justify-center rounded-md text-xs font-semibold transition-all duration-200 " +
                        (isActive
                          ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/40"
                          : enabled
                          ? "bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground cursor-pointer hover:scale-105"
                          : "bg-muted/40 text-muted-foreground/40 cursor-not-allowed")
                      }
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
              {activeLetter && (
                <button
                  onClick={() => setActiveLetter(null)}
                  className="mt-3 w-full text-xs text-center text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
                >
                  Clear filter · show all
                </button>
              )}
            </nav>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                to="/referral"
                className="group block rounded-2xl p-5 transition-all bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <p className="font-display font-semibold">Make a Referral</p>
                <p className="text-sm mt-1 text-primary-foreground/80">Refer a young person in 4 steps</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                to="/knowledge-hub"
                className="group block rounded-2xl p-5 transition-all border border-border bg-card hover:border-primary/40"
              >
                <p className="font-display font-semibold">Browse Knowledge Hub</p>
                <p className="text-sm mt-1 text-muted-foreground">All categories and resources</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>

            {/* Areas we serve */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Areas We Serve</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: "Stoke-on-Trent", slug: "stoke-on-trent" },
                  { name: "Newcastle-under-Lyme", slug: "newcastle-under-lyme" },
                  { name: "Stafford", slug: "stafford" },
                  { name: "Cannock", slug: "cannock" },
                  { name: "Lichfield", slug: "lichfield" },
                  { name: "Tamworth", slug: "tamworth" },
                  { name: "Wolverhampton", slug: "wolverhampton" },
                  { name: "Leek", slug: "leek" },
                ].map((a) => (
                  <Link
                    key={a.slug}
                    to={`/alternative-provision/${a.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1 hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    <MapPin className="h-2.5 w-2.5" />{a.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick contact */}
            <div className="rounded-2xl border border-border bg-muted/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Need to speak to us?
              </p>
              <a
                href="tel:01782365365"
                className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors content-link"
              >
                <Phone className="h-4 w-4 text-primary" />
                01782 365365
              </a>
              <a
                href="mailto:info@pathwayacademyzone.co.uk"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors mt-1 content-link"
              >
                info@pathwayacademyzone.co.uk
              </a>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
