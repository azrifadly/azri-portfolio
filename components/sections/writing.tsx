import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCoverArt } from "@/components/blog-covers";
import { Reveal } from "@/components/reveal";
import { blogPosts } from "@/lib/blog";

export function Writing() {
  return (
    <section id="blog" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1120px] px-6 py-24">
        <Reveal className="mb-12 flex items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-extrabold tracking-[-0.02em]">
            Writing
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {blogPosts.map((post) => {
            const card = (
              <>
                <BlogCoverArt cover={post.cover} />
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
              <Reveal key={post.slug} className="h-full">
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
