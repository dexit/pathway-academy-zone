import { ReactNode } from "react";
import Layout from "./Layout";
import { Breadcrumbs, Crumb } from "./Seo";
import { ContentSidebar, ContentSidebarProps } from "./ContentSidebar";

interface ArchiveLayoutProps {
  children: ReactNode;
  title: string;
  intro?: string;
  eyebrow?: string;
  crumbs: Crumb[];
  sidebar?: ContentSidebarProps;
}

export function ArchiveLayout({
  children,
  title,
  intro,
  eyebrow,
  crumbs,
  sidebar,
}: ArchiveLayoutProps) {
  return (
    <Layout>
      <header className="bg-primary pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={crumbs}
              className="text-white/60 mb-8 md:mb-12 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white"
            />

            {eyebrow && (
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-sm border border-white/10">
                {eyebrow}
              </span>
            )}

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {title}
            </h1>

            {intro && (
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
                {intro}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-20">
          <main className="min-w-0">
            {children}
          </main>

          {sidebar && (
            <aside className="hidden lg:block">
              <ContentSidebar {...sidebar} />
            </aside>
          )}
        </div>
      </div>
    </Layout>
  );
}
