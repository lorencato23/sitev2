import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Saúde Coletiva",
  description:
    "Apresentações de leptospirose, com dados de São José dos Campos e do Vale do Paraíba, de acidentes por animais peçonhentos e de desigualdade na exposição a deslizamentos em São José dos Campos, e o artigo do estudo sobre deslizamentos.",
  path: "/biblio/saude-coletiva",
});

const materials = [
  {
    title: "Leptospirose: da suspeita clínica à ficha do SINAN",
    description:
      "Definição de caso, epidemiologia em São Paulo e no Vale do Paraíba, exames, formas graves, conduta, ficha do SINAN e prevenção. Navegação por slides, com toque para avançar.",
    href: "/biblio/saude-coletiva/leptospirose",
    kind: "Apresentação",
    format: "HTML",
    action: "Abrir apresentação",
  },
  {
    title: "Animais peçonhentos: aranhas, Lonomia e escorpiões",
    description:
      "Phoneutria, Loxosceles, Latrodectus, Lonomia e Tityus: epidemiologia no Brasil, em São Paulo e no Vale do Paraíba, mecanismo do veneno, clínica, soroterapia e notificação no SINAN. Navegação por slides, com toque para avançar.",
    href: "/biblio/saude-coletiva/animais-peconhentos",
    kind: "Apresentação",
    format: "HTML",
    action: "Abrir apresentação",
  },
  {
    title: "Onde a terra cede: renda, deslizamentos e saúde em São José dos Campos",
    description:
      "Estudo ecológico com dados públicos: quem mora nos terrenos de alta suscetibilidade a deslizamentos, mortalidade, distância até as UBS, gastos da Prefeitura e custo das obras do PMRR 2025. Mapa 3D interativo e navegação por slides.",
    href: "/biblio/saude-coletiva/deslizamentos-sjc",
    kind: "Apresentação",
    format: "HTML",
    action: "Abrir apresentação",
  },
  {
    title: "Renda e exposição de áreas urbanizadas à alta suscetibilidade a deslizamentos em São José dos Campos (SP)",
    description:
      "Artigo completo do estudo ecológico, em versão de pré-publicação ainda não revisada por pares: métodos, modelos estatísticos, análises de sensibilidade e dimensão de saúde. Lorençato GF, Andrade VRS, Santos NTM (FCMSJC Humanitas), outubro de 2026.",
    href: "/biblio/saude-coletiva/deslizamentos-sjc-artigo.pdf",
    kind: "Artigo",
    format: "PDF",
    action: "Abrir artigo",
  },
];

export default function SaudeColetivaBiblioPage() {
  return (
    <>
      <PageHero
        eyebrow="Biblioteca / Saúde Coletiva"
        title="Saúde Coletiva"
        description="Apresentações de vigilância em saúde, para abrir e apresentar no navegador, e artigos dos estudos."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5">
            {materials.map((item) => (
              <article key={item.href} className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-signal-soft px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal">
                    {item.kind}
                  </span>
                  <span className="font-mono text-xs text-muted">{item.format}</span>
                </div>
                <h2 className="mt-8 font-display text-3xl leading-tight text-ink sm:text-4xl">{item.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">{item.description}</p>
                <a
                  href={item.href}
                  className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-signal px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-paper"
                >
                  {item.action} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          <Link href="/biblio" className="mt-10 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-signal">
            ← Voltar para a biblioteca
          </Link>
        </Container>
      </section>
    </>
  );
}
