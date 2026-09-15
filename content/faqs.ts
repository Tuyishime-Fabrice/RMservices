/**
 * Site-wide FAQs (/faqs). Answers stay strictly within what the company
 * supplied: no fees, no processing times, no approval claims.
 */

export type FaqItem = { question: string; answer: string };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "about-rm",
    title: "About R&M Services Group Ltd",
    items: [
      {
        question: "What services does R&M provide?",
        answer:
          "R&M Services Group Ltd provides business, financial and administrative services in Rwanda: business registration, company amendments, investment certificate processing, tax advisory and compliance, accounting and bookkeeping, financial reporting consultancy, business support consultancy, conformity letter applications, immigration and resident permit assistance, and Irembo services.",
      },
      {
        question: "Where is R&M located?",
        answer:
          "We are based in Kigali, Rwanda, with two offices: RDB New Headquarters and KABC. Exact office details are listed on our Contact page.",
      },
      {
        question: "Is R&M a government agency?",
        answer:
          "No. R&M Services Group Ltd is a private professional services company. We prepare, guide and support applications on behalf of our clients. Decisions on any official application are made by the responsible Rwandan authority.",
      },
      {
        question: "How long has R&M been operating?",
        answer:
          "R&M Services Group Ltd has more than 10 years of experience and has served more than 1,000 clients.",
      },
    ],
  },
  {
    id: "working-with-us",
    title: "Working with us",
    items: [
      {
        question: "Can I contact R&M remotely?",
        answer:
          "Yes. We support clients both remotely and in person. You can submit a request through our online assistance form, call us, message us on WhatsApp, or send an email — whichever suits you.",
      },
      {
        question: "Can I visit the R&M office?",
        answer:
          "Yes, and many clients prefer to. You are welcome at either of our Kigali offices — RDB New Headquarters or KABC. If you would like to be sure someone is available for your specific request, call or message us first.",
      },
      {
        question: "Can I submit a service inquiry online?",
        answer:
          "Yes. Use the form on our Online Assistance page. Tell us what you need help with and how you prefer to be contacted, and our team will review your request and get back to you.",
      },
      {
        question: "How can I contact R&M urgently?",
        answer:
          "For urgent matters, WhatsApp or a phone call is the fastest route. You can also mark your online request as urgent, which shows you a direct WhatsApp option straight after submitting.",
      },
      {
        question: "What does it cost to work with R&M?",
        answer:
          "Fees depend on what you need, so we discuss them with you directly once we understand your request. We work transparently and there are no hidden fees. We do not publish price lists, because an honest figure depends on your specific situation.",
      },
      {
        question: "What languages do you work in?",
        answer:
          "[CONFIRM LANGUAGES OFFERED — e.g. English, Kinyarwanda, French]",
      },
    ],
  },
  {
    id: "international-clients",
    title: "Foreign investors, expatriates and diaspora",
    items: [
      {
        question: "Can foreign investors work with R&M?",
        answer:
          "Yes. We support foreign investors with company registration, investment certificate processing, tax and compliance, accounting, business advisory and administrative assistance — remotely or in person in Kigali.",
      },
      {
        question: "I live abroad. Can you help me start a business in Rwanda?",
        answer:
          "Yes. We regularly support members of the Rwandan diaspora and other clients based overseas. Our team is physically in Kigali and can follow up locally on your behalf.",
      },
      {
        question: "Can you help with visa and resident permit applications?",
        answer:
          "We provide application support for visas and resident permits, including through Irembo. This is professional application assistance, not legal or immigration advice, and outcomes are decided by the responsible authority.",
      },
    ],
  },
  {
    id: "specific-services",
    title: "Specific services",
    items: [
      {
        question: "How can I get help with business registration?",
        answer:
          "Visit our Business Registration page and click \"Request business registration assistance\". The inquiry form opens with the service already selected. You can also call or message us on WhatsApp.",
      },
      {
        question: "Does R&M provide accounting and bookkeeping?",
        answer:
          "Yes. We set up and maintain books, bring records that have fallen behind up to date, and provide regular summaries. Many clients combine this with our tax services.",
      },
      {
        question: "How do I request tax assistance?",
        answer:
          "Use the online assistance form and select \"Tax Advisory & Compliance\" as the service needed, or contact us by phone, WhatsApp or email. Tell us briefly what your business does and where you currently stand.",
      },
      {
        question: "Can you help me with an Irembo application?",
        answer:
          "Yes. We help individuals and businesses complete Irembo applications correctly, including applications related to visas and permits. You can come to our office and we will sit with you, or we can support you remotely.",
      },
      {
        question: "Do you guarantee that my application will be approved?",
        answer:
          "No, and no professional firm honestly can. We prepare applications carefully, support you through the process and keep you informed. The decision belongs to the responsible authority.",
      },
    ],
  },
];

export const allFaqItems: FaqItem[] = faqGroups.flatMap((g) => g.items);
