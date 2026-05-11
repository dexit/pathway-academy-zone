import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Heart, Users, GraduationCap, Clock, CheckCircle, ExternalLink,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Seo, SITE_URL, SITE_NAME } from "@/components/Seo";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { fireConversion } from "@/components/Analytics";
import { FormBuilder } from "@/components/forms/FormBuilder";
import { CAREERS_FORM_META, careersSchema, type CareersValues } from "@/lib/form-configs/careers";
import { normaliseUkPhone } from "@/lib/uk-validators";
import { PageHero } from "@/components/PageHero";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const JOBS_EMBED_URL = "https://job.pathwaygroup.co.uk/";

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

const careersJsonLd = {
  "@context": "https://schema.org",
  "@type": "EmployerAggregateRating",
  itemReviewed: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: SITE_URL,
  },
  description: "Pathway Academy Zone careers and vacancies — join our team supporting young people in Staffordshire.",
  url: `${SITE_URL}/careers`,
};

export default function Careers() {
  const { toast } = useToast();

  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<CareersValues>({
    resolver: zodResolver(careersSchema),
    mode: "onTouched",
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", interest: undefined, about: "" },
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<CareersValues & { phone_e164?: string; name?: string }>({
    url: import.meta.env.VITE_CAREERS_WEBHOOK as string | undefined,
    method: "POST",
    format: "json",
    extra: { source: "careers-speculative" },
    onSuccess: () => {
      fireConversion("careers_submit");
      toast({ title: "Application submitted", description: "We'll be in touch soon." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Couldn't submit", description: err instanceof Error ? err.message : "Please try again." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
    await submit({
      ...values,
      name: `${values.firstName} ${values.lastName}`.trim(),
      phone_e164: normaliseUkPhone(values.phone || ""),
    });
  });

  return (
    <Layout>
      <Seo
        title="Careers at Pathway Academy Zone"
        description="Current vacancies and speculative applications at Pathway Academy Zone. Join a team making a real difference for young people in Staffordshire."
        jsonLd={careersJsonLd}
      />

      {/* hidden JobPosting microdata hint */}
      <meta itemScope itemType="https://schema.org/JobPosting" content="" />

      <PageHero
        variant="primary"
        align="center"
        badge={{ label: "Careers", icon: GraduationCap }}
        breadcrumbs={[{ label: "Careers" }]}
        heading="Join Our Team"
        subheading="We're looking for passionate educators, mentors, and support staff who want to make a difference in young people's lives."
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">Why Work at Pathway Academy Zone?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {perks.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border/50">
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
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-4">What We Look For</h2>
          <p className="text-muted-foreground text-center mb-10">We value attitude and commitment as much as qualifications. Our ideal team members:</p>
          <div className="space-y-3">
            {qualities.map((q) => (
              <div key={q} className="flex items-center gap-3 bg-card rounded-xl px-6 py-4 border border-border/50">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background" id="vacancies">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 max-w-screen-xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground">Current Vacancies</h2>
            <a
              href={JOBS_EMBED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium content-link"
            >
              Open in new tab <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden shadow-sm bg-card w-full max-w-screen-xl mx-auto">
            <iframe
              src={JOBS_EMBED_URL}
              title="Current Job Vacancies — Pathway Group"
              loading="lazy"
              className="w-full border-0"
              style={{ minHeight: "1180px", height: "1180px" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Vacancies are managed via{" "}
            <a
              href={JOBS_EMBED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="content-link"
            >
              job.pathwaygroup.co.uk
            </a>
          </p>
        </div>
      </section>

      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-4">Speculative Applications</h2>
          <p className="text-muted-foreground text-center mb-10">Don't see a suitable role? We're always interested in hearing from talented individuals.</p>
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
            <FormBuilder
              config={CAREERS_FORM_META}
              register={register}
              control={control}
              errors={errors}
              setValue={setValue}
              watch={watch}
              loading={loading}
              error={error}
              success={success}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
