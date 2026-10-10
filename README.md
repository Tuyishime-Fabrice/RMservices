# R&M Services Group Ltd — website

Marketing and lead-generation website for **R&M Services Group Ltd**, a
business, financial and administrative services company in Kigali, Rwanda.

**Positioning:** Your Trusted Business & Compliance Partner in Rwanda
**Tagline:** Helping Businesses Start, Grow & Stay Compliant

The site is built to convert through **all** of R&M's channels — online
requests, WhatsApp, phone, email and physical office visits — not online alone.

> **Before launch, work through [`CONTENT-CHECKLIST.md`](./CONTENT-CHECKLIST.md).**
> It lists every placeholder in the site. No company facts are invented
> anywhere: where information was missing, the site shows an obvious
> `[CONFIRM ...]` marker instead of a guess.

---

## Table of contents

1. [Technology stack](#technology-stack)
2. [Folder structure](#folder-structure)
3. [Installation](#installation)
4. [Development commands](#development-commands)
5. [Environment variables](#environment-variables)
6. [Email setup](#email-setup)
7. [WhatsApp configuration](#whatsapp-configuration)
8. [Editing content](#editing-content)
9. [Deployment](#deployment)
10. [Domain configuration](#domain-configuration)
11. [Google Search Console](#google-search-console)
12. [Google Analytics](#google-analytics)
13. [SEO implementation](#seo-implementation)
14. [SEO launch checklist](#seo-launch-checklist)
15. [Testing checklist](#testing-checklist)
16. [Accessibility](#accessibility)
17. [Future roadmap](#future-roadmap)

---

## Technology stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, design tokens in `app/globals.css` |
| UI primitives | Hand-built shadcn/ui-style components on Radix (`@radix-ui/react-accordion`, `react-slot`) + `class-variance-authority` |
| Icons | lucide-react |
| Validation | Zod — the same schemas run on the client and the server |
| Email | Resend (swappable; all delivery is behind `lib/email.ts`) |
| Fonts | Source Serif 4 (headings) + Inter (UI), self-hosted via `next/font` |
| Hosting | Vercel (zero-config) |

Almost every page is statically generated. Only the two form endpoints are
dynamic, so the site is fast and cheap to host.

## Folder structure

```
app/
  layout.tsx                 Root layout: fonts, metadata, nav, footer, JSON-LD
  page.tsx                   Homepage (11 sections)
  about/                     About R&M
  services/
    page.tsx                 Service directory with search + category filter
    [slug]/page.tsx          The 10 service pages (statically generated)
  online-assistance/         Inquiry form page
  investors-expatriates/     Investors, expatriates and diaspora page
  resources/
    page.tsx                 Article index
    [slug]/page.tsx          Article template (statically generated)
  faqs/  contact/  privacy-policy/  terms/
  api/
    inquiry/route.ts         Service inquiry endpoint
    contact/route.ts         Contact message endpoint
  sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx  not-found.tsx

components/
  layout/     navbar, footer, analytics loader, floating WhatsApp
  sections/   page-hero, service-card, service-grid, service-filter,
              trust-stats, how-it-works, cta-section, office-card,
              faq-accordion, blog-card, post-cover, testimonials
  forms/      service-inquiry-form, contact-form
  ui/         button, card, badge, field (input/select/textarea/radio/honeypot),
              accordion, breadcrumbs, logo, reveal, json-ld, service-icon,
              media-placeholder, tracked-link, whatsapp-button, section-heading

content/      ← edit the website here, not in the components
  site.ts       Company details, contacts, offices, navigation, trust figures
  services.ts   All 10 services (cards, pages, FAQs, SEO, form options)
  posts.ts      Resource articles
  faqs.ts       Site-wide FAQs

lib/
  seo.ts        Metadata helper + all structured-data builders
  validation.ts Zod schemas, sanitisers, error formatting
  email.ts      HTML + plain-text staff email, Resend delivery
  rate-limit.ts In-memory rate limiter for the form endpoints
  analytics.ts  Typed event layer (dataLayer + gtag)
  whatsapp.ts   wa.me link builders with pre-filled messages
  utils.ts      cn(), date formatting, reference generation

public/brand/   Logo (see public/brand/README.md before launch)
```

## Installation

Requires **Node.js 20+**.

```bash
git clone <repository-url>
cd RMservices
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

The site runs without any environment variables. With no `EMAIL_API_KEY`,
forms still validate and confirm, and submissions are printed to the server
console instead of being emailed — the UI says so honestly rather than
pretending the message was sent.

## Development commands

| Command | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Environment variables

See `.env.example` for the annotated list.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical URLs, sitemap, robots, Open Graph |
| `EMAIL_API_KEY` | Yes (production) | Resend API key — **server-side only** |
| `STAFF_EMAIL` | Yes (production) | Inbox that receives inquiries |
| `FROM_EMAIL` | Yes (production) | Verified sender address |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recommended | WhatsApp number, digits only |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 ID; analytics is fully disabled when empty |

No key is ever bundled into client code: only `NEXT_PUBLIC_*` values reach the
browser, and none of those are secret.

## Email setup

1. Create an account at [resend.com](https://resend.com).
2. **Add and verify the R&M domain** (Domains → Add Domain, then add the DNS
   records Resend shows). This is what lets you send as
   `website@rmservicesgroup.rw`. For a first smoke test you can instead set
   `FROM_EMAIL="R&M Website <onboarding@resend.dev>"`.
3. Create an API key (Sending access is enough) and set `EMAIL_API_KEY`.
4. Set `STAFF_EMAIL` to the inbox that should receive inquiries.
5. Submit a test request at `/online-assistance` and confirm it arrives.

**What staff receive** — subject `New R&M Website Inquiry — [Service]`
(with `[URGENT]` appended for urgent requests), and a branded HTML email with a
plain-text fallback containing:

Request ID · Client name · Email · Phone · Preferred contact method · Service ·
Client type · Currently in Rwanda · Urgency · Message · Date/time (Kigali).

`Reply-To` is set to the client's address, so replying in the inbox reaches
them directly.

**Using a different provider?** Rewrite `sendStaffEmail()` in `lib/email.ts`.
Nothing else in the codebase knows which provider is used.

## WhatsApp configuration

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, international format, e.g.
`250784488898`). Links are built by `lib/whatsapp.ts` and appear in:

- the header: full label on wide screens, icon-only between 1280–1359px, and a
  dedicated icon button on phones (below 640px)
- the homepage hero and online-assistance section
- every service page (hero + sticky request rail), pre-filled with that service
- the contact page
- the urgent inquiry flow, pre-filled with the service and the person's name

Every link opens WhatsApp with a message **prepared**; the visitor still presses
send. The site never claims a message has been sent.

## Editing content

Everything routine is data, not markup:

- **Add or change a service** → `content/services.ts`. One entry generates the
  card, the full page, its FAQs, its SEO tags, its sitemap entry and its option
  in the inquiry form.
- **Publish an article** → add an entry to `content/posts.ts` (typed content
  blocks: `p`, `h2`, `h3`, `ul`, `callout`).
- **Change a phone number, office or stat** → `content/site.ts`.
- **Add an FAQ** → `content/faqs.ts` (also feeds FAQ structured data).

**One rule when editing components:** a client component (`"use client"`)
must not import *values* from `content/services.ts` — doing so bundles the
whole catalogue, including every service page's prose, FAQs and SEO copy, into
the browser's JavaScript. Import the **type** only and take the data as a prop
from the server component above it. `ServiceSummary` and `serviceSummaries`
exist for exactly this: they carry the handful of fields a card or filter
renders. The same applies to `content/posts.ts`.

## Deployment

**Vercel (recommended)**

1. Push the repository to GitHub.
2. In Vercel, *New Project* → import the repo. The framework is detected
   automatically (build `next build`, output `.next`).
3. Add every environment variable from `.env.example` under
   *Settings → Environment Variables* for Production and Preview.
4. Deploy. Subsequent pushes to the default branch deploy automatically.

**Anywhere else:** `npm run build && npm run start` behind a reverse proxy, on
Node 20+. The app needs a Node runtime (the form endpoints are server routes) —
it is not a static export.

> **Note on rate limiting:** `lib/rate-limit.ts` keeps counters in memory,
> which suits a single instance. If you scale to multiple instances, swap it
> for Vercel KV or Upstash Redis — the function signature is designed to stay
> the same.

## Domain configuration

1. Vercel → *Settings → Domains* → add `rmservicesgroup.rw` and
   `www.rmservicesgroup.rw`.
2. At the registrar, point the records Vercel shows (usually an `A` record for
   the apex and a `CNAME` for `www`).
3. Choose one canonical host and redirect the other (Vercel does this for you).
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical URL, then redeploy so canonical
   tags, the sitemap and social metadata all agree.

## Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
   and add the property (Domain property is best — it covers every subdomain).
2. Verify via DNS TXT (recommended), or via the HTML tag method: add the value
   to `metadata.verification` in `app/layout.tsx`.
3. Submit the sitemap: `https://<your-domain>/sitemap.xml`.
4. Request indexing for the homepage and the highest-value service pages.

## Google Analytics

1. Create a GA4 property and copy the measurement ID (`G-XXXXXXXXXX`).
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and redeploy. With it empty, no script
   loads at all.

Conversion events already fire through `lib/analytics.ts` (also pushed to
`window.dataLayer`, so Google Tag Manager works without code changes):

`contact_form_started` · `contact_form_submitted` · `service_inquiry_started` ·
`service_inquiry_submitted` · `form_error` · `whatsapp_click` · `phone_click` ·
`email_click` · `cta_click` · `service_page_view` · `office_directions_click`

Each carries context — for example `whatsapp_click` records where on the site
it was clicked, and `service_inquiry_submitted` records the service, urgency,
client type and preferred contact method. In GA4, mark
`service_inquiry_submitted`, `contact_form_submitted`, `whatsapp_click` and
`phone_click` as key events to measure all five conversion paths.

## SEO implementation

- Unique title (within the ~60-character display limit) and meta description
  (≤160 characters) on every page
- Canonical URL on every page
- `sitemap.xml` generated from the content files (33 URLs)
- `robots.txt` allowing everything except `/api/`
- Open Graph and Twitter card tags; a generated 1200×630 social image
- Structured data: `ProfessionalService` (local business) and `WebSite`
  site-wide; `BreadcrumbList` on inner pages; `Service` on service pages;
  `FAQPage` on `/faqs`, service pages and the investors page; `Article` on
  resource articles; `ItemList` on `/services`; `Blog` on `/resources`
- Semantic HTML: one `<h1>` per page, ordered heading levels, landmarks,
  `<nav aria-label>`, breadcrumbs
- Internal linking: services ↔ related services ↔ articles ↔ inquiry form
- Alt text on every image; descriptive labels on decorative placeholders
- Static generation, `next/font` (no render-blocking font CSS), minimal client
  JavaScript

Keyword themes are worked into real sentences — business/company registration
Rwanda and Kigali, tax compliance and tax services Rwanda, accounting and
bookkeeping Kigali, business advisory, investment certificate, resident permit
and visa assistance, Irembo services, doing business in Rwanda. No stuffing,
and no ranking promises.

## SEO launch checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the live canonical domain
- [ ] `/sitemap.xml` and `/robots.txt` load correctly in production
- [ ] Search Console property verified; sitemap submitted
- [ ] GA4 measurement ID set; a real visit shows in realtime
- [ ] Google Business Profile claimed, with name/address/phone **identical** to
      the website
- [ ] Office addresses confirmed, then added to `organizationJsonLd()` in
      `lib/seo.ts` (deliberately omitted until verified)
- [ ] Rich Results Test passes for a service page and `/faqs`
- [ ] Social preview checked (share the homepage into WhatsApp or LinkedIn)
- [ ] Confirm indexing a week after launch

## Testing checklist

Verified on this build (see "Testing results" below for what was run):

- [x] All 33 routes return 200; unknown URLs return a helpful 404
- [x] Every internal link resolves (37 unique destinations crawled)
- [x] Every navigation item and CTA reaches the right page
- [x] Mobile menu opens, closes on Escape, closes after navigating, restores
      body scroll
- [x] Service page CTAs open the form with the service pre-selected
- [x] Forms: required fields, invalid email, missing consent, successful
      submission, server error path, rate limiting, honeypot
- [x] Urgent flow reveals a WhatsApp CTA pre-filled with service and name
- [x] No horizontal overflow at 320/360/375/390/414/640/768/820/1024/1280/1440/1920
- [x] Keyboard navigation: skip link, visible focus on every tab stop,
      accordion operable with Enter and Space
- [x] WCAG AA contrast across sampled text on all main pages
- [x] One `<h1>` per page, no heading-level skips, all form controls labelled
- [x] No console errors on any page

Re-run after changes: `npm run build && npm run start`, then exercise the flows
above. There is no automated test suite in the MVP — worth adding with
Playwright if the site grows (see the roadmap).

## Security

What is in place on the form endpoints and around the data they handle:

- **Server-side validation is authoritative.** The browser validates for speed
  and friendliness; `app/api/*/route.ts` re-validates every submission with Zod
  and rejects anything that fails, whatever the client did.
- **Request bodies are capped** at 32 KB and rejected with `413` before parsing.
- **Rate limiting:** 5 submissions per 10 minutes per client, per endpoint.
  (In-memory — see the deployment note above if you scale beyond one instance.)
- **Honeypot:** a hidden field bots fill in. A filled honeypot is accepted
  silently and sent nowhere, so the bot learns nothing from the response.
- **Input sanitisation:** every value interpolated into the notification email
  is HTML-escaped, and short fields are stripped of newlines and control
  characters, so neither the email body nor its headers can be injected.
- **No secrets in the browser.** `lib/email.ts` and `lib/validation.ts` are
  `server-only`; only `NEXT_PUBLIC_*` values reach the client, and none of
  those are secret. Verified against the built client chunks.
- **No personal data in production logs.** If email delivery is unconfigured,
  development prints the submission for testing; production logs only the
  reference and an error telling you to configure the provider.
- **Consent is required** before either form can be submitted, with a link to
  the privacy policy.
- **Minimal collection:** contact details and a description of the request.
  No document uploads, no payment details, no identity documents — the forms
  say so explicitly.
- **Security headers** set in `next.config.ts`: `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- External links use `rel="noopener noreferrer"`; the only
  `dangerouslySetInnerHTML` is the JSON-LD block, fed exclusively from our own
  content files and escaped.

## Accessibility

Skip link; landmarks; visible 3px focus rings everywhere; labelled inputs with
hints and inline errors; an error summary that receives focus on failed
submission; `aria-live` status regions; accordions built on Radix; state never
communicated by colour alone (icons, rings and text accompany it); alt text on
images; `prefers-reduced-motion` honoured globally; 12px minimum text size.

## Future roadmap

Deliberately **not** in the MVP — the architecture leaves room for each.

**Phase 2**
- Client accounts and a client portal
- Request tracking with status updates (the reference number already exists)
- Document upload (secure storage, retention policy, consent — needs real
  handling of sensitive data, which is why it is out of MVP scope)
- Online payments
- Automated notifications and reminders
- Staff dashboard for managing requests

**Phase 3**
- CRM and customer history
- Service workflow management
- Automated follow-up sequences
- Advanced analytics and conversion attribution
- Multilingual site (Kinyarwanda and French) — `next-intl` with the content
  files already separated from the components makes this tractable

**Also worth doing**
- Playwright regression suite in CI
- Move rate limiting to Vercel KV or Upstash
- Swap generated cover art for real R&M photography
- Publish real client testimonials once collected
