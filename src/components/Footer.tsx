import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  provision: [
    { label: "Our Programmes", path: "/programmes" },
    { label: "Outcomes & Impact", path: "/outcomes" },
    { label: "Safeguarding", path: "/safeguarding" },
    { label: "Make a Referral", path: "/referral" },
  ],
  resources: [
    { label: "Knowledge Hub", path: "/knowledge-hub" },
    { label: "Blog", path: "/blog" },
    { label: "Glossary", path: "/knowledge-hub/glossary" },
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
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">PA</span>
              </div>
              <span className="font-display text-lg font-bold text-background">Pathway Academy Zone</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-background/60">
              Alternative Provision supporting young people aged 11–16 across Stoke-on-Trent and Staffordshire.
            </p>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-background mb-4">Our Provision</h4>
            <ul className="space-y-3">
              {footerLinks.provision.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-background mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-background mb-4">About Us</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                01782 365365
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                info@pathwayacademyzone.co.uk
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          <p>© {new Date().getFullYear()} Pathway Academy Zone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
