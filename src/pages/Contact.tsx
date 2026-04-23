import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Phone, Mail, MapPin, Clock, ExternalLink, Loader2, CheckCircle2, AlertCircle,
  HandHeart, School, Handshake, Briefcase, MessageSquare, MoreHorizontal,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Seo, SITE_URL, SITE_NAME, Breadcrumbs } from "@/components/Seo";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import { email, ukPhone, personName, shortText, longMessage, maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";
import buildingImg from "@/assets/building-exterior.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const contactInfo = [
  { icon: Phone, title: "Phone", main: "01782 365365", sub: "Mon-Fri 8:30am - 4:00pm" },
  { icon: Mail, title: "Email", main: "info@pathwayacademyzone.co.uk", sub: "We aim to respond within 24 hours" },
  { icon: MapPin, title: "Address", main: "Duncalf St, Burslem", sub: "Stoke-on-Trent ST6 3LJ" },
  { icon: Clock, title: "Opening Hours", main: "Monday - Friday", sub: "8:30am - 4:00pm" },
];

const CONTACT_WEBHOOK = import.meta.env.VITE_CONTACT_WEBHOOK as string | undefined;

const contactSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+44 1782 365365",
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
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "16:00" },
  ],
  contactPoint: [
    { "@type": "ContactPoint", contactType: "customer service", telephone: "+44-1782-365365", email: "info@pathwayacademyzone.co.uk", areaServed: "GB", availableLanguage: ["English"] },
    { "@type": "ContactPoint", contactType: "referrals", telephone: "+44-1782-365365", email: "info@pathwayacademyzone.co.uk" },
  ],
};

const quickLinks = [
  { title: "Make a Referral", desc: "Start the referral process for a young person", path: "/referral" },
  { title: "Visit Our Centre", desc: "See our facilities and meet the team", path: "/centres" },
  { title: "Join Our Team", desc: "View current vacancies and opportunities", path: "/careers" },
];

const enquiryOptions: IllustratedOption[] = [
  { value: "parent-carer", label: "Parent / Carer", description: "I'm asking about my young person", icon: HandHeart },
  { value: "school-la", label: "School / Local Authority", description: "Referral or commissioning enquiry", icon: School },
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
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img src={buildingImg} alt="Pathway Academy Zone building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4 backdrop-blur-sm border border-primary-foreground/20">Contact Us</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Get in Touch</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Whether you have a question, want to arrange a visit, or need to discuss a referral, we're here to help.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Contact" }]} className="mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
            <motion.aside variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((c) => (
                  <div key={c.title} className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50 bg-accent/50">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-white" />
                    </div>
<div>
                      <p className="font-medium text-foreground text-sm">{c.title}</p>
                      {c.title === "Email" ? (
                        <a href={`mailto:${c.main}`} className="text-foreground text-sm hover:underline">{c.main}</a>
                      ) : c.title === "Address" ? (
                        <a 
                          href={`https://maps.google.com/?q=${c.main.replace(/ /g, "+")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground text-sm hover:underline"
                        >
                          {c.main}
                        </a>
                      ) : (
                        <p className="text-foreground text-sm">{c.main}</p>
                      )}
                      <p className="text-muted-foreground text-xs">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                      required
                      columns={3}
                      error={errors.enquiryType?.message}
                    />
                  )}
                />

                <FormField
                  as="textarea"
                  id="contact-message"
                  label="Your Message"
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  maxLength={1000}
                  error={errors.message?.message}
                  {...register("message")}
                />

                <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
                  {loading ? (
                    <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending...</span>
                  ) : ("Send Message")}
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
