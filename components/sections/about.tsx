import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1120px] px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-14 min-[861px]:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border">
            <Image
              src="/azri-about.jpg"
              alt="Azri"
              width={720}
              height={1280}
              className="size-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal>
          <p className="mb-3 font-mono text-[13px] font-medium tracking-[0.02em] text-brand">
            ABOUT
          </p>
          <h2 className="mb-5 font-display text-[clamp(26px,3.2vw,34px)] font-extrabold tracking-[-0.02em]">
            Hi, I&apos;m Azri.
          </h2>
          <p className="mb-4 text-base leading-[1.75] text-muted-foreground">
            I&apos;m passionate about solving boring problems using software.
            My background is Identity and Access Management, but my long-term
            focus is building AI products that businesses actually use.
          </p>
          <p className="mb-4 text-base leading-[1.75] text-muted-foreground">
            Currently: IAM Engineer, Singapore.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border px-3.5 py-[18px] text-center"
              >
                <div className="mb-1 font-display text-2xl font-extrabold">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
