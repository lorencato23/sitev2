import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { HeroGraphic } from "@/components/hero-graphic";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { StatStrip } from "@/components/stat-strip";
import Link from "next/link";
import {
  areas,
  profile,
  projects,
  posts,
  publicationStats,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="border-b border-line py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-signal">
                {profile.eyebrow}
              </p>
              <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl">
                Gabriel
                <br />
                Lorencato
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                {profile.shortBio}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/projetos">Ver projetos →</ButtonLink>
                <ButtonLink href="/publicacoes" variant="secondary">
                  Publicações
                </ButtonLink>
                <ButtonLink href="/blog" variant="secondary">
                  Blog
                </ButtonLink>
              </div>

              <div className="mt-10 flex gap-3">
                <Link
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xs font-semibold uppercase text-ink-soft transition-colors hover:border-signal hover:text-signal"
                  aria-label="Instagram"
                >
                  IG
                </Link>
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xs font-semibold uppercase text-ink-soft transition-colors hover:border-signal hover:text-signal"
                  aria-label="LinkedIn"
                >
                  in
                </Link>
                <Link
                  href={`mailto:${profile.email}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xs font-semibold uppercase text-ink-soft transition-colors hover:border-signal hover:text-signal"
                  aria-label="E-mail"
                >
                  @
                </Link>
              </div>
            </div>

            <HeroGraphic />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Foco" title="Áreas de interesse" />
          <div className="grid gap-5 sm:grid-cols-3">
            {areas.map((area) => (
              <article
                key={area.key}
                className="rounded-2xl border border-line bg-surface p-7"
              >
                <h3 className="mb-3 font-display text-lg uppercase tracking-wide text-ink">
                  {area.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-ink-soft">
                  {area.description}
                </p>
                <ul className="space-y-2 text-sm text-ink-soft">
                  {area.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Trabalhos"
            title="Projetos em destaque"
            action={
              <Link
                href="/projetos"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-signal"
              >
                Ver todos →
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Ciência" title="Produção científica" />
          <StatStrip stats={publicationStats} />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Leitura"
            title="Conteúdos recentes"
            action={
              <Link
                href="/blog"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-signal"
              >
                Ver todos →
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 text-center">
        <Container>
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            Vamos conectar ciência, tecnologia e propósito.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Entre em contato ou acompanhe meu trabalho nas redes sociais.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/contato">Entrar em contato</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
