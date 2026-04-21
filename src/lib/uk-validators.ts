import { z } from "zod";

export const ukPostcodeRegex = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0AA)$/i;
export const ukPhoneRegex = /^(?:(?:\+44\s?|0)7(?:[45789]\d{2}|624)\s?\d{3}\s?\d{3}|(?:(?:\+44\s?|0)1\d{2}|(?:(?:\+44\s?|0)2\d))\s?\d{3}\s?\d{4})$/;

export const email = (opts: { required?: boolean } = {}) => {
  let schema = z.string().email("Invalid email address");
  if (opts.required === false) return schema.optional().or(z.literal(""));
  return schema;
};

export const ukPhone = (opts: { required?: boolean } = {}) => {
  let schema = z.string().regex(ukPhoneRegex, "Invalid UK phone number");
  if (opts.required === false) return schema.optional().or(z.literal(""));
  return schema;
};

export const postcode = (opts: { required?: boolean } = {}) => {
  let schema = z.string().regex(ukPostcodeRegex, "Invalid UK postcode");
  if (opts.required === false) return schema.optional().or(z.literal(""));
  return schema;
};

export const personName = (opts: { required?: boolean } = {}) => {
  let schema = z.string().min(2, "Name must be at least 2 characters").max(50);
  if (opts.required === false) return schema.optional().or(z.literal(""));
  return schema;
};

export const shortText = (opts: { required?: boolean } = {}) => {
  let schema = z.string().min(2).max(100);
  if (opts.required === false) return schema.optional().or(z.literal(""));
  return schema;
};

export const longMessage = (opts: { required?: boolean } = {}) => {
  let schema = z.string().min(10, "Message must be at least 10 characters").max(2000);
  if (opts.required === false) return schema.optional().or(z.literal(""));
  return schema;
};

export const dateOfBirth = (opts: { required?: boolean } = {}) => {
  let schema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)");
  if (opts.required === false) return schema.optional().or(z.literal(""));
  return schema;
};

export function maskUkPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 5) return digits;
  if (digits.length <= 11) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return value;
}

export function normaliseUkPhone(value: string): string {
  return value.replace(/\s/g, "");
}
