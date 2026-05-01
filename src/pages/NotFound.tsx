import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <Seo title="404 - Page Not Found" noIndex />
      <section className="min-h-[70vh] flex items-center justify-center py-24 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">Page not found</h2>
          <p className="text-muted-foreground text-lg mb-12 text-balance">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" className="rounded-full px-10 h-16 font-bold shadow-lg shadow-primary/20">
              <Link to="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Home Page
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full px-10 h-16 font-bold">
              <Link to="/knowledge-hub">
                Knowledge Hub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
