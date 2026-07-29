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
  {
    title: "Started out as an IAM engineer, keeping enterprise banking infrastructure running",
    state: "done",
  },
  { title: "Then got into AI development and automation", state: "done" },
  { title: "Now building AI SaaS products", state: "building" },
];

export interface TechGroup {
  label: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  {
    label: "Building with AI",
    items: ["OpenAI", "Claude", "Vercel AI SDK", "Cursor"],
  },
  {
    label: "Core stack",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Infrastructure",
    items: ["Supabase", "PostgreSQL", "Vercel", "GitHub"],
  },
];

export type BlogCover = "ai" | "automation" | "career" | "startup";
