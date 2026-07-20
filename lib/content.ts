import type { ProductStatus } from "@/lib/products";

/** Tiles shown in the infinite tech marquee, in order. */
export const marqueeBadges = [
  "OpenAI",
  "Claude",
  "Cursor",
  "Next.js",
  "Tailwind",
  "Supabase",
  "Postgres",
  "Docker",
  "Vercel",
  "GitHub",
] as const;

export type MarqueeBadge = (typeof marqueeBadges)[number];

export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "AI automation",
    description:
      "Automating repetitive internal work with AI agents, so your team spends time on decisions, not data entry.",
  },
  {
    title: "Internal business tools",
    description:
      "Purpose-built internal tools for the specific way your business actually operates, not generic software bent to fit.",
  },
  {
    title: "Custom AI applications",
    description:
      "Full applications built around a language model, from prototype to something your customers actually use.",
  },
];

export const stats = [
  { value: "6+", label: "Projects built" },
  { value: "15+", label: "Technologies learned" },
  { value: "5+", label: "Years in IT" },
];

export interface JourneyStep {
  title: string;
  /** "done" renders a solid dark dot; "building" renders the accent dot + StatusDot badge. */
  state: "done" | Extract<ProductStatus, "building">;
}

export const journey: JourneyStep[] = [
  { title: "Started as IAM Engineer", state: "done" },
  { title: "Started learning AI development", state: "done" },
  { title: "Built and shipped KasWatch", state: "done" },
  { title: "Launching TicketPilot", state: "done" },
  { title: "Building AI SaaS products", state: "building" },
];

export interface TechGroup {
  label: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  { label: "Building with AI", items: ["OpenAI", "Claude", "Cursor", "n8n"] },
  {
    label: "Core stack",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Infrastructure",
    items: ["Supabase", "PostgreSQL", "Docker", "Vercel", "GitHub"],
  },
];

export type BlogCover = "ai" | "automation" | "career";

export interface BlogPost {
  topic: string;
  title: string;
  cover: BlogCover;
  href: string;
}

export const blogPosts: BlogPost[] = [
  {
    topic: "Artificial intelligence",
    title: "What actually breaks when you put AI in a production workflow",
    cover: "ai",
    href: "#",
  },
  {
    topic: "Automation",
    title: "The boring parts of IT support that AI is good at fixing",
    cover: "automation",
    href: "#",
  },
  {
    topic: "Career",
    title: "Moving from IAM engineering into building products",
    cover: "career",
    href: "#",
  },
];
