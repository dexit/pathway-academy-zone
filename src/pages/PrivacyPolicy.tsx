import Layout from "@/components/Layout";
import { Seo, Breadcrumbs } from "@/components/Seo";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Seo
        title="Privacy Policy"
        description="How Pathway Academy Zone collects, uses, stores, and protects personal data in line with UK GDPR and the Data Protection Act 2018."
        canonical="https://pathwayacademyzone.co.uk/privacy-policy"
      />
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} className="mb-6" />
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: 7 May 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 [&_h2]:text-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_a]:text-primary [&_a]:font-semibold hover:[&_a]:underline [&_li]:text-muted-foreground">
          <h2>1. Who we are</h2>
          <p>Pathway Academy Zone (“we”, “us”, “our”) is the data controller for personal data processed in connection with our Alternative Provision services in Stoke-on-Trent and Staffordshire. Registered office: Duncalf Street, Burslem, Stoke-on-Trent ST6 3LJ.</p>

          <h2>2. What data we collect</h2>
          <ul>
            <li>Identity &amp; contact details (name, role, email, phone, school/organisation)</li>
            <li>Referral information (where lawfully shared by a school, Local Authority or parent)</li>
            <li>Safeguarding and SEND information necessary to plan provision</li>
            <li>Website analytics (anonymised IP, page views, device type)</li>
          </ul>

          <h2>3. Lawful bases</h2>
          <p>We process personal data under one or more of: consent, contract, legal obligation, vital interests, public task (education), and legitimate interests.</p>

          <h2>4. How we use your data</h2>
          <ul>
            <li>To deliver education, safeguarding and pastoral support</li>
            <li>To respond to enquiries and process referrals</li>
            <li>To meet statutory reporting duties to the DfE, Local Authorities and Ofsted</li>
            <li>To improve our website and communications</li>
          </ul>

          <h2>5. Sharing</h2>
          <p>We share data only with: commissioning schools and Local Authorities, statutory partners (police, social care, health where required), examination bodies, and trusted processors (hosting, email, analytics) under written agreement. We do not sell personal data.</p>

          <h2>6. Retention</h2>
          <p>Pupil records are retained in line with the IRMS Toolkit for Schools. Enquiries are retained for 12 months unless they progress to a referral.</p>

          <h2>7. Your rights</h2>
          <p>Under UK GDPR you have the right to access, rectify, erase, restrict, port and object to processing of your data, and to withdraw consent. Contact <a href="mailto:dpo@pathwayacademyzone.co.uk">dpo@pathwayacademyzone.co.uk</a> to exercise these rights. You may also complain to the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">Information Commissioner’s Office</a>.</p>

          <h2>8. Security</h2>
          <p>We apply appropriate technical and organisational measures including encryption in transit, role-based access, and staff DBS checks and training.</p>

          <h2>9. Contact</h2>
          <p>Data Protection: <a href="mailto:dpo@pathwayacademyzone.co.uk">dpo@pathwayacademyzone.co.uk</a> · 01782 365365.</p>
        </div>
      </article>
    </Layout>
  );
}
