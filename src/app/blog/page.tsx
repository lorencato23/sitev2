import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { Tag } from "@/components/tag";
import { Reveal } from "@/components/reveal";
import { posts } from "@/lib/data";
import { formatDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Textos sobre neurocirurgia, medicina aeroespacial e divulgação científica.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Leitura"
        title="Blog"
        description="Notas e artigos sobre neurocirurgia, fisiologia espacial e o que aprendo pelo caminho."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-6 grid gap-8 rounded-3xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end"
            >
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <Tag>{featured.tag}</Tag>
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    Mais recente
                  </span>
                </div>
                <h2
                  className="max-w-2xl font-display leading-[1.08] text-ink transition-colors group-hover:text-signal"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                  {featured.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-muted">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span aria-hidden="true">•</span>
                <span>{featured.readTime}</span>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 100} className="flex">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
