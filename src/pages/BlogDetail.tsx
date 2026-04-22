import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { BLOG_POSTS } from "@/config/data/blog";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { ContentSidebar } from "@/components/ContentSidebar";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Layout><div className="py-20 text-center">Post not found</div></Layout>;
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} image={post.image} type="article" />

      <section className="pt-40 pb-24 bg-accent/30 border-b border-border/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} className="mb-8" />
          <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">{post.category} — {post.date}</span>
          <h1 className="text-5xl md:text-8xl tracking-tighter uppercase italic max-w-5xl">{post.title}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 lg:gap-24 items-start">
          <article className="prose prose-xl prose-primary dark:prose-invert max-w-none">
            <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 border-2 border-border/50">
              <img src={post.image} className="w-full h-full object-cover" alt="" />
            </div>
            <p className="lead text-2xl font-medium text-muted-foreground">{post.excerpt}</p>
            <div className="h-px w-full bg-border/20 my-12" />
            <div className="space-y-8">
              <p>This is a placeholder for the blog content. In a production environment, this would be dynamically rendered from a CMS or markdown files.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </article>

          <aside className="sticky top-32">
            <ContentSidebar
              ctas={[
                { label: "Make a Referral", href: "/referral", tone: "primary" },
                { label: "Contact Team", href: "/contact" }
              ]}
              quickContact={{ phone: "01782 365365", email: "info@pathwayacademyzone.co.uk" }}
            />
          </aside>
        </div>

        <div className="mt-32 pt-20 border-t border-border/20">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">NEXT <span className="text-primary">INTEL.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(p => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
}
