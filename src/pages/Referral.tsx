import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio } from "@/components/forms/IllustratedRadio";
import {
  email, ukPhone, personName, shortText, longMessage
} from "@/lib/uk-validators";
import { maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";
import {
  referralSteps, eligibility, documentation,
  programmeOptions, roleOptions, yearGroupOptions
} from "@/config/data/referral";
import { SITE_URL } from "@/config/site";

const REFERRAL_WEBHOOK = "https://hooks.zapier.com/fake-webhook";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Referral() {
  const { toast } = useToast();
  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<any>({
    resolver: zodResolver(z.object({
      name: personName({ required: true }),
      role: z.enum(roleOptions, { required_error: "Please select your role" }),
      email: email({ required: true }),
      phone: ukPhone({ required: true }),
      organisation: shortText(120, false),
      ypName: personName({ required: true }),
      dob: z.string().min(1, "Date of birth is required"),
      yearGroup: z.enum(yearGroupOptions, { required_error: "Please select year group" }),
      currentSchool: shortText(120, false),
      programme: z.string().min(1, "Please select a programme"),
      reason: longMessage(1000, true),
      additionalInfo: longMessage(800, false),
    })),
    mode: "onTouched",
    defaultValues: {
      name: "", role: undefined, email: "", phone: "", organisation: "",
      ypName: "", dob: "", yearGroup: undefined, currentSchool: "",
      programme: undefined, reason: "", additionalInfo: "",
    },
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<any>({
    url: REFERRAL_WEBHOOK,
    method: "POST",
    format: "json",
    extra: { source: "referral-form", site: SITE_URL },
    onSuccess: () => {
      toast({ title: "Referral submitted", description: "Our team will contact you within 2 working days." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Couldn't submit referral", description: err instanceof Error ? err.message : "Please try again." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
    await submit({ ...values, phone_e164: normaliseUkPhone(values.phone) });
  });

  const phone = watch("phone");

  return (
    <Layout>
      <Seo
        title="Make a Referral"
        description="Refer a young person to Pathway Academy Zone — Alternative Provision in Stoke-on-Trent for ages 11–16. Schools, Local Authorities, social workers and virtual schools welcome."
      />

      <section className="py-32 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Referral Process</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">How to Refer a Young Person</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We accept referrals from schools, local authorities, social workers, and virtual schools.</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Referral" }]} />
        </div>
      </section>

      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12 tracking-tight">The Referral Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {referralSteps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all active:scale-[0.98]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">{s.num}</span>
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-8">Eligibility Criteria</h2>
              <ul className="space-y-4">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-primary-foreground text-lg">
                    <CheckCircle className="h-6 w-6 text-primary-foreground/60 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-8">Documentation Required</h2>
              <ul className="space-y-4">
                {documentation.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-primary-foreground text-lg">
                    <CheckCircle className="h-6 w-6 text-primary-foreground/60 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4 tracking-tight">Referral Form</h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">Complete this form and our team will contact you within 2 working days.</p>

            <form onSubmit={onSubmit} noValidate className="bg-card rounded-3xl p-10 shadow-2xl border border-border/50 space-y-8">
              <h3 className="font-display text-xl font-bold text-foreground border-b border-border pb-4">Referrer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField id="ref-name" label="Your Name" required autoComplete="name" placeholder="Full name" error={errors.name?.message} {...register("name")} />
                <FormField as="select" id="ref-role" label="Your Role" required error={errors.role?.message} {...register("role")}>
                  <option value="">Select role</option>
                  {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                </FormField>
                <FormField id="ref-email" label="Email Address" required type="email" inputMode="email" autoComplete="email" placeholder="your@email.com" error={errors.email?.message} {...register("email")} />
                <FormField
                  id="ref-phone"
                  label="Phone Number"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01782 365365"
                  hint="UK landline or mobile"
                  value={phone || ""}
                  onChange={(e) => setValue("phone", maskUkPhone((e.target as HTMLInputElement).value), { shouldValidate: true })}
                  error={errors.phone?.message}
                />
              </div>
              <FormField id="ref-org" label="Organisation / School" autoComplete="organization" placeholder="e.g. Burslem High School" error={errors.organisation?.message} {...register("organisation")} />

              <h3 className="font-display text-xl font-bold text-foreground border-b border-border pb-4 mt-12">Young Person Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField id="ref-yp" label="Young Person's Name" required placeholder="Full name" error={errors.ypName?.message} {...register("ypName")} />
                <FormField id="ref-dob" label="Date of Birth" required type="date" max={new Date().toISOString().slice(0,10)} hint="DD/MM/YYYY" error={errors.dob?.message} {...register("dob")} />
                <FormField as="select" id="ref-yg" label="Year Group" required error={errors.yearGroup?.message} {...register("yearGroup")}>
                  <option value="">Select year</option>
                  {yearGroupOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                </FormField>
                <FormField id="ref-school" label="Current / Previous School" placeholder="School name" error={errors.currentSchool?.message} {...register("currentSchool")} />
              </div>

              <Controller
                name="programme"
                control={control}
                render={({ field }) => (
                  <IllustratedRadio
                    name="programme"
                    legend="Area of Interest"
                    hint="Choose the closest fit — we'll refine the placement plan together."
                    options={programmeOptions}
                    value={field.value || ""}
                    onChange={field.onChange}
                    required
                    columns={2}
                    error={errors.programme?.message}
                  />
                )}
              />

              <FormField as="textarea" id="ref-reason" label="Reason for Referral" required rows={4} maxLength={1000} placeholder="Briefly describe the situation and what support is needed" error={errors.reason?.message} {...register("reason")} />
              <FormField as="textarea" id="ref-extra" label="Additional Information" rows={3} maxLength={800} placeholder="EHCP, safeguarding context, professional reports etc." error={errors.additionalInfo?.message} {...register("additionalInfo")} />

              <Button type="submit" size="xl" disabled={loading} className="w-full rounded-full shadow-lg">
                {loading ? (
                  <span className="inline-flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Submitting...</span>
                ) : ("Submit Referral Request")}
              </Button>

              {success && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-primary bg-primary/10 p-6 rounded-2xl border border-primary/20">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" /> Thanks — we&apos;ll be in touch within 2 working days.
                </p>
              )}
              {error && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-destructive bg-destructive/10 p-6 rounded-2xl border border-destructive/20">
                  <AlertCircle className="h-6 w-6" aria-hidden="true" /> {error}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
