import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";

export default function CookiePolicy() {
  return (
    <Layout>
      <Seo
        title="Cookie Policy"
        description="What cookies and similar technologies Pathway Academy Zone uses on this website, and how to control them."
        canonical="https://pathwayacademyzone.co.uk/cookie-policy"
      />
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} className="mb-6" />
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: 7 May 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 [&_h2]:text-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:font-semibold hover:[&_a]:underline [&_li]:text-muted-foreground">
          <h2>1. What are cookies?</h2>
          <p>Cookies are small text files placed on your device when you visit a website. They help the site work and provide information to the site owner.</p>

          <h2>2. Cookies we use</h2>
          <ul>
            <li><strong>Strictly necessary</strong> — keep the site secure, remember theme preference, and route you correctly. These cannot be disabled.</li>
            <li><strong>Analytics (optional)</strong> — anonymised page views and Web Vitals to improve performance. Loaded only with your consent.</li>
          </ul>

          <h2>3. We do not use</h2>
          <p>Advertising, tracking or third-party marketing cookies.</p>

          <h2>4. Managing cookies</h2>
          <p>You can clear or block cookies in your browser settings at any time. Blocking strictly-necessary cookies may break parts of the site.</p>

          <h2>5. More information</h2>
          <p>See our <a href="/privacy-policy">Privacy Policy</a> for how we handle personal data, or contact <a href="mailto:dpo@pathwayacademyzone.co.uk">dpo@pathwayacademyzone.co.uk</a>.</p>
        </div>
      </article>
    </Layout>
  );
}
