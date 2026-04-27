import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Heart, Users, GraduationCap, Clock, CheckCircle, MapPin, Briefcase,
  Loader2, CheckCircle2, AlertCircle, BookOpen, HandHeart, ClipboardList, Sparkles, Wrench,
  ArrowRight, Search
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Seo, SITE_URL, SITE_NAME, Breadcrumbs } from "@/components/Seo";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { JobListSkeleton } from "@/components/SkeletonPlaceholders";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import { email, ukPhone, personName, longMessage, maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";
import { API_ENDPOINTS, FORM_SOURCES } from "@/config/api";
import { Input } from "@/components/ui/input";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const perks = [
  { icon: Heart, title: "Meaningful Work", desc: "Make a real difference in young people's lives every day" },
  { icon: Users, title: "Supportive Team", desc: "Work alongside dedicated, passionate colleagues" },
  { icon: GraduationCap, title: "Professional Development", desc: "Regular training and opportunities for growth" },
  { icon: Clock, title: "Work-Life Balance", desc: "Term-time working options and flexible arrangements" },
];

const vacancies = [
  { title: "SEMH Teacher", type: "Full-time, Permanent", location: "Stafford", salary: "£28,000 - £35,000", closing: "15 January 2025" },
  { title: "Youth Mentor", type: "Full-time, Fixed Term", location: "Stafford", salary: "£22,000 - £26,000", closing: "22 January 2025" },
  { title: "Learning Support Assistant", type: "Part-time (20hrs)", location: "Stafford", salary: "£12.50/hour", closing: "8 January 2025" },
];

const formSchema = z.object({
  firstName: personName(),
  lastName: personName(),
  email: email(),
  phone: ukPhone(),
  interest: z.string().min(1, "Please select an area of interest"),
  message: longMessage(),
});

type FormValues = z.infer<typeof formSchema>;

const interestOptions: IllustratedOption[] = [
  { value: "teaching", label: "Teaching & Learning", desc: "Qualified Teachers & LSAs", icon: BookOpen },
  { value: "pastoral", label: "Pastoral & Mentoring", desc: "Mentors & Support Staff", icon: HandHeart },
  { value: "vocational", label: "Vocational Instruction", desc: "Trade specialists", icon: Wrench },
  { value: "admin", label: "Admin & Operations", desc: "Business & site support", icon: ClipboardList },
];

<<<<<<< HEAD
=======
const formSchema = z.object({
  firstName: personName({ required: true }),
  lastName: personName({ required: true }),
  email: email({ required: true }),
  phone: ukPhone(),
  interest: z.enum(["teaching", "youth-work", "support", "admin", "other"], { required_error: "Please choose an area of interest" }),
  about: longMessage(1500, true),
});
type FormValues = z.infer<typeof formSchema>;

>>>>>>> origin/main
export default function Careers() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingJobs(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter(v =>
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
<<<<<<< HEAD
<<<<<<< HEAD
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", interest: "", message: "" },
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<FormValues & { phone_e164?: string }>({
    url: API_ENDPOINTS.SUBMIT,
=======
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", interest: undefined, about: "" },
  });

=======
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", interest: undefined, about: "" },
  });

>>>>>>> origin/main
  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<FormValues & { phone_e164?: string; name?: string }>({
    url: CAREERS_WEBHOOK,
>>>>>>> origin/main
    method: "POST",
    format: "json",
    extra: { source: FORM_SOURCES.CAREERS, site: SITE_URL },
    onSuccess: () => {
      toast({ title: "Application received", description: "Thanks! We'll keep your details on file." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Couldn't send application", description: err instanceof Error ? err.message : "Please try again." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
<<<<<<< HEAD
<<<<<<< HEAD
    await submit({ ...values, phone_e164: normaliseUkPhone(values.phone) });
=======
=======
>>>>>>> origin/main
    await submit({
      ...values,
      name: `${values.firstName} ${values.lastName}`.trim(),
      phone_e164: normaliseUkPhone(values.phone || ""),
    });
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> origin/main
  });

  const phone = watch("phone");

  return (
    <Layout>
      <Seo
        title="Careers & Vacancies"
        description="Join our team of dedicated educators and mentors at Pathway Academy Zone. Help transform young lives through trauma-informed Alternative Provision."
      />

      <section className="relative py-32 bg-primary/5 overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container-wide text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Join our Mission</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">Transform Lives Through <span className="text-gradient-primary">Education</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Join a team passionate about making a real difference. We provide a supportive, trauma-informed environment where staff and students thrive.</p>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/50">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: "Careers" }]} />
        </div>
      </section>

      <section className="section-py bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
<<<<<<< HEAD
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
=======
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
            <FormField
              id="careers-firstname"
              label="First Name"
              required
              autoComplete="given-name"
              placeholder="First name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <FormField
              id="careers-lastname"
              label="Last Name"
              required
              autoComplete="family-name"
              placeholder="Last name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
<<<<<<< HEAD
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="careers-email"
              label="Email Address"
              required
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
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
          </div>
>>>>>>> origin/main
=======
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="careers-email"
              label="Email Address"
              required
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
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
          </div>
>>>>>>> origin/main

      <section className="section-py bg-muted/30">
        <div className="container-wide max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">Current Vacancies</h2>
                <p className="text-muted-foreground italic">Find your next role at Pathway Academy Zone.</p>
            </div>
            <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search roles..."
                    className="pl-9 h-11 bg-background"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
          </div>

          {loadingJobs ? (
            <JobListSkeleton />
          ) : (
            <div className="space-y-4">
              {filteredVacancies.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{v.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {v.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {v.type}</span>
                        <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> {v.salary}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-muted-foreground hidden md:block">Closing: {v.closing}</span>
                    <Button asChild className="rounded-full">
                        <Link to="/contact?enquiry=career">Apply Now</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
              {filteredVacancies.length === 0 && (
                <div className="text-center py-12 bg-background rounded-2xl border border-dashed border-border">
                    <p className="text-muted-foreground">No roles found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section-py bg-background">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Speculative Applications</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Don't see the right role? We're always looking for talented people to join us. Send us your details and we'll be in touch if something suitable comes up.</p>
          </div>

          <form onSubmit={onSubmit} noValidate className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border/50 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField id="careers-firstName" label="First Name" required placeholder="John" error={errors.firstName?.message} {...register("firstName")} />
                <FormField id="careers-lastName" label="Last Name" required placeholder="Smith" error={errors.lastName?.message} {...register("lastName")} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField id="careers-email" label="Email Address" required type="email" inputMode="email" placeholder="john.smith@example.com" error={errors.email?.message} {...register("email")} />
                <FormField
                    id="careers-phone"
                    label="Phone Number"
                    required
                    type="tel"
                    inputMode="tel"
                    placeholder="07700 900000"
                    hint="UK mobile preferred"
                    value={phone || ""}
                    onChange={(e) => setValue("phone", maskUkPhone((e.target as HTMLInputElement).value), { shouldValidate: true })}
                    error={errors.phone?.message}
                />
            </div>

            <Controller
              name="interest"
              control={control}
              render={({ field }) => (
                <IllustratedRadio
                  name="interest"
                  legend="Area of Interest"
                  hint="What kind of role are you looking for?"
                  options={interestOptions}
                  value={field.value || ""}
                  onChange={field.onChange}
                  required
                  columns={2}
                  error={errors.interest?.message}
                />
              )}
            />

            <FormField as="textarea" id="careers-msg" label="Your Skills & Experience" required rows={5} maxLength={1000} placeholder="Tell us about yourself and what you can bring to Pathway Academy Zone." error={errors.message?.message} {...register("message")} />

            <div className="pt-4">
                <Button type="submit" size="xl" disabled={loading} className="w-full rounded-full h-16 text-lg font-bold shadow-xl shadow-primary/20 active:scale-95 transition-transform">
                    {loading ? (
                        <span className="inline-flex items-center gap-2"><Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> Submitting...</span>
                    ) : ("Send Speculative Application")}
                </Button>

                {success && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-primary/10 rounded-2xl flex items-center gap-3 text-primary font-medium border border-primary/20">
                        <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                        <p>Application submitted. We'll be in touch if a suitable opportunity arises.</p>
                    </motion.div>
                )}
                {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-destructive/10 rounded-2xl flex items-center gap-3 text-destructive font-medium border border-destructive/20">
                        <AlertCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
                        <p>{error}</p>
                    </motion.div>
                )}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
