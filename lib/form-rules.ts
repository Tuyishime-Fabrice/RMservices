/**
 * Shared form rules — the single source of truth for field constraints, option
 * lists and error messages.
 *
 * This module has **no dependencies**, which is the point: the browser gets
 * instant, friendly validation without shipping a validation library (Zod adds
 * ~390 KB uncompressed to the client bundle for no user-visible benefit).
 * `lib/validation.ts` builds the authoritative server-side Zod schemas from
 * these same constants, so the two can never drift apart.
 */

export const contactMethods = ["WhatsApp", "Phone Call", "Email"] as const;
export const clientTypes = [
  "Individual",
  "Business",
  "Foreign Investor",
  "Expatriate",
  "Diaspora",
  "Other",
] as const;
export const urgencyLevels = ["Normal", "Urgent"] as const;
export const inRwandaOptions = ["Yes", "No"] as const;

export const LIMITS = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 200,
  phoneMin: 7,
  phoneMax: 30,
  subjectMin: 3,
  subjectMax: 150,
  messageMin: 10,
  messageMax: 3000,
} as const;

export const MESSAGES = {
  name: "Please enter your full name.",
  nameLong: "That name looks too long.",
  emailRequired: "Please enter your email address.",
  emailInvalid: "Please enter a valid email address, for example name@example.com.",
  emailLong: "That email address looks too long.",
  phoneRequired: "Please enter a phone number we can reach you on.",
  phoneLong: "That phone number looks too long.",
  phoneInvalid:
    "Please enter a valid phone number, digits only (you may include + and spaces).",
  preferredContact: "Please choose how you would like us to contact you.",
  service: "Please choose the service you need.",
  clientType: "Please tell us which best describes you.",
  inRwanda: "Please let us know whether you are currently in Rwanda.",
  subject: "Please add a short subject.",
  subjectLong: "Please keep the subject under 150 characters.",
  message: "Please tell us a little more so we can help (at least 10 characters).",
  messageLong: "Please keep your message under 3000 characters.",
  consent: "Please confirm you agree to be contacted about your request.",
  consentContact: "Please confirm you agree to be contacted about your message.",
} as const;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
export const PHONE_PATTERN = /^[+()\d][\d\s()+-]{5,}$/;

export type Errors = Record<string, string>;

const trim = (value: unknown) => (typeof value === "string" ? value.trim() : "");

function checkName(value: unknown, errors: Errors, field = "fullName") {
  const v = trim(value);
  if (v.length < LIMITS.nameMin) errors[field] = MESSAGES.name;
  else if (v.length > LIMITS.nameMax) errors[field] = MESSAGES.nameLong;
}

function checkEmail(value: unknown, errors: Errors, field = "email") {
  const v = trim(value);
  if (!v) errors[field] = MESSAGES.emailRequired;
  else if (v.length > LIMITS.emailMax) errors[field] = MESSAGES.emailLong;
  else if (!EMAIL_PATTERN.test(v)) errors[field] = MESSAGES.emailInvalid;
}

function checkPhone(value: unknown, errors: Errors, field: string, required: boolean) {
  const v = trim(value);
  if (!v) {
    if (required) errors[field] = MESSAGES.phoneRequired;
    return;
  }
  if (v.length < LIMITS.phoneMin) errors[field] = MESSAGES.phoneRequired;
  else if (v.length > LIMITS.phoneMax) errors[field] = MESSAGES.phoneLong;
  else if (!PHONE_PATTERN.test(v)) errors[field] = MESSAGES.phoneInvalid;
}

function checkMessage(value: unknown, errors: Errors, field = "message") {
  const v = trim(value);
  if (v.length < LIMITS.messageMin) errors[field] = MESSAGES.message;
  else if (v.length > LIMITS.messageMax) errors[field] = MESSAGES.messageLong;
}

export type InquiryValues = {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  service: string;
  clientType: string;
  inRwanda: string;
  message: string;
  urgency: string;
  consent: boolean;
};

/** Client-side mirror of the server's inquiry schema. */
export function validateInquiry(values: InquiryValues, serviceOptions: readonly string[]): Errors {
  const errors: Errors = {};
  checkName(values.fullName, errors);
  checkEmail(values.email, errors);
  checkPhone(values.phone, errors, "phone", true);
  if (!contactMethods.includes(values.preferredContact as (typeof contactMethods)[number])) {
    errors.preferredContact = MESSAGES.preferredContact;
  }
  if (!serviceOptions.includes(values.service)) errors.service = MESSAGES.service;
  if (!clientTypes.includes(values.clientType as (typeof clientTypes)[number])) {
    errors.clientType = MESSAGES.clientType;
  }
  if (!inRwandaOptions.includes(values.inRwanda as (typeof inRwandaOptions)[number])) {
    errors.inRwanda = MESSAGES.inRwanda;
  }
  checkMessage(values.message, errors);
  if (values.consent !== true) errors.consent = MESSAGES.consent;
  return errors;
}

export type ContactValues = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
};

/** Client-side mirror of the server's contact schema. */
export function validateContact(values: ContactValues): Errors {
  const errors: Errors = {};
  checkName(values.fullName, errors);
  checkEmail(values.email, errors);
  checkPhone(values.phone, errors, "phone", false);
  const subject = trim(values.subject);
  if (subject.length < LIMITS.subjectMin) errors.subject = MESSAGES.subject;
  else if (subject.length > LIMITS.subjectMax) errors.subject = MESSAGES.subjectLong;
  checkMessage(values.message, errors);
  if (values.consent !== true) errors.consent = MESSAGES.consentContact;
  return errors;
}
