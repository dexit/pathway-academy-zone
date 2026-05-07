import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";

export default function Terms() {
  return (
    <Layout>
      <Seo
        title="Terms & Conditions"
        description="The terms and conditions for using the Pathway Academy Zone website and services."
        canonical="https://pathwayacademyzone.co.uk/terms"
      />
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <Breadcrumbs items={[{ label: "Terms & Conditions" }]} className="mb-6" />
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: 7 May 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 [&_h2]:text-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:font-semibold hover:[&_a]:underline [&_li]:text-muted-foreground">
          <h2>1. About these terms</h2>
          <p>These terms govern your use of pathwayacademyzone.co.uk (the “Site”), operated by Pathway Academy Zone, Duncalf Street, Burslem, Stoke-on-Trent ST6 3LJ. By using the Site you agree to these terms.</p>

          <h2>2. Use of the Site</h2>
          <p>You may view, download and print pages from the Site for your own personal or organisational use, subject to the restrictions below. You must not modify the digital or paper copies in any way.</p>

          <h2>3. Intellectual property</h2>
          <p>All content on the Site (text, images, logos, design) is owned by or licensed to Pathway Academy Zone and protected by UK and international copyright. You may not republish, sell or commercially exploit content without prior written permission.</p>

          <h2>4. Referrals and enquiries</h2>
          <p>Submission of a referral or enquiry does not create a contract for placement. Placements are confirmed in writing following assessment and commissioning agreement.</p>

          <h2>5. Accuracy of information</h2>
          <p>We take care to ensure information is accurate and up to date but make no warranty as to its completeness or fitness for any particular purpose. Statutory information takes precedence where applicable.</p>

          <h2>6. Linked sites</h2>
          <p>Links to third-party sites are provided for convenience. We are not responsible for their content or privacy practices.</p>

          <h2>7. Liability</h2>
          <p>To the fullest extent permitted by law, we exclude liability for any indirect, incidental or consequential loss arising from use of the Site. Nothing in these terms limits liability for death, personal injury caused by negligence, or fraud.</p>

          <h2>8. Governing law</h2>
          <p>These terms are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction.</p>

          <h2>9. Contact</h2>
          <p>Questions about these terms: <a href="mailto:info@pathwayacademyzone.co.uk">info@pathwayacademyzone.co.uk</a> · 01782 365365.</p>
        </div>
      </article>
    </Layout>
  );
}
