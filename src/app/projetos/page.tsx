import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Tag } from "@/components/tag";
import { Reveal } from "@/components/reveal";
import { pageMeta } from "@/lib/metadata";
import { projects, type Project } from "@/lib/data";

export const metadata = pageMeta({
  title: "Projetos",
  description:
    "Pesquisa em neurorradiologia intervencionista, neurocirurgia e medicina aeroespacial — relatos de caso, revisões sistemáticas e iniciação científica.",
  path: "/projetos",
});

const fields: { key: keyof Project; label: string }[] = [
  { key: "contexto", label: "Contexto" },
  { key: "contribuicao", label: "Contribuição" },
  { key: "metodo", label: "Método" },
  { key: "resultado", label: "Resultado" },
];

export default function ProjetosPage() {
  return (
    <>
      <PageHero
        eyebrow="Trabalhos"
        title="Projetos"
        description="Pesquisa em neurorradiologia intervencionista, neurocirurgia e medicina aeroespacial — de relatos de caso e revisões sistemáticas a projetos de iniciação científica."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 100} className="flex">
                <article
                  id={project.slug}
                  className="flex w-full scroll-mt-28 flex-col rounded-2xl border border-line bg-surface p-8 transition-colors duration-300 hover:border-signal"
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <Tag>{project.tag}</Tag>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="mb-2 font-display text-2xl leading-snug text-ink">
                    {project.title}
                  </h2>
                  <p className="mb-7 text-sm leading-relaxed text-ink-soft">
                    {project.summary}
                  </p>

                  <dl className="grid gap-x-5 gap-y-4 border-t border-line pt-6 sm:grid-cols-[7.5rem_1fr]">
                    {fields.map(({ key, label }) => (
                      <div key={key} className="contents">
                        <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal sm:pt-0.5">
                          {label}
                        </dt>
                        <dd className="mb-2 text-sm leading-relaxed text-ink-soft sm:mb-0">
                          {project[key] as string}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener"
                      className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-line-strong px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-signal hover:text-signal"
                    >
                      {project.linkLabel ?? "Ver publicação"}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
