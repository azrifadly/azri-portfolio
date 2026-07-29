import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductIcon } from "@/components/product-icon";
import { StatusDot } from "@/components/status-dot";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block h-full rounded-[20px] border border-border bg-card p-7 transition-[background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#D5D5DC] hover:bg-[#F5F5F7] hover:shadow-[0_16px_32px_-18px_rgba(17,17,17,0.16)]"
    >
      <div className="mb-[22px] flex items-start justify-between">
        <ProductIcon product={product} className="size-10 text-[15px]" />
        <StatusDot status={product.status} note={product.statusNote} />
      </div>
      <h3 className="mb-2 font-display text-[19px] font-extrabold tracking-[-0.01em]">
        {product.title}
      </h3>
      <p className="mb-6 min-h-[66px] text-sm leading-[1.65] text-muted-foreground">
        {product.description}
      </p>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-xs text-muted-foreground">
          {product.tag}
        </span>
        <ArrowUpRight className="size-4" />
      </div>
    </Link>
  );
}
