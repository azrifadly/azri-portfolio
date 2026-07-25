import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogCoverArt } from "@/components/blog-covers";
import { blogPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Writing — ${site.name}`,
  description:
    "Notes on AI product development, automation in IT, and moving from IAM into building AI products.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-6 pb-24 pt-12">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Home
      </Link>

      <header className="mb-12">
        <h1 className="mb-3 font-display text-[clamp(32px,4.5vw,44px)] font-extrabold tracking-[-0.03em]">
          Writing
        </h1>
        <p className="max-w-[560px] text-lg leading-[1.6] text-muted-foreground">
          Notes on AI product development, automation in IT, and the road from
          IAM to building AI products.
        </p>
      </header>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {blogPosts.map((post) => {
          const card = (
            <>
              <BlogCoverArt cover={post.cover} />
              <div className="px-6 pb-6 pt-5">
                <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-brand">
                  {post.topic.toUpperCase()}
                </span>
                <h2 className="mt-3 font-display text-base font-extrabold leading-[1.4]">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
                  {post.published ? post.description : "Coming soon."}
                </p>
              </div>
            </>
          );

          return post.published ? (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block h-full overflow-hidden rounded-[20px] border border-border transition-[transform,box-shadow,border-color] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#D9D9F5] hover:shadow-[0_20px_40px_-20px_rgba(17,17,17,0.12)]"
            >
              {card}
            </Link>
          ) : (
            <div
              key={post.slug}
              className="h-full overflow-hidden rounded-[20px] border border-border opacity-60"
              aria-disabled="true"
            >
              {card}
            </div>
          );
        })}
      </div>
    </main>
  );
}
