import { Users, Layout, ShieldCheck, Coffee, MapPin, Clock, BookOpen, Wrench, Brain, Lightbulb, Heart, Briefcase } from "lucide-react";

export const facilities = [
  { title: "Small Classrooms", desc: "Maximum 6 students per group", icon: Users },
  { title: "IT Suite", desc: "Modern computing facilities", icon: Layout },
  { title: "Safe Spaces", desc: "Dedicated quiet areas", icon: ShieldCheck },
  { title: "Social Space", desc: "Indoor & outdoor breakout", icon: Coffee },
];

export const timetable = [
  { time: "09:30 - 09:45", activity: "Arrival & Breakfast Club" },
  { time: "09:45 - 11:00", activity: "Session 1 - Core Academic (Eng/Maths)" },
  { time: "11:00 - 11:15", activity: "Break" },
  { time: "11:15 - 12:00", activity: "Session 2 - Creative or Vocational" },
  { time: "12:00 - 12:45", activity: "Lunch & Social Time" },
  { time: "12:45 - 14:00", activity: "Session 3 - Personal Development / SEMH" },
  { time: "14:00 - 14:15", activity: "Break" },
  { time: "14:15 - 15:00", activity: "Session 4 - Enrichment Activities" },
  { time: "15:00 - 15:15", activity: "End of Day Review & Departure" },
];

export const centreProgrammes = [
  { icon: BookOpen, label: "Academic Re-engagement" },
  { icon: Wrench, label: "Vocational Learning" },
  { icon: Brain, label: "SEMH Support" },
  { icon: Lightbulb, label: "Personal Development" },
  { icon: Heart, label: "Life Skills" },
  { icon: Briefcase, label: "Employability Skills" },
];

export const centres = [
  {
    id: "burslem",
    name: "Burslem Learning Centre",
    streetAddress: "Duncalf Street, Burslem",
    addressLocality: "Stoke-on-Trent",
    postalCode: "ST6 3LJ",
    region: "Staffordshire",
    telephone: "+44-1782-365365",
    latitude: 53.043,
    longitude: -2.191,
    images: {
      main: "/assets/building-exterior.jpg",
      classroom: "/assets/classroom-learning.jpg",
      mentoring: "/assets/mentoring-session.jpg",
      vocational: "/assets/vocational-training.jpg"
    }
  },
];
