import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { AreaCard } from "@/components/area-card";
import { Reveal } from "@/components/reveal";
import {
  areas,
  events,
  leadership,
  profile,
  scholarships,
  timeline,
  type Credential,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Sobre",
  description: profile.shortBio,
};

function CredentialList({ items }: { items: Credential[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.title} className="border-l-2 border-line pl-4">
          <p className="text-sm font-medium leading-snug text-ink">
            {item.title}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            {item.detail && <span>{item.detail}</span>}
            {item.detail && <span aria-hidden="true">•</span>}
            <span>{item.period}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

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
                  Estudante de Medicina na FCMSJC-Humanitas, concentro minha
                  produção científica na neurocirurgia e na neurorradiologia
                  intervencionista — com trabalhos sobre embolização
                  pré-operatória, tratamento endovascular de fístulas e
                  malformações arteriovenosas, e doença cerebrovascular.
                </p>
                <p>
                  Em paralelo, dedico-me à medicina aeroespacial, investigando
                  como o corpo humano se adapta à microgravidade — tema da minha
                  iniciação científica sobre alterações nefrológicas em
                  astronautas — e à liderança acadêmica, hoje à frente do
                  Diretório Acadêmico da faculdade.
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

      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Atuação"
              title="Liderança e reconhecimento"
            />
          </Reveal>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
            <Reveal>
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-signal">
                  Liderança e ligas
                </h3>
                <CredentialList items={leadership} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-signal">
                  Bolsas e monitorias
                </h3>
                <CredentialList items={scholarships} />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-signal">
                  Organização de eventos
                </h3>
                <CredentialList items={events} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
