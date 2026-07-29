import { cn } from "@/lib/utils";
import type { ProductStatus } from "@/lib/products";

/**
 * The one place the status visual language lives.
 * Used in product cards, product detail pages and the Journey timeline.
 */
const STATUS_STYLES: Record<
  ProductStatus,
  { label: string; pill: string; dot: string }
> = {
  live: {
    label: "Live",
    pill: "bg-[#E8F5EE] text-[#1F9254]",
    dot: "bg-[#1F9254]",
  },
  building: {
    label: "In development",
    pill: "bg-[#EEEDFB] text-[#4A4BC7]",
    dot: "bg-brand",
  },
  soon: {
    label: "Coming soon",
    pill: "bg-[#F1F1EF] text-[#767672]",
    dot: "bg-[#9B9B96]",
  },
  // Cool slate, one step deeper than "soon" so the two stay distinguishable.
  // Deliberately not red: these are end-of-life states, not failures, and
  // every product currently carries this badge.
  discontinued: {
    label: "Discontinued",
    pill: "bg-[#ECEDF1] text-[#5F6673]",
    dot: "bg-[#8B93A2]",
  },
};

export function StatusDot({
  status,
  note,
  className,
}: {
  status: ProductStatus;
  /** Optional qualifier shown after the label, e.g. "Jul 2026". */
  note?: string;
  className?: string;
}) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[5px] font-mono text-xs font-medium tracking-[0.01em]",
        s.pill,
        className
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", s.dot)} />
      {note ? `${s.label} · ${note}` : s.label}
    </span>
  );
}
