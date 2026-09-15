import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/utils";

export function CTASection({
  eyebrow = "Get started",
  title = "Ready to Get Started?",
  description = "Whether you are starting, managing or expanding a business in Rwanda, R&M Services Group Ltd is here to support you.",
  primaryHref = "/online-assistance",
  primaryLabel = "Get assistance",
  secondaryHref = "/contact",
  secondaryLabel = "Contact R&M",
  whatsappMessage,
  location,
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  whatsappMessage?: string;
  location: string;
  className?: string;
}) {
  return (
    <section className={cn("section", className)} aria-labelledby={`cta-${location}`}>
      <div className="container-rm">
        <div className="relative overflow-hidden rounded-card bg-navy-950 px-6 py-12 pattern-grid sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_85%_10%,rgba(18,104,195,0.5),transparent_62%)]"
          />
          <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-200">
                <span aria-hidden="true" className="h-px w-6 bg-brand-300/70" />
                {eyebrow}
              </p>
              <h2 id={`cta-${location}`} className="mt-3 text-[1.75rem] text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-navy-100/85">{description}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild size="lg" variant="light">
                <TrackedLink href={primaryHref} event="cta_click" payload={{ location, label: primaryLabel }}>
                  {primaryLabel}
                  <ArrowRight aria-hidden="true" />
                </TrackedLink>
              </Button>
              <Button asChild size="lg" variant="outlineLight">
                <TrackedLink href={secondaryHref} event="cta_click" payload={{ location, label: secondaryLabel }}>
                  {secondaryLabel}
                </TrackedLink>
              </Button>
            </div>
          </div>
          {whatsappMessage ? (
            <div className="relative z-10 mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-navy-100/80">
                Prefer to talk it through first? Call us, email us, or message us on WhatsApp.
              </p>
              <WhatsAppButton
                className="mt-3"
                message={whatsappMessage}
                location={`cta-${location}`}
                variant="whatsapp"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
