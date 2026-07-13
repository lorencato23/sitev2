import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { ButtonLink } from "@/components/button-link";
import { HeroGraphic } from "@/components/hero-graphic";
import { ProjectCard } from "@/components/project-card";
import { StatStrip } from "@/components/stat-strip";
import { AreaCard } from "@/components/area-card";
import { SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/reveal";
import { ScrollParallax } from "@/components/scroll-parallax";
import centroCirurgico from "@/assets/centro-cirurgico.webp";
import {
  areas,
  heroSignals,
  profile,
  projects,
  publicationStats,
} from "@/lib/data";

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
                className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl animate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                {profile.heroLead}
              </p>
              <p
                className="mt-3 max-w-xl text-sm text-muted animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                {profile.heroSub}
              </p>

              {/* Sinais de autoridade na primeira dobra (F-02) */}
              <ul
                className="mt-8 flex flex-wrap gap-x-8 gap-y-4 animate-fade-up"
                style={{ animationDelay: "240ms" }}
              >
                {heroSignals.map((sig) => (
                  <li key={sig.label}>
                    <Link
                      href={sig.href}
                      target={sig.external ? "_blank" : undefined}
                      rel={sig.external ? "noopener" : undefined}
                      className="group block"
                    >
                      <span className="block font-display text-2xl text-signal">
                        {sig.value}
                      </span>
                      <span className="mt-1 block max-w-[11rem] text-xs leading-snug text-ink-soft transition-colors group-hover:text-signal">
                        {sig.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div
                className="mt-9 flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                <ButtonLink href="/projetos">Ver projetos →</ButtonLink>
                <ButtonLink href="/publicacoes" variant="secondary">
                  Publicações
                </ButtonLink>
                <ButtonLink href="/contato" variant="secondary">
                  Contato
                </ButtonLink>
              </div>

              <div className="mt-10 animate-fade-up" style={{ animationDelay: "360ms" }}>
                <SocialLinks />
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
              <ScrollParallax speed={0.12}>
                <HeroGraphic />
              </ScrollParallax>
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

      {/* Interlúdio editorial — prova humana (F-07) */}
      <section className="py-10 sm:py-14">
        <Container>
          <Reveal>
            <figure className="grid items-center gap-10 overflow-hidden rounded-3xl border border-line bg-paper-soft/60 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative aspect-[4/5] max-h-[430px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={centroCirurgico}
                  alt="Gabriel Lorencato em centro cirúrgico, acompanhando procedimento ao microscópio cirúrgico"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <figcaption>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">
                  Em campo
                </p>
                <blockquote className="mt-4 max-w-lg font-display text-2xl leading-snug text-ink sm:text-3xl">
                  Entre a literatura e a prática — o centro cirúrgico é onde as
                  perguntas de pesquisa nascem.
                </blockquote>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                  O acompanhamento de procedimentos neurocirúrgicos alimenta os
                  relatos de caso e as revisões sistemáticas publicadas.
                </p>
              </figcaption>
            </figure>
          </Reveal>
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
                href={profile.instagram}
                target="_blank"
                rel="noopener"
                className="font-mono text-sm text-muted transition-colors hover:text-signal"
              >
                {profile.instagramHandle}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
