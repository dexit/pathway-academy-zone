import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { HUB_SECTIONS } from "@/config/data/knowledge-hub";
import { motion } from "framer-motion";

export default function KnowledgeHubCategory() {
  const { categoryId } = useParams();
  const section = HUB_SECTIONS.find((s) => s.id === categoryId);

  if (!section) {
    return (
      <Layout>
        <Seo title="Repo Not Found" noIndex />
        <main className="min-h-screen bg-background flex items-center justify-center py-24 text-center">
          <div className="max-w-md px-4">
             <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block">SYSTEM ERROR</span>
            <h1 className="text-6xl font-black uppercase italic mb-8">404.</h1>
            <Link to="/knowledge-hub" className="text-primary font-black uppercase tracking-widest hover:underline">
              REBOOT TO HUB
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo title={section.title} description={section.description} />

      <header className="pt-40 pb-24 bg-accent/30 border-b border-border/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumbs
              items={[
                { label: "Knowledge Hub", to: "/knowledge-hub" },
                { label: section.title },
              ]}
              className="mb-8"
            />
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block">REPOSITORY</span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl mb-8 tracking-tighter uppercase italic">
              {section.title.split(' ').map((w, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-primary' : ''}>{w} </span>
              ))}
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl leading-tight font-medium">
              {section.description}
            </p>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {section.resources.map((resource, i) => (
            <motion.div
               key={resource.href}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
               viewport={{ once: true }}
            >
              <Link
                to={resource.href}
                className="flex items-center justify-between p-10 bg-card rounded-2xl border-2 border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all group active:scale-[0.98]"
              >
                <span className="text-xl font-bold uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">
                  {resource.title}
                </span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
           <Link
            to="/knowledge-hub"
            className="inline-flex items-center gap-4 text-muted-foreground hover:text-primary transition-all font-black uppercase tracking-[0.2em] text-sm"
          >
            <ArrowLeft className="w-5 h-5" /> BACK TO CENTRAL HUB
          </Link>
        </div>
      </div>
    </Layout>
  );
}
