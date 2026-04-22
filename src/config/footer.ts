import { Facebook, Linkedin, Twitter, type LucideIcon, Phone, Mail, MapPin } from "lucide-react";

export const footerLinks = {
  provision: [
    { label: "Our Programmes", path: "/programmes" },
    { label: "Outcomes & Impact", path: "/outcomes" },
    { label: "Safeguarding", path: "/safeguarding" },
    { label: "Make a Referral", path: "/referral" },
  ],
  resources: [
    { label: "Knowledge Hub", path: "/knowledge-hub" },
    { label: "Complete Guide", path: "/knowledge-hub/complete-guide" },
    { label: "Glossary", path: "/knowledge-hub/glossary" },
    { label: "FAQs", path: "/faqs" },
  ],
  about: [
    { label: "Who We Are", path: "/about" },
    { label: "Our Team", path: "/team" },
    { label: "Our Centres", path: "/centres" },
    { label: "Partners", path: "/partners" },
  ],
  information: [
    { label: "Careers", path: "/careers" },
    { label: "Policies", path: "/policies" },
    { label: "Contact Us", path: "/contact" },
    { label: "Search", path: "/search" },
  ],
};

export const socials = [
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/PathwayAcademyZone" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/pathway-academy-zone" },
  { label: "Twitter / X", icon: Twitter, href: "https://twitter.com/PathwayAcademyZ" },
];

export const contactInfo = {
  phone: "01782 365365",
  email: "enquiries@pathwayacademyzone.co.uk",
  address: "Stoke-on-Trent, Staffordshire",
  icons: {
    phone: Phone,
    email: Mail,
    address: MapPin
  }
};
