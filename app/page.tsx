import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  MessagesSquare,
  Globe2,
  MapPin,
  Handshake,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { TrackedAnchor, TrackedLink } from "@/components/ui/tracked-link";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { TrustStats } from "@/components/sections/trust-stats";
import { CategorisedServices } from "@/components/sections/service-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { OfficeCard } from "@/components/sections/office-card";
import { BlogCard } from "@/components/sections/blog-card";
import { CTASection } from "@/components/sections/cta-section";
import { Testimonials } from "@/components/sections/testimonials";
import { siteConfig, contact, offices } from "@/content/site";
import { sortedPosts } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Business & Compliance Services in Rwanda | R&M Group",
  description:
    "Business registration, tax compliance, accounting, advisory, permits and Irembo services in Kigali, Rwanda. 10+ years, 1,000+ clients served.",
  path: "/",
});

const reasons = [
  {
    icon: ShieldCheck,
    title: "Experienced team",
    description:
      "More than 10 years supporting businesses in Rwanda, and over 1,000 clients served — from first-time entrepreneurs to established companies.",
  },
  {
    icon: Handshake,
    title: "Professional support",
    description:
      "Business, financial and administrative services handled properly, by people who do this work every day.",
  },
  {
    icon: MessagesSquare,
    title: "Clear communication",
    description:
      "We explain things in plain language, tell you what is involved, and keep you informed as your request moves forward.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent approach",
    description:
      "Professional, transparent and legitimate support, with no hidden fees. We tell you what we can do — and what is outside our control.",
  },
  {
    icon: Globe2,
    title: "Local and international clients",
    description:
      "We work with Rwandan entrepreneurs and businesses, foreign investors, expatriates and members of the Rwandan diaspora.",
  },
  {
    icon: Users,
    title: "Remote and in person",
    description:
      "Submit a request online, call, message us on WhatsApp — or sit down with our team at either Kigali office.",
  },
];

export default function HomePage() {
  const featuredPosts = sortedPosts.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* 1. HERO                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-navy-950 pattern-grid" aria-labelledby="hero-heading">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_110%_at_78%_-5%,rgba(18,104,195,0.5),transparent_58%)]"
        />
        <div className="container-rm relative z-10 py-14 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center">
            <div className="max-w-2xl">
              <Badge tone="light">
                <MapPin className="mr-1.5 size-3.5" aria-hidden="true" />
                Kigali, Rwanda · Remote &amp; in-person support
              </Badge>
              <h1 id="hero-heading" className="mt-5 text-[2.1rem] leading-[1.1] text-white sm:text-[3rem] lg:text-[3.4rem]">
                Your Trusted Business &amp; Compliance Partner in Rwanda
              </h1>
              <p className="mt-5 font-display text-xl text-brand-200 sm:text-2xl">
                Helping Businesses Start, Grow &amp; Stay Compliant.
              </p>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-navy-100/85">
                R&amp;M Services Group Ltd provides professional business, financial and
                administrative support for entrepreneurs, businesses, investors, expatriates and the
                Rwandan diaspora in Rwanda.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" variant="light" className="sm:min-w-[15rem]">
                  <TrackedLink
                    href="/online-assistance"
                    event="cta_click"
                    payload={{ location: "hero", label: "Get assistance online" }}
                  >
                    Get assistance online
                    <ArrowRight aria-hidden="true" />
                  </TrackedLink>
                </Button>
                <Button asChild size="lg" variant="outlineLight">
                  <TrackedLink
                    href="/contact"
                    event="cta_click"
                    payload={{ location: "hero", label: "Contact R&M" }}
                  >
                    Contact R&amp;M
                  </TrackedLink>
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm">
                <TrackedAnchor
                  href={`tel:${contact.phonePrimaryHref}`}
                  event="phone_click"
                  payload={{ location: "hero" }}
                  className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-brand-200"
                >
                  <Phone className="size-4 text-brand-300" aria-hidden="true" />
                  {contact.phonePrimaryDisplay}
                </TrackedAnchor>
                <WhatsAppButton
                  location="hero"
                  variant="ghost"
                  size="sm"
                  label="Chat on WhatsApp"
                  className="px-0 text-white hover:bg-transparent hover:text-brand-200"
                />
                <span className="text-navy-100/60">or visit us at RDB New HQ or KABC</span>
              </div>
            </div>

            {/* Hero visual: brand-led, not a generic stock photo. */}
            <div className="relative">
              <div className="rounded-card border border-white/10 bg-white/[0.04] p-4 shadow-lift backdrop-blur-sm">
                <MediaPlaceholder
                  label="R&M team supporting a client at the Kigali office"
                  ratio="aspect-[4/3]"
                  className="border-white/10"
                />
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-navy-900 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-200">
                      Experience
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-white">10+ years</dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-navy-900 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-200">
                      Clients served
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-white">1,000+</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. TRUST                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-line bg-surface-soft py-12" aria-labelledby="trust-heading">
        <div className="container-rm">
          <h2 id="trust-heading" className="sr-only">
            Why businesses trust R&amp;M Services Group Ltd
          </h2>
          <TrustStats />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. SERVICES                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container-rm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Our services"
              title="What Can We Help You With?"
              description="Ten professional services across business registration, tax and finance, business support, and administrative matters — for businesses and individuals in Rwanda."
              className="md:max-w-2xl"
            />
            <Button asChild variant="outline" size="lg" className="shrink-0">
              <Link href="/services">
                View all services
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-12">
            <CategorisedServices />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. WHY R&M                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="section bg-surface-soft" aria-labelledby="why-heading">
        <div className="container-rm">
          <SectionHeading
            eyebrow="Why R&M"
            title="Why Work With R&M?"
            description="A real company with offices in Kigali, a decade of experience, and a straightforward way of working."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <Reveal as="li" key={reason.title} delay={index * 60} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
                    <reason.icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy-900">{reason.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. ONLINE ASSISTANCE                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" aria-labelledby="online-assistance-heading">
        <div className="container-rm">
          <div className="grid items-center gap-10 rounded-card border border-line bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <div>
              <SectionHeading
                eyebrow="Online assistance"
                title="Need Support Without Starting With a Visit?"
                description="Tell us what you need and our team will guide you through the next steps. You can submit your request online, call us, chat with us on WhatsApp, or visit our offices in Kigali."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <TrackedLink
                    href="/online-assistance"
                    event="cta_click"
                    payload={{ location: "home-online-assistance", label: "Start your request" }}
                  >
                    Start your request
                    <ArrowRight aria-hidden="true" />
                  </TrackedLink>
                </Button>
                <WhatsAppButton location="home-online-assistance" size="lg" />
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                { title: "Submit online", text: "A short form — name, contact details and what you need help with." },
                { title: "Call or WhatsApp", text: `Reach our team directly on ${contact.phonePrimaryDisplay}.` },
                { title: "Visit an office", text: "Come to RDB New Headquarters or KABC and speak with us in person." },
              ].map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-line bg-surface-soft p-4"
                >
                  <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-600" />
                  <span>
                    <span className="block font-semibold text-navy-900">{item.title}</span>
                    <span className="block text-sm text-ink-soft">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. HOW IT WORKS                                                  */}
      {/* ---------------------------------------------------------------- */}
      <HowItWorks className="bg-surface-soft" />

      {/* ---------------------------------------------------------------- */}
      {/* 7. PHYSICAL PRESENCE                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" aria-labelledby="offices-heading">
        <div className="container-rm">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Our offices"
                title="Visit R&M in Kigali"
                description="R&M Services Group Ltd is a real company with a physical presence in Kigali. You are welcome to work with us remotely — and equally welcome to walk in and speak with our team face to face."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <TrackedLink
                    href="/contact"
                    event="cta_click"
                    payload={{ location: "home-offices", label: "Visit our office" }}
                  >
                    Visit our office
                    <ArrowRight aria-hidden="true" />
                  </TrackedLink>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <TrackedAnchor
                    href={`tel:${contact.phonePrimaryHref}`}
                    event="phone_click"
                    payload={{ location: "home-offices" }}
                  >
                    <Phone aria-hidden="true" />
                    Call before you visit
                  </TrackedAnchor>
                </Button>
              </div>
              <p className="mt-5 text-sm text-muted">
                Opening hours: {contact.openingHours}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {offices.map((office, index) => (
                <Reveal key={office.id} delay={index * 80} className="h-full">
                  <OfficeCard office={office} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. INVESTORS & EXPATRIATES                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-navy-950 pattern-grid" aria-labelledby="investors-heading">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_15%_0%,rgba(18,104,195,0.45),transparent_60%)]"
        />
        <div className="container-rm relative z-10 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="International clients"
                title="Doing Business in Rwanda?"
                description="R&M Services Group Ltd supports entrepreneurs, foreign investors, expatriates and members of the Rwandan diaspora with business, financial and administrative services in Rwanda."
                tone="light"
              />
              <div className="mt-8">
                <Button asChild size="lg" variant="light">
                  <TrackedLink
                    href="/investors-expatriates"
                    event="cta_click"
                    payload={{ location: "home-investors", label: "Learn more" }}
                  >
                    Learn more
                    <ArrowRight aria-hidden="true" />
                  </TrackedLink>
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Company registration in Rwanda",
                "Investment certificate processing",
                "Tax registration & compliance",
                "Accounting & bookkeeping",
                "Business advisory",
                "Permits, visas & Irembo support",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm font-medium text-navy-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 9. TESTIMONIALS (renders only when real quotes are supplied)      */}
      {/* ---------------------------------------------------------------- */}
      <Testimonials />

      {/* ---------------------------------------------------------------- */}
      {/* 10. RESOURCES                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="section bg-surface-soft" aria-labelledby="resources-heading">
        <div className="container-rm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Resources"
              title="Guides for doing business in Rwanda"
              description="Straightforward articles answering the questions clients ask us most often — written by our team, with no unverified procedures or figures."
              className="md:max-w-2xl"
            />
            <Button asChild variant="outline" size="lg" className="shrink-0">
              <Link href="/resources">
                All resources
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <Reveal as="li" key={post.slug} delay={index * 70} className="h-full">
                <BlogCard post={post} className="h-full" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 11. FINAL CTA                                                    */}
      {/* ---------------------------------------------------------------- */}
      <CTASection
        location="home"
        whatsappMessage={`Hello ${siteConfig.legalName}, I would like to ask about your services.`}
      />
    </>
  );
}
