import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  /** Dark solid — hero primary, services CTA, nav CTA. */
  primary: "bg-primary text-primary-foreground",
  /** White with border — hero secondary. */
  outline: "border border-border bg-card text-foreground",
  /** Accent fill — contact email button on the dark section. */
  accent: "bg-brand text-white",
  /** Ghost on dark — contact GitHub/LinkedIn. */
  "ghost-dark": "border border-[#3A3A3E] bg-transparent text-[#FAFAFA]",
} as const;

export type PillVariant = keyof typeof VARIANTS;

/**
 * Pill-shaped link button (radius 100px) with the shared hover scale
 * (1.03 on hover, 0.98 on press, disabled under prefers-reduced-motion).
 */
export function PillLink({
  href,
  variant = "primary",
  className,
  children,
  target,
  rel,
}: {
  href: string;
  variant?: PillVariant;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      className={cn(
        "btn-scale inline-flex items-center gap-2 rounded-full px-[22px] py-[13px] text-[15px] font-medium",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
