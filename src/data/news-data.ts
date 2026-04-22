export type NewsItem = {
  slug: string;
  date: string;
  iso: string;
  title: string;
  summary: string;
  body: string[];
  tag: string;
};

/**
 * Single source of truth for News & Announcement entries. Used by both
 * the News archive (/news) and the single-news template (/news/:slug)
 * so content never drifts between list and detail views.
 */
export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "staffordshire-ap-directory-2026",
    date: "12 March 2026",
    iso: "2026-03-12",
    title: "Pathway Academy Zone awarded Staffordshire AP Directory status",
    summary:
      "Following our latest quality review, we are proud to confirm our renewed place on the Staffordshire Alternative Provision Directory for another 12 months.",
    body: [
      "We are delighted to share that Pathway Academy Zone has once again been awarded a place on the Staffordshire Alternative Provision Directory following our annual quality assurance review.",
      "The review covered safeguarding practice, curriculum quality, learner voice, attendance and progression outcomes, and partnership working with commissioning schools and the Local Authority. Reviewers highlighted the strength of our SEMH provision and our personalised approach to reintegration planning.",
      "Inclusion on the Directory means schools and Local Authority commissioners can continue to refer learners to us with confidence, knowing we meet the DfE's Alternative Provision performance framework and Staffordshire's quality standards.",
      "Thank you to our staff team, partner schools, families and — above all — the young people whose progress sits at the heart of every review.",
    ],
    tag: "Announcement",
  },
  {
    slug: "south-staffordshire-college-partnership",
    date: "24 February 2026",
    iso: "2026-02-24",
    title: "New vocational partnership with South Staffordshire College",
    summary:
      "Our Key Stage 4 learners can now access Level 1 construction, engineering, and motor vehicle taster programmes from September.",
    body: [
      "We are excited to announce a new vocational partnership with South Staffordshire College, opening up a range of Level 1 taster programmes for our Key Stage 4 learners from the start of the September term.",
      "Learners will be able to choose between construction, engineering and motor vehicle pathways, attending the College for one day per week alongside their core academic timetable at Pathway Academy Zone.",
      "This partnership broadens the post-16 progression routes available to our cohort and gives young people authentic experience of further education environments before they apply.",
    ],
    tag: "Partnership",
  },
  {
    slug: "dfe-ap-performance-framework-update",
    date: "8 January 2026",
    iso: "2026-01-08",
    title: "DfE publishes updated AP performance framework",
    summary:
      "We summarise the key changes for commissioners and explain how our outcomes data already aligns with the new framework.",
    body: [
      "The Department for Education has published an updated Alternative Provision performance framework, sharpening expectations around attendance, qualifications, destinations and learner wellbeing.",
      "We have reviewed the framework against our current outcomes reporting and are pleased to confirm that our existing measures already align closely with the new categories. Where minor adjustments are needed, our quality team will integrate these into the next reporting cycle.",
      "Commissioners can request our detailed outcomes report at any time, or download the latest summary from our Outcomes page.",
    ],
    tag: "Policy",
  },
  {
    slug: "winter-safeguarding-arrangements-2025",
    date: "15 December 2025",
    iso: "2025-12-15",
    title: "Winter safeguarding arrangements and contact details",
    summary:
      "Details of our designated safeguarding lead cover over the Christmas period and emergency out-of-hours contact numbers.",
    body: [
      "Our centre will close for the Christmas break from 4pm on Friday 19 December 2025 and reopen on Monday 5 January 2026.",
      "During the closure period, our designated safeguarding lead remains on call. If you have a safeguarding concern about a young person, please contact Staffordshire's First Response Team on 0800 131 3126, or in an emergency dial 999.",
      "Our team wishes all young people, families, and partner organisations a safe and restful break.",
    ],
    tag: "Safeguarding",
  },
  {
    slug: "ks4-attendance-up-autumn-2025",
    date: "3 November 2025",
    iso: "2025-11-03",
    title: "Attendance up 11% across our KS4 cohort this term",
    summary:
      "Our autumn term attendance data shows continued progress, with a notable lift in our SEMH pathway cohort.",
    body: [
      "Our autumn term data shows attendance across the Key Stage 4 cohort has risen 11% on the same period last year, with the strongest gains seen in our SEMH pathway.",
      "We attribute the lift to the introduction of morning regulation check-ins, refreshed key adult arrangements, and closer working with families during the early phase of placements.",
      "Detailed attendance reporting is shared with commissioning schools each half term and forms part of our Outcomes publication.",
    ],
    tag: "Outcomes",
  },
  {
    slug: "induction-week-september-2025",
    date: "18 September 2025",
    iso: "2025-09-18",
    title: "Back to school: our induction week in pictures",
    summary:
      "Meet our new Year 10 and Year 11 cohorts as they complete induction and begin their personalised learning plans.",
    body: [
      "Our new Year 10 and Year 11 learners completed an induction week of orientation, baseline assessments, and 1:1 conversations with their key adults.",
      "Each young person now has a personalised learning plan agreed with families and their commissioning school, setting out academic targets, pastoral priorities and the agreed timetable.",
      "We look forward to a positive year ahead and will share regular cohort updates throughout the term.",
    ],
    tag: "Life at Pathway",
  },
];
