import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Briefcase, MapPin, CheckCircle, Loader2, CheckCircle2, AlertCircle,
  BookOpen, Users, ClipboardList, Sparkles, HandHeart, Zap
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { Seo, Breadcrumbs } from "@/components/Seo";
import { FormField } from "@/components/forms/FormField";
import { IllustratedRadio, type IllustratedOption } from "@/components/forms/IllustratedRadio";
import { personName, email, ukPhone, longMessage } from "@/lib/uk-validators";
import { maskUkPhone, normaliseUkPhone } from "@/lib/uk-validators";
import { JobListSkeleton } from "@/components/SkeletonPlaceholders";
import { perks, qualities, vacancies } from "@/config/data/careers";
import { SITE_URL } from "@/config/site";

const CAREERS_WEBHOOK = "https://hooks.zapier.com/fake-webhook";
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

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
  interest: z.enum(["teaching", "youth-work", "support", "admin", "other"], { required_error: "Please select an area" }),
  about: longMessage(1500, true),
});
type FormValues = z.infer<typeof formSchema>;

export default function Careers() {
  const { toast } = useToast();
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setListLoading(false), 800);
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
      toast({ title: "Application sent", description: "Welcome to the shortlist. We'll be in touch." });
      resetForm();
    },
    onError: (err) =>
      toast({ variant: "destructive", title: "Transmission failed", description: "Try again or contact us directly." }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (success || error) resetStatus();
    await submit({ ...values, phone_e164: normaliseUkPhone(values.phone || "") });
  });

  const phone = watch("phone");

  return (
    <Layout>
      <Seo title="Join the Squad" description="Build your legacy at Pathway Academy Zone. Join a team redefining Alternative Provision for the next generation." />

      {/* Header */}
      <section className="pt-40 pb-24 bg-accent/20 border-b border-border/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-8 block">RECRUITMENT PHASE</span>
            <h1 className="text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic">
              BUILD YOUR <br />
              <span className="text-primary">LEGACY.</span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl font-medium leading-tight">
              We're looking for the elite. The patient. The innovators. Educators who want to change the game, not just follow a lesson plan.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b border-border/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Careers" }]} />
        </div>
      </section>

      {/* Why Work Here - Deep Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <h2 className="text-5xl md:text-7xl uppercase italic font-black tracking-tighter">THE <span className="text-primary">PERKS.</span></h2>
            <p className="text-muted-foreground text-lg max-w-sm">We take care of the people who take care of the legends.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-10 rounded-3xl border-2 border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all active:scale-[0.98] group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <p.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-2xl mb-4 uppercase italic font-black tracking-tighter">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies - Modern List */}
      <section className="py-32 bg-accent/10 border-y border-accent/50">
        <div className="container mx-auto px-4 max-w-5xl">
           <div className="text-center mb-24">
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-6 block text-center">OPEN POSITIONS</span>
            <h2 className="text-5xl md:text-8xl uppercase italic font-black tracking-tighter">ACTIVE <span className="text-primary italic">INTEL.</span></h2>
          </div>

          {listLoading ? (
            <JobListSkeleton count={2} />
          ) : (
            <div className="space-y-8">
              {vacancies.map((v, i) => (
                <motion.article
                  key={v.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-[2rem] p-10 border-2 border-border/50 hover:border-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-12 group"
                >
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl uppercase italic font-black tracking-tighter group-hover:text-primary transition-colors">{v.title}</h3>
                    <div className="flex flex-wrap gap-6 text-sm font-black uppercase tracking-widest text-muted-foreground">
                      <span className="flex items-center gap-2 text-primary"><Zap className="h-4 w-4" />{v.type}</span>
                      <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{v.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4 shrink-0">
                    <p className="text-2xl font-display font-black text-foreground italic">{v.salary}</p>
                    <Button className="rounded-full px-12 h-16 text-lg shadow-xl">VIEW PROTOCOL</Button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Form Section - Clean & Aggressive */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl mb-6 uppercase italic font-black">SPECULATIVE <span className="text-primary italic">DROP.</span></h2>
            <p className="text-muted-foreground text-xl">Don't see your role? Drop your intel below. We always have space for legends.</p>
          </div>

          <form onSubmit={onSubmit} noValidate className="bg-card rounded-[2.5rem] p-12 border-2 border-border/50 shadow-2xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField id="careers-name" label="ID / FULL NAME" required autoComplete="name" placeholder="Agent Name" error={errors.name?.message} {...register("name")} />
              <FormField id="careers-email" label="COMMUNICATION CHANNEL" required type="email" inputMode="email" autoComplete="email" placeholder="your@intel.com" error={errors.email?.message} {...register("email")} />
            </div>

            <FormField
              id="careers-phone"
              label="MOBILE LINE"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="07XXX XXXXXX"
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
                  legend="DEPLOYMENT ZONE"
                  options={interestOptions}
                  value={field.value || ""}
                  onChange={field.onChange}
                  required
                  columns={2}
                  error={errors.interest?.message}
                />
              )}
            />

            <FormField as="textarea" id="careers-about" label="MISSION STATEMENT / BIO" required rows={5} maxLength={1500} placeholder="Tell us why you belong in the zone..." error={errors.about?.message} {...register("about")} />

            <Button type="submit" size="lg" disabled={loading} className="w-full h-24 rounded-3xl text-2xl font-black italic shadow-2xl">
              {loading ? (
                <span className="flex items-center gap-3"><Loader2 className="h-8 w-8 animate-spin" /> UPLOADING...</span>
              ) : ("TRANSMIT APPLICATION")}
            </Button>

            {success && (
              <p className="flex items-center justify-center gap-4 text-xl font-black text-primary uppercase italic p-8 bg-primary/10 rounded-2xl border border-primary/20">
                <CheckCircle2 className="h-8 w-8" /> TRANSMISSION SUCCESSFUL.
              </p>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}
