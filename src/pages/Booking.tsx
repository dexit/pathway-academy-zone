import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { Check, ArrowLeft, ArrowRight, CalendarIcon, Edit2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { format, differenceInDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const steps = ["Service", "Dates", "Pet Info", "Requests", "Review"];

interface ServiceOption {
  key: string;
  label: string;
  price: number;
  unit: string;
  desc: string;
}

const services: ServiceOption[] = [
  { key: "boarding-garden", label: "Boarding – Garden Suite", price: 75, unit: "/night", desc: "120 sq ft, dogs up to 50 lbs" },
  { key: "boarding-cottage", label: "Boarding – Cottage Suite", price: 110, unit: "/night", desc: "180 sq ft, most popular option" },
  { key: "boarding-family", label: "Boarding – Family Suite", price: 145, unit: "/night", desc: "250 sq ft, bonded pairs/siblings" },
  { key: "daycare-full", label: "Daycare – Full Day", price: 48, unit: "/day", desc: "7 AM – 6 PM, small groups of 8" },
  { key: "daycare-half", label: "Daycare – Half Day", price: 32, unit: "/day", desc: "7 AM – 12 PM or 1 – 6 PM" },
  { key: "grooming", label: "Grooming Session", price: 65, unit: "", desc: "Organic bath, nail care, ear cleaning" },
  { key: "training-private", label: "Training – Private Session", price: 95, unit: "/session", desc: "60 min one-on-one, force-free" },
];

interface AddOn {
  key: string;
  label: string;
  price: number;
  unit: string;
}

const addOns: AddOn[] = [
  { key: "organic-meals", label: "Organic Meals", price: 12, unit: "/day" },
  { key: "grooming-addon", label: "Grooming Add-on", price: 45, unit: "" },
  { key: "training-addon", label: "Training Session Add-on", price: 75, unit: "" },
];

function getAvailability(date: Date | undefined) {
  if (!date) return null;
  const day = date.getDay();
  if (day === 0 || day === 6) return { label: "Limited availability", color: "bg-status-limited" };
  return { label: "Good availability", color: "bg-status-available" };
}

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petGender, setPetGender] = useState("Male");
  const [temperament, setTemperament] = useState("");
  const [allergies, setAllergies] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [feedingSchedule, setFeedingSchedule] = useState("");
  const [hasMedication, setHasMedication] = useState(false);
  const [medicationDetails, setMedicationDetails] = useState("");
  const [favoriteToys, setFavoriteToys] = useState("");
  const [bedtimeRoutine, setBedtimeRoutine] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [specialReqs, setSpecialReqs] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const svc = searchParams.get("service");
    if (svc) {
      const match = services.find((s) => s.key === svc);
      if (match) setSelectedService(match.key);
    }
  }, [searchParams]);

  const service = services.find((s) => s.key === selectedService);
  const isBoarding = selectedService.startsWith("boarding");

  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    return Math.max(differenceInDays(checkOutDate, checkInDate), 0);
  }, [checkInDate, checkOutDate]);

  const totalDays = isBoarding ? nights : 1;

  const pricing = useMemo(() => {
    if (!service) return { base: 0, addOnsTotal: 0, total: 0 };
    const base = service.price * (isBoarding ? nights : 1);
    const addOnsTotal = selectedAddOns.reduce((sum, key) => {
      const addon = addOns.find((a) => a.key === key);
      if (!addon) return sum;
      return sum + addon.price * (addon.unit === "/day" ? totalDays : 1);
    }, 0);
    return { base, addOnsTotal, total: base + addOnsTotal };
  }, [service, nights, selectedAddOns, isBoarding, totalDays]);

  const toggleAddOn = (key: string) => {
    setSelectedAddOns((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0 && !selectedService) e.service = "Please select a service";
    if (s === 1) {
      if (!checkInDate) e.checkIn = "Please select a check-in date";
      if (isBoarding && !checkOutDate) e.checkOut = "Please select a check-out date";
      if (isBoarding && checkInDate && checkOutDate && differenceInDays(checkOutDate, checkInDate) < 1) e.checkOut = "Check-out must be after check-in";
    }
    if (s === 2 && !petName.trim()) e.petName = "Pet name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep((s) => Math.min(s + 1, 4)); };
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const goToStep = (s: number) => setStep(s);

  const confirm = () => {
    const id = `MB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    setBookingId(id);
    setConfirmed(true);
    toast.success("Booking confirmed!");
  };

  const resetForm = () => {
    setStep(0); setSelectedService(""); setSelectedAddOns([]);
    setCheckInDate(undefined); setCheckOutDate(undefined);
    setPetName(""); setPetBreed(""); setPetAge(""); setPetWeight(""); setPetGender("Male");
    setTemperament(""); setAllergies(""); setDietaryRestrictions("");
    setFeedingSchedule(""); setHasMedication(false); setMedicationDetails("");
    setFavoriteToys(""); setBedtimeRoutine(""); setEmergencyName(""); setEmergencyPhone("");
    setSpecialReqs(""); setConfirmed(false); setErrors({});
  };

  const inputCls = "w-full border border-input rounded-lg px-4 py-3 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  if (confirmed) {
    return (
      <Layout>
        <section className="py-32 bg-background">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center mb-6">
                <Check className="h-10 w-10 text-primary-foreground" />
              </div>
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-2">Booking ID: {bookingId}</p>
            <div className="bg-card rounded-xl p-6 border border-border/50 text-left space-y-2 text-sm mt-6">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium text-foreground">{service?.label}</span></div>
              {checkInDate && <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span className="font-medium text-foreground">{format(checkInDate, "PPP")}</span></div>}
              {isBoarding && checkOutDate && <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span className="font-medium text-foreground">{format(checkOutDate, "PPP")}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Pet</span><span className="font-medium text-foreground">{petName} {petBreed && `(${petBreed})`}</span></div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display text-xl font-bold text-primary">${pricing.total}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">{petName || "Your pet"}'s visit checklist will arrive 48 hours before check-in.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
              <Button onClick={resetForm} variant="hero">Book Another</Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`h-0.5 w-8 md:w-16 mx-1 ${i < step ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>

          <motion.div key={step} variants={fadeUp} initial="hidden" animate="visible">
            {/* Step 0: Service */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Select Service</h2>
                {errors.service && <p className="text-destructive text-sm mb-3">{errors.service}</p>}
                <div className="space-y-3">
                  {services.map((s) => (
                    <button key={s.key} onClick={() => { setSelectedService(s.key); setErrors({}); }}
                      className={`w-full text-left border-2 rounded-xl p-4 transition-all ${selectedService === s.key ? 'border-primary bg-secondary' : 'border-border hover:border-primary/50'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-foreground text-sm">{s.label}</span>
                          <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                        </div>
                        <span className="font-display font-bold text-primary text-lg">${s.price}<span className="text-xs text-muted-foreground font-normal">{s.unit}</span></span>
                      </div>
                    </button>
                  ))}
                </div>
                {selectedService && (
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4">Add-ons (optional)</h3>
                    <div className="space-y-3">
                      {addOns.map((a) => (
                        <label key={a.key} className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-all">
                          <Checkbox checked={selectedAddOns.includes(a.key)} onCheckedChange={() => toggleAddOn(a.key)} />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-foreground">{a.label}</span>
                          </div>
                          <span className="text-sm font-bold text-primary">+${a.price}{a.unit}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Dates */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Select Dates</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{isBoarding ? "Check-in Date *" : "Date *"}</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !checkInDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    {errors.checkIn && <p className="text-destructive text-sm mt-1">{errors.checkIn}</p>}
                  </div>
                  {isBoarding && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Check-out Date *</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !checkOutDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? format(checkOutDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} disabled={(d) => d < (checkInDate || new Date())} initialFocus className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                      {errors.checkOut && <p className="text-destructive text-sm mt-1">{errors.checkOut}</p>}
                    </div>
                  )}
                  {checkInDate && (
                    <div className="bg-secondary/50 rounded-lg p-4 text-sm text-foreground/80">
                      {(() => {
                        const avail = getAvailability(checkInDate);
                        return avail ? (
                          <span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${avail.color}`} /> {avail.label}</span>
                        ) : null;
                      })()}
                      {isBoarding && nights > 0 && (
                        <p className="mt-2 font-medium text-foreground">{nights} night{nights !== 1 ? "s" : ""} × ${service?.price}/night = ${(service?.price || 0) * nights}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Pet Info */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Pet Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Pet Name *</label>
                    <input value={petName} onChange={(e) => { setPetName(e.target.value); setErrors({}); }} className={inputCls} />
                    {errors.petName && <p className="text-destructive text-sm mt-1">{errors.petName}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Breed</label>
                    <input value={petBreed} onChange={(e) => setPetBreed(e.target.value)} className={inputCls} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Age</label>
                      <input value={petAge} onChange={(e) => setPetAge(e.target.value)} placeholder="Years" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Weight (lbs)</label>
                      <input value={petWeight} onChange={(e) => setPetWeight(e.target.value)} placeholder="lbs" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Gender</label>
                      <select value={petGender} onChange={(e) => setPetGender(e.target.value)} className={inputCls}>
                        <option>Male</option><option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Temperament / personality notes</label>
                    <textarea value={temperament} onChange={(e) => setTemperament(e.target.value)} rows={2} placeholder="e.g., playful, shy around large dogs" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Medical conditions or allergies</label>
                    <input value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="e.g., chicken allergy, hip dysplasia" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Dietary restrictions</label>
                    <input value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} placeholder="e.g., grain-free diet" className={inputCls} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Requests */}
            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Care Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Feeding Schedule</label>
                    <input value={feedingSchedule} onChange={(e) => setFeedingSchedule(e.target.value)} placeholder="e.g., 7 AM and 5 PM, 1 cup each" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Does your pet take any medication?</label>
                    <div className="flex gap-3 mt-1">
                      <button type="button" onClick={() => setHasMedication(false)} className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${!hasMedication ? 'border-primary bg-secondary text-primary' : 'border-border text-muted-foreground'}`}>No</button>
                      <button type="button" onClick={() => setHasMedication(true)} className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${hasMedication ? 'border-primary bg-secondary text-primary' : 'border-border text-muted-foreground'}`}>Yes</button>
                    </div>
                  </div>
                  {hasMedication && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Medication details</label>
                      <textarea value={medicationDetails} onChange={(e) => setMedicationDetails(e.target.value)} rows={2} placeholder="Medication name, dosage, and timing" className={inputCls} />
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Favorite treats or toys</label>
                    <input value={favoriteToys} onChange={(e) => setFavoriteToys(e.target.value)} placeholder="e.g., squeaky ball, peanut butter treats" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Bedtime routine preferences</label>
                    <input value={bedtimeRoutine} onChange={(e) => setBedtimeRoutine(e.target.value)} placeholder="e.g., sleeps at 9 PM, likes a blanket" className={inputCls} />
                  </div>
                  <div className="border-t border-border pt-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">Emergency Contact</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} placeholder="Contact name" className={inputCls} />
                      <input value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} placeholder="Phone number" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Any fears, triggers, or additional notes?</label>
                    <textarea rows={3} value={specialReqs} onChange={(e) => setSpecialReqs(e.target.value)} placeholder="e.g., afraid of thunderstorms, doesn't like baths" className={inputCls} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Review & Confirm</h2>
                <div className="space-y-4">
                  {/* Service */}
                  <div className="bg-card rounded-xl p-5 border border-border/50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-foreground text-sm">Service</h3>
                      <button onClick={() => goToStep(0)} className="text-primary text-xs flex items-center gap-1 hover:underline"><Edit2 className="h-3 w-3" /> Edit</button>
                    </div>
                    <p className="text-foreground text-sm">{service?.label || "–"}</p>
                    {selectedAddOns.length > 0 && (
                      <p className="text-muted-foreground text-xs mt-1">Add-ons: {selectedAddOns.map((k) => addOns.find((a) => a.key === k)?.label).join(", ")}</p>
                    )}
                  </div>
                  {/* Dates */}
                  <div className="bg-card rounded-xl p-5 border border-border/50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-foreground text-sm">Dates</h3>
                      <button onClick={() => goToStep(1)} className="text-primary text-xs flex items-center gap-1 hover:underline"><Edit2 className="h-3 w-3" /> Edit</button>
                    </div>
                    {checkInDate && <p className="text-foreground text-sm">{isBoarding ? `${format(checkInDate, "PPP")} → ${checkOutDate ? format(checkOutDate, "PPP") : "–"}` : format(checkInDate, "PPP")}</p>}
                    {isBoarding && nights > 0 && <p className="text-muted-foreground text-xs mt-1">{nights} night{nights !== 1 ? "s" : ""}</p>}
                  </div>
                  {/* Pet */}
                  <div className="bg-card rounded-xl p-5 border border-border/50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-foreground text-sm">Pet</h3>
                      <button onClick={() => goToStep(2)} className="text-primary text-xs flex items-center gap-1 hover:underline"><Edit2 className="h-3 w-3" /> Edit</button>
                    </div>
                    <p className="text-foreground text-sm">{petName || "–"} {petBreed && `(${petBreed})`} {petAge && `· ${petAge} yrs`} {petWeight && `· ${petWeight} lbs`}</p>
                    {(allergies || dietaryRestrictions) && <p className="text-muted-foreground text-xs mt-1">{[allergies, dietaryRestrictions].filter(Boolean).join(" · ")}</p>}
                  </div>
                  {/* Preferences */}
                  <div className="bg-card rounded-xl p-5 border border-border/50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-foreground text-sm">Preferences</h3>
                      <button onClick={() => goToStep(3)} className="text-primary text-xs flex items-center gap-1 hover:underline"><Edit2 className="h-3 w-3" /> Edit</button>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {feedingSchedule && <p>Feeding: {feedingSchedule}</p>}
                      {hasMedication && medicationDetails && <p>Medication: {medicationDetails}</p>}
                      {emergencyName && <p>Emergency: {emergencyName} {emergencyPhone && `(${emergencyPhone})`}</p>}
                      {specialReqs && <p>Notes: {specialReqs}</p>}
                      {!feedingSchedule && !specialReqs && !emergencyName && <p>No special requests</p>}
                    </div>
                  </div>
                  {/* Pricing */}
                  <div className="bg-card rounded-xl p-5 border border-primary/30 ring-1 ring-primary/10">
                    <h3 className="font-semibold text-foreground text-sm mb-3">Pricing Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{service?.label} {isBoarding && nights > 0 ? `× ${nights} night${nights !== 1 ? "s" : ""}` : ""}</span>
                        <span className="text-foreground">${pricing.base}</span>
                      </div>
                      {selectedAddOns.map((k) => {
                        const addon = addOns.find((a) => a.key === k);
                        if (!addon) return null;
                        const cost = addon.price * (addon.unit === "/day" ? totalDays : 1);
                        return (
                          <div key={k} className="flex justify-between">
                            <span className="text-muted-foreground">{addon.label}{addon.unit === "/day" ? ` × ${totalDays} day${totalDays !== 1 ? "s" : ""}` : ""}</span>
                            <span className="text-foreground">${cost}</span>
                          </div>
                        );
                      })}
                      <div className="border-t border-border pt-2 flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-display text-xl font-bold text-primary">${pricing.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <Button onClick={prev} variant="outline" disabled={step === 0}><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button>
            {step < 4 ? (
              <Button onClick={next} variant="hero">Next <ArrowRight className="ml-1 h-4 w-4" /></Button>
            ) : (
              <Button onClick={confirm} variant="hero" size="lg">Confirm Booking</Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
