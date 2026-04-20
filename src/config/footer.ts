import { Facebook, Linkedin, Twitter, type LucideIcon } from "lucide-react";
import { socials as siteSocials } from "./site";

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
    { label: "Blog", path: "/blog" },
    { label: "News", path: "/news" },
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

const iconMap: Record<string, LucideIcon> = {
  Facebook: Facebook,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};

export const socials = siteSocials.map(s => ({
  ...s,
  icon: iconMap[s.label] || Twitter
}));
