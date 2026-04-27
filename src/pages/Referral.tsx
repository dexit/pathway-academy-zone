import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Phone, FileText, Users, CalendarCheck, CheckCircle, Loader2, CheckCircle2, AlertCircle,
  BookOpen, Wrench, Brain, Lightbulb, Heart, MoreHorizontal, Calendar, Clock, ArrowRight, Check, MapPin, Building2,
  Mail, User
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { Seo, SITE_URL, Breadcrumbs } from "@/components/Seo";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import {
<<<<<<< HEAD
<<<<<<< HEAD
  email, ukPhone, personName, shortText, longMessage, dateOfBirth, postcode,
  maskUkPhone, normaliseUkPhone,
=======
  email, ukPhone, personName, shortText, longMessage, dateOfBirth, ukPostcode,
  maskUkPhone, normaliseUkPhone, maskUkPostcode,
>>>>>>> origin/main
=======
  email, ukPhone, personName, shortText, longMessage, dateOfBirth, ukPostcode,
  maskUkPhone, normaliseUkPhone, maskUkPostcode,
>>>>>>> origin/main
} from "@/lib/uk-validators";
import { API_ENDPOINTS, FORM_SOURCES } from "@/config/api";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const steps = [
  { num: 1, icon: Phone, title: "Initial Contact", desc: "Contact us by phone or complete the referral form to discuss your young person's needs." },
  { num: 2, icon: FileText, title: "Information Gathering", desc: "We collect relevant documentation including educational history, EHCP/SEN information, and safeguarding details." },
  { num: 3, icon: Users, title: "Assessment Meeting", desc: "We meet with the young person and family to assess needs and discuss potential pathways." },
  { num: 4, icon: CalendarCheck, title: "Placement Planning", desc: "We create a personalised plan and agree start dates, transport arrangements, and support packages." },
];

const eligibility = ["Young people aged 11-16","Permanently excluded or at risk of exclusion","Disengaged from mainstream education","Social, emotional and mental health needs","Anxiety-based non-attendance","Looked after children and care leavers"];
const docs = ["Latest School Report","Attendance Record","EHCP (if applicable)","Safeguarding / Social Care information","Behaviour Support Plan","Professional assessments (EP, CAMHS etc.)"];

const roleOptions = ["School Headteacher / SLT", "SENCO / Inclusion Lead", "Local Authority Commissioner", "Social Worker", "Virtual School Head", "Parent / Carer", "Other Professional"];
const yearGroupOptions = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 11"];

const formSchema = z.object({
<<<<<<< HEAD
<<<<<<< HEAD
  // Referrer
  refFirstName: personName(),
  refLastName: personName(),
  refRole: z.string().min(1, "Please select your role"),
  refEmail: email(),
  refPhone: ukPhone(),
  refOrganisation: shortText(),
  // Young Person
  ypFirstName: personName(),
  ypLastName: personName(),
  ypDob: dateOfBirth(),
  ypPostcode: postcode(),
  ypYearGroup: z.string().min(1, "Please select year group"),
  ypCurrentSchool: shortText({ required: false }),
  // Placement
  programme: z.string().min(1, "Please select a programme"),
  reason: longMessage(),
  additionalInfo: z.string().max(2000).optional(),
=======
=======
>>>>>>> origin/main
  firstName: personName({ required: true }),
  lastName: personName({ required: true }),
  role: z.enum(roleOptions, { required_error: "Please select your role" }),
  email: email({ required: true }),
  phone: ukPhone({ required: true }),
  organisation: shortText(120, false),
  postcode: ukPostcode({ required: true }),
  ypFirstName: personName({ required: true }),
  ypLastName: personName({ required: true }),
  dob: dateOfBirth({ required: true, minAge: 10, maxAge: 18 }),
  yearGroup: z.enum(yearGroupOptions, { required_error: "Please select a year group" }),
  currentSchool: shortText(160, false),
  programme: z.enum(["academic", "vocational", "semh", "personal", "outreach"], { required_error: "Please select a programme of interest" }),
  reason: longMessage(1000, true),
  additionalInfo: shortText(800, false),
>>>>>>> origin/main
});

type FormValues = z.infer<typeof formSchema>;

const programmeOptions: IllustratedOption[] = [
  { value: "academic", label: "Academic Re-engagement", desc: "GCSEs and core focus", icon: BookOpen },
  { value: "vocational", label: "Vocational Pathway", desc: "Construction, Catering, etc.", icon: Wrench },
  { value: "semh", label: "SEMH & Therapeutic", desc: "Social & emotional support", icon: Brain },
  { value: "employability", label: "Life & Careers", desc: "Employability focus", icon: Lightbulb },
  { value: "bespoke", label: "Bespoke / Mixed", desc: "Tailored multi-pathway", icon: Heart },
  { value: "other", label: "Other / Assessment", desc: "Short-term / Assessment", icon: MoreHorizontal },
];

export default function Referral() {
  const { toast } = useToast();
  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
<<<<<<< HEAD
<<<<<<< HEAD
      refFirstName: "", refLastName: "", refRole: "", refEmail: "", refPhone: "", refOrganisation: "",
      ypFirstName: "", ypLastName: "", ypDob: "", ypPostcode: "", ypYearGroup: "", ypCurrentSchool: "",
      programme: "", reason: "", additionalInfo: "",
=======
=======
>>>>>>> origin/main
      firstName: "", lastName: "", role: undefined, email: "", phone: "", organisation: "", postcode: "",
      ypFirstName: "", ypLastName: "", dob: "", yearGroup: undefined, currentSchool: "",
      programme: undefined, reason: "", additionalInfo: "",
>>>>>>> origin/main
    },
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<FormValues & { phone_e164?: string }>({
    url: API_ENDPOINTS.SUBMIT,
    method: "POST",
    format: "json",
    extra: { source: FORM_SOURCES.REFERRAL, site: SITE_URL },
    onSuccess: () => {
      toast({ title: "Referral submitted", description: "Our team will contact you within 2 working days." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Couldn't submit referral", description: err instanceof Error ? err.message : "Please try again." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
    await submit({ ...values, phone_e164: normaliseUkPhone(values.refPhone) });
  });

<<<<<<< HEAD
  const refPhone = watch("refPhone");
=======
  const phone = watch("phone");
  const postcode = watch("postcode");
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> origin/main

  return (
    <Layout>
      <Seo
        title="Make a Referral"
        description="Refer a young person to Pathway Academy Zone — Alternative Provision in Stoke-on-Trent for ages 11–16. Schools, Local Authorities, social workers and virtual schools welcome."
      />

      <section className="relative py-32 bg-primary/5 overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container-wide text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Referral Process</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">How to Refer a Learner</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">We accept referrals from schools, local authorities, social workers, and virtual schools across Staffordshire and the West Midlands.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/50">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Referral" }]} />
        </div>
      </section>

      <section className="section-py bg-background">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-16">The Referral Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-card rounded-3xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                <div className="absolute top-4 right-4 text-4xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">{s.num}</div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <s.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold text-primary-foreground">Eligibility Criteria</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eligibility.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-primary-foreground/90 text-sm bg-background/5 rounded-xl p-4 border border-white/10 italic">
                        <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                        {item}
                    </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold text-primary-foreground">Documentation Required</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {docs.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-primary-foreground/90 text-sm bg-background/5 rounded-xl p-4 border border-white/10">
                        <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                        {item}
                    </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-py bg-background">
        <div className="container-wide max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-12">
                <h2 className="font-display text-4xl font-bold text-foreground mb-4">Referral Form</h2>
                <p className="text-muted-foreground text-lg">Complete the secure form below and our admissions team will contact you within 2 working days.</p>
            </div>

<<<<<<< HEAD
            <form onSubmit={onSubmit} noValidate className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border/50 space-y-10">
              {/* Referrer Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">Your Details (Referrer)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField id="ref-firstName" label="First Name" required placeholder="John" error={errors.refFirstName?.message} {...register("refFirstName")} />
                    <FormField id="ref-lastName" label="Last Name" required placeholder="Smith" error={errors.refLastName?.message} {...register("refLastName")} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField as="select" id="ref-role" label="Your Role" required error={errors.refRole?.message} {...register("refRole")}>
                        <option value="">Select role</option>
                        {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </FormField>
                    <FormField id="ref-org" label="Organisation / School" required placeholder="e.g. Burslem High School" error={errors.refOrganisation?.message} {...register("refOrganisation")} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField id="ref-email" label="Email Address" required type="email" inputMode="email" placeholder="john.smith@school.sch.uk" error={errors.refEmail?.message} {...register("refEmail")} />
                    <FormField
                        id="ref-phone"
                        label="Work Phone / Mobile"
                        required
                        type="tel"
                        inputMode="tel"
                        placeholder="01782 365365"
                        hint="UK format"
                        value={refPhone || ""}
                        onChange={(e) => setValue("refPhone", maskUkPhone((e.target as HTMLInputElement).value), { shouldValidate: true })}
                        error={errors.refPhone?.message}
                    />
                </div>
=======
            <form onSubmit={onSubmit} noValidate className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField id="ref-firstname" label="First Name" required autoComplete="given-name" placeholder="First name" error={errors.firstName?.message} {...register("firstName")} />
                <FormField id="ref-lastname" label="Last Name" required autoComplete="family-name" placeholder="Last name" error={errors.lastName?.message} {...register("lastName")} />
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
                  placeholder="07123 456789"
                  hint="UK landline or mobile"
                  value={phone || ""}
                  onChange={(e) => setValue("phone", maskUkPhone((e.target as HTMLInputElement).value), { shouldValidate: true })}
                  error={errors.phone?.message}
                />
                <FormField
                  id="ref-postcode"
                  label="Postcode"
                  required
                  autoComplete="postal-code"
                  placeholder="ST6 3LJ"
                  hint="UK postcode of the young person"
                  value={postcode || ""}
                  onChange={(e) => setValue("postcode", maskUkPostcode((e.target as HTMLInputElement).value), { shouldValidate: true })}
                  error={errors.postcode?.message}
                />
              </div>
              <FormField id="ref-org" label="Organisation / School" autoComplete="organization" placeholder="e.g. Burslem High School" error={errors.organisation?.message} {...register("organisation")} />

              <hr className="border-border" />
              <h3 className="font-display text-lg font-bold text-foreground">Young Person Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField id="ref-yp-firstname" label="Young Person's First Name" required placeholder="First name" error={errors.ypFirstName?.message} {...register("ypFirstName")} />
                <FormField id="ref-yp-lastname" label="Young Person's Last Name" required placeholder="Last name" error={errors.ypLastName?.message} {...register("ypLastName")} />
                <FormField id="ref-dob" label="Date of Birth" required type="date" max={new Date().toISOString().slice(0,10)} hint="DD/MM/YYYY" error={errors.dob?.message} {...register("dob")} />
                <FormField as="select" id="ref-yg" label="Year Group" required error={errors.yearGroup?.message} {...register("yearGroup")}>
                  <option value="">Select year</option>
                  {yearGroupOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                </FormField>
                <FormField id="ref-school" label="Current / Previous School" placeholder="School name" error={errors.currentSchool?.message} {...register("currentSchool")} />
>>>>>>> origin/main
              </div>

              {/* Young Person Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Users className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">Young Person Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField id="yp-firstName" label="Learner First Name" required placeholder="First name" error={errors.ypFirstName?.message} {...register("ypFirstName")} />
                    <FormField id="yp-lastName" label="Learner Last Name" required placeholder="Last name" error={errors.ypLastName?.message} {...register("ypLastName")} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField id="yp-dob" label="Date of Birth" required type="date" max={new Date().toISOString().slice(0,10)} error={errors.ypDob?.message} {...register("ypDob")} />
                    <FormField id="yp-postcode" label="Home Postcode" required placeholder="ST6 3LJ" error={errors.ypPostcode?.message} {...register("ypPostcode")} />
                    <FormField as="select" id="yp-yg" label="Year Group" required error={errors.ypYearGroup?.message} {...register("ypYearGroup")}>
                        <option value="">Select year</option>
                        {yearGroupOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                    </FormField>
                </div>
                <FormField id="yp-school" label="Current / Previous School" placeholder="School name" error={errors.ypCurrentSchool?.message} {...register("ypCurrentSchool")} />
              </div>

              {/* Placement Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Target className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">Placement & Referral Reason</h3>
                </div>

                <Controller
                    name="programme"
                    control={control}
                    render={({ field }) => (
                    <IllustratedRadio
                        name="programme"
                        legend="Primary Programme of Interest"
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

                <FormField as="textarea" id="ref-reason" label="Reason for Referral" required rows={5} maxLength={1000} placeholder="Please describe the learner's current situation, needs and why AP is being sought." error={errors.reason?.message} {...register("reason")} />
                <FormField as="textarea" id="ref-extra" label="Additional Context (Optional)" rows={3} maxLength={800} placeholder="Safeguarding context, professional involvement (CAMHS, YOT), EHCP status, etc." error={errors.additionalInfo?.message} {...register("additionalInfo")} />
              </div>

              <div className="pt-4">
                <Button type="submit" size="xl" disabled={loading} className="w-full rounded-full h-16 text-lg font-bold shadow-xl shadow-primary/20 active:scale-95 transition-transform">
                    {loading ? (
                    <span className="inline-flex items-center gap-2"><Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> Processing...</span>
                    ) : ("Submit Secure Referral")}
                </Button>

                {success && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-primary/10 rounded-2xl flex items-center gap-3 text-primary font-medium border border-primary/20">
                        <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                        <p>Referral submitted successfully. We will review and contact you within 2 working days.</p>
                    </motion.div>
                )}
                {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-destructive/10 rounded-2xl flex items-center gap-3 text-destructive font-medium border border-destructive/20">
                        <AlertCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
                        <p>{error}</p>
                    </motion.div>
                )}
                <p className="text-xs text-muted-foreground text-center mt-6">This form is encrypted. Your data is handled in accordance with our data protection and GDPR policies.</p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
