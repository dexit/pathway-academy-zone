import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-6xl font-bold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground text-lg mb-8">Page not found</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
