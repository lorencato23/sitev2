import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Saúde Mental",
  description:
    "Materiais do seminário de Saúde Mental sobre psicoterapias e clínica ampliada.",
  path: "/biblio/saude-mental",
});

export default function SaudeMentalBiblioPage() {
  return (
    <>
      <PageHero
        eyebrow="Biblioteca / Saúde Mental"
        title="Seminário de Saúde Mental"
        description="Materiais reunidos para o Seminário 1 — psicoterapias e clínica ampliada."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-signal-soft px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal">
                  Apresentação
                </span>
                <span className="font-mono text-xs text-muted">HTML</span>
              </div>
              <h2 className="mt-10 font-display text-3xl leading-tight text-ink sm:text-4xl">
                Psicoterapias e clínica ampliada
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Apresentação interativa preparada para o seminário, com navegação por slides e leitura no navegador.
              </p>
              <Link
                href="/biblio/saude-mental/psicoterapias"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-paper transition-transform hover:-translate-y-0.5"
              >
                Abrir apresentação <span aria-hidden="true">↗</span>
              </Link>
            </article>

            <aside className="rounded-2xl border border-line bg-paper-soft/60 p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">Coleção</p>
              <h2 className="mt-4 font-display text-2xl text-ink">Sobre este material</h2>
              <dl className="mt-7 space-y-4 border-t border-line pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Tema</dt>
                  <dd className="text-right text-ink-soft">Psicoterapias</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Formato</dt>
                  <dd className="text-right text-ink-soft">Apresentação HTML</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Estado</dt>
                  <dd className="text-right text-ink-soft">Material de estudo</dd>
                </div>
              </dl>
              <p className="mt-7 text-xs leading-relaxed text-muted">
                Mais materiais poderão ser adicionados aqui posteriormente, sem alterar a estrutura da biblioteca.
              </p>
            </aside>
          </div>
          <Link href="/biblio" className="mt-10 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-signal">
            ← Voltar para a biblioteca
          </Link>
        </Container>
      </section>
    </>
  );
}
