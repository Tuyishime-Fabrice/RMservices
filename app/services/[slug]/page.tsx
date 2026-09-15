import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Phone, Check, HelpCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceIcon } from "@/components/ui/service-icon";
import { ServiceCard } from "@/components/sections/service-card";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedAnchor, TrackedLink, TrackView } from "@/components/ui/tracked-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services, getService, getCategory } from "@/content/services";
import { contact, offices } from "@/content/site";
import { serviceWhatsappMessage } from "@/lib/whatsapp";
import { pageMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

/** All ten service pages are statically generated at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const category = getCategory(service.category);
  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const trail = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${service.slug}` },
  ];

  const inquiryHref = `/online-assistance?service=${encodeURIComponent(service.inquiryValue)}`;

  return (
    <>
      <TrackView event="service_page_view" payload={{ service: service.inquiryValue }} />
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.metaDescription,
          path: `/services/${service.slug}`,
          category: category.name,
        })}
      />
      <JsonLd data={faqJsonLd(service.faqs)} />

      <PageHero
        eyebrow={category.name}
        title={service.heading}
        lead={service.intro}
        trail={trail}
        actions={
          <>
            <Button asChild size="lg" variant="light">
              <TrackedLink
                href={inquiryHref}
                event="cta_click"
                payload={{ location: "service-hero", service: service.inquiryValue }}
              >
                {service.ctaLabel}
                <ArrowRight aria-hidden="true" />
              </TrackedLink>
            </Button>
            <WhatsAppButton
              message={serviceWhatsappMessage(service.name)}
              location={`service-hero-${service.slug}`}
              size="lg"
              variant="outlineLight"
            />
          </>
        }
        aside={
          <div className="rounded-card border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <ServiceIcon name={service.icon} tone="light" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-brand-200">
              At a glance
            </p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-100/85">{service.summary}</p>
            <ul className="mt-5 grid gap-2 border-t border-white/10 pt-5 text-sm text-navy-100/80">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                Remote or in-person support
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                Clear communication, no hidden fees
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                Two offices in Kigali
              </li>
            </ul>
          </div>
        }
      />

      <div className="section">
        <div className="container-rm grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div className="min-w-0">
            {/* Overview */}
            <section aria-labelledby="overview-heading" className="prose-rm max-w-none">
              <h2 id="overview-heading" className="text-2xl sm:text-3xl">
                Service overview
              </h2>
              {service.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </section>

            {/* Who it is for */}
            <section aria-labelledby="audience-heading" className="mt-14">
              <h2 id="audience-heading" className="text-2xl sm:text-3xl">
                Who this service is for
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-line bg-surface-soft px-4 py-3.5 text-[0.9375rem] text-ink-soft"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What we help with */}
            <section aria-labelledby="help-heading" className="mt-14">
              <h2 id="help-heading" className="text-2xl sm:text-3xl">
                What R&amp;M can help with
              </h2>
              <ul className="mt-5 grid gap-3">
                {service.helpWith.map((item, index) => (
                  <Reveal as="li" key={item} delay={Math.min(index * 50, 200)}>
                    <div className="flex items-start gap-3 rounded-card border border-line bg-white p-4 shadow-soft">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700"
                      >
                        {index + 1}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </section>

            {/* Why clients ask */}
            <section aria-labelledby="why-heading" className="mt-14">
              <h2 id="why-heading" className="text-2xl sm:text-3xl">
                Why clients ask us for support
              </h2>
              <ul className="prose-rm mt-4">
                {service.whyClientsAsk.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* How to get started */}
            <section aria-labelledby="start-heading" className="mt-14">
              <h2 id="start-heading" className="text-2xl sm:text-3xl">
                How to get started
              </h2>
              <ol className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Tell us what you need",
                    text: `Submit a request online with “${service.inquiryValue}” selected, or call, WhatsApp or visit us.`,
                  },
                  {
                    title: "We review it",
                    text: "A member of our team reads your request and works out what is actually involved.",
                  },
                  {
                    title: "We contact you",
                    text: "We get in touch using your preferred method to discuss next steps and fees.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="rounded-card border border-line bg-surface-soft p-5">
                    <span className="font-display text-2xl font-semibold text-brand-600">
                      0{index + 1}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-navy-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.text}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <TrackedLink
                    href={inquiryHref}
                    event="cta_click"
                    payload={{ location: "service-how-to-start", service: service.inquiryValue }}
                  >
                    {service.ctaLabel}
                    <ArrowRight aria-hidden="true" />
                  </TrackedLink>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <TrackedAnchor
                    href={`tel:${contact.phonePrimaryHref}`}
                    event="phone_click"
                    payload={{ location: `service-${service.slug}` }}
                  >
                    <Phone aria-hidden="true" />
                    {contact.phonePrimaryDisplay}
                  </TrackedAnchor>
                </Button>
              </div>
            </section>

            {/* FAQs */}
            <section aria-labelledby="faq-heading" className="mt-14">
              <h2 id="faq-heading" className="flex items-center gap-2 text-2xl sm:text-3xl">
                <HelpCircle className="size-6 text-brand-700" aria-hidden="true" />
                Frequently asked questions
              </h2>
              <FAQAccordion items={service.faqs} idPrefix={service.slug} className="mt-6" />
              <p className="mt-4 text-sm text-muted">
                Have a different question?{" "}
                <Link href="/faqs" className="font-medium text-brand-700 underline underline-offset-4">
                  See all FAQs
                </Link>{" "}
                or{" "}
                <Link href="/contact" className="font-medium text-brand-700 underline underline-offset-4">
                  contact our team
                </Link>
                .
              </p>
            </section>
          </div>

          {/* Sticky support rail */}
          <aside className="lg:sticky lg:top-28 lg:h-fit" aria-label="Request assistance">
            <div className="rounded-card border border-line bg-white p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-navy-900">Request assistance</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Start online and our team will contact you, or reach us directly — whichever you
                prefer.
              </p>
              <div className="mt-5 grid gap-2.5">
                <Button asChild full>
                  <TrackedLink
                    href={inquiryHref}
                    event="cta_click"
                    payload={{ location: "service-rail", service: service.inquiryValue }}
                  >
                    {service.ctaLabel}
                  </TrackedLink>
                </Button>
                <WhatsAppButton
                  message={serviceWhatsappMessage(service.name)}
                  location={`service-rail-${service.slug}`}
                  full
                />
                <Button asChild variant="outline" full>
                  <TrackedAnchor
                    href={`tel:${contact.phonePrimaryHref}`}
                    event="phone_click"
                    payload={{ location: `service-rail-${service.slug}` }}
                  >
                    <Phone aria-hidden="true" />
                    {contact.phonePrimaryDisplay}
                  </TrackedAnchor>
                </Button>
              </div>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Or visit us in Kigali
                </p>
                <ul className="mt-3 grid gap-2 text-sm text-ink-soft">
                  {offices.map((office) => (
                    <li key={office.id} className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
                      <span className="font-medium text-navy-900">{office.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related services */}
      {related.length > 0 ? (
        <section className="section bg-surface-soft" aria-labelledby="related-heading">
          <div className="container-rm">
            <SectionHeading
              eyebrow="Related services"
              title="Clients often need these too"
              description="Most requests touch more than one area. We can handle them together so nothing falls between the gaps."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="h-full">
                  <ServiceCard service={item} className="h-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTASection
        location={`service-${service.slug}`}
        title={`Ready to move forward with ${service.name.toLowerCase()}?`}
        description="Tell us what you need and our team will contact you to discuss the next steps. You can also call, message us on WhatsApp, or visit one of our Kigali offices."
        primaryHref={inquiryHref}
        primaryLabel={service.ctaLabel}
        secondaryLabel="Contact R&M"
      />
    </>
  );
}
