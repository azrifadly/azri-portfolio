import { BlogCarousel } from "@/components/blog-carousel";
import { blogPosts } from "@/lib/blog";

export function Writing() {
  return (
    <section id="blog" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1120px] overflow-hidden px-6 py-24">
        <BlogCarousel posts={blogPosts} />
      </div>
    </section>
  );
}
