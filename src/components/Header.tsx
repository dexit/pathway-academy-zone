import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import {
  Menu, X, Phone, ChevronDown, Search as SearchIcon,
  Building2, Users, MapPin, Handshake, Briefcase,
  GraduationCap, BarChart3, BookOpen, FileText, Star,
  BookMarked, ClipboardList, Shield, HelpCircle, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavChild {
  label: string;
  path: string;
  description?: string;
  icon?: React.ElementType;
  highlight?: boolean;
}

interface NavItem {
  label: string;
  path?: string;
  children?: NavChild[];
  /** "wide" renders a 2-col grid; "xl" renders a 3-col grid */
  megaSize?: "wide" | "xl";
  /** Promo panel shown on the right side of wide/xl dropdowns */
  promo?: { heading: string; body: string; cta: string; ctaPath: string };
}

// ─── Nav data ─────────────────────────────────────────────────────────────────
const navLinks: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    megaSize: "wide",
    promo: {
      heading: "Discover Pathway Academy Zone",
      body:    "A Staffordshire Alternative Provision specialist committed to safeguarding and positive outcomes.",
      cta:     "Read our story",
      ctaPath: "/about",
    },
    children: [
      { label: "About Us",       path: "/about",    description: "Our story, values and approach",     icon: Building2 },
      { label: "Our Team",       path: "/team",     description: "Meet the people behind PAZ",          icon: Users },
      { label: "Our Centres",    path: "/centres",  description: "View our provision sites",            icon: MapPin },
      { label: "Partners",       path: "/partners", description: "Schools and agencies we work with",   icon: Handshake },
      { label: "Careers",        path: "/careers",  description: "Join our growing team",               icon: Briefcase },
    ],
  },
  {
    label: "Programmes",
    megaSize: "wide",
    promo: {
      heading: "Ready to refer a young person?",
      body:    "Our admissions team can guide you through the full process — no obligation.",
      cta:     "Start a referral",
      ctaPath: "/referral",
    },
    children: [
      { label: "Our Programmes",   path: "/programmes", description: "Full overview of all AP programmes",       icon: GraduationCap, highlight: true },
      { label: "Outcomes & Impact", path: "/outcomes",  description: "Pupil progress data and success stories",  icon: BarChart3 },
    ],
  },
  {
    label: "Knowledge Hub",
    megaSize: "xl",
    promo: {
      heading: "Complete Guide to AP",
      body:    "Our 15-minute definitive guide covering every step from referral triggers to progression routes.",
      cta:     "Read the guide",
      ctaPath: "/knowledge-hub/complete-guide",
    },
    children: [
      { label: "Knowledge Hub",    path: "/knowledge-hub",              description: "Browse all AP resources",          icon: BookOpen, highlight: true },
      { label: "Complete Guide",   path: "/knowledge-hub/complete-guide", description: "The full AP journey in one place", icon: FileText },
      { label: "Best Practice",    path: "/knowledge-hub/best-practice",  description: "Evidence-based AP guidance",       icon: Star },
      { label: "Glossary",         path: "/knowledge-hub/glossary",        description: "A–Z of AP & SEMH terminology",    icon: BookMarked },
      { label: "FAQs",             path: "/faqs",                          description: "Quick answers to common questions", icon: HelpCircle },
    ],
  },
  {
    label: "Support",
    megaSize: "wide",
    promo: {
      heading: "Need guidance?",
      body:    "Call our team on 01782 365365 — Mon–Fri 8 am–5 pm. We are happy to help.",
      cta:     "Contact us",
      ctaPath: "/contact",
    },
    children: [
      { label: "Referral Process", path: "/referral",     description: "How to refer a young person",      icon: ClipboardList, highlight: true },
      { label: "Safeguarding",     path: "/safeguarding", description: "Our commitment to pupil safety",   icon: Shield },
      { label: "FAQs",             path: "/faqs",         description: "Quick answers to common questions", icon: HelpCircle },
    ],
  },
  { label: "Contact", path: "/contact" },
];

// ─── Dropdown animation variants ──────────────────────────────────────────────
const dropdownVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1,   transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.12, ease: "easeIn" } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  show:   (i: number) => ({ opacity: 1, x: 0, transition: { duration: 0.18, delay: i * 0.035 } }),
};

// ─── Mega dropdown ────────────────────────────────────────────────────────────
function MegaDropdown({ item, active }: { item: NavItem; active: boolean }) {
  const location = useLocation();
  const isXl   = item.megaSize === "xl";
  const isWide = item.megaSize === "wide" || isXl;

  return (
    <AnimatePresence>
      {active && (
        /*
         * The wrapper starts at top-full with zero gap so the mouse never
         * leaves the parent container as it travels from the trigger button
         * down to the card. The visual breathing room comes from pt-2 inside.
         */
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`absolute top-full left-0 pt-2 z-50 ${
            isXl ? "w-[600px]" : isWide ? "w-[480px]" : "w-56"
          }`}
          role="region"
          aria-label={`${item.label} menu`}
        >
          <div className="rounded-2xl bg-card border border-border shadow-xl shadow-black/10 overflow-hidden">
            <div className={`p-4 ${isWide ? "flex gap-0" : ""}`}>

              {/* Links column(s) */}
              <ul
                className={`flex-1 grid gap-1 ${
                  isXl ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {item.children!.map((child, i) => {
                  const Icon    = child.icon;
                  const current = location.pathname === child.path;
                  return (
                    <motion.li key={child.path} custom={i} variants={itemVariants} initial="hidden" animate="show">
                      <Link
                        to={child.path}
                        aria-current={current ? "page" : undefined}
                        className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                          current
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        {Icon && (
                          <span className={`mt-0.5 flex-shrink-0 rounded-lg p-1.5 transition-colors ${
                            current
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          }`}>
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className={`block text-sm font-semibold leading-snug ${
                            current ? "text-primary" : "text-foreground group-hover:text-primary"
                          } transition-colors`}>
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                              {child.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Promo panel */}
              {isWide && item.promo && (
                <div className="w-[170px] flex-shrink-0 ml-3 pl-3 border-l border-border flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-foreground leading-snug mb-1.5">
                      {item.promo.heading}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {item.promo.body}
                    </p>
                  </div>
                  <Link
                    to={item.promo.ctaPath}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    {item.promo.cta}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location   = useLocation();

  const open  = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }, []);

  const close = useCallback(() => {
    // Small delay allows the mouse to travel from trigger into the dropdown
    // without the dropdown collapsing (belt-and-suspenders with the pt-2 trick).
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 80);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png"
            alt="Pathway Academy Zone Logo"
            className="h-14 w-auto"
            width="180"
            height="56"
            fetchPriority="high"
            decoding="async"
            loading="eager"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => open(link.label)}
                onMouseLeave={close}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.label}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    openDropdown === link.label
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      openDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <MegaDropdown item={link} active={openDropdown === link.label} />
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                title={link.label}
                rel={link.path === "/" ? "home" : undefined}
                aria-current={location.pathname === link.path ? "page" : undefined}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            title="Search"
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
          <a
            href="tel:+441782365365"
            aria-label="Call 01782 365365"
            title="01782 365365"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors xl:px-2 lg:p-2 lg:rounded-full lg:hover:bg-muted xl:hover:bg-transparent xl:rounded-none"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">01782 365365</span>
          </a>
          <ThemeToggle />
          <Button asChild size="sm">
            <Link to="/referral">Make a Referral</Link>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="lg:hidden flex items-center gap-0.5">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search"
            aria-expanded={searchOpen}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-border bg-card overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <SearchBar compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden bg-card border-b border-border"
          >
            <nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              className="flex flex-col p-4 gap-1 max-h-[calc(100svh-5rem)] overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-4 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        title={child.label}
                        rel="next"
                        aria-current={location.pathname === child.path ? "page" : undefined}
                        className={`flex items-center gap-3 px-6 py-3 mx-2 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                          location.pathname === child.path
                            ? "text-primary bg-secondary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {child.icon && <child.icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path!}
                    onClick={() => setMobileOpen(false)}
                    title={link.label}
                    rel={link.path === "/" ? "home" : undefined}
                    aria-current={location.pathname === link.path ? "page" : undefined}
                    className={`px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                      location.pathname === link.path
                        ? "text-primary bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Button asChild size="lg" className="mt-3">
                <Link to="/referral" onClick={() => setMobileOpen(false)}>
                  Make a Referral
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
