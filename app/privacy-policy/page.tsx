import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/ui/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig, contact } from "@/content/site";

export const metadata = pageMetadata({
  title: "Privacy Policy | R&M Services Group",
  description:
    "How R&M Services Group Ltd collects, uses and protects the information you submit through this website.",
  path: "/privacy-policy",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How we handle the information you send us through this website."
        trail={trail}
      />

      <section className="section">
        <div className="container-rm max-w-3xl">
          <div className="rounded-card border border-dashed border-gold-300 bg-gold-100/50 p-5">
            <p className="text-sm font-semibold text-navy-900">
              [LEGAL REVIEW REQUIRED BEFORE LAUNCH]
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              This policy describes what the website actually does today, and is written as a
              starting point. It must be reviewed and approved by R&amp;M Services Group Ltd —
              and, where appropriate, by a qualified adviser — to confirm it meets the company&rsquo;s
              obligations under Rwandan data protection law before the site goes live.
            </p>
          </div>

          <div className="prose-rm mt-10">
            <p className="text-sm text-muted">Last updated: [CONFIRM DATE AT LAUNCH]</p>

            <h2>Who we are</h2>
            <p>
              {siteConfig.legalName} (&ldquo;R&amp;M&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a
              private professional services company based in {siteConfig.city}, {siteConfig.country},
              providing business, financial and administrative services. This policy applies to{" "}
              {siteConfig.url}.
            </p>

            <h2>What information we collect</h2>
            <p>We collect only what you choose to send us through this website:</p>
            <ul>
              <li>Your name, email address and phone number.</li>
              <li>Your preferred contact method.</li>
              <li>The service you are asking about and how urgent it is.</li>
              <li>Which description fits you (for example individual, business or investor) and whether you are currently in Rwanda.</li>
              <li>The message you write to us.</li>
            </ul>
            <p>
              We do not ask for identity documents, passports, payment card details or other
              sensitive documentation through this website, and you should not send them through our
              forms.
            </p>

            <h2>How we use your information</h2>
            <ul>
              <li>To read and understand your request.</li>
              <li>To contact you about it, using the method you chose.</li>
              <li>To provide the services you ask us for.</li>
              <li>To keep a record of enquiries we have received.</li>
            </ul>
            <p>
              We do not sell your information, and we do not send marketing messages you have not
              asked for.
            </p>

            <h2>How your information reaches us</h2>
            <p>
              When you submit a form, your details are validated on our server and sent by email to
              the R&amp;M team inbox. Communication then continues by email, phone or WhatsApp,
              depending on what you chose.
            </p>

            <h2>WhatsApp</h2>
            <p>
              Where the site offers a WhatsApp option, clicking it opens WhatsApp with a message
              prepared for you. Nothing is sent until you press send in WhatsApp. Messages you send
              through WhatsApp are also subject to WhatsApp&rsquo;s own privacy terms.
            </p>

            <h2>Analytics</h2>
            <p>
              If website analytics are enabled, we may collect anonymous information about how pages
              are used — for example which pages are viewed and which buttons are clicked — so we can
              improve the site. This does not identify you personally.
              [CONFIRM WHICH ANALYTICS TOOL IS USED AND UPDATE THIS SECTION.]
            </p>

            <h2>How long we keep it</h2>
            <p>[CONFIRM R&amp;M&rsquo;S RETENTION PERIOD FOR ENQUIRY RECORDS.]</p>

            <h2>Your choices</h2>
            <p>
              You can ask us what information we hold about you, ask us to correct it, or ask us to
              delete it, by contacting us using the details below. [CONFIRM THE PROCESS R&amp;M WILL
              FOLLOW FOR SUCH REQUESTS.]
            </p>

            <h2>Contact us about privacy</h2>
            <p>
              Email{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{" "}
              <a href={`tel:${contact.phonePrimaryHref}`}>{contact.phonePrimaryDisplay}</a>. You can
              also visit our offices in Kigali — see our{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
