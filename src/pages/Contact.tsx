import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message Sent", description: "We'll respond within 24 hours." });
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Contact Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Whether you have a question, want to arrange a visit, or need to discuss a referral, we're here to help.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">Phone</h3>
                    <p className="text-primary font-semibold">01782 365365</p>
                    <p className="text-muted-foreground text-sm">Mon-Fri 8:30am - 4:00pm</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">Email</h3>
                    <p className="text-primary font-semibold">info@pathwaygroup.co.uk</p>
                    <p className="text-muted-foreground text-sm">We aim to respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">Address</h3>
                    <p className="text-foreground">Duncalf St, Burslem</p>
                    <p className="text-foreground">Stoke-on-Trent ST6 3LJ</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">Opening Hours</h3>
                    <p className="text-foreground">Monday - Friday</p>
                    <p className="text-foreground">8:30am - 4:00pm</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-2xl p-8 border border-border/50">
                <Input placeholder="Your Name *" required />
                <Input type="email" placeholder="Email Address *" required />
                <Input type="tel" placeholder="Phone Number" />
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                  <option value="">Enquiry Type *</option>
                  <option>Referral Enquiry</option>
                  <option>Arrange a Visit</option>
                  <option>Partnership Enquiry</option>
                  <option>Careers Enquiry</option>
                  <option>General Question</option>
                  <option>Other</option>
                </select>
                <Input placeholder="Organisation (if applicable)" />
                <Textarea placeholder="Your Message *" rows={5} required />
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">By submitting this form, you agree to our privacy policy.</p>
              </form>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16">
            {[
              { label: "Make a Referral", desc: "Start the referral process for a young person", path: "/referral" },
              { label: "Visit Our Centre", desc: "See our facilities and meet the team", path: "/centres" },
              { label: "Join Our Team", desc: "View current vacancies and opportunities", path: "/careers" },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="group bg-card rounded-xl p-6 border border-border/50 hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-foreground mb-1 flex items-center gap-2">{link.label} <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" /></h3>
                <p className="text-muted-foreground text-sm">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
