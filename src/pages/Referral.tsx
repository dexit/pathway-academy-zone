import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone, FileText, Users, CalendarCheck, CheckCircle, MapPin, ClipboardList,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { fireConversion } from "@/components/Analytics";
import { Seo, SITE_URL } from "@/components/Seo";
import { FormBuilder } from "@/components/forms/FormBuilder";
import {
  REFERRAL_FORM_META, referralSchema, type ReferralValues,
} from "@/lib/form-configs/referral";
import { normaliseUkPhone } from "@/lib/uk-validators";
import { PageHero } from "@/components/PageHero";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const steps = [
  { num: 1, icon: Phone, title: "Initial Contact", desc: "Contact us by phone or complete the referral form to discuss your young person's needs." },
  { num: 2, icon: FileText, title: "Information Gathering", desc: "We collect relevant documentation including educational history, EHCP/SEN information, and safeguarding details." },
  { num: 3, icon: Users, title: "Assessment Meeting", desc: "We meet with the young person and family to assess needs and discuss potential pathways." },
  { num: 4, icon: CalendarCheck, title: "Placement Planning", desc: "We create a personalised plan and agree start dates, transport arrangements, and support packages." },
];

const eligibility = [
  "Young people aged 11-16",
  "Permanently excluded or at risk of exclusion",
  "Disengaged from mainstream education",
  "Social, emotional and mental health needs",
  "Anxiety-based non-attendance",
  "Looked after children and care leavers",
];

const docs = [
  "Recent school reports and attendance data",
  "EHCP or SEN support documentation (if applicable)",
  "Any relevant safeguarding information",
  "Professional reports (educational psychology, CAMHS, etc.)",
  "PEP (Personal Education Plan) for looked after children",
];

export default function Referral() {
  const { toast } = useToast();

  const { register, handleSubmit, control, setValue, watch, reset: resetForm, formState: { errors } } = useForm<ReferralValues>({
    resolver: zodResolver(referralSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "", lastName: "", role: undefined, email: "", phone: "", organisation: "", postcode: "",
      ypFirstName: "", ypLastName: "", dob: "", yearGroup: undefined, currentSchool: "",
      programme: undefined, reason: "", additionalInfo: "",
    },
  });

  const { submit, loading, error, success, reset: resetStatus } = useFormSubmit<ReferralValues & { phone_e164?: string }>({
    url: import.meta.env.VITE_REFERRAL_WEBHOOK as string | undefined,
    method: "POST",
    format: "json",
    extra: { source: "referral-form", site: SITE_URL },
    onSuccess: () => {
      fireConversion("referral_submit");
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

  return (
    <Layout>
      <Seo
        title="Make a Referral"
        description="Refer a young person to Pathway Academy Zone — Alternative Provision in Stoke-on-Trent for ages 11–16. Schools, Local Authorities, social workers and virtual schools welcome."
      />

      <PageHero
        variant="primary"
        align="center"
        badge={{ label: "Referral Process", icon: ClipboardList }}
        breadcrumbs={[{ label: "Referral" }]}
        heading="How to Refer a Young Person"
        subheading="We accept referrals from schools, local authorities, social workers, and virtual schools. Our team responds within 48 hours."
      />

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

      <section
        className="py-24 bg-primary"
        itemScope
        itemType="https://schema.org/EducationalOrganization"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-6">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-foreground">
                    <CheckCircle className="h-5 w-5 text-primary-foreground/60 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-6">Documentation Required</h2>
              <ul className="space-y-3">
                {docs.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-foreground">
                    <CheckCircle className="h-5 w-5 text-primary-foreground/60 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">Referral Form</h2>
            <p className="text-muted-foreground text-center mb-10">Complete this form and our team will contact you within 2 working days.</p>
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
              <FormBuilder
                config={REFERRAL_FORM_META}
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
          </motion.div>
        </div>
      </section>

      {/* Areas we accept referrals from */}
      <section className="py-12 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-display text-base font-semibold text-foreground mb-2">Accepting Referrals From Across the Region</h2>
          <p className="text-muted-foreground text-sm mb-5">
            Schools, local authorities, virtual schools and social workers from across Staffordshire
            and the wider West Midlands are welcome to refer.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: "Stoke-on-Trent",        slug: "stoke-on-trent" },
              { name: "Newcastle-under-Lyme",  slug: "newcastle-under-lyme" },
              { name: "Stafford",              slug: "stafford" },
              { name: "Cannock",               slug: "cannock" },
              { name: "Lichfield",             slug: "lichfield" },
              { name: "Tamworth",              slug: "tamworth" },
              { name: "Wolverhampton",         slug: "wolverhampton" },
              { name: "Leek",                  slug: "leek" },
            ].map((a) => (
              <Link
                key={a.slug}
                to={`/alternative-provision/${a.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <MapPin className="h-3 w-3" />{a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
