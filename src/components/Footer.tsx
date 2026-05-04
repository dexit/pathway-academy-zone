import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, ArrowUp } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const footerCols = [
  {
    title: "Our Provision",
    links: [
      { label: "Our Programmes",   path: "/programmes" },
      { label: "Outcomes & Impact", path: "/outcomes" },
      { label: "Safeguarding",     path: "/safeguarding" },
      { label: "Make a Referral",  path: "/referral" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Knowledge Hub",  path: "/knowledge-hub" },
      { label: "Complete Guide", path: "/knowledge-hub/complete-guide" },
      { label: "Glossary",       path: "/knowledge-hub/glossary" },
      { label: "FAQs",           path: "/faqs" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Who We Are",  path: "/about" },
      { label: "Our Team",    path: "/team" },
      { label: "Our Centres", path: "/centres" },
      { label: "Partners",    path: "/partners" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Careers",    path: "/careers" },
      { label: "Policies",   path: "/policies" },
      { label: "Contact Us", path: "/contact" },
      { label: "Search",     path: "/search" },
    ],
  },
];

const AREAS = [
  { name: "Stoke-on-Trent",       slug: "stoke-on-trent" },
  { name: "Newcastle-under-Lyme", slug: "newcastle-under-lyme" },
  { name: "Stafford",             slug: "stafford" },
  { name: "Cannock",              slug: "cannock" },
  { name: "Lichfield",            slug: "lichfield" },
  { name: "Tamworth",             slug: "tamworth" },
  { name: "Wolverhampton",        slug: "wolverhampton" },
  { name: "Leek",                 slug: "leek" },
];

const socials = [
  { label: "Facebook",    icon: Facebook, href: "https://www.facebook.com/PathwayAcademyZone" },
  { label: "LinkedIn",    icon: Linkedin, href: "https://www.linkedin.com/company/pathway-academy-zone" },
  { label: "Twitter / X", icon: Twitter,  href: "https://twitter.com/PathwayAcademyZ" },
];

// ─── Shared token aliases (footer is always dark) ────────────────────────────
// Minimum white/55 (~6.5:1 on footer bg) to pass WCAG AA on hsl(160,22%,9%).
const col  = "text-white/85 hover:text-primary transition-colors duration-200";
const head = "text-xs font-semibold uppercase tracking-widest text-white mb-4";

// ─── Footer ──────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative bg-[hsl(160,22%,9%)] text-white/70">

      {/* Top accent gradient bar */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"
      />

      <div className="container mx-auto px-4 pt-14 pb-10 space-y-12">

        {/* ── Brand + nav columns ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" aria-label="Pathway Academy Zone home" className="inline-block mb-5">
              <img
                src="https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png"
                alt="Pathway Academy Zone"
                className="h-14 w-auto brightness-0 invert opacity-90"
                width="160"
                height="56"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p className="text-sm leading-relaxed text-white/70 max-w-[17rem] mb-6">
              Alternative Provision specialist in Staffordshire — safeguarding,
              engagement, and positive outcomes for young people outside mainstream
              education.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 mb-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in new tab)`}
                  title={s.label}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Quick contact */}
            <div className="space-y-2">
              <a
                href="tel:+441782365365"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                01782 365365
              </a>
              <a
                href="mailto:info@pathwayacademyzone.co.uk"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                info@pathwayacademyzone.co.uk
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic leading-snug">
                  Duncalf St, Burslem<br />Stoke-on-Trent ST6 3LJ
                </address>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {footerCols.map((col_) => (
            <div key={col_.title}>
              <h4 className={head}>{col_.title}</h4>
              <ul className="space-y-2.5">
                {col_.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={`text-sm ${col}`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Areas We Serve ────────────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-10">
          <p className={head}>Areas We Serve</p>
          <nav aria-label="Areas we serve" className="flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                to={`/alternative-provision/${area.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/20 text-white/65 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                {area.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Legal bar ─────────────────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>© {new Date().getFullYear()} Pathway Academy Zone. All rights reserved.</p>

          <div className="flex items-center gap-5">
            {[
              { label: "Policies",     path: "/policies" },
              { label: "Safeguarding", path: "/safeguarding" },
              { label: "Contact",      path: "/contact" },
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}

            {/* Back to top (inline, footer-scoped) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              title="Back to top"
              className="ml-2 inline-flex items-center gap-1 hover:text-primary transition-colors duration-200"
            >
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
              Top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
