# Content checklist — confirm before launch

This website contains **no invented company facts**. Wherever information was
not supplied by R&M Services Group Ltd, the site shows an obvious placeholder
instead of a guess. Every one of those placeholders is listed below.

Work through this list with R&M, then delete each item as it is resolved.

---

## 1. Contact details — HIGH PRIORITY

Taken from the supplied company flyer. Confirm each is current and correct.

| Item | Current value | Where it lives |
|---|---|---|
| Primary phone | `+250 784 488 898` | `content/site.ts` → `contact.phonePrimaryDisplay` / `phonePrimaryHref` |
| Secondary phone | `0780 555 131` (dialled as `+250780555131`) | `content/site.ts` → `contact.phoneSecondaryDisplay` / `phoneSecondaryHref` |
| Email | `irembordbd@gmail.com` | `content/site.ts` → `contact.email`, and `STAFF_EMAIL` in the environment |
| **WhatsApp number** | defaults to the primary phone | `NEXT_PUBLIC_WHATSAPP_NUMBER` env var — **[CONFIRM OFFICIAL WHATSAPP NUMBER]** |

Recommended: move from a Gmail address to a company-domain address
(e.g. `info@rmservicesgroup.rw`) before launch. It materially improves trust,
and it is required for Resend sender verification on your own domain.

## 2. Office addresses — HIGH PRIORITY

Both offices currently display bracketed placeholders, and the Contact page map
area is a placeholder rather than an unverified map pin.

- [ ] **[CONFIRM RDB OFFICE ADDRESS]** — building, floor, office number
- [ ] **[CONFIRM KABC ADDRESS]** — building, floor, office number
- [ ] Google Maps link for each office (`offices[].mapsUrl` in `content/site.ts`)
- [ ] **[CONFIRM OFFICE OPENING HOURS]** (`contact.openingHours`)

Once confirmed, also add `streetAddress` to the structured data in
`lib/seo.ts` → `organizationJsonLd()`. It is intentionally omitted today:
publishing an unverified address would damage local SEO rather than help it.

## 3. Domain

- [ ] Confirm the live domain. The code currently defaults to
      `https://www.rmservicesgroup.rw` — set `NEXT_PUBLIC_SITE_URL` to the real
      one. It drives canonical URLs, the sitemap and all social metadata.

## 4. Logo and photography

- [ ] Replace `public/brand/rm-logo.svg` with the **official logo file**. The
      current file is a stand-in built from the supplied logo so the site
      renders; it is the only place the mark is referenced.
- [ ] Optional: add `public/brand/og-image.png` (1200×630) to replace the
      generated social image in `app/opengraph-image.tsx`.
- [ ] Supply authentic R&M photography. Every photo slot is a clearly labelled
      placeholder — no stock photos of strangers are used, because they would
      imply staff and offices that are not R&M's. Slots:
  - Homepage hero — R&M team supporting a client at the Kigali office
  - About page — R&M office exterior or reception
  - Contact page — map of office locations (after addresses are confirmed)
      Replace `<MediaPlaceholder />` with `next/image` once files are in
      `public/photos/`.

## 5. Testimonials

- [ ] **[ADD REAL CLIENT TESTIMONIALS]** — add them to
      `components/sections/testimonials.tsx`. The section publishes itself
      automatically once real, attributable quotes exist. Nothing is invented,
      and in production nothing is shown while the list is empty. (In
      development you will see a reminder block in its place.)

## 6. Social media

- [ ] **[ADD OFFICIAL SOCIAL MEDIA LINKS]** — `socialLinks` in
      `content/site.ts`. The footer shows a placeholder note until they exist.
      Add the same profiles to `sameAs` in `lib/seo.ts` for structured data.

## 7. Languages

- [ ] **[CONFIRM LANGUAGES OFFERED]** — the FAQ answer in `content/faqs.ts`
      ("What languages do you work in?") is a placeholder.

## 8. Legal pages — REQUIRES REVIEW

`/privacy-policy` and `/terms` describe accurately what the website does, but
both are marked **[LEGAL REVIEW REQUIRED BEFORE LAUNCH]** and contain specific
open questions:

- [ ] Data retention period for enquiry records
- [ ] Process for access/correction/deletion requests
- [ ] Which analytics tool is used (and update the policy accordingly)
- [ ] Liability wording
- [ ] Governing law and jurisdiction wording
- [ ] "Last updated" dates on both pages

## 9. Deliberately absent — confirm this is still what R&M wants

These were omitted on purpose because no verified information was supplied.
Nothing here is a bug.

- **No prices anywhere.** Fees are discussed after an inquiry, as instructed.
- **No government fees, requirements, processing times or approval claims** on
  any page or in any article.
- **No response-time promise.** If R&M wants to commit to one (e.g. "within one
  working day"), it can be added to `/online-assistance` and the confirmation
  message.
- **No founding year, staff names, awards, certifications or partnerships.**
- **No client names or logos.**
- Only the two supplied figures are used: **10+ years** and **1,000+ clients**.

## 10. Before you publish

- [ ] Set every environment variable in Vercel (see `.env.example`)
- [ ] Send a real test inquiry and confirm it arrives in the R&M inbox
- [ ] Click the WhatsApp button on a phone and confirm it opens the right number
- [ ] Submit the Google Search Console verification and the sitemap
- [ ] Create/claim the Google Business Profile and make the name, address and
      phone **exactly match** this website
