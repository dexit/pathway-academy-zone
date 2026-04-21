import { motion } from "framer-motion";
import { whyItMatters } from "@/config/data/homepage";
import { Target, School, Heart, UserCheck, BookOpen, Shield, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Target,
  School,
  Heart,
  UserCheck,
  BookOpen,
  Shield,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function WhyItMatters() {
  return (
    <section className="py-24 bg-accent/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
              {whyItMatters.subtitle}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              {whyItMatters.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {whyItMatters.description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyItMatters.points.map((point, index) => {
            const Icon = iconMap[point.icon];
            return (
              <motion.div
                key={point.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: index * 0.1, duration: 0.5 }
                  },
                }}
                className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group active:scale-[0.98]"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {Icon && <Icon className="h-7 w-7 transition-transform group-hover:scale-110" />}
                </div>
                <h3 className="font-display font-bold text-xl mb-4 text-foreground group-hover:text-primary transition-colors">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 p-8 bg-primary rounded-3xl text-primary-foreground text-center shadow-2xl"
        >
          <h3 className="font-display text-2xl font-bold mb-4">Accepting Referrals Today</h3>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            We work closely with commissioning schools so that the academic thread is never broken, and we support a managed return to mainstream wherever it is the right outcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/referral"
              className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-all active:scale-95"
            >
              Start Referral Form
            </a>
            <a
              href="/contact"
              className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all active:scale-95"
            >
              Contact Our Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
