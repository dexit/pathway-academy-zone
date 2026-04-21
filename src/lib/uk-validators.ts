import { z } from "zod";

/**
 * UK-specific validators and input masking helpers.
 * Used by Contact, Referral, Careers and any other forms.
 *
 * Phone — accepts a permissive UK landline/mobile pattern (with optional
 * leading 0 or +44). Stored value is the visible (masked) string; we
 * normalise on submit via `normaliseUkPhone`.
 *
 * Postcode — UK postcode pattern (covers all valid formats including
 * special cases like GIR 0AA), stored uppercase with single space.
 *
 * Email — zod's email check, trimmed + lowercased.
 *
 * Date of birth — ISO yyyy-mm-dd from <input type="date">. We additionally
 * verify the person is between 5 and 120 years old.
 */

// --- Phone ----------------------------------------------------------------
// Accept formats like:
//   01782 365365, 01782365365, +44 1782 365 365, 07123 456789, +447123456789
const UK_PHONE_REGEX = /^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/;

export const ukPhone = (opts: { required?: boolean } = {}) => {
  const base = z
    .string()
    .trim()
    .max(20, { message: "Phone must be 20 characters or fewer" })
    .refine((v) => v === "" || UK_PHONE_REGEX.test(v), {
      message: "Enter a valid UK phone number",
    });
  return opts.required
    ? base.refine((v) => v.length > 0, { message: "Phone is required" })
    : base.optional().or(z.literal(""));
};

/** Mask phone as the user types — keeps + and digits, formats common patterns. */
export function maskUkPhone(input: string): string {
  if (!input) return "";
  // Preserve a leading + then strip non-digits.
  const hasPlus = input.trim().startsWith("+");
  const digits = input.replace(/\D/g, "").slice(0, hasPlus ? 12 : 11);

  // +44 prefix path
  if (hasPlus && digits.startsWith("44")) {
    const rest = digits.slice(2);
    // +44 7XXX XXXXXX (mobile) or +44 XXXX XXXXXX (landline)
    if (rest.startsWith("7")) {
      return `+44 ${rest.slice(0, 4)}${rest.length > 4 ? " " + rest.slice(4, 10) : ""}`.trim();
    }
    return `+44 ${rest.slice(0, 4)}${rest.length > 4 ? " " + rest.slice(4, 10) : ""}`.trim();
  }

  // 0-prefixed
  if (digits.startsWith("07")) {
    // mobile 07XXX XXXXXX
    return `${digits.slice(0, 5)}${digits.length > 5 ? " " + digits.slice(5, 11) : ""}`.trim();
  }
  if (digits.startsWith("0")) {
    // landline 0XXXX XXXXXX (best-effort)
    return `${digits.slice(0, 5)}${digits.length > 5 ? " " + digits.slice(5, 11) : ""}`.trim();
  }
  return digits;
}

/** Convert any masked UK phone to E.164 style (+44...) for storage/webhook. */
export function normaliseUkPhone(input: string): string {
  if (!input) return "";
  const digits = input.replace(/\D/g, "");
  if (input.trim().startsWith("+")) return `+${digits}`;
  if (digits.startsWith("0")) return `+44${digits.slice(1)}`;
  return digits ? `+${digits}` : "";
}

// --- Postcode -------------------------------------------------------------
// Official UK postcode regex (incl. GIR 0AA edge case)
const UK_POSTCODE_REGEX =
  /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i;

export const ukPostcode = (opts: { required?: boolean } = {}) => {
  const base = z
    .string()
    .trim()
    .max(8, { message: "Postcode must be 8 characters or fewer" })
    .transform((v) => v.toUpperCase())
    .refine((v) => v === "" || UK_POSTCODE_REGEX.test(v), {
      message: "Enter a valid UK postcode (e.g. ST6 3LJ)",
    });
  return opts.required
    ? base.refine((v) => v.length > 0, { message: "Postcode is required" })
    : base.optional().or(z.literal(""));
};

/** Mask postcode as the user types — uppercase + single space before final 3 chars. */
export function maskUkPostcode(input: string): string {
  if (!input) return "";
  const cleaned = input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  if (cleaned.length <= 3) return cleaned;
  return `${cleaned.slice(0, cleaned.length - 3)} ${cleaned.slice(-3)}`;
}

// --- Email ----------------------------------------------------------------
export const email = (opts: { required?: boolean } = {}) => {
  const base = z
    .string()
    .trim()
    .toLowerCase()
    .max(255, { message: "Email must be 255 characters or fewer" });
  if (opts.required) {
    return base
      .min(1, { message: "Email is required" })
      .email({ message: "Enter a valid email address" });
  }
  return base
    .refine((v) => v === "" || z.string().email().safeParse(v).success, {
      message: "Enter a valid email address",
    })
    .optional()
    .or(z.literal(""));
};

// --- Names / free text ---------------------------------------------------
export const personName = (opts: { required?: boolean } = {}) => {
  const base = z
    .string()
    .trim()
    .max(100, { message: "Must be 100 characters or fewer" })
    .regex(/^[\p{L}\p{M}\s'.-]*$/u, {
      message: "Only letters, spaces, hyphens and apostrophes",
    });
  return opts.required
    ? base.min(1, { message: "This field is required" })
    : base.optional().or(z.literal(""));
};

export const shortText = (max = 200, required = false) => {
  const base = z.string().trim().max(max, { message: `Must be ${max} characters or fewer` });
  return required
    ? base.min(1, { message: "This field is required" })
    : base.optional().or(z.literal(""));
};

export const longMessage = (max = 1000, required = true) => {
  const base = z.string().trim().max(max, { message: `Must be ${max} characters or fewer` });
  return required
    ? base.min(10, { message: "Please write a little more (min 10 characters)" })
    : base.optional().or(z.literal(""));
};

// --- Date of Birth -------------------------------------------------------
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
export const dateOfBirth = (opts: { required?: boolean; minAge?: number; maxAge?: number } = {}) => {
  const { required = true, minAge = 4, maxAge = 25 } = opts;
  const base = z
    .string()
    .trim()
    .refine((v) => v === "" || ISO_DATE.test(v), { message: "Enter a valid date" })
    .refine(
      (v) => {
        if (!v) return true;
        const d = new Date(v);
        if (Number.isNaN(d.getTime())) return false;
        const now = new Date();
        const age = (now.getTime() - d.getTime()) / (365.25 * 24 * 3600 * 1000);
        return age >= minAge && age <= maxAge;
      },
      { message: `Age must be between ${minAge} and ${maxAge}` }
    );
  return required ? base.refine((v) => v.length > 0, { message: "Date is required" }) : base.optional().or(z.literal(""));
};
