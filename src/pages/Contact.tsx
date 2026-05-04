import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  School,
  Handshake,
  Briefcase,
  MoreHorizontal,
  Users,
  ArrowRight,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
<<<<<<< HEAD
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";
=======
import { Seo, SITE_URL, SITE_NAME, Breadcrumbs } from "@/components/Seo";
import {
  buildContactPageSchema, buildServiceSchema, ORG_SCHEMA, WEBSITE_SCHEMA,
} from "@/lib/json-ld";
>>>>>>> origin/main
import { useFormSubmit } from "@/hooks/use-form-submit";
import { fireConversion } from "@/components/Analytics";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import { email, ukPhone, personName, shortText, longMessage, maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";
<<<<<<< HEAD
import { Link } from "react-router-dom";

const CONTACT_WEBHOOK = import.meta.env.VITE_CONTACT_WEBHOOK as string | undefined;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
=======
import buildingImg from "@/assets/building-exterior.webp";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const contactInfo = [
  { icon: Phone, title: "Phone", main: "01782 365365", sub: "Mon-Fri 8:30am - 4:00pm" },
  { icon: Mail, title: "Email", main: "info@pathwayacademyzone.co.uk", sub: "We aim to respond within 24 hours" },
  { icon: MapPin, title: "Address", main: "Duncalf St, Burslem", sub: "Stoke-on-Trent ST6 3LJ" },
  { icon: Clock, title: "Opening Hours", main: "Monday - Friday", sub: "8:30am - 4:00pm" },
];

const CONTACT_WEBHOOK = import.meta.env.VITE_CONTACT_WEBHOOK as string | undefined;

// Minimal programme stubs — Service schema needs the catalogue structure
const PROGRAMME_STUBS = [
  { slug: "academic-re-engagement", title: "Academic Re-engagement", desc: "Structured academic curriculum for young people aged 11–16.", features: [], schedule: "Full-time or part-time", time: "Mon–Fri 9:30am–2:30pm", whoFor: "Students post-exclusion or at risk", outcomes: ["Improved attendance", "GCSE / functional skills"] },
  { slug: "vocational-learning",    title: "Vocational Learning",    desc: "Hands-on vocational skills programmes.", features: [], schedule: "1–2 days per week", time: "Varies", whoFor: "Practical learners", outcomes: ["Industry certificates", "Apprenticeship pathways"] },
  { slug: "semh-support",          title: "SEMH Support",           desc: "Therapeutic support for SEMH needs.", features: [], schedule: "Ongoing", time: "2–3 sessions per week", whoFor: "Students with SEMH barriers", outcomes: ["Emotional regulation", "Reduced anxiety"] },
  { slug: "personal-development",  title: "Personal Development",   desc: "Resilience and life-skills enrichment.", features: [], schedule: "Integrated", time: "2 hours per week", whoFor: "All students", outcomes: ["Resilience", "Self-esteem"] },
  { slug: "life-skills",           title: "Life Skills Programme",  desc: "Independent living and digital skills.", features: [], schedule: "Integrated", time: "Weekly", whoFor: "CLA and EHCP students", outcomes: ["Independent living skills"] },
  { slug: "employability-skills",  title: "Employability Skills",   desc: "Work-readiness for Year 10 & 11.", features: [], schedule: "Year 10 & 11", time: "Weekly", whoFor: "Year 10 and 11", outcomes: ["Employment-ready", "Positive destinations"] },
];

const contactSchema = [
  ORG_SCHEMA,
  WEBSITE_SCHEMA,
  buildContactPageSchema(),
  buildServiceSchema(PROGRAMME_STUBS),
];
>>>>>>> origin/main

const contactInfo = [
  { icon: Phone, title: "Phone", main: "01782 365365", sub: "Mon–Fri, 8:30am–4:00pm" },
  { icon: Mail, title: "Email", main: "info@pathwayacademyzone.co.uk", sub: "We aim to reply within 24 hours" },
  { icon: MapPin, title: "Address", main: "Duncalf Street, Burslem", sub: "Stoke-on-Trent, ST6 3LJ" },
  { icon: Clock, title: "Office Hours", main: "08:30 - 16:30", sub: "Term time only" },
];

const quickLinks = [
  { title: "Referrals", path: "/referral", desc: "How to refer a young person" },
  { title: "Centres", path: "/centres", desc: "Visit our learning locations" },
  { title: "Policies", path: "/policies", desc: "View safeguarding & conduct documents" },
];

const enquiryOptions: IllustratedOption[] = [
  { value: "parent-carer", label: "Parent / Carer", description: "Enquiry about your child", icon: Users },
  { value: "school-la", label: "School / Local Authority", description: "Referral or partnership enquiry", icon: School },
  { value: "partner", label: "Partner Organisation", description: "Charity, employer or service partner", icon: Handshake },
  { value: "careers", label: "Careers Enquiry", description: "Vacancies or speculative application", icon: Briefcase },
  { value: "general", label: "General Question", description: "Anything else we can help with", icon: MessageSquare },
  { value: "other", label: "Other", description: "Tell us more in your message", icon: MoreHorizontal },
];

const formSchema = z.object({
  firstName: personName({ required: true }),
  lastName: personName({ required: true }),
  email: email({ required: true }),
  phone: ukPhone({ required: true }),
  enquiryType: z.enum(["parent-carer", "school-la", "partner", "careers", "general", "other"], {
    required_error: "Please choose an enquiry type",
  }),
  organisation: shortText(120, false),
  message: longMessage(1000, true),
});
type FormValues = z.infer<typeof formSchema>;

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Pathway Academy Zone",
  "description": "Get in touch with Pathway Academy Zone in Stoke-on-Trent. Call, email, or send a message.",
  "url": `${SITE_URL}/contact`,
  "mainEntity": {
    "@type": "Organization",
    "name": SITE_NAME,
    "telephone": "+44-1782-365365",
    "email": "info@pathwayacademyzone.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Duncalf Street, Burslem",
      "addressLocality": "Stoke-on-Trent",
      "postalCode": "ST6 3LJ",
      "addressCountry": "GB"
    }
  }
};

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", enquiryType: undefined, organisation: "", message: "" },
    mode: "onTouched",
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<FormValues & { phone_e164?: string }>({
    url: CONTACT_WEBHOOK,
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

  const phone = watch("phone");

  return (
    <Layout>
      <Seo
        title="Contact Us"
        description="Get in touch with Pathway Academy Zone in Stoke-on-Trent. Call, email, or send a message — Mon–Fri 8:30am–4:00pm."
        jsonLd={contactSchema}
      />
<<<<<<< HEAD
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Contact" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Contact Us</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Get in touch with our team to discuss referrals, partnerships, or general enquiries.
            </p>
          </div>
=======
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img src={buildingImg} alt="Pathway Academy Zone building" className="w-full h-full object-cover" width="1920" height="1080" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-scrim/60" />
>>>>>>> origin/main
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16">
            <motion.aside variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                <Send className="w-3 h-3" /> Reach Out
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">Contact Details</h2>
              <div className="space-y-6 mb-10">
                {contactInfo.map((c) => (
                  <div key={c.title} className="flex items-start gap-5 p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <c.icon className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm uppercase tracking-widest mb-1">{c.title}</p>
                      <p className="text-foreground font-medium">{c.main}</p>
                      <p className="text-muted-foreground text-xs mt-1">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
<<<<<<< HEAD
              <Button asChild variant="outline" className="w-full rounded-full h-14 font-bold border-2">
                <a
                  href="https://maps.google.com/?q=Duncalf+St+Burslem+Stoke-on-Trent+ST6+3LJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </motion.aside>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="bg-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50">
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">Send a Message</h2>
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      id="contact-name"
                      label="Your Name"
=======
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2397.8584766858147!2d-2.1916!3d53.0447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a6836a0d0f8eb%3A0x0!2sDuncalf%20St%2C%20Burslem%2C%20Stoke-on-Trent%20ST6%203LJ%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="300"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pathway Academy Zone Location"
                className="rounded-xl border-0"
              />
            </motion.aside>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={onSubmit} noValidate className="bg-card rounded-2xl p-8 border border-border/50 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    id="contact-firstname"
                    label="First Name"
                    required
                    placeholder="First name"
                    autoComplete="given-name"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                  <FormField
                    id="contact-lastname"
                    label="Last Name"
                    required
                    placeholder="Last name"
                    autoComplete="family-name"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    id="contact-email"
                    label="Email Address"
                    required
                    type="email"
                    inputMode="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <FormField
                    id="contact-phone"
                    label="Phone Number"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="07123 456789"
                    hint="UK landline or mobile"
                    value={phone || ""}
                    onChange={(e) => setValue("phone", maskUkPhone((e.target as HTMLInputElement).value), { shouldValidate: true })}
                    error={errors.phone?.message}
                  />
                </div>

                <FormField
                  id="contact-org"
                  label="Organisation (if applicable)"
                  placeholder="School, Local Authority, etc."
                  autoComplete="organization"
                  error={errors.organisation?.message}
                  {...register("organisation")}
                />

                <Controller
                  name="enquiryType"
                  control={control}
                  render={({ field }) => (
                    <IllustratedRadio
                      name="enquiryType"
                      legend="What's your enquiry about?"
                      hint="Pick the closest match — we'll route your message to the right team."
                      options={enquiryOptions}
                      value={field.value || ""}
                      onChange={field.onChange}
>>>>>>> origin/main
                      required
                      placeholder="Full name"
                      autoComplete="name"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <FormField
                      id="contact-email"
                      label="Email Address"
                      required
                      type="email"
                      inputMode="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      id="contact-phone"
                      label="Phone Number"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="01782 365365"
                      hint="UK landline or mobile"
                      value={phone || ""}
                      onChange={(e) => setValue("phone", maskUkPhone((e.target as HTMLInputElement).value), { shouldValidate: true })}
                      error={errors.phone?.message}
                    />
                    <FormField
                      id="contact-org"
                      label="Organisation (if applicable)"
                      placeholder="School, Local Authority, etc."
                      autoComplete="organization"
                      error={errors.organisation?.message}
                      {...register("organisation")}
                    />
                  </div>

                  <Controller
                    name="enquiryType"
                    control={control}
                    render={({ field }) => (
                      <IllustratedRadio
                        name="enquiryType"
                        legend="How can we help?"
                        hint="Choose the closest match for your enquiry."
                        options={enquiryOptions}
                        value={field.value || ""}
                        onChange={field.onChange}
                        required
                        columns={2}
                        error={errors.enquiryType?.message}
                      />
                    )}
                  />

<<<<<<< HEAD
                  <FormField
                    as="textarea"
                    id="contact-message"
                    label="Your Message"
                    required
                    rows={5}
                    placeholder="Tell us a bit more about your enquiry..."
                    maxLength={1000}
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  <div className="pt-4">
                    <Button type="submit" size="xl" disabled={loading} className="w-full rounded-full h-16 text-lg font-bold shadow-xl shadow-primary/20">
                      {loading ? (
                        <span className="inline-flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending Message...</span>
                      ) : ("Send Message")}
                    </Button>

                    {success && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-sm font-bold text-primary mt-6 bg-primary/10 p-4 rounded-xl">
                        <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Message sent — we&apos;ll reply within 24 hours.
                      </motion.p>
                    )}
                    {error && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-sm font-bold text-destructive mt-6 bg-destructive/10 p-4 rounded-xl">
                        <AlertCircle className="h-5 w-5" aria-hidden="true" /> {error}
                      </motion.p>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center uppercase font-bold tracking-widest">By submitting this form, you agree to our privacy policy.</p>
                </form>
              </div>
=======
                <div aria-live="polite" aria-atomic="true">
                  {success && (
                    <p className="flex items-center justify-center gap-2 text-xs font-medium text-primary">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Message sent — we&apos;ll reply within 24 hours.
                    </p>
                  )}
                  {error && (
                    <p role="alert" className="flex items-center justify-center gap-2 text-xs font-medium text-destructive">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" /> {error}
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground text-center">By submitting this form, you agree to our privacy policy.</p>
              </form>
>>>>>>> origin/main
            </motion.div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Navigation</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">Looking for Specifics?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {quickLinks.map((l) => (
              <Link key={l.path} to={l.path} title={l.title} className="bg-card rounded-[2rem] p-8 border border-border/50 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <ArrowRight className="w-16 h-16" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{l.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{l.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest group-hover:gap-3 transition-all">
                   Visit Page <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
=======
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
>>>>>>> origin/main
          </div>
        </div>
      </section>
    </Layout>
  );
}
