# Content checklist

This site publishes **no invented company facts**. Everything shown comes from
what R&M supplied: the company profile, the service brochure, and the office
photographs. Nothing is a guess, and there are no visible `[CONFIRM ...]`
markers left anywhere on the site.

What follows is what R&M still needs to decide or supply.

---

## Confirmed and live

| Item | Value | Source |
|---|---|---|
| Phone (primary) | `+250 784 488 898` | Service brochure |
| Phone (secondary) | `0780 555 131` | Service brochure |
| Email | `irembordb@gmail.com` | Service brochure, confirmed by R&M |
| WhatsApp | Primary phone number | Confirmed |
| Offices | RDB New Headquarters and KABC, Kigali | Company profile |
| Experience | 10+ years, 1,000+ clients | Company profile |
| Production domain | `https://r-mservices.vercel.app` | Confirmed by R&M |

## 1. Still to supply

- [ ] **Street addresses** for RDB New Headquarters and KABC. The site shows
      the office names and "Kigali, Rwanda" only. Publishing an unverified
      address would hurt local search more than publishing none. Once
      confirmed, add `streetAddress` to `organizationJsonLd()` in `lib/seo.ts`,
      add a Google Maps link per office in `content/site.ts`, and the Contact
      page can carry a real map.
- [ ] **Opening hours.** Every page currently says to call or message before
      visiting. Once hours are confirmed, add them to `content/site.ts` and to
      the structured data as `openingHoursSpecification`.
- [ ] **Official social media profiles.** `socialLinks` in `content/site.ts` is
      empty, so the footer shows nothing rather than a placeholder. Add them
      there and to `sameAs` in `lib/seo.ts`.
- [ ] **The official logo file.** `public/brand/rm-logo.svg` is a faithful
      stand-in built from the supplied mark. Drop the real file in at that
      exact path — it is the only place the logo is referenced.

## 2. Decisions for R&M

- [ ] **A company-domain email.** `irembordb@gmail.com` works, but a
      `@yourdomain.rw` address reads as more established and is required to
      send mail from your own domain through Resend. Change it in
      `content/site.ts` and `STAFF_EMAIL` when ready.
- [ ] **Custom domain.** The site canonicalises to the Vercel hostname today.
      When a custom domain goes live, set `NEXT_PUBLIC_SITE_URL` to it and
      redeploy — canonicals, the sitemap, Open Graph tags and structured data
      all follow automatically. Keep the Vercel hostname redirecting to the new
      domain so existing links and any indexed pages survive.
- [ ] **Client testimonials.** The section is built and publishes itself the
      moment real, attributable quotes are added to
      `components/sections/testimonials.tsx`. Nothing is invented, and in
      production nothing is shown while the list is empty.
- [ ] **Legal review.** `/privacy-policy` and `/terms` are complete and
      describe exactly what the website does. They should still be reviewed by
      a qualified adviser — particularly the data-retention, liability and
      governing-law sections, and the policy's fit with Rwandan data protection
      law. Update the `LAST_UPDATED` constant at the top of each page when the
      text changes.

## 3. Photographs

Three of the four supplied photographs are published. See
`public/photos/README.md` for where each one appears.

- [ ] **Confirm the two staff members consented** to appearing on the website.
      The photo is used on the homepage and the About page.
- [ ] **The fourth photograph (the shared service hall) is not published.** It
      contains another company's advertising banner, bank signage, and clearly
      identifiable members of the public. To use it, R&M needs permission for
      the location, consent from the people shown, and a crop that removes the
      other company's advertisement. It is deliberately not stored in this
      repository.

## 4. Deliberately absent

Nothing here is a bug — each was left out because it could not be verified.

- **No prices.** Fees are discussed after an enquiry, as instructed.
- **No government fees, requirements, processing times or approval claims.**
- **No response-time promise.** If R&M wants to commit to one, it can be added
  to `/online-assistance` and to the confirmation message.
- **No founding year, staff names, awards, certifications or partnerships.**
- **No client names or logos.**
- **No reviews or star ratings** in the structured data.
- Only the two supplied figures are used: **10+ years** and **1,000+ clients**.

## 5. Before you publish

- [ ] Set every environment variable in Vercel (see `.env.example`)
- [ ] Send a real test enquiry and confirm it arrives in the R&M inbox
- [ ] Open the WhatsApp button on a phone and confirm the number is right
- [ ] Verify the property in Google Search Console and submit the sitemap
- [ ] Claim the Google Business Profile and make the name, address and phone
      **exactly match** this website
