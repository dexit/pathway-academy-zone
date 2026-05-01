export const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    children: [
      { label: "Who We Are", path: "/about" },
      { label: "Our Team", path: "/team" },
      { label: "Our Centres", path: "/centres" },
      { label: "Outcomes & Impact", path: "/outcomes" },
    ],
  },
  { label: "Programmes", path: "/programmes" },
  {
    label: "Resources",
    children: [
      { label: "Knowledge Hub", path: "/knowledge-hub" },
      { label: "Blog", path: "/blog" },
      { label: "News", path: "/news" },
      { label: "FAQs", path: "/faqs" },
    ],
  },
  {
    label: "Support",
    children: [
      { label: "Safeguarding", path: "/safeguarding" },
      { label: "Partners", path: "/partners" },
      { label: "Policies", path: "/policies" },
    ],
  },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];
