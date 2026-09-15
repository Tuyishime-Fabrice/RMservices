"use client";

import { MessageCircle } from "lucide-react";
import { TrackedAnchor } from "@/components/ui/tracked-link";
import { whatsappUrl, defaultWhatsappMessage } from "@/lib/whatsapp";

/**
 * One discreet floating WhatsApp entry point, shown only below xl, where the
 * header's WhatsApp button is hidden or icon-only. On wide screens the header
 * and in-page CTAs already cover it, so the site keeps reading as a
 * professional business website rather than a chat funnel.
 */
export function FloatingWhatsApp() {
  return (
    <TrackedAnchor
      href={whatsappUrl(defaultWhatsappMessage)}
      external
      event="whatsapp_click"
      payload={{ location: "floating-button" }}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#0E7268] px-4 py-3 text-sm font-semibold text-white shadow-lift transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#0A6157] sm:bottom-6 sm:right-6 xl:hidden"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sr-only">Chat with R&amp;M Services Group on WhatsApp (opens in a new tab)</span>
    </TrackedAnchor>
  );
}
