"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Image as ImageIcon, X, ZoomIn } from "lucide-react";
import type { AutomationMedia } from "@/lib/automations";
import { cn } from "@/lib/utils";

/**
 * Renders a section's screenshots: a single full-width frame for one item,
 * a two-up grid for two or more. Items without a real `src` yet render as a
 * labeled placeholder frame at the same aspect ratio, so swapping in a real
 * screenshot later never shifts the layout. Real images open a full-size
 * lightbox on click — the thumbnail frame crops/shrinks source screenshots
 * a lot, so this is the only way to actually read fine text in them. Each
 * screenshot is its own independent thing, not a sequence, so the lightbox
 * shows exactly one image with no next/previous.
 */
export function AutomationMediaGrid({ media }: { media: AutomationMedia[] }) {
  type OpenItem = AutomationMedia & { src: string };
  const [open, setOpen] = useState<OpenItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe mount flag, needed to defer the portal to the client.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (media.length === 0) return null;

  const sizes =
    media.length > 1
      ? "(max-width: 640px) 100vw, 372px"
      : "(max-width: 760px) 100vw, 712px";

  return (
    <>
      <div
        className={cn(
          "mt-5 grid gap-4",
          media.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
        )}
      >
        {media.map((item) => (
          <div
            key={item.label ?? item.alt}
            className="overflow-hidden rounded-xl border border-border"
          >
            {item.type === "image" && item.src ? (
              <button
                type="button"
                onClick={() => setOpen(item as OpenItem)}
                aria-label={`Enlarge: ${item.alt}`}
                className="group relative block aspect-[16/10] w-full cursor-zoom-in bg-muted/40"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={sizes}
                  className="object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-[opacity,background-color] duration-200 group-hover:bg-foreground/10 group-hover:opacity-100 [@media(hover:none)]:bg-foreground/10 [@media(hover:none)]:opacity-100">
                  <span className="flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm">
                    <ZoomIn className="size-4" strokeWidth={1.75} />
                  </span>
                </span>
              </button>
            ) : (
              <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 border-dashed bg-muted/40 px-6 text-center">
                <ImageIcon className="size-6 text-muted-foreground/50" strokeWidth={1.5} />
                {item.label && (
                  <span className="text-xs font-semibold text-muted-foreground">
                    {item.label}
                  </span>
                )}
                <span className="max-w-[280px] text-[11px] leading-[1.5] text-muted-foreground/70">
                  {item.alt}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="lightbox"
                className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto p-4 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.18 }}
                onMouseDown={() => setOpen(null)}
              >
                <div className="fixed inset-0 -z-10 bg-foreground/70 backdrop-blur-sm" />

                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="fixed right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-background/10 text-white transition-colors hover:bg-background/20"
                >
                  <X className="size-5" />
                </button>

                <motion.div
                  key={open.src}
                  initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }}
                  transition={{ duration: reducedMotion ? 0 : 0.15 }}
                  className="relative mx-auto w-fit max-w-[92vw]"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Image
                    src={open.src}
                    alt={open.alt}
                    width={open.width ?? 1600}
                    height={open.height ?? 1000}
                    sizes="92vw"
                    className="mx-auto block h-auto max-h-[80vh] w-auto max-w-[92vw] rounded-lg object-contain"
                  />
                  <p className="mt-3 text-center text-sm text-white/80">
                    {open.alt}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
