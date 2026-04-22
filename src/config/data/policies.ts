export type Policy = {
  name: string;
  file: string;
  description: string;
  category:
    | "Safeguarding"
    | "Inclusion"
    | "Conduct"
    | "Data & Privacy"
    | "Complaints";
};

export const POLICIES: Policy[] = [
  {
    name: "Safeguarding Children & Young Person's Policy",
    file: "Safeguarding-Children-Young-Persons-Policy.pdf",
    description:
      "Our statutory policy covering safeguarding, child protection, designated leads, and reporting procedures.",
    category: "Safeguarding",
  },
  {
    name: "Equality, Diversity & Inclusion Policy",
    file: "Equality-Diversity-Inclusion-Policy.pdf",
    description:
      "How we uphold equality, celebrate diversity, and ensure every learner is included.",
    category: "Inclusion",
  },
  {
    name: "Complaints & Compliments Policy",
    file: "Complaints-Compliments-Policy.pdf",
    description:
      "The process for raising concerns, making complaints, or sharing positive feedback.",
    category: "Complaints",
  },
  {
    name: "Learner Behaviour & Conduct Policy",
    file: "Learner-Behaviour-Conduct-Policy.pdf",
    description:
      "Our relational, restorative approach to behaviour and learner conduct expectations.",
    category: "Conduct",
  },
  {
    name: "Safeguarding Information for Visitors",
    file: "Safeguarding-Information-Visitors.pdf",
    description:
      "Essential safeguarding information for contractors, volunteers, and all site visitors.",
    category: "Safeguarding",
  },
  {
    name: "Privacy Notice & GDPR Statement",
    file: "Privacy-Notice-GDPR.pdf",
    description:
      "How we collect, use, store, and protect personal data in line with UK GDPR.",
    category: "Data & Privacy",
  },
];
