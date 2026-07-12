import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { areas, profile, timeline } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sobre",
  description: profile.shortBio,
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title="Ciência, cirurgia e o desconhecido."
        description={profile.tagline}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-5 text-base leading-relaxed text-ink-soft">
              <p>{profile.shortBio}</p>
              <p>
                Meu interesse por medicina nasceu da curiosidade sobre os
                limites do corpo humano — e cresceu na direção de dois
                extremos aparentemente distantes: o interior do crânio e o
                vácuo do espaço. Entre um e outro, encontrei um fio condutor
                comum: a fisiologia sob estresse extremo.
              </p>
              <p>
                Hoje, divido meu tempo entre a formação clínica, projetos de
                pesquisa em neurociência e fisiologia aeroespacial, e a
                produção de conteúdo que aproxima esses temas de colegas e do
                público em geral.
              </p>
            </div>

            <div>
              <SectionHeading eyebrow="Trajetória" title="Linha do tempo" />
              <ol className="space-y-8 border-l border-line pl-8">
                {timeline.map((item) => (
                  <li key={item.title} className="relative">
                    <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-signal" />
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-signal">
                      {item.year}
                    </span>
                    <h3 className="mt-2 font-display text-lg text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-muted">
                      {item.place}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-20">
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
    </>
  );
}
