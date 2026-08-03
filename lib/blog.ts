import type { BlogCover } from "@/lib/content";

/**
 * Blog posts — single source of truth for the /blog index and post pages.
 * Body is a small block model (no MDX/markdown dependency); inline `code`
 * spans inside paragraphs and list items are rendered from backticks.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string; lang?: string }
  | { type: "quote"; text: string };

export interface BlogPost {
  slug: string;
  topic: string;
  title: string;
  /** Meta description + card/intro line. Keep ~150–160 chars. */
  description: string;
  /** ISO date, e.g. "2026-07-25". */
  date: string;
  /** Geometric fallback art, used whenever `coverImage` is absent. */
  cover: BlogCover;
  /** Photo thumbnail. Takes precedence over `cover` when set. */
  coverImage?: { src: string; alt: string };
  keywords: string[];
  published: boolean;
  body: Block[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-idea-graveyard",
    topic: "Building",
    title: "The Idea Graveyard: On Building, Burning Out, and Coming Back",
    description:
      "The hardest part of building isn't the building. It's the ideation spiral, the comparison, and knowing when to close the laptop and come back.",
    date: "2026-08-03",
    cover: "career",
    coverImage: {
      src: "/blog/walking-away-treelined-path.jpg",
      alt: "A person walking alone down a sunlit, tree-lined path",
    },
    keywords: [
      "indie hacking",
      "founder burnout",
      "building in public",
      "solo founder",
      "idea validation",
      "AI and software",
    ],
    published: true,
    body: [
      {
        type: "p",
        text: "Lately the hardest part of building isn't the building. It's figuring out what to build.",
      },
      {
        type: "p",
        text: "I'll sit down ready to start something new, and within minutes I hit the same wall. Every idea I come up with feels like it's already being built somewhere else, faster and better, with AI doing the heavy lifting. What used to take a small team months now gets spun up by one person over a weekend. So the question stopped being \"is this a good idea?\" It became \"will this even matter by the time I ship it?\"",
      },
      {
        type: "p",
        text: "That question spirals fast. I get stuck in a loop of what if, what could've, what should've, replaying decisions I haven't even made yet. Should I have picked a different niche? Should I pivot before I've started? It's exhausting, living three steps ahead of a project that doesn't exist.",
      },
      {
        type: "p",
        text: "Then there's distribution. Even if I build something solid, I know other people will get it in front of more eyes than I ever will. Bigger audiences, more resources, more experience. So part of me wonders whether building is worth it at all when the odds are stacked before I start.",
      },
      {
        type: "p",
        text: "I've thought about building in public as a way around that. Let people follow the journey, grow an audience alongside the product. But it comes with its own baggage: half-baked ideas out too early, the pressure to perform progress instead of actually making any, and the chance that someone takes the idea and ships it faster than I can.",
      },
      {
        type: "p",
        text: "By the time I've cycled through all of it, I'm just tired. The ideation, the doubt, the comparison, the endless should-I-build-in-public. Not tired of building. Tired of thinking about building.",
      },
      {
        type: "p",
        text: "That's usually the sign it's time to stop. Close the laptop, touch some grass, let my brain reset. Not as an excuse, but as an actual part of the process. Overthinking doesn't get fixed by more thinking. It gets fixed by stepping away.",
      },
      {
        type: "p",
        text: "Because I know from experience, I always come back stronger. Clearer head, shorter list, and most importantly, actual goals for what to build next. Not vague excitement. Direction.",
      },
      {
        type: "quote",
        text: "The idea graveyard isn't the end of the story. It's just compost for whatever grows next.",
      },
    ],
  },
  {
    slug: "why-i-scrapped-my-flight-search-startup",
    topic: "Startups",
    title:
      "Why I Scrapped My Flight Search Startup: The API Gatekeeping Problem in 2026",
    description:
      "I built an AI flight search agent for Southeast Asia, then scrapped it. Every viable flight API in 2026 gates access behind scale I didn't have yet.",
    date: "2026-07-29",
    cover: "startup",
    coverImage: {
      src: "/blog/flight-departure-board.jpg",
      alt: "An airport split-flap departure board listing international flights and departure times",
    },
    keywords: [
      "flight API 2026",
      "startup gatekeeping",
      "Skyscanner API",
      "Kiwi API",
      "Duffel API",
      "flight search startup",
      "travel tech bootstrap",
      "API access barrier",
      "Singapore SaaS",
      "Southeast Asia startup challenges",
    ],
    published: true,
    body: [
      {
        type: "p",
        text: "I spent a good stretch of this year building FlyMeHere, an AI flight search agent for Southeast Asia. The concept was clean, the technical bet was one I actually believed in, and the natural-language layer worked well enough that demoing it to people got the reaction you want. Then I scrapped it — not because the product was wrong, and not because I ran out of energy. I scrapped it because I could not buy, apply, or bootstrap my way into a single flight pricing API that would sell to someone at my size.",
      },
      {
        type: "p",
        text: "That’s a strange sentence to write about a software project in 2026. We’re used to a world where the infrastructure is a credit card away: models, payments, maps, email, storage. Flight data is one of the last categories where that isn’t true, and the gate isn’t priced in dollars — it’s priced in traffic you’re expected to already have. This is a post-mortem about hitting an API access barrier that no amount of engineering could route around, and about the more useful skill I got out of it: telling a structural problem apart from an execution problem before you’ve burned six months on it.",
      },
      { type: "h2", text: "The idea" },
      {
        type: "p",
        text: "FlyMeHere was meant to be a flight search agent for the routes I actually fly: Singapore, Bangkok, Kuala Lumpur, and the messy web of regional connections around them. Instead of a rigid form with date pickers and dropdowns, you’d describe the trip the way you’d say it out loud — “Bali next month with my family, keep it cheap” — and the agent would resolve what you meant: destination, rough dates, how flexible you are, who’s travelling, what you’d tolerate spending. When something was ambiguous it would make a sensible assumption rather than interrogating you.",
      },
      {
        type: "p",
        text: "Two things made it feel differentiated rather than like another metasearch clone. First, proactive price alerts: not “here are today’s fares,” but an agent that keeps watching a route you described in plain language and tells you when the shape of the market changes. Second, the niche. The big engines cover Southeast Asia poorly — ultra-low-cost regional carriers get thin coverage or none, and those are frequently the cheapest option on exactly the routes I cared about. A narrow geography plus natural language plus a watching agent felt like a real product, not a feature. I still think it was.",
      },
      { type: "h2", text: "The discovery" },
      {
        type: "p",
        text: "The technical work went fine. The natural-language layer went in early on Claude and the Vercel AI SDK, and pulling structured intent out of a sloppy sentence turned out to be the easy part. What I’d deferred — the way you defer the thing you assume is a procurement detail — was the actual source of fare data. So I went to sign up for a flight API in 2026, expecting to compare pricing tiers. Instead I spent two weeks discovering that nobody in the category sells to a solo founder with no traffic.",
      },
      {
        type: "p",
        text: "I started with Skyscanner, because it’s the obvious first stop for a metasearch-shaped product. Their affiliate and API program has eligibility criteria that read less like a rate card and more like an audition: a real audience with 500+ followers, a content history under a year old, and a minimum of around 100K monthly active users on whatever surface you’re integrating into. That last number is the one that matters. The Skyscanner API isn’t expensive for a startup — it’s structurally unavailable to one. You have to arrive already having won.",
      },
      {
        type: "p",
        text: "Kiwi was next, and this is the one that stung, because Kiwi’s API used to be the answer to this exact problem. For years it was the scrappy, accessible option — the thing you’d point a new builder at. That changed. The current partner requirements put the bar at roughly 50K+ monthly active users, which is a smaller wall than Skyscanner’s but the same wall. Then Duffel, which is genuinely the most modern developer experience in the category and the one I most wanted to use. Duffel requires KYC and business registration to get past sandbox into live fares — reasonable, given they’re touching real ticketing — except that Singapore wasn’t on their supported list. I’m in Singapore. That’s not a wall I can climb with better traction; it’s a wall I can’t climb with any traction at all.",
      },
      {
        type: "p",
        text: "That left Amadeus, which had the one genuinely open door in the industry: the Self-Service tier, where you could get a key and start querying test data the same afternoon. It was decommissioned on 17 July 2026 — weeks before I got there. What’s left is the enterprise track. Four providers, one shape: Skyscanner wants your audience, Kiwi wants your audience, Duffel wants your jurisdiction, Amadeus wants your enterprise. Not one of them has a door marked “solo founder with a working prototype and no traffic yet.”",
      },
      {
        type: "p",
        text: "The state of flight data access as I found it, in one place:",
      },
      {
        type: "ul",
        items: [
          "Skyscanner — around 100K+ monthly active users, 500+ followers, content history under a year old. Startups without an existing audience are effectively excluded.",
          "Kiwi — the formerly free tier is gone; the partner programme now expects roughly 50K+ monthly active users.",
          "Duffel — KYC and business registration required to reach live fares, and Singapore is not a supported jurisdiction.",
          "Amadeus — the Self-Service tier was decommissioned on 17 July 2026, leaving the enterprise track only.",
        ],
      },
      {
        type: "p",
        text: "Policies move — Amadeus’s did, right under me — so check current terms yourself rather than trusting a snapshot from July 2026. The pattern is what generalises, not the specific numbers.",
      },
      { type: "h2", text: "The pivot attempts" },
      {
        type: "p",
        text: "My first instinct was that this was a distribution problem, so I tried to solve distribution. If the gate is monthly active users, go get monthly active users somewhere cheap: a Telegram bot. It’s a legitimately good channel in this region, the install friction is near zero, and price alerts are a perfect fit for a chat surface — an agent that pings you is more natural in Telegram than in an inbox. I built toward it for a while before the obvious caught up with me. A Telegram bot is a surface. It still has to say something true about flight prices, which means it still needs a flight data source, which is the thing I didn’t have. I’d designed an elegant front door for a building with no plumbing.",
      },
      {
        type: "p",
        text: "Then I went looking for the back door, which in practice means scraper-backed APIs. Sky Scrapper’s free tier is the usual entry point, and it gives you 100 requests per month. That number isn’t a pricing tier, it’s a demo. A single user running a single flexible-date search across a handful of regional carriers can burn through it in one session — proactive alerts, where the whole premise is polling a route repeatedly over days, are arithmetically impossible on that budget. Paid scraper tiers exist, but you’re then building a business whose core dependency is an unsanctioned pipe into someone else’s data, with the reliability and legal profile that implies. That’s not a foundation for a flight search startup you intend to still own in three years.",
      },
      {
        type: "p",
        text: "Somewhere in there the actual diagnosis landed, and it reframed everything.",
      },
      {
        type: "quote",
        text: "The problem was never distribution, and it was never the technology. The problem was that the data itself was gatekept.",
      },
      {
        type: "p",
        text: "I’d been treating data access as an input I could procure, and iterating hard on everything else, when data access was the binding constraint the entire time. Every pivot I’d considered was a pivot on the wrong axis.",
      },
      { type: "h2", text: "The economics" },
      {
        type: "p",
        text: "Suppose I’d solved it anyway — talked my way into a partnership, or launched somewhere I could register a supported entity. The unit economics still don’t rescue you. Flight affiliate margins sit somewhere in the 0.5–2% range per booking, and that’s the whole revenue line for a metasearch product. On a S$300 regional fare that’s a few dollars, before you account for cancellations, attribution windows, and the bookings that leak to a direct airline site. Travel tech bootstrap economics are volume economics: you don’t win on margin, because there isn’t any. You win by being enormous.",
      },
      {
        type: "p",
        text: "The comparison that made it concrete was AirTrackBot — a flight price alert bot, more or less the product I was describing, doing it well. Roughly 1.6 million users, north of 600,000 searches a month. It took them seven-plus years to build that. Seven years of compounding into a business whose margin structure only starts working at the far end of it. I don’t say that with any bitterness; it’s a genuinely impressive thing to have built, and it’s exactly the right answer to the question “how much scale does this model need?” It’s just not a number a bootstrapped solo founder reaches from a standing start, funding it out of the same pocket that pays rent. The API gate demands scale, and the margins mean scale is the only thing that pays. Those two facts are the same fact.",
      },
      { type: "h2", text: "The lesson" },
      {
        type: "p",
        text: "The generalisable version isn’t “flight APIs are hard.” It’s that some markets are only accessible to people who already have something — an audience, an enterprise relationship, a corporate entity in the right country, a decade of compounding. Startup gatekeeping of this kind is usually invisible from the outside, because it lives in eligibility criteria and partner pages rather than in the product surface, and because the incumbents who cleared the gate did so under rules that no longer exist. Kiwi was free once. Amadeus had a self-service tier until three weeks before I needed it. The ladder gets pulled up, and from below the wall still looks climbable.",
      },
      {
        type: "p",
        text: "Geography turned out to matter more than I’d priced in, too. Being in Singapore is a genuine advantage for most Singapore SaaS work — stable, well-regarded, easy to bank. In this category it was a hard blocker, because the modern APIs that are otherwise most founder-friendly, Duffel and Amadeus included, simply didn’t support the jurisdiction I operate from. That’s a specific instance of a broader thing worth naming for anyone building here: Southeast Asia startup challenges often aren’t about the market or the talent, they’re about which country dropdown you appear in on someone else’s onboarding form. It’s worth checking that dropdown in week one rather than month four.",
      },
      {
        type: "p",
        text: "Which is really the whole lesson. I lost time, but not that much time, because the wall announced itself once I actually went looking. Execution problems get better when you push on them — you ship, you learn, the numbers move. Structural problems don’t. Pushing harder on a structural problem produces the same result more expensively, and the failure mode isn’t quitting too early, it’s spending six months proving that a wall is still a wall. The skill is telling them apart, and the test is simple: if the thing blocking me got twice as much effort, would it move at all? For a 100K MAU eligibility floor, the honest answer is no.",
      },
      { type: "h2", text: "If you’re reading this" },
      {
        type: "p",
        text: "You’ll get the most out of it if you’re building an AI agent that depends on someone else’s data, if you’re anywhere near travel or flight search, or if you’re building from ASEAN and keep discovering that the tooling everyone recommends doesn’t ship to your country. Go validate data access before you write a line of product code — not the docs, the actual eligibility criteria and the actual supported-country list, with your real entity. The meta-lesson is one I’d rather have learned in weeks than years: an idea can be technically sound, genuinely differentiated, and still be structurally impossible in your market at your scale. That’s not a verdict on the idea or on you. It’s information — and the sooner you have it, the more of your runway is still yours to spend on something that can actually move.",
      },
    ],
  },
  {
    slug: "iam-to-ai",
    topic: "Career",
    title:
      "From IAM to AI: What Enterprise Security Taught Me About Building AI Products",
    description:
      "I spent years in enterprise IAM before building AI products. The security habits — least privilege, audit trails, hostile inputs — turned out to be an unfair advantage.",
    date: "2026-07-25",
    cover: "career",
    coverImage: {
      src: "/blog/enterprise-server-room.jpg",
      alt: "A corridor of server racks in an enterprise data centre",
    },
    keywords: [
      "IAM to AI",
      "AI product development",
      "production-ready workflows",
      "automation in IT",
      "internal tools",
      "LLM security",
      "identity and access management",
    ],
    published: true,
    body: [
      {
        type: "p",
        text: "For a few years my job title had the word “identity” in it. I worked in Identity and Access Management (IAM) for enterprise banking — the unglamorous plumbing that decides who can touch which system, and proves it to an auditor later. It is not a field people associate with building AI products.",
      },
      {
        type: "p",
        text: "Then I started building AI SaaS on the side, and expected to be starting from zero. I wasn't. Most of what makes an AI feature safe to ship in front of real users is the same discipline IAM drills into you: assume the input is hostile, give every component the least access it needs, and log enough that you can reconstruct what happened. The move from IAM to AI turned out to be less of a career pivot and more of a change of surface area.",
      },
      {
        type: "p",
        text: "This is the post I wish someone had handed me — the parts of enterprise security that transfer directly to AI product development, the parts that don't, and where the analogy quietly breaks.",
      },
      {
        type: "h2",
        text: "What IAM actually is, for people who've never touched it",
      },
      {
        type: "p",
        text: "IAM is the discipline of managing digital identities and what they're allowed to do. In practice it's four boring questions asked over and over: who are you (authentication), what can you do (authorization), who granted that access and when does it end (provisioning and lifecycle), and can we prove all of the above months later (audit)?",
      },
      {
        type: "p",
        text: "In a bank, getting any of those wrong is a regulator's problem, so the culture is relentlessly defensive. You assume every request could be an attacker. You grant the narrowest possible permission and expire it aggressively. You write everything down. Those instincts don't switch off when the system you're building happens to have a language model in the middle of it.",
      },
      {
        type: "h2",
        text: "Least privilege is the best prompt-injection defense you have",
      },
      {
        type: "p",
        text: "The first principle you internalize in IAM is least privilege: a component gets exactly the access it needs to do its job, and nothing more. If a service only reads from one table, it gets a read-only credential scoped to that table — not the admin role someone left lying around.",
      },
      {
        type: "p",
        text: "This maps almost one-to-one onto LLM agents. The moment you give a model tools — a function that queries your database, sends an email, hits an internal API — you've handed decision-making authority to something you cannot fully predict. Prompt injection isn't hypothetical: a hostile string in a support ticket or a scraped web page will try to talk your agent into doing something it shouldn't.",
      },
      {
        type: "p",
        text: "The IAM answer is not “write a better system prompt.” It's to make the damage impossible by construction. Scope the tools. The email tool can only send to addresses already on file. The database tool is a read-only view, not the connection string. The refund tool caps the amount and logs every call. If the worst prompt injection in the world succeeds, the blast radius is a function of what the tool can do — not what the model was convinced to do.",
      },
      {
        type: "code",
        lang: "ts",
        code: "// Don't hand the agent the database. Hand it a narrow, capped capability.\nconst tools = {\n  lookupOrder: readOnly(db, { table: \"orders\", where: { userId: session.userId } }),\n  issueRefund: capped(payments.refund, { maxCents: 5000, log: audit }),\n  // no runSql, no sendEmail(anyAddress), no filesystem\n};",
      },
      {
        type: "p",
        text: "“Assume it will be compromised, and limit what compromise buys the attacker” is the oldest idea in security. It also happens to be the sanest way to design an agent.",
      },
      { type: "h2", text: "If it isn't logged, it didn't happen" },
      {
        type: "p",
        text: "IAM lives and dies on the audit trail. Every access grant, every privileged action, every change has to be attributable and reconstructable, because eventually someone asks “who did this, and were they allowed to?” — and “I think it was fine” is not an answer.",
      },
      {
        type: "p",
        text: "AI systems need this even more, because they are non-deterministic. When a classical function misbehaves you re-run it with the same input and watch it fail. When an LLM feature misbehaves, the input, the model version, the retrieved context and a temperature setting all conspired to produce an output you may never see again. If you didn't capture the trace, you're debugging a ghost. At minimum, log:",
      },
      {
        type: "ul",
        items: [
          "The exact input, plus the user or session context around it",
          "The retrieved context or documents fed into the prompt",
          "The model and version, and key parameters like `temperature` and `max_tokens`",
          "The raw model output, before your parsing and post-processing touched it",
        ],
      },
      {
        type: "p",
        text: "This is tedious to build and it's the single highest-leverage thing you can do for a production-ready workflow. Nearly every hard AI bug I've chased in production was solved by reading the trace, not by staring at the code.",
      },
      {
        type: "h2",
        text: "Treat every input as hostile — including the model's output",
      },
      {
        type: "p",
        text: "Security teaches you to distrust input. In AI product development you get a second, less obvious source of untrusted data: the model itself. An LLM's output is not a value whose shape you can trust. It will occasionally return malformed JSON, hallucinate a field, or produce a plausible-looking id that doesn't exist.",
      },
      {
        type: "p",
        text: "So the boundary discipline is the same on both sides. Validate what comes in from the user, and validate what comes back from the model before it touches anything real — a database, a payment, another API. Parse, don't trust. If the model is meant to return a category from a fixed set, check that it did, and define a fallback for when it didn't. An LLM in your backend is a very capable, occasionally unreliable intern; you would code-review the intern.",
      },
      {
        type: "h2",
        text: "Lifecycle: the unglamorous part that keeps you out of trouble",
      },
      {
        type: "p",
        text: "Half of IAM is deprovisioning — the discipline of taking access away. Accounts are disabled the day someone leaves; credentials rotate; nothing lives forever by default. It's the part everyone forgets, and it's where breaches come from.",
      },
      {
        type: "p",
        text: "The AI equivalent is prosaic: API keys and secrets. Building with providers like OpenAI, Claude and a hosted backend means you accumulate keys fast, and it's genuinely easy to leak one into a client bundle or a git history. The IAM reflex — scope keys narrowly, rotate them, keep them server-side, and assume any key will eventually leak — is exactly right. Automation in IT taught me to make the secure path the easy path, so nobody's tempted to hardcode a key at 2am.",
      },
      { type: "h2", text: "Where the analogy breaks" },
      {
        type: "p",
        text: "I don't want to oversell the transfer, because the places it fails are the interesting ones. IAM is built on deterministic policy: a rule engine evaluates a request against a policy and returns allow or deny, the same way every time. LLMs have no such engine. There is no policy language that guarantees a model won't say something — only layers that make it less likely.",
      },
      {
        type: "p",
        text: "That changes the shape of the work. In IAM, “correct” is a property you can assert and test. In AI features, “correct” is a distribution you manage — evaluations, guardrails, and a tolerance for being wrong some small percentage of the time. Security engineers moving into AI often struggle with exactly this: the discomfort of a system that's only probabilistically right. The habits transfer; the false certainty does not, and you have to consciously drop it.",
      },
      { type: "h2", text: "If you're making the same move" },
      {
        type: "p",
        text: "If you're coming from IT, security, or ops and eyeing AI product development, the honest news is that your instincts are more relevant than the job titles suggest. The industry over-indexes on model cleverness and under-invests in the boring reliability work — scoping, logging, validation, secret hygiene — that decides whether a feature survives contact with real users. That boring work is your home turf.",
      },
      {
        type: "p",
        text: "Start where the stakes are legible: internal tools. An internal tool that automates a slow, repetitive process is the perfect first AI build. The users are forgiving, the failure modes are contained, and you get to practice the whole production-ready workflow — from prompt to guardrail to audit log — without a customer watching. It's also where automation in IT delivers its clearest return: hours handed back to people who were doing something by hand.",
      },
      {
        type: "p",
        text: "The path from IAM to AI never felt like leaving one field for another. It felt like taking a mindset built for high-stakes, adversarial systems and pointing it at a new kind of component. The language model is new. The discipline of not trusting it is very, very old.",
      },
    ],
  },
  {
    slug: "production-ready-ai-features",
    topic: "Artificial intelligence",
    title:
      "Making AI Product Development Production-Ready: Lessons From Shipping Real Features",
    description:
      "The gap between an AI demo and a production-ready workflow is mostly unglamorous engineering. Here's what actually breaks when real users show up.",
    date: "2026-07-25",
    cover: "ai",
    keywords: [
      "AI product development",
      "production-ready workflows",
      "LLM in production",
      "AI engineering",
    ],
    published: false,
    body: [],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function publishedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.published);
}

/** Rough reading time from the post body. */
export function readingMinutes(post: BlogPost): number {
  const words = post.body.reduce((n, block) => {
    if (block.type === "ul") return n + block.items.join(" ").split(/\s+/).length;
    if ("text" in block) return n + block.text.split(/\s+/).length;
    if (block.type === "code") return n + block.code.split(/\s+/).length;
    return n;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
