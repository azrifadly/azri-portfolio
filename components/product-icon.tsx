import Image from "next/image";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * The icon square shown on product cards and detail pages: the product's
 * logo when it has one, otherwise the accent-tinted letter tile.
 * Size and corner radius come from `className` so both call sites can
 * keep their own scale.
 */
export function ProductIcon({
  product,
  className,
}: {
  product: Pick<Product, "iconLetter" | "logo">;
  className?: string;
}) {
  if (product.logo) {
    return (
      <div className={cn("relative shrink-0 overflow-hidden rounded-xl", className)}>
        <Image
          src={product.logo.src}
          alt={product.logo.alt}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-brand-soft font-display font-extrabold text-brand",
        className
      )}
    >
      {product.iconLetter}
    </div>
  );
}
