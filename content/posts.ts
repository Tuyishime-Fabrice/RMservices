/**
 * Resources / blog content.
 *
 * Deliberate editorial rule: these articles explain *concepts and questions*
 * business owners ask us. They do NOT state government fees, requirements,
 * processing times or procedures, because none were supplied and unverified
 * procedure would be worse than no procedure. Each article ends by pointing
 * the reader to a relevant R&M service.
 */

export type PostCategory =
  | "Business Registration"
  | "Tax & Compliance"
  | "Accounting"
  | "Business Advisory"
  | "Investors & Expatriates"
  | "Administrative Services"
  | "Rwanda Business Guides";

export const postCategories: PostCategory[] = [
  "Business Registration",
  "Tax & Compliance",
  "Accounting",
  "Business Advisory",
  "Investors & Expatriates",
  "Administrative Services",
  "Rwanda Business Guides",
];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: PostCategory;
  /** ISO date. [CONFIRM] — update when the article is reviewed for publication. */
  date: string;
  author: string;
  /** Tone/subject for the generated cover artwork (no fake photography). */
  cover: "registration" | "tax" | "accounting" | "advisory" | "investors" | "admin";
  /** Slugs from content/services.ts */
  relatedServices: string[];
  body: Block[];
};

const AUTHOR = "R&M Services Group Ltd";

export const posts: Post[] = [
  {
    slug: "how-to-register-a-company-in-rwanda",
    title: "How to Register a Company in Rwanda: What to Think About First",
    metaTitle: "How to Register a Company in Rwanda | R&M Group",
    metaDescription:
      "A plain-language guide to the decisions that come before registering a company in Rwanda: structure, activities, ownership and what follows.",
    excerpt:
      "Before you fill in a single form, there are four decisions worth getting right. Here is how we talk them through with clients in Kigali.",
    category: "Business Registration",
    date: "2026-01-14",
    author: AUTHOR,
    cover: "registration",
    relatedServices: ["business-registration-rwanda", "company-amendments", "tax-advisory-compliance"],
    body: [
      { type: "p", text: "Most people who contact us about registering a business in Rwanda expect the hard part to be the paperwork. In our experience it usually is not. The hard part is the handful of decisions made before the application is even started, because those decisions are what the application is really asking about." },
      { type: "p", text: "Here is how we work through it with clients, whether they are sitting with us at our Kigali office or joining a call from abroad." },
      { type: "h2", text: "1. Decide what the business will actually do" },
      { type: "p", text: "This sounds obvious, and it is where most confusion starts. \"I want to do import and export, and maybe consulting, and later a shop\" is a plan, not a business description. Your registration records the activities of the company, and those details matter later — to banks, to partners, and to your own compliance obligations." },
      { type: "p", text: "We ask clients to separate what they are starting with from what they hope to add later. Both can be accommodated; they just need to be stated deliberately rather than accidentally." },
      { type: "h2", text: "2. Choose the structure that matches your plans" },
      { type: "p", text: "Different structures suit different intentions. A single owner testing an idea, two partners splitting ownership, and a foreign company opening a Rwandan entity are three genuinely different situations, and the right answer for one is often a poor fit for the others." },
      { type: "p", text: "Rather than publish a comparison table that may not fit your case, we prefer to ask about your plans and explain what each option would mean for you specifically." },
      { type: "h2", text: "3. Get ownership and management details right the first time" },
      { type: "p", text: "Shareholders, directors, identification details, contact information: these need to be accurate and consistent. Inconsistencies are one of the most common reasons an application stalls, and correcting them afterwards means an amendment." },
      { type: "callout", title: "A note from experience", text: "We see a steady stream of clients who come to us not to register a business, but to amend one that was registered in a hurry. Amendments are entirely normal, but they are avoidable time and cost when the details were simply rushed at the start." },
      { type: "h2", text: "4. Know what comes after registration" },
      { type: "p", text: "Registration is a milestone, not the finish line. Once a business exists formally, its obligations begin: tax registration, declarations on a regular cycle, keeping records that can support those declarations." },
      { type: "p", text: "The businesses that find compliance stressful are usually the ones that treated registration as the end. The ones that find it manageable set up their bookkeeping early, so that every later obligation draws on records that already exist." },
      { type: "h2", text: "If you are registering from outside Rwanda" },
      { type: "p", text: "Foreign investors and members of the diaspora register businesses in Rwanda regularly. The main practical difference is coordination: you need someone on the ground who can follow up, and clear communication across time zones." },
      { type: "p", text: "That is a large part of what we do. Our team is in Kigali, and we work with clients by email, phone and WhatsApp." },
      { type: "h2", text: "How R&M can help" },
      { type: "p", text: "We support business registration end to end: talking through the decisions above, preparing and reviewing the application, guiding you through each step, and explaining what follows. R&M Services Group Ltd is a private professional services company — we prepare and support applications, and the decision always belongs to the responsible Rwandan authority." },
    ],
  },
  {
    slug: "understanding-tax-compliance-in-rwanda",
    title: "Understanding Tax Compliance in Rwanda: A Business Owner's Orientation",
    metaTitle: "Understanding Tax Compliance in Rwanda | R&M",
    metaDescription:
      "What tax compliance means in practice in Rwanda, why businesses fall behind, and how to build a routine that keeps you in good standing.",
    excerpt:
      "Compliance is less about knowing every rule and more about having a routine. Here is how we help clients build one.",
    category: "Tax & Compliance",
    date: "2026-01-28",
    author: AUTHOR,
    cover: "tax",
    relatedServices: ["tax-advisory-compliance", "accounting-bookkeeping", "financial-reporting"],
    body: [
      { type: "p", text: "Ask ten business owners in Kigali what tax compliance means and you will get ten answers, most of them variations of \"paying what I owe on time\". That is part of it. In practice, compliance is a routine — a repeating cycle of recording, preparing, declaring and keeping evidence." },
      { type: "p", text: "This article explains that cycle in general terms. It deliberately does not state rates, deadlines or thresholds: those are set by the authorities and they change. What we can tell you is how businesses that stay compliant actually operate." },
      { type: "h2", text: "Compliance starts with registration, not with the deadline" },
      { type: "p", text: "A business becomes visible to the tax system when it registers. From that point its obligations are defined by what it is and what it does — not by how busy the owner is or whether the business has started earning yet." },
      { type: "p", text: "The first question we ask a new client is simply: what are you registered for? Surprisingly often, nobody has ever explained it to them." },
      { type: "h2", text: "The cycle that keeps businesses in good standing" },
      { type: "ul", items: [
        "Record transactions as they happen, not at the end of the period.",
        "Keep the supporting documents with the record, so nothing must be reconstructed later.",
        "Prepare the declaration from those records rather than from memory.",
        "Declare on the required cycle, every cycle, including quiet periods.",
        "Keep a file of what was declared and when.",
      ] },
      { type: "p", text: "Nothing in that list is complicated. What makes it hard is that it is continuous, and continuous tasks are the first to slip when a business is busy." },
      { type: "h2", text: "Why businesses fall behind" },
      { type: "p", text: "In our experience it is rarely deliberate. The common patterns are familiar: records kept in a notebook and a phone gallery; the only person who understood the system left; a quiet period where nothing was declared because nothing was earned; or growth that outpaced the informal habits that worked when the business was small." },
      { type: "callout", title: "Falling behind is fixable", text: "If your declarations are not up to date, that is a situation to address rather than avoid. Many of our clients come to us at exactly that point, and the conversation is a practical one about the way forward — not a lecture." },
      { type: "h2", text: "Compliance and bookkeeping are the same problem" },
      { type: "p", text: "Businesses that treat bookkeeping as a chore find every declaration painful, because each one starts with reconstructing what happened. Businesses that keep clean books find declarations almost mechanical." },
      { type: "p", text: "That is why we usually discuss tax and bookkeeping together. Fixing the records fixes most of the compliance stress." },
      { type: "h2", text: "What to ask a tax advisor" },
      { type: "ul", items: [
        "Which obligations apply specifically to my business, and why?",
        "What will you need from me each cycle, and by when?",
        "What is my current position — am I actually up to date?",
        "What will this cost, in total, with nothing hidden?",
      ] },
      { type: "h2", text: "How R&M can help" },
      { type: "p", text: "We provide tax registration support, help with declarations, and advisory support for businesses that want to understand and improve their compliance position. We explain what applies to your business rather than selling you services you do not need." },
    ],
  },
  {
    slug: "why-bookkeeping-matters-for-your-business",
    title: "Why Bookkeeping Matters More Than Most Owners Think",
    metaTitle: "Why Bookkeeping Matters for Businesses | R&M",
    metaDescription:
      "What clean records actually give a business in Rwanda, what disorganised records cost, and when to bring in bookkeeping help.",
    excerpt:
      "Clean books are not about satisfying someone else. They are how you find out whether your business is actually working.",
    category: "Accounting",
    date: "2026-02-11",
    author: AUTHOR,
    cover: "accounting",
    relatedServices: ["accounting-bookkeeping", "financial-reporting", "tax-advisory-compliance"],
    body: [
      { type: "p", text: "Bookkeeping has an image problem. It is widely treated as an administrative burden — something done because someone else demands it. That framing is why so many businesses do it badly, and why so many owners are genuinely unsure whether their business is profitable." },
      { type: "h2", text: "What clean records actually give you" },
      { type: "ul", items: [
        "An honest answer to whether you are making money, and where.",
        "Declarations prepared from evidence instead of memory.",
        "Credibility when a bank, investor or partner asks to see your numbers.",
        "Early warning when costs are drifting, while you can still act.",
        "Continuity when a staff member leaves and takes knowledge with them.",
      ] },
      { type: "h2", text: "What disorganised records cost" },
      { type: "p", text: "The cost is rarely a single dramatic event. It accumulates: time reconstructing the past, decisions made on instinct because the data is not there, opportunities lost because reports could not be produced when someone asked." },
      { type: "p", text: "Owners often discover the cost at the worst moment — when a financing conversation or a review requires records they cannot produce quickly." },
      { type: "h2", text: "What good bookkeeping looks like in a small business" },
      { type: "p", text: "It does not require expensive software or a finance department. It requires consistency: every transaction recorded, supporting documents kept with the record, income and expenses separated clearly, business money kept separate from personal money, and a regular look at the summary." },
      { type: "callout", title: "The most common fix we make", text: "Separating business and personal transactions. It is the single change that makes the biggest immediate difference to how understandable a small business's records are." },
      { type: "h2", text: "When to bring in help" },
      { type: "p", text: "There is no universal threshold, but there are reliable signals: you avoid looking at the numbers; you cannot say what last month's profit was; deadlines create panic; or recording transactions has started eating the time you should be spending on customers." },
      { type: "h2", text: "How R&M can help" },
      { type: "p", text: "We set up and maintain books, bring records that have fallen behind back up to date, and provide regular summaries so you know where you stand. Many clients combine this with our tax services, because declarations are far simpler when the underlying records are clean." },
    ],
  },
  {
    slug: "doing-business-in-rwanda",
    title: "Doing Business in Rwanda: An Orientation for Newcomers",
    metaTitle: "Doing Business in Rwanda: An Orientation | R&M",
    metaDescription:
      "A practical orientation for entrepreneurs, foreign investors and diaspora members starting or expanding a business in Rwanda.",
    excerpt:
      "What newcomers ask us most often, and the practical realities worth understanding before you commit.",
    category: "Rwanda Business Guides",
    date: "2026-02-25",
    author: AUTHOR,
    cover: "advisory",
    relatedServices: ["business-support-consultancy", "business-registration-rwanda", "investment-certificate-processing"],
    body: [
      { type: "p", text: "People arrive at business in Rwanda from very different starting points. Some have lived in Kigali all their lives. Some are visiting for the second time with capital ready to deploy. Some grew up abroad in Rwandan families and are building something in a country they know personally but not administratively." },
      { type: "p", text: "The questions they ask us, though, are remarkably similar." },
      { type: "h2", text: "\"What do I need to do first?\"" },
      { type: "p", text: "Before registering anything, get clear on what the business will do, who will own it, and who will be responsible for it day to day. Those answers shape the registration, the tax position and, for foreign nationals, the administrative steps that follow." },
      { type: "p", text: "Formalising early is usually easier than formalising later, because a registered business can open accounts, sign contracts and invoice properly." },
      { type: "h2", text: "\"Can I do this remotely?\"" },
      { type: "p", text: "A great deal can be handled remotely. What you cannot outsource remotely is judgement about your own business, and what you do need locally is someone who can follow up in person when something requires it." },
      { type: "p", text: "That combination — you making the decisions, a local team handling the follow-through — is how most of our overseas clients work." },
      { type: "h2", text: "\"How much will it cost?\"" },
      { type: "p", text: "There are two separate questions inside that one: official costs, which are not ours to set or to quote, and professional fees, which we discuss with you directly once we understand your request. We do not publish price lists because the honest answer depends on what you actually need." },
      { type: "callout", title: "Be cautious of guarantees", text: "If anyone promises you a specific outcome, an approval, or a fixed timeline for a government decision, treat it as a warning sign. Professional support means careful preparation and honest communication — not promises nobody is in a position to make." },
      { type: "h2", text: "\"What tends to go wrong?\"" },
      { type: "ul", items: [
        "Registering in a hurry, then paying for amendments later.",
        "Treating registration as the end of obligations rather than the beginning.",
        "Leaving bookkeeping until a deadline forces the issue.",
        "Handling administrative applications piecemeal instead of in a sensible order.",
        "Assuming that what worked in another country applies unchanged here.",
      ] },
      { type: "h2", text: "\"Who do I talk to?\"" },
      { type: "p", text: "Look for a company with a real physical presence, that explains things in language you understand, that is clear about fees, and that tells you when something is outside its control." },
      { type: "h2", text: "How R&M can help" },
      { type: "p", text: "R&M Services Group Ltd has supported businesses in Rwanda for over 10 years and has served more than 1,000 clients. We have two offices in Kigali — RDB New Headquarters and KABC — and we work with clients remotely and in person." },
    ],
  },
  {
    slug: "business-support-for-foreign-investors",
    title: "Business Support for Foreign Investors in Rwanda",
    metaTitle: "Business Support for Foreign Investors | R&M",
    metaDescription:
      "How foreign investors set up and run a business in Rwanda with local support: registration, investment, tax, accounting and permits.",
    excerpt:
      "Investing from abroad is mostly a coordination problem. Here is how to structure the support side of it.",
    category: "Investors & Expatriates",
    date: "2026-03-10",
    author: AUTHOR,
    cover: "investors",
    relatedServices: ["investment-certificate-processing", "business-registration-rwanda", "immigration-resident-permit-assistance"],
    body: [
      { type: "p", text: "Foreign investors rarely struggle with the strategic side of entering Rwanda. They have assessed the market and made their decision. What consumes time is everything underneath: the entity, the registrations, the permits for the people who will run it, and the ongoing obligations once it is live." },
      { type: "h2", text: "Sequence matters more than speed" },
      { type: "p", text: "Investors often try to run every step in parallel and find that steps depend on each other. Registration, investment registration, tax registration and the administrative steps for staff sit in a sensible order, and knowing that order saves weeks." },
      { type: "p", text: "The first thing we do with an investor client is map that sequence for their specific situation." },
      { type: "h2", text: "Decide who is responsible on the ground" },
      { type: "p", text: "Someone must be reachable in Kigali, able to follow up, and accountable for the administrative side. That may be an employee you are relocating, a local partner, or a professional services firm acting on your instructions." },
      { type: "p", text: "What does not work is leaving it unassigned, which is how applications quietly stall." },
      { type: "h2", text: "Plan the people alongside the entity" },
      { type: "p", text: "If foreign staff or family members will be based in Rwanda, their permits and administrative steps deserve the same planning as the company itself. Treating them as an afterthought is a common source of delay." },
      { type: "callout", title: "A word on expectations", text: "No professional firm can guarantee a government decision or a timeline. What a good firm can do is prepare applications carefully, follow up diligently, and keep you honestly informed — including when the news is that nothing has moved yet." },
      { type: "h2", text: "Build the compliance routine before you need it" },
      { type: "p", text: "Once the entity exists, its obligations run on a cycle regardless of whether operations have started. Investors who set up bookkeeping and tax handling at the beginning avoid a scramble later, and they have reliable numbers to report to their own boards or partners abroad." },
      { type: "h2", text: "How R&M can help" },
      { type: "p", text: "We support foreign investors with company registration, investment certificate processing, tax and compliance, accounting and bookkeeping, business advisory, and administrative and permit assistance — remotely and in person from our Kigali offices. See our Investors & Expatriates page for an overview." },
    ],
  },
  {
    slug: "how-businesses-can-stay-compliant-in-rwanda",
    title: "How Businesses Can Stay Compliant in Rwanda Without the Last-Minute Panic",
    metaTitle: "How to Stay Compliant in Rwanda | R&M Group",
    metaDescription:
      "Practical habits that keep a business in Rwanda compliant: record keeping, a declaration routine, current company details and timely support.",
    excerpt:
      "Compliance failures are usually habit failures. Five habits that keep businesses out of trouble.",
    category: "Tax & Compliance",
    date: "2026-03-24",
    author: AUTHOR,
    cover: "tax",
    relatedServices: ["tax-advisory-compliance", "company-amendments", "accounting-bookkeeping"],
    body: [
      { type: "p", text: "Compliance problems almost never begin with a decision to ignore an obligation. They begin with a busy month, a missing receipt, a change nobody declared, and a habit that quietly stopped." },
      { type: "p", text: "Here are five habits we consistently see in businesses that stay in good standing." },
      { type: "h2", text: "1. Record as you go" },
      { type: "p", text: "Recording transactions weekly takes minutes. Reconstructing three months takes days, and the result is less accurate. This single habit prevents most compliance stress." },
      { type: "h2", text: "2. Treat the declaration cycle as fixed" },
      { type: "p", text: "Put the cycle in a calendar and treat it like a customer commitment. Quiet periods still have obligations; a business with no activity is not a business with no responsibilities." },
      { type: "h2", text: "3. Keep your registered details current" },
      { type: "p", text: "New director, new address, changed activities, changed ownership — if the official record no longer matches reality, that gap will eventually surface somewhere inconvenient. Amendments exist for exactly this." },
      { type: "h2", text: "4. Keep one file that tells your story" },
      { type: "p", text: "Registration documents, tax registration details, declarations made, correspondence. One organised place, kept current, accessible to more than one person in the business." },
      { type: "callout", title: "Continuity risk", text: "If only one person knows where everything is and how it works, the business has a real risk it has not priced. Organised, shared records are also a continuity plan." },
      { type: "h2", text: "5. Ask early rather than late" },
      { type: "p", text: "The cheapest professional conversation is the one that happens before a problem is established. A short review of where you actually stand is far less work than an emergency clean-up." },
      { type: "h2", text: "How R&M can help" },
      { type: "p", text: "We support businesses with tax registration, declarations and compliance review, bookkeeping and accounting, and company amendments when your details change. If you are not sure where you stand, that is a good reason to talk to us — not a reason to wait." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Simple, honest reading-time estimate from the article body. */
export function readingTime(post: Post): number {
  const words = post.body.reduce((total, block) => {
    if (block.type === "ul") return total + block.items.join(" ").split(/\s+/).length;
    if (block.type === "callout") return total + (block.title + " " + block.text).split(/\s+/).length;
    return total + block.text.split(/\s+/).length;
  }, 0);
  return Math.max(2, Math.round(words / 200));
}

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
