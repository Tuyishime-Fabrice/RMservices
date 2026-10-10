/**
 * Central company configuration.
 *
 * Everything here comes from information supplied by R&M Services Group Ltd
 * (company profile, company flyer and office photographs). Nothing on this
 * site invents company facts: where a detail has not been confirmed, the page
 * says something truthful and general rather than showing a guess.
 * Outstanding items are tracked in CONTENT-CHECKLIST.md.
 */

/**
 * Resolves the public origin used for canonical URLs, the sitemap, Open Graph
 * tags and structured data.
 *
 * Order matters: an explicit NEXT_PUBLIC_SITE_URL always wins, then the stable
 * production hostname Vercel injects, and only then the default. The point of
 * the middle step is that a deployment never canonicalises to a domain that
 * might not resolve yet — pointing search engines at a dead host is worse than
 * pointing them at the deployment that is actually serving the page.
 */
function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ];
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    const withScheme = /^https?:\/\//.test(value) ? value : `https://${value}`;
    return withScheme.replace(/\/+$/, "");
  }
  return "https://r-mservices.vercel.app";
}

export const siteConfig = {
  legalName: "R&M Services Group Ltd",
  shortName: "R&M Services Group",
  initials: "R&M",
  positioning: "Your Trusted Business & Compliance Partner in Rwanda",
  tagline: "Helping Businesses Start, Grow & Stay Compliant",
  description:
    "R&M Services Group Ltd provides business registration, tax compliance, accounting, investment, permit and Irembo services in Kigali, Rwanda, for local entrepreneurs, companies, foreign investors, expatriates and the Rwandan diaspora.",
  /** The company's own description of itself, from its service brochure. */
  brochureSummary:
    "R&M Services Group Ltd provides reliable, efficient, and professional business support services in Rwanda. We simplify registration, compliance, investment, accounting, and immigration processes for businesses and individuals.",
  longDescription:
    "R&M Group is a trusted provider of business, financial and administrative services in Kigali, Rwanda, supporting local entrepreneurs, foreign investors, expatriates and the Rwandan diaspora. With 10+ years of experience and 1,000+ clients served, we provide company and business registration, investment registration, tax registration and declarations, tax compliance, accounting and bookkeeping, business advisory, and Irembo services for visas and permits. We offer professional, transparent and legitimate support both remotely and in person, with clear communication and no hidden fees. Whether you are starting, managing or expanding a business in Rwanda, R&M Group is your trusted partner.",
  city: "Kigali",
  country: "Rwanda",
  countryCode: "RW",
  url: resolveSiteUrl(),
  locale: "en_RW",
} as const;

/** Contact details as published on the company's own service brochure. */
export const contact = {
  phonePrimaryDisplay: "+250 784 488 898",
  phonePrimaryHref: "+250784488898",
  phoneSecondaryDisplay: "0780 555 131",
  phoneSecondaryHref: "+250780555131",
  email: "irembordb@gmail.com",
  /** International format, digits only — overridable per deployment. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "250784488898").replace(/[^\d]/g, ""),
  whatsappDisplay: "+250 784 488 898",
} as const;

export type Office = {
  id: string;
  name: string;
  locality: string;
  note: string;
};

/**
 * Office locations. Only what the company has confirmed is published: the two
 * office names and the city. No street address or map pin is shown, because an
 * unverified address would mislead visitors and damage local search results.
 */
export const offices: Office[] = [
  {
    id: "rdb-hq",
    name: "RDB New Headquarters",
    locality: "Kigali, Rwanda",
    note: "Meet our team in person for business registration, investment and Irembo-related support.",
  },
  {
    id: "kabc",
    name: "KABC",
    locality: "Kigali, Rwanda",
    note: "Our second Kigali office, for tax, accounting and business support clients.",
  },
];

/** Shown wherever a visitor might plan a trip to one of the offices. */
export const visitNote =
  "Call or message us before you visit and we will make sure the right person is available for you.";

/**
 * Photographs supplied by R&M. Dimensions are recorded so every image reserves
 * its space and nothing shifts while the page loads.
 */
export const photos = {
  officeEntrance: {
    src: "/photos/rm-office-entrance-kigali.webp",
    width: 1600,
    height: 929,
    alt: "The entrance to R&M Services Group Ltd in Kigali, with the company's roll-up banner listing its services standing beside the open doorway.",
  },
  team: {
    src: "/photos/rm-team-at-work.webp",
    width: 752,
    height: 572,
    alt: "Two members of the R&M Services Group team working at their desks with laptops and client files.",
  },
  brochure: {
    src: "/photos/rm-services-brochure.webp",
    width: 680,
    height: 1020,
    alt: "R&M Services Group Ltd service brochure, listing business registration, company amendments, tax advisory and compliance services, accounting and bookkeeping, financial reporting consultancy, investment certificate processing, conformity letter applications, business support consultancy, immigration and resident permit assistance, and Irembo services, with the company's phone numbers and email address.",
  },
} as const;

/** Social profiles. Nothing is published until a profile has been confirmed. */
export const socialLinks: { label: string; href: string }[] = [];

/** Figures supplied by the company. Do not change without the company's word. */
export const trustStats = [
  { value: "10+", label: "Years of experience", detail: "Supporting businesses in Rwanda" },
  { value: "1,000+", label: "Clients served", detail: "Entrepreneurs, companies and individuals" },
  { value: "2", label: "Kigali offices", detail: "RDB New Headquarters and KABC" },
  { value: "Remote & in person", label: "Ways to work with us", detail: "Online, by phone, or at our offices" },
] as const;

export const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
