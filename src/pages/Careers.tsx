import { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  GraduationCap,
  Clock,
  CheckCircle,
  MapPin,
  Briefcase,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search as SearchIcon,
  Globe,
  Building2,
  BookOpen,
  HandHeart,
  ClipboardList,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Seo, SITE_URL, SITE_NAME, Breadcrumbs } from "@/components/Seo";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { JobListSkeleton } from "@/components/SkeletonPlaceholders";
import { fetchAllJobs, type Job } from "@/lib/jobs-api";
import { FilterPills } from "@/components/FilterPills";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import { email, ukPhone, personName, longMessage, maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";

const CAREERS_WEBHOOK = import.meta.env.VITE_CAREERS_WEBHOOK as string | undefined;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const perks = [
  { icon: Heart, title: "Meaningful Work", desc: "Make a real difference in young people's lives every day" },
  { icon: Users, title: "Supportive Team", desc: "Work alongside dedicated, passionate colleagues" },
  { icon: GraduationCap, title: "Professional Development", desc: "Regular training and opportunities for growth" },
  { icon: Clock, title: "Work-Life Balance", desc: "Term-time working options and flexible arrangements" },
];

const LOCAL_VACANCIES: Job[] = [
  {
    id: "local-1",
    title: "SEMH Teacher",
    type: "Full-time, Permanent",
    location: "Stafford",
    salary: "£28,000 - £35,000",
    company: SITE_NAME,
    url: "#semh-teacher",
    source: "Local",
    postedDate: "2024-12-15",
    description: "SEMH Teacher at Pathway Academy Zone. Full-time, Permanent, based in Stafford.",
  },
  {
    id: "local-2",
    title: "Youth Mentor",
    type: "Full-time, Fixed Term",
    location: "Stafford",
    salary: "£22,000 - £26,000",
    company: SITE_NAME,
    url: "#youth-mentor",
    source: "Local",
    postedDate: "2024-12-22",
    description: "Youth Mentor at Pathway Academy Zone. Full-time, Fixed Term, based in Stafford.",
  },
];

const SOURCES = ["All", "Local", "Reed", "Adzuna", "CV-Library"];

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

function toJobPosting(v: Job) {
  const [minStr, maxStr] = v.salary.replace(/[£,]/g, "").split(/[-–]/).map((s) => s.trim());
  const min = parseInt(minStr, 10);
  const max = parseInt(maxStr, 10);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": v.title,
    "description": v.description || `${v.title} at ${v.company}. ${v.type}, based in ${v.location}.`,
    "employmentType": /part-time/i.test(v.type) ? "PART_TIME" : "FULL_TIME",
    "datePosted": v.postedDate || new Date().toISOString().slice(0, 10),
    "hiringOrganization": {
      "@type": "Organization",
      "name": v.company,
      "logo": "https://pathwayacademyzone.co.uk/assets/PAZlogo-BYea4nq1.png",
      "sameAs": v.source === "Local" ? SITE_URL : undefined,
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": v.location,
        "addressRegion": "Staffordshire",
        "addressCountry": "GB",
      },
    },
    ...(Number.isFinite(min) && Number.isFinite(max)
      ? {
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "GBP",
            "value": { "@type": "QuantitativeValue", "minValue": min, "maxValue": max, "unitText": "YEAR" },
          },
        }
      : {})
  };
}

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSource, setActiveSource] = useState("All");
  const [externalJobs, setExternalJobs] = useState<Job[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let active = true;
    async function load() {
      setListLoading(true);
      try {
        const results = await fetchAllJobs();
        if (active) setExternalJobs(results);
      } catch (e) {
        console.error("External jobs failed:", e);
      } finally {
        if (active) setListLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  const allVisibleJobs = useMemo(() => {
    const combined = [...LOCAL_VACANCIES, ...externalJobs];
    return combined.filter((j) => {
      const matchSrc = activeSource === "All" || j.source === activeSource;
      const matchQ = !searchQuery || j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSrc && matchQ;
    });
  }, [externalJobs, activeSource, searchQuery]);

  const sourceCounts = useMemo(() => {
    const combined = [...LOCAL_VACANCIES, ...externalJobs];
    const map: Record<string, number> = { All: combined.length };
    combined.forEach((j) => (map[j.source] = (map[j.source] || 0) + 1));
    return map;
  }, [externalJobs]);

  const jsonLd = allVisibleJobs.slice(0, 10).map(toJobPosting);

  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", interest: undefined, about: "" },
    mode: "onTouched",
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<FormValues & { phone_e164?: string }>({
    url: CAREERS_WEBHOOK,
    method: "POST",
    format: "json",
    extra: { source: "careers-form", site: SITE_URL },
    onSuccess: () => {
      toast({ title: "Application sent", description: "Thanks — we'll be in touch soon." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Couldn't send application", description: err instanceof Error ? err.message : "Please try again." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
    await submit({ ...values, phone_e164: normaliseUkPhone(values.phone || "") });
  });

  const phone = watch("phone");

  return (
    <Layout>
      <Seo
        title="Careers & Opportunities"
        description="Join our team of dedicated Alternative Provision specialists. View current vacancies in Stoke-on-Trent and Staffordshire."
        jsonLd={jsonLd}
      />

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: "Careers" }]}
              className="text-primary-foreground/70 mb-6 [&_a]:hover:text-primary-foreground [&_[aria-current]]:text-primary-foreground"
            />
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">Join Our Team</h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
              Help us transform young lives through trauma-informed education and specialist support.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p) => (
              <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px bg-primary/20 flex-1" />
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] shrink-0">Open Positions</span>
              <div className="h-px bg-primary/20 flex-1" />
            </div>

            <div className="relative group">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role or keyword..."
                className="w-full h-16 pl-14 pr-6 rounded-full bg-card border border-border text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>

            <FilterPills
              options={SOURCES}
              active={activeSource}
              onChange={setActiveSource}
              counts={sourceCounts}
            />
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {listLoading ? (
              <JobListSkeleton count={3} />
            ) : (
              <AnimatePresence mode="popLayout">
                {allVisibleJobs.length > 0 ? (
                  allVisibleJobs.map((v, i) => (
                    <motion.article
                      key={v.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="bg-card rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-border/50 hover:shadow-2xl hover:shadow-primary/5 transition-all relative group"
                    >
                      {v.source === "Local" && (
                        <div className="absolute top-0 right-12 px-6 py-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] rounded-b-2xl">
                          Pathway Hire
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">{v.source}</span>
                            {v.postedDate && <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Posted {new Date(v.postedDate).toLocaleDateString()}</span>}
                          </div>
                          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">{v.title}</h3>
                          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" />{v.company}</span>
                            <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />{v.type}</span>
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{v.location}</span>
                          </div>
                          <p className="text-2xl font-bold text-primary">{v.salary}</p>
                        </div>
                        <div className="shrink-0 flex flex-col gap-4">
                          <Button asChild size="xl" className="rounded-full px-10 h-16 text-lg font-bold">
                            <a href={v.url} target={v.source === "Local" ? "_self" : "_blank"} rel="noopener noreferrer">
                              {v.source === "Local" ? "View Details" : "Apply via " + v.source}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                          </Button>
                          {v.source !== "Local" && (
                            <p className="text-[10px] text-center text-muted-foreground uppercase font-bold tracking-widest flex items-center justify-center gap-2">
                              <Globe className="h-3 w-3" /> External Platform
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="text-center py-24 bg-card rounded-[3rem] border border-dashed border-border/50">
                    <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-6 opacity-20" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">No matching roles found</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-8">Try adjusting your search or switching sources to find more opportunities.</p>
                    <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveSource("All"); }} className="rounded-full font-bold">Reset Filters</Button>
                  </div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Speculative</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">Talent Community</h2>
            <p className="text-muted-foreground text-lg text-balance">Don't see a suitable role? We're always interested in hearing from talented individuals who share our vision. Submit your details below.</p>
          </div>

          <form onSubmit={onSubmit} noValidate className="bg-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField id="careers-name" label="Your Name" required autoComplete="name" placeholder="Full name" error={errors.name?.message} {...register("name")} />
              <FormField id="careers-email" label="Email Address" required type="email" inputMode="email" autoComplete="email" placeholder="your@email.com" error={errors.email?.message} {...register("email")} />
            </div>

            <FormField
              id="careers-phone"
              name="phone"
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

            <FormField
              as="textarea"
              id="careers-about"
              label="Tell Us About Yourself"
              required
              rows={5}
              maxLength={1500}
              placeholder="Background, qualifications, why you'd like to join us…"
              error={errors.about?.message}
              {...register("about")}
            />

            <div className="pt-4">
              <Button type="submit" size="xl" disabled={loading} className="w-full rounded-full h-16 text-lg font-bold shadow-xl shadow-primary/20">
                {loading ? (
                  <span className="inline-flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Processing Application...</span>
                ) : ("Submit Speculative Application")}
              </Button>
              {success && <p className="flex items-center justify-center gap-2 text-sm font-bold text-primary mt-6 bg-primary/10 p-4 rounded-xl"><CheckCircle2 className="h-5 w-5" /> Thanks — we&apos;ll be in touch soon.</p>}
              {error && <p className="flex items-center justify-center gap-2 text-sm font-bold text-destructive mt-6 bg-destructive/10 p-4 rounded-xl"><AlertCircle className="h-5 w-5" /> {error}</p>}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
