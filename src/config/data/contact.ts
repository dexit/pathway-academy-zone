import { Phone, Mail, MapPin, Search, GraduationCap, Users } from "lucide-react";

export const contactInformation = [
  {
    title: "Phone",
    main: "01782 365365",
    sub: "Mon–Fri 8:30am–4:00pm",
    icon: Phone
  },
  {
    title: "Email",
    main: "enquiries@pathwayacademyzone.co.uk",
    sub: "We'll reply within 24 hours",
    icon: Mail
  },
  {
    title: "Address",
    main: "Duncalf Street, Burslem, Stoke-on-Trent ST6 3LJ",
    sub: "Staffordshire, United Kingdom",
    icon: MapPin
  },
];

export const enquiryOptions = [
  { value: "referral", label: "Referral", description: "Enquire about a placement", icon: Users },
  { value: "general", label: "General", description: "Basic info or queries", icon: Search },
  { value: "visit", label: "Visit", description: "Request a centre tour", icon: GraduationCap },
];

export const quickLinks = [
  { title: "Referral Process", desc: "Ready to start?", path: "/referral" },
  { title: "Our Programmes", desc: "What we offer", path: "/programmes" },
  { title: "Knowledge Hub", desc: "Helpful resources", path: "/knowledge-hub" },
];
