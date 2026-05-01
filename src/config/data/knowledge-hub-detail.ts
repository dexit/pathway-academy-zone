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
        ],
      },
      { type: "h2", text: "When to Choose AP" },
      {
        type: "p",
        text: "AP is appropriate when mainstream interventions have been exhausted and the young person cannot access learning in a large school environment due to SEMH needs, behaviour difficulties, or other barriers.",
      },
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
      { type: "h2", text: "Comparison" },
      {
        type: "table",
        headers: ["Aspect", "Group Provision", "One-to-One"],
        rows: [
          ["Social Interaction", "Peer learning, group dynamics", "Adult relationship only"],
          ["Cost", "More cost-effective", "Higher cost per pupil"],
          ["Best For", "Most AP learners", "Severe anxiety, initial stabilisation"],
        ],
      },
      { type: "h3", text: "Decision Guide" },
      {
        type: "p",
        text: "Start with group provision where possible. Use 1:1 for initial assessment, crisis stabilisation, or when group settings trigger severe anxiety. Plan transition to group when ready.",
      },
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
      { type: "h2", text: "Comparison" },
      {
        type: "table",
        headers: ["Aspect", "Short-Term (6-12 weeks)", "Long-Term (1-2 years)"],
        rows: [
          ["Goal", "Assessment, stabilisation, reintegration", "Qualifications, sustained progress"],
          ["Best For", "Crisis intervention, managed moves", "Complex SEMH, permanent exclusion"],
          ["Outcome", "Return to mainstream", "Post-16 transition"],
        ],
      },
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
      { type: "h2", text: "Comparison" },
      {
        type: "table",
        headers: ["Aspect", "On-Site", "Off-Site"],
        rows: [
          ["Environment", "School-based internal unit", "Separate specialist setting"],
          ["Fresh Start", "Limited - same site", "Complete change of scene"],
          ["Reintegration", "Easier - already on site", "Requires planning"],
          ["Specialism", "General support", "Specialist staff/resources"],
        ],
      },
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
      { type: "h2", text: "Key Strategies" },
      {
        type: "ul",
        items: [
          "Trauma-informed whole-setting approach",
          "Key worker system for consistent relationships",
          "Therapeutic interventions embedded in timetable",
          "Sensory-aware environments and calm spaces",
          "Restorative rather than punitive behaviour approaches",
        ],
      },
      { type: "h2", text: "Measurable Outcomes" },
      {
        type: "stats",
        items: [
          { value: "78%", label: "Improved emotional regulation" },
          { value: "65%", label: "Reduced crisis incidents" },
          { value: "82%", label: "Positive destination outcomes" },
        ],
      },
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
      { type: "h2", text: "Proven Strategies" },
      {
        type: "ul",
        items: [
          "Daily welfare calls for absent learners",
          "Transport support to remove barriers",
          "Flexible start times during re-engagement",
          "Rewards and recognition for attendance improvement",
          "Strong home-school communication",
        ],
      },
      {
        type: "stats",
        items: [
          { value: "+35%", label: "Average attendance improvement" },
          { value: "85%", label: "Achieve 80%+ attendance" },
        ],
      },
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
      { type: "h2", text: "Most Effective Vocational Areas" },
      {
        type: "cards",
        items: [
          { title: "Construction Trades", body: "Bricklaying, carpentry, plastering, painting & decorating" },
          { title: "Motor Vehicle", body: "Mechanics, body repair, valeting" },
          { title: "Catering & Hospitality", body: "Food prep, front of house, barista" },
          { title: "Hair & Beauty", body: "Hairdressing, barbering, beauty therapy" },
        ],
      },
      { type: "h2", text: "Success Factors" },
      {
        type: "ul",
        items: [
          "Industry-standard equipment and facilities",
          "Staff with industry experience",
          "Real work experience placements",
          "Employer partnerships for progression",
        ],
      },
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
      { type: "h2", text: "Progression Options" },
      {
        type: "cards",
        items: [
          { title: "Further Education College", body: "Academic or vocational courses, Foundation Learning, Entry Level programmes" },
          { title: "Apprenticeships", body: "Earn while learning with employer-based training" },
          { title: "Traineeships", body: "Work preparation for those not yet ready for apprenticeship" },
          { title: "Supported Employment", body: "For learners with additional needs requiring ongoing support" },
        ],
      },
      { type: "h2", text: "Key Success Factors" },
      {
        type: "ul",
        items: [
          "Start transition planning in Year 10",
          "Multiple college visits and tasters",
          "Warm handover to new setting",
          "Follow-up support for first 6 months",
        ],
      },
    ],
  },
}
