import { ReactNode } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Breadcrumbs } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";
import type { ComponentProps } from "react";

interface ArchiveLayoutProps {
  crumbs: { label: string; to?: string }[];
  eyebrow?: string;
  title: string;
  intro?: string;
  sidebar?: ComponentProps<typeof ContentSidebar>;
  beforeMain?: ReactNode;
  children: ReactNode;
}

export function ArchiveLayout({
  crumbs,
  eyebrow = "Pathway Academy Zone",
  title,
  intro,
  sidebar,
  beforeMain,
  children,
}: ArchiveLayoutProps) {
  return (
    <Layout>
      <section className="pt-40 pb-24 bg-accent/30 border-b border-border/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Breadcrumbs
              items={crumbs}
              className="mb-8"
            />
            {eyebrow && (
              <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                {eyebrow}
              </span>
            )}
            <h1 className="text-5xl md:text-8xl lg:text-9xl mb-8 tracking-tighter uppercase italic">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? "text-primary" : ""}>{word} </span>
              ))}
            </h1>
            {intro && (
              <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl leading-tight font-medium">
                {intro}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 md:py-32">
        {beforeMain && <div className="mb-20">{beforeMain}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 lg:gap-24 items-start">
          <div className="space-y-12 min-w-0">{children}</div>
          {sidebar && (
            <aside className="sticky top-32">
              <ContentSidebar {...sidebar} />
            </aside>
          )}
        </div>
      </div>
    </Layout>
  );
}
