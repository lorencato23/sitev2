import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { ButtonLink } from "@/components/button-link";
import { HeroGraphic } from "@/components/hero-graphic";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { StatStrip } from "@/components/stat-strip";
import { AreaCard } from "@/components/area-card";
import { SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/reveal";
import { areas, profile, projects, posts, publicationStats } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-signal animate-fade-up">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" aria-hidden="true" />
                {profile.eyebrow}
              </p>

              <h1
                className="font-display leading-[0.92] tracking-tight text-ink animate-fade-up"
                style={{ fontSize: "var(--text-display-xl)", animationDelay: "80ms" }}
              >
                Gabriel
                <br />
                <em className="text-signal">Lorencato</em>
              </h1>

              <p
                className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg animate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                {profile.shortBio}
              </p>

              <div
                className="mt-9 flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: "240ms" }}
              >
                <ButtonLink href="/projetos">Ver projetos →</ButtonLink>
                <ButtonLink href="/publicacoes" variant="secondary">
                  Publicações
                </ButtonLink>
                <ButtonLink href="/blog" variant="secondary">
                  Blog
                </ButtonLink>
              </div>

              <div className="mt-10 animate-fade-up" style={{ animationDelay: "320ms" }}>
                <SocialLinks />
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
              <HeroGraphic />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="01" eyebrow="Foco" title="Áreas de interesse" />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {areas.map((area, i) => (
              <Reveal key={area.key} delay={i * 100}>
                <AreaCard area={area} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Trabalhos"
              title="Projetos em destaque"
              action={<SectionLink href="/projetos">Ver todos</SectionLink>}
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {projects.slice(0, 3).map((project, i) => (
              <Reveal key={project.slug} delay={i * 100} className="flex">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="03" eyebrow="Ciência" title="Produção científica" />
          </Reveal>
          <StatStrip stats={publicationStats} />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Leitura"
              title="Conteúdos recentes"
              action={<SectionLink href="/blog">Ver todos</SectionLink>}
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {posts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 100} className="flex">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container className="text-center">
          <Reveal>
            <h2
              className="mx-auto max-w-3xl font-display leading-[1.08] text-ink"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              Vamos conectar <em className="text-signal">ciência</em>, tecnologia
              e propósito.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-ink-soft">
              Entre em contato ou acompanhe meu trabalho nas redes sociais.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/contato">Entrar em contato</ButtonLink>
              <Link
                href={`mailto:${profile.email}`}
                className="font-mono text-sm text-muted transition-colors hover:text-signal"
              >
                {profile.email}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
