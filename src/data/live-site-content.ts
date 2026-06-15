/**
 * Live site content extracted from pathwayacademyzone.co.uk
 * VERIFIED CRAWL: 2026-06-15
 * 
 * Verified pages that exist:
 * ✓ Home (/)
 * ✓ About (/about)
 * ✓ Programmes (/programmes)
 * ✓ Contact (/contact)
 * ✓ Knowledge Hub (/knowledge-hub)
 * ✓ Safeguarding (/safeguarding)
 * ✓ Policies (/policies)
 * ✓ Team (/team)
 * ✓ Careers (/careers)
 * 
 * Verified pages that DON'T exist (404):
 * ✗ Support (/support) - does not exist
 * ✗ News (/news) - does not exist
 */

export const LIVE_CONTENT = {
  pages: {
    verified: [
      'home',
      'about',
      'programmes',
      'contact',
      'knowledge-hub',
      'safeguarding',
      'policies',
      'team',
      'careers',
    ],
    nonExistent: ['support', 'news'],
  },

  home: {
    banner: {
      text: "Alternative Provision in Staffordshire",
      bgColor: "bg-emerald-600",
    },
    hero: {
      subtitle: "Alternative Provision in Staffordshire",
      heading: "Every Young Person Deserves a Pathway To Success",
      description: "We provide specialist education for young people who need a different approach. Through structure, care and high expectations, we help young people re-engage, rebuild confidence and move forward in education, employment or training.",
      ctaText: "Make a Referral",
    },
  },

  about: {
    mission: "Empowering Young People to Succeed",
    description: "Pathway Academy Zone is a specialist Alternative Provision organisation supporting vulnerable young people across Staffordshire.",
    values: {
      framework: "CARES",
      values: [
        { letter: "C", word: "Change", description: "We embrace learning and adapt to grow." },
        { letter: "A", word: "Ambition", description: "We aim high and strive for progress." },
        { letter: "R", word: "Reputation", description: "We work as a team and are known for integrity." },
        { letter: "E", word: "Empathy", description: "We care deeply and show compassion in action." },
        { letter: "S", word: "Skills", description: "We grow by sharpening our abilities with discipline." },
      ],
    },
  },

  programmes: {
    title: "Our Programmes - Pathways to Success",
    subtitle: "We offer a range of structured programmes designed to meet individual needs, combining academic learning with vocational skills and therapeutic support.",
    offerings: [
      {
        title: "Academic Re-engagement",
        description: "Structured academic curriculum adapted for individual learning needs, focusing on core subjects and building confidence in learning.",
        details: [
          "English, Maths & Science",
          "PSHE / RSHE, RE, PE & Citizenship",
          "Small group teaching (max 6)",
          "Personalised learning plans",
          "Full-time or part-time placements",
        ],
        hours: "Monday to Friday, 9:30am - 2:30pm",
      },
      {
        title: "Vocational Learning",
        description: "Hands-on practical programmes developing real-world skills in areas like construction, catering, motor mechanics, and horticulture.",
        details: [
          "Industry-standard training",
          "Work experience placements",
          "Recognised qualifications",
          "Employer partnerships",
          "1-2 days per week alongside academic",
        ],
      },
      {
        title: "SEMH Support",
        description: "Therapeutic intervention and support for young people with social, emotional, and mental health needs, integrated throughout all provision.",
        details: [
          "1:1 therapeutic sessions",
          "Group workshops",
          "Emotional regulation support",
          "Family support sessions",
          "Ongoing throughout placement",
        ],
      },
      {
        title: "Personal Development",
        description: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.",
        details: [
          "Communication skills",
          "Problem-solving",
          "Team building",
          "Goal setting",
          "Integrated into weekly timetable",
        ],
      },
      {
        title: "Life Skills Programme",
        description: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.",
        details: [
          "Cooking & nutrition",
          "Financial literacy",
          "Health education",
          "Digital skills including Artificial Intelligence (AI) skills",
          "Integrated into curriculum",
        ],
      },
      {
        title: "Employability Skills",
        description: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.",
        details: [
          "CV & application support",
          "Interview preparation",
          "Work experience",
          "Careers guidance",
          "Year 10 & 11 focus",
        ],
      },
    ],
  },

  contact: {
    intro: "Whether you have a question, want to arrange a visit, or need to discuss a referral, we're here to help.",
    contactInfo: {
      phone: "01782 365365",
      phoneHours: "Mon-Fri 8:30am - 4:00pm",
      email: "info@pathwayacademyzone.co.uk",
      address: "Duncalf St, Burslem",
      addressFull: "Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ",
      postcode: "ST6 3LJ",
      hours: "Monday - Friday, 8:30am - 4:00pm",
    },
    quickLinks: [
      { title: "Make a Referral", description: "Start the referral process for a young person" },
      { title: "Safeguarding", description: "Learn about our safeguarding practices" },
      { title: "Policies", description: "Review our statutory and organisational policies" },
    ],
  },

  safeguarding: {
    title: "Support & Safeguarding - Keeping Young People Safe",
    subtitle: "Safeguarding is everyone's responsibility. We maintain the highest standards to ensure all young people feel safe, supported, and heard.",
    dsl: {
      name: "Martin Chandler",
      title: "Designated Safeguarding Lead",
      role: "Head of Community and Engagement",
    },
    commitments: [
      "All staff complete enhanced DBS checks and receive regular safeguarding training",
      "We maintain clear reporting procedures and work closely with local safeguarding partners",
      "Young people are taught to recognise risks and know who to talk to if they feel unsafe",
    ],
  },

  policies: {
    title: "Policies & Documents - Statutory Information",
    subtitle: "Transparency is important to us. Below you'll find our key policies and statutory documents.",
    policyCategories: {
      safeguarding: [
        "Safeguarding Children & Young Person's Policy",
        "Online Safety Policy",
        "Anti-Bullying Policy",
      ],
      organisational: [
        "Equality, Diversity & Inclusion Policy",
        "Behaviour & Positive Relationships Policy",
        "Complaints Procedure",
      ],
      statutory: [
        "Privacy Policy",
        "Terms of Use",
        "Accessibility Statement",
      ],
    },
  },

  team: {
    title: "Our Team - Educators & Specialists",
    subtitle: "Meet the People Behind Pathway Academy Zone",
    description: "Our dedicated team of educators, mentors, and specialists work together to support every young person on their journey.",
    leadPerson: {
      name: "Martin Chandler",
      title: "Head of Community and Engagement",
    },
  },

  careers: {
    title: "Careers - Join Our Team",
    subtitle: "We're looking for passionate educators, mentors, and support staff who want to make a difference in young people's lives.",
    whyWorkHere: [
      {
        title: "Meaningful Work",
        description: "Make a real difference in young people's lives every day",
      },
      {
        title: "Supportive Team",
        description: "Work alongside dedicated, passionate colleagues",
      },
      {
        title: "Professional Development",
        description: "Regular training and opportunities for growth",
      },
      {
        title: "Work-Life Balance",
        description: "Term-time working options and flexible arrangements",
      },
    ],
    whatWeLookFor: [
      "Believe in every young person's potential",
      "Are resilient and patient, even when things are challenging",
      "Build strong, trusting relationships with young people",
      "Collaborate effectively with colleagues and partners",
      "Are committed to continuous learning and improvement",
    ],
    currentVacancies: [
      {
        title: "SEMH Teacher",
        type: "Full-time, Permanent",
        location: "Stafford",
        salary: "£28,000 - £35,000",
        closing: "15 January 2025",
        description: "We're seeking an experienced teacher to deliver our SEMH-focused curriculum to small groups of young people.",
      },
      {
        title: "Youth Mentor",
        type: "Full-time, Fixed Term",
        location: "Stafford",
        salary: "£22,000 - £26,000",
        closing: "22 January 2025",
        description: "Join our pastoral team to provide 1:1 support for young people with complex needs.",
      },
      {
        title: "Learning Support Assistant",
        type: "Part-time (20hrs)",
        location: "Stafford",
        salary: "£12.50/hour",
        closing: "8 January 2025",
        description: "Support teaching staff in delivering engaging lessons and providing additional support to students.",
      },
    ],
  },

  knowledgeHub: {
    title: "Knowledge Hub",
    subtitle: "Your comprehensive resource for understanding Alternative Provision.",
    description: "Expert guides, practical comparisons, and evidence-based best practices for educators, parents, and professionals.",
    resources: [
      { title: "Complete Guide to AP", path: "/knowledge-hub/complete-guide" },
      { title: "Glossary", path: "/knowledge-hub/glossary" },
    ],
  },

  footer: {
    copyright: "© 2026 Pathway Academy Zone. All rights reserved.",
    links: {
      main: [
        { label: "Knowledge Hub", url: "/knowledge-hub" },
        { label: "Complete Guide to AP", url: "/knowledge-hub/complete-guide" },
        { label: "Glossary", url: "/knowledge-hub/glossary" },
        { label: "Referral Process", url: "/referral" },
        { label: "Safeguarding", url: "/safeguarding" },
        { label: "Our Programmes", url: "/programmes" },
      ],
      legal: [
        { label: "Privacy Policy", url: "/privacy-policy" },
        { label: "Terms of Use", url: "/terms" },
        { label: "Accessibility", url: "/accessibility" },
      ],
    },
    description: "Pathway Academy Zone is an Alternative Provision specialist in Staffordshire focused on safeguarding, engagement, and positive outcomes for young people who cannot thrive in mainstream education.",
  },
};
