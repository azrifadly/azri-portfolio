/**
 * Single source of truth for every product on the site.
 *
 * The homepage grid and /products/[slug] pages both render from this array.
 * To add product #21: append one object here. No component changes needed.
 */

export type ProductStatus = "live" | "building" | "soon" | "decommissioned";

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
    slug: "tradelogio",
    title: "Tradelogio",
    description:
      "A trading journal SaaS with a calendar-based journal, trade folders and live crypto and forex market data. Built and shipped as a freemium product, since shelved.",
    status: "decommissioned",
    tag: "Trading / SaaS",
    iconLetter: "T",
    caseStudy: {
      headline: "A freemium trading journal, built solo.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Traders keep their records in scattered spreadsheets, which makes it hard to see what's actually working across dozens of trades. Tradelogio set out to make logging trades effortless and reviewing them a habit rather than a chore.",
          ],
        },
        {
          heading: "How it worked",
          body: [
            "A journal page organised trades into folders with a calendar view, so a month of activity was visible at a glance. A markets page pulled live crypto and forex prices, charted with Lightweight Charts, alongside the journal. Auth, data and storage ran on Supabase, with Resend handling transactional email and a waitlist.",
            "The product shipped on a freemium model — a free tier capped at 50 trades and a $19/month Pro tier — behind a dark, brutalist interface with green accents.",
          ],
        },
        {
          heading: "Why it was decommissioned",
          body: [
            "Tradelogio was my main build focus for an extended stretch, but was deprioritised under time constraints with the dashboard still unfinished. I moved on to other priorities and stopped maintaining it — though the build taught me a lot. If it's ever resumed, the first job is consolidating the crypto and forex charts into a single Lightweight Charts wrapper for a consistent look across the platform.",
          ],
        },
      ],
      stack: [
        "Next.js",
        "Supabase",
        "Tailwind CSS",
        "Lightweight Charts",
        "Resend",
      ],
    },
  },
  {
    slug: "flymehere",
    title: "FlyMeHere",
    description:
      "AI flight search for Southeast Asia. Describe your trip in plain language and Claude extracts the intent, then it searches every airline — including the regional carriers with the cheapest fares.",
    status: "building",
    tag: "Travel / AI search",
    iconLetter: "F",
    caseStudy: {
      headline: "Tell us where you want to go — we find the cheapest way there.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Finding cheap flights in Southeast Asia means filling in rigid search forms and still missing the regional budget carriers that often have the best deals. Mainstream search engines under-index the region, so the cheapest option is frequently the one you never see.",
          ],
        },
        {
          heading: "How it works",
          body: [
            "Instead of a form, you describe the trip — \"Bali next month with my family on a budget\" — and Claude (Haiku 4.5) extracts the travel intent: destination, origin, dates and flexibility, travellers, budget tier and trip type. Each field carries a confidence score, so the search degrades gracefully when something can't be pulled from the sentence.",
            "That structured intent then drives a search across airlines, with the regional carriers mainstream engines miss included, focused on Southeast Asia for faster, better-informed results.",
          ],
        },
        {
          heading: "Status",
          body: [
            "In active development, and the product I'm building right now. The landing page is live and natural-language intent extraction is working; the next phase is wiring in live flight-search APIs (Skyscanner, Amadeus).",
          ],
        },
      ],
      stack: ["Next.js", "Claude API", "Supabase", "Tailwind CSS"],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
