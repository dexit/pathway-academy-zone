export interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

export const navLinks: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    children: [
      { label: "About Us", path: "/about" },
      { label: "Our Team", path: "/team" },
      { label: "Partners", path: "/partners" },
      { label: "Centres", path: "/centres" },
      { label: "Careers", path: "/careers" },
    ],
  },
  {
    label: "Programmes",
    children: [
      { label: "Programmes", path: "/programmes" },
      { label: "Outcomes", path: "/outcomes" },
    ],
  },
  {
    label: "Knowledge Hub",
    children: [
      { label: "Knowledge Hub", path: "/knowledge-hub" },
      { label: "Complete Guide", path: "/knowledge-hub/complete-guide" },
      { label: "Best Practice", path: "/knowledge-hub/best-practice" },
      { label: "Glossary", path: "/knowledge-hub/glossary" },
    ],
  },
  {
    label: "Support",
    children: [
      { label: "Referral Process", path: "/referral" },
      { label: "Safeguarding", path: "/safeguarding" },
      { label: "FAQs", path: "/faqs" },
    ],
  },
  { label: "Contact", path: "/contact" },
];
