"use client";

import { MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/ui/tracked-link";
import { whatsappUrl, defaultWhatsappMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Opens WhatsApp with a pre-filled message. It never sends anything on the
 * visitor's behalf — the person still presses send in WhatsApp.
 */
export function WhatsAppButton({
  message = defaultWhatsappMessage,
  label = "Chat on WhatsApp",
  location,
  variant = "whatsapp",
  size = "md",
  full,
  className,
}: {
  message?: string;
  label?: string;
  /** Where on the site the click happened — used for analytics. */
  location: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  full?: boolean;
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} full={full} className={className}>
      <TrackedAnchor
        href={whatsappUrl(message)}
        external
        event="whatsapp_click"
        payload={{ location }}
      >
        <MessageCircle aria-hidden="true" />
        <span>{label}</span>
        <span className={cn("sr-only")}>(opens WhatsApp in a new tab)</span>
      </TrackedAnchor>
    </Button>
  );
}
