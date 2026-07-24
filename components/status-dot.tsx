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
  decommissioned: {
    label: "Decommissioned",
    pill: "bg-[#F3EDED] text-[#8A6A6A]",
    dot: "bg-[#B48F8F]",
  },
};

export function StatusDot({
  status,
  className,
}: {
  status: ProductStatus;
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
      {s.label}
    </span>
  );
}
