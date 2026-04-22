import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search as SearchIcon, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks } from "@/config/navigation";
import { SITE_NAME } from "@/config/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-2xl border-b border-border/10 h-20 flex items-center">
      <div className="container mx-auto flex items-center justify-between px-4 gap-4">
        <Link to="/" className="flex items-center shrink-0 group">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">P</div>
          <span className="font-display font-black text-2xl tracking-tighter ml-3 hidden sm:inline-block italic">
            {SITE_NAME.split(' ').map(w => w[0]).join('')} <span className="text-primary">ZONE</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="px-4 py-2 text-sm font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-1 text-muted-foreground hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card rounded-2xl shadow-2xl border-2 border-border/50 p-3 z-50"
                    >
                      {link.children.map((child, idx) => (
                        <motion.div
                          key={child.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link
                            to={child.path}
                            className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                              location.pathname === child.path
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
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
                className={`px-4 py-2 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="p-3 rounded-full hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full shadow-xl">
            <Link to="/referral">UPGRADE NOW</Link>
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-3 rounded-2xl bg-primary/10 text-primary"
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
            className="absolute top-full left-0 right-0 border-t border-border/10 bg-background/95 backdrop-blur-3xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8">
              <SearchBar compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="lg:hidden fixed inset-0 top-20 bg-background z-50 overflow-y-auto"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <div key={link.label} className="space-y-2">
                  <div className="text-xs font-black uppercase tracking-widest text-primary/50 px-4 mt-6 first:mt-0">{link.label}</div>
                  {link.children ? (
                    link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-4 py-4 rounded-2xl text-lg font-black italic uppercase tracking-tighter transition-all ${
                          location.pathname === child.path ? "text-primary bg-primary/10" : "text-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))
                  ) : (
                    <Link
                      to={link.path!}
                      className={`block px-4 py-4 rounded-2xl text-lg font-black italic uppercase tracking-tighter transition-all ${
                        location.pathname === link.path ? "text-primary bg-primary/10" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Button asChild size="lg" className="mt-12 rounded-3xl h-20 text-xl font-black">
                <Link to="/referral">START REFERRAL</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
