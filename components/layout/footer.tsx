import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/ui/logo";
import { TrackedAnchor } from "@/components/ui/tracked-link";
import { siteConfig, contact, offices, socialLinks } from "@/content/site";
import { services } from "@/content/services";
import { whatsappUrl, defaultWhatsappMessage } from "@/lib/whatsapp";

const quickLinks = [
  { label: "About R&M", href: "/about" },
  { label: "All services", href: "/services" },
  { label: "Online assistance", href: "/online-assistance" },
  { label: "Investors & expatriates", href: "/investors-expatriates" },
  { label: "Resources", href: "/resources" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-navy-100">
      <div className="container-rm py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Company */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <LogoMark size={48} />
              <div>
                <p className="font-display text-lg font-semibold text-white">{siteConfig.legalName}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
                  {siteConfig.city}, {siteConfig.country}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-100/75">
              A trusted provider of business, financial and administrative services in Kigali,
              supporting entrepreneurs, businesses, foreign investors, expatriates and the Rwandan
              diaspora — remotely and in person.
            </p>
            <p className="mt-4 text-sm font-medium text-brand-200">{siteConfig.tagline}</p>

            {socialLinks.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-navy-100/80 underline-offset-4 hover:text-white hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-navy-100/60">
                [ADD OFFICIAL SOCIAL MEDIA LINKS]
              </p>
            )}
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Services
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-navy-100/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-labelledby="footer-links" className="lg:col-span-2">
            <h2 id="footer-links" className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Quick links
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-100/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Contact</h2>
            <ul className="mt-4 grid gap-3 text-sm">
              <li>
                <TrackedAnchor
                  href={`tel:${contact.phonePrimaryHref}`}
                  event="phone_click"
                  payload={{ location: "footer" }}
                  className="inline-flex items-center gap-2 text-navy-100/85 transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-brand-300" aria-hidden="true" />
                  {contact.phonePrimaryDisplay}
                </TrackedAnchor>
              </li>
              <li>
                <TrackedAnchor
                  href={`tel:${contact.phoneSecondaryHref}`}
                  event="phone_click"
                  payload={{ location: "footer-secondary" }}
                  className="inline-flex items-center gap-2 text-navy-100/85 transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-brand-300" aria-hidden="true" />
                  {contact.phoneSecondaryDisplay}
                </TrackedAnchor>
              </li>
              <li>
                <TrackedAnchor
                  href={`mailto:${contact.email}`}
                  event="email_click"
                  payload={{ location: "footer" }}
                  className="inline-flex items-center gap-2 break-all text-navy-100/85 transition-colors hover:text-white"
                >
                  <Mail className="size-4 text-brand-300" aria-hidden="true" />
                  {contact.email}
                </TrackedAnchor>
              </li>
              <li>
                <TrackedAnchor
                  href={whatsappUrl(defaultWhatsappMessage)}
                  external
                  event="whatsapp_click"
                  payload={{ location: "footer" }}
                  className="inline-flex items-center gap-2 text-navy-100/85 transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4 text-brand-300" aria-hidden="true" />
                  WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </TrackedAnchor>
              </li>
            </ul>

            <h3 className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Our offices
            </h3>
            <ul className="mt-4 grid gap-3 text-sm">
              {offices.map((office) => (
                <li key={office.id} className="flex items-start gap-2 text-navy-100/85">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                  <span>
                    <span className="block font-medium text-white">{office.name}</span>
                    <span className="block text-xs text-navy-100/60">{office.addressPlaceholder}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-navy-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="underline-offset-4 hover:text-white hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="underline-offset-4 hover:text-white hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="underline-offset-4 hover:text-white hover:underline">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-navy-100/70">
          R&amp;M Services Group Ltd is a private professional services company. We provide
          preparation, guidance and application support. We are not a government agency and we do
          not approve or decide the outcome of any official application.
        </p>
      </div>
    </footer>
  );
}
