import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 gap-4">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png"
            alt="Pathway Academy Zone Logo"
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-card rounded-xl shadow-lg border border-border py-2"
                    >
                      {link.children.map((child, idx) => (
                        <motion.div
                          key={child.path}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.04 }}
                        >
                          <Link
                            to={child.path}
                            title={child.label}
                            rel="next"
                            aria-current={location.pathname === child.path ? "page" : undefined}
                            className={`block px-4 py-2.5 mx-2 rounded-xl text-sm transition-colors ${
                              location.pathname === child.path
                                ? "text-primary bg-secondary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                title={link.label}
                rel={link.path === "/" ? "home" : undefined}
                aria-current={location.pathname === link.path ? "page" : undefined}
                className={`px-3 py-2 mx-2 text-sm font-medium rounded-xl transition-colors ${
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

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="hidden xl:block">
            <SearchBar />
          </div>
          <button
            onClick={() => navigate("/search")}
            aria-label="Search"
            className="xl:hidden p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
          <a
            href="tel:+441782365365"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            01782 365365
          </a>
          <ThemeToggle />
          <Button asChild size="sm">
            <Link to="/referral">Make a Referral</Link>
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search"
            className="p-2 rounded-full hover:bg-muted text-muted-foreground"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-card overflow-hidden"
          >
            <div className="p-4">
              <SearchBar compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
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
                        className={`block px-6 py-2.5 mx-2 rounded-xl text-sm font-medium transition-colors ${
                          location.pathname === child.path
                            ? "text-primary bg-secondary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
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
                    className={`px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-colors ${
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
