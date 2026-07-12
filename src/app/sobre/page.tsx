import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { AreaCard } from "@/components/area-card";
import { Reveal } from "@/components/reveal";
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
        title="Ciência, cirurgia e o"
        titleAccent="desconhecido."
        description={profile.tagline}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-ink-soft lg:sticky lg:top-28">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-signal">
                  {profile.shortBio}
                </p>
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
            </Reveal>

            <div>
              <Reveal>
                <SectionHeading index="01" eyebrow="Trajetória" title="Linha do tempo" />
              </Reveal>
              <ol className="space-y-9 border-l border-line pl-8">
                {timeline.map((item, i) => (
                  <li key={item.title} className="relative">
                    <Reveal delay={i * 80}>
                      <span
                        className="absolute -left-[calc(2rem+5.5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-signal"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-signal">
                        {item.year}
                      </span>
                      <h3 className="mt-2 font-display text-xl text-ink">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-muted">{item.place}</p>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
                        {item.description}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="02" eyebrow="Foco" title="Áreas de interesse" />
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
    </>
  );
}
