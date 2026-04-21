import { TrendingUp, Target, Users, School, Heart, UserCheck, Shield, BookOpen } from "lucide-react";

export const stats = [
  { icon: TrendingUp, value: "94%", label: "Attendance Improvement" },
  { icon: Target, value: "87%", label: "Positive Destinations" },
  { icon: Users, value: "150+", label: "Young People Supported" },
  { icon: School, value: "12+", label: "Partner Schools" },
];

export const approaches = [
  {
    icon: Heart,
    title: "Trauma-Informed Approach",
    desc: "Our practice is grounded in understanding how trauma affects learning and behaviour, creating safe spaces for growth."
  },
  {
    icon: Target,
    title: "Personalised Pathways",
    desc: "Every young person receives a tailored learning plan designed around their strengths, interests, and goals."
  },
  {
    icon: UserCheck,
    title: "Expert Staff",
    desc: "Our team includes qualified teachers, youth workers, and pastoral specialists dedicated to every student's success."
  },
  {
    icon: Shield,
    title: "Safe Environment",
    desc: "We maintain the highest safeguarding standards, ensuring all young people feel secure and supported."
  },
];

export const faqs = [
  {
    q: "What is Alternative Provision?",
    a: "Alternative Provision (AP) is education arranged for pupils who can't attend mainstream school due to exclusion, illness, or other reasons. It provides structured learning in smaller, more supportive environments."
  },
  {
    q: "Who is Pathway Academy Zone for?",
    a: "We support young people aged 11-16 (KS3 & KS4) who are permanently excluded, at risk of exclusion, disengaged from mainstream education, or have social, emotional and mental health needs."
  },
  {
    q: "How does the referral process work?",
    a: "Referrals are made by schools, local authorities, or social workers. Contact us to discuss needs, we gather information, hold an assessment meeting, then create a personalised placement plan."
  },
  {
    q: "How quickly can a learner start?",
    a: "Emergency placements can begin within 48 hours. Standard placements typically start within 1-2 weeks following the assessment process."
  },
  {
    q: "How do you keep learners safe?",
    a: "Safeguarding is our top priority. All staff are DBS checked and trained, we have a dedicated safeguarding lead, clear reporting procedures, and work closely with local safeguarding partners."
  },
];

export const latestPosts = [
  {
    title: "What Is Alternative Provision?",
    excerpt: "A complete overview for 2024 covering education for pupils who cannot attend mainstream school.",
    date: "10 Dec 2024",
    slug: "what-is-alternative-provision"
  },
  {
    title: "Understanding SEMH Needs",
    excerpt: "Social, Emotional and Mental Health difficulties are among the most common reasons for AP referrals.",
    date: "1 Dec 2024",
    slug: "semh-needs-in-ap"
  },
  {
    title: "When to Refer a Learner",
    excerpt: "Knowing the right time to refer can make all the difference for a young person's education.",
    date: "20 Nov 2024",
    slug: "when-to-refer-a-learner"
  }
];

export const whyItMatters = {
  title: "Why Alternative Provision Matters",
  subtitle: "Stoke-on-Trent & Staffordshire",
  description: "Across Stoke-on-Trent and the wider Staffordshire region, hundreds of young people are at risk of permanent exclusion, persistent absence, or disengagement from mainstream education each year.",
  points: [
    {
      title: "The Gap We Fill",
      description: "For many learners, the standard school environment is not the right fit — not because they cannot succeed, but because they need a smaller setting, more relational practice, and a curriculum that meets them where they are.",
      icon: "Target"
    },
    {
      title: "Our Registered Provision",
      description: "Pathway Academy Zone is a registered Alternative Provision serving Key Stage 3 and Key Stage 4 learners aged 11–16. We accept referrals from schools, Local Authorities, and social workers.",
      icon: "School"
    },
    {
      title: "Relational Practice",
      description: "Our staff team includes qualified teachers, pastoral specialists, and trained mentors who hold the relational space young people need to re-engage with learning.",
      icon: "Heart"
    },
    {
      title: "Personalised Growth",
      description: "Whatever the route in, our work starts with a calm, structured assessment, a personalised plan, and a timetable that prioritises safety, attendance, and dignity.",
      icon: "UserCheck"
    },
    {
      title: "Balanced Curriculum",
      description: "We deliver core English, Maths, Science, and PSHE alongside vocational routes like construction, hospitality, and creative industries.",
      icon: "BookOpen"
    },
    {
      title: "Safeguarding First",
      description: "Safeguarding sits at the centre of everything we do. We have a designated lead and robust partnerships with local safeguarding boards and CAMHS.",
      icon: "Shield"
    }
  ]
};
