import type { LucideIcon } from "lucide-react";
import type { IllustratedOption } from "@/components/forms/IllustratedRadio";

// Re-export so consumers can import from this module if needed
export type { IllustratedOption };

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "select"
  | "textarea"
  | "illustrated-radio";

export type SelectOption = {
  value: string;
  label: string;
};

/** An illustrated-radio option — same shape as IllustratedOption from the component. */
export type IllustratedFieldOption = IllustratedOption;

/**
 * Configuration for a single form field.
 * `id` is derived automatically by FormBuilder as `form-${name}`.
 */
export type FieldConfig = {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  /** Lucide icon rendered alongside certain field types (e.g. illustrated-radio uses option icons). */
  icon?: LucideIcon;
  maxLength?: number;
  rows?: number;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLElement>["inputMode"];
  options?: SelectOption[] | IllustratedFieldOption[];
  /** Number of columns for illustrated-radio grids. */
  columns?: 2 | 3 | 4 | 5;
  /** Apply a live input mask. */
  mask?: "phone" | "postcode";
  /** Constrain a date field's max attribute. "today" resolves to today's ISO date. */
  dateMax?: "today";
};

export type FormSection = {
  title?: string;
  /** When true, renders an <hr> above the section title. */
  divider?: boolean;
  fields: FieldConfig[];
};

export type FormMeta = {
  /** HTML id attribute for the <form> element. */
  id: string;
  sections: FormSection[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  /** The name of the env var that holds the webhook URL (e.g. "VITE_CONTACT_WEBHOOK"). */
  webhookVar: string;
  /** Value sent as `source` in the webhook payload. */
  source: string;
  /** Conversion event name passed to fireConversion(). */
  conversionEvent: string;
  /**
   * Cloudflare Workers / webhook payload template.
   *
   * Defines the outgoing payload shape using `{{fieldName}}` template tokens.
   * Each key becomes an output field; each value is a string where `{{name}}`
   * is replaced with the corresponding form-field value at submission time.
   *
   * When omitted, the raw form values object is sent as-is.
   *
   * Example (Referral form → CF Worker):
   * ```ts
   * payloadTemplate: {
   *   subject:      "New referral from {{organisation}}",
   *   referrer:     "{{firstName}} {{lastName}} ({{role}})",
   *   email:        "{{email}}",
   *   phone:        "{{phone}}",
   *   young_person: "{{ypFirstName}} {{ypLastName}}, DOB {{dob}}, Yr {{yearGroup}}",
   *   programme:    "{{programme}}",
   *   reason:       "{{reason}}",
   *   extra_info:   "{{additionalInfo}}",
   * }
   * ```
   *
   * Example (Contact form → CF Worker):
   * ```ts
   * payloadTemplate: {
   *   from_name:    "{{firstName}} {{lastName}}",
   *   from_email:   "{{email}}",
   *   enquiry_type: "{{enquiryType}}",
   *   organisation: "{{organisation}}",
   *   message:      "{{message}}",
   * }
   * ```
   */
  payloadTemplate?: Record<string, string>;
};
