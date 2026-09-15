/**
 * Central company configuration.
 *
 * Everything here is taken from information supplied by R&M Services Group Ltd
 * (company profile + company flyer). Nothing on this site invents company
 * facts. Where a detail has not been confirmed yet it is written as an obvious
 * `[CONFIRM ...]` placeholder — see CONTENT-CHECKLIST.md.
 */

export const siteConfig = {
  legalName: "R&M Services Group Ltd",
  shortName: "R&M Services Group",
  initials: "R&M",
  positioning: "Your Trusted Business & Compliance Partner in Rwanda",
  tagline: "Helping Businesses Start, Grow & Stay Compliant",
  description:
    "R&M Services Group Ltd is a trusted provider of business, financial and administrative services in Kigali, Rwanda, supporting local entrepreneurs, foreign investors, expatriates and the Rwandan diaspora.",
  longDescription:
    "R&M Group is a trusted provider of business, financial and administrative services in Kigali, Rwanda, supporting local entrepreneurs, foreign investors, expatriates and the Rwandan diaspora. With 10+ years of experience and 1,000+ clients served, we provide company and business registration, investment registration, tax registration and declarations, tax compliance, accounting and bookkeeping, business advisory, and Irembo services for visas and permits. We offer professional, transparent and legitimate support both remotely and in person, with clear communication and no hidden fees. Whether you are starting, managing or expanding a business in Rwanda, R&M Group is your trusted partner.",
  city: "Kigali",
  country: "Rwanda",
  countryCode: "RW",
  /** Public site URL. Override with NEXT_PUBLIC_SITE_URL in the environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rmservicesgroup.rw").replace(/\/$/, ""),
  locale: "en_RW",
} as const;

/**
 * Contact details as printed on the supplied company flyer.
 * [CONFIRM] — verify each of these with R&M before launch.
 */
export const contact = {
  phonePrimaryDisplay: "+250 784 488 898",
  phonePrimaryHref: "+250784488898",
  phoneSecondaryDisplay: "0780 555 131",
  phoneSecondaryHref: "+250780555131",
  email: "irembordbd@gmail.com",
  /**
   * WhatsApp number in international format without "+" or spaces.
   * Defaults to the primary flyer number — [CONFIRM OFFICIAL WHATSAPP NUMBER].
   */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "250784488898").replace(/[^\d]/g, ""),
  whatsappDisplay: "+250 784 488 898",
  /** [CONFIRM OFFICIAL OPENING HOURS] */
  openingHours: "[CONFIRM OFFICE OPENING HOURS]",
} as const;

export type Office = {
  id: string;
  name: string;
  addressPlaceholder: string;
  note: string;
  /** Google Maps link — [CONFIRM] before launch. */
  mapsUrl?: string;
};

export const offices: Office[] = [
  {
    id: "rdb-hq",
    name: "RDB New Headquarters",
    addressPlaceholder: "[CONFIRM RDB OFFICE ADDRESS — building, floor, office number]",
    note: "Meet our team in person for business registration, investment and Irembo-related support.",
  },
  {
    id: "kabc",
    name: "KABC",
    addressPlaceholder: "[CONFIRM KABC ADDRESS — building, floor, office number]",
    note: "Our second Kigali office for tax, accounting and business support clients.",
  },
];

/** Social profiles — [ADD OFFICIAL SOCIAL MEDIA LINKS] before launch. */
export const socialLinks: { label: string; href: string }[] = [];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Online Assistance", href: "/online-assistance" },
  { label: "Investors & Expatriates", href: "/investors-expatriates" },
  { label: "Resources", href: "/resources" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
] as const;

/** Figures supplied by the company. Do not change without the company's word. */
export const trustStats = [
  { value: "10+", label: "Years of experience", detail: "Supporting businesses in Rwanda" },
  { value: "1,000+", label: "Clients served", detail: "Entrepreneurs, companies and individuals" },
  { value: "2", label: "Kigali offices", detail: "RDB New Headquarters and KABC" },
  { value: "Remote & in person", label: "Ways to work with us", detail: "Online, by phone, or at our offices" },
] as const;

export const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
