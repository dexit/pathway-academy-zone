import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerLinks, socials } from "@/config/footer";

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
            <p className="text-sm leading-relaxed mb-6 text-background/60 dark:text-foreground/60 max-w-xs font-medium">
              Alternative Provision supporting young people aged 11–16 across Stoke-on-Trent and Staffordshire.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in new tab)`}
                  title={s.label}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-xl border dark:border-foreground/20 dark:hover:border-primary dark:hover:text-primary border-background/20 hover:border-primary hover:text-primary transition-all hover:scale-110 active:scale-95 shadow-sm"
                >
                  <s.icon className="h-5 w-5" aria-hidden="true" />
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
              <h4 className="font-display text-base font-bold text-background mb-6 dark:text-primary tracking-tight">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm font-medium hover:text-primary transition-colors focus-visible:text-primary focus-visible:outline-none">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm border-t border-background/10 dark:border-foreground/10 mt-16 pt-10">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 mt-0.5 text-primary shrink-0" aria-hidden="true" />
            <address className="not-italic text-background/70 dark:text-foreground/70 font-medium">Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ</address>
          </div>
          <a href="tel:+441782365365" className="flex items-center gap-3 text-background/70 dark:text-foreground/70 dark:hover:text-primary hover:text-primary transition-colors md:justify-center font-bold">
            <Phone className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
            01782 365365
          </a>
          <a href="mailto:info@pathwayacademyzone.co.uk" className="flex items-center gap-3 text-background/70 dark:text-foreground/70 dark:hover:text-primary hover:text-primary transition-colors md:justify-end font-bold">
            <Mail className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
            info@pathwayacademyzone.co.uk
          </a>
        </div>

        <div className="border-t dark:border-foreground/10 border-background/10 mt-10 pt-8 flex flex-col md:flex-row gap-4 items-center justify-between text-xs font-medium text-background/40 dark:text-foreground/40 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Pathway Academy Zone. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/policies" className="hover:text-primary transition-colors">Policies</Link>
            <Link to="/safeguarding" className="hover:text-primary transition-colors">Safeguarding</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
