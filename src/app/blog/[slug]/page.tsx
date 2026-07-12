import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { posts } from "@/lib/data";
import { formatDate } from "@/lib/format-date";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-signal"
        >
          ← Voltar ao blog
        </Link>

        <div className="mt-6 mb-10 border-b border-line pb-10">
          <Tag>{post.tag}</Tag>
          <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="space-y-6 text-base leading-relaxed text-ink-soft">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
