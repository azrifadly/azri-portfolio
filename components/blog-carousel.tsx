"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCoverArt } from "@/components/blog-covers";
import { Reveal } from "@/components/reveal";
import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Horizontally scrollable writing shelf. Cards sit in a snapping scroll
 * track; the arrows page by one card and disable at either end, so the
 * control state always tells the truth about whether there's more to see.
 */
export function BlogCarousel({ posts }: { posts: BlogPost[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // 4px slack absorbs sub-pixel rounding at the extremes.
    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 4
    );
  }, []);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sync]);

  const page = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = 20;
    const step = card ? card.offsetWidth + gap : track.clientWidth;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * step,
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  return (
    <>
      <Reveal className="mb-12 flex items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-extrabold tracking-[-0.02em]">
          Writing
        </h2>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            <ArrowButton
              direction="left"
              disabled={!canScrollLeft}
              onClick={() => page(-1)}
            />
            <ArrowButton
              direction="right"
              disabled={!canScrollRight}
              onClick={() => page(1)}
            />
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Reveal>

      <div
        ref={trackRef}
        onScroll={sync}
        role="region"
        aria-label="Writing"
        tabIndex={0}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => {
          const card = (
            <>
              <BlogCoverArt cover={post.cover} image={post.coverImage} />
              <div className="px-6 pb-6 pt-5">
                <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-brand">
                  {post.topic.toUpperCase()}
                </span>
                <h3 className="mt-3 font-display text-base font-extrabold leading-[1.4]">
                  {post.title}
                </h3>
                {!post.published && (
                  <p className="mt-2 text-xs font-medium text-muted-foreground/70">
                    Coming soon
                  </p>
                )}
              </div>
            </>
          );

          return (
            <div
              key={post.slug}
              className="w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[368px]"
            >
              {post.published ? (
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full overflow-hidden rounded-[20px] border border-border transition-[transform,box-shadow,border-color] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#D9D9F5] hover:shadow-[0_20px_40px_-20px_rgba(17,17,17,0.12)]"
                >
                  {card}
                </Link>
              ) : (
                <div
                  className="h-full overflow-hidden rounded-[20px] border border-border opacity-60"
                  aria-disabled="true"
                >
                  {card}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous posts" : "Next posts"}
      className={cn(
        "flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition-[color,background-color,border-color,opacity]",
        "hover:border-[#D9D9F5] hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-30"
      )}
    >
      <Icon className="size-4" strokeWidth={1.75} />
    </button>
  );
}
