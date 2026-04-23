import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Search, Compass, BookOpen, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

const quickLinks = [
  { to: "/", icon: Home, label: "Home", desc: "Back to the start" },
  { to: "/programmes", icon: Compass, label: "Programmes", desc: "What we offer" },
  { to: "/knowledge-hub", icon: BookOpen, label: "Knowledge Hub", desc: "Guides & references" },
  { to: "/contact", icon: Phone, label: "Contact", desc: "Speak to our team" },
];

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <Layout>
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
    </Layout>
  );
}
