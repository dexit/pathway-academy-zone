import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone, Mail, MapPin, Clock, ExternalLink,
  HandHeart, Briefcase, MessageSquare,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Seo, SITE_URL } from "@/components/Seo";
import {
  buildContactPageSchema, buildServiceSchema, ORG_SCHEMA, WEBSITE_SCHEMA,
} from "@/lib/json-ld";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { usePostcodeLookup } from "@/hooks/use-postcode-lookup";
import { fireConversion } from "@/components/Analytics";
import { FormBuilder } from "@/components/forms/FormBuilder";
import { CONTACT_FORM_META, contactSchema, type ContactValues } from "@/lib/form-configs/contact";
import { normaliseUkPhone } from "@/lib/uk-validators";
import { PageHero } from "@/components/PageHero";
import { LIVE_CONTENT } from "@/data/live-site-content";
import buildingImg from "@/assets/programmes/building-exterior-CdR2heuW.webp";
import { MapEmbed } from "@/components/MapEmbed";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const contactInfoItems = [
  { icon: Phone, title: "Phone", main: LIVE_CONTENT.contact.contactInfo.phone, sub: LIVE_CONTENT.contact.contactInfo.phoneHours },
  { icon: Mail, title: "Email", main: LIVE_CONTENT.contact.contactInfo.email, sub: LIVE_CONTENT.contact.contactInfo.emailResponse },
  { icon: MapPin, title: "Address", main: LIVE_CONTENT.contact.contactInfo.address, sub: LIVE_CONTENT.contact.contactInfo.hours },
];

// Minimal programme stubs — Service schema needs the catalogue structure
const PROGRAMME_STUBS = [
  { slug: "academic-re-engagement", title: "Academic Re-engagement", desc: "Structured academic curriculum for young people aged 11–16.", features: [], schedule: "Full-time or part-time", time: "Mon–Fri 9:30am–2:30pm", whoFor: "Students post-exclusion or at risk", outcomes: ["Improved attendance", "GCSE / functional skills"] },
  { slug: "vocational-learning",    title: "Vocational Learning",    desc: "Hands-on vocational skills programmes.", features: [], schedule: "1–2 days per week", time: "Varies", whoFor: "Practical learners", outcomes: ["Industry certificates", "Apprenticeship pathways"] },
  { slug: "semh-support",          title: "SEMH Support",           desc: "Therapeutic support for SEMH needs.", features: [], schedule: "Ongoing", time: "2–3 sessions per week", whoFor: "Students with SEMH barriers", outcomes: ["Emotional regulation", "Reduced anxiety"] },
  { slug: "personal-development",  title: "Personal Development",   desc: "Resilience and life-skills enrichment.", features: [], schedule: "Integrated", time: "2 hours per week", whoFor: "All students", outcomes: ["Resilience", "Self-esteem"] },
  { slug: "life-skills",           title: "Life Skills Programme",  desc: "Independent living and digital skills.", features: [], schedule: "Integrated", time: "Weekly", whoFor: "CLA and EHCP students", outcomes: ["Independent living skills"] },
  { slug: "employability-skills",  title: "Employability Skills",   desc: "Work-readiness for Year 10 & 11.", features: [], schedule: "Year 10 & 11", time: "Weekly", whoFor: "Year 10 and 11", outcomes: ["Employment-ready", "Positive destinations"] },
];

const pageJsonLd = [
  ORG_SCHEMA,
  WEBSITE_SCHEMA,
  buildContactPageSchema(),
  buildServiceSchema(PROGRAMME_STUBS),
];

const quickLinks = LIVE_CONTENT.contact.quickLinks.map((link) => ({
  title: link.title,
  desc: link.description,
  path: "/" + link.title.toLowerCase().replace(/\s+/g, "-"),
}));

export default function Contact() {
  const { toast } = useToast();
  const { lookup: lookupPostcode } = usePostcodeLookup();

  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", postcode: "", enquiryType: undefined, organisation: "", message: "" },
    mode: "onTouched",
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<ContactValues & { phone_e164?: string }>({
    url: import.meta.env.VITE_CONTACT_WEBHOOK as string | undefined,
    method: "POST",
    format: "json",
    extra: { source: "contact-form", site: SITE_URL },
    onSuccess: () => {
      fireConversion("contact_submit");
      toast({ title: "Message sent", description: "Thank you. We'll be in touch within 24 hours." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Couldn't send message", description: err instanceof Error ? err.message : "Please try again." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
    await submit({ ...values, phone_e164: normaliseUkPhone(values.phone || "") });
  });

  return (
    <Layout>
      <Seo
        title="Contact Pathway Academy Zone"
        description="Get in touch with Pathway Academy Zone in Stoke-on-Trent. Call, email, or send a message — Mon–Fri 8:30am–4:00pm."
        jsonLd={pageJsonLd}
      />

      <PageHero
        variant="image"
        imageSrc={buildingImg}
        imageAlt="Pathway Academy Zone building exterior"
        align="center"
        badge={{ label: "Contact Us", icon: MessageSquare }}
        breadcrumbs={[{ label: "Contact" }]}
        heading="Get in Touch"
        subheading="Whether you have a question, want to arrange a visit, or need to discuss a referral, we're here to help."
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4 mb-8">
                {contactInfoItems.map((c) => (
                  <div key={c.title} className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50 bg-accent/50">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{c.title}</p>
                      {c.title === "Phone" ? (
                        <>
                          <a href={`tel:${c.main.replace(/\s/g, "")}`} itemProp="telephone" className="text-foreground text-sm hover:underline">{c.main}</a>
                          <p className="text-muted-foreground text-xs">{c.sub}</p>
                        </>
                      ) : c.title === "Email" ? (
                        <>
                          <a href={`mailto:${c.main}`} itemProp="email" className="text-foreground text-sm hover:underline">{c.main}</a>
                          <p className="text-muted-foreground text-xs">{c.sub}</p>
                        </>
                      ) : c.title === "Address" ? (
                        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                          <a
                            href={`https://maps.google.com/?q=${c.main.replace(/ /g, "+")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground text-sm hover:underline"
                          >
                            <span itemProp="streetAddress">{c.main}</span>
                          </a>
                          <p className="text-muted-foreground text-xs">
                            <span itemProp="addressLocality">Stoke-on-Trent</span>{" "}
                            <span itemProp="postalCode">ST6 3LJ</span>
                          </p>
                        </div>
                      ) : (
                        <>
                          <p className="text-foreground text-sm">{c.main}</p>
                          <p className="text-muted-foreground text-xs">{c.sub}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <MapEmbed height={300} />
            </motion.aside>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <FormBuilder
                  config={CONTACT_FORM_META}
                  register={register}
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                  loading={loading}
                  error={error}
                  success={success}
                  onSubmit={onSubmit}
                />
                <p className="text-xs text-muted-foreground text-center mt-4">By submitting this form, you agree to our privacy policy.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-3">Quick Links</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Looking for Something Specific?</h2>
            <p className="text-muted-foreground">Skip the form — jump straight to the page you need.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {quickLinks.map((l, i) => {
              const icons = [HandHeart, MapPin, Briefcase];
              const Icon = icons[i] || ExternalLink;
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  title={l.title}
                  className="group relative bg-card rounded-2xl p-7 border border-border/60 hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" aria-hidden />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-1.5 group-hover:text-primary transition-colors">{l.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{l.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Open page <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
