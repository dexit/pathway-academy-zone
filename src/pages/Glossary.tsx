import { useState, useMemo } from "react";
import { Search, Info, ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "@/components/Seo";
import { motion, AnimatePresence } from "framer-motion";

const terms = [
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
].sort((a, b) => a.term.localeCompare(b.term));

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return terms.filter((item) => {
      const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
                           item.definition.toLowerCase().includes(search.toLowerCase());
      const matchesLetter = !selectedLetter || item.term.toUpperCase().startsWith(selectedLetter);
      return matchesSearch && matchesLetter;
    });
  }, [search, selectedLetter]);

  const availableLetters = useMemo(() => {
    return new Set(terms.map(t => t.term.charAt(0).toUpperCase()));
  }, []);

  return (
    <Layout>
      <header className="bg-primary pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[{ label: "Knowledge Hub", to: "/knowledge-hub" }, { label: "A-Z Glossary" }]}
              className="text-white/60 mb-8 md:mb-12 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white"
            />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              A-Z Glossary
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Clear, searchable definitions of key terms and concepts used in Alternative Provision.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="space-y-8 mb-12">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search definitions..."
                className="pl-12 h-14 rounded-2xl bg-card border-border/50 shadow-sm focus-visible:ring-primary/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedLetter === null ? "primary" : "outline"}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setSelectedLetter(null)}
              >
                All
              </Button>
              {alphabet.map((letter) => (
                <Button
                  key={letter}
                  variant={selectedLetter === letter ? "primary" : "outline"}
                  size="sm"
                  disabled={!availableLetters.has(letter)}
                  className={`rounded-full w-10 h-10 p-0 ${!availableLetters.has(letter) ? 'opacity-30' : ''}`}
                  onClick={() => setSelectedLetter(letter)}
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTerms.map((item) => (
                <motion.article
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 bg-card rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Info className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{item.term}</h2>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.definition}</p>
                </motion.article>
              ))}
            </AnimatePresence>

            {filteredTerms.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-muted-foreground italic">No terms found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => { setSearch(""); setSelectedLetter(null); }}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
