<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { Search, Home, ArrowLeft, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { motion } from "framer-motion";
=======
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Search, Compass, BookOpen, Phone } from "lucide-react";
import Layout from "@/components/Layout";
=======
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Search, Compass, BookOpen, Phone } from "lucide-react";
import Layout from "@/components/Layout";
>>>>>>> origin/main
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

const quickLinks = [
  { to: "/", icon: Home, label: "Home", desc: "Back to the start" },
  { to: "/programmes", icon: Compass, label: "Programmes", desc: "What we offer" },
  { to: "/knowledge-hub", icon: BookOpen, label: "Knowledge Hub", desc: "Guides & references" },
  { to: "/contact", icon: Phone, label: "Contact", desc: "Speak to our team" },
];
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> origin/main

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <Layout>
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container max-w-4xl px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 text-primary mb-8">
              <Search className="w-10 h-10" />
            </div>

            <h1 className="font-display text-7xl md:text-9xl font-bold text-foreground mb-6 tracking-tighter">
              404
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              We've lost this page
            </h2>

            <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">
              The page you are looking for doesn't exist or has been moved. Try searching for what you need below.
            </p>

            <div className="max-w-xl mx-auto mb-16">
              <SearchBar />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link
                to="/"
                className="flex flex-col items-center p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Home className="w-6 h-6" />
                </div>
                <span className="font-bold text-sm">Home Page</span>
              </Link>

              <Link
                to="/knowledge-hub"
                className="flex flex-col items-center p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="font-bold text-sm">Knowledge Hub</span>
              </Link>

              <Link
                to="/contact"
                className="flex flex-col items-center p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="font-bold text-sm">Contact Us</span>
              </Link>
            </div>

            <div className="mt-16">
              <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Take me back home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
=======
=======
>>>>>>> origin/main
      <Seo
        title="Page not found"
        description="We couldn't find that page. Use the links below to find what you were looking for."
        noIndex
      />
      <main className="relative overflow-hidden">
        {/* Decorative background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/40 blur-3xl pointer-events-none" />

        <section className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center justify-center mb-8"
            >
              <span className="font-display text-[8rem] md:text-[12rem] font-bold leading-none text-gradient-primary tracking-tight">
                404
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              We can&apos;t find that page
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-2"
            >
              The link may be broken or the page may have moved. The shortcuts below should help
              you find what you were looking for.
            </motion.p>
            {pathname && pathname !== "/" && (
              <p className="text-xs text-muted-foreground/70 mb-10">
                Tried to load: <code className="px-1.5 py-0.5 rounded bg-muted">{pathname}</code>
              </p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
            >
              <Button asChild size="lg" className="rounded-full">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" /> Return home
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/search">
                  <Search className="mr-2 h-4 w-4" /> Search the site
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {quickLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group flex flex-col items-center text-center bg-card rounded-2xl border border-border/60 p-5 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <l.icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-sm text-foreground">{l.label}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{l.desc}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> origin/main
    </Layout>
  );
}
