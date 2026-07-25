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

export interface ProductMedia {
  type: "image" | "video";
  /** Public path, e.g. "/products/tradelogio/shot-1.jpg". */
  src: string;
  /** Alt text for images, accessible label for videos. */
  alt: string;
  /** Optional poster frame for videos. */
  poster?: string;
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
    stack?: string[];
    /** Optional screenshots/video shown in a carousel below the header. */
    media?: ProductMedia[];
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
            "Most traders keep their records scattered across spreadsheets, and that makes it almost impossible to see what's actually working across a run of trades. I wanted logging a trade to feel effortless, and reviewing them to become a habit instead of a chore you avoid.",
          ],
        },
        {
          heading: "How it worked",
          body: [
            "The journal grouped trades into folders and laid them out on a calendar, so a whole month of activity was visible at a glance. Alongside it, a markets view pulled in live crypto and forex prices with clean, interactive charts, so you could look at the market and your own record side by side. Accounts, data and email all ran on a hosted backend, which kept the whole thing lean enough to build and ship on my own.",
            "It went out as a freemium product — a free tier with limited usage, and a low-cost monthly plan for anyone who wanted more.",
          ],
        },
        {
          heading: "Why it was decommissioned",
          body: [
            "This was my main focus for a good stretch, but time got tight and I had to set it down with the dashboard still unfinished. I moved on to other priorities and stopped maintaining it. I don't regret it — the build taught me a lot. If I ever pick it back up, the first job is pulling the charts into a single, consistent view so everything looks the same across the app.",
          ],
        },
      ],
      media: [
        {
          type: "video",
          src: "/products/tradelogio/demo.mov",
          alt: "Tradelogio walkthrough",
        },
        {
          type: "image",
          src: "/products/tradelogio/shot-3.jpg",
          alt: "Tradelogio landing page with an equity curve and a waitlist sign-up",
        },
        {
          type: "image",
          src: "/products/tradelogio/shot-4.jpg",
          alt: "Tradelogio dashboard showing P&L, win rate, an account equity chart and a trade calendar",
        },
        {
          type: "image",
          src: "/products/tradelogio/shot-1.jpg",
          alt: "Tradelogio markets page listing live crypto and forex prices",
        },
        {
          type: "image",
          src: "/products/tradelogio/shot-2.jpg",
          alt: "Tradelogio market detail view with a candlestick chart",
        },
      ],
    },
  },
  {
    slug: "flymehere",
    title: "FlyMeHere",
    description:
      "AI flight search for Southeast Asia. Describe your trip in plain language and it works out what you mean, then searches every airline — including the regional carriers with the cheapest fares.",
    status: "building",
    tag: "Travel / AI search",
    iconLetter: "F",
    caseStudy: {
      headline: "Tell us where you want to go — we find the cheapest way there.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Finding a cheap flight in Southeast Asia usually means wrestling with rigid search forms — and even then, you miss the small regional carriers that often have the best fares. The big search engines just don't cover the region well, so the cheapest option is frequently the one you never get shown.",
          ],
        },
        {
          heading: "How it works",
          body: [
            "Instead of a form, you just describe the trip — \"Bali next month with my family on a budget\" — and it works out what you actually mean: where you're going, roughly when, how flexible you are, who's travelling and what you want to spend. When something's fuzzy, it makes a sensible guess rather than making you spell everything out.",
            "From there it searches across airlines — including the regional budget carriers the mainstream engines skip — and keeps everything focused on Southeast Asia, so the results come back faster and closer to what you asked for.",
          ],
        },
        {
          heading: "Status",
          body: [
            "This is the one I'm building right now. The landing page is live and the natural-language part already works — you can describe a trip and watch it pull the details out. Next up is wiring in live fare data so it can return real flights.",
          ],
        },
      ],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
