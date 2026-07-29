/**
 * Placeholder card for the unannounced next product.
 *
 * The content underneath is deliberately generic — it's real DOM text, so it
 * must not leak anything about what's actually being built. The blur is the
 * whole point; hover (or focus, or any touch device) surfaces the reveal.
 */
export function ProductTeaserCard() {
  return (
    <div
      tabIndex={0}
      role="note"
      aria-label="Next project — coming soon"
      className="group relative h-full cursor-default overflow-hidden rounded-[20px] border border-border bg-card p-7 transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#D5D5DC] hover:shadow-[0_16px_32px_-18px_rgba(17,17,17,0.16)] focus-visible:border-[#D5D5DC] focus-visible:outline-none"
    >
      <div
        aria-hidden="true"
        className="select-none blur-[7px] transition-[filter] duration-500 ease-out group-hover:blur-[5px] group-focus-visible:blur-[5px] motion-reduce:transition-none"
      >
        <div className="mb-[22px] flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-xl bg-brand-soft font-display text-[15px] font-extrabold text-brand">
            ?
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F1EF] px-2.5 py-[5px] font-mono text-xs font-medium tracking-[0.01em] text-[#767672]">
            <span className="size-1.5 shrink-0 rounded-full bg-[#9B9B96]" />
            Untitled
          </span>
        </div>
        <h3 className="mb-2 font-display text-[19px] font-extrabold tracking-[-0.01em]">
          Something new
        </h3>
        <p className="mb-6 min-h-[66px] text-sm leading-[1.65] text-muted-foreground">
          Early days on the next one. Same instincts, different problem — and a
          lot more to say about it before long.
        </p>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="font-mono text-xs text-muted-foreground">
            ????? / ?????
          </span>
        </div>
      </div>

      {/*
        Revealed on hover or keyboard focus. Devices that can't hover get it
        permanently, so the card is never a dead end on touch.
      */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card/80 px-7 text-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
        <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-brand">
          NEXT PROJECT
        </span>
        <span className="font-display text-[22px] font-extrabold tracking-[-0.02em]">
          Coming soon
        </span>
        <span className="max-w-[240px] text-sm leading-[1.6] text-muted-foreground">
          I&apos;m building something. Not ready to talk about it yet.
        </span>
      </div>
    </div>
  );
}
