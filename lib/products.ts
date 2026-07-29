/**
 * Single source of truth for every product on the site.
 *
 * The homepage grid and /products/[slug] pages both render from this array.
 * To add product #21: append one object here. No component changes needed.
 */

/** "discontinued" covers both shipped-then-retired and killed-before-launch. */
export type ProductStatus = "live" | "building" | "soon" | "discontinued";

export interface CaseStudySection {
  heading: string;
  body: string[];
  /** Optional bullet list rendered after the body paragraphs. */
  bullets?: string[];
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
  /** Optional qualifier appended to the status pill, e.g. "Jul 2026". */
  statusNote?: string;
  /** Monospace tag shown in the card footer, e.g. "Bot / infra". */
  tag: string;
  /** Letter rendered in the icon square. Used whenever `logo` is absent. */
  iconLetter: string;
  /** Product logo filling the icon square. Takes precedence over `iconLetter`. */
  logo?: { src: string; alt: string };
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
    status: "discontinued",
    tag: "Trading / SaaS",
    iconLetter: "T",
    logo: { src: "/products/tradelogio/logo.jpg", alt: "Tradelogio logo" },
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
      "An AI flight search agent for Southeast Asia, scrapped before launch. A technical post-mortem on why API gatekeeping makes some markets inaccessible to bootstrapped founders — even when the tech works.",
    status: "discontinued",
    tag: "Travel / AI search",
    iconLetter: "F",
    logo: { src: "/products/flymehere/logo.jpg", alt: "FlyMeHere logo" },
    caseStudy: {
      headline: "A technical case study in market barriers.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Finding a cheap flight in Southeast Asia usually means wrestling with rigid search forms — and even then, you miss the small regional carriers that often have the best fares. The big engines don't cover the region well, and neither of them will quietly keep watching a route for you and speak up when the price moves.",
          ],
        },
        {
          heading: "How it worked",
          body: [
            "Instead of a form, you'd describe the trip — \"Bali next month with my family on a budget\" — and it would work out what you actually meant: where you're going, roughly when, how flexible you are, who's travelling and what you want to spend. That part got built, and it worked. Claude handled the intent extraction, and the plan from there was to feed those parameters into a flight pricing API, rank what came back, and keep watching the route in the background.",
          ],
        },
        {
          heading: "Why I scrapped it",
          body: [
            "There was no flight pricing API I could actually buy. Every viable provider gates access behind something a pre-launch solo founder doesn't have — traffic you're expected to already command, or a jurisdiction and a legal entity you either have or you don't.",
          ],
          bullets: [
            "Skyscanner — around 100K+ monthly active users, 500+ followers, and a content history under a year old.",
            "Kiwi — formerly the accessible option; the partner programme now expects roughly 50K+ monthly active users.",
            "Duffel — the best developer experience in the category, but live fares need KYC and business registration, and Singapore isn't a supported jurisdiction.",
            "Amadeus — the Self-Service tier, the one genuinely open door in the industry, was decommissioned on 17 July 2026.",
          ],
        },
        {
          heading: "What I took from it",
          body: [
            "I tried routing around it — a Telegram bot for distribution, a scraper-backed free tier for data — and neither survived contact with the arithmetic. The real diagnosis was that the problem had never been distribution or technology. The data itself was gatekept, and that had been the binding constraint the whole time.",
            "So I scrapped it in July 2026, with the language layer working and nothing real to put behind it. Short and worth it: the wall announced itself as soon as I went looking, which is the whole skill — telling a structural problem apart from an execution problem before you've spent six months on it.",
          ],
        },
      ],
      media: [
        {
          type: "image",
          src: "/products/flymehere/shot-1.png",
          alt: "FlyMeHere landing page with a plain-language trip search box",
        },
        {
          type: "image",
          src: "/products/flymehere/shot-2.png",
          alt: "FlyMeHere's two search modes side by side — a conversational agent and a sortable flight list",
        },
      ],
      stack: [
        "Next.js 14",
        "Tailwind CSS",
        "shadcn/ui",
        "Claude API",
        "Vercel AI SDK",
      ],
      link: {
        label: "Read the full post-mortem",
        href: "/blog/why-i-scrapped-my-flight-search-startup",
      },
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
