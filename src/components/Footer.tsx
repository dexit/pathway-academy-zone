import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
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

const socials = [
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/PathwayAcademyZone" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/pathway-academy-zone" },
  { label: "Twitter / X", icon: Twitter, href: "https://twitter.com/PathwayAcademyZ" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 dark:bg-background dark:text-foreground/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6" aria-label="Pathway Academy Zone home">
              <img
                src="https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png"
                alt="Pathway Academy Zone"
                title="Pathway Academy Zone"
                className="h-16 w-auto brightness-0 invert"
                width="160"
                height="64"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-background/60 dark:text-foreground/60 max-w-xs">
              Alternative Provision supporting young people aged 11–16 across Stoke-on-Trent and Staffordshire.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in new tab)`}
                  title={s.label}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border dark:border-foreground/20 dark:hover:border-primary dark:hover:text-primary border-background/20 hover:border-primary hover:text-primary transition-colors"
                >
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Our Provision", links: footerLinks.provision },
            { title: "Resources", links: footerLinks.resources },
            { title: "About Us", links: footerLinks.about },
            { title: "Information", links: footerLinks.information },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-base font-semibold text-background mb-4 dark:text-primary ">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm border-t border-background/10 dark:border-foreground/10 mt-12 pt-8 justify-between">
          <div className="flex items-start gap-3 justify-start">
            <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
            <address className="not-italic text-background/70 dark:text-foreground/70 ">Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ</address>
          </div>
          <a href="tel:+441782365365" className="flex items-center gap-3 text-background/70 dark:text-foreground/70 dark:hover:text-primary hover:text-primary transition-colors  justify-center">
            <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            01782 365365
          </a>
          <a href="mailto:info@pathwayacademyzone.co.uk" className="flex items-center gap-3 text-background/70 dark:text-foreground/70 dark:hover:text-primary hover:text-primary transition-colors  justify-end">
            <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            info@pathwayacademyzone.co.uk
          </a>
        </div>

        <div className="border-t dark:border-foreground/10 border-background/10 mt-8 pt-6 flex flex-col md:flex-row gap-3 items-center justify-between text-sm text-background/40 dark:text-foreground/40">
          <p>© {new Date().getFullYear()} Pathway Academy Zone. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/policies" className="hover:text-primary transition-colors">Policies</Link>
            <Link to="/safeguarding" className="hover:text-primary transition-colors">Safeguarding</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
