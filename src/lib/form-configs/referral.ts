import { z } from "zod";
import {
  BookOpen,
  Wrench,
  Brain,
  Lightbulb,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import {
  email,
  ukPhone,
  personName,
  shortText,
  longMessage,
  dateOfBirth,
  ukPostcode,
} from "@/lib/uk-validators";
import type { FormMeta, SelectOption } from "./types";

// ---- Option arrays ----------------------------------------------------------

export const roleOptions = [
  "School Staff",
  "Local Authority",
  "Social Worker",
  "Virtual School",
  "Other Professional",
] as const;

export const yearGroupOptions = [
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
] as const;

export const programmeOptions = [
  { value: "academic",  label: "Academic Re-engagement", description: "Core English, Maths, Science",       icon: BookOpen  },
  { value: "vocational",label: "Vocational Learning",    description: "Hands-on practical skills",          icon: Wrench    },
  { value: "semh",      label: "SEMH Support",           description: "Therapeutic 1:1 + group",            icon: Brain     },
  { value: "personal",  label: "Personal Development",   description: "Resilience and life skills",         icon: Lightbulb },
  { value: "outreach",  label: "Outreach / Hybrid",      description: "Online + in-centre blend",           icon: Heart     },
  { value: "other",     label: "Other",                  description: "Tell us more in your message",       icon: MoreHorizontal },
];

// ---- Schema -----------------------------------------------------------------

export const referralSchema = z.object({
  firstName:      personName({ required: true }),
  lastName:       personName({ required: true }),
  role:           z.enum(roleOptions, { required_error: "Please select your role" }),
  email:          email({ required: true }),
  phone:          ukPhone({ required: true }),
  organisation:   shortText(120, false),
  postcode:       ukPostcode({ required: true }),
  ypFirstName:    personName({ required: true }),
  ypLastName:     personName({ required: true }),
  dob:            dateOfBirth({ required: true, minAge: 10, maxAge: 18 }),
  yearGroup:      z.enum(yearGroupOptions, { required_error: "Please select a year group" }),
  currentSchool:  shortText(160, false),
  programme:      z.enum(
    ["academic", "vocational", "semh", "personal", "outreach"],
    { required_error: "Please select a programme of interest" }
  ),
  reason:         longMessage(1000, true),
  additionalInfo: shortText(800, false),
});

export type ReferralValues = z.infer<typeof referralSchema>;

// ---- Helpers ----------------------------------------------------------------

const roleSelectOptions: SelectOption[] = [
  ...roleOptions.map((r) => ({ value: r, label: r })),
];

const yearGroupSelectOptions: SelectOption[] = [
  ...yearGroupOptions.map((y) => ({ value: y, label: y })),
];

// ---- Form meta --------------------------------------------------------------

export const REFERRAL_FORM_META: FormMeta = {
  id: "referral-form",
  webhookVar: "VITE_REFERRAL_WEBHOOK",
  source: "referral-form",
  conversionEvent: "referral_submit",
  submitLabel: "Submit Referral",
  successTitle: "Referral submitted",
  successBody: "Thanks — we'll be in touch within 2 working days.",
  errorTitle: "Couldn't submit referral",
  sections: [
    {
      // Section 1: Referrer Details (no divider, no title as per instructions)
      title: "Referrer Details",
      fields: [
        {
          name: "firstName",
          type: "text",
          label: "First Name",
          required: true,
          placeholder: "First name",
          autoComplete: "given-name",
        },
        {
          name: "lastName",
          type: "text",
          label: "Last Name",
          required: true,
          placeholder: "Last name",
          autoComplete: "family-name",
        },
        {
          name: "role",
          type: "select",
          label: "Your Role",
          required: true,
          options: roleSelectOptions,
        },
        {
          name: "email",
          type: "email",
          label: "Email Address",
          required: true,
          placeholder: "your@email.com",
          autoComplete: "email",
          inputMode: "email",
        },
        {
          name: "phone",
          type: "tel",
          label: "Phone Number",
          required: true,
          placeholder: "07123 456789",
          autoComplete: "tel",
          inputMode: "tel",
          hint: "UK landline or mobile",
          mask: "phone",
        },
        {
          name: "postcode",
          type: "text",
          label: "Postcode",
          required: true,
          placeholder: "ST6 3LJ",
          autoComplete: "postal-code",
          hint: "UK postcode of the young person",
          mask: "postcode",
        },
        {
          name: "organisation",
          type: "text",
          label: "Organisation / School",
          placeholder: "e.g. Burslem High School",
          autoComplete: "organization",
        },
      ],
    },
    {
      // Section 2: Young Person Details — has divider and title
      title: "Young Person Details",
      divider: true,
      fields: [
        {
          name: "ypFirstName",
          type: "text",
          label: "Young Person's First Name",
          required: true,
          placeholder: "First name",
        },
        {
          name: "ypLastName",
          type: "text",
          label: "Young Person's Last Name",
          required: true,
          placeholder: "Last name",
        },
        {
          name: "dob",
          type: "date",
          label: "Date of Birth",
          required: true,
          hint: "DD/MM/YYYY",
          dateMax: "today",
        },
        {
          name: "yearGroup",
          type: "select",
          label: "Year Group",
          required: true,
          options: yearGroupSelectOptions,
        },
        {
          name: "currentSchool",
          type: "text",
          label: "Current / Previous School",
          placeholder: "School name",
        },
        {
          name: "programme",
          type: "illustrated-radio",
          label: "Area of Interest",
          required: true,
          hint: "Choose the closest fit — we'll refine the placement plan together.",
          columns: 2,
          options: programmeOptions,
        },
        {
          name: "reason",
          type: "textarea",
          label: "Reason for Referral",
          required: true,
          placeholder: "Briefly describe the situation and what support is needed",
          rows: 4,
          maxLength: 1000,
        },
        {
          name: "additionalInfo",
          type: "textarea",
          label: "Additional Information",
          placeholder: "EHCP, safeguarding context, professional reports etc.",
          rows: 3,
          maxLength: 800,
        },
      ],
    },
  ],
};
