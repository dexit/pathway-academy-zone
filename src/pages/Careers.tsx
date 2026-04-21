import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Heart, Users, GraduationCap, Clock, CheckCircle, MapPin, Briefcase,
  Loader2, CheckCircle2, AlertCircle, BookOpen, HandHeart, ClipboardList, Sparkles,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Seo, SITE_URL, SITE_NAME, Breadcrumbs } from "@/components/Seo";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { JobListSkeleton } from "@/components/SkeletonPlaceholders";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import { email, ukPhone, personName, longMessage, maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";

const CAREERS_WEBHOOK = import.meta.env.VITE_CAREERS_WEBHOOK as string | undefined;

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const perks = [
  { icon: Heart, title: "Meaningful Work", desc: "Make a real difference in young people's lives every day" },
  { icon: Users, title: "Supportive Team", desc: "Work alongside dedicated, passionate colleagues" },
  { icon: GraduationCap, title: "Professional Development", desc: "Regular training and opportunities for growth" },
  { icon: Clock, title: "Work-Life Balance", desc: "Term-time working options and flexible arrangements" },
];
const qualities = ["Believe in every young person's potential","Are resilient and patient, even when things are challenging","Build strong, trusting relationships with young people","Collaborate effectively with colleagues and partners","Are committed to continuous learning and improvement"];
const vacancies = [
  { title: "SEMH Teacher", type: "Full-time, Permanent", location: "Stafford", salary: "£28,000 - £35,000", closing: "15 January 2025" },
  { title: "Youth Mentor", type: "Full-time, Fixed Term", location: "Stafford", salary: "£22,000 - £26,000", closing: "22 January 2025" },
  { title: "Learning Support Assistant", type: "Part-time (20hrs)", location: "Stafford", salary: "£12.50/hour", closing: "8 January 2025" },
];

function toJobPosting(v: (typeof vacancies)[number]) {
  const [minStr, maxStr] = v.salary.replace(/[£,]/g, "").split(/[-–]/).map((s) => s.trim());
  const min = parseInt(minStr, 10);
  const max = parseInt(maxStr, 10);
  const slug = v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: v.title,
    description: `${v.title} at ${SITE_NAME}. ${v.type}, based in ${v.location}.`,
    employmentType: /part-time/i.test(v.type) ? "PART_TIME" : "FULL_TIME",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: new Date(`${v.closing} UTC`).toISOString(),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/assets/PAZlogo-BYea4nq1.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: v.location,
        addressRegion: "Staffordshire",
        addressCountry: "GB",
      },
    },
    ...(Number.isFinite(min) && Number.isFinite(max)
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "GBP",
            value: { "@type": "QuantitativeValue", minValue: min, maxValue: max, unitText: "YEAR" },
          },
        }
      : /hour/i.test(v.salary)
        ? {
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "GBP",
              value: {
                "@type": "QuantitativeValue",
                value: parseFloat(v.salary.replace(/[^0-9.]/g, "")),
                unitText: "HOUR",
              },
            },
          }
        : {}),
    url: `${SITE_URL}/careers#${slug}`,
  };
}

const vacanciesSchema = [
  ...vacancies.map(toJobPosting),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: vacancies.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.title,
      url: `${SITE_URL}/careers#${v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    })),
  },
];

const interestOptions: IllustratedOption[] = [
  { value: "teaching", label: "Teaching", description: "Subject or SEMH teacher", icon: BookOpen },
  { value: "youth-work", label: "Youth Work", description: "Mentoring & pastoral", icon: HandHeart },
  { value: "support", label: "Learning Support", description: "TA / LSA roles", icon: Users },
  { value: "admin", label: "Administration", description: "Operations & HR", icon: ClipboardList },
  { value: "other", label: "Other", description: "Tell us more below", icon: Sparkles },
];

const formSchema = z.object({
  name: personName({ required: true }),
  email: email({ required: true }),
  phone: ukPhone(),
  interest: z.enum(["teaching", "youth-work", "support", "admin", "other"], { required_error: "Please choose an area of interest" }),
  about: longMessage(1500, true),
});
type FormValues = z.infer<typeof formSchema>;

export default function Careers() {
  const { toast } = useToast();
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setListLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", interest: undefined, about: "" },
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<FormValues & { phone_e164?: string }>({
    url: CAREERS_WEBHOOK,
    method: "POST",
    format: "json",
    extra: { source: "careers-speculative" },
    onSuccess: () => {
      toast({ title: "Application submitted", description: "We'll be in touch soon." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Couldn't submit", description: err instanceof Error ? err.message : "Please try again." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
    await submit({ ...values, phone_e164: normaliseUkPhone(values.phone || "") });
  });

  const phone = watch("phone");

  return (
    <Layout>
      <Seo
        title="Careers"
        description="Current vacancies and speculative applications at Pathway Academy Zone. Join a team making a real difference for young people in Staffordshire."
        jsonLd={vacanciesSchema}
      />
            <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Careers" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Join Our Team</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              We're looking for passionate educators, mentors, and support staff who want to make a difference in young people's lives across Staffordshire.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-background"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">Why Work at Pathway Academy Zone?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {perks.map((p, i) => (<motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border/50"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><p.icon className="h-6 w-6 text-primary" /></div><h3 className="font-display font-bold text-foreground mb-1">{p.title}</h3><p className="text-muted-foreground text-sm">{p.desc}</p></motion.div>))}
        </div>
      </div></section>
      <section className="py-24 bg-muted/50"><div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-4">What We Look For</h2>
        <p className="text-muted-foreground text-center mb-10">We value attitude and commitment as much as qualifications. Our ideal team members:</p>
        <div className="space-y-3">{qualities.map((q) => (<div key={q} className="flex items-center gap-3 bg-card rounded-xl px-6 py-4 border border-border/50"><CheckCircle className="h-5 w-5 text-primary shrink-0" /><span className="text-foreground">{q}</span></div>))}</div>
      </div></section>
      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">Current Vacancies</h2>
        {listLoading ? (
          <JobListSkeleton count={3} />
        ) : (
          <div className="space-y-6">{vacancies.map((v, i) => {
            const slug = v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <motion.article
                key={v.title}
                id={slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{v.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{v.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{v.location}</span>
                    </div>
                    <p className="text-primary font-semibold mt-2">{v.salary}</p>
                    <p className="text-sm text-muted-foreground mt-1">Closing: {v.closing}</p>
                  </div>
                  <Button className="shrink-0 rounded-full">View Details & Apply</Button>
                </div>
              </motion.article>
            );
          })}</div>
        )}
      </div></section>
      <section className="py-24 bg-muted/50"><div className="container mx-auto px-4 max-w-2xl">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-4">Speculative Applications</h2>
        <p className="text-muted-foreground text-center mb-10">Don't see a suitable role? We're always interested in hearing from talented individuals.</p>
        <form onSubmit={onSubmit} noValidate className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField id="careers-name" label="Your Name" required autoComplete="name" placeholder="Full name" error={errors.name?.message} {...register("name")} />
            <FormField id="careers-email" label="Email Address" required type="email" inputMode="email" autoComplete="email" placeholder="your@email.com" error={errors.email?.message} {...register("email")} />
          </div>
          <FormField
            id="careers-phone"
            label="Phone Number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="07123 456789"
            hint="UK landline or mobile"
            value={phone || ""}
            onChange={(e) => setValue("phone", maskUkPhone((e.target as HTMLInputElement).value), { shouldValidate: true })}
            error={errors.phone?.message}
          />

          <Controller
            name="interest"
            control={control}
            render={({ field }) => (
              <IllustratedRadio
                name="interest"
                legend="Area of Interest"
                hint="Pick the closest match — we route applications by team."
                options={interestOptions}
                value={field.value || ""}
                onChange={field.onChange}
                required
                columns={2}
                error={errors.interest?.message}
              />
            )}
          />

          <FormField as="textarea" id="careers-about" label="Tell Us About Yourself" required rows={5} maxLength={1500} placeholder="Background, qualifications, why you'd like to join us…" error={errors.about?.message} {...register("about")} />

          <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
            {loading ? (
              <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting...</span>
            ) : ("Submit Enquiry")}
          </Button>
          {success && (
            <p className="flex items-center justify-center gap-2 text-xs font-medium text-primary">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks — we&apos;ll be in touch soon.
            </p>
          )}
          {error && (
            <p className="flex items-center justify-center gap-2 text-xs font-medium text-destructive">
              <AlertCircle className="h-4 w-4" aria-hidden="true" /> {error}
            </p>
          )}
        </form>
      </div></section>
    </Layout>
  );
}
