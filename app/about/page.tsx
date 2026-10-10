import Link from "next/link";
import { ArrowRight, Check, Building2, Globe2, MessagesSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrustStats } from "@/components/sections/trust-stats";
import { OfficeCard } from "@/components/sections/office-card";
import { CTASection } from "@/components/sections/cta-section";
import Image from "next/image";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { Reveal } from "@/components/ui/reveal";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { offices, photos, visitNote, siteConfig } from "@/content/site";
import { serviceCategories, servicesByCategory } from "@/content/services";

export const metadata = pageMetadata({
  title: "About R&M Services Group Ltd | Kigali, Rwanda",
  description:
    "A Kigali-based provider of business, financial and administrative services, with 10+ years of experience and 1,000+ clients served in Rwanda.",
  path: "/about",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const audiences = [
  "Local entrepreneurs starting their first business",
  "Small and medium businesses that need reliable support",
  "Established companies managing compliance and accounting",
  "Foreign investors setting up or expanding in Rwanda",
  "Expatriates living and working in Rwanda",
  "Members of the Rwandan diaspora investing from abroad",
  "Individuals who need administrative or Irembo assistance",
];

const principles = [
  {
    icon: ShieldCheck,
    title: "Professional and legitimate",
    description:
      "We provide professional, transparent and legitimate support. We follow proper process, and we are clear about what is and is not within our control.",
  },
  {
    icon: MessagesSquare,
    title: "Clear communication",
    description:
      "We explain things in plain language and keep clients informed. If we do not know something, we say so rather than guess.",
  },
  {
    icon: ShieldCheck,
    title: "No hidden fees",
    description:
      "Fees are discussed openly once we understand your request. We do not publish price lists, because an honest figure depends on what you actually need.",
  },
  {
    icon: Globe2,
    title: "Local and international",
    description:
      "We work with Rwandan clients and with investors, expatriates and diaspora clients abroad — remotely and in person.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <PageHero
        eyebrow="About us"
        title="A trusted business and compliance partner in Kigali"
        lead="R&M Services Group Ltd supports entrepreneurs, businesses, investors, expatriates and the Rwandan diaspora with business, financial and administrative services — remotely and in person."
        trail={trail}
        actions={
          <>
            <Button asChild size="lg" variant="light">
              <TrackedLink
                href="/online-assistance"
                event="cta_click"
                payload={{ location: "about-hero", label: "Get assistance" }}
              >
                Get assistance
                <ArrowRight aria-hidden="true" />
              </TrackedLink>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <Link href="/services">See our services</Link>
            </Button>
          </>
        }
      />

      {/* Company overview */}
      <section className="section" aria-labelledby="overview-heading">
        <div className="container-rm grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="prose-rm max-w-none">
            <h2 id="overview-heading" className="mt-0 text-2xl sm:text-3xl">
              Who we are
            </h2>
            <p>
              R&amp;M Group is a trusted provider of business, financial and administrative services
              in Kigali, Rwanda, supporting local entrepreneurs, foreign investors, expatriates and
              the Rwandan diaspora.
            </p>
            <p>
              With more than 10 years of experience and over 1,000 clients served, we provide company
              and business registration, investment registration, tax registration and declarations,
              tax compliance, accounting and bookkeeping, business advisory, and Irembo services for
              visas and permits.
            </p>
            <p>
              We offer professional, transparent and legitimate support both remotely and in person,
              with clear communication and no hidden fees. Whether you are starting, managing or
              expanding a business in Rwanda, R&amp;M Group is your trusted partner.
            </p>
            <blockquote className="my-6 border-l-2 border-brand-600 pl-5 text-[1.0625rem] italic leading-relaxed text-navy-900">
              {siteConfig.brochureSummary}
            </blockquote>

            <h3>What that means in practice</h3>
            <p>
              Most of our clients come to us at a moment when something needs to be done properly:
              a business that must be registered, records that have fallen behind, a permit
              application that cannot go wrong, a decision that needs an experienced second opinion.
            </p>
            <p>
              We are a private professional services company. We prepare, guide and support
              applications on our clients&rsquo; behalf — we are not a government agency, and no
              professional firm decides the outcome of an official application. Being straight about
              that is part of why clients trust us.
            </p>
          </div>

          <div className="grid gap-5">
            <figure>
              <Image
                src={photos.team.src}
                alt={photos.team.alt}
                width={photos.team.width}
                height={photos.team.height}
                loading="lazy"
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="w-full rounded-card border border-line object-cover shadow-soft"
              />
              <figcaption className="mt-3 text-sm text-ink-soft">
                <span className="font-semibold text-navy-900">The people behind our services.</span>{" "}
                When you contact R&amp;M, a member of this team reads your request and follows it
                through.
              </figcaption>
            </figure>
            <div className="rounded-card border border-line bg-surface-soft p-6">
              <h3 className="text-lg font-semibold text-navy-900">Experience</h3>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Years
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-navy-900">10+</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Clients served
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-navy-900">1,000+</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-ink-soft">
                These figures are provided by R&amp;M Services Group Ltd. We publish nothing about
                our experience that the company has not confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-soft py-12">
        <div className="container-rm">
          <h2 className="sr-only">R&amp;M at a glance</h2>
          <TrustStats />
        </div>
      </section>

      {/* Who we support */}
      <section className="section" aria-labelledby="audience-heading">
        <div className="container-rm">
          <SectionHeading
            eyebrow="Who we support"
            title="The people and businesses we work with"
            description="Our clients range from first-time entrepreneurs to established companies and international investors. The common thread is that they want something handled properly."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item, index) => (
              <Reveal as="li" key={item} delay={Math.min(index * 50, 250)} className="h-full">
                <div className="flex h-full items-start gap-2.5 rounded-card border border-line bg-white p-4 shadow-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
                  <span className="text-[0.9375rem] text-ink-soft">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Services overview */}
      <section className="section bg-surface-soft" aria-labelledby="services-overview-heading">
        <div className="container-rm">
          <SectionHeading
            eyebrow="What we do"
            title="Our services at a glance"
            description="Ten services across four areas. Every one of them can be started online, by phone, on WhatsApp, or in person at our Kigali offices."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {serviceCategories.map((category) => (
              <div key={category.id} className="rounded-card border border-line bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-navy-900">{category.name}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{category.description}</p>
                <ul className="mt-4 grid gap-2">
                  {servicesByCategory(category.id).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-line px-3.5 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:border-brand-300 hover:text-brand-700"
                      >
                        {service.name}
                        <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section" aria-labelledby="approach-heading">
        <div className="container-rm">
          <SectionHeading
            eyebrow="Our approach"
            title="How we work with clients"
            description="Four principles that shape every engagement — and that clients can hold us to."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={index * 70} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
                    <principle.icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy-900">{principle.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Offices */}
      <section className="section bg-surface-soft" aria-labelledby="offices-heading">
        <div className="container-rm">
          <SectionHeading
            eyebrow="Physical presence"
            title="Two offices in Kigali"
            description="R&M Services Group Ltd is a real company you can visit. Many clients work with us entirely remotely; many others prefer to sit down with our team. Both are equally welcome."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {offices.map((office) => (
              <OfficeCard key={office.id} office={office} />
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">{visitNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                <Building2 aria-hidden="true" />
                Contact and office details
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection location="about" />
    </>
  );
}
