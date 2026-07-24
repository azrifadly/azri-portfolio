import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-14 px-6 pb-16 pt-[88px] min-[861px]:grid-cols-[1.15fr_0.85fr]">
      <div>
        <Reveal>
          <h1 className="mb-6 font-display text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
            Repetitive workflows meet AI-powered fixes.
          </h1>
        </Reveal>
        <Reveal>
          <p className="mb-9 max-w-[480px] text-[17px] leading-[1.7] text-muted-foreground">
            I&apos;m Azri. By day I work in Identity and Access Management.
            Outside work I build AI products, SaaS applications and automations
            that solve real business problems.
          </p>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <PillLink href="/#products" variant="primary">
              Explore products
              <ArrowRight className="size-4" />
            </PillLink>
            <PillLink href="/#contact" variant="outline">
              Let&apos;s talk
            </PillLink>
          </div>
        </Reveal>
      </div>
      <Reveal className="relative flex w-full justify-center">
        <div className="aspect-square w-[min(340px,100%)] overflow-hidden rounded-full border border-[#F0F0F0] shadow-[0_30px_60px_-24px_rgba(17,17,17,0.18)]">
          <Image
            src="/azri.jpg"
            alt="Portrait of Azri"
            width={731}
            height={731}
            sizes="340px"
            quality={90}
            priority
            className="size-full object-cover"
          />
        </div>
        <div className="absolute bottom-[6%] right-[2%] flex items-center gap-[7px] rounded-full border border-border bg-card px-3.5 py-2 font-mono text-xs font-medium shadow-[0_10px_24px_-12px_rgba(17,17,17,0.16)]">
          <span className="size-1.5 rounded-full bg-[#1F9254]" />
          {site.location}
        </div>
      </Reveal>
    </section>
  );
}
