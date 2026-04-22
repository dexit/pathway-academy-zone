import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerLinks, socials, contactInfo } from "@/config/footer";
import { SITE_NAME } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-24 relative overflow-hidden">
      {/* Decorative pulse */}
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">P</div>
              <span className="font-display font-black text-3xl tracking-tighter italic uppercase">{SITE_NAME.split(' ').map(w => w[0]).join('')} <span className="text-primary">ZONE</span></span>
            </Link>
            <p className="text-background/60 mb-10 max-w-sm text-lg leading-relaxed font-medium">
              High-impact Alternative Provision and SEMH support across Staffordshire. We don't just teach—we empower legends to own their future.
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all border border-white/10 hover:border-primary active:scale-90"
                  aria-label={s.label}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.4em] text-primary mb-8">PROVISION</h4>
            <ul className="space-y-4">
              {footerLinks.provision.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-background/60 hover:text-primary transition-colors flex items-center gap-3 group font-bold italic uppercase tracking-tighter">
                    <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.4em] text-primary mb-8">RESOURCES</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-background/60 hover:text-primary transition-colors flex items-center gap-3 group font-bold italic uppercase tracking-tighter">
                    <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.4em] text-primary mb-8">INFO</h4>
            <ul className="space-y-4">
              {footerLinks.information.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-background/60 hover:text-primary transition-colors flex items-center gap-3 group font-bold italic uppercase tracking-tighter">
                    <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md mb-20">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <contactInfo.icons.phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-black text-background/40 uppercase tracking-widest mb-1">CALL US</p>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-xl font-black italic tracking-tighter hover:text-primary transition-colors">{contactInfo.phone}</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <contactInfo.icons.email className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-black text-background/40 uppercase tracking-widest mb-1">EMAIL US</p>
              <a href={`mailto:${contactInfo.email}`} className="text-xl font-black italic tracking-tighter hover:text-primary transition-colors break-all">{contactInfo.email}</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <contactInfo.icons.address className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-black text-background/40 uppercase tracking-widest mb-1">VISIT US</p>
              <p className="text-xl font-black italic tracking-tighter text-background">{contactInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-background/40 text-sm font-bold uppercase tracking-widest">
            © {currentYear} {SITE_NAME}. MISSION CONTROL.
          </p>
          <div className="flex items-center gap-10 font-black text-xs uppercase tracking-widest text-background/40">
            <Link to="/policies" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/policies" className="hover:text-white transition-colors">Cookies</Link>
            <Link to="/policies" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
