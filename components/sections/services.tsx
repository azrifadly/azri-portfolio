import { ArrowRight } from "lucide-react";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1120px] px-6 py-24">
        <Reveal>
          <h2 className="mb-11 text-center font-display text-[clamp(26px,3.2vw,34px)] font-bold tracking-[-0.02em]">
            Need something custom?
          </h2>
        </Reveal>
        <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {services.map((service) => (
            <Reveal key={service.title} className="h-full">
              <div className="h-full rounded-3xl border border-border p-7">
                <h3 className="mb-2.5 font-display text-[17px] font-semibold">
                  {service.title}
                </h3>
                <p className="text-sm leading-[1.65] text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center">
          <PillLink
            href="/#contact"
            variant="primary"
            className="px-[26px] py-3.5"
          >
            Book a discovery call
            <ArrowRight className="size-4" />
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}
