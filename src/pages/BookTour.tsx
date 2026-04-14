import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const tourTimes = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

const whatToExpect = [
  "Duration: 30–45 minutes",
  "You'll see: All play areas, suite options, grooming studio",
  "Meet: Available team members and some resident guests",
  "Bring: Your questions!",
  "Optional: Bring your pet for a meet-and-greet (by appointment)",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookTourPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [numAdults, setNumAdults] = useState("1");
  const [petInfo, setPetInfo] = useState("");
  const [questions, setQuestions] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSummary, setSubmittedSummary] = useState<{ name: string; date: string; time: string } | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email)) e.email = "Please enter a valid email";
    if (!phone.trim()) e.phone = "Phone is required";
    if (!preferredDate) e.date = "Please select a date";
    if (!selectedTime) e.time = "Please select a time";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmittedSummary({
      name,
      date: preferredDate ? format(preferredDate, "PPP") : "",
      time: selectedTime,
    });
    setSubmitted(true);
    toast.success("Tour scheduled successfully!");
  };

  const resetForm = () => {
    setName(""); setEmail(""); setPhone(""); setPreferredDate(undefined);
    setSelectedTime(""); setNumAdults("1"); setPetInfo(""); setQuestions("");
    setSubmitted(false); setErrors({});
  };

  const inputCls = "w-full border border-input rounded-lg px-4 py-3 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  if (submitted) {
    return (
      <Layout>
        <section className="py-32 bg-background">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
              <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center mb-6">
                <Check className="h-10 w-10 text-primary-foreground" />
              </div>
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">Tour Scheduled!</h1>
            <p className="text-muted-foreground leading-relaxed">
              We've sent a confirmation to your email with directions and parking information.
            </p>
            {submittedSummary && (
              <div className="bg-secondary/50 rounded-xl p-5 text-left text-sm space-y-2 mt-6">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium text-foreground">{submittedSummary.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium text-foreground">{submittedSummary.date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium text-foreground">{submittedSummary.time}</span></div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button onClick={resetForm} variant="outline">Schedule Another Tour</Button>
              <Button asChild variant="hero"><a href="/">Back to Home</a></Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Visit Us</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-2 mb-6">Book a Tour</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">See our sanctuary in person. Meet the team and explore our natural play areas.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone *</label>
                  <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }} className={inputCls} />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Preferred Date *</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !preferredDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {preferredDate ? format(preferredDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={preferredDate} onSelect={(d) => { setPreferredDate(d); setErrors((p) => ({ ...p, date: "" })); }} disabled={(d) => d < new Date() || d.getDay() === 0} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-destructive text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Preferred Time *</label>
                  <div className="grid grid-cols-4 gap-3">
                    {tourTimes.map((time) => (
                      <button key={time} type="button" onClick={() => { setSelectedTime(time); setErrors((p) => ({ ...p, time: "" })); }}
                        className={`border-2 rounded-lg p-3 text-sm font-medium transition-all ${selectedTime === time ? 'border-primary bg-secondary text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="text-destructive text-sm mt-1">{errors.time}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Number of Adults</label>
                  <select value={numAdults} onChange={(e) => setNumAdults(e.target.value)} className={inputCls}>
                    <option>1</option><option>2</option><option>3</option><option>4</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Tell us about your pet (optional)</label>
                  <textarea value={petInfo} onChange={(e) => setPetInfo(e.target.value)} rows={3} placeholder="We'd love to know who we might be caring for!" className={inputCls} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Questions or special requests</label>
                  <textarea value={questions} onChange={(e) => setQuestions(e.target.value)} rows={3} className={inputCls} />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">Schedule Tour</Button>
              </form>
            </div>

            {/* What to Expect */}
            <div className="md:col-span-2">
              <div className="bg-secondary/50 rounded-2xl p-8 sticky top-24">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">What to Expect</h3>
                <ul className="space-y-4">
                  {whatToExpect.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground text-sm mb-2">Tour Hours</h4>
                  <p className="text-sm text-muted-foreground">Mon–Fri: 10 AM, 2 PM, 4 PM</p>
                  <p className="text-sm text-muted-foreground">Saturday: 10 AM, 12 PM</p>
                  <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
