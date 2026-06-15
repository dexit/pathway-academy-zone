/**
 * Live site content extracted from pathwayacademyzone.co.uk
 * Used to keep project content in sync with website
 * Last verified: 2026-06-15
 */

export const LIVE_CONTENT = {
  home: {
    banner: {
      text: "Alternative Provision in Staffordshire",
      bgColor: "bg-emerald-600",
    },
    hero: {
      title: "Supporting Young People Through Alternative Provision",
      subtitle: "Evidence-based programmes for learners aged 11-16 with tailored support and positive outcomes",
    },
    impact: {
      stats: [
        { metric: "94%", label: "Attendance Improvement" },
        { metric: "87%", label: "Positive Destinations" },
        { metric: "150+", label: "Young People Supported" },
        { metric: "12+", label: "Partner Schools" },
      ],
    },
    ourApproach: {
      title: "Our Approach",
      pillars: [
        {
          title: "Trauma-Informed Practice",
          description: "Grounded in understanding how trauma affects learning and behaviour, creating safe spaces for growth",
        },
        {
          title: "Personalised Pathways",
          description: "Tailored learning plans designed around each young person's strengths, interests, and goals",
        },
        {
          title: "Expert Staff",
          description: "Qualified teachers, youth workers, and pastoral specialists dedicated to every student's success",
        },
        {
          title: "Safe Environment",
          description: "Maintained to the highest safeguarding standards, ensuring all young people feel secure and supported",
        },
      ],
    },
    faqs: {
      questions: [
        "What is Alternative Provision?",
        "Who is Pathway Academy Zone for?",
        "How does the referral process work?",
        "How quickly can a learner start?",
        "How do you keep learners safe?",
        "What qualifications do your staff have?",
      ],
    },
  },

  about: {
    mission: "To provide high-quality alternative provision that transforms the lives of young people through personalised education, expert support, and genuine care.",
    values: {
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
    title: "Our Programmes",
    description: "Evidence-based provision designed to re-engage learners and support positive pathways",
    offerings: [
      {
        title: "Core Academic Programme",
        description: "English, Maths, Science and other core subjects delivered in small, supportive groups",
      },
      {
        title: "Vocational & Technical",
        description: "Hands-on skills training in areas such as construction, health & social care, business",
      },
      {
        title: "Social, Emotional & Mental Health",
        description: "Therapeutic support addressing trauma, anxiety, self-regulation and social skills",
      },
      {
        title: "Personal Development",
        description: "Building confidence, resilience, independence and life skills for adulthood",
      },
      {
        title: "Employability & Enterprise",
        description: "Work experience, CV writing, interview skills and career guidance pathways",
      },
      {
        title: "Life Skills & Independence",
        description: "Practical skills in budgeting, health, cooking, hygiene and independent living",
      },
    ],
  },

  contact: {
    contactInfo: {
      phone: "01782 365365",
      phoneHours: "Monday - Friday, 8:30am - 4:00pm",
      email: "info@pathwayacademyzone.co.uk",
      emailResponse: "We aim to respond within 24 hours",
      address: "Duncalf Street, Burslem",
      city: "Stoke-on-Trent",
      postcode: "ST6 3LJ",
      hours: "Monday - Friday: 8:30am - 4:00pm",
    },
    quickLinks: [
      { title: "Make a Referral", description: "Start the referral process for a young person" },
      { title: "Safeguarding", description: "Learn about our safeguarding practices and DSL" },
      { title: "Policies", description: "Review our statutory and organisational policies" },
    ],
    notices: {
      copyright: "© 2026 Pathway Academy Zone. All rights reserved.",
      provider: "Powered by Pathway Group",
    },
  },

  safeguarding: {
    title: "Support & Safeguarding",
    commitment: "Safeguarding is at the heart of everything we do. We are committed to creating a safe environment where young people can thrive.",
    dsl: {
      name: "Martin Chandler",
      title: "Head of Community and Engagement / Designated Safeguarding Lead",
      email: "martin.chandler@pathwaygroup.co.uk",
      contact: "Available for safeguarding enquiries and concerns",
    },
    commitments: [
      "All staff complete enhanced DBS checks and receive regular safeguarding training",
      "We maintain clear reporting procedures and work closely with local safeguarding partners",
      "Young people are taught to recognise risks and know who to talk to if they feel unsafe",
      "We take all concerns seriously and act quickly to protect young people",
      "Regular audits and reviews ensure our practices remain effective and compliant",
    ],
    policies: [
      { name: "Child Protection & Safeguarding Policy", status: "Current" },
      { name: "Online Safety Policy", status: "Current" },
      { name: "Anti-Bullying Policy", status: "Current" },
      { name: "Behaviour & Positive Relationships Policy", status: "Current" },
      { name: "Safer Recruitment Policy", status: "Current" },
      { name: "Whistleblowing Policy", status: "Current" },
    ],
  },

  team: {
    title: "Our Team",
    description: "Experienced professionals dedicated to supporting young people's success",
    coreTeam: [
      {
        id: "martin-chandler",
        name: "Martin Chandler",
        role: "Head of Community and Engagement (Safeguarding)",
        image: "/assets/team/martin-chandler.png",
        bio: "Martin leads our safeguarding practice and is the first point of contact for any safeguarding concerns. He works closely with external agencies and ensures all staff receive regular safeguarding training.",
        email: "martin.chandler@pathwaygroup.co.uk",
      },
      {
        id: "liam-farrall",
        name: "Liam Farrall",
        role: "Head of Alternative Provision",
        image: "/assets/team/liam-farrall.jpg",
        bio: "Liam oversees all Alternative Provision programmes and ensures quality delivery across all courses and support services.",
      },
      {
        id: "dianne-taggart",
        name: "Dianne Taggart",
        role: "SENCO Lead",
        image: "/assets/team/dianne-taggart.jpg",
        bio: "Dianne leads special educational needs and coordination, ensuring every young person receives personalised support and tailored provision.",
      },
      {
        id: "ahsan-hussain",
        name: "Ahsan Hussain",
        role: "Head of Partnerships and Impact",
        image: "/assets/team/ahsan-hussain.png",
        bio: "Ahsan develops partnerships with schools, local authorities, and agencies to maximise positive outcomes for young people.",
      },
      {
        id: "zulekha-ali",
        name: "Zulekha Ali",
        role: "HR and Executive Support",
        image: "/assets/team/zulekha-ali.png",
        bio: "Zulekha manages human resources and provides executive support to ensure smooth operations and team development.",
      },
    ],
    leadership: [
      {
        id: "safaraz-ali",
        name: "Safaraz Ali MBE",
        role: "Founder & CEO",
        image: "/assets/team/safaraz-ali.png",
        bio: "Safaraz founded Pathway Academy Zone with a vision to transform education for young people who cannot thrive in mainstream settings.",
      },
      {
        id: "nick-dunster",
        name: "Nick Dunster",
        role: "Governor (Chair)",
        image: "/assets/team/nick-dunster.jpeg",
      },
      {
        id: "alan-hill",
        name: "Alan Hill",
        role: "Governor (Finance and Partnerships)",
        image: "/assets/team/alan-hill.jpeg",
      },
      {
        id: "waheed-azam",
        name: "Waheed Azam",
        role: "Executive Director",
        image: "/assets/team/waheed-azam.jpeg",
      },
    ],
  },

  knowledgeHub: {
    title: "Knowledge Hub & Resources",
    description: "Comprehensive guides, glossary, and resources for understanding Alternative Provision",
    featured: {
      title: "The Complete Guide to Alternative Provision",
      description: "Our definitive guide covering the full AP journey from referral triggers to progression routes. Essential reading for anyone involved in supporting young people outside mainstream education.",
      link: "/knowledge-hub/complete-guide",
    },
    sections: [
      {
        category: "Core Guides",
        description: "Essential guides explaining Alternative Provision fundamentals, processes, and pathways for educators, parents, and referring professionals.",
        guides: [
          { title: "What is Alternative Provision", link: "#" },
          { title: "How AP Works in Staffordshire", link: "#" },
          { title: "When to Refer a Learner", link: "#" },
        ],
      },
      {
        category: "Comparisons",
        description: "Side-by-side comparisons to help decision-makers understand the differences between various AP models and approaches.",
        guides: [
          { title: "AP vs Mainstream Schooling", link: "#" },
          { title: "Group vs One-to-One", link: "#" },
          { title: "Short-Term vs Long-Term", link: "#" },
        ],
      },
      {
        category: "Best Practice",
        description: "Evidence-based strategies and proven approaches for achieving the best outcomes in Alternative Provision settings.",
        guides: [
          { title: "SEMH Pathways", link: "#" },
          { title: "Attendance Strategies", link: "#" },
          { title: "Vocational Routes", link: "#" },
        ],
      },
      {
        category: "Glossary",
        description: "Clear definitions of key Alternative Provision terms and concepts for quick reference and understanding.",
        guides: [
          { title: "Alternative Provision", link: "#" },
          { title: "SEMH", link: "#" },
          { title: "EHCP", link: "#" },
          { title: "Managed Move", link: "#" },
        ],
      },
    ],
  },

  safeguarding: {
    title: "Support & Safeguarding",
    heading: "Keeping Young People Safe",
    description: "Safeguarding is everyone's responsibility. We maintain the highest standards to ensure all young people feel safe, supported, and heard.",
    dsl: {
      name: "Martin Chandler",
      role: "Designated Safeguarding Lead",
      email: "martin.chandler@pathwaygroup.co.uk",
      bio: "Martin leads our safeguarding practice and is the first point of contact for any safeguarding concerns. He works closely with external agencies and ensures all staff receive regular safeguarding training.",
      urgentContact: "If you have an urgent safeguarding concern about a young person, contact Martin directly by email",
    },
    commitment: {
      title: "Our Commitment",
      description: "At Pathway Academy Zone, we recognise that young people in Alternative Provision may be particularly vulnerable. Our approach to safeguarding is proactive, relational, and trauma-informed.",
      points: [
        "All staff complete enhanced DBS checks and receive regular safeguarding training",
        "We maintain clear reporting procedures and work closely with local safeguarding partners",
        "Young people are taught to recognise risks and know who to talk to if they feel unsafe",
      ],
    },
    pastoralCare: {
      title: "Pastoral Care - How We Support Young People",
      description: "Our pastoral approach is built on strong relationships, consistent support, and understanding individual needs.",
      pillars: [
        {
          title: "Trauma-Informed Practice",
          description: "All staff are trained in trauma-informed approaches, understanding how adverse experiences affect behaviour and learning.",
        },
        {
          title: "Key Worker System",
          description: "Every young person has a dedicated key worker who knows them well and advocates for their needs.",
        },
        {
          title: "Family Support",
          description: "We work closely with families, offering regular communication and support to address challenges together.",
        },
        {
          title: "Multi-Agency Working",
          description: "We collaborate with external agencies including CAMHS, social care, and specialist services.",
        },
      ],
    },
    policies: [
      "Child Protection & Safeguarding Policy",
      "Online Safety Policy",
      "Anti-Bullying Policy",
      "Behaviour & Positive Relationships Policy",
      "Safer Recruitment Policy",
      "Whistleblowing Policy",
    ],
  },

  policies: {
    title: "Policies & Documentation",
    description: "Statutory and organisational policies available for download",
    documents: [
      { name: "Child Protection & Safeguarding Policy", status: "Current" },
      { name: "Online Safety Policy", status: "Current" },
      { name: "Equality, Diversity & Inclusion Policy", status: "Current" },
      { name: "Behaviour & Positive Relationships Policy", status: "Current" },
      { name: "Complaints & Compliments Policy", status: "Current" },
      { name: "Learner Behaviour & Conduct Policy", status: "Current" },
      { name: "Safeguarding Information for Visitors", status: "Current" },
      { name: "Privacy Notice & GDPR Statement", status: "Current" },
    ],
  },

  footer: {
    links: [
      { label: "Privacy", path: "/privacy-policy" },
      { label: "Cookies", path: "/cookie-policy" },
      { label: "Terms", path: "/terms" },
      { label: "Policies", path: "/policies" },
      { label: "Safeguarding", path: "/safeguarding" },
      { label: "Contact", path: "/contact" },
    ],
    socialMedia: {
      facebook: "https://facebook.com/pathwayacademyzone",
      linkedin: "https://linkedin.com/company/pathway-academy-zone",
      twitter: "https://twitter.com/pathwaygroup",
    },
  },
};
