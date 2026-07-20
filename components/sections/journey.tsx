import { Reveal } from "@/components/reveal";
import { StatusDot } from "@/components/status-dot";
import { journey } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Journey() {
  return (
    <section id="journey" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[760px] px-6 py-24">
        <Reveal>
          <h2 className="mb-12 font-display text-[clamp(26px,3.2vw,34px)] font-bold tracking-[-0.02em]">
            Journey
          </h2>
        </Reveal>
        <div className="relative">
          <div className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-border" />
          <div>
            {journey.map((step) => {
              const building = step.state === "building";
              return (
                <Reveal
                  key={step.title}
                  className="relative flex items-center gap-5 py-4"
                >
                  <span
                    className={cn(
                      "z-[1] size-[11px] shrink-0 rounded-full",
                      building ? "bg-brand" : "bg-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "text-base",
                      building
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  {building && <StatusDot status="building" className="ml-auto" />}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
