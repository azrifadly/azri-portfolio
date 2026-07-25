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
  cover: BlogCover;
  keywords: string[];
  published: boolean;
  body: Block[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "iam-to-ai",
    topic: "Career",
    title:
      "From IAM to AI: What Enterprise Security Taught Me About Building AI Products",
    description:
      "I spent years in enterprise IAM before building AI products. The security habits — least privilege, audit trails, hostile inputs — turned out to be an unfair advantage.",
    date: "2026-07-25",
    cover: "career",
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
  {
    slug: "automation-in-it-internal-tools",
    topic: "Automation",
    title: "Automation in IT: Building Internal Tools That Actually Save Hours",
    description:
      "How to spot the repetitive IT work worth automating, and build internal tools people keep using instead of quietly abandoning.",
    date: "2026-07-25",
    cover: "automation",
    keywords: [
      "automation in IT",
      "internal tools",
      "workflow automation",
      "AI automation",
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
