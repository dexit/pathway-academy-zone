import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, CheckCircle, ArrowRight, MapPin, Building2, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { programmes } from "@/data/programmes-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Programmes() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProgrammes = useMemo(() => {
    return programmes.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "CourseCarousel",
    "name": "Alternative Provision Programmes",
    "description": "Range of structured programmes for young people in Staffordshire.",
    "itemListElement": programmes.map((p, i) => ({
      "@type": "Course",
      "position": i + 1,
      "name": p.title,
      "description": p.desc,
      "provider": {
        "@type": "Organization",
        "name": "Pathway Academy Zone",
        "sameAs": "https://pathwayacademyzone.co.uk"
      }
    }))
  };

  return (
    <Layout>
      <Seo
        title="Our Programmes"
        description="We offer structured academic and vocational programmes tailored for young people with SEMH needs in Staffordshire."
        jsonLd={courseJsonLd}
      />

      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Programmes</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Pathways to Success</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            We offer a range of structured programmes designed to meet individual needs, combining academic learning with vocational skills and therapeutic support.
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search programmes..."
              className="pl-10 h-12 rounded-full border-border bg-card shadow-sm focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {filteredProgrammes.length > 0 ? (
            <div className="space-y-24">
              <AnimatePresence mode="popLayout">
                {filteredProgrammes.map((prog, i) => (
                  <motion.div
                    key={prog.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
                  >
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5">
                        <prog.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{prog.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">{prog.desc}</p>
                      <ul className="space-y-3 mb-6">
                        {prog.features.map((f) => (
                          <li key={f} className="flex items-center gap-3 text-foreground">
                            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{prog.schedule}</span>
                        <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{prog.time}</span>
                      </div>
                    </div>
                    <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                      <img src={prog.img} alt={prog.title} className="rounded-2xl shadow-lg w-full h-80 object-cover" loading="lazy" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg italic">No programmes found matching "{searchQuery}"</p>
              <Button
                variant="link"
                onClick={() => setSearchQuery("")}
                className="text-primary mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div>
              <span className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-wider uppercase mb-3">
                <Building2 className="h-4 w-4" /> Where We Deliver
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Our Programmes are Delivered at Our Centres
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                Every programme is delivered in our purpose-built learning
                centre in Burslem, Stoke-on-Trent. Visit the Centres page to see
                our facilities, a typical day&apos;s timetable, and how to
                arrange a tour.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Duncalf St, Burslem ST6 3LJ
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Mon–Fri, 8:30am–4:00pm
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Button asChild>
                <Link to="/centres" title="Our Centres">
                  Visit Our Centres <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact" title="Arrange a tour">
                  Arrange a Tour
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Find the Right Programme</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Every young person is unique. Contact us to discuss which pathway would best support your student's needs and goals.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90 rounded-full">
              <Link to="/referral">Make a Referral <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full bg-transparent">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
