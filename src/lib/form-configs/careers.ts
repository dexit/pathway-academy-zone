import { z } from "zod";
import {
  BookOpen,
  HandHeart,
  Users,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { email, ukPhone, personName, longMessage } from "@/lib/uk-validators";
import type { FormMeta } from "./types";

// ---- Schema -----------------------------------------------------------------

export const careersSchema = z.object({
  firstName: personName({ required: true }),
  lastName:  personName({ required: true }),
  email:     email({ required: true }),
  phone:     ukPhone(),
  interest:  z.enum(
    ["teaching", "youth-work", "support", "admin", "other"],
    { required_error: "Please choose an area of interest" }
  ),
  about:     longMessage(1500, true),
});

export type CareersValues = z.infer<typeof careersSchema>;

// ---- Form meta --------------------------------------------------------------

export const CAREERS_FORM_META: FormMeta = {
  id: "careers-form",
  webhookVar: "VITE_CAREERS_WEBHOOK",
  source: "careers-speculative",
  conversionEvent: "careers_submit",
  submitLabel: "Submit Enquiry",
  successTitle: "Application submitted",
  successBody: "Thanks — we'll be in touch soon.",
  errorTitle: "Couldn't submit",
  sections: [
    {
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
          placeholder: "07123 456789",
          autoComplete: "tel",
          inputMode: "tel",
          hint: "UK landline or mobile",
          mask: "phone",
        },
        {
          name: "interest",
          type: "illustrated-radio",
          label: "Area of Interest",
          required: true,
          hint: "Pick the closest match — we route applications by team.",
          columns: 2,
          options: [
            { value: "teaching",   label: "Teaching",         description: "Subject or SEMH teacher", icon: BookOpen     },
            { value: "youth-work", label: "Youth Work",       description: "Mentoring & pastoral",    icon: HandHeart    },
            { value: "support",    label: "Learning Support", description: "TA / LSA roles",          icon: Users        },
            { value: "admin",      label: "Administration",   description: "Operations & HR",         icon: ClipboardList },
            { value: "other",      label: "Other",            description: "Tell us more below",      icon: Sparkles     },
          ],
        },
        {
          name: "about",
          type: "textarea",
          label: "Tell Us About Yourself",
          required: true,
          placeholder: "Background, qualifications, why you'd like to join us…",
          rows: 5,
          maxLength: 1500,
        },
      ],
    },
  ],
};
