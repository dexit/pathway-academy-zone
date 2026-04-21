import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/config/navigation";
import { SITE_NAME } from "@/config/site";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-105 transition-transform">P</div>
          <span className={`font-display font-bold text-xl tracking-tight ${!isScrolled && location.pathname === "/" ? "text-primary" : "text-foreground"}`}>
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/search" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </Link>
          <Button asChild className="rounded-full">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>

        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border p-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-lg font-semibold flex items-center justify-between ${
                  location.pathname === item.href ? "text-primary" : "text-foreground"
                }`}
              >
                {item.title}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Button asChild variant="outline" className="w-full justify-center rounded-full">
                <Link to="/search" className="flex items-center gap-2"><Search className="h-4 w-4" /> Search Resources</Link>
              </Button>
              <Button asChild className="w-full justify-center rounded-full">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
