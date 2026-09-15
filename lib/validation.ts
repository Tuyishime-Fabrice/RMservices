import "server-only";
import { z } from "zod";
import { serviceInquiryOptions } from "@/content/services";
import {
  LIMITS,
  MESSAGES,
  PHONE_PATTERN,
  contactMethods,
  clientTypes,
  urgencyLevels,
  inRwandaOptions,
} from "@/lib/form-rules";

/**
 * Authoritative server-side schemas.
 *
 * Marked `server-only`: the browser validates with the dependency-free rules in
 * `lib/form-rules.ts` (same constants, same messages), so Zod never reaches the
 * client bundle. Whatever the browser does or skips, every submission is
 * validated here before anything is sent.
 */

const name = z
  .string()
  .trim()
  .min(LIMITS.nameMin, MESSAGES.name)
  .max(LIMITS.nameMax, MESSAGES.nameLong);

const email = z
  .string()
  .trim()
  .min(1, MESSAGES.emailRequired)
  .max(LIMITS.emailMax, MESSAGES.emailLong)
  .email(MESSAGES.emailInvalid);

const phone = z
  .string()
  .trim()
  .min(LIMITS.phoneMin, MESSAGES.phoneRequired)
  .max(LIMITS.phoneMax, MESSAGES.phoneLong)
  .regex(PHONE_PATTERN, MESSAGES.phoneInvalid);

const message = z
  .string()
  .trim()
  .min(LIMITS.messageMin, MESSAGES.message)
  .max(LIMITS.messageMax, MESSAGES.messageLong);

/**
 * Honeypot: a hidden field real users never fill in.
 *
 * Deliberately permissive at the schema level: a filled honeypot must NOT
 * produce a validation error, because the error would tell a bot exactly which
 * field gave it away. The API routes accept the submission silently and send
 * nothing instead.
 */
const honeypot = z.string().max(200).optional();

export const inquirySchema = z.object({
  fullName: name,
  email,
  phone,
  preferredContact: z.enum(contactMethods, { message: MESSAGES.preferredContact }),
  service: z.string().refine((v) => serviceInquiryOptions.includes(v), MESSAGES.service),
  clientType: z.enum(clientTypes, { message: MESSAGES.clientType }),
  inRwanda: z.enum(inRwandaOptions, { message: MESSAGES.inRwanda }),
  message,
  urgency: z.enum(urgencyLevels),
  consent: z.literal(true, { message: MESSAGES.consent }),
  company: honeypot,
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const contactSchema = z.object({
  fullName: name,
  email,
  phone: phone.optional().or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(LIMITS.subjectMin, MESSAGES.subject)
    .max(LIMITS.subjectMax, MESSAGES.subjectLong),
  message,
  consent: z.literal(true, { message: MESSAGES.consentContact }),
  company: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Flattens a ZodError into { field: firstMessage } for form display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/**
 * Defensive sanitisation for anything interpolated into the notification
 * email. Values are user supplied and must never be trusted as markup.
 */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips control characters and header-injection attempts from short fields. */
export function sanitizeLine(value: string) {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}
