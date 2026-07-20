/**
 * Single source of truth for every product on the site.
 *
 * The homepage grid and /products/[slug] pages both render from this array.
 * To add product #21: append one object here. No component changes needed.
 */

export type ProductStatus = "live" | "building" | "soon";

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface Product {
  slug: string;
  title: string;
  /** Short description shown on the homepage card and detail page header. */
  description: string;
  status: ProductStatus;
  /** Monospace tag shown in the card footer, e.g. "Bot / infra". */
  tag: string;
  /** Letter rendered in the icon square. Usually the first letter of the title. */
  iconLetter: string;
  caseStudy: {
    /** One-line subtitle under the title on the detail page. */
    headline: string;
    sections: CaseStudySection[];
    stack: string[];
    /** Optional external link (live product, repo, etc.). */
    link?: { label: string; href: string };
  };
}

export const products: Product[] = [
  {
    slug: "kaswatch",
    title: "KasWatch",
    description:
      "Telegram monitoring bot for Kaspa nodes. Real-time alerts when a node goes down, so you find out before your validators do.",
    status: "live",
    tag: "Bot / infra",
    iconLetter: "K",
    caseStudy: {
      headline: "Telegram monitoring for Kaspa nodes.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Running a Kaspa node means caring about uptime, but most operators find out a node is down the slow way: someone notices, or a dashboard gets checked hours later. There was no lightweight way to get pinged the moment a node stopped responding.",
          ],
        },
        {
          heading: "How it works",
          body: [
            "KasWatch polls each registered node on a short interval and tracks its sync state and responsiveness. When a node stops responding or falls out of sync, it sends a Telegram alert to the operator within seconds — and a follow-up when the node recovers.",
            "Setup is a conversation with the bot: add a node address, get alerts. No dashboard to host, no agent to install on the node.",
          ],
        },
        {
          heading: "Status",
          body: [
            "Live and monitoring nodes today. Alerting and recovery notifications are stable; next up is configurable check intervals and richer node health metrics.",
          ],
        },
      ],
      stack: ["Node.js", "Telegram Bot API", "PostgreSQL", "Docker"],
    },
  },
  {
    slug: "ticketpilot",
    title: "TicketPilot",
    description:
      "AI assistant that collects missing information before creating IT access request tickets, cutting back-and-forth for support teams.",
    status: "building",
    tag: "IAM / AI agent",
    iconLetter: "T",
    caseStudy: {
      headline: "Complete tickets before they reach the queue.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Most IT access request tickets arrive incomplete: no approver named, no system specified, no justification. Support teams spend the first round of every ticket asking for the information the form should have collected. I see this every day working in IAM.",
          ],
        },
        {
          heading: "How it works",
          body: [
            "TicketPilot sits in front of the ticketing system. It asks the requester follow-up questions in plain language until the request has everything the fulfilment team needs — the right system, the right access level, the right approver — then creates a ticket that can be actioned on first touch.",
          ],
        },
        {
          heading: "Status",
          body: [
            "In development. The conversation flow and ticket creation are working; current focus is integrating with common ticketing systems and hardening the validation rules.",
          ],
        },
      ],
      stack: ["Next.js", "Claude API", "PostgreSQL", "Supabase"],
    },
  },
  {
    slug: "invoiceai",
    title: "InvoiceAI",
    description:
      "Extracts line items, totals and vendor details from invoices using OCR and AI, and exports clean, structured data.",
    status: "soon",
    tag: "OCR / automation",
    iconLetter: "I",
    caseStudy: {
      headline: "Invoices in, structured data out.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Small teams still key invoice data into spreadsheets and accounting tools by hand. Generic OCR gets the text but not the structure — line items, totals and vendor details still need a human to sort out.",
          ],
        },
        {
          heading: "The plan",
          body: [
            "InvoiceAI combines OCR with a language model that understands invoice layout: it extracts line items, totals, tax and vendor details into a consistent schema, flags anything it isn't confident about, and exports clean CSV or pushes straight to your accounting tool.",
          ],
        },
        {
          heading: "Status",
          body: [
            "Coming soon. Extraction pipeline is being prototyped now.",
          ],
        },
      ],
      stack: ["Next.js", "OpenAI API", "OCR", "Supabase"],
    },
  },
  {
    slug: "resumeai",
    title: "ResumeAI",
    description:
      "Generates ATS-friendly resumes from a plain work history, tuned to match the language of a specific job description.",
    status: "soon",
    tag: "Career tooling",
    iconLetter: "R",
    caseStudy: {
      headline: "Your work history, matched to the job in front of you.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Tailoring a resume to every job posting is tedious, so most people don't — and ATS filters reject resumes that never mention the words the posting uses, even when the experience matches.",
          ],
        },
        {
          heading: "The plan",
          body: [
            "ResumeAI takes a plain-language work history once, then generates an ATS-friendly resume tuned to a specific job description: same facts, phrased in the language the posting actually uses. No invented experience — it rewords what you did, it doesn't embellish it.",
          ],
        },
        {
          heading: "Status",
          body: [
            "Coming soon. Currently in design.",
          ],
        },
      ],
      stack: ["Next.js", "Claude API", "Tailwind CSS", "Vercel"],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
