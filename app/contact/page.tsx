import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Clock3, Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { OfficeCard } from "@/components/sections/office-card";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedAnchor } from "@/components/ui/tracked-link";
import Image from "next/image";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { contact, offices, photos, visitNote } from "@/content/site";

export const metadata = pageMetadata({
  title: "Contact Us in Kigali, Rwanda | R&M Services Group",
  description:
    "Call, email or WhatsApp R&M Services Group Ltd in Kigali, or visit our offices at RDB New Headquarters and KABC. Remote and in-person support.",
  path: "/contact",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <PageHero
        eyebrow="Contact"
        title="Talk to R&M Services Group Ltd"
        lead="Call us, message us on WhatsApp, send an email, write to us using the form below, or visit one of our two offices in Kigali. Whichever you choose, a person will read it."
        trail={trail}
      />

      {/* Direct contact routes */}
      <section className="section" aria-labelledby="ways-heading">
        <div className="container-rm">
          <h2 id="ways-heading" className="sr-only">
            Ways to contact us
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <li className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
                  <Phone className="size-5" aria-hidden="true" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">Call us</h3>
                <ul className="mt-2 grid gap-1.5 text-[0.9375rem]">
                  <li>
                    <TrackedAnchor
                      href={`tel:${contact.phonePrimaryHref}`}
                      event="phone_click"
                      payload={{ location: "contact-cards-primary" }}
                      className="font-medium text-brand-700 underline-offset-4 hover:underline"
                    >
                      {contact.phonePrimaryDisplay}
                    </TrackedAnchor>
                  </li>
                  <li>
                    <TrackedAnchor
                      href={`tel:${contact.phoneSecondaryHref}`}
                      event="phone_click"
                      payload={{ location: "contact-cards-secondary" }}
                      className="font-medium text-brand-700 underline-offset-4 hover:underline"
                    >
                      {contact.phoneSecondaryDisplay}
                    </TrackedAnchor>
                  </li>
                </ul>
                <p className="mt-auto pt-4 text-xs text-muted">Best for quick questions.</p>
              </div>
            </li>

            <li className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[#0E7268]/25 bg-[#0E7268]/10 text-[#0E7268]">
                  <MessageCircle className="size-5" aria-hidden="true" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">WhatsApp</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">
                  Message our team directly. Opening WhatsApp prepares your message — you press send.
                </p>
                <div className="mt-4">
                  <WhatsAppButton location="contact-cards" size="sm" />
                </div>
              </div>
            </li>

            <li className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
                  <Mail className="size-5" aria-hidden="true" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">Email</h3>
                <TrackedAnchor
                  href={`mailto:${contact.email}`}
                  event="email_click"
                  payload={{ location: "contact-cards" }}
                  className="mt-2 break-all text-[0.9375rem] font-medium text-brand-700 underline-offset-4 hover:underline"
                >
                  {contact.email}
                </TrackedAnchor>
                <p className="mt-auto pt-4 text-xs text-muted">Best for detailed requests.</p>
              </div>
            </li>

            <li className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
                  <MapPin className="size-5" aria-hidden="true" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">Visit an office</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">
                  RDB New Headquarters and KABC, Kigali. You are welcome to walk in.
                </p>
                <p className="mt-auto flex items-start gap-1.5 pt-4 text-xs text-muted">
                  <Clock3 className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  Call or message us first and we will have the right person ready.
                </p>
              </div>
            </li>
          </ul>

          <p className="mt-6 flex items-start gap-2.5 rounded-card border border-line bg-surface-soft px-5 py-4 text-sm text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
            <span>
              R&amp;M Services Group Ltd is a private professional services company. We prepare,
              guide and support applications — we are not a government agency, and official
              decisions are made by the responsible Rwandan authority.
            </span>
          </p>
        </div>
      </section>

      {/* Form + offices */}
      <section className="section bg-surface-soft" aria-labelledby="contact-form-heading">
        <div className="container-rm grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Send a message"
              title="Write to us"
              description="Use this form for general questions. If you already know which service you need, the online assistance form captures a little more detail and routes your request faster."
              as="h2"
            />
            <div className="mt-8 rounded-card border border-line bg-white p-6 shadow-soft sm:p-8">
              <h3 id="contact-form-heading" className="sr-only">
                Contact form
              </h3>
              <ContactForm />
            </div>
            <p className="mt-4 text-sm text-ink-soft">
              Requesting a specific service?{" "}
              <Link
                href="/online-assistance"
                className="font-medium text-brand-700 underline underline-offset-4"
              >
                Use the online assistance form instead
              </Link>
              .
            </p>
          </div>

          <div>
            <SectionHeading
              eyebrow="Our offices"
              title="Visit R&M in Kigali"
              description="R&M Services Group Ltd has two offices in Kigali. You are welcome to visit us in person."
              as="h2"
            />
            <div className="mt-8 grid gap-5">
              {offices.map((office) => (
                <OfficeCard key={office.id} office={office} />
              ))}
            </div>

            <div className="mt-6 rounded-card border border-line bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-navy-900">Look for this entrance</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Our banner stands beside the door, so you will know you are in the right place.
                {" "}
                {visitNote}
              </p>
              <Image
                src={photos.officeEntrance.src}
                alt={photos.officeEntrance.alt}
                width={photos.officeEntrance.width}
                height={photos.officeEntrance.height}
                loading="lazy"
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="mt-4 w-full rounded-card border border-line object-cover"
              />
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                <WhatsAppButton location="contact-offices" full />
                <Button asChild variant="outline" full>
                  <TrackedAnchor
                    href={`tel:${contact.phonePrimaryHref}`}
                    event="phone_click"
                    payload={{ location: "contact-offices" }}
                  >
                    <Phone aria-hidden="true" />
                    Call us
                  </TrackedAnchor>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
