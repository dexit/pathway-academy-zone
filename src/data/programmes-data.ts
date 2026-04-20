import { BookOpen, Wrench, Brain, Lightbulb, Briefcase, Heart } from "lucide-react";
import classroomImg from "@/assets/classroom-learning.jpg";
import vocationalImg from "@/assets/vocational-training.jpg";
import mentoringImg from "@/assets/mentoring-session.jpg";
import heroImg from "@/assets/hero-classroom.jpg";
import careersImg from "@/assets/careers-event.jpg";
import buildingImg from "@/assets/building-exterior.jpg";

export const programmes = [
  {
    id: "academic-re-engagement",
    icon: BookOpen,
    title: "Academic Re-engagement",
    img: classroomImg,
    desc: "Structured academic curriculum adapted for individual learning needs, focusing on core subjects and building confidence in learning.",
    features: ["English, Maths & Science","PSHE / RSHE, RE, PE & Citizenship","Small group teaching (max 6)","Personalised learning plans"],
    schedule: "Full-time or part-time placements",
    time: "Monday to Friday, 9:30am - 2:30pm"
  },
  {
    id: "vocational-learning",
    icon: Wrench,
    title: "Vocational Learning",
    img: vocationalImg,
    desc: "Hands-on practical programmes developing real-world skills in areas like construction, catering, motor mechanics, and horticulture.",
    features: ["Industry-standard training","Work experience placements","Recognised qualifications","Employer partnerships"],
    schedule: "1-2 days per week alongside academic",
    time: "Varies by programme"
  },
  {
    id: "semh-support",
    icon: Brain,
    title: "SEMH Support",
    img: mentoringImg,
    desc: "Therapeutic intervention and support for young people with social, emotional, and mental health needs, integrated throughout all provision.",
    features: ["1:1 therapeutic sessions","Group workshops","Emotional regulation support","Family support sessions"],
    schedule: "Ongoing throughout placement",
    time: "As needed, typically 2-3 sessions per week"
  },
  {
    id: "personal-development",
    icon: Lightbulb,
    title: "Personal Development",
    img: heroImg,
    desc: "Building essential life skills, resilience, and self-esteem through structured programmes and enrichment activities.",
    features: ["Communication skills","Problem-solving","Team building","Goal setting"],
    schedule: "Integrated into weekly timetable",
    time: "2 hours per week minimum"
  },
  {
    id: "life-skills",
    icon: Heart,
    title: "Life Skills Programme",
    img: careersImg,
    desc: "Practical skills for independent living including budgeting, cooking, health and wellbeing, and managing relationships.",
    features: ["Cooking & nutrition","Financial literacy","Health education","Digital skills including AI skills"],
    schedule: "Integrated into curriculum",
    time: "Weekly sessions"
  },
  {
    id: "employability-skills",
    icon: Briefcase,
    title: "Employability Skills",
    img: buildingImg,
    desc: "Preparing young people for the world of work through CV writing, interview practice, and understanding workplace expectations.",
    features: ["CV & application support","Interview preparation","Work experience","Careers guidance"],
    schedule: "Year 10 & 11 focus",
    time: "Weekly sessions plus placements"
  },
];
