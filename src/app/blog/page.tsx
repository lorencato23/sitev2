import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Textos sobre neurocirurgia, medicina aeroespacial e divulgação científica.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Leitura"
        title="Blog"
        description="Notas e artigos sobre neurocirurgia, fisiologia espacial e o que aprendo pelo caminho."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
