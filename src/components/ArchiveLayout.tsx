import { ReactNode } from "react";
import Layout from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { ContentSidebar } from "@/components/ContentSidebar";
import type { ComponentProps } from "react";

interface ArchiveLayoutProps {
  /** Breadcrumb trail items (last item is the current page). */
  crumbs: { label: string; to?: string }[];
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Sidebar configuration — passed straight to ContentSidebar. */
  sidebar?: ComponentProps<typeof ContentSidebar>;
  /** Optional element rendered above the main column (e.g. featured card). */
  beforeMain?: ReactNode;
  children: ReactNode;
}

/**
 * Unified archive page chrome shared by Blog, News, FAQs, Policies, Search.
 * Provides: primary header band → optional `beforeMain` slot →
 * two-column grid (main + ContentSidebar). Keeps spacing and breakpoints
 * consistent so every archive feels like part of one system.
 */
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
      <PageHero
        breadcrumbs={crumbs}
        eyebrow={eyebrow}
        heading={title}
        subheading={intro}
        padding="py-14 md:py-20"
      />

      <div className="container mx-auto px-4 py-10 md:py-16">
        {beforeMain && <div className="mb-10">{beforeMain}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          <div className="space-y-8 min-w-0">{children}</div>
          {sidebar && <ContentSidebar {...sidebar} />}
        </div>
      </div>
    </Layout>
  );
}
