import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceFilter } from "@/components/sections/service-filter";
import { CTASection } from "@/components/sections/cta-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedAnchor, TrackedLink } from "@/components/ui/tracked-link";
import { pageMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { services, serviceSummaries, serviceCategories } from "@/content/services";
import { contact } from "@/content/site";

export const metadata = pageMetadata({
  title: "Our Services in Rwanda | R&M Services Group",
  description:
    "Business registration, company amendments, investment certificates, tax, accounting, advisory, permits and Irembo services in Kigali, Rwanda.",
  path: "/services",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

export default function ServicesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "R&M Services Group Ltd services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={itemListJsonLd} />

      <PageHero
        eyebrow="Our services"
        title="Professional business, financial and administrative services in Rwanda"
        lead="Ten services covering registration, tax and finance, business support, and administrative matters — for entrepreneurs, companies, investors, expatriates and individuals."
        trail={trail}
        actions={
          <>
            <Button asChild size="lg" variant="light">
              <TrackedLink
                href="/online-assistance"
                event="cta_click"
                payload={{ location: "services-hero", label: "Get assistance" }}
              >
                Get assistance
                <ArrowRight aria-hidden="true" />
              </TrackedLink>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <TrackedAnchor
                href={`tel:${contact.phonePrimaryHref}`}
                event="phone_click"
                payload={{ location: "services-hero" }}
              >
                <Phone aria-hidden="true" />
                {contact.phonePrimaryDisplay}
              </TrackedAnchor>
            </Button>
          </>
        }
      />

      <section className="section" aria-labelledby="service-directory-heading">
        <div className="container-rm">
          <h2 id="service-directory-heading" className="sr-only">
            Service directory
          </h2>
          <ServiceFilter services={serviceSummaries} serviceCategories={serviceCategories} />
        </div>
      </section>

      <HowItWorks className="bg-surface-soft" />

      <CTASection
        location="services"
        title="Not sure which service you need?"
        description="Describe your situation in your own words and our team will point you to the right support — or tell you honestly if it is not something we handle."
        primaryLabel="Describe your situation"
        secondaryLabel="Contact R&M"
      />
    </>
  );
}
