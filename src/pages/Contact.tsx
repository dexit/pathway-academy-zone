import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, AlertTriangle, Instagram, Facebook, Youtube, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const hours = [
  { service: "Boarding Check-in/out", hours: "Mon–Sat 7 AM – 6 PM, Sun 8 AM – 5 PM" },
  { service: "Daycare", hours: "Mon–Fri 7 AM – 6 PM, Sat 7 AM – 12 PM" },
  { service: "Grooming", hours: "Tue–Sat 9 AM – 5 PM (by appointment)" },
  { service: "Training", hours: "Mon–Sat (by appointment)" },
  { service: "Tours", hours: "Mon–Sat 10 AM – 4 PM (scheduled)" },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; subject: string } | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email)) e.email = "Please enter a valid email";
    if (!message.trim()) e.message = "Message is required";
    else if (message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmittedData({ name, email, subject });
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you shortly.");
  };

  const resetForm = () => {
    setName(""); setEmail(""); setPhone(""); setSubject("General Inquiry"); setMessage("");
    setSubmitted(false); setErrors({});
  };

  const inputCls = "w-full border border-input rounded-lg px-4 py-3 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <Layout>
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Get In Touch</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-2 mb-6">Contact Us</h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground">2847 Willow Creek Drive<br />Greenfield, OR 97401</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground">(541) 555-0123</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">hello@boutiqueboarding.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="py-4 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm">Emergency Contact (current guests only)</p>
              <p className="text-sm text-muted-foreground">(541) 555-0199 — Available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hours + Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Hours */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Operating Hours</h2>
              <div className="space-y-4">
                {hours.map((h) => (
                  <div key={h.service} className="flex items-start gap-3 bg-card rounded-xl p-4 shadow-sm">
                    <Clock className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{h.service}</p>
                      <p className="text-xs text-muted-foreground">{h.hours}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[Instagram, Facebook, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-foreground">
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm mb-4">We'll get back to you shortly.</p>
                  {submittedData && (
                    <div className="bg-secondary/50 rounded-xl p-4 text-left text-sm space-y-1 mb-6">
                      <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground font-medium">{submittedData.name}</span></p>
                      <p><span className="text-muted-foreground">Email:</span> <span className="text-foreground font-medium">{submittedData.email}</span></p>
                      <p><span className="text-muted-foreground">Subject:</span> <span className="text-foreground font-medium">{submittedData.subject}</span></p>
                    </div>
                  )}
                  <Button onClick={resetForm} variant="outline">Send Another Message</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Name *</label>
                      <input value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} className={inputCls} />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                      <input value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} className={inputCls} />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone (optional)</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls}>
                      <option>General Inquiry</option>
                      <option>Boarding Question</option>
                      <option>Daycare Question</option>
                      <option>Grooming</option>
                      <option>Training</option>
                      <option>Tour Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Message *</label>
                    <textarea value={message} onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: "" })); }} rows={5} className={inputCls} />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">Send Message</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
