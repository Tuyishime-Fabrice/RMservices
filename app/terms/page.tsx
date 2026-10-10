import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/ui/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig, contact } from "@/content/site";

export const metadata = pageMetadata({
  title: "Terms of Use | R&M Services Group",
  description:
    "The terms that apply when you use the R&M Services Group Ltd website and submit a request through it.",
  path: "/terms",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Terms of Use", href: "/terms" },
];

/** Update whenever the terms change. */
const LAST_UPDATED = "10 October 2026";

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        lead="The basis on which this website is provided, and what submitting a request does and does not mean."
        trail={trail}
      />

      <section className="section">
        <div className="container-rm max-w-3xl">
          {/*
            These terms reflect how the website actually works. R&M should have
            them reviewed by a qualified adviser before relying on them — see
            CONTENT-CHECKLIST.md.
          */}
          <div className="prose-rm">
            <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>

            <h2>About this website</h2>
            <p>
              This website is operated by {siteConfig.legalName}, a private professional services
              company based in {siteConfig.city}, {siteConfig.country}. By using the site you accept
              these terms.
            </p>

            <h2>What we are — and what we are not</h2>
            <p>
              R&amp;M Services Group Ltd is a private company providing business, financial and
              administrative services. We are <strong>not</strong> a government agency and we are not
              acting on behalf of one. We prepare, guide and support applications for our clients.
              We do <strong>not</strong> approve applications, issue certificates, permits or
              licences, or decide the outcome of any official process. Those decisions belong to the
              responsible Rwandan authority.
            </p>

            <h2>Information on this site is general</h2>
            <p>
              The content on this website, including the articles in our{" "}
              <Link href="/resources">resources</Link> section, is general information about how
              things work in practice. It is not legal, tax, accounting or immigration advice, and it
              should not be relied on as such. We deliberately do not publish official fees,
              requirements or processing times. For guidance about your own situation, contact us and
              we will discuss it with you directly.
            </p>

            <h2>Submitting a request</h2>
            <p>
              Submitting a form on this site starts a conversation. It does not create a contract
              between you and R&amp;M, and it does not oblige either of us to proceed. Any engagement,
              including the fees involved, is agreed separately after we have understood your
              request.
            </p>
            <p>
              Please provide accurate information. We can only help on the basis of what you tell us.
            </p>

            <h2>Fees</h2>
            <p>
              We do not publish prices on this website. Professional fees are discussed with you
              directly once we understand what you need, transparently and with no hidden fees.
              Any official costs payable to third parties are separate from our professional fees.
            </p>

            <h2>Acceptable use</h2>
            <ul>
              <li>Do not use the site or its forms to send unlawful, abusive or misleading content.</li>
              <li>Do not attempt to disrupt, overload or gain unauthorised access to the site.</li>
              <li>Do not submit identity documents, passports or payment details through our forms.</li>
            </ul>

            <h2>Links to other websites</h2>
            <p>
              Where we link to a third-party website, we do so for convenience. We do not control
              those sites and are not responsible for their content.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The R&amp;M name, logo and the content of this website belong to{" "}
              {siteConfig.legalName} unless stated otherwise.
            </p>

            <h2>Liability</h2>
            <p>
              We take care to keep this website accurate and available, but we cannot guarantee that
              it will always be error-free or uninterrupted. The content here is general
              information, and we are not responsible for decisions taken solely on the basis of it
              without speaking to us about your own situation. Nothing in these terms limits any
              liability that cannot lawfully be limited.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of Rwanda, and any dispute relating to this
              website falls to the courts of Rwanda.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms: email{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{" "}
              <a href={`tel:${contact.phonePrimaryHref}`}>{contact.phonePrimaryDisplay}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
