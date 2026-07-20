import { marqueeBadges } from "@/lib/content";
import { techIcons } from "@/components/tech-icons";

/**
 * Infinite horizontal marquee. The badge list is rendered three times and
 * the CSS animation shifts the track by one third for a seamless loop.
 * Pauses on hover; static under prefers-reduced-motion.
 */
export function TechMarquee() {
  const tripled = [...marqueeBadges, ...marqueeBadges, ...marqueeBadges];

  return (
    <section className="marquee-mask overflow-hidden border-y border-border py-8">
      <div className="marquee-track flex w-max gap-16">
        {tripled.map((badge, i) => (
          <div
            key={`${badge}-${i}`}
            className="flex w-[84px] shrink-0 flex-col items-center gap-3"
            aria-hidden={i >= marqueeBadges.length}
          >
            <span className="flex size-12 items-center justify-center text-foreground [&>svg]:size-[30px]">
              {techIcons[badge]}
            </span>
            <span className="whitespace-nowrap font-mono text-[13px] font-medium tracking-[-0.01em] text-muted-foreground">
              {badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
