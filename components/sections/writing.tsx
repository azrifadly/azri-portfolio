import Link from "next/link";
import { BlogCoverArt } from "@/components/blog-covers";
import { Reveal } from "@/components/reveal";
import { blogPosts } from "@/lib/content";

export function Writing() {
  return (
    <section id="blog" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1120px] px-6 py-24">
        <Reveal>
          <h2 className="mb-12 font-display text-[clamp(26px,3.2vw,34px)] font-bold tracking-[-0.02em]">
            Writing
          </h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {blogPosts.map((post) => (
            <Reveal key={post.title} className="h-full">
              <Link
                href={post.href}
                className="block h-full overflow-hidden rounded-[20px] border border-border transition-[transform,box-shadow,border-color] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#D9D9F5] hover:shadow-[0_20px_40px_-20px_rgba(17,17,17,0.12)]"
              >
                <BlogCoverArt cover={post.cover} />
                <div className="px-6 pb-6 pt-5">
                  <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-brand">
                    {post.topic.toUpperCase()}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold leading-[1.4]">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
