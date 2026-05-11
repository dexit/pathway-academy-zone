export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "cards"; items: { title: string; body: string }[] }
  | { type: "callout"; title: string; body: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "quote"; text: string }

export type DetailContent = {
  title: string
  categoryLabel: string
  categoryHref: string
  summary: string
  meta: string
  blocks: Block[]
  ctaTitle?: string
  ctaBody?: string
  ctaButtons?: { label: string; href: string; variant?: "primary" | "outline" }[]
}

export const DETAIL_CONTENT: Record<string, DetailContent> = {
  "guides/what-is-alternative-provision": {
    title: "What is Alternative Provision?",
    categoryLabel: "Core Guides",
    categoryHref: "/knowledge-hub/core-guides",
    summary:
      "Alternative Provision (AP) is education arranged for pupils who, because of exclusion, illness, or other significant barriers, cannot attend mainstream school. AP provides tailored support through smaller settings, specialist staff, and flexible approaches, helping young people re-engage with education and achieve positive outcomes.",
    meta: "8 min read · For educators, parents & professionals",
    blocks: [
      { type: "h2", text: "Definition" },
      {
        type: "p",
        text: "Alternative Provision refers to education arranged for pupils of compulsory school age who, because of exclusion, illness, or other reasons, would not otherwise receive suitable education. The term encompasses a wide range of provision including:",
      },
      {
        type: "ul",
        items: [
          "Pupil Referral Units (PRUs) maintained by local authorities",
          "Hospital schools and medical provision",
          "Independent AP academies and free schools",
          "Registered AP providers commissioned by schools",
          "Unregistered settings for part-time provision",
        ],
      },
      {
        type: "p",
        text: "AP operates outside of mainstream and special school settings, typically featuring smaller class sizes, higher staff-to-pupil ratios, and more flexible, personalised approaches to education.",
      },
      { type: "h2", text: "Who is Alternative Provision For?" },
      { type: "h3", text: "AP is Suitable For:" },
      {
        type: "ul",
        items: [
          "Young people who have been permanently excluded from mainstream school",
          "Pupils at risk of permanent exclusion due to persistent behaviour difficulties",
          "Learners with medical conditions preventing regular school attendance",
          "Young people with significant mental health needs affecting their education",
          "Those requiring a managed move or fresh start arrangement",
          "Children Looked After needing specialist educational support",
          "Pupils with severe anxiety or school refusal",
          "Young people involved with youth justice services",
        ],
      },
      { type: "h2", text: "Who is Alternative Provision NOT For?" },
      { type: "h3", text: "AP is Generally Not Appropriate For:" },
      {
        type: "ul",
        items: [
          "Pupils who are struggling academically but engaged in mainstream school",
          "Young people with SEN who would benefit from a special school placement",
          "Learners experiencing temporary difficulties that can be addressed in-school",
          "Pupils whose needs can be met through mainstream SEND support",
          "Young people who simply find school boring or challenging",
        ],
      },
      { type: "h2", text: "Benefits of Alternative Provision" },
      {
        type: "cards",
        items: [
          { title: "Smaller Class Sizes", body: "Typically 6-12 pupils per group, allowing more individual attention and support." },
          { title: "Specialist Staff", body: "Staff trained in trauma-informed practice, behaviour support, and therapeutic approaches." },
          { title: "Flexible Curriculum", body: "Personalised learning pathways including academic, vocational, and therapeutic elements." },
          { title: "Fresh Start", body: "New environment without previous history or reputation following the young person." },
          { title: "Holistic Support", body: "Focus on emotional wellbeing alongside academic progress." },
          { title: "Multi-Agency Working", body: "Strong links with health, social care, and other support services." },
        ],
      },
      { type: "h2", text: "Limitations to Consider" },
      {
        type: "cards",
        items: [
          { title: "Reduced Subject Range", body: "AP may not offer the full national curriculum or GCSE options available in mainstream schools." },
          { title: "Social Opportunities", body: "Smaller cohorts may limit social interactions and extra-curricular activities." },
          { title: "Peer Influence", body: "Grouping vulnerable young people together requires careful management." },
          { title: "Reintegration Challenges", body: "Returning to mainstream can be difficult after extended AP placements." },
        ],
      },
      { type: "h2", text: "Process Overview" },
      {
        type: "steps",
        items: [
          { title: "Identification of Need", body: "School identifies that a pupil's needs cannot be met in mainstream setting." },
          { title: "Referral", body: "School or LA makes referral to appropriate AP provider with supporting information." },
          { title: "Assessment", body: "AP provider assesses suitability and develops initial support plan." },
          { title: "Transition", body: "Managed transition with visits, information sharing, and relationship building." },
          { title: "Placement", body: "Young person attends AP with ongoing monitoring and review." },
          { title: "Exit Planning", body: "Planning for next steps: reintegration, further education, or employment." },
        ],
      },
      { type: "h2", text: "Common Mistakes" },
      {
        type: "ul",
        items: [
          "Viewing AP as a punishment rather than a positive intervention",
          "Waiting until crisis point before considering AP referral",
          "Failing to involve parents/carers as partners in the process",
          "Poor information handover between settings",
          "Not planning for post-AP progression from day one",
        ],
      },
      { type: "h2", text: "Real-World Examples" },
      {
        type: "cards",
        items: [
          {
            title: "Case: Year 9 Pupil with School Anxiety",
            body: "A 14-year-old experiencing severe anxiety after bullying refused to attend school for 6 months. After referral to AP, small group sessions in a calm environment helped rebuild confidence. After one term, she successfully reintegrated to a different mainstream school.",
          },
          {
            title: "Case: Year 10 Pupil at Risk of Exclusion",
            body: "A 15-year-old with SEMH needs and multiple fixed-term exclusions was referred to AP. Vocational construction course combined with therapeutic support helped him achieve functional skills qualifications and progress to a college apprenticeship.",
          },
        ],
      },
    ],
    ctaTitle: "Ready to Learn More?",
    ctaBody: "Explore how Alternative Provision works specifically in Staffordshire, or start a referral conversation.",
    ctaButtons: [
      { label: "Start a Referral", href: "/referral", variant: "primary" },
      { label: "View Our Programmes", href: "/programmes", variant: "outline" },
    ],
  },

  "guides/how-ap-works-staffordshire": {
    title: "How Alternative Provision Works in Staffordshire",
    categoryLabel: "Core Guides",
    categoryHref: "/knowledge-hub/core-guides",
    summary:
      "Staffordshire operates a mixed economy of Alternative Provision including local authority maintained settings, academy AP, and commissioned providers. Schools and the local authority work together to ensure suitable education for all young people unable to attend mainstream school.",
    meta: "10 min read · Local focus",
    blocks: [
      { type: "h2", text: "The Staffordshire AP Landscape" },
      {
        type: "p",
        text: "Staffordshire and Stoke-on-Trent have distinct but connected Alternative Provision arrangements. The region includes maintained PRUs, academy AP providers, and a range of registered and commissioned providers offering different specialisms.",
      },
      {
        type: "p",
        text: "The local authority maintains oversight of AP quality and outcomes while schools retain responsibility for pupils they place in Alternative Provision.",
      },
      { type: "h2", text: "Types of Provision Available" },
      {
        type: "cards",
        items: [
          { title: "Local Authority PRUs", body: "Maintained provision typically for permanently excluded pupils or those with medical needs. Offers broad curriculum with aim of reintegration where possible." },
          { title: "Academy Alternative Provision", body: "Independent AP academies offering specialist programmes often with vocational focus. May include therapeutic and SEMH-focused provision." },
          { title: "Commissioned Providers", body: "Schools can commission places from registered providers for specific needs. This includes Pathway Academy Zone and similar specialist settings." },
        ],
      },
      { type: "h2", text: "Referral Process in Staffordshire" },
      {
        type: "steps",
        items: [
          { title: "School Assessment", body: "School identifies need, exhausts in-school interventions, gathers evidence" },
          { title: "Panel Presentation (if LA route)", body: "Cases presented to local authority panel for LA-funded placements" },
          { title: "Direct Referral (school-commissioned)", body: "Schools can directly refer to providers like Pathway Academy Zone" },
          { title: "Assessment Visit", body: "Provider meets young person and family, assesses suitability" },
          { title: "Placement Agreement", body: "Contract agreed between school, provider, and family with clear outcomes" },
        ],
      },
      { type: "h2", text: "Who Can Refer?" },
      {
        type: "ul",
        items: [
          "Mainstream schools (primary and secondary)",
          "Local Authority Inclusion teams",
          "Virtual School for Children Looked After",
          "SEND teams with EHCP involvement",
          "Social workers (in collaboration with schools)",
        ],
      },
      { type: "h2", text: "Key Local Contacts" },
      {
        type: "callout",
        title: "Pathway Academy Zone",
        body: "Address: Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ · Phone: 01782 365365 · Email: info@pathwayacademyzone.co.uk. We welcome referrals from schools across Staffordshire and Stoke-on-Trent.",
      },
    ],
    ctaTitle: "Ready to Make a Referral?",
    ctaBody: "Contact us to discuss a young person's needs or start the referral process.",
    ctaButtons: [
      { label: "Start a Referral", href: "/referral", variant: "primary" },
      { label: "Contact Us", href: "/contact", variant: "outline" },
    ],
  },

  "guides/high-quality-ap-provider": {
    title: "What Makes a High Quality Alternative Provision Provider",
    categoryLabel: "Core Guides",
    categoryHref: "/knowledge-hub/core-guides",
    summary:
      "High quality AP providers demonstrate excellence across safeguarding, staffing, curriculum, environment, and outcomes. Look for robust safeguarding procedures, trauma-informed staff, personalised learning, welcoming environments, and transparent outcome data.",
    meta: "7 min read · For commissioners & schools",
    blocks: [
      { type: "h2", text: "Safeguarding Excellence" },
      {
        type: "cards",
        items: [
          { title: "Trained DSL", body: "Designated Safeguarding Lead available at all times with Level 3 training" },
          { title: "Regular Training", body: "All staff receive annual safeguarding updates plus specialist training" },
          { title: "Clear Policies", body: "Up-to-date safeguarding policy aligned with KCSIE and local procedures" },
          { title: "Multi-Agency Links", body: "Strong relationships with social care, police, CAMHS, and other agencies" },
          { title: "Safe Recruitment", body: "Robust DBS checks and safer recruitment procedures for all staff" },
        ],
      },
      { type: "h2", text: "Staffing Quality" },
      {
        type: "ul",
        items: [
          "Qualified teachers leading academic provision",
          "Staff trained in trauma-informed practice and de-escalation",
          "High staff-to-pupil ratios (typically 1:4 or better)",
          "Access to therapeutic professionals (counsellors, therapists)",
          "Low staff turnover indicating positive culture",
          "Regular supervision and professional development",
        ],
      },
      { type: "h2", text: "Outcomes and Accountability" },
      {
        type: "ul",
        items: [
          "Clear, measurable progress tracking for each learner",
          "Transparent destination data (where leavers go next)",
          "Regular reporting to commissioning schools",
          "Attendance monitoring and improvement strategies",
          "Qualification success rates and academic progress data",
        ],
      },
      { type: "h2", text: "Red Flags to Watch For" },
      {
        type: "ul",
        items: [
          "Reluctance to share outcome data or destination information",
          "High staff turnover or frequent use of agency staff",
          "Unclear safeguarding procedures or untrained staff",
          "One-size-fits-all approach with no personalisation",
          "Poor communication with referring schools and families",
          "Chaotic or unsafe-feeling environment",
        ],
      },
      { type: "h2", text: "Questions to Ask When Visiting" },
      { type: "quote", text: "What training do staff receive in trauma-informed practice?" },
      { type: "quote", text: "What are your destination outcomes for leavers?" },
      { type: "quote", text: "How do you communicate progress to referring schools?" },
      { type: "quote", text: "What qualifications can learners achieve here?" },
      { type: "quote", text: "How do you support reintegration when appropriate?" },
      { type: "quote", text: "Can I speak to a parent/carer of a current learner?" },
    ],
    ctaTitle: "Visit Pathway Academy Zone",
    ctaBody: "See our quality approach in action. We welcome visits from referring schools.",
    ctaButtons: [
      { label: "Arrange a Visit", href: "/contact", variant: "primary" },
      { label: "Our Safeguarding Approach", href: "/safeguarding", variant: "outline" },
    ],
  },

  "guides/when-to-refer": {
    title: "When a Learner Should Be Referred to Alternative Provision",
    categoryLabel: "Core Guides",
    categoryHref: "/knowledge-hub/core-guides",
    summary:
      "AP referral is appropriate when in-school interventions have been exhausted and a young person's needs cannot be met in mainstream. Key triggers include persistent exclusions, severe disengagement, significant SEMH needs, or risk of permanent exclusion. Early intervention often achieves better outcomes than waiting for crisis.",
    meta: "9 min read · For schools & professionals",
    blocks: [
      { type: "h2", text: "Key Referral Triggers" },
      {
        type: "cards",
        items: [
          { title: "Behavioural Indicators", body: "Multiple fixed-term exclusions (typically 3+ in a term); physical aggression towards staff or pupils; persistent disruption despite intervention; at imminent risk of permanent exclusion." },
          { title: "Attendance Indicators", body: "Persistent absence below 50%; school refusal or severe anxiety; emotional-based school avoidance (EBSA); prolonged absence with failed reintegration attempts." },
          { title: "SEMH Indicators", body: "Significant mental health needs affecting learning; trauma responses impacting school functioning; self-harm or crisis presentations; diagnosed conditions requiring specialist support." },
          { title: "Circumstantial Indicators", body: "Child Looked After requiring specialist placement; medical needs preventing mainstream attendance; young offender requiring education during sentence; managed move breakdown requiring fresh start." },
        ],
      },
      { type: "h2", text: "When AP is NOT the Answer" },
      {
        type: "ul",
        items: [
          "In-school interventions haven't been tried or exhausted",
          "Using AP as punishment to \"teach a lesson\"",
          "Needs would be better met by special school placement",
          "Family/pupil completely opposed with no engagement",
          "Short-term difficulty that can be resolved in-school",
        ],
      },
      { type: "h2", text: "The Timing Question" },
      { type: "h3", text: "Early vs Late Referral" },
      {
        type: "p",
        text: "Research consistently shows that early intervention achieves better outcomes. Waiting until permanent exclusion often means:",
      },
      {
        type: "ul",
        items: [
          "More entrenched difficulties to address",
          "Damaged relationships harder to repair",
          "Greater disengagement from learning",
          "Longer period out of education",
          "Reduced time to achieve qualifications",
        ],
      },
      { type: "h2", text: "Before Referral Checklist" },
      {
        type: "ul",
        items: [
          "In-school interventions documented with outcomes",
          "Multi-agency input sought where appropriate",
          "Parents/carers informed and involved in decision",
          "Young person's views heard and considered",
          "Clear rationale for why AP is appropriate",
          "Realistic expectations for what AP can achieve",
        ],
      },
      { type: "h2", text: "Case Examples" },
      {
        type: "cards",
        items: [
          { title: "Appropriate Referral", body: "Year 9 pupil with 4 fixed-term exclusions this term for physical aggression. In-school interventions including behaviour support plan, reduced timetable, and CAMHS referral. Parents engaged and requesting alternative. Referred to AP for therapeutic support and behaviour intervention - achieved significant improvement and later reintegrated." },
          { title: "Inappropriate Referral", body: "Year 8 pupil with low-level disruption. No formal interventions tried, no SEND assessment. School wanting \"rid\" of difficult student. No family engagement. AP declined referral - school advised to implement graduated response first." },
        ],
      },
    ],
    ctaTitle: "Need to Discuss a Potential Referral?",
    ctaBody: "Contact us for an informal conversation about whether AP might be appropriate for a young person.",
    ctaButtons: [
      { label: "Start a Referral", href: "/referral", variant: "primary" },
      { label: "Contact Us", href: "/contact", variant: "outline" },
    ],
  },

  "guides/academic-vs-vocational": {
    title: "Academic Re-Engagement vs Vocational Alternative Provision",
    categoryLabel: "Core Guides",
    categoryHref: "/knowledge-hub/core-guides",
    summary:
      "Academic re-engagement focuses on rebuilding core skills and confidence for potential mainstream return, while vocational pathways prioritise practical, skills-based learning preparing for employment. The right choice depends on learner strengths, goals, and circumstances - many benefit from a blended approach.",
    meta: "6 min read · For everyone",
    blocks: [
      { type: "h2", text: "Side-by-Side Comparison" },
      {
        type: "table",
        headers: ["Aspect", "Academic Re-Engagement", "Vocational Pathway"],
        rows: [
          ["Focus", "Core subjects, GCSEs, reintegration", "Practical skills, functional skills, employment"],
          ["Learning Style", "Classroom-based, modified curriculum", "Hands-on, project-based, industry-linked"],
          ["Qualifications", "GCSEs, Entry Level, Functional Skills", "BTECs, NVQs, Functional Skills, Industry certs"],
          ["Typical Duration", "6-12 months (reintegration focus)", "1-2 years (completion focus)"],
          ["Best For", "Academically able but disengaged learners", "Practical learners, those seeking employment"],
          ["Progression", "Mainstream school, sixth form, college", "Apprenticeship, FE college, employment"],
        ],
      },
      { type: "h2", text: "Academic Re-Engagement in Detail" },
      { type: "h3", text: "Key Features:" },
      {
        type: "ul",
        items: [
          "Modified national curriculum with core subjects",
          "Smaller class sizes (typically 6-8 pupils)",
          "Intensive literacy and numeracy support",
          "Focus on rebuilding confidence in learning",
          "Active reintegration planning throughout",
        ],
      },
      { type: "h3", text: "Best suited for learners who:" },
      {
        type: "ul",
        items: [
          "Have academic potential but lost confidence",
          "Want to return to mainstream education",
          "Are working towards GCSEs",
          "Need a smaller, calmer environment temporarily",
        ],
      },
      { type: "h2", text: "Vocational Pathway in Detail" },
      { type: "h3", text: "Key Features:" },
      {
        type: "ul",
        items: [
          "Industry-relevant practical skills training",
          "Work experience and employer links",
          "Embedded functional skills (English, Maths)",
          "Project-based, hands-on learning approach",
          "Clear progression to apprenticeship/employment",
        ],
      },
      { type: "h3", text: "Common vocational areas:" },
      {
        type: "ul",
        items: ["Construction trades", "Motor vehicle", "Catering & hospitality", "Hair & beauty", "Creative industries", "Animal care"],
      },
      { type: "h2", text: "How to Choose the Right Pathway" },
      {
        type: "cards",
        items: [
          { title: "Consider Academic Re-Engagement if:", body: "The young person was achieving academically before disengagement; there's a realistic goal of mainstream return; GCSE qualifications are important for their aspirations; the difficulties are primarily behavioural/emotional rather than learning-related." },
          { title: "Consider Vocational Pathway if:", body: "The young person learns best through practical activity; they have clear career interests in skilled trades; traditional academic learning hasn't worked; employment or apprenticeship is the goal." },
          { title: "Consider a Blended Approach if:", body: "The young person would benefit from both academic and practical learning; functional skills are needed alongside vocational training; progression options are still being explored." },
        ],
      },
      { type: "h2", text: "Real-World Examples" },
      {
        type: "cards",
        items: [
          { title: "Academic Re-Engagement Success", body: "Year 10 pupil with anxiety-related school refusal. Bright academically but unable to cope with large mainstream school. After 8 months in small-group AP academic programme, rebuilt confidence and achieved 5 GCSEs before successful reintegration to smaller mainstream setting." },
          { title: "Vocational Pathway Success", body: "Year 11 pupil who had completely disengaged from school-based learning. Discovered passion for construction through AP vocational programme. Achieved Level 1 Diploma in Construction and Functional Skills, then progressed to bricklaying apprenticeship." },
        ],
      },
    ],
    ctaTitle: "Explore Our Programmes",
    ctaBody: "Pathway Academy Zone offers both academic and vocational pathways tailored to individual needs.",
    ctaButtons: [
      { label: "View Our Programmes", href: "/programmes", variant: "primary" },
      { label: "Start a Referral", href: "/referral", variant: "outline" },
    ],
  },

  "comparisons/ap-vs-mainstream": {
    title: "Alternative Provision vs Mainstream Schooling",
    categoryLabel: "Comparisons",
    categoryHref: "/knowledge-hub/comparisons",
    summary:
      "Alternative Provision offers smaller settings, higher staff ratios, and flexible curricula for learners who cannot thrive in mainstream. Mainstream schools serve the majority but may not meet complex needs requiring specialist support.",
    meta: "5 min read · For schools & families",
    blocks: [
      { type: "h2", text: "Comparison Table" },
      {
        type: "table",
        headers: ["Aspect", "Alternative Provision", "Mainstream School"],
        rows: [
          ["Class Size", "6-12 pupils", "25-30 pupils"],
          ["Staff Ratio", "1:4 or better", "1:15-30"],
          ["Curriculum", "Flexible, personalised", "National curriculum"],
          ["Environment", "Calm, therapeutic", "Busy, structured"],
          ["Pastoral Support", "Intensive, daily", "Available but shared"],
          ["Timetable", "Adapted to individual needs", "Fixed school timetable"],
          ["SEMH Focus", "Central to all provision", "One of many competing priorities"],
          ["Referral Route", "Schools, LA, social workers", "Open admission by catchment"],
        ],
      },
      { type: "h2", text: "When to Choose AP" },
      {
        type: "p",
        text: "AP is appropriate when mainstream interventions have been exhausted and the young person cannot access learning in a large school environment due to SEMH needs, behaviour difficulties, or other barriers.",
      },
      { type: "h2", text: "When Mainstream Remains the Right Choice" },
      {
        type: "ul",
        items: [
          "The young person is engaged and making progress with in-school support",
          "Difficulties are temporary and can be addressed through SEND provision",
          "The pupil has strong peer relationships that would be disrupted by a move",
          "In-school interventions have not yet been fully implemented or given time to work",
        ],
      },
      { type: "h2", text: "The Grey Area: Dual Registration" },
      {
        type: "p",
        text: "Many young people benefit from a hybrid arrangement — attending AP part-time while remaining on roll at their home school. This dual-registration approach allows young people to maintain links with mainstream while receiving the specialist support they need. At Pathway Academy Zone, we work closely with home schools to manage dual placements effectively.",
      },
      { type: "h2", text: "What the Evidence Says" },
      {
        type: "cards",
        items: [
          { title: "Ofsted Research (2016)", body: "Found that the most effective AP providers create structured, calm environments with high expectations and strong relationships — more akin to the ethos of a small school than a containment unit." },
          { title: "DfE AP Review (2018)", body: "Recommended that AP should be used as early intervention rather than a last resort, with clear outcome targets agreed at the point of referral." },
          { title: "Pathway Academy Zone Data", body: "94% of our learners show improved attendance from a baseline average of under 30%, and 87% move into positive destinations at the end of placement." },
        ],
      },
    ],
    ctaTitle: "Considering AP for a Young Person?",
    ctaBody: "Our team can advise on whether Alternative Provision is the right step and guide you through the referral process.",
    ctaButtons: [
      { label: "Start a Referral", href: "/referral", variant: "primary" },
      { label: "Contact Our Team", href: "/contact", variant: "outline" },
    ],
  },

  "comparisons/group-vs-one-to-one": {
    title: "Group Provision vs One-to-One Provision",
    categoryLabel: "Comparisons",
    categoryHref: "/knowledge-hub/comparisons",
    summary:
      "Group provision offers peer interaction and social skills development in small groups of 4-8 learners. One-to-one provides intensive individual support for those who cannot function in any group setting initially.",
    meta: "5 min read · For schools & families",
    blocks: [
      { type: "h2", text: "Side-by-Side Comparison" },
      {
        type: "table",
        headers: ["Aspect", "Group Provision (4–8 pupils)", "One-to-One"],
        rows: [
          ["Social Interaction", "Peer learning, group dynamics, social skills development", "Adult relationship only — no peer interaction"],
          ["Cost per Pupil", "More cost-effective, shared staff resource", "Higher — dedicated staff member per session"],
          ["Best For", "Most AP learners once past initial crisis", "Severe anxiety, initial stabilisation, post-exclusion assessment"],
          ["Skill Transfer", "Stronger — practised in social context", "Limited — skills must be transferred to group later"],
          ["Relationship", "Multiple trusted adults", "Single trusted adult — powerful but narrow"],
          ["Progression", "Ready for college / mainstream groups", "Requires planned transition to group settings"],
        ],
      },
      { type: "h2", text: "When to Choose Group Provision" },
      {
        type: "ul",
        items: [
          "The young person has sufficient emotional regulation to manage peer interaction",
          "Social skills development is part of the intervention goal",
          "The referral is for longer-term academic or vocational progression",
          "The young person has attended group settings before, even if unsuccessfully",
          "Budget constraints require a cost-effective placement",
        ],
      },
      { type: "h2", text: "When to Choose One-to-One" },
      {
        type: "ul",
        items: [
          "The young person is in acute crisis or has just been permanently excluded",
          "Severe anxiety or phobia makes group attendance impossible initially",
          "The young person presents significant risk in group settings",
          "Initial assessment and relationship-building are the primary goals",
          "The placement is intended as a short-term bridge to group provision",
        ],
      },
      { type: "h2", text: "The Transition Pathway" },
      {
        type: "p",
        text: "Best practice is to begin with whatever the young person can tolerate — even one-to-one in a quiet space — and gradually extend to small group settings as confidence grows. At Pathway Academy Zone, we use an individual integration plan to map this progression, starting with shared sessions with one familiar peer before expanding to our small groups.",
      },
      { type: "h2", text: "Decision Guide" },
      {
        type: "cards",
        items: [
          { title: "Start with Group Where Possible", body: "Social interaction is itself a therapeutic outcome. Even anxious learners often adapt faster in carefully managed small groups than in isolation." },
          { title: "Use 1:1 as a Diagnostic Tool", body: "One-to-one sessions during the assessment phase help understand the young person's baseline and inform which group approach will work best." },
          { title: "Plan Group Entry from Day One", body: "If 1:1 is the starting point, agree at the outset what milestones will indicate readiness for group — and review regularly." },
        ],
      },
    ],
    ctaTitle: "Discuss the Right Approach",
    ctaBody: "Our team can advise on whether group or one-to-one provision is the right starting point for a young person.",
    ctaButtons: [
      { label: "Contact Our Team", href: "/contact", variant: "primary" },
      { label: "View Our Programmes", href: "/programmes", variant: "outline" },
    ],
  },

  "comparisons/short-vs-long-term": {
    title: "Short-Term vs Long-Term Alternative Provision Placements",
    categoryLabel: "Comparisons",
    categoryHref: "/knowledge-hub/comparisons",
    summary:
      "Short-term placements (6-12 weeks) focus on intervention and reintegration. Long-term placements (1-2 years) provide sustained support for complex needs through to qualifications and transition.",
    meta: "5 min read · For schools & families",
    blocks: [
      { type: "h2", text: "Comparison Table" },
      {
        type: "table",
        headers: ["Aspect", "Short-Term (6–12 weeks)", "Long-Term (1–2 years)"],
        rows: [
          ["Primary Goal", "Assessment, stabilisation, reintegration", "Qualifications, sustained SEMH progress"],
          ["Best For", "Crisis intervention, managed moves, fixed exclusions", "Complex SEMH, permanent exclusion, CLA"],
          ["Curriculum Focus", "Core assessment + regulation skills", "Full academic and/or vocational programme"],
          ["Planned Outcome", "Return to mainstream or alternative school", "Post-16 destination (college, apprenticeship)"],
          ["Review Frequency", "Every 2–4 weeks", "Half-termly formal reviews"],
          ["Family Involvement", "Regular liaison during transition", "Ongoing partnership throughout"],
        ],
      },
      { type: "h2", text: "Short-Term Placements: When They Work Best" },
      {
        type: "cards",
        items: [
          { title: "Crisis Stabilisation", body: "Following a permanent exclusion or safeguarding incident, a short-term placement provides a structured bridge while a longer-term plan is developed." },
          { title: "Managed Move Support", body: "When a young person is moving between schools, a brief AP placement allows emotions to settle and a transition plan to be agreed with the receiving school." },
          { title: "Assessment Placement", body: "For learners whose needs are unclear, a short-term placement provides a safe environment to conduct thorough assessment before committing to a longer programme." },
        ],
      },
      { type: "h2", text: "Long-Term Placements: When They Work Best" },
      {
        type: "cards",
        items: [
          { title: "Complex SEMH Needs", body: "Young people with significant trauma histories, attachment disorders, or diagnosed mental health conditions need sustained therapeutic relationships that only long-term placements can provide." },
          { title: "Post-Permanent Exclusion", body: "After permanent exclusion, particularly for older secondary pupils, a long-term placement through to post-16 provides the continuity needed to achieve qualifications and reach a positive destination." },
          { title: "Children Looked After", body: "CLA often have disrupted educational histories and benefit from the stability of a long-term placement with consistent key workers and predictable routines." },
        ],
      },
      { type: "h2", text: "Planning for the Right Duration" },
      {
        type: "p",
        text: "The length of a placement should be agreed at the point of referral based on the young person's presenting needs, their age and year group, and realistic outcome targets. Pathway Academy Zone reviews placement duration at every formal review, extending or concluding based on progress against agreed targets — not on fixed administrative timescales.",
      },
      { type: "h2", text: "The Risk of Premature Exit" },
      {
        type: "p",
        text: "One of the most common mistakes in AP commissioning is ending a placement too early — when a young person appears to have stabilised but before sustainable progress has been embedded. Research consistently shows that premature exit leads to re-referral, often at a higher level of need. We always include exit criteria in placement plans agreed at the start.",
      },
    ],
    ctaTitle: "Discuss Placement Length",
    ctaBody: "Every young person's needs are different. Contact us for an initial conversation to explore the right duration and programme blend.",
    ctaButtons: [
      { label: "Start a Referral", href: "/referral", variant: "primary" },
      { label: "Contact Our Team", href: "/contact", variant: "outline" },
    ],
  },

  "comparisons/onsite-vs-offsite": {
    title: "On-Site vs Off-Site Alternative Provision",
    categoryLabel: "Comparisons",
    categoryHref: "/knowledge-hub/comparisons",
    summary:
      "On-site AP keeps learners within school grounds in dedicated units. Off-site provision offers a complete fresh start in a separate location with specialist staff and environment.",
    meta: "5 min read · For schools & families",
    blocks: [
      { type: "h2", text: "Comparison Table" },
      {
        type: "table",
        headers: ["Aspect", "On-Site (Internal Unit)", "Off-Site (Registered Provider)"],
        rows: [
          ["Environment", "School-based internal unit or nurture room", "Separate, purpose-designed specialist setting"],
          ["Fresh Start", "Limited — same site, same reputation", "Complete change of scene and peer group"],
          ["Peer Group", "Risk of same negative peer associations", "New peer group of similar-aged learners"],
          ["Reintegration", "Easier — already on site", "Requires structured transition planning"],
          ["Specialism", "General pastoral support", "Specialist trauma-informed staff and resources"],
          ["Staffing", "School staff, may lack specialist training", "Dedicated AP specialists, therapeutic professionals"],
          ["Qualifications", "Limited by school timetable", "Full vocational and academic programme options"],
          ["Accountability", "School SENCO / pastoral lead", "Ofsted-registered provider with outcome reporting"],
        ],
      },
      { type: "h2", text: "When On-Site AP Makes Sense" },
      {
        type: "ul",
        items: [
          "The young person has mild-to-moderate support needs that a nurture or inclusion unit can address",
          "Reintegration to mainstream classes is the short-term target",
          "The school has strong in-house pastoral and SEMH expertise",
          "The young person has protective relationships on site that should be maintained",
          "The presenting difficulty is primarily behavioural rather than complex SEMH",
        ],
      },
      { type: "h2", text: "When Off-Site AP Is Needed" },
      {
        type: "ul",
        items: [
          "The young person has been permanently excluded — by law, education must be arranged from day 6",
          "On-site provision has been tried and failed",
          "The young person's peer associations at school are a significant risk factor",
          "Complex SEMH needs require therapeutic expertise not available in school",
          "The school environment itself is a trigger for anxiety or dysregulation",
          "The young person needs vocational provision not available on site",
        ],
      },
      { type: "h2", text: "The Off-Site Advantage: Pathway Academy Zone" },
      {
        type: "p",
        text: "Pathway Academy Zone's Burslem centre provides a purpose-designed off-site environment specifically built for Alternative Provision. Small classrooms, breakout spaces, dedicated SEMH rooms, and vocational areas are all designed around the needs of young people who couldn't thrive in a mainstream school building. The physical environment matters — and a fresh start in a new location is often the single most powerful catalyst for change.",
      },
      { type: "h2", text: "Safeguarding in Off-Site Provision" },
      {
        type: "p",
        text: "Schools retain safeguarding responsibility for pupils placed in off-site AP. This means choosing a registered provider with robust safeguarding procedures, a trained DSL on site, and clear information-sharing protocols. Pathway Academy Zone holds weekly safeguarding meetings and provides schools with regular safeguarding updates as part of every placement.",
      },
    ],
    ctaTitle: "Visit Our Off-Site Centre",
    ctaBody: "We welcome visits from schools and commissioners. See our Burslem centre and meet the team.",
    ctaButtons: [
      { label: "Arrange a Visit", href: "/contact", variant: "primary" },
      { label: "Our Safeguarding Approach", href: "/safeguarding", variant: "outline" },
    ],
  },

  "best-practice/semh-pathways": {
    title: "Best Alternative Provision Pathways for SEMH Learners",
    categoryLabel: "Best Practice",
    categoryHref: "/knowledge-hub/best-practice",
    summary:
      "SEMH learners thrive in AP settings with trauma-informed approaches, therapeutic support, consistent relationships, predictable routines, and graduated re-engagement strategies.",
    meta: "6 min read · For schools & professionals",
    blocks: [
      { type: "h2", text: "Understanding SEMH in the AP Context" },
      {
        type: "p",
        text: "Social, Emotional and Mental Health (SEMH) difficulties are the most common presenting need for young people entering Alternative Provision. Many have experienced adverse childhood experiences (ACEs), trauma, bereavement, family instability, or cumulative stress that has made it impossible to engage in mainstream education. AP settings that understand and respond to this are consistently more effective than those that treat SEMH as a behaviour management problem.",
      },
      { type: "h2", text: "The Five Pillars of Effective SEMH Provision" },
      {
        type: "cards",
        items: [
          { title: "Trauma-Informed Whole-Setting Approach", body: "Every adult in the building understands trauma responses. Behaviour that looks like defiance is understood as a communication of need. The environment is predictable, safe, and free from unnecessary stress." },
          { title: "Consistent Key Worker Relationships", body: "Each young person has one named key adult who knows them well, advocates for them, and provides a secure base from which learning can happen. Relationship consistency is non-negotiable." },
          { title: "Therapeutic Interventions on Timetable", body: "Counselling, art therapy, group mindfulness, and regulated emotional support are built into the school day — not offered as an afterthought or only in crisis." },
          { title: "Sensory-Aware Environments", body: "Lighting, noise levels, colour, and space are managed to reduce sensory overwhelm. Quiet breakout spaces and co-regulation areas are available throughout the day." },
          { title: "Restorative Rather Than Punitive Responses", body: "When things go wrong, the response focuses on understanding, repair, and relationship — not punishment. Exclusion from AP is an absolute last resort." },
        ],
      },
      { type: "h2", text: "The Graduated Approach to Re-Engagement" },
      {
        type: "steps",
        items: [
          { title: "Stabilisation (weeks 1–4)", body: "Focus entirely on safety, relationship-building, and reducing anxiety. No academic pressure. Short sessions, familiar adults, predictable routine." },
          { title: "Tentative Engagement (weeks 4–8)", body: "Introduce structured activity alongside the young person's interests. Gentle academic reintroduction through practical and creative projects." },
          { title: "Sustained Learning (weeks 8+)", body: "Regular academic sessions with clear targets. SEMH support continues alongside — not instead of — curriculum delivery." },
          { title: "Progression Planning", body: "From mid-placement, begin conversations about next steps. What does the young person want? What qualifications do they need? Who needs to be involved?" },
        ],
      },
      { type: "h2", text: "Measurable Outcomes at Pathway Academy Zone" },
      {
        type: "stats",
        items: [
          { value: "94%", label: "Improved attendance from baseline" },
          { value: "78%", label: "Improved emotional regulation" },
          { value: "65%", label: "Reduced crisis incidents" },
          { value: "82%", label: "Positive destination outcomes for SEMH cohort" },
        ],
      },
      { type: "h2", text: "What Schools Should Look for in an SEMH-Specialist Provider" },
      {
        type: "ul",
        items: [
          "Whole-staff trauma-informed training (not just the SENCO)",
          "Named DSL on site every day the young person attends",
          "Clear escalation protocol if mental health deteriorates",
          "Access to CAMHS and external therapeutic professionals",
          "Regular, structured family liaison — not just contact when things go wrong",
          "Transparent outcome data for SEMH learners specifically",
        ],
      },
    ],
    ctaTitle: "Specialist SEMH Support at Pathway Academy Zone",
    ctaBody: "Our SEMH Support programme is integrated into every placement. Contact us to discuss a young person's needs.",
    ctaButtons: [
      { label: "Start a Referral", href: "/referral", variant: "primary" },
      { label: "Our SEMH Programme", href: "/programmes#semh-support", variant: "outline" },
    ],
  },

  "best-practice/attendance-strategies": {
    title: "Best Attendance Improvement Strategies in Alternative Provision",
    categoryLabel: "Best Practice",
    categoryHref: "/knowledge-hub/best-practice",
    summary:
      "Improving attendance in AP requires understanding barriers, building relationships, flexible approaches, family engagement, and celebrating small wins rather than punitive measures.",
    meta: "6 min read · For schools & professionals",
    blocks: [
      { type: "h2", text: "Why AP Attendance Is Different" },
      {
        type: "p",
        text: "Many young people referred to Alternative Provision have experienced significant school anxiety, emotionally-based school avoidance (EBSA), or have learned that school is an unsafe or unwelcoming place. Traditional attendance strategies — letters home, penalty notices, mandatory return meetings — often make things worse. Effective AP attendance strategies start from a completely different premise: safety and relationship first, attendance as a natural outcome.",
      },
      { type: "h2", text: "Proven Strategies" },
      {
        type: "cards",
        items: [
          { title: "Daily Welfare Calls", body: "On any day a young person doesn't attend, a named key adult calls — not to challenge the absence, but to check in and maintain the relationship. The call communicates that the young person matters, not that they're in trouble." },
          { title: "Transport Support", body: "Practical barriers like bus routes, journey anxiety, or family transport difficulties prevent attendance more often than motivation. Providing or arranging transport removes the obstacle entirely." },
          { title: "Flexible Start Times", body: "During re-engagement, insisting on a 9am start is often counterproductive. Beginning with a time the young person can actually manage — even 10:30am — and building from there is more effective than demanding full attendance from day one." },
          { title: "Short-Session Starts", body: "Beginning with two or three short sessions per week, with the young person involved in planning the timetable, reduces overwhelm and builds early success experiences that motivate continued attendance." },
          { title: "Attendance Celebration", body: "Every improvement is celebrated. Arriving on Tuesday when you didn't come Monday is progress. Staff verbally acknowledge effort, not just outcome. Reward systems focus on personal best rather than comparison." },
          { title: "Family Partnership", body: "When families understand the plan, trust the setting, and feel genuinely involved in their child's progress, attendance improves. Weekly parent liaison calls and open-door policies build the family confidence that translates into morning routines at home." },
        ],
      },
      { type: "h2", text: "Understanding the Barriers" },
      {
        type: "table",
        headers: ["Barrier Type", "Common Presentation", "Effective Response"],
        rows: [
          ["Anxiety / EBSA", "Physical symptoms on school days, panic at door", "Graded exposure, in-community sessions initially, anxiety-informed staff"],
          ["Practical", "No transport, caring responsibilities, housing instability", "Transport provision, flexible hours, social care coordination"],
          ["Relational", "Fear of specific adults or peers", "Key adult choice, careful group composition, slow introduction"],
          ["Historical", "Learned that 'school is unsafe'", "Consistent warmth, no punitive responses, long relationship-building window"],
          ["Motivational", "Sees no point in education", "Interest-based entry points, vocational hooks, early success experiences"],
        ],
      },
      { type: "h2", text: "What the Data Shows" },
      {
        type: "stats",
        items: [
          { value: "94%", label: "Of our learners show improved attendance from baseline" },
          { value: "28%", label: "Average baseline attendance at point of referral" },
          { value: "85%+", label: "Average attendance by end of placement" },
          { value: "48hrs", label: "Maximum response time for welfare calls to absent learners" },
        ],
      },
      { type: "h2", text: "What Schools Can Do Before Referral" },
      {
        type: "ul",
        items: [
          "Conduct an honest conversation with the young person about what makes school feel unsafe",
          "Involve an educational psychologist for assessment of EBSA if not already done",
          "Consider whether the peer group, a specific teacher, or the building itself is the trigger",
          "Explore reduced timetable or alternative location within school before seeking AP",
          "Share a comprehensive attendance history — including what has and hasn't worked — with the AP provider at referral",
        ],
      },
    ],
    ctaTitle: "Discuss an Attendance Challenge",
    ctaBody: "Our team has extensive experience supporting young people with complex attendance barriers. Contact us for an informal conversation.",
    ctaButtons: [
      { label: "Contact Our Team", href: "/contact", variant: "primary" },
      { label: "Make a Referral", href: "/referral", variant: "outline" },
    ],
  },

  "best-practice/vocational-routes": {
    title: "Best Vocational Routes for Disengaged Learners",
    categoryLabel: "Best Practice",
    categoryHref: "/knowledge-hub/best-practice",
    summary:
      "Vocational pathways succeed when they offer genuine industry skills, work experience, embedded functional skills, and clear progression to apprenticeships or employment.",
    meta: "6 min read · For schools & professionals",
    blocks: [
      { type: "h2", text: "Why Vocational Routes Work for Disengaged Learners" },
      {
        type: "p",
        text: "Many young people who have disengaged from education are not disengaged from learning — they have disengaged from a model of learning that doesn't work for them. Vocational provision offers an alternative entry point: practical, purposeful activity that produces visible, tangible results. A young person who has failed English in four mainstream schools may build a cabinet, wire a plug, or prepare a dish — and discover for the first time that they are capable, skilled, and valued.",
      },
      { type: "h2", text: "Most Effective Vocational Areas for AP Learners" },
      {
        type: "cards",
        items: [
          { title: "Construction Trades", body: "Bricklaying, carpentry, plastering, painting and decorating. High demand, clear apprenticeship routes, and an immediately visible outcome that builds pride and self-efficacy." },
          { title: "Motor Vehicle", body: "Mechanics, body repair, and valeting. Particularly effective for young men who have had poor school experiences — practical, hands-on, and strongly linked to employer partnerships." },
          { title: "Catering & Hospitality", body: "Food preparation, front of house, barista skills. Sessions often include a social element (preparing food for others) that naturally develops communication and teamwork." },
          { title: "Hair & Beauty", body: "Hairdressing, barbering, and beauty therapy. Qualifications are highly valued by employers and colleges, and sessions build confidence through appearance and self-care." },
          { title: "Animal Care", body: "Animal care, grooming, and kennel management. Effective for learners with attachment difficulties — animal relationships provide a non-threatening practice ground for trust." },
          { title: "Creative Industries", body: "Photography, graphic design, music production, and digital arts. Particularly effective for learners who struggle with written expression but have strong creative abilities." },
        ],
      },
      { type: "h2", text: "The Functional Skills Bridge" },
      {
        type: "p",
        text: "The most effective vocational programmes in AP don't treat English and maths as separate subjects — they embed them in the vocational context. Writing a materials order, calculating measurements for a build, reading a recipe, presenting a business plan for a pop-up cafe: these activities develop genuine literacy and numeracy in a context that feels meaningful to the learner. Functional Skills qualifications can then be achieved alongside vocational certificates, providing a qualification profile that's genuinely useful for progression.",
      },
      { type: "h2", text: "Success Factors for Vocational AP" },
      {
        type: "ul",
        items: [
          "Industry-standard equipment and facilities — not recycled or substandard resources",
          "Instructors with real industry experience, not just teaching qualifications",
          "Real work experience placements with local employers",
          "Employer partnerships that can offer apprenticeship or employment opportunities",
          "Clear progression routes communicated to young people from the start",
          "Qualifications that employers and colleges actually recognise",
          "Integration of SEMH support alongside vocational delivery",
        ],
      },
      { type: "h2", text: "Progression Routes After Vocational AP" },
      {
        type: "steps",
        items: [
          { title: "Level 1 Certificate", body: "Achievable within a placement, provides evidence of capability and opens doors to college Entry Level and Level 2 programmes." },
          { title: "Level 2 Qualification", body: "BTEC, NVQ or equivalent — typically requires 12–18 months in AP but provides a strong college or direct employment application profile." },
          { title: "Apprenticeship", body: "Work-based learning from age 16, combining on-the-job training with off-the-job study. Pathway Academy Zone maintains employer partnerships to support transitions." },
          { title: "FE College", body: "Vocational courses at college provide a natural continuation of AP vocational pathways with a wider peer group and college-level facilities." },
        ],
      },
      { type: "h2", text: "At Pathway Academy Zone" },
      {
        type: "p",
        text: "Our Vocational Learning programme is delivered from our Burslem centre with access to local employer partnerships built over several years. Young people gain industry experience through real projects and work placements arranged in collaboration with employers across Staffordshire. 18% of our leavers progress directly to apprenticeships — one of the strongest apprenticeship outcomes in the Staffordshire AP sector.",
      },
    ],
    ctaTitle: "Explore Our Vocational Programme",
    ctaBody: "Our Vocational Learning programme is tailored to each young person. Contact us to discuss what's right for a specific referral.",
    ctaButtons: [
      { label: "View Our Programmes", href: "/programmes#vocational-learning", variant: "primary" },
      { label: "Start a Referral", href: "/referral", variant: "outline" },
    ],
  },

  "best-practice/post-16-progression": {
    title: "Best Post-16 Progression Pathways After Alternative Provision",
    categoryLabel: "Best Practice",
    categoryHref: "/knowledge-hub/best-practice",
    summary:
      "Successful post-16 transitions require early planning, college taster sessions, NEET prevention support, and ongoing contact during the first year of new placement.",
    meta: "6 min read · For schools & professionals",
    blocks: [
      { type: "h2", text: "Why Post-16 Transition Is Critical in AP" },
      {
        type: "p",
        text: "The post-16 transition is the highest-risk moment in any AP placement. Young people who have made significant progress during AP can quickly become NEET (Not in Education, Employment or Training) if the transition to the next stage is poorly planned, rushed, or unsupported. Research shows that AP leavers who experience a warm, well-planned transition are significantly less likely to become NEET in the year following their placement.",
      },
      { type: "h2", text: "Post-16 Progression Options" },
      {
        type: "cards",
        items: [
          { title: "Further Education College", body: "The most common destination for AP leavers. FE colleges offer academic A-levels and BTECs, vocational courses, Foundation Learning (Entry Level to Level 1), and Study Programmes for SEND learners. The key is matching the qualification level to what the young person has achieved in AP." },
          { title: "Apprenticeships", body: "Earn-while-you-learn work-based programmes from age 16 — available at Levels 2, 3, 4 and above. Increasingly accessible to young people with SEMH histories where employers are supported to be appropriately flexible." },
          { title: "Traineeships", body: "Pre-apprenticeship programmes providing work experience, English and maths, and employability skills for young people not yet ready for full apprenticeship. A strong bridge for AP leavers who are work-ready but lack formal qualifications." },
          { title: "Supported Internships", body: "Structured work-based programmes for young people with EHCPs aged 16–24. Combines on-site employment support with skills development — ideal for AP leavers with additional needs." },
          { title: "Supported Employment", body: "For learners with significant additional needs requiring an employment support worker alongside them in the workplace. Pathway Academy Zone can connect families with the local supported employment service." },
          { title: "Continuation in Specialist Provision", body: "Some young people benefit from continued specialist AP-style provision at 16–18 before a college or employment transition. This is particularly true for those with complex SEMH needs or EHCPs." },
        ],
      },
      { type: "h2", text: "The Timeline: When to Start Planning" },
      {
        type: "table",
        headers: ["When", "Action"],
        rows: [
          ["Year 10 (or placement start if later)", "First destinations conversation — what does the young person want to do?"],
          ["Autumn term Year 11", "Research specific colleges and employers. Begin college open day visits."],
          ["Spring term Year 11", "Submit college applications. Arrange work experience if not yet done."],
          ["Summer term Year 11", "Confirm destination. Arrange transition visits. Brief new setting on SEMH needs."],
          ["Post-placement (first 6 months)", "Maintain contact. Welfare check calls. Escalation if NEET risk identified."],
        ],
      },
      { type: "h2", text: "Key Success Factors" },
      {
        type: "ul",
        items: [
          "Begin transition planning from the very first formal review — not in the final term",
          "Multiple college visits and taster sessions to reduce anxiety about the new environment",
          "Warm handover to the new setting — not just a written report, but a joint meeting",
          "Follow-up welfare contact for at least 6 months post-placement",
          "Involve families in every stage of transition planning",
          "Ensure EHCP is reviewed and reflects post-16 needs before the young person leaves AP",
          "Connect the young person with their local CEIAG (Careers Education, Information, Advice and Guidance) service",
        ],
      },
      { type: "h2", text: "NEET Prevention: The Warning Signs" },
      {
        type: "ul",
        items: [
          "Young person expressing ambivalence about their college place in the weeks before starting",
          "Family disengagement from the transition process",
          "No clear post-16 plan agreed by Spring of Year 11",
          "Mental health deterioration in the final term of placement",
          "College place not secured by end of May",
        ],
      },
      { type: "h2", text: "Pathway Academy Zone's Approach to Post-16" },
      {
        type: "p",
        text: "At Pathway Academy Zone, destinations planning begins at the first formal review and is embedded in every subsequent review conversation. Our Employability Skills programme in Years 10 and 11 includes structured careers guidance, CV preparation, mock interviews, and employer introductions. We maintain relationships with FE colleges and apprenticeship providers across Staffordshire, and we provide a warm handover as standard — not an optional extra.",
      },
    ],
    ctaTitle: "Post-16 Planning for a Young Person in AP",
    ctaBody: "Our team can support destinations planning from referral through to transition. Contact us to discuss a specific young person.",
    ctaButtons: [
      { label: "Explore Our Employability Programme", href: "/programmes#employability-skills", variant: "primary" },
      { label: "Start a Referral", href: "/referral", variant: "outline" },
    ],
  },
}
