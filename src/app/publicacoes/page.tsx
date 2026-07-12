import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatStrip } from "@/components/stat-strip";
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
        title="Produção científica"
        description="Um registro da produção acadêmica em neurocirurgia, neurociência e fisiologia aeroespacial."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <StatStrip stats={publicationStats} />
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Registro" title="Publicações e trabalhos" />
          <ul className="divide-y divide-line border-t border-line">
            {publications.map((pub) => (
              <li
                key={pub.title}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div>
                  <p className="font-display text-lg leading-snug text-ink">
                    {pub.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{pub.venue}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                  <span>{pub.type}</span>
                  <span aria-hidden="true">•</span>
                  <span>{pub.year}</span>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
