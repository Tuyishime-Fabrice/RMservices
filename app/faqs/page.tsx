import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedAnchor, TrackedLink } from "@/components/ui/tracked-link";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { faqGroups, allFaqItems } from "@/content/faqs";
import { contact } from "@/content/site";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions | R&M Services Group",
  description:
    "Answers about R&M's services in Rwanda, our Kigali offices, contacting us remotely or urgently, and how to request assistance online.",
  path: "/faqs",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "FAQs", href: "/faqs" },
];

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(allFaqItems)} />

      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        lead="Straight answers about what we do, how we work, and how to reach us. If your question is not here, ask us directly — we would rather answer than leave you guessing."
        trail={trail}
        actions={
          <>
            <Button asChild size="lg" variant="light">
              <TrackedLink
                href="/online-assistance"
                event="cta_click"
                payload={{ location: "faqs-hero", label: "Ask our team" }}
              >
                Ask our team
                <ArrowRight aria-hidden="true" />
              </TrackedLink>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <TrackedAnchor
                href={`tel:${contact.phonePrimaryHref}`}
                event="phone_click"
                payload={{ location: "faqs-hero" }}
              >
                <Phone aria-hidden="true" />
                {contact.phonePrimaryDisplay}
              </TrackedAnchor>
            </Button>
          </>
        }
      />

      <section className="section" aria-labelledby="faq-index-heading">
        <div className="container-rm grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          <nav aria-labelledby="faq-index-heading" className="lg:sticky lg:top-28 lg:h-fit">
            <h2 id="faq-index-heading" className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
              On this page
            </h2>
            <ul className="mt-4 grid gap-1.5">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="block rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:bg-navy-50 hover:text-brand-700"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-card border border-line bg-surface-soft p-5">
              <p className="text-sm font-semibold text-navy-900">Still unsure?</p>
              <p className="mt-1.5 text-sm text-ink-soft">
                Describe your situation and we will tell you honestly whether we can help.
              </p>
              <Button asChild size="sm" className="mt-4" full>
                <Link href="/online-assistance">Get assistance</Link>
              </Button>
            </div>
          </nav>

          <div className="grid gap-12">
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-28">
                <h2 id={`${group.id}-heading`} className="text-2xl sm:text-3xl">
                  {group.title}
                </h2>
                <FAQAccordion items={group.items} idPrefix={group.id} className="mt-6" />
              </section>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        location="faqs"
        title="Question not answered here?"
        description="Send it to us directly. A member of our team will read it and come back to you using whichever contact method you prefer."
        primaryLabel="Ask our team"
        secondaryLabel="Contact R&M"
      />
    </>
  );
}
