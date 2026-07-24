import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PillLink } from "@/components/pill-link";
import { StatusDot } from "@/components/status-dot";
import { getProduct, products } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} — AzriFadli`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-[760px] px-6 pb-24 pt-12">
      <Link
        href="/#products"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All products
      </Link>

      <header className="mb-12">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft font-display text-xl font-extrabold text-brand">
            {product.iconLetter}
          </div>
          <StatusDot status={product.status} />
        </div>
        <h1 className="mb-3 font-display text-[clamp(32px,4.5vw,44px)] font-extrabold leading-[1.1] tracking-[-0.03em]">
          {product.title}
        </h1>
        <p className="mb-4 text-lg leading-[1.6] text-muted-foreground">
          {product.caseStudy.headline}
        </p>
        <span className="font-mono text-xs text-muted-foreground">
          {product.tag}
        </span>
      </header>

      <div className="space-y-10">
        {product.caseStudy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 font-display text-xl font-extrabold tracking-[-0.01em]">
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-4 text-base leading-[1.75] text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section>
          <h2 className="mb-4 font-display text-xl font-extrabold tracking-[-0.01em]">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.caseStudy.stack.map((item) => (
              <span
                key={item}
                className="rounded-[10px] border border-border bg-card px-3.5 py-2 text-[13px] font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {product.caseStudy.link && (
          <PillLink
            href={product.caseStudy.link.href}
            variant="outline"
            className="text-sm"
          >
            {product.caseStudy.link.label}
            <ArrowUpRight className="size-4" />
          </PillLink>
        )}
      </div>

      <div className="mt-16 border-t border-border pt-10 text-center">
        <p className="mb-5 text-base text-muted-foreground">
          Want something like this for your business?
        </p>
        <PillLink href="/#contact" variant="primary">
          Let&apos;s talk
          <ArrowRight className="size-4" />
        </PillLink>
      </div>
    </main>
  );
}
