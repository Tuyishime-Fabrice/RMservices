import { contact } from "@/content/site";

/**
 * Builds a wa.me link with a pre-filled message.
 * We never claim a message has been sent — the link only opens WhatsApp with
 * the text ready for the user to send themselves.
 */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  "Hello R&M Services Group Ltd, I would like to ask about your services.";

export function serviceWhatsappMessage(service: string) {
  return `Hello R&M Services Group Ltd, I would like assistance with ${service}.`;
}

export function urgentWhatsappMessage(service: string, name?: string) {
  const who = name?.trim() ? ` My name is ${name.trim()}.` : "";
  return `Hello R&M Services Group Ltd, I need urgent assistance with ${service}.${who}`;
}
