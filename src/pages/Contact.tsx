import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, ExternalLink, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Seo, SITE_URL, SITE_NAME } from "@/components/Seo";
import { useFormSubmit } from "@/hooks/use-form-submit";
import buildingImg from "@/assets/building-exterior.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const contactInfo = [
  { icon: Phone, title: "Phone", main: "01782 365365", sub: "Mon-Fri 8:30am - 4:00pm" },
  { icon: Mail, title: "Email", main: "info@pathwayacademyzone.co.uk", sub: "We aim to respond within 24 hours" },
  { icon: MapPin, title: "Address", main: "Duncalf St, Burslem", sub: "Stoke-on-Trent ST6 3LJ" },
  { icon: Clock, title: "Opening Hours", main: "Monday - Friday", sub: "8:30am - 4:00pm" },
];

const CONTACT_WEBHOOK = import.meta.env.VITE_CONTACT_WEBHOOK as string | undefined;

// Rich LocalBusiness / EducationalOrganization schema with full ContactPoint
// + openingHoursSpecification so crawlers surface hours, phone, and address.
const contactSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+44-1782-365365",
  email: "info@pathwayacademyzone.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Duncalf Street, Burslem",
    addressLocality: "Stoke-on-Trent",
    postalCode: "ST6 3LJ",
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.043, longitude: -2.191 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "16:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+44-1782-365365",
      email: "info@pathwayacademyzone.co.uk",
      areaServed: "GB",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "referrals",
      telephone: "+44-1782-365365",
      email: "referrals@pathwayacademyzone.co.uk",
    },
  ],
};
const quickLinks = [
  { title: "Make a Referral", desc: "Start the referral process for a young person", path: "/referral" },
  { title: "Visit Our Centre", desc: "See our facilities and meet the team", path: "/centres" },
  { title: "Join Our Team", desc: "View current vacancies and opportunities", path: "/careers" },
];

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", organisation: "", message: "" });

  const { submit, loading, error, success, reset } = useFormSubmit<typeof form>({
    url: CONTACT_WEBHOOK,
    method: "POST",
    format: "json",
    extra: { source: "contact-form", site: SITE_URL },
    onSuccess: () =>
      toast({
        title: "Message sent",
        description: "Thank you. We'll be in touch within 24 hours.",
      }),
    onError: (err) =>
      toast({
        variant: "destructive",
        title: "Couldn't send message",
        description: err instanceof Error ? err.message : "Please try again.",
      }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(form);
  };
  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (success || error) reset();
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Layout>
      <Seo
        title="Contact Us"
        description="Get in touch with Pathway Academy Zone in Stoke-on-Trent. Call, email, or send a message — Mon–Fri 8:30am–4:00pm."
        jsonLd={contactSchema}
      />
      <section className="relative py-32">
        <div className="absolute inset-0"><img src={buildingImg} alt="Pathway Academy Zone building" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-foreground/60" /></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4 backdrop-blur-sm border border-primary-foreground/20">Contact Us</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Get in Touch</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Whether you have a question, want to arrange a visit, or need to discuss a referral, we're here to help.</p>
        </div>
      </section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>
          <div className="space-y-4 mb-8">{contactInfo.map((c) => (<div key={c.title} className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><c.icon className="h-5 w-5 text-primary" /></div><div><p className="font-medium text-foreground text-sm">{c.title}</p><p className="text-foreground text-sm">{c.main}</p><p className="text-muted-foreground text-xs">{c.sub}</p></div></div>))}</div>
          <a href="https://maps.google.com/?q=Duncalf+St+Burslem+Stoke-on-Trent+ST6+3LJ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">Open in Maps <ExternalLink className="h-4 w-4" /></a>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border/50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Your Name *</label><input required value={form.name} onChange={update("name")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" placeholder="Full name" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label><input required type="email" value={form.email} onChange={update("email")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" placeholder="your@email.com" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Phone Number</label><input value={form.phone} onChange={update("phone")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" placeholder="01782 000 000" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Enquiry Type *</label><select required value={form.type} onChange={update("type")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"><option value="">Select type</option><option>Referral Enquiry</option><option>Arrange a Visit</option><option>Partnership Enquiry</option><option>Careers Enquiry</option><option>General Question</option><option>Other</option></select></div>
            </div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Organisation (if applicable)</label><input value={form.organisation} onChange={update("organisation")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" placeholder="School, Local Authority, etc." /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Your Message *</label><textarea required value={form.message} onChange={update("message")} rows={5} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" placeholder="How can we help you?" /></div>
            <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
            {success && (
              <p className="flex items-center justify-center gap-2 text-xs font-medium text-primary">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Message sent — we&apos;ll reply within 24 hours.
              </p>
            )}
            {error && (
              <p className="flex items-center justify-center gap-2 text-xs font-medium text-destructive">
                <AlertCircle className="h-4 w-4" aria-hidden="true" /> {error}
              </p>
            )}
            <p className="text-xs text-muted-foreground text-center">By submitting this form, you agree to our privacy policy.</p>
          </form>
        </motion.div>
      </div></div></section>
      <section className="py-16 bg-muted/50"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-10">Looking for Something Specific?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">{quickLinks.map((l) => (<Link key={l.path} to={l.path} className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-md transition-shadow group"><h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{l.title}</h3><p className="text-muted-foreground text-sm">{l.desc}</p></Link>))}</div>
      </div></section>
    </Layout>
  );
}
