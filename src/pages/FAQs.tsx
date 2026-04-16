import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { Button } from "@/components/ui/button";

type QA = { q: string; a: string };
type FAQGroup = { title: string; items: QA[] };

const GROUPS: FAQGroup[] = [
  {
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

export default function FAQs() {
  const allItems = GROUPS.flatMap((g) => g.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <Layout>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to the most common questions about Alternative Provision, referrals, and life at Pathway Academy Zone."
        jsonLd={jsonLd}
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <Breadcrumbs
            items={[{ label: "FAQs" }]}
            className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
          />
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Pathway Academy Zone
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
            Quick answers for parents, carers, schools, local authorities, and
            anyone new to Alternative Provision.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-10 md:py-16 max-w-3xl space-y-10">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              {group.title}
            </h2>
            <div className="space-y-3">
              {group.items.map((item) => (
                <details
                  key={item.q}
                  className="group bg-card rounded-xl border border-border overflow-hidden"
                >
                  <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between p-5">
                    {item.q}
                    <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

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
      </section>
    </Layout>
  );
}
