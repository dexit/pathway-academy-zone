import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, FileText, Users, CalendarCheck, CheckCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { SITE_URL } from "@/components/Seo";

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

export default function Referral() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name:"",role:"",email:"",phone:"",organisation:"",ypName:"",dob:"",yearGroup:"",currentSchool:"",reason:"",additionalInfo:"" });

  const { submit, loading, error, success, reset } = useFormSubmit<typeof formData>({
    url: REFERRAL_WEBHOOK,
    method: "POST",
    format: "json",
    extra: { source: "referral-form", site: SITE_URL },
    onSuccess: () =>
      toast({
        title: "Referral submitted",
        description: "Our team will contact you within 2 working days.",
      }),
    onError: (err) =>
      toast({
        variant: "destructive",
        title: "Couldn't submit referral",
        description: err instanceof Error ? err.message : "Please try again.",
      }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
  };
  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (success || error) reset();
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Layout>
      <section className="py-32 bg-muted/30"><div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Referral Process</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">How to Refer a Young Person</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We accept referrals from schools, local authorities, social workers, and virtual schools.</p>
      </div></section>

      <section className="py-24 bg-background"><div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">The Referral Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (<motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
            <div className="flex items-center gap-3 mb-4"><span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{s.num}</span><s.icon className="h-5 w-5 text-primary" /></div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3><p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>))}
        </div>
      </div></section>

      <section className="py-24 bg-primary"><div className="container mx-auto px-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-primary-foreground mb-6">Eligibility Criteria</h2>
          <ul className="space-y-3">{eligibility.map((item) => (<li key={item} className="flex items-center gap-3 text-primary-foreground"><CheckCircle className="h-5 w-5 text-primary-foreground/60 shrink-0" />{item}</li>))}</ul>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-primary-foreground mb-6">Documentation Required</h2>
          <ul className="space-y-3">{docs.map((item) => (<li key={item} className="flex items-center gap-3 text-primary-foreground"><CheckCircle className="h-5 w-5 text-primary-foreground/60 shrink-0" />{item}</li>))}</ul>
        </motion.div>
      </div></div></section>

      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-3xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">Referral Form</h2>
          <p className="text-muted-foreground text-center mb-10">Complete this form and our team will contact you within 2 working days.</p>
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Your Name *</label><input required value={formData.name} onChange={update("name")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" placeholder="Full name" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Your Role *</label><select required value={formData.role} onChange={update("role")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"><option value="">Select role</option><option>School Staff</option><option>Local Authority</option><option>Social Worker</option><option>Virtual School</option><option>Other Professional</option></select></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label><input required type="email" value={formData.email} onChange={update("email")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Phone Number *</label><input required value={formData.phone} onChange={update("phone")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" /></div>
            </div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Organisation/School</label><input value={formData.organisation} onChange={update("organisation")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" /></div>
            <hr className="border-border" />
            <h3 className="font-display text-lg font-bold text-foreground">Young Person Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Young Person's Name *</label><input required value={formData.ypName} onChange={update("ypName")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Date of Birth *</label><input required type="date" value={formData.dob} onChange={update("dob")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Year Group *</label><select required value={formData.yearGroup} onChange={update("yearGroup")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"><option value="">Select year</option><option>Year 7</option><option>Year 8</option><option>Year 9</option><option>Year 10</option><option>Year 11</option></select></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Current/Previous School</label><input value={formData.currentSchool} onChange={update("currentSchool")} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" /></div>
            </div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Reason for Referral *</label><textarea required value={formData.reason} onChange={update("reason")} rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Additional Information</label><textarea value={formData.additionalInfo} onChange={update("additionalInfo")} rows={3} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm" /></div>
            <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting...
                </span>
              ) : (
                "Submit Referral"
              )}
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
      </div></section>
    </Layout>
  );
}
