import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Saúde Mental",
  description:
    "Ferramenta de exame do estado mental, seminário de psicoterapias e PBL das lacunas de saúde mental, para usar no navegador.",
  path: "/biblio/saude-mental",
});

export default function SaudeMentalBiblioPage() {
  return (
    <>
      <PageHero
        eyebrow="Biblioteca / Saúde Mental"
        title="Seminário de Saúde Mental"
        description="Três materiais: uma ferramenta estruturada para o exame do estado mental, o PBL das seis lacunas e a apresentação do seminário."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5">
            <article className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-signal-soft px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal">
                  Ferramenta
                </span>
                <span className="font-mono text-xs text-muted">HTML</span>
              </div>
              <h2 className="mt-8 font-display text-3xl leading-tight text-ink sm:text-4xl">
                Exame do Estado Mental
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Marque os achados por domínio e gere o texto do exame para o prontuário. Roda no
                navegador e não envia dado nenhum a servidor. Apoio ao registro — não substitui
                julgamento clínico nem instrumentos validados de avaliação de risco.
              </p>
              <Link
                href="/biblio/saude-mental/exame-do-estado-mental"
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-signal px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-paper"
              >
                Abrir ferramenta <span aria-hidden="true">↗</span>
              </Link>
            </article>
            <article className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-signal-soft px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal">
                  Leitura
                </span>
                <span className="font-mono text-xs text-muted">HTML</span>
              </div>
              <h2 className="mt-8 font-display text-3xl leading-tight text-ink sm:text-4xl">
                PBL: seis lacunas
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Objetivos da problematização de saúde mental, com o que dizer na mesa e a fonte de cada afirmação. Feito para ler no celular.
              </p>
              <Link
                href="/biblio/saude-mental/pbl-seis-lacunas"
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-signal px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-paper"
              >
                Abrir leitura <span aria-hidden="true">↗</span>
              </Link>
            </article>
            <article className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-signal-soft px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal">
                  Apresentação
                </span>
                <span className="font-mono text-xs text-muted">HTML</span>
              </div>
              <h2 className="mt-8 font-display text-3xl leading-tight text-ink sm:text-4xl">
                Psicoterapias e clínica ampliada
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Apresentação do seminário, com navegação por slides.
              </p>
              <Link
                href="/biblio/saude-mental/psicoterapias"
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-signal px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-paper"
              >
                Abrir apresentação <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
          <Link href="/biblio" className="mt-10 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-signal">
            ← Voltar para a biblioteca
          </Link>
        </Container>
      </section>
    </>
  );
}
