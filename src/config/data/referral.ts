import { Phone, FileText, Users, CalendarCheck, BookOpen, Wrench, Brain, Lightbulb, Heart } from "lucide-react";

export const referralSteps = [
  { num: 1, icon: Phone, title: "Initial Contact", desc: "Contact us by phone or complete the referral form to discuss your young person's needs." },
  { num: 2, icon: FileText, title: "Information Gathering", desc: "We collect relevant documentation including educational history and safeguarding details." },
  { num: 3, icon: Users, title: "Assessment Meeting", desc: "We meet with the young person and family to assess needs and discuss potential pathways." },
  { num: 4, icon: CalendarCheck, title: "Placement Planning", desc: "We create a personalised plan and agree start dates." },
];

export const eligibility = [
  "Young people aged 11-16",
  "Permanently excluded or at risk of exclusion",
  "Disengaged from mainstream education",
  "Social, emotional and mental health needs",
];

export const documentation = [
  "Recent school reports and attendance data",
  "EHCP or SEN support documentation (if applicable)",
  "Any relevant safeguarding information",
];

export const referralProgrammeOptions = [
  { value: "academic", label: "Academic Re-engagement", description: "Core English, Maths, Science", icon: BookOpen },
  { value: "vocational", label: "Vocational Learning", description: "Hands-on practical skills", icon: Wrench },
  { value: "semh", label: "SEMH Support", description: "Therapeutic 1:1 + group", icon: Brain },
  { value: "personal", label: "Personal Development", description: "Resilience and life skills", icon: Lightbulb },
  { value: "outreach", label: "Outreach / Hybrid", description: "Online + in-centre blend", icon: Heart },
];

export const roleOptions = ["School Staff","Local Authority","Social Worker","Virtual School","Other Professional"] as const;
export const yearGroupOptions = ["Year 7","Year 8","Year 9","Year 10","Year 11"] as const;
