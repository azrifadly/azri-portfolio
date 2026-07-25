import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { BlogCoverArt } from "@/components/blog-covers";
import { PillLink } from "@/components/pill-link";
import { getPost, publishedPosts, readingMinutes, type Block } from "@/lib/blog";
import { site } from "@/lib/site";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || !post.published) return {};

  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: `${post.title} — ${site.name}`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      tags: post.keywords,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

/** Render `inline code` spans (backtick-delimited) inside a text block. */
function renderInline(text: string): ReactNode {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]"
      >
        {part}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-3 mt-10 font-display text-2xl font-extrabold tracking-[-0.02em]">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mb-5 text-[16.5px] leading-[1.8] text-muted-foreground">
          {renderInline(block.text)}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[16.5px] leading-[1.7] text-muted-foreground">
          {block.items.map((item) => (
            <li key={item.slice(0, 40)}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="mb-6 overflow-x-auto rounded-xl border border-border bg-card p-4 text-[13px] leading-[1.6]">
          <code className="font-mono">{block.code}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote className="mb-5 border-l-2 border-brand pl-4 text-[16.5px] italic leading-[1.7] text-muted-foreground">
          {renderInline(block.text)}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || !post.published) notFound();

  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.keywords.join(", "),
    author: { "@type": "Person", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-[760px] px-6 pb-24 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All writing
      </Link>

      <header className="mb-8">
        <span className="font-mono text-[11px] font-medium tracking-[0.02em] text-brand">
          {post.topic.toUpperCase()}
        </span>
        <h1 className="mb-4 mt-3 font-display text-[clamp(30px,4.5vw,42px)] font-extrabold leading-[1.12] tracking-[-0.03em]">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {dateLabel} · {readingMinutes(post)} min read
        </p>
      </header>

      <div className="mb-10 overflow-hidden rounded-2xl border border-border">
        <BlogCoverArt cover={post.cover} />
      </div>

      <article>
        {post.body.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </article>

      <div className="mt-16 border-t border-border pt-10 text-center">
        <p className="mb-5 text-base text-muted-foreground">
          Building something with AI, or moving into it yourself?
        </p>
        <PillLink href="/#services" variant="primary">
          See what I build
          <ArrowRight className="size-4" />
        </PillLink>
      </div>
    </main>
  );
}
