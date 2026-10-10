/**
 * Service catalogue — the single source of truth for:
 *  - the homepage service grid
 *  - /services (directory)
 *  - /services/[slug] (individual service pages)
 *  - the "Service needed" options in the inquiry form
 *
 * Service names and scope come from the supplied R&M flyer. Wording has been
 * rewritten for web readability but the meaning is unchanged. No government
 * fees, timelines, requirements or approval claims are stated anywhere,
 * because none were supplied.
 */

export type ServiceCategoryId =
  | "business-registration"
  | "tax-financial"
  | "business-support"
  | "administrative-immigration";

export type ServiceCategory = {
  id: ServiceCategoryId;
  name: string;
  description: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "business-registration",
    name: "Business & Registration",
    description:
      "Getting your company correctly registered and keeping its official details up to date.",
  },
  {
    id: "tax-financial",
    name: "Tax & Financial",
    description:
      "Day-to-day tax, accounting and financial reporting support for businesses of every size.",
  },
  {
    id: "business-support",
    name: "Business Support",
    description:
      "Practical guidance for owners and managers who need a professional second opinion.",
  },
  {
    id: "administrative-immigration",
    name: "Administrative & Immigration",
    description:
      "Application support for conformity letters, permits, visas and Irembo services.",
  },
];

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  /** URL slug under /services/ */
  slug: string;
  /** Short name used on cards and in navigation */
  name: string;
  /** Value stored in the inquiry form + emails */
  inquiryValue: string;
  category: ServiceCategoryId;
  /** lucide-react icon name, resolved in components/ui/service-icon.tsx */
  icon: string;
  /** One-line card description */
  summary: string;
  /** Page <title> */
  metaTitle: string;
  /** Page meta description */
  metaDescription: string;
  /** H1 on the service page */
  heading: string;
  /** Lead paragraph under the H1 */
  intro: string;
  /** Label on the page's primary CTA button */
  ctaLabel: string;
  /** "Service overview" body paragraphs */
  overview: string[];
  /** "Who this service is for" */
  audience: string[];
  /** "What R&M can help with" */
  helpWith: string[];
  /** "Why clients ask for support" */
  whyClientsAsk: string[];
  faqs: ServiceFaq[];
  /** Slugs of related services shown at the bottom of the page */
  related: string[];
  /** Search keywords used by the /services filter */
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "business-registration-rwanda",
    name: "Business Registration",
    inquiryValue: "Business Registration",
    category: "business-registration",
    icon: "building",
    summary:
      "Support with registering a new business or company in Rwanda, from choosing the right structure to completing the application.",
    metaTitle: "Business Registration in Rwanda | R&M Services Group",
    metaDescription:
      "Company and business registration support in Kigali, Rwanda for entrepreneurs, foreign investors and the diaspora. Remote or in person.",
    heading: "Business Registration in Rwanda",
    intro:
      "We help entrepreneurs, companies and investors register a business in Rwanda correctly the first time — remotely or in person at our Kigali offices.",
    ctaLabel: "Request business registration assistance",
    overview: [
      "Registering a business is the first formal step towards trading in Rwanda, and small mistakes at this stage can follow a company for years. R&M Services Group Ltd guides you through the process so your registration reflects what you actually intend to do, and so your company details are accurate from day one.",
      "We work with people who are starting their very first business as well as established groups opening a Rwandan entity. Whether you are already in Kigali or applying from abroad, our team explains each step in plain language and prepares the application with you.",
      "R&M Services Group Ltd is a private professional services company. We provide preparation, guidance and application support — the decision on any registration always rests with the responsible Rwandan authority.",
    ],
    audience: [
      "Local entrepreneurs registering a first business",
      "Small and medium businesses formalising an existing activity",
      "Foreign investors setting up a Rwandan entity",
      "Members of the Rwandan diaspora starting a business from abroad",
      "Companies that need someone in Kigali to handle the process on their behalf",
    ],
    helpWith: [
      "Understanding the business structures available and what each one means for you",
      "Preparing and reviewing your registration application before it is submitted",
      "Checking that company details, activities and shareholder information are consistent",
      "Guiding you through the online steps and what each request for information means",
      "Explaining what usually comes next after registration, such as tax registration",
      "Acting as your point of contact in Kigali while you are abroad",
    ],
    whyClientsAsk: [
      "They are not sure which structure fits their plans.",
      "They started the process online and got stuck.",
      "They are abroad and need someone on the ground in Kigali.",
      "They want the details correct now, rather than amended later.",
      "They would rather focus on the business than on paperwork.",
    ],
    faqs: [
      {
        question: "Can R&M help me if I am not in Rwanda?",
        answer:
          "Yes. We regularly support foreign investors and members of the Rwandan diaspora remotely. We can communicate by email, phone or WhatsApp, and our team is physically based in Kigali.",
      },
      {
        question: "Do you guarantee that my registration will be approved?",
        answer:
          "No, and you should be careful with anyone who does. R&M is a private professional services company. We prepare and support your application; the decision always belongs to the responsible Rwandan authority.",
      },
      {
        question: "How much does business registration support cost?",
        answer:
          "Fees depend on what you need, so we discuss them with you after we understand your request. We work transparently and there are no hidden fees.",
      },
      {
        question: "What happens after my business is registered?",
        answer:
          "Most businesses then think about tax registration, bookkeeping and ongoing compliance. We can support all of these, and we will tell you clearly what applies to your situation.",
      },
    ],
    related: ["company-amendments", "tax-advisory-compliance", "accounting-bookkeeping"],
    keywords: [
      "business registration Rwanda",
      "company registration Kigali",
      "register a company in Rwanda",
      "business registration Kigali",
    ],
  },
  {
    slug: "company-amendments",
    name: "Company Amendments",
    inquiryValue: "Company Amendments",
    category: "business-registration",
    icon: "file-pen",
    summary:
      "Assistance updating your registered company details when something about your business changes.",
    metaTitle: "Company Amendments in Rwanda | R&M Services Group",
    metaDescription:
      "Update your registered company details in Rwanda — directors, shareholders, address or activities. Amendment support from R&M in Kigali.",
    heading: "Company Amendments",
    intro:
      "When your company changes, its official record should change with it. We help you prepare and submit amendments accurately.",
    ctaLabel: "Request company amendment assistance",
    overview: [
      "Companies evolve. Shareholders join or leave, directors change, a business moves address, or the activities on record no longer match what the company really does. Keeping the official record aligned with reality matters, because banks, partners and authorities rely on it.",
      "R&M Services Group Ltd helps you identify exactly what needs to be amended, prepares the application, and supports you through the process so nothing is left half-updated.",
    ],
    audience: [
      "Companies with new or departing directors or shareholders",
      "Businesses that have moved office or changed contact details",
      "Companies whose registered activities no longer match their operations",
      "Owners who discovered an error in their registered information",
      "Groups restructuring a Rwandan entity from abroad",
    ],
    helpWith: [
      "Reviewing your current registered details against what has actually changed",
      "Advising which amendments are relevant to your situation",
      "Preparing the amendment application and supporting information",
      "Guiding you through each online step",
      "Explaining what the change may mean for your other obligations",
    ],
    whyClientsAsk: [
      "An error in the company record is blocking something, such as opening an account.",
      "Ownership or management has changed and the record is out of date.",
      "They are unsure which of several changes need to be declared.",
      "They want it handled correctly by someone who does it regularly.",
    ],
    faqs: [
      {
        question: "What kinds of changes count as an amendment?",
        answer:
          "Typically changes to registered information such as company details, address, activities, directors or shareholders. Tell us what has changed and we will explain what applies in your case.",
      },
      {
        question: "Can you handle an amendment while I am outside Rwanda?",
        answer:
          "Yes. We support clients remotely as well as in person at our Kigali offices.",
      },
      {
        question: "How do I start?",
        answer:
          "Send us a short description of what has changed through our online assistance form, or contact us by phone or WhatsApp. Our team will review it and come back to you.",
      },
    ],
    related: ["business-registration-rwanda", "business-support-consultancy", "tax-advisory-compliance"],
    keywords: [
      "company amendment Rwanda",
      "change company details Rwanda",
      "update company registration Kigali",
    ],
  },
  {
    slug: "investment-certificate-processing",
    name: "Investment Certificate Processing",
    inquiryValue: "Investment Certificate Processing",
    category: "business-registration",
    icon: "badge-check",
    summary:
      "Application support for investment registration and investment certificate processing in Rwanda.",
    metaTitle: "Investment Certificate Processing Rwanda | R&M Group",
    metaDescription:
      "Investment registration and certificate application support in Rwanda for foreign and local investors. Professional assistance from R&M, Kigali.",
    heading: "Investment Certificate Processing",
    intro:
      "Professional support for investors preparing an investment registration application in Rwanda.",
    ctaLabel: "Request investment certificate assistance",
    overview: [
      "Investors coming into Rwanda often want their investment formally registered. The application asks for a clear, consistent picture of the investment, and preparing that well takes time and local familiarity.",
      "R&M Services Group Ltd supports investors through the preparation and submission of investment registration applications, and stays reachable while the application is with the authorities.",
      "We do not approve applications and we do not speak for any authority. We prepare, guide and support — clearly and transparently.",
    ],
    audience: [
      "Foreign investors establishing or expanding in Rwanda",
      "Local companies registering an investment",
      "Diaspora investors coordinating from abroad",
      "Advisors and law firms who need a partner on the ground in Kigali",
    ],
    helpWith: [
      "Explaining what an investment registration application involves",
      "Helping you assemble and organise the information required",
      "Reviewing the application for consistency before submission",
      "Guiding you through each stage of the process",
      "Coordinating alongside your company registration and tax registration",
    ],
    whyClientsAsk: [
      "The investment is significant and they want the application handled professionally.",
      "They are coordinating from a different time zone.",
      "They want one team handling registration, tax and administrative steps together.",
    ],
    faqs: [
      {
        question: "Does R&M decide whether an investment certificate is issued?",
        answer:
          "No. R&M is a private professional services company. We prepare and support applications; decisions are made by the responsible Rwandan authority.",
      },
      {
        question: "Can you support us before we have registered a company?",
        answer:
          "Yes. Many investors speak to us at the planning stage. We can support company registration and investment registration together.",
      },
      {
        question: "We are a foreign team with no presence in Kigali. Can you still help?",
        answer:
          "Yes. We work with foreign investors remotely and can meet your representatives at our Kigali offices when they travel.",
      },
    ],
    related: ["business-registration-rwanda", "tax-advisory-compliance", "immigration-resident-permit-assistance"],
    keywords: [
      "investment certificate Rwanda",
      "investment registration Rwanda",
      "investment services Rwanda",
      "invest in Rwanda support",
    ],
  },
  {
    slug: "tax-advisory-compliance",
    name: "Tax Advisory & Compliance",
    inquiryValue: "Tax Advisory & Compliance",
    category: "tax-financial",
    icon: "receipt",
    summary:
      "Tax registration, declarations and ongoing compliance support so your business stays in good standing.",
    metaTitle: "Tax Advisory & Compliance in Rwanda | R&M Group",
    metaDescription:
      "Tax registration, declarations and compliance support for businesses in Rwanda. Practical, transparent tax services from R&M in Kigali.",
    heading: "Tax Advisory & Compliance Services",
    intro:
      "Tax registration, declarations and ongoing compliance support for businesses operating in Rwanda.",
    ctaLabel: "Request tax assistance",
    overview: [
      "Tax obligations are one of the most common reasons businesses contact us. Owners want to know what applies to them, when declarations are due, and how to stay in good standing without last-minute pressure.",
      "R&M Services Group Ltd provides tax registration support, help with declarations, and advisory support for businesses that want a clear view of their compliance position. We explain things in straightforward language, whether you run a small shop or a growing company.",
      "Our approach is professional, transparent and legitimate. We will tell you what your situation actually requires rather than selling you services you do not need.",
    ],
    audience: [
      "Newly registered businesses setting up tax registration",
      "Small and medium businesses handling regular declarations",
      "Established companies that want a compliance review",
      "Foreign-owned companies operating in Rwanda",
      "Businesses that have fallen behind and want to get back on track",
    ],
    helpWith: [
      "Tax registration for new and existing businesses",
      "Preparing and filing periodic tax declarations",
      "Reviewing your current compliance position",
      "Explaining which obligations apply to your type of business",
      "Ongoing advisory support as your business grows",
      "Working alongside your bookkeeping so declarations rest on clean records",
    ],
    whyClientsAsk: [
      "They are not certain which declarations apply to them.",
      "Deadlines keep arriving faster than their paperwork.",
      "They want a professional to review their compliance before a problem appears.",
      "They have fallen behind and want a clear way forward.",
    ],
    faqs: [
      {
        question: "Can you take over our monthly declarations?",
        answer:
          "Tell us about your business through the online assistance form and our team will discuss what ongoing support would look like for you.",
      },
      {
        question: "We are behind on our obligations. Will you still work with us?",
        answer:
          "Yes. Many clients come to us exactly at that point. We will look at your situation and explain the options clearly.",
      },
      {
        question: "Do you publish tax rates and deadlines on this website?",
        answer:
          "No. Tax rules change, and we would rather give you accurate guidance for your specific situation than publish figures that could go out of date.",
      },
      {
        question: "Can you support a foreign-owned company?",
        answer:
          "Yes. We support foreign investors and foreign-owned companies operating in Rwanda, remotely or in person.",
      },
    ],
    related: ["accounting-bookkeeping", "financial-reporting", "business-support-consultancy"],
    keywords: [
      "tax compliance Rwanda",
      "tax services Rwanda",
      "tax declaration Rwanda",
      "tax advisory Kigali",
    ],
  },
  {
    slug: "accounting-bookkeeping",
    name: "Accounting & Bookkeeping",
    inquiryValue: "Accounting & Bookkeeping",
    category: "tax-financial",
    icon: "calculator",
    summary:
      "Organised books and reliable records, so you always know where your business stands.",
    metaTitle: "Accounting & Bookkeeping in Kigali | R&M Group",
    metaDescription:
      "Accounting and bookkeeping for businesses in Kigali and across Rwanda. Keep clean, reliable records with R&M Services Group Ltd.",
    heading: "Accounting & Bookkeeping",
    intro:
      "Keep your records clean, current and ready — for your own decisions and for your compliance obligations.",
    ctaLabel: "Request accounting & bookkeeping assistance",
    overview: [
      "Good bookkeeping is not paperwork for its own sake. It is what tells you whether the business is actually making money, and it is what makes every other obligation — declarations, reporting, financing conversations — straightforward instead of stressful.",
      "R&M Services Group Ltd provides accounting and bookkeeping support for businesses in Rwanda, from small operations that need their records brought up to date to established companies that want consistent monthly handling.",
    ],
    audience: [
      "Small businesses without an in-house accountant",
      "Growing companies whose records have fallen behind",
      "Owners who want a clearer picture of their numbers",
      "Foreign-owned businesses that need local accounting support",
      "Businesses preparing for financing or a review",
    ],
    helpWith: [
      "Setting up and maintaining your books",
      "Recording and organising transactions consistently",
      "Bringing records that have fallen behind back up to date",
      "Preparing the underlying records used for tax declarations",
      "Providing regular summaries so you know where you stand",
      "Working alongside our tax and reporting services",
    ],
    whyClientsAsk: [
      "Records are scattered across notebooks, phones and spreadsheets.",
      "They only look at the numbers when a deadline forces them to.",
      "They want to hand bookkeeping to someone reliable and get their time back.",
      "A bank, partner or investor has asked for proper records.",
    ],
    faqs: [
      {
        question: "Our records are a mess. Can you still help?",
        answer:
          "Yes. Bringing records up to date is one of the most common requests we receive. Tell us roughly where things stand and we will take it from there.",
      },
      {
        question: "Do you work monthly, or one-off?",
        answer:
          "Both arrangements are possible. We will discuss what fits your business after we understand your situation.",
      },
      {
        question: "Can you handle bookkeeping and tax declarations together?",
        answer:
          "Yes. Many clients use both, because declarations are much simpler when the underlying records are clean.",
      },
    ],
    related: ["tax-advisory-compliance", "financial-reporting", "business-support-consultancy"],
    keywords: [
      "accounting services Kigali",
      "bookkeeping Rwanda",
      "accountant Kigali",
      "bookkeeping services Rwanda",
    ],
  },
  {
    slug: "financial-reporting",
    name: "Financial Reporting Consultancy",
    inquiryValue: "Financial Reporting",
    category: "tax-financial",
    icon: "line-chart",
    summary:
      "Consultancy support for preparing and understanding your company's financial reports.",
    metaTitle: "Financial Reporting Consultancy Rwanda | R&M Group",
    metaDescription:
      "Financial reporting consultancy in Rwanda. Prepare and understand your company's financial reports with support from R&M in Kigali.",
    heading: "Financial Reporting Consultancy",
    intro:
      "Turn your records into financial reports you can rely on — and actually understand.",
    ctaLabel: "Request financial reporting assistance",
    overview: [
      "At some point most businesses need to present their finances to someone else: a bank, an investor, a partner, a board, or an authority. Financial reports are also how owners themselves see whether the business is healthy.",
      "R&M Services Group Ltd provides financial reporting consultancy — supporting the preparation of your reports and, just as importantly, walking you through what the numbers mean for your decisions.",
    ],
    audience: [
      "Companies preparing periodic financial reports",
      "Businesses approaching a bank, investor or partner",
      "Owners who want to understand their own reports better",
      "Foreign-owned companies reporting to a parent company abroad",
      "Growing businesses putting proper reporting in place for the first time",
    ],
    helpWith: [
      "Consultancy support in preparing your financial reports",
      "Reviewing reports for consistency with your underlying records",
      "Explaining what your reports show in plain language",
      "Advising on reporting practices as your business grows",
      "Coordinating with your bookkeeping so reporting is not a yearly scramble",
    ],
    whyClientsAsk: [
      "A third party has asked for financial reports and they are not ready.",
      "The reports exist but nobody has explained them.",
      "They want reporting handled consistently rather than improvised.",
    ],
    faqs: [
      {
        question: "Do we need bookkeeping with you to use this service?",
        answer:
          "Not necessarily, though reporting is far smoother when the underlying records are clean. If they are not, we can help with that first.",
      },
      {
        question: "Will you explain the reports to us?",
        answer:
          "Yes. Clear communication is part of how we work. We would rather you understand your own numbers than simply receive a document.",
      },
    ],
    related: ["accounting-bookkeeping", "tax-advisory-compliance", "business-support-consultancy"],
    keywords: [
      "financial reporting Rwanda",
      "financial reports Kigali",
      "financial consultancy Rwanda",
    ],
  },
  {
    slug: "business-support-consultancy",
    name: "Business Support Consultancy",
    inquiryValue: "Business Support Consultancy",
    category: "business-support",
    icon: "compass",
    summary:
      "Practical business advisory support for owners and managers making decisions about their company.",
    metaTitle: "Business Support Consultancy Rwanda | R&M Group",
    metaDescription:
      "Business advisory and support consultancy for entrepreneurs and companies in Rwanda. Practical guidance from R&M in Kigali.",
    heading: "Business Support Consultancy",
    intro:
      "A professional second opinion for the decisions that matter — from people who work with Rwandan businesses every day.",
    ctaLabel: "Request business support assistance",
    overview: [
      "Running a business means making decisions with incomplete information. Should you formalise now or later? Is your current structure still right? What should you put in place before you grow?",
      "R&M Services Group Ltd provides business support consultancy: practical, grounded advisory support for owners and managers. We work with people who are starting out as well as established companies planning their next step.",
    ],
    audience: [
      "Entrepreneurs planning a new business",
      "Small and medium businesses preparing to grow",
      "Companies reviewing how they are set up",
      "Foreign investors who need local business context",
      "Owners who simply want an experienced, impartial view",
    ],
    helpWith: [
      "Discussing your plans and what they mean practically in Rwanda",
      "Reviewing how your business is currently set up",
      "Helping you understand which obligations apply as you grow",
      "Advising on the sequence of steps for what you want to do",
      "Coordinating the registration, tax or administrative support that follows",
    ],
    whyClientsAsk: [
      "They have a plan but want to test it with someone experienced.",
      "They are unsure what to do first.",
      "They want one team who understands the whole picture.",
    ],
    faqs: [
      {
        question: "What happens in a first conversation?",
        answer:
          "You tell us what you are trying to do and what is in your way. We ask questions, explain the relevant options, and agree the next steps together.",
      },
      {
        question: "Can we meet in person?",
        answer:
          "Yes. You are welcome at either of our Kigali offices, and we also work with clients by phone, WhatsApp and email.",
      },
    ],
    related: ["business-registration-rwanda", "tax-advisory-compliance", "financial-reporting"],
    keywords: [
      "business advisory Rwanda",
      "business support Rwanda",
      "business consultancy Kigali",
      "doing business in Rwanda",
    ],
  },
  {
    slug: "conformity-letter-applications",
    name: "Conformity Letter Applications",
    inquiryValue: "Conformity Letter Applications",
    category: "administrative-immigration",
    icon: "file-check",
    summary:
      "Application support for conformity letters, prepared carefully and followed through.",
    metaTitle: "Conformity Letter Applications Rwanda | R&M Group",
    metaDescription:
      "Assistance preparing and submitting conformity letter applications in Rwanda. Professional administrative support from R&M, Kigali.",
    heading: "Conformity Letter Applications",
    intro:
      "We help you prepare, submit and follow up conformity letter applications.",
    ctaLabel: "Request conformity letter assistance",
    overview: [
      "Administrative applications are unforgiving about detail. A small inconsistency can send an application back and cost weeks.",
      "R&M Services Group Ltd assists with conformity letter applications: helping you understand what is being asked for, preparing the application carefully, and supporting you through submission and follow-up.",
      "We provide application support only. We are not a government agency and we do not decide the outcome of any application.",
    ],
    audience: [
      "Individuals who have been asked to provide a conformity letter",
      "Companies handling an application on behalf of staff",
      "Expatriates and foreign nationals in Rwanda",
      "Applicants who prefer someone experienced to prepare the paperwork",
    ],
    helpWith: [
      "Explaining what the application involves in your situation",
      "Helping you gather and organise the information required",
      "Preparing and reviewing the application before submission",
      "Submitting the application and following up on its progress",
      "Keeping you informed at each stage",
    ],
    whyClientsAsk: [
      "An application was returned and they do not know why.",
      "They want it prepared correctly the first time.",
      "They are managing several administrative steps at once.",
    ],
    faqs: [
      {
        question: "Does R&M approve conformity letters?",
        answer:
          "No. R&M is a private professional services company that provides application support. The decision belongs to the responsible authority.",
      },
      {
        question: "Can you tell me exactly how long it will take?",
        answer:
          "We do not publish processing times, because they are not ours to promise. We will tell you what we know about your specific application and keep you updated.",
      },
    ],
    related: ["immigration-resident-permit-assistance", "irembo-services", "business-registration-rwanda"],
    keywords: [
      "conformity letter Rwanda",
      "conformity letter application Kigali",
      "administrative services Rwanda",
    ],
  },
  {
    slug: "immigration-resident-permit-assistance",
    name: "Immigration & Resident Permit Assistance",
    inquiryValue: "Immigration & Resident Permit Assistance",
    category: "administrative-immigration",
    icon: "plane",
    summary:
      "Assistance with visa and resident permit applications for expatriates, investors and their families.",
    metaTitle: "Resident Permit & Visa Assistance Rwanda | R&M",
    metaDescription:
      "Resident permit and visa application assistance in Rwanda for expatriates, investors and families. Professional support from R&M, Kigali.",
    heading: "Immigration & Resident Permit Assistance",
    intro:
      "Application support for expatriates, investors, employees and families dealing with visas and resident permits in Rwanda.",
    ctaLabel: "Request permit or visa assistance",
    overview: [
      "Moving to a new country involves administrative steps that are easy to underestimate — particularly when you are also setting up a business or starting a job.",
      "R&M Services Group Ltd assists with visa and resident permit applications: explaining what is being asked, helping you prepare the application, and supporting you through submission and follow-up.",
      "Please note that this is application support, not legal or immigration advice, and we cannot guarantee any outcome. Decisions are made by the responsible Rwandan authority.",
    ],
    audience: [
      "Expatriates living in or relocating to Rwanda",
      "Foreign investors and their families",
      "Companies supporting foreign employees",
      "Members of the diaspora handling family administrative matters",
    ],
    helpWith: [
      "Explaining which application matches your situation",
      "Helping you assemble and organise the required information",
      "Preparing and reviewing the application before submission",
      "Submitting the application and following up on progress",
      "Coordinating with your company registration or investment application",
    ],
    whyClientsAsk: [
      "They are handling a move and a business set-up at the same time.",
      "A previous application was returned.",
      "They want a local team who can follow up in person in Kigali.",
    ],
    faqs: [
      {
        question: "Do you give immigration legal advice?",
        answer:
          "No. We provide professional application support and guidance. We do not provide legal advice and we do not guarantee outcomes.",
      },
      {
        question: "Can you help my employees rather than me personally?",
        answer:
          "Yes. Companies often contact us on behalf of foreign employees. Tell us the situation and we will explain how we can support it.",
      },
      {
        question: "Can we start while I am still abroad?",
        answer:
          "Yes. We work with clients remotely and you can reach us by email, phone or WhatsApp.",
      },
    ],
    related: ["irembo-services", "conformity-letter-applications", "investment-certificate-processing"],
    keywords: [
      "resident permit assistance Rwanda",
      "visa assistance Rwanda",
      "immigration support Kigali",
      "work permit Rwanda assistance",
    ],
  },
  {
    slug: "irembo-services",
    name: "Irembo Services",
    inquiryValue: "Irembo Services",
    category: "administrative-immigration",
    icon: "monitor-smartphone",
    summary:
      "Help completing Irembo applications for visas, permits and other administrative services.",
    metaTitle: "Irembo Services in Kigali, Rwanda | R&M Group",
    metaDescription:
      "Irembo application assistance in Kigali, Rwanda — visas, permits and other administrative services. Practical help from R&M.",
    heading: "Irembo Services",
    intro:
      "Practical help completing Irembo applications correctly — in person at our Kigali offices, or with our support online.",
    ctaLabel: "Request Irembo assistance",
    overview: [
      "Many administrative services in Rwanda are requested online through Irembo. That is convenient once you know your way around it, and frustrating when you do not: a wrong selection or a missing detail can hold up an application.",
      "R&M Services Group Ltd helps individuals and businesses complete Irembo applications properly, including applications related to visas and permits. You can visit our Kigali offices and we will sit with you, or we can support you remotely.",
      "We help you use the service correctly. We are not Irembo and we are not a government agency.",
    ],
    audience: [
      "Individuals who need help with an online application",
      "Expatriates and foreign nationals in Rwanda",
      "Businesses handling applications for their staff",
      "Anyone who would rather have it done right the first time",
      "Members of the diaspora handling matters from abroad",
    ],
    helpWith: [
      "Identifying the correct application for what you need",
      "Completing the application accurately",
      "Checking your information before submission",
      "Following up on a submitted application",
      "Explaining next steps once the application has been made",
    ],
    whyClientsAsk: [
      "They are unsure which service to select.",
      "An earlier attempt did not go through.",
      "They would rather sit with someone who does this every day.",
      "They are abroad and need help from someone in Kigali.",
    ],
    faqs: [
      {
        question: "Is R&M part of Irembo or the government?",
        answer:
          "No. R&M Services Group Ltd is a private professional services company. We help clients use these services correctly; we do not operate them and we do not approve applications.",
      },
      {
        question: "Can I just come to your office?",
        answer:
          "Yes. You are welcome to visit us at RDB New Headquarters or KABC in Kigali. You can also call or message us on WhatsApp first.",
      },
      {
        question: "Can you help with visa and permit applications through Irembo?",
        answer:
          "Yes — this is one of the most common reasons clients come to us. See also our Immigration & Resident Permit Assistance service.",
      },
    ],
    related: ["immigration-resident-permit-assistance", "conformity-letter-applications", "business-registration-rwanda"],
    keywords: [
      "Irembo services Kigali",
      "Irembo assistance Rwanda",
      "Irembo application help",
      "Irembo visa application support",
    ],
  },
];

/**
 * The fields a card or filter actually renders.
 *
 * Client components take this shape as a prop and import only the *type* from
 * here, so the full catalogue — overviews, FAQs, SEO copy — stays on the
 * server instead of being bundled into the browser's JavaScript.
 */
export type ServiceSummary = Pick<
  Service,
  "slug" | "name" | "inquiryValue" | "category" | "icon" | "summary" | "keywords"
>;

export const serviceSummaries: ServiceSummary[] = services.map(
  ({ slug, name, inquiryValue, category, icon, summary, keywords }) => ({
    slug,
    name,
    inquiryValue,
    category,
    icon,
    summary,
    keywords,
  }),
);

/** Options shown in the "Service needed" select, in catalogue order plus "Other". */
export const serviceInquiryOptions: string[] = [
  ...services.map((s) => s.inquiryValue),
  "Other",
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesByCategory(categoryId: ServiceCategoryId): Service[] {
  return services.filter((s) => s.category === categoryId);
}

export function getCategory(id: ServiceCategoryId): ServiceCategory {
  return serviceCategories.find((c) => c.id === id)!;
}
