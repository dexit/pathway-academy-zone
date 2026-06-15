import { z } from "zod";
import {
  HandHeart,
  School,
  Handshake,
  Briefcase,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { email, ukPhone, personName, shortText, longMessage, ukPostcode } from "@/lib/uk-validators";
import type { FormMeta } from "./types";

// ---- Schema -----------------------------------------------------------------

export const contactSchema = z.object({
  firstName: personName({ required: true }),
  lastName: personName({ required: true }),
  email: email({ required: true }),
  phone: ukPhone({ required: true }),
  postcode: ukPostcode({ required: false }),
  enquiryType: z.enum(
    ["parent-carer", "school-la", "partner", "careers", "general", "other"],
    { required_error: "Please choose an enquiry type" }
  ),
  organisation: shortText(120, false),
  message: longMessage(1000, true),
});

export type ContactValues = z.infer<typeof contactSchema>;

// ---- Form meta --------------------------------------------------------------

export const CONTACT_FORM_META: FormMeta = {
  id: "contact-form",
  webhookVar: "VITE_CONTACT_WEBHOOK",
  source: "contact-form",
  conversionEvent: "contact_submit",
  submitLabel: "Send Message",
  successTitle: "Message sent",
  successBody: "Message sent — we'll reply within 24 hours.",
  errorTitle: "Couldn't send message",
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
          icon: Mail,
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
          icon: Phone,
        },
        {
          name: "organisation",
          type: "text",
          label: "Organisation (if applicable)",
          placeholder: "School, Local Authority, etc.",
          autoComplete: "organization",
        },
        {
          name: "postcode",
          type: "text",
          label: "Postcode",
          placeholder: "ST6 3LJ",
          autoComplete: "postal-code",
          mask: "postcode",
          icon: MapPin,
          hint: "To help us direct your enquiry to the right team",
        },
        {
          name: "enquiryType",
          type: "illustrated-radio",
          label: "What's your enquiry about?",
          required: true,
          hint: "Pick the closest match — we'll route your message to the right team.",
          columns: 3,
          options: [
            {
              value: "parent-carer",
              label: "Parent / Carer",
              description: "I'm asking about my young person",
              icon: HandHeart,
            },
            {
              value: "school-la",
              label: "School / Local Authority",
              description: "Referral or commissioning enquiry",
              icon: School,
            },
            {
              value: "partner",
              label: "Partner Organisation",
              description: "Charity, employer or service partner",
              icon: Handshake,
            },
            {
              value: "careers",
              label: "Careers Enquiry",
              description: "Vacancies or speculative application",
              icon: Briefcase,
            },
            {
              value: "general",
              label: "General Question",
              description: "Anything else we can help with",
              icon: MessageSquare,
            },
            {
              value: "other",
              label: "Other",
              description: "Tell us more in your message",
              icon: MoreHorizontal,
            },
          ],
        },
        {
          name: "message",
          type: "textarea",
          label: "Your Message",
          required: true,
          placeholder: "How can we help you?",
          rows: 5,
          maxLength: 1000,
        },
      ],
    },
  ],
};
