"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { TrackedAnchor, TrackedLink } from "@/components/ui/tracked-link";
import { navigation, contact } from "@/content/site";
import { whatsappUrl, defaultWhatsappMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Close the mobile menu on navigation. Adjusting state during render is the
  // React-recommended pattern here (no effect, no extra paint).
  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar: direct human contact routes, always visible on desktop */}
      <div className="hidden bg-navy-950 text-navy-100 lg:block">
        <div className="container-rm flex h-10 items-center justify-between text-[0.8125rem]">
          <p className="text-navy-100/80">
            Business, financial &amp; administrative services in Kigali, Rwanda
          </p>
          <div className="flex items-center gap-5">
            <TrackedAnchor
              href={`tel:${contact.phonePrimaryHref}`}
              event="phone_click"
              payload={{ location: "utility-bar" }}
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-white"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {contact.phonePrimaryDisplay}
            </TrackedAnchor>
            <TrackedAnchor
              href={`mailto:${contact.email}`}
              event="email_click"
              payload={{ location: "utility-bar" }}
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-white"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              {contact.email}
            </TrackedAnchor>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b bg-white/95 backdrop-blur transition-shadow duration-300",
          scrolled ? "border-line shadow-soft" : "border-transparent",
        )}
      >
        <div className="container-rm flex h-[4.5rem] items-center justify-between gap-3 xl:px-6">
          <Logo size={44} />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative block whitespace-nowrap rounded-md px-2 py-2 text-[0.875rem] font-medium transition-colors 2xl:px-2.5 2xl:text-[0.9375rem]",
                      isActive(item.href)
                        ? "text-brand-800"
                        : "text-ink-soft hover:bg-navy-50 hover:text-navy-900",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand-700"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <TrackedAnchor
              href={whatsappUrl(defaultWhatsappMessage)}
              external
              event="whatsapp_click"
              payload={{ location: "navbar" }}
              aria-label="Chat with R&M Services Group on WhatsApp (opens in a new tab)"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-line px-2.5 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-[#0E7268] hover:text-[#0E7268] sm:inline-flex xl:px-3"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span className="xl:hidden min-[1360px]:inline">WhatsApp</span>
            </TrackedAnchor>

            <Button asChild size="md" className="hidden whitespace-nowrap px-4 sm:inline-flex 2xl:px-5">
              <TrackedLink
                href="/online-assistance"
                event="cta_click"
                payload={{ location: "navbar", label: "Get assistance" }}
              >
                Get assistance
              </TrackedLink>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy-900 transition-colors hover:bg-navy-50 xl:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-white shadow-lift xl:hidden"
      >
        <nav aria-label="Mobile" className="container-rm py-4">
          <ul className="grid gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-brand-50 text-brand-800"
                      : "text-navy-900 hover:bg-navy-50",
                  )}
                >
                  {item.label}
                  <ArrowRight className="size-4 text-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid gap-2 border-t border-line pt-4">
            {/* On phones the header has no room for the CTA, so it leads here. */}
            <Button asChild size="lg" full>
              <TrackedLink
                href="/online-assistance"
                event="cta_click"
                payload={{ location: "mobile-menu", label: "Get assistance" }}
              >
                Get assistance
                <ArrowRight aria-hidden="true" />
              </TrackedLink>
            </Button>
            <Button asChild size="lg" variant="whatsapp" full>
              <TrackedAnchor
                href={whatsappUrl(defaultWhatsappMessage)}
                external
                event="whatsapp_click"
                payload={{ location: "mobile-menu" }}
              >
                <MessageCircle aria-hidden="true" />
                Chat on WhatsApp
              </TrackedAnchor>
            </Button>
            <Button asChild size="lg" variant="outline" full>
              <TrackedAnchor
                href={`tel:${contact.phonePrimaryHref}`}
                event="phone_click"
                payload={{ location: "mobile-menu" }}
              >
                <Phone aria-hidden="true" />
                {contact.phonePrimaryDisplay}
              </TrackedAnchor>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
