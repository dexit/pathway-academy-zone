import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <Layout>
      <Seo title="Error 404" noIndex />
      <section className="min-h-[70vh] flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <span className="text-primary font-black text-xs uppercase tracking-[0.5em] mb-8 block">SYSTEM ERROR</span>
          <h1 className="text-8xl md:text-[15rem] mb-8 tracking-tighter italic">404.</h1>
          <p className="text-muted-foreground text-xl md:text-2xl mb-12 max-w-md mx-auto font-medium">
            The path you are looking for does not exist in this timeline.
          </p>
          <Button asChild size="lg" variant="hero" className="px-12">
            <Link to="/">REBOOT TO HOME</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
