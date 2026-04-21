import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, FileText, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { TocItem } from "@/hooks/useTableOfContents";

export interface ContentSidebarProps {
  toc?: {
    items: TocItem[];
    activeId: string;
  };
  ctas?: {
    label: string;
    description: string;
    href: string;
    tone?: "primary" | "muted";
  }[];
  quickContact?: {
    phone: string;
    email: string;
  };
}

export function ContentSidebar({ toc, ctas, quickContact }: ContentSidebarProps) {
  return (
    <div className="space-y-10 sticky top-24">
      {/* Table of Contents */}
      {toc && toc.items.length > 0 && (
        <nav aria-label="On this page" className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
          <h3 className="font-display font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-primary rounded-full" />
            On this page
          </h3>
          <ul className="space-y-4">
            {toc.items.map((item) => (
              <li
                key={item.id}
                className={`${item.level === 3 ? "pl-4" : ""}`}
              >
                <a
                  href={`#${item.id}`}
                  className={`group flex items-start gap-2 text-sm transition-all ${
                    toc.activeId === item.id
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ChevronRight className={`h-3.5 w-3.5 mt-0.5 shrink-0 transition-transform ${
                    toc.activeId === item.id ? "translate-x-0.5" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  }`} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Actionable CTAs */}
      {ctas && ctas.map((cta) => (
        <div
          key={cta.href}
          className={`rounded-3xl p-8 border transition-all ${
            cta.tone === "primary"
              ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-card border-border/50 text-foreground"
          }`}
        >
          <h4 className="font-display font-bold text-lg mb-2">{cta.label}</h4>
          <p className={`text-sm mb-6 ${cta.tone === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {cta.description}
          </p>
          <Button
            asChild
            variant={cta.tone === "primary" ? "secondary" : "outline"}
            className="w-full rounded-full font-bold"
          >
            <Link to={cta.href}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ))}

      {/* Quick Contact */}
      {quickContact && (
        <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
          <h4 className="font-display font-bold text-foreground mb-6">Need assistance?</h4>
          <div className="space-y-5">
            <a
              href={`tel:${quickContact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-border/50 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Phone className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Call our team</span>
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{quickContact.phone}</span>
              </div>
            </a>
            <a
              href={`mailto:${quickContact.email}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-border/50 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Email us</span>
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{quickContact.email}</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
