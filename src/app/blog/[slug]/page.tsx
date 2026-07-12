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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound();
  }

  const post = posts[index];
  const previous = posts[index + 1];
  const next = posts[index - 1];

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-signal"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Voltar ao blog
        </Link>

        <header className="mt-8 mb-10 border-b border-line pb-10">
          <Tag>{post.tag}</Tag>
          <h1
            className="mt-6 font-display leading-[1.05] tracking-tight text-ink"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="space-y-6 text-base leading-[1.85] text-ink-soft sm:text-lg">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-signal"
                  : undefined
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <nav
          aria-label="Outros artigos"
          className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-signal"
            >
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                ← Anterior
              </span>
              <p className="mt-2 font-display text-lg leading-snug text-ink transition-colors group-hover:text-signal">
                {previous.title}
              </p>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group rounded-2xl border border-line bg-surface p-6 text-right transition-colors hover:border-signal"
            >
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Próximo →
              </span>
              <p className="mt-2 font-display text-lg leading-snug text-ink transition-colors group-hover:text-signal">
                {next.title}
              </p>
            </Link>
          )}
        </nav>
      </Container>
    </article>
  );
}
