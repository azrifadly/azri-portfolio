import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AutomationMediaGrid } from "@/components/automation-media";
import { PillLink } from "@/components/pill-link";
import { ProductIcon } from "@/components/product-icon";
import { StatusDot } from "@/components/status-dot";
import { getAutomation, automations } from "@/lib/automations";

interface AutomationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return automations.map((automation) => ({ slug: automation.slug }));
}

export async function generateMetadata({
  params,
}: AutomationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const automation = getAutomation(slug);
  if (!automation) return {};
  return {
    title: `${automation.title} — AzriFadli`,
    description: automation.description,
  };
}

export default async function AutomationPage({ params }: AutomationPageProps) {
  const { slug } = await params;
  const automation = getAutomation(slug);
  if (!automation) notFound();

  return (
    <main className="mx-auto max-w-[760px] px-6 pb-24 pt-12">
      <Link
        href="/#automations"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All automations
      </Link>

      <header className="mb-12">
        <div className="mb-6 flex items-start justify-between">
          <ProductIcon product={automation} className="size-14 rounded-2xl text-xl" />
          <StatusDot status={automation.status} note={automation.statusNote} />
        </div>
        <h1 className="mb-3 font-display text-[clamp(32px,4.5vw,44px)] font-extrabold leading-[1.1] tracking-[-0.03em]">
          {automation.title}
        </h1>
        <p className="mb-4 text-lg leading-[1.6] text-muted-foreground">
          {automation.caseStudy.headline}
        </p>
        <span className="font-mono text-xs text-muted-foreground">
          {automation.tag}
        </span>
      </header>

      <div className="space-y-10">
        {automation.caseStudy.sections.map((section) => (
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
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mb-4 list-disc space-y-2 pl-5 text-base leading-[1.7] text-muted-foreground">
                {section.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.media && <AutomationMediaGrid media={section.media} />}
          </section>
        ))}

        {automation.caseStudy.stack && automation.caseStudy.stack.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-xl font-extrabold tracking-[-0.01em]">
              Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {automation.caseStudy.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-[10px] border border-border bg-card px-3.5 py-2 text-[13px] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        {automation.caseStudy.link && (
          <PillLink
            href={automation.caseStudy.link.href}
            variant="outline"
            className="text-sm"
          >
            {automation.caseStudy.link.label}
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
