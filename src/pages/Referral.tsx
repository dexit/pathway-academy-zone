import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Phone, FileText, Users, CalendarCheck, CheckCircle, Loader2, CheckCircle2, AlertCircle,
  BookOpen, Wrench, Brain, Lightbulb, Heart, MoreHorizontal, Calendar, Clock, ArrowRight, Check, MapPin, Building2
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { Seo, SITE_URL, Breadcrumbs } from "@/components/Seo";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import {
  email, ukPhone, personName, shortText, longMessage, dateOfBirth,
  maskUkPhone, normaliseUkPhone,
} from "@/lib/uk-validators";

const REFERRAL_WEBHOOK = import.meta.env.VITE_REFERRAL_WEBHOOK as string | undefined;

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const steps = [
  { num: 1, icon: Phone, title: "Initial Contact", desc: "Contact us by phone or complete the referral form to discuss your young person's needs." },
  { num: 2, icon: FileText, title: "Information Gathering", desc: "We collect relevant documentation including educational history, EHCP/SEN information, and safeguarding details." },
  { num: 3, icon: Users, title: "Assessment Meeting", desc: "We meet with the young person and family to assess needs and discuss potential pathways." },
  { num: 4, icon: CalendarCheck, title: "Placement Planning", desc: "We create a personalised plan and agree start dates, transport arrangements, and support packages." },
];
const eligibility = ["Young people aged 11-16","Permanently excluded or at risk of exclusion","Disengaged from mainstream education","Social, emotional and mental health needs","Anxiety-based non-attendance","Looked after children and care leavers"];
const docs = ["Recent school reports and attendance data","EHCP or SEN support documentation (if applicable)","Any relevant safeguarding information","Professional reports (educational psychology, CAMHS, etc.)","PEP (Personal Education Plan) for looked after children"];

const programmeOptions: IllustratedOption[] = [
  { value: "academic", label: "Academic Re-engagement", description: "Core English, Maths, Science", icon: BookOpen },
  { value: "vocational", label: "Vocational Learning", description: "Hands-on practical skills", icon: Wrench },
  { value: "semh", label: "SEMH Support", description: "Therapeutic 1:1 + group", icon: Brain },
  { value: "personal", label: "Personal Development", description: "Resilience and life skills", icon: Lightbulb },
  { value: "outreach", label: "Outreach / Hybrid", description: "Online + in-centre blend", icon: Heart },
  { value: "other", label: "Other", description: "Tell us more in your message", icon: MoreHorizontal },

];

const roleOptions = ["School Staff","Local Authority","Social Worker","Virtual School","Other Professional"] as const;
const yearGroupOptions = ["Year 7","Year 8","Year 9","Year 10","Year 11"] as const;

const formSchema = z.object({
  name: personName({ required: true }),
  role: z.enum(roleOptions, { required_error: "Please select your role" }),
  email: email({ required: true }),
  phone: ukPhone({ required: true }),
  organisation: shortText(120, false),
  ypName: personName({ required: true }),
  dob: dateOfBirth({ required: true, minAge: 10, maxAge: 18 }),
  yearGroup: z.enum(yearGroupOptions, { required_error: "Please select a year group" }),
  currentSchool: shortText(160, false),
  programme: z.enum(["academic", "vocational", "semh", "personal", "outreach"], { required_error: "Please select a programme of interest" }),
  reason: longMessage(1000, true),
  additionalInfo: shortText(800, false),
});
type FormValues = z.infer<typeof formSchema>;

export default function Referral() {
  const { toast } = useToast();

  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "", role: undefined, email: "", phone: "", organisation: "",
      ypName: "", dob: "", yearGroup: undefined, currentSchool: "",
      programme: undefined, reason: "", additionalInfo: "",
    },
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<FormValues & { phone_e164?: string }>({
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

      <section className="py-32 bg-muted/30">
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
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">The Referral Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{s.num}</span>
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-6">Eligibility Criteria</h2>
              <ul className="space-y-3">{eligibility.map((item) => (
                <li key={item} className="flex items-center gap-3 text-primary-foreground"><CheckCircle className="h-5 w-5 text-primary-foreground/60 shrink-0" />{item}</li>
              ))}</ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-6">Documentation Required</h2>
              <ul className="space-y-3">{docs.map((item) => (
                <li key={item} className="flex items-center gap-3 text-primary-foreground"><CheckCircle className="h-5 w-5 text-primary-foreground/60 shrink-0" />{item}</li>
              ))}</ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">Referral Form</h2>
            <p className="text-muted-foreground text-center mb-10">Complete this form and our team will contact you within 2 working days.</p>

            <form onSubmit={onSubmit} noValidate className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <hr className="border-border" />
              <h3 className="font-display text-lg font-bold text-foreground">Young Person Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
                {loading ? (
                  <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting...</span>
                ) : ("Submit Referral")}
              </Button>

              {success && (
                <p className="flex items-center justify-center gap-2 text-xs font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks — we&apos;ll be in touch within 2 working days.
                </p>
              )}
              {error && (
                <p className="flex items-center justify-center gap-2 text-xs font-medium text-destructive">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" /> {error}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
