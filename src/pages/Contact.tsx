import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio } from "@/components/forms/IllustratedRadio";
import { personName, email, ukPhone, longMessage } from "@/lib/uk-validators";
import { maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";
import { contactInformation, enquiryOptions, quickLinks } from "@/config/data/contact";
import { SITE_URL } from "@/config/site";

const CONTACT_WEBHOOK = "https://hooks.zapier.com/fake-webhook";
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const formSchema = z.object({
  name: personName({ required: true }),
  email: email({ required: true }),
  phone: ukPhone(),
  enquiryType: z.enum(["referral", "general", "visit"], { required_error: "Select enquiry type" }),
  organisation: z.string().optional(),
  message: longMessage(1000, true),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", enquiryType: undefined, organisation: "", message: "" },
    mode: "onTouched",
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<FormValues & { phone_e164?: string }>({
    url: CONTACT_WEBHOOK,
    method: "POST",
    format: "json",
    extra: { source: "contact-form", site: SITE_URL },
    onSuccess: () => {
      toast({ title: "Transmission Received", description: "We will respond within 24 hours." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Transmission Blocked", description: "Please try another channel." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
    await submit({ ...values, phone_e164: normaliseUkPhone(values.phone || "") });
  });

  const phone = watch("phone");

  return (
    <Layout>
      <Seo title="Establish Contact" description="Establish a direct link with Pathway Academy Zone. Our team is standing by for your enquiry." />

      {/* Header */}
      <section className="pt-40 pb-24 bg-foreground text-background overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block">COMMUNICATION HUB</span>
            <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic">
              ESTABLISH <br />
              <span className="text-primary">CONTACT.</span>
            </h1>
            <p className="text-background/60 text-xl md:text-2xl max-w-2xl font-medium leading-tight">
              Ready to start a referral or need specific mission intel? Use the secure channel below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Contact" }]} />
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

            {/* Info Cards */}
            <div className="lg:col-span-4 space-y-8">
              <h2 className="text-4xl mb-12 uppercase italic font-black tracking-tighter">DIRECT <span className="text-primary">LINES.</span></h2>
              <div className="space-y-6">
                {contactInformation.map((c) => (
                  <motion.div key={c.title} variants={fadeUp} initial="hidden" whileInView="visible" className="bg-card p-8 rounded-3xl border-2 border-border/50 shadow-sm hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <c.icon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.title}</p>
                    </div>
                    <p className="text-xl font-bold text-foreground break-all">{c.main}</p>
                    <p className="text-sm text-muted-foreground mt-2 font-medium">{c.sub}</p>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-[2rem] overflow-hidden border-2 border-border/50 shadow-2xl aspect-square lg:aspect-auto h-[400px]">
                 <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2397.8584766858147!2d-2.1916!3d53.0447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a6836a0d0f8eb%3A0x0!2sDuncalf%20St%2C%20Burslem%2C%20Stoke-on-Trent%20ST6%203LJ%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) invert(0.1)' }}
                    allowFullScreen
                    loading="lazy"
                    title="HQ"
                  />
              </div>
            </div>

            {/* Secure Form */}
            <div className="lg:col-span-8">
              <h2 className="text-4xl mb-12 uppercase italic font-black tracking-tighter">SECURE <span className="text-primary">CHANNEL.</span></h2>
              <form onSubmit={onSubmit} noValidate className="bg-card rounded-[2.5rem] p-12 border-2 border-border/50 shadow-[0_32px_64px_-16px_oklch(var(--primary)/0.15)] space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField id="contact-name" label="ID / FULL NAME" required placeholder="Your Name" error={errors.name?.message} {...register("name")} />
                  <FormField id="contact-email" label="COMMUNICATION CHANNEL" required type="email" placeholder="email@example.com" error={errors.email?.message} {...register("email")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField id="contact-phone" label="MOBILE LINE" type="tel" placeholder="07XXX XXXXXX" value={phone || ""} onChange={(e) => setValue("phone", maskUkPhone((e.target as HTMLInputElement).value), { shouldValidate: true })} error={errors.phone?.message} />
                  <FormField id="contact-org" label="ORGANISATION" placeholder="School, LA, etc." {...register("organisation")} />
                </div>

                <Controller
                  name="enquiryType"
                  control={control}
                  render={({ field }) => (
                    <IllustratedRadio
                      name="enquiryType"
                      legend="ENQUIRY SECTOR"
                      options={enquiryOptions}
                      value={field.value || ""}
                      onChange={field.onChange}
                      required
                      columns={3}
                      error={errors.enquiryType?.message}
                    />
                  )}
                />

                <FormField as="textarea" id="contact-message" label="INTEL / MESSAGE" required rows={5} placeholder="How can we help?" maxLength={1000} error={errors.message?.message} {...register("message")} />

                <Button type="submit" size="lg" disabled={loading} className="w-full h-24 rounded-3xl text-2xl font-black italic shadow-2xl group">
                  {loading ? (
                    <span className="flex items-center gap-3"><Loader2 className="h-8 w-8 animate-spin" /> SYNCHRONIZING...</span>
                  ) : (
                    <span className="flex items-center gap-3">TRANSMIT INTEL <Send className="h-6 w-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></span>
                  )}
                </Button>

                {success && (
                   <p className="flex items-center justify-center gap-4 text-xl font-black text-primary uppercase italic p-8 bg-primary/10 rounded-2xl border border-primary/20">
                    <CheckCircle2 className="h-8 w-8" /> CHANNEL OPEN. WE WILL RESPOND SHORTLY.
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-32 bg-accent/20 border-t border-accent/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl mb-16 uppercase italic font-black tracking-tighter">FAST <span className="text-primary">TRACK.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {quickLinks.map((l) => (
              <Link key={l.path} to={l.path} className="bg-card p-10 rounded-3xl border-2 border-border/50 hover:border-primary/20 hover:shadow-xl transition-all active:scale-[0.98] group">
                <h3 className="text-2xl mb-4 uppercase italic font-black group-hover:text-primary transition-colors">{l.title}</h3>
                <p className="text-muted-foreground text-sm font-medium">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
