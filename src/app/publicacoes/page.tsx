import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatStrip } from "@/components/stat-strip";
import { Reveal } from "@/components/reveal";
import {
  publicationStats,
  publications,
  type PublicationCategory,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Publicações",
  description:
    "Artigos em periódicos, trabalhos em congressos e palestras em neurocirurgia, neurointervenção e medicina aeroespacial.",
};

const groups: { key: PublicationCategory; index: string; label: string }[] = [
  { key: "periodico", index: "01", label: "Artigos em periódicos" },
  { key: "congresso", index: "02", label: "Trabalhos em congressos" },
  { key: "palestra", index: "03", label: "Palestras" },
];

export default function PublicacoesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ciência"
        title="Produção"
        titleAccent="científica"
        description="Um registro da produção acadêmica em neurocirurgia, neurorradiologia intervencionista e medicina aeroespacial."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <StatStrip stats={publicationStats} />
        </Container>
      </section>

      {groups.map((group) => {
        const items = publications.filter((p) => p.category === group.key);
        if (items.length === 0) return null;

        return (
          <section key={group.key} className="border-t border-line py-16 sm:py-20">
            <Container>
              <Reveal>
                <SectionHeading
                  index={group.index}
                  eyebrow="Registro"
                  title={group.label}
                />
              </Reveal>
              <ol className="divide-y divide-line border-t border-line">
                {items.map((pub, i) => (
                  <li key={pub.title}>
                    <Reveal delay={i * 50}>
                      <div className="group flex flex-col gap-3 py-7 sm:flex-row sm:justify-between sm:gap-8">
                        <div className="flex items-baseline gap-5">
                          <span
                            className="hidden shrink-0 font-mono text-sm text-line-strong sm:inline"
                            aria-hidden="true"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p className="font-display text-lg leading-snug text-ink">
                              {pub.link ? (
                                <a
                                  href={pub.link}
                                  target="_blank"
                                  rel="noopener"
                                  className="transition-colors hover:text-signal"
                                >
                                  {pub.title}
                                  <span aria-hidden="true" className="text-signal">
                                    {" "}
                                    ↗
                                  </span>
                                </a>
                              ) : (
                                pub.title
                              )}
                            </p>
                            {pub.venue && (
                              <p className="mt-1.5 text-sm text-ink-soft">
                                {pub.venue}
                              </p>
                            )}
                            {pub.note && (
                              <p className="mt-1 font-mono text-xs text-muted">
                                {pub.note}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3 pl-0 font-mono text-xs uppercase tracking-[0.1em] text-muted sm:pl-4">
                          {pub.role && (
                            <>
                              <span
                                className={
                                  pub.role === "1º autor" ? "text-signal" : undefined
                                }
                              >
                                {pub.role}
                              </span>
                              <span aria-hidden="true">•</span>
                            </>
                          )}
                          <span>{pub.year}</span>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </Container>
          </section>
        );
      })}
    </>
  );
}
