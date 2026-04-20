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
const qualities = [
  "Believe in every young person's potential",
  "Are resilient and patient, even when things are challenging",
  "Build strong, trusting relationships with young people",
  "Collaborate effectively with colleagues and partners",
  "Are committed to continuous learning and improvement",
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
  {
    id: "local-3",
    title: "Learning Support Assistant",
    type: "Part-time (20hrs)",
    location: "Stafford",
    salary: "£12.50/hour",
    company: SITE_NAME,
    url: "#learning-support-assistant",
    source: "Local",
    postedDate: "2024-12-08",
    description: "Learning Support Assistant at Pathway Academy Zone. Part-time (20hrs), based in Stafford.",
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
  const slug = v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: v.title,
    description: v.description || `${v.title} at ${v.company}. ${v.type}, based in ${v.location}.`,
    employmentType: /part-time/i.test(v.type) ? "PART_TIME" : "FULL_TIME",
    datePosted: v.postedDate || new Date().toISOString().slice(0, 10),
    hiringOrganization: {
      "@type": "Organization",
      name: v.company,
      sameAs: v.source === "Local" ? SITE_URL : undefined,
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
    url: v.source === "Local" ? `${SITE_URL}/careers#${slug}` : v.url,
  };
}

export default function Careers() {
  const { toast } = useToast();
  const [listLoading, setListLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSource, setActiveSource] = useState("All");
  const [dynamicJobs, setDynamicJobs] = useState<Job[]>([]);

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

  const filteredLocal = useMemo(() => {
    return LOCAL_VACANCIES.filter((j) => {
      const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           j.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource = activeSource === "All" || activeSource === "Local";
      return matchesSearch && matchesSource;
    });
  }, [searchQuery, activeSource]);

  useEffect(() => {
    if (activeSource === "Local") {
      setDynamicJobs([]);
      return;
    }

    const fetchDynamic = async () => {
      setListLoading(true);
      const sourcesToFetch = activeSource === "All"
        ? ["Reed", "Adzuna", "CV-Library"]
        : [activeSource];

      const jobs = await fetchAllJobs(searchQuery || "Education", sourcesToFetch);
      setDynamicJobs(jobs);
      setListLoading(false);
    };

    const timer = setTimeout(fetchDynamic, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, activeSource]);

  const allVisibleJobs = useMemo(() => {
    const combined = [...filteredLocal, ...dynamicJobs];
    return combined.sort((a, b) => {
      const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
      const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
      return dateB - dateA;
    });
  }, [filteredLocal, dynamicJobs]);

  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = { All: LOCAL_VACANCIES.length + dynamicJobs.length };
    counts["Local"] = LOCAL_VACANCIES.length;
    dynamicJobs.forEach(j => {
      counts[j.source] = (counts[j.source] || 0) + 1;
    });
    return counts;
  }, [dynamicJobs]);

  const vacanciesSchema = useMemo(() => [
    ...allVisibleJobs.map(toJobPosting),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: allVisibleJobs.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: v.title,
        url: v.source === "Local"
          ? `${SITE_URL}/careers#${v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`
          : v.url,
      })),
    },
  ], [allVisibleJobs]);

  return (
    <Layout>
      <Seo
        title="Careers"
        description="Current vacancies and speculative applications at Pathway Academy Zone. Join a team making a real difference for young people in Staffordshire."
        jsonLd={vacanciesSchema}
      />
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Careers
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join Our Team
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're looking for passionate educators, mentors, and support staff who want to make a difference in young people's lives.
          </p>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Careers" }]} />
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            Why Work at Pathway Academy Zone?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-4">
            What We Look For
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            We value attitude and commitment as much as qualifications. Our ideal team members:
          </p>
          <div className="space-y-3">
            {qualities.map((q) => (
              <div
                key={q}
                className="flex items-center gap-3 bg-card rounded-xl px-6 py-4 border border-border/50"
              >
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Current Vacancies
          </h2>

          <div className="mb-12 space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title or keyword..."
                className="w-full h-14 pl-12 pr-4 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
              />
            </div>

            <FilterPills
              options={SOURCES}
              active={activeSource}
              onChange={setActiveSource}
              counts={sourceCounts}
            />
          </div>

          <div className="space-y-6">
            {listLoading ? (
              <JobListSkeleton count={3} />
            ) : (
              <AnimatePresence mode="popLayout">
                {allVisibleJobs.length > 0 ? (
                  allVisibleJobs.map((v, i) => {
                    const slug = v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    const isLocal = v.source === "Local";

                    return (
                      <motion.article
                        key={v.id}
                        id={isLocal ? slug : undefined}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow relative overflow-hidden group"
                      >
                        {isLocal && (
                          <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                            Direct Hire
                          </div>
                        )}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                isLocal ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                              }`}>
                                {v.source}
                              </span>
                              {v.postedDate && (
                                <span className="text-[10px] text-muted-foreground">
                                  Posted {new Date(v.postedDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {v.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Building2 className="h-4 w-4" />
                                {v.company}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Briefcase className="h-4 w-4" />
                                {v.type}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                {v.location}
                              </span>
                            </div>
                            <p className="text-primary font-bold mt-3 text-lg">{v.salary}</p>
                          </div>
                          <div className="flex flex-col gap-2 shrink-0">
                            <Button asChild className="rounded-full px-8">
                              <a href={v.url} target={isLocal ? "_self" : "_blank"} rel="noopener noreferrer">
                                {isLocal ? "View Details" : "Apply on " + v.source}
                              </a>
                            </Button>
                            {!isLocal && (
                              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                                <Globe className="h-3 w-3" /> External Site
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border"
                  >
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <SearchIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">No matching jobs found</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Try adjusting your search query or switching sources to find more opportunities.
                    </p>
                    <Button
                      variant="link"
                      onClick={() => { setSearchQuery(""); setActiveSource("All"); }}
                      className="mt-4"
                    >
                      Reset filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-4">
            Speculative Applications
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Don't see a suitable role? We're always interested in hearing from talented individuals.
          </p>
          <form
            onSubmit={onSubmit}
            noValidate
            className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                id="careers-name"
                label="Your Name"
                required
                autoComplete="name"
                placeholder="Full name"
                error={errors.name?.message}
                {...register("name")}
              />
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
                  columns={5}
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

            <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting...
                </span>
              ) : (
                "Submit Enquiry"
              )}
            </Button>
            {success && (
              <p className="flex items-center justify-center gap-2 text-xs font-medium text-primary">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks — we&apos;ll be in touch
                soon.
              </p>
            )}
            {error && (
              <p className="flex items-center justify-center gap-2 text-xs font-medium text-destructive">
                <AlertCircle className="h-4 w-4" aria-hidden="true" /> {error}
              </p>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}
