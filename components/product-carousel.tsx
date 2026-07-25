"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductMedia } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Minimalist screenshot/video showcase for a product detail page.
 * Slides sit in a horizontal track; arrows reveal on hover, and a thin
 * stepper marks position. Videos pause when scrolled out of view.
 */
export function ProductCarousel({ media }: { media: ProductMedia[] }) {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const count = media.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  // Pause every video that isn't the current slide.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });
  }, [index]);

  if (count === 0) return null;

  return (
    <section aria-roledescription="carousel" aria-label="Product screenshots">
      <div
        className="group relative overflow-hidden rounded-xl border border-border bg-muted/40"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(index - 1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            go(index + 1);
          }
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {media.map((item, i) => (
            <div
              key={item.src}
              className="relative aspect-[16/10] w-full shrink-0"
              aria-hidden={i !== index}
            >
              {item.type === "video" ? (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={item.alt}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 760px"
                  className="object-contain"
                />
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="absolute left-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-foreground/60 opacity-0 backdrop-blur-sm transition-all hover:bg-background/60 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 motion-reduce:transition-none"
            >
              <ChevronLeft className="size-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-foreground/60 opacity-0 backdrop-blur-sm transition-all hover:bg-background/60 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 motion-reduce:transition-none"
            >
              <ChevronRight className="size-5" strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="group/step py-2"
            >
              <span
                className={cn(
                  "block h-[2px] w-7 rounded-full transition-colors",
                  i === index
                    ? "bg-foreground"
                    : "bg-border group-hover/step:bg-muted-foreground/40"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
