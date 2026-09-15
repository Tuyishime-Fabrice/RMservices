/**
 * Lightweight analytics event layer.
 *
 * No analytics credentials live in the source. If
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set, events go to Google Analytics via
 * gtag; they are always pushed to window.dataLayer so any tag manager can
 * consume them. With no ID configured this is a silent no-op.
 */

export type AnalyticsEvent =
  | "contact_form_started"
  | "contact_form_submitted"
  | "service_inquiry_started"
  | "service_inquiry_submitted"
  | "form_error"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "cta_click"
  | "service_page_view"
  | "office_directions_click";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    window.gtag?.("event", event, payload);
  } catch {
    /* analytics must never break the page */
  }
}
