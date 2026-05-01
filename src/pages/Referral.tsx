import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  Search,
  Users,
  CheckCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserPlus,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Seo, Breadcrumbs, SITE_URL, SITE_NAME } from "@/components/Seo";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import { email, ukPhone, personName, shortText, longMessage, maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";

const REFERRAL_WEBHOOK = import.meta.env.VITE_REFERRAL_WEBHOOK as string | undefined;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const steps = [
  { num: "1", title: "Enquiry", desc: "Contact us to discuss your learner's needs and our current availability.", icon: Search },
  { num: "2", title: "Referral", desc: "Submit the formal referral form with all necessary documentation.", icon: ClipboardCheck },
  { num: "3", title: "Assessment", desc: "We review the referral and hold an assessment meeting with the student and family.", icon: Users },
  { num: "4", title: "Placement", desc: "If suitable, we agree a start date and create a personalised induction plan.", icon: CheckCircle },
];

const eligibility = [
  "Aged 11-16 (Key Stage 3 & 4)",
  "Permanently excluded or at risk of exclusion",
  "Medical or SEMH needs preventing mainstream attendance",
  "Residents of Staffordshire or bordering areas",
];

const docs = [
  "Completed referral form",
  "Latest school report / progress data",
  "Attendance records",
  "Safeguarding / CP records (if applicable)",
  "EHCP or SEN support plan (if applicable)",
];

const roleOptions = ["Headteacher", "SENCO", "DSL", "Year Lead", "Social Worker", "Local Authority Officer", "Virtual School Head", "Parent/Carer", "Other"];
const yearGroupOptions = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 11"];

const programmeOptions: IllustratedOption[] = [
  { value: "academic", label: "Academic Re-engagement", description: "GCSE & Functional Skills", icon: FileText },
  { value: "vocational", label: "Vocational Learning", description: "Hands-on skills & trades", icon: ClipboardCheck },
  { value: "semh", label: "SEMH Support", description: "Therapeutic & emotional", icon: Users },
  { value: "mixed", label: "Blended Pathway", description: "Combination of strands", icon: UserPlus },
];

const formSchema = z.object({
  name: personName({ required: true }),
  role: z.string().min(1, "Please select your role"),
  email: email({ required: true }),
  phone: ukPhone(),
  organisation: shortText(120, false),
  ypName: personName({ required: true }),
  dob: z.string().min(1, "Date of birth is required"),
  yearGroup: z.string().min(1, "Please select a year group"),
  currentSchool: shortText(120, false),
  programme: z.string().min(1, "Please select a programme of interest"),
  reason: longMessage(1000, true),
  additionalInfo: longMessage(800, false),
});
type FormValues = z.infer<typeof formSchema>;

export default function Referral() {
  const { toast } = useToast();
  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Refer a Learner to Pathway Academy Zone",
    "description": "Follow our 4-step referral process for Alternative Provision placement.",
    "step": steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title,
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": s.desc
      }]
    }))
  };

  return (
    <Layout>
      <Seo
        title="Make a Referral"
        description="Refer a young person to Pathway Academy Zone — Alternative Provision in Stoke-on-Trent for ages 11–16. Schools, Local Authorities, social workers and virtual schools welcome."
        jsonLd={jsonLd}
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Referral" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Make a Referral</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              We accept referrals from schools, local authorities, and virtual schools across Staffordshire.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">The Referral Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-primary/20">
                  {s.num}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 -right-4 w-8 h-px bg-border z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Eligibility Criteria</h2>
              <ul className="space-y-4">{eligibility.map((item) => (
                <li key={item} className="flex items-start gap-4"><CheckCircle className="h-6 w-6 text-white shrink-0 mt-0.5" /> <span className="text-lg opacity-90">{item}</span></li>
              ))}</ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Documentation Required</h2>
              <ul className="space-y-4">{docs.map((item) => (
                <li key={item} className="flex items-start gap-4"><CheckCircle className="h-6 w-6 text-white shrink-0 mt-0.5" /> <span className="text-lg opacity-90">{item}</span></li>
              ))}</ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Referral Form</h2>
              <p className="text-muted-foreground text-lg">Complete this secure form and our team will contact you within 2 working days.</p>
            </div>

            <form onSubmit={onSubmit} noValidate className="bg-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50 space-y-8">
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

              <div className="pt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-border flex-1" />
                  <h3 className="font-display text-lg font-bold text-primary uppercase tracking-widest shrink-0">Young Person Details</h3>
                  <div className="h-px bg-border flex-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField id="ref-yp" label="Young Person's Name" required placeholder="Full name" error={errors.ypName?.message} {...register("ypName")} />
                  <FormField id="ref-dob" label="Date of Birth" required type="date" max={new Date().toISOString().slice(0,10)} hint="DD/MM/YYYY" error={errors.dob?.message} {...register("dob")} />
                  <FormField as="select" id="ref-yg" label="Year Group" required error={errors.yearGroup?.message} {...register("yearGroup")}>
                    <option value="">Select year</option>
                    {yearGroupOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                  </FormField>
                  <FormField id="ref-school" label="Current / Previous School" placeholder="School name" error={errors.currentSchool?.message} {...register("currentSchool")} />
                </div>
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

              <div className="space-y-6">
                <FormField as="textarea" id="ref-reason" label="Reason for Referral" required rows={4} maxLength={1000} placeholder="Briefly describe the situation and what support is needed" error={errors.reason?.message} {...register("reason")} />
                <FormField as="textarea" id="ref-extra" label="Additional Information" rows={3} maxLength={800} placeholder="EHCP, safeguarding context, professional reports etc." error={errors.additionalInfo?.message} {...register("additionalInfo")} />
              </div>

              <div className="pt-4">
                <Button type="submit" size="xl" disabled={loading} className="w-full rounded-full shadow-xl shadow-primary/20 h-16 text-lg">
                  {loading ? (
                    <span className="inline-flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Submitting Referral...</span>
                  ) : ("Submit Referral Form")}
                </Button>

                {success && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-sm font-bold text-primary mt-6 bg-primary/10 p-4 rounded-xl">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Thanks — we&apos;ll be in touch within 2 working days.
                  </motion.p>
                )}
                {error && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-sm font-bold text-destructive mt-6 bg-destructive/10 p-4 rounded-xl">
                    <AlertCircle className="h-5 w-5" aria-hidden="true" /> {error}
                  </motion.p>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground text-center uppercase font-bold tracking-widest">Secure & Confidential Transmission</p>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
