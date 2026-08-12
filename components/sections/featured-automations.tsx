import { AutomationCard } from "@/components/automation-card";
import { Reveal } from "@/components/reveal";
import { automations } from "@/lib/automations";

export function FeaturedAutomations() {
  return (
    <section id="automations" className="px-6 py-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal className="mb-12">
          <p className="mb-3 font-mono text-[13px] font-medium tracking-[0.02em] text-brand">
            AUTOMATIONS
          </p>
          <h2 className="max-w-[560px] font-display text-[clamp(28px,3.6vw,38px)] font-extrabold tracking-[-0.02em]">
            Real automations, built and running.
          </h2>
        </Reveal>
        {/*
          flex-wrap, not grid: a fixed grid-cols-3 reserves empty track width
          next to a lone card. Flex only takes the space each card needs, so
          this looks right at 1 entry, 2, or a full row.
        */}
        <div className="flex flex-wrap gap-5">
          {automations.map((automation) => (
            <Reveal
              key={automation.slug}
              className="w-full sm:w-[calc(50%-10px)] lg:w-[360px]"
            >
              <AutomationCard automation={automation} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
