import Link from "next/link";
import { ArrowRight, Check, Globe2, Plane, Building2, Receipt, Calculator, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { ServiceCard } from "@/components/sections/service-card";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { getService } from "@/content/services";

export const metadata = pageMetadata({
  title: "Investors & Expatriates in Rwanda | R&M Group",
  description:
    "Support for foreign investors, expatriates and the Rwandan diaspora: company set-up, investment registration, tax, accounting and permits.",
  path: "/investors-expatriates",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Investors & Expatriates", href: "/investors-expatriates" },
];

const areas = [
  {
    icon: Building2,
    title: "Business registration",
    text: "Setting up a Rwandan entity, with the structure and details right from the start — even if you are not in the country.",
    href: "/services/business-registration-rwanda",
  },
  {
    icon: Globe2,
    title: "Investment-related services",
    text: "Support preparing and submitting investment registration applications, coordinated alongside your company set-up.",
    href: "/services/investment-certificate-processing",
  },
  {
    icon: Receipt,
    title: "Tax registration & compliance",
    text: "Understanding which obligations apply to your entity, and keeping declarations on a reliable cycle.",
    href: "/services/tax-advisory-compliance",
  },
  {
    icon: Calculator,
    title: "Accounting & bookkeeping",
    text: "Local accounting support and clean records — including reporting back to a parent company or partners abroad.",
    href: "/services/accounting-bookkeeping",
  },
  {
    icon: Compass,
    title: "Business advisory",
    text: "Practical local context for decisions: how your plans translate into Rwanda, and in what order to do things.",
    href: "/services/business-support-consultancy",
  },
  {
    icon: Plane,
    title: "Administrative assistance",
    text: "Application support for conformity letters, resident permits and visas, and Irembo services for you and your team.",
    href: "/services/immigration-resident-permit-assistance",
  },
];

const faqs = [
  {
    question: "Can R&M act for us while we are outside Rwanda?",
    answer:
      "Yes. We work with clients remotely by email, phone and WhatsApp, and our team is physically in Kigali to follow up in person where that is needed.",
  },
  {
    question: "Do you provide legal or immigration advice?",
    answer:
      "No. We provide professional business, financial and administrative services, including application support. We do not provide legal or immigration advice, and we do not guarantee the outcome of any official application.",
  },
  {
    question: "Can you handle company set-up and permits together?",
    answer:
      "Yes, and it is usually the sensible approach. Registration, tax registration and the administrative steps for foreign staff are connected, and sequencing them properly saves time.",
  },
  {
    question: "We are a diaspora family, not a company. Can you still help?",
    answer:
      "Yes. We support individuals and families as well as businesses — from starting a small business remotely to administrative and Irembo matters.",
  },
  {
    question: "How do fees work for international clients?",
    answer:
      "Exactly as they do for local clients: we discuss them with you directly once we understand your request, transparently and with no hidden fees.",
  },
];

export default function InvestorsExpatriatesPage() {
  const featured = ["business-registration-rwanda", "investment-certificate-processing", "immigration-resident-permit-assistance"]
    .map((slug) => getService(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHero
        eyebrow="Investors, expatriates & diaspora"
        title="Professional Business & Administrative Support in Rwanda"
        lead="R&M Services Group Ltd supports foreign investors, expatriates and members of the Rwandan diaspora with the business, financial and administrative side of operating in Rwanda — remotely or in person in Kigali."
        trail={trail}
        actions={
          <>
            <Button asChild size="lg" variant="light">
              <TrackedLink
                href="/online-assistance"
                event="cta_click"
                payload={{ location: "investors-hero", label: "Get assistance" }}
              >
                Get assistance
                <ArrowRight aria-hidden="true" />
              </TrackedLink>
            </Button>
            <WhatsAppButton
              location="investors-hero"
              size="lg"
              variant="outlineLight"
              message="Hello R&M Services Group Ltd, I am an investor/expatriate and would like assistance in Rwanda."
            />
          </>
        }
      />

      <section className="section" aria-labelledby="intro-heading">
        <div className="container-rm grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="prose-rm max-w-none">
            <h2 id="intro-heading" className="mt-0 text-2xl sm:text-3xl">
              Working in Rwanda from abroad — or newly arrived
            </h2>
            <p>
              Entering a new market is rarely difficult because of the strategy. It is difficult
              because of everything underneath it: the entity, the registrations, the obligations
              that begin the moment a company exists, and the administrative steps for the people
              who will run it.
            </p>
            <p>
              That is the part we handle. R&amp;M Services Group Ltd has supported businesses in
              Rwanda for more than 10 years and has served over 1,000 clients, including foreign
              investors, expatriates living in Rwanda, and members of the Rwandan diaspora building
              something at home from abroad.
            </p>
            <p>
              You keep the decisions. We handle the preparation, the paperwork and the follow-up —
              and we tell you honestly what is within our control and what is not.
            </p>
            <h3>What makes international work different</h3>
            <ul>
              <li>Someone reliable must be reachable on the ground in Kigali.</li>
              <li>Steps have a sensible order, and getting it wrong costs weeks.</li>
              <li>Communication has to work across time zones, in writing, clearly.</li>
              <li>Permits and administrative steps for people need planning alongside the company.</li>
            </ul>
          </div>

          <div className="rounded-card border border-line bg-surface-soft p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-navy-900">Who this page is for</h2>
            <ul className="mt-5 grid gap-3">
              {[
                "Foreign investors establishing or expanding in Rwanda",
                "Foreign companies opening a Rwandan entity",
                "Expatriates living and working in Rwanda",
                "Members of the Rwandan diaspora investing from abroad",
                "Families handling administrative matters in Rwanda",
                "Advisors and firms who need a partner on the ground",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-brand-200 bg-white p-4">
              <p className="text-sm font-semibold text-navy-900">Remote or in person — your choice</p>
              <p className="mt-1.5 text-sm text-ink-soft">
                Work with us entirely online, or meet our team at RDB New Headquarters or KABC when
                you are in Kigali.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface-soft" aria-labelledby="areas-heading">
        <div className="container-rm">
          <SectionHeading
            eyebrow="How we help"
            title="Where R&M supports international clients"
            description="The same services we provide to local businesses, arranged around the way investors, expatriates and diaspora clients actually need them."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, index) => (
              <Reveal as="li" key={area.title} delay={index * 60} className="h-full">
                <div className="group flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
                    <area.icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy-900">{area.title}</h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{area.text}</p>
                  <Link
                    href={area.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                  >
                    Learn more
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-heading">
        <div className="container-rm">
          <SectionHeading
            eyebrow="Most requested"
            title="Services international clients start with"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <li key={service.slug} className="h-full">
                <ServiceCard service={service} className="h-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-surface-soft" aria-labelledby="investor-faq-heading">
        <div className="container-rm max-w-3xl">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked by international clients"
            align="center"
          />
          <FAQAccordion items={faqs} idPrefix="investors" className="mt-10" />
        </div>
      </section>

      <CTASection
        location="investors"
        title="Planning something in Rwanda?"
        description="Tell us what you are trying to do and our team will contact you to discuss how we can support it — whether you are in Kigali next week or on the other side of the world."
        primaryLabel="Get assistance"
        secondaryLabel="Contact R&M"
        whatsappMessage="Hello R&M Services Group Ltd, I am an investor/expatriate and would like assistance in Rwanda."
      />
    </>
  );
}
