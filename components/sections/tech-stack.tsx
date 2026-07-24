import { Reveal } from "@/components/reveal";
import { techGroups } from "@/lib/content";

export function TechStack() {
  return (
    <section className="mx-auto max-w-[1120px] px-6 py-24">
      <Reveal>
        <h2 className="mb-12 font-display text-[clamp(26px,3.2vw,34px)] font-extrabold tracking-[-0.02em]">
          Tech stack
        </h2>
      </Reveal>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
        {techGroups.map((group) => (
          <Reveal key={group.label}>
            <p className="mb-4 font-mono text-xs font-medium tracking-[0.02em] text-muted-foreground">
              {group.label.toUpperCase()}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-[10px] border border-border bg-card px-3.5 py-2 text-[13px] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
