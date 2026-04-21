import { BookOpen, Wrench, Brain, Lightbulb, Heart, Briefcase } from "lucide-react";

export const programmes = [
  {
    slug: "academic-re-engagement",
    icon: BookOpen,
    title: "Academic Re-engagement",
    img: "/assets/classroom-learning.jpg",
    desc: "Structured academic curriculum adapted for individual learning needs, focusing on core subjects and building confidence in learning.",
    features: ["English, Maths & Science","PSHE / RSHE, RE, PE & Citizenship","Small group teaching (max 6)","Personalised learning plans"],
    schedule: "Full-time or part-time placements",
    time: "Monday to Friday, 9:30am - 2:30pm"
  },
  {
    slug: "vocational-learning",
    icon: Wrench,
    title: "Vocational Learning",
    img: "/assets/vocational-training.jpg",
    desc: "Hands-on practical programmes developing real-world skills in areas like construction, catering, motor mechanics, and horticulture.",
    features: ["Industry-standard training","Work experience placements","Recognised qualifications","Employer partnerships"],
    schedule: "1-2 days per week alongside academic",
    time: "Varies by programme"
  },
  {
    slug: "semh-support",
    icon: Brain,
    title: "SEMH Support",
    img: "/assets/mentoring-session.jpg",
    desc: "Therapeutic intervention and support for young people with social, emotional, and mental health needs, integrated throughout all provision.",
    features: ["1:1 therapeutic sessions","Group workshops","Emotional regulation support","Family support sessions"],
    schedule: "Ongoing throughout placement",
    time: "As needed, typically 2-3 sessions per week"
  },
  {
    slug: "personal-development",
    icon: Lightbulb,
    title: "Personal Development",
    img: "/assets/hero-classroom.jpg",
    desc: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.",
    features: ["Communication skills","Problem-solving","Team building","Goal setting"],
    schedule: "Integrated into weekly timetable",
    time: "2 hours per week minimum"
  },
  {
    slug: "life-skills",
    icon: Heart,
    title: "Life Skills Programme",
    img: "/assets/careers-event.jpg",
    desc: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.",
    features: ["Cooking & nutrition","Financial literacy","Health education","Digital skills including AI skills"],
    schedule: "Integrated into curriculum",
    time: "Weekly sessions"
  },
  {
    slug: "employability-skills",
    icon: Briefcase,
    title: "Employability Skills",
    img: "/assets/building-exterior.jpg",
    desc: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.",
    features: ["CV & application support","Interview preparation","Work experience","Careers guidance"],
    schedule: "Year 10 & 11 focus",
    time: "Weekly sessions plus placements"
  },
];
