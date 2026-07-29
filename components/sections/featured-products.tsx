import { ProductCard } from "@/components/product-card";
import { ProductTeaserCard } from "@/components/product-teaser-card";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/products";

export function FeaturedProducts() {
  return (
    <section id="products" className="px-6 py-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal className="mb-12">
          <p className="mb-3 font-mono text-[13px] font-medium tracking-[0.02em] text-brand">
            PRODUCTS
          </p>
          <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,38px)] font-extrabold tracking-[-0.02em]">
            What I&apos;ve built, and what I&apos;m building next.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 min-[561px]:grid-cols-2">
          {products.map((product) => (
            <Reveal key={product.slug} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
          <Reveal className="h-full">
            <ProductTeaserCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
