import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Clock3, Building2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceInquiryForm } from "@/components/forms/service-inquiry-form";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedAnchor } from "@/components/ui/tracked-link";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { contact, offices } from "@/content/site";
import { serviceInquiryOptions } from "@/content/services";

export const metadata = pageMetadata({
  title: "Get Assistance Online | R&M Services Group",
  description:
    "Request business, tax, accounting, permit or Irembo assistance in Rwanda online. Tell us what you need and our Kigali team will contact you.",
  path: "/online-assistance",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Online Assistance", href: "/online-assistance" },
];

export default function OnlineAssistancePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <PageHero
        eyebrow="Online assistance"
        title="Get R&M Assistance"
        lead="Tell us what you need help with and our team will contact you to discuss the next steps."
        trail={trail}
      />

      <section className="section" aria-labelledby="form-heading">
        <div className="container-rm grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14">
          <div className="min-w-0">
            <div className="rounded-card border border-line bg-white p-6 shadow-soft sm:p-8">
              <h2 id="form-heading" className="text-2xl">
                Tell us about your request
              </h2>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
                The form takes about two minutes. There is no obligation, and submitting it does not
                commit you to anything — it simply starts a conversation with our team.
              </p>
              <div className="mt-8">
                <ServiceInquiryForm serviceOptions={serviceInquiryOptions} />
              </div>
            </div>

            <p className="mt-6 flex items-start gap-2.5 rounded-card border border-line bg-surface-soft px-5 py-4 text-sm text-ink-soft">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
              <span>
                We only ask for what we need to contact you and understand your request. Please do
                not send identity documents, passports or payment details through this form — if
                documents are needed, we will tell you how to provide them securely. See our{" "}
                <Link href="/privacy-policy" className="font-medium text-brand-700 underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </span>
            </p>
          </div>

          {/* Other ways to reach us — online is one route, not the only one */}
          <aside className="lg:sticky lg:top-28 lg:h-fit" aria-labelledby="other-ways-heading">
            <div className="rounded-card border border-line bg-white p-6 shadow-soft">
              <h2 id="other-ways-heading" className="text-lg font-semibold text-navy-900">
                Prefer not to use a form?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Online is one way to reach us — not the only way. Many clients simply call, message
                us, or walk into one of our offices.
              </p>
              <div className="mt-5 grid gap-2.5">
                <WhatsAppButton location="online-assistance-rail" full />
                <Button asChild variant="outline" full>
                  <TrackedAnchor
                    href={`tel:${contact.phonePrimaryHref}`}
                    event="phone_click"
                    payload={{ location: "online-assistance-rail" }}
                  >
                    <Phone aria-hidden="true" />
                    {contact.phonePrimaryDisplay}
                  </TrackedAnchor>
                </Button>
                <Button asChild variant="outline" full>
                  <TrackedAnchor
                    href={`mailto:${contact.email}`}
                    event="email_click"
                    payload={{ location: "online-assistance-rail" }}
                  >
                    <Mail aria-hidden="true" />
                    Email us
                  </TrackedAnchor>
                </Button>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  <Building2 className="size-3.5" aria-hidden="true" />
                  Visit us in Kigali
                </p>
                <ul className="mt-3 grid gap-3 text-sm">
                  {offices.map((office) => (
                    <li key={office.id} className="flex items-start gap-2 text-ink-soft">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
                      <span>
                        <span className="block font-semibold text-navy-900">{office.name}</span>
                        <span className="block text-xs text-muted">{office.addressPlaceholder}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-start gap-2 text-xs text-muted">
                  <Clock3 className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  Opening hours: {contact.openingHours}
                </p>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-semibold text-navy-900">What happens next?</p>
                <ol className="mt-3 grid gap-2 text-sm text-ink-soft">
                  <li>1. You receive a reference number on screen.</li>
                  <li>2. Your request is emailed to our team.</li>
                  <li>3. We contact you using your preferred method.</li>
                </ol>
                <p className="mt-3 text-xs text-muted">
                  We do not publish a guaranteed response time — we would rather contact you properly
                  than promise a number we have not committed to.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <HowItWorks className="bg-surface-soft" />
    </>
  );
}
