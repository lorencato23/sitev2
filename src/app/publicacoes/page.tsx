import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatStrip } from "@/components/stat-strip";
import { Reveal } from "@/components/reveal";
import { publicationStats, publications } from "@/lib/data";

export const metadata: Metadata = {
  title: "Publicações",
  description:
    "Artigos, trabalhos em congresso, apresentações orais e posters em neurocirurgia e medicina aeroespacial.",
};

export default function PublicacoesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ciência"
        title="Produção"
        titleAccent="científica"
        description="Um registro da produção acadêmica em neurocirurgia, neurociência e fisiologia aeroespacial."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <StatStrip stats={publicationStats} />
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="01" eyebrow="Registro" title="Publicações e trabalhos" />
          </Reveal>
          <ol className="divide-y divide-line border-t border-line">
            {publications.map((pub, i) => (
              <li key={pub.title}>
                <Reveal delay={i * 60}>
                  <div className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <div className="flex items-baseline gap-5">
                      <span
                        className="hidden shrink-0 font-mono text-sm text-line-strong sm:inline"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-signal">
                          {pub.title}
                        </p>
                        <p className="mt-1 text-sm text-ink-soft">{pub.venue}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 pl-0 font-mono text-xs uppercase tracking-[0.1em] text-muted sm:pl-4">
                      <span>{pub.type}</span>
                      <span aria-hidden="true">•</span>
                      <span>{pub.year}</span>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
