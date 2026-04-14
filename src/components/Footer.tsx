import { Link } from "react-router-dom";
import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Boutique Boarding", path: "/boarding" },
    { label: "Small Group Daycare", path: "/daycare" },
    { label: "Organic Grooming", path: "/grooming" },
    { label: "Positive Training", path: "/training" },
  ],
  about: [
    { label: "Our Philosophy", path: "/philosophy" },
    { label: "Our Facility", path: "/facility" },
    { label: "Meet the Team", path: "/team" },
    { label: "Book a Tour", path: "/book-tour" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-7 w-7 text-mint" />
              <span className="font-display text-xl font-bold text-background">Boutique Boarding</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-background/60">
              Small groups. Big love. Natural care. A boutique sanctuary where every pet is family.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-mint transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-mint transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-mint shrink-0" />
                2847 Willow Creek Drive, Greenfield, OR 97401
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-mint shrink-0" />
                (541) 555-0123
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-mint shrink-0" />
                hello@boutiqueboarding.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          <p>© {new Date().getFullYear()} Boutique Boarding. Employee-owned since 2005. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
